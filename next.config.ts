import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd2bd5h5te3s67r.cloudfront.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'simplyrets.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.simplyrets.com',
        port: '',
        pathname: '/**',
      },
      // Add placekitten for fallback images
      {
        protocol: 'https',
        hostname: 'placekitten.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
