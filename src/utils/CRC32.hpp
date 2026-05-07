#pragma once
#include <cstdint>
#include <cstddef>

namespace myar {

class CRC32 {
public:
    CRC32();
    void     update(const uint8_t* data, size_t len);
    uint32_t finalize() const;
    void     reset();

    static uint32_t compute(const uint8_t* data, size_t len);

private:
    uint32_t state_;
};

} // namespace myar
