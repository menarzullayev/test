#pragma once
#include "FileEntry.hpp"
#include "../utils/FileUtils.hpp"
#include <iosfwd>
#include <cstdint>
#include <cstddef>
#include <memory>
#include <stdexcept>
#include <zlib.h>

namespace myar {

struct CompressionError : std::runtime_error {
    using std::runtime_error::runtime_error;
};

// Abstract compressor — streaming, feed chunks then finish.
class ICompressor {
public:
    virtual ~ICompressor() = default;
    virtual void     feedChunk(const uint8_t* data, std::size_t len,
                               std::ostream& out) = 0;
    virtual uint64_t finish(std::ostream& out) = 0;
    virtual uint64_t bytesWritten() const noexcept = 0;
};

// Abstract decompressor — reads from stream, writes to stream.
class IDecompressor {
public:
    virtual ~IDecompressor() = default;
    virtual void decompress(std::istream& in,
                            std::ostream& out,
                            uint64_t compressedBytes,
                            uint64_t expectedOriginalSize) = 0;
};

// Store (passthrough) compressor.
class StoreCompressor : public ICompressor {
public:
    void     feedChunk(const uint8_t* data, std::size_t len,
                       std::ostream& out) override;
    uint64_t finish(std::ostream& out) override;
    uint64_t bytesWritten() const noexcept override;
private:
    uint64_t written_ = 0;
};

class StoreDecompressor : public IDecompressor {
public:
    void decompress(std::istream& in, std::ostream& out,
                    uint64_t compressedBytes,
                    uint64_t expectedOriginalSize) override;
};

// Deflate compressor using raw zlib (windowBits=-15).
class ZlibCompressor : public ICompressor {
public:
    explicit ZlibCompressor(int level = Z_DEFAULT_COMPRESSION);
    ~ZlibCompressor() override;

    ZlibCompressor(const ZlibCompressor&)            = delete;
    ZlibCompressor& operator=(const ZlibCompressor&) = delete;

    void     feedChunk(const uint8_t* data, std::size_t len,
                       std::ostream& out) override;
    uint64_t finish(std::ostream& out) override;
    uint64_t bytesWritten() const noexcept override;

private:
    z_stream stream_{};
    bool     initialised_ = false;
    uint64_t written_     = 0;
    uint8_t  outBuf_[kChunkSize];
};

class ZlibDecompressor : public IDecompressor {
public:
    void decompress(std::istream& in, std::ostream& out,
                    uint64_t compressedBytes,
                    uint64_t expectedOriginalSize) override;
};

// Factory functions.
[[nodiscard]] std::unique_ptr<ICompressor>
makeCompressor(CompType type, int level = Z_DEFAULT_COMPRESSION);

[[nodiscard]] std::unique_ptr<IDecompressor>
makeDecompressor(CompType type);

} // namespace myar
