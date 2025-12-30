import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // ============================================
      // SPECIFIC REDIRECTS (must come before general patterns)
      // ============================================
      
      // Slug changes within /blog
      {
        source: '/blog/what-is-the-wedge-in-tacoma-2',
        destination: '/blog/what-is-the-wedge-in-tacoma',
        permanent: true,
      },
      {
        source: '/blog/should-sellers-pay-buyer-brokers-2',
        destination: '/blog/should-sellers-pay-buyer-brokers',
        permanent: true,
      },
      {
        source: '/blog/avoid-these-6-costly-mistakes-when-selling-your-home-2',
        destination: '/blog/avoid-these-6-costly-mistakes-when-selling-your-home',
        permanent: true,
      },
      {
        source: '/blog/can-a-seller-back-out-of-the-deal-2',
        destination: '/blog/can-a-seller-back-out-of-the-deal',
        permanent: true,
      },
      {
        source: '/blog/should-sellers-pay-buyer-brokers',
        destination: '/blog/seller-paying-buyer-closing-costs',
        permanent: true,
      },
      
      // One-off page redirect
      {
        source: '/west-end',
        destination: '/neighborhoods/west-end-tacoma',
        permanent: true,
      },
      
      // Deep attachment/nested redirects
      {
        source: '/listing-your-tacoma-home/is-staging-worth-the-investment/attachment/37-web-or-mls-pana5406',
        destination: '/blog/is-staging-worth-the-investment',
        permanent: true,
      },
      {
        source: '/listing-your-tacoma-home/is-staging-worth-the-investment/attachment/35-web-or-mls-pana5396',
        destination: '/blog/is-staging-worth-the-investment',
        permanent: true,
      },
      {
        source: '/listing-your-tacoma-home/is-there-tax-on-real-estate-sales-in-tacoma/attachment/real-estate-tax-uncle-sam',
        destination: '/blog/is-there-tax-on-real-estate-sales-in-tacoma',
        permanent: true,
      },
      {
        source: '/listing-your-tacoma-home/real-estate-contingencies-defined/attachment/contingency-shroud-in-mystery',
        destination: '/blog/real-estate-contingencies-defined',
        permanent: true,
      },
      
      // Specific slug mappings (different destination slug)
      {
        source: '/listing-your-tacoma-home/avoid-these-6-costly-mistakes-when-selling-your-home',
        destination: '/blog/should-sellers-pay-buyer-brokers',
        permanent: true,
      },
      {
        source: '/listing-your-tacoma-home/can-a-seller-back-out-of-the-deal',
        destination: '/blog/can-a-seller-back-out-of-the-deal-2',
        permanent: true,
      },
      
      // ============================================
      // CATEGORY PATTERN REDIRECTS
      // ============================================
      
      // Original categories
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
      
      // Additional categories from old site
      {
        source: '/best-tacoma-places/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      {
        source: '/6th-ave-district/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      {
        source: '/making-tacoma-a-better-place/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      {
        source: '/info-for-buyers/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      {
        source: '/listing-your-tacoma-home/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
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
