#include "FileUtils.hpp"
#include <algorithm>
#include <array>

namespace myar {

std::vector<fs::path> collectFiles(const fs::path& root) {
    if (!fs::exists(root))
        throw IoError("path does not exist: " + root.string());

    std::vector<fs::path> result;
    if (fs::is_regular_file(root)) {
        result.push_back(root);
        return result;
    }

    for (auto& entry : fs::recursive_directory_iterator(root)) {
        if (entry.is_regular_file())
            result.push_back(entry.path());
    }
    std::sort(result.begin(), result.end());
    return result;
}

void readChunks(const fs::path& src,
                std::function<void(const uint8_t*, std::size_t)> visitor) {
    std::ifstream in(src, std::ios::binary);
    if (!in)
        throw IoError("cannot open: " + src.string());

    std::array<uint8_t, kChunkSize> buf;
    while (in) {
        in.read(reinterpret_cast<char*>(buf.data()), kChunkSize);
        std::streamsize n = in.gcount();
        if (n > 0)
            visitor(buf.data(), static_cast<std::size_t>(n));
    }
    if (in.bad())
        throw IoError("read error: " + src.string());
}

void readChunksAt(std::ifstream& stream,
                  uint64_t offset,
                  uint64_t byteCount,
                  std::function<void(const uint8_t*, std::size_t)> visitor) {
    stream.seekg(static_cast<std::streamoff>(offset));
    if (!stream)
        throw IoError("seek failed");

    std::array<uint8_t, kChunkSize> buf;
    uint64_t remaining = byteCount;
    while (remaining > 0) {
        std::size_t toRead = static_cast<std::size_t>(
            std::min(remaining, static_cast<uint64_t>(kChunkSize)));
        stream.read(reinterpret_cast<char*>(buf.data()),
                    static_cast<std::streamsize>(toRead));
        std::streamsize n = stream.gcount();
        if (n <= 0)
            throw IoError("unexpected end of archive");
        visitor(buf.data(), static_cast<std::size_t>(n));
        remaining -= static_cast<uint64_t>(n);
    }
}

void atomicWrite(const fs::path& dest,
                 std::function<void(std::ofstream&)> writer) {
    fs::create_directories(dest.parent_path());
    fs::path tmp = fs::path(dest.string() + ".tmp");

    try {
        std::ofstream out(tmp, std::ios::binary | std::ios::trunc);
        if (!out)
            throw IoError("cannot open for writing: " + tmp.string());
        writer(out);
        out.flush();
        if (!out)
            throw IoError("write error: " + tmp.string());
    } catch (...) {
        std::error_code ec;
        fs::remove(tmp, ec);
        throw;
    }

    fs::rename(tmp, dest);
}

void writeLE16(std::ostream& out, uint16_t v) {
    uint8_t buf[2] = { uint8_t(v), uint8_t(v >> 8) };
    out.write(reinterpret_cast<const char*>(buf), 2);
}

void writeLE32(std::ostream& out, uint32_t v) {
    uint8_t buf[4] = {
        uint8_t(v),       uint8_t(v >> 8),
        uint8_t(v >> 16), uint8_t(v >> 24)
    };
    out.write(reinterpret_cast<const char*>(buf), 4);
}

void writeLE64(std::ostream& out, uint64_t v) {
    uint8_t buf[8] = {
        uint8_t(v),       uint8_t(v >> 8),
        uint8_t(v >> 16), uint8_t(v >> 24),
        uint8_t(v >> 32), uint8_t(v >> 40),
        uint8_t(v >> 48), uint8_t(v >> 56)
    };
    out.write(reinterpret_cast<const char*>(buf), 8);
}

uint16_t readLE16(std::istream& in) {
    uint8_t buf[2];
    in.read(reinterpret_cast<char*>(buf), 2);
    if (in.gcount() != 2) throw IoError("unexpected end of stream (readLE16)");
    return uint16_t(buf[0]) | (uint16_t(buf[1]) << 8);
}

uint32_t readLE32(std::istream& in) {
    uint8_t buf[4];
    in.read(reinterpret_cast<char*>(buf), 4);
    if (in.gcount() != 4) throw IoError("unexpected end of stream (readLE32)");
    return uint32_t(buf[0])        | (uint32_t(buf[1]) << 8)
         | (uint32_t(buf[2]) << 16) | (uint32_t(buf[3]) << 24);
}

uint64_t readLE64(std::istream& in) {
    uint8_t buf[8];
    in.read(reinterpret_cast<char*>(buf), 8);
    if (in.gcount() != 8) throw IoError("unexpected end of stream (readLE64)");
    return uint64_t(buf[0])        | (uint64_t(buf[1]) << 8)
         | (uint64_t(buf[2]) << 16) | (uint64_t(buf[3]) << 24)
         | (uint64_t(buf[4]) << 32) | (uint64_t(buf[5]) << 40)
         | (uint64_t(buf[6]) << 48) | (uint64_t(buf[7]) << 56);
}

std::string normalisePath(const fs::path& p) {
    std::string s = p.generic_string();
    if (s.size() >= 2 && s[0] == '.' && s[1] == '/')
        s = s.substr(2);
    return s;
}

} // namespace myar
