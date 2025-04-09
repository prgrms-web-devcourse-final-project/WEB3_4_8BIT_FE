import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'devcouse4-team13-bucket.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/post/**',
        search: '',
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
