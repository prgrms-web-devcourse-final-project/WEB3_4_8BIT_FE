import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "devcouse4-team13-bucket.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
  },
  // TODO 추후 수정 필요
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // TODO 추후 꼭 false로 바꿔줘야 함
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  output : 'standalone',
};

export default nextConfig;
