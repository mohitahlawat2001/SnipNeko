import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {},
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  eslint: {
    // Only run ESLint on these directories during production builds
    dirs: ['pages', 'utils', 'components', 'lib'],
    // Disable ESLint during builds (not recommended for production)
    // ignoreDuringBuilds: true,
  },
};

export default nextConfig;
