import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    // Tree-shake the heavy barrel exports so the initial bundle stays lean.
    optimizePackageImports: ["@react-three/drei", "framer-motion"],
  },
};

export default nextConfig;
