#include "Compressor.hpp"
#include <array>
#include <cstring>

namespace myar {

// ---- StoreCompressor -------------------------------------------------------

void StoreCompressor::feedChunk(const uint8_t* data, std::size_t len,
                                std::ostream& out) {
    out.write(reinterpret_cast<const char*>(data),
              static_cast<std::streamsize>(len));
    written_ += len;
}

uint64_t StoreCompressor::finish(std::ostream&) { return written_; }

uint64_t StoreCompressor::bytesWritten() const noexcept { return written_; }

// ---- StoreDecompressor -----------------------------------------------------

void StoreDecompressor::decompress(std::istream& in, std::ostream& out,
                                   uint64_t compressedBytes,
                                   uint64_t expectedOriginalSize) {
    if (compressedBytes != expectedOriginalSize)
        throw CompressionError("store entry: size mismatch");

    std::array<uint8_t, kChunkSize> buf;
    uint64_t remaining = compressedBytes;
    while (remaining > 0) {
        auto toRead = static_cast<std::streamsize>(
            std::min(remaining, static_cast<uint64_t>(kChunkSize)));
        in.read(reinterpret_cast<char*>(buf.data()), toRead);
        auto n = in.gcount();
        if (n <= 0) throw CompressionError("unexpected end of data");
        out.write(reinterpret_cast<const char*>(buf.data()), n);
        remaining -= static_cast<uint64_t>(n);
    }
}

// ---- ZlibCompressor --------------------------------------------------------

ZlibCompressor::ZlibCompressor(int level) {
    std::memset(&stream_, 0, sizeof(stream_));
    // windowBits=-15 → raw deflate (no zlib header/trailer)
    int ret = deflateInit2(&stream_, level, Z_DEFLATED,
                           -15, 8, Z_DEFAULT_STRATEGY);
    if (ret != Z_OK)
        throw CompressionError("deflateInit2 failed: " +
                               std::string(stream_.msg ? stream_.msg : ""));
    initialised_ = true;
}

ZlibCompressor::~ZlibCompressor() {
    if (initialised_)
        deflateEnd(&stream_);
}

void ZlibCompressor::feedChunk(const uint8_t* data, std::size_t len,
                               std::ostream& out) {
    stream_.next_in  = const_cast<Bytef*>(data);
    stream_.avail_in = static_cast<uInt>(len);

    while (stream_.avail_in > 0) {
        stream_.next_out  = outBuf_;
        stream_.avail_out = sizeof(outBuf_);
        int ret = deflate(&stream_, Z_NO_FLUSH);
        if (ret == Z_STREAM_ERROR)
            throw CompressionError("deflate stream error");
        std::size_t produced = sizeof(outBuf_) - stream_.avail_out;
        out.write(reinterpret_cast<const char*>(outBuf_),
                  static_cast<std::streamsize>(produced));
        written_ += produced;
    }
}

uint64_t ZlibCompressor::finish(std::ostream& out) {
    stream_.avail_in = 0;
    int ret;
    do {
        stream_.next_out  = outBuf_;
        stream_.avail_out = sizeof(outBuf_);
        ret = deflate(&stream_, Z_FINISH);
        if (ret == Z_STREAM_ERROR)
            throw CompressionError("deflate finish error");
        std::size_t produced = sizeof(outBuf_) - stream_.avail_out;
        out.write(reinterpret_cast<const char*>(outBuf_),
                  static_cast<std::streamsize>(produced));
        written_ += produced;
    } while (ret != Z_STREAM_END);

    deflateEnd(&stream_);
    initialised_ = false;
    return written_;
}

uint64_t ZlibCompressor::bytesWritten() const noexcept { return written_; }

// ---- ZlibDecompressor ------------------------------------------------------

void ZlibDecompressor::decompress(std::istream& in, std::ostream& out,
                                  uint64_t compressedBytes,
                                  uint64_t expectedOriginalSize) {
    z_stream stream{};
    // windowBits=-15 → raw inflate matching the compressor
    if (inflateInit2(&stream, -15) != Z_OK)
        throw CompressionError("inflateInit2 failed");

    std::array<uint8_t, kChunkSize> inBuf;
    std::array<uint8_t, kChunkSize> outBuf;

    uint64_t remaining    = compressedBytes;
    uint64_t totalOut     = 0;
    int      ret          = Z_OK;

    while (remaining > 0 && ret != Z_STREAM_END) {
        auto toRead = static_cast<std::streamsize>(
            std::min(remaining, static_cast<uint64_t>(kChunkSize)));
        in.read(reinterpret_cast<char*>(inBuf.data()), toRead);
        auto n = in.gcount();
        if (n <= 0) {
            inflateEnd(&stream);
            throw CompressionError("unexpected end of compressed data");
        }
        remaining -= static_cast<uint64_t>(n);

        stream.next_in  = inBuf.data();
        stream.avail_in = static_cast<uInt>(n);

        while (stream.avail_in > 0) {
            stream.next_out  = outBuf.data();
            stream.avail_out = static_cast<uInt>(outBuf.size());
            ret = inflate(&stream, Z_NO_FLUSH);
            if (ret == Z_STREAM_ERROR || ret == Z_DATA_ERROR ||
                ret == Z_MEM_ERROR) {
                inflateEnd(&stream);
                throw CompressionError("inflate error: " +
                    std::string(stream.msg ? stream.msg : "unknown"));
            }
            std::size_t produced = outBuf.size() - stream.avail_out;
            out.write(reinterpret_cast<const char*>(outBuf.data()),
                      static_cast<std::streamsize>(produced));
            totalOut += produced;
            if (ret == Z_STREAM_END) break;
        }
    }

    inflateEnd(&stream);

    if (totalOut != expectedOriginalSize)
        throw CompressionError(
            "decompressed size mismatch: got " + std::to_string(totalOut) +
            ", expected " + std::to_string(expectedOriginalSize));
}

// ---- Factories -------------------------------------------------------------

std::unique_ptr<ICompressor> makeCompressor(CompType type, int level) {
    if (type == CompType::Deflate)
        return std::make_unique<ZlibCompressor>(level);
    return std::make_unique<StoreCompressor>();
}

std::unique_ptr<IDecompressor> makeDecompressor(CompType type) {
    if (type == CompType::Deflate)
        return std::make_unique<ZlibDecompressor>();
    return std::make_unique<StoreDecompressor>();
}

} // namespace myar
