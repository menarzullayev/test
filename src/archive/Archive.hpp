#pragma once
#include "FileEntry.hpp"
#include "../utils/FileUtils.hpp"
#include <filesystem>
#include <iosfwd>
#include <vector>
#include <stdexcept>
#include <zlib.h>

namespace myar {

namespace fs = std::filesystem;

struct ArchiveError : std::runtime_error {
    using std::runtime_error::runtime_error;
};

struct CreateOptions {
    CompType compression = CompType::Deflate;
    int      zlibLevel   = Z_DEFAULT_COMPRESSION;
    bool     verbose     = false;
};

struct ExtractOptions {
    bool verbose   = false;
    bool verifyCrc = true;
};

class Archive {
public:
    // Create .myar from all files under sourcePath (recursively).
    // Returns number of files archived.
    static std::size_t create(const fs::path& archivePath,
                              const fs::path& sourcePath,
                              const CreateOptions& opts = {});

    // Extract all files into outputDir.
    // Returns number of files extracted.
    static std::size_t extract(const fs::path& archivePath,
                               const fs::path& outputDir,
                               const ExtractOptions& opts = {});

    // Print listing to out.
    static void list(const fs::path& archivePath,
                     std::ostream& out);

private:
    static constexpr char     kMagic[4] = {'M','Y','A','R'};
    static constexpr uint16_t kVersion  = 1;
    static constexpr int      kHeaderSize = 16;

    static void writeHeader(std::ostream& out, uint32_t fileCount);
    static void writeTableEntry(std::ostream& out, const FileEntry& e);
    static uint32_t readHeader(std::istream& in);
    static FileEntry readTableEntry(std::istream& in);
    static std::vector<FileEntry> readFileTable(std::istream& in,
                                                uint32_t count);
};

} // namespace myar
