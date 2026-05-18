cmake_minimum_required(VERSION 3.16)
project(myar CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

find_package(ZLIB REQUIRED)

set(COMMON_SOURCES
    src/archive/Archive.cpp
    src/archive/Compressor.cpp
    src/utils/CRC32.cpp
    src/utils/FileUtils.cpp
)

add_executable(myar src/main.cpp ${COMMON_SOURCES})
target_include_directories(myar PRIVATE src)
target_link_libraries(myar PRIVATE ZLIB::ZLIB)
target_compile_options(myar PRIVATE -Wall -Wextra -O2)

enable_testing()
add_executable(test_basic tests/test_basic.cpp ${COMMON_SOURCES})
target_include_directories(test_basic PRIVATE src)
target_link_libraries(test_basic PRIVATE ZLIB::ZLIB)
add_test(NAME basic COMMAND test_basic)
