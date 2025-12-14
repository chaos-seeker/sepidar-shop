import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.mirashjacket.ir',
      },
    ],
  },
};

export default nextConfig;
