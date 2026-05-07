#include "archive/Archive.hpp"
#include <iostream>
#include <string_view>
#include <vector>

static void usage(const char* prog) {
    std::cerr
        << "Usage:\n"
        << "  " << prog << " create  <archive.myar> <source-path> [--store] [--level N] [-v]\n"
        << "  " << prog << " extract <archive.myar> <output-dir>  [--no-verify] [-v]\n"
        << "  " << prog << " list    <archive.myar>\n";
}

int main(int argc, char* argv[]) {
    if (argc < 3) { usage(argv[0]); return 1; }

    std::string_view command = argv[1];
    myar::fs::path   archive = argv[2];

    try {
        if (command == "create") {
            if (argc < 4) { usage(argv[0]); return 1; }
            myar::fs::path source = argv[3];

            myar::CreateOptions opts;
            for (int i = 4; i < argc; ++i) {
                std::string_view arg = argv[i];
                if (arg == "--store") {
                    opts.compression = myar::CompType::Store;
                } else if (arg == "--level" && i + 1 < argc) {
                    opts.zlibLevel = std::stoi(argv[++i]);
                } else if (arg == "-v") {
                    opts.verbose = true;
                } else {
                    std::cerr << "unknown flag: " << arg << "\n";
                    usage(argv[0]);
                    return 1;
                }
            }

            auto n = myar::Archive::create(archive, source, opts);
            std::cout << "Archived " << n << " file(s) -> " << archive << "\n";

        } else if (command == "extract") {
            myar::fs::path outputDir = (argc >= 4) ? argv[3] : ".";

            myar::ExtractOptions opts;
            int start = (argc >= 4) ? 4 : 3;
            for (int i = start; i < argc; ++i) {
                std::string_view arg = argv[i];
                if (arg == "--no-verify") {
                    opts.verifyCrc = false;
                } else if (arg == "-v") {
                    opts.verbose = true;
                } else {
                    std::cerr << "unknown flag: " << arg << "\n";
                    usage(argv[0]);
                    return 1;
                }
            }

            auto n = myar::Archive::extract(archive, outputDir, opts);
            std::cout << "Extracted " << n << " file(s) to " << outputDir << "\n";

        } else if (command == "list") {
            myar::Archive::list(archive, std::cout);

        } else {
            std::cerr << "unknown command: " << command << "\n";
            usage(argv[0]);
            return 1;
        }

    } catch (const myar::ArchiveError& e) {
        std::cerr << "Archive error: " << e.what() << "\n";
        return 2;
    } catch (const myar::IoError& e) {
        std::cerr << "I/O error: " << e.what() << "\n";
        return 3;
    } catch (const std::exception& e) {
        std::cerr << "Error: " << e.what() << "\n";
        return 1;
    }

    return 0;
}
