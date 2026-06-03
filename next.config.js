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

  // Rewrites replace simple proxy rewrites (formerly middleware)
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
};

module.exports = nextConfig;
