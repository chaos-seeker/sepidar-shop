import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.mirashjacket.ir',
      },
      {
        protocol: 'https',
        hostname: 'api.shabestaristore.ir',
      },
      {
        protocol: 'https',
        hostname: 'dev.sepidargroup.com',
      },
    ],
  },
};

export default nextConfig;
