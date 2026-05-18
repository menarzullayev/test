#include "archive/Archive.hpp"
#include "archive/Compressor.hpp"
#include "utils/CRC32.hpp"
#include "utils/FileUtils.hpp"
#include <cassert>
#include <fstream>
#include <iostream>
#include <sstream>
#include <cstdio>

namespace {

int g_failures = 0;

void check(const char* name, bool ok) {
    if (ok) {
        std::cout << "  PASS  " << name << "\n";
    } else {
        std::cout << "  FAIL  " << name << "\n";
        ++g_failures;
    }
}

template<typename F>
bool doesThrow(F&& f) {
    try { f(); return false; }
    catch (...) { return true; }
}

// Temporary file/dir helpers
myar::fs::path makeTmpDir() {
    char tmpl[] = "/tmp/myar_test_XXXXXX";
    char* p = ::mkdtemp(tmpl);
    assert(p);
    return p;
}

void writeFile(const myar::fs::path& p, const std::string& content) {
    myar::fs::create_directories(p.parent_path());
    std::ofstream f(p, std::ios::binary);
    f.write(content.data(), static_cast<std::streamsize>(content.size()));
}

std::string readFile(const myar::fs::path& p) {
    std::ifstream f(p, std::ios::binary);
    return {std::istreambuf_iterator<char>(f),
            std::istreambuf_iterator<char>{}};
}

// ---- Tests -----------------------------------------------------------------

void testCRC32Known() {
    // CRC32 of "123456789" == 0xCBF43926 (standard test vector)
    const uint8_t data[] = {'1','2','3','4','5','6','7','8','9'};
    uint32_t crc = myar::CRC32::compute(data, sizeof(data));
    check("CRC32 known vector", crc == 0xCBF43926u);
}

void testLESerialization() {
    std::ostringstream out(std::ios::binary);
    myar::writeLE64(out, 0xDEADBEEFCAFEBABEull);
    std::string s = out.str();
    std::istringstream in(s, std::ios::binary);
    uint64_t v = myar::readLE64(in);
    check("LE64 round-trip", v == 0xDEADBEEFCAFEBABEull);

    std::ostringstream o2(std::ios::binary);
    myar::writeLE32(o2, 0x12345678u);
    std::istringstream i2(o2.str(), std::ios::binary);
    check("LE32 round-trip", myar::readLE32(i2) == 0x12345678u);

    std::ostringstream o3(std::ios::binary);
    myar::writeLE16(o3, 0xABCDu);
    std::istringstream i3(o3.str(), std::ios::binary);
    check("LE16 round-trip", myar::readLE16(i3) == 0xABCDu);
}

void testCompressorRoundTrip() {
    // 2 KB of pseudo-random data
    std::vector<uint8_t> src(2048);
    for (std::size_t i = 0; i < src.size(); ++i)
        src[i] = static_cast<uint8_t>(i * 31 + 7);

    std::ostringstream compressed(std::ios::binary);
    auto cmp = myar::makeCompressor(myar::CompType::Deflate);
    cmp->feedChunk(src.data(), src.size(), compressed);
    uint64_t csz = cmp->finish(compressed);

    std::istringstream cin(compressed.str(), std::ios::binary);
    std::ostringstream decompressed(std::ios::binary);
    auto dcmp = myar::makeDecompressor(myar::CompType::Deflate);
    dcmp->decompress(cin, decompressed, csz, src.size());

    const std::string& dstr = decompressed.str();
    bool ok = dstr.size() == src.size() &&
              std::equal(src.begin(), src.end(),
                         reinterpret_cast<const uint8_t*>(dstr.data()));
    check("Deflate round-trip", ok);
}

void testCompressorEmptyInput() {
    std::ostringstream out(std::ios::binary);
    auto cmp = myar::makeCompressor(myar::CompType::Deflate);
    uint64_t csz = cmp->finish(out);

    std::istringstream in(out.str(), std::ios::binary);
    std::ostringstream dec(std::ios::binary);
    auto dcmp = myar::makeDecompressor(myar::CompType::Deflate);
    dcmp->decompress(in, dec, csz, 0);
    check("Deflate empty input", dec.str().empty());
}

void testArchiveRoundTrip() {
    auto dir = makeTmpDir();
    writeFile(dir / "in/hello.txt", "Hello, myar!\n");
    writeFile(dir / "in/sub/data.txt", "line1\nline2\nline3\n");

    myar::fs::path arc = dir / "test.myar";
    myar::CreateOptions co;
    co.compression = myar::CompType::Deflate;
    std::size_t n = myar::Archive::create(arc, dir / "in", co);
    check("Archive create returns 2", n == 2);

    myar::fs::path out = dir / "extracted";
    myar::ExtractOptions eo;
    std::size_t m = myar::Archive::extract(arc, out, eo);
    check("Archive extract returns 2", m == 2);

    check("hello.txt content matches",
          readFile(out / "hello.txt") == "Hello, myar!\n");
    check("sub/data.txt content matches",
          readFile(out / "sub/data.txt") == "line1\nline2\nline3\n");
}

void testBadMagic() {
    auto dir = makeTmpDir();
    myar::fs::path bad = dir / "bad.myar";
    std::ofstream f(bad, std::ios::binary);
    f.write("JUNK", 4);
    f.write("\x01\x00", 2);
    f.close();

    bool threw = doesThrow([&]{
        myar::Archive::list(bad, std::cout);
    });
    check("Bad magic throws", threw);
}

void testCRCTamper() {
    auto dir = makeTmpDir();
    writeFile(dir / "in/file.txt", std::string(512, 'A'));

    myar::fs::path arc = dir / "tamper.myar";
    myar::Archive::create(arc, dir / "in");

    // Corrupt one byte near the end of the data section.
    {
        std::fstream f(arc.string(),
                       std::ios::binary | std::ios::in | std::ios::out);
        f.seekp(-10, std::ios::end);
        f.put('\xFF');
    }

    bool threw = doesThrow([&]{
        myar::Archive::extract(arc, dir / "tampered_out");
    });
    check("CRC tamper detected", threw);
}

void testListOutput() {
    auto dir = makeTmpDir();
    writeFile(dir / "in/a.txt", "aaa");

    myar::fs::path arc = dir / "list_test.myar";
    myar::Archive::create(arc, dir / "in");

    std::ostringstream out;
    myar::Archive::list(arc, out);
    std::string listing = out.str();
    check("List contains filename", listing.find("a.txt") != std::string::npos);
    check("List contains 1 file",   listing.find("1 file") != std::string::npos);
}

} // anonymous namespace

int main() {
    std::cout << "Running myar tests...\n";
    testCRC32Known();
    testLESerialization();
    testCompressorRoundTrip();
    testCompressorEmptyInput();
    testArchiveRoundTrip();
    testBadMagic();
    testCRCTamper();
    testListOutput();

    std::cout << "\n";
    if (g_failures == 0) {
        std::cout << "All tests passed.\n";
        return 0;
    } else {
        std::cout << g_failures << " test(s) FAILED.\n";
        return 1;
    }
}
