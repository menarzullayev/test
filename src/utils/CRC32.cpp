#include "CRC32.hpp"
#include <zlib.h>

namespace myar {

CRC32::CRC32() : state_(crc32(0, Z_NULL, 0)) {}

void CRC32::update(const uint8_t* data, size_t len) {
    state_ = crc32(state_, data, static_cast<uInt>(len));
}

uint32_t CRC32::finalize() const { return state_; }

void CRC32::reset() { state_ = crc32(0, Z_NULL, 0); }

uint32_t CRC32::compute(const uint8_t* data, size_t len) {
    CRC32 c;
    c.update(data, len);
    return c.finalize();
}

} // namespace myar
