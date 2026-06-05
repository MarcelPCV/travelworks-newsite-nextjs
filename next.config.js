/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/en-ca/home',
        destination: '/en-ca',
        permanent: true,
      },
      {
        source: '/fr-ca/accueil',
        destination: '/fr-ca',
        permanent: true,
      },
      {
        source: '/fr-ca/home',
        destination: '/fr-ca',
        permanent: true,
      },
      {
        source: '/en-au/home',
        destination: '/en-au',
        permanent: true,
      },
      {
        source: '/fr-ca/travel-agency-software/:slug',
        destination: '/fr-ca/logiciel-agence-voyage/:slug',
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: '/au',
        destination: '/en-au',
      },
      {
        source: '/fr-ca/logiciel-agence-voyage/:slug',
        destination: '/fr-ca/travel-agency-software/:slug',
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'travelworks-newsite-payload-cms.vercel.app',
        pathname: '/**',
      },
    ],
  },
  
};

module.exports = nextConfig;