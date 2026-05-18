#pragma once
#include <filesystem>
#include <string>
#include <cstdint>
#include <stdexcept>

namespace myar {

namespace fs = std::filesystem;

enum class CompType : uint8_t {
    Store   = 0,
    Deflate = 1,
};

struct FileEntry {
    std::string storedName;
    uint64_t    originalSize   = 0;
    uint64_t    compressedSize = 0;
    uint64_t    dataOffset     = 0;
    uint32_t    crc32          = 0;
    CompType    compType       = CompType::Store;

    // Serialised size of this entry in the file table.
    std::size_t tableEntrySize() const {
        return 2 + storedName.size() + 8 + 8 + 8 + 4 + 1;
    }

    // Build storedName relative to root, forward-slash separated.
    static std::string makeStoredName(const fs::path& absolute,
                                      const fs::path& root) {
        auto rel = absolute.lexically_relative(root);
        return rel.generic_string();
    }

    // Reconstruct output path; rejects path-traversal components.
    fs::path outputPath(const fs::path& outputDir) const {
        fs::path result = outputDir;
        fs::path rel(storedName);
        for (auto& part : rel) {
            std::string s = part.string();
            if (s == ".." || s == "." || (!s.empty() && s[0] == '/'))
                throw std::runtime_error(
                    "unsafe path in archive: " + storedName);
            result /= part;
        }
        return result;
    }
};

} // namespace myar
