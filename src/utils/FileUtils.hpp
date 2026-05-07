#pragma once
#include <filesystem>
#include <fstream>
#include <functional>
#include <string>
#include <vector>
#include <cstdint>
#include <stdexcept>

namespace myar {

struct IoError : std::runtime_error {
    using std::runtime_error::runtime_error;
};

namespace fs = std::filesystem;

inline constexpr std::size_t kChunkSize = 64 * 1024;

// Recursively enumerate all regular files under root, sorted.
[[nodiscard]] std::vector<fs::path> collectFiles(const fs::path& root);

// Call visitor(buf, n) for each chunk of the file at src.
void readChunks(const fs::path& src,
                std::function<void(const uint8_t*, std::size_t)> visitor);

// Read exactly byteCount bytes from stream starting at offset, in chunks.
void readChunksAt(std::ifstream& stream,
                  uint64_t offset,
                  uint64_t byteCount,
                  std::function<void(const uint8_t*, std::size_t)> visitor);

// Write dest+".tmp" via writer callback, then rename to dest.
void atomicWrite(const fs::path& dest,
                 std::function<void(std::ofstream&)> writer);

// Little-endian serialisation helpers (shift-and-mask, no UB).
void writeLE16(std::ostream& out, uint16_t v);
void writeLE32(std::ostream& out, uint32_t v);
void writeLE64(std::ostream& out, uint64_t v);

[[nodiscard]] uint16_t readLE16(std::istream& in);
[[nodiscard]] uint32_t readLE32(std::istream& in);
[[nodiscard]] uint64_t readLE64(std::istream& in);

// Normalise path to forward-slash string, stripped of leading "./".
[[nodiscard]] std::string normalisePath(const fs::path& p);

} // namespace myar
