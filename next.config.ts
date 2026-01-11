import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable static export of error pages to avoid SSR issues
  experimental: {
    // Optimize package imports
    optimizePackageImports: ['gsap'],
  },
};

export default nextConfig;
