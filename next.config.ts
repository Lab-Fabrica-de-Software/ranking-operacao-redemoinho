import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    ADMIN_KEY: process.env.ADMIN_KEY,
  }
};

export default nextConfig;
