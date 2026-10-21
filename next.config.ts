import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/morainex",
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
