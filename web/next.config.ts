import type { NextConfig } from "next";

// STATIC_EXPORT=1 produces a fully static build (used by the GitHub Pages
// workflow); BASE_PATH handles subpath hosting like username.github.io/repo.
const isStaticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  ...(isStaticExport && {
    output: "export" as const,
    basePath: process.env.BASE_PATH ?? "",
    trailingSlash: true,
  }),
  experimental: {
    // Tree-shake the heavy barrel exports so the initial bundle stays lean.
    optimizePackageImports: ["@react-three/drei", "framer-motion"],
  },
};

export default nextConfig;
