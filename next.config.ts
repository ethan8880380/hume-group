import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Redirect old blog URLs from /:category/:slug to /blog/:slug
      // Examples: /uncategorized/what-is-the-wedge-in-tacoma -> /blog/what-is-the-wedge-in-tacoma
      {
        source: '/uncategorized/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      {
        source: '/real-estate/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      {
        source: '/news/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      {
        source: '/market-updates/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      {
        source: '/tips/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      {
        source: '/neighborhoods/:category/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      // Catch-all for any other category patterns (two-segment paths that aren't known routes)
      // Note: Be careful with this - it will redirect any /something/something-else pattern
      // Only uncomment if needed:
      // {
      //   source: '/:category((?!blog|about|buying|selling|contact|listings|neighborhoods|communities|api|_next).[^/]+)/:slug',
      //   destination: '/blog/:slug',
      //   permanent: true,
      // },
    ];
  },
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
      // SimplyRETS S3 CDN for property images
      {
        protocol: 'https',
        hostname: 's3-us-west-2.amazonaws.com',
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
      // Ghost CMS image domains
      {
        protocol: 'https',
        hostname: 'demo.ghost.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static.ghost.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.ghost.io',
        port: '',
        pathname: '/**',
      },
      // Your actual Ghost site domains
      {
        protocol: 'https',
        hostname: 'www.thehumegroup.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'thehumegroup.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'the-hume-group.ghost.io',
        port: '',
        pathname: '/**',
      },
      // Google for reviews
      {
        protocol: 'https',
        hostname: 'www.google.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
