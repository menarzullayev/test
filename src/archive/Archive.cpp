#include "Archive.hpp"
#include "Compressor.hpp"
#include "../utils/CRC32.hpp"
#include "../utils/FileUtils.hpp"
#include <fstream>
#include <iostream>
#include <iomanip>
#include <sstream>

namespace myar {

// ---- Write helpers ---------------------------------------------------------

void Archive::writeHeader(std::ostream& out, uint32_t fileCount) {
    out.write(kMagic, 4);
    writeLE16(out, kVersion);
    writeLE32(out, fileCount);
    writeLE16(out, 0); // flags
    writeLE32(out, 0); // reserved
}

void Archive::writeTableEntry(std::ostream& out, const FileEntry& e) {
    writeLE16(out, static_cast<uint16_t>(e.storedName.size()));
    out.write(e.storedName.data(),
              static_cast<std::streamsize>(e.storedName.size()));
    writeLE64(out, e.originalSize);
    writeLE64(out, e.compressedSize);
    writeLE64(out, e.dataOffset);
    writeLE32(out, e.crc32);
    out.put(static_cast<char>(e.compType));
}

// ---- Read helpers ----------------------------------------------------------

uint32_t Archive::readHeader(std::istream& in) {
    char magic[4];
    in.read(magic, 4);
    if (in.gcount() != 4 ||
        magic[0] != kMagic[0] || magic[1] != kMagic[1] ||
        magic[2] != kMagic[2] || magic[3] != kMagic[3])
        throw ArchiveError("not a valid .myar archive (bad magic)");

    uint16_t version = readLE16(in);
    if (version != kVersion)
        throw ArchiveError("unsupported archive version: " +
                           std::to_string(version));

    uint32_t fileCount = readLE32(in);
    (void)readLE16(in); // flags (ignored)
    (void)readLE32(in); // reserved (ignored)
    return fileCount;
}

FileEntry Archive::readTableEntry(std::istream& in) {
    FileEntry e;
    uint16_t nameLen = readLE16(in);
    e.storedName.resize(nameLen);
    in.read(e.storedName.data(), nameLen);
    if (in.gcount() != nameLen)
        throw ArchiveError("truncated file table entry");
    e.originalSize   = readLE64(in);
    e.compressedSize = readLE64(in);
    e.dataOffset     = readLE64(in);
    e.crc32          = readLE32(in);
    e.compType       = static_cast<CompType>(
        static_cast<uint8_t>(in.get()));
    return e;
}

std::vector<FileEntry> Archive::readFileTable(std::istream& in,
                                              uint32_t count) {
    std::vector<FileEntry> entries;
    entries.reserve(count);
    for (uint32_t i = 0; i < count; ++i)
        entries.push_back(readTableEntry(in));
    return entries;
}

// ---- create ----------------------------------------------------------------

std::size_t Archive::create(const fs::path& archivePath,
                             const fs::path& sourcePath,
                             const CreateOptions& opts) {
    auto absoluteFiles = collectFiles(sourcePath);
    if (absoluteFiles.empty()) {
        std::cerr << "warning: no files found under " << sourcePath << "\n";
        return 0;
    }

    // Determine root for relative-name computation.
    fs::path root = fs::is_directory(sourcePath)
                        ? sourcePath
                        : sourcePath.parent_path();

    // Pre-compute table size to know where data starts.
    std::size_t tableSize = static_cast<std::size_t>(kHeaderSize);
    for (auto& p : absoluteFiles) {
        std::string name = normalisePath(
            fs::relative(p, root));
        // 2 (name_len) + name + 8+8+8+4+1
        tableSize += 2 + name.size() + 29;
    }

    fs::path tmpPath = fs::path(archivePath.string() + ".tmp");

    {
        std::ofstream out(tmpPath, std::ios::binary | std::ios::trunc);
        if (!out)
            throw ArchiveError("cannot create: " + tmpPath.string());

        // Skip past the header+table region (will fill in later).
        out.seekp(static_cast<std::streamoff>(tableSize));

        std::vector<FileEntry> entries;
        entries.reserve(absoluteFiles.size());
        uint64_t nextOffset = static_cast<uint64_t>(tableSize);

        for (auto& p : absoluteFiles) {
            FileEntry e;
            e.storedName   = normalisePath(fs::relative(p, root));
            e.originalSize = static_cast<uint64_t>(fs::file_size(p));
            e.dataOffset   = nextOffset;
            e.compType     = opts.compression;

            auto compressor = makeCompressor(opts.compression, opts.zlibLevel);
            CRC32 crc;

            readChunks(p, [&](const uint8_t* buf, std::size_t n) {
                crc.update(buf, n);
                compressor->feedChunk(buf, n, out);
            });

            e.compressedSize = compressor->finish(out);
            e.crc32          = crc.finalize();
            nextOffset      += e.compressedSize;

            if (opts.verbose) {
                double ratio = e.originalSize > 0
                    ? 100.0 * (1.0 - double(e.compressedSize) /
                                      double(e.originalSize))
                    : 0.0;
                std::cout << "  add  " << e.storedName
                          << "  " << e.originalSize
                          << " -> " << e.compressedSize
                          << "  (" << std::fixed << std::setprecision(1)
                          << ratio << "% saved)\n";
            }

            entries.push_back(std::move(e));
        }

        // Seek back and write header + file table.
        out.seekp(0);
        writeHeader(out, static_cast<uint32_t>(entries.size()));
        for (auto& e : entries)
            writeTableEntry(out, e);

        out.flush();
        if (!out)
            throw ArchiveError("write failed: " + tmpPath.string());
    }

    std::error_code ec;
    fs::rename(tmpPath, archivePath, ec);
    if (ec) {
        fs::remove(tmpPath);
        throw ArchiveError("rename failed: " + ec.message());
    }

    return absoluteFiles.size();
}

// ---- extract ---------------------------------------------------------------

std::size_t Archive::extract(const fs::path& archivePath,
                              const fs::path& outputDir,
                              const ExtractOptions& opts) {
    std::ifstream in(archivePath, std::ios::binary);
    if (!in)
        throw ArchiveError("cannot open: " + archivePath.string());

    uint32_t count = readHeader(in);
    auto entries   = readFileTable(in, count);

    fs::create_directories(outputDir);

    for (auto& e : entries) {
        fs::path dest = e.outputPath(outputDir);
        fs::create_directories(dest.parent_path());

        if (opts.verbose)
            std::cout << "  extract  " << e.storedName << "\n";

        auto decompressor = makeDecompressor(e.compType);
        CRC32 crc;

        atomicWrite(dest, [&](std::ofstream& out) {
            // Use a stringstream as an intermediary so we can CRC the output.
            std::ostringstream buf(std::ios::binary);
            in.seekg(static_cast<std::streamoff>(e.dataOffset));
            decompressor->decompress(in, buf, e.compressedSize,
                                     e.originalSize);
            const std::string& data = buf.str();
            crc.update(reinterpret_cast<const uint8_t*>(data.data()),
                       data.size());
            out.write(data.data(),
                      static_cast<std::streamsize>(data.size()));
        });

        if (opts.verifyCrc && crc.finalize() != e.crc32)
            throw ArchiveError("CRC32 mismatch for: " + e.storedName);
    }

    return entries.size();
}

// ---- list ------------------------------------------------------------------

void Archive::list(const fs::path& archivePath, std::ostream& out) {
    std::ifstream in(archivePath, std::ios::binary);
    if (!in)
        throw ArchiveError("cannot open: " + archivePath.string());

    uint32_t count = readHeader(in);
    auto entries   = readFileTable(in, count);

    out << std::left
        << std::setw(40) << "Name"
        << std::right
        << std::setw(12) << "Original"
        << std::setw(12) << "Compressed"
        << std::setw(8)  << "Ratio"
        << std::setw(10) << "CRC32"
        << std::setw(8)  << "Type"
        << "\n"
        << std::string(90, '-') << "\n";

    for (auto& e : entries) {
        double ratio = e.originalSize > 0
            ? 100.0 * (1.0 - double(e.compressedSize) / double(e.originalSize))
            : 0.0;

        out << std::left  << std::setw(40) << e.storedName
            << std::right << std::setw(12) << e.originalSize
                          << std::setw(12) << e.compressedSize
                          << std::setw(7)  << std::fixed
                          << std::setprecision(1) << ratio << "%"
                          << "  " << std::hex << std::uppercase
                          << std::setfill('0') << std::setw(8) << e.crc32
                          << std::setfill(' ') << std::dec
                          << std::setw(8)
                          << (e.compType == CompType::Deflate ? "deflate"
                                                              : "store")
            << "\n";
    }

    out << std::string(90, '-') << "\n"
        << entries.size() << " file(s)\n";
}

} // namespace myar
