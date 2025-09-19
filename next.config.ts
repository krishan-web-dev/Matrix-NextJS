import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // output: "export", // UNCOMMENT TO ENABLE STATIC EXPORT.
  // images: { unoptimized: true }, // UNCOMMENT TO ENABLE STATIC EXPORT.
  reactStrictMode: false,
  webpack: (config) => {
    // Add alias for @ to point to the src directory
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"),
    };
    return config;
  },
};

export default nextConfig;
