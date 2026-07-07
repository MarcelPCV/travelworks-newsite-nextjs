import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

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
        source: '/fr-ca/a-propos',
        destination: '/fr-ca/about-us',
      },
      {
        source: '/fr-ca/a-propos/partenaires',
        destination: '/fr-ca/about-us/partners',
      },
      {
        source: '/fr-ca/a-propos/pc-voyages',
        destination: '/fr-ca/about-us/travelworks',
      },
      {
        source: '/fr-ca/a-propos/:slug',
        destination: '/fr-ca/about-us/:slug',
      },
      {
        source: '/fr-ca/logiciel-agence-voyage/fonctionnalites',
        destination: '/fr-ca/travel-agency-software/features',
      },
      {
        source: '/fr-ca/logiciel-agence-voyage/avantages',
        destination: '/fr-ca/travel-agency-software/benefits',
      },
      {
        source: '/fr-ca/logiciel-agence-voyage/back-office-agence-voyage',
        destination: '/fr-ca/travel-agency-software/back-office-travel-agency',
      },
      {
        source: '/fr-ca/logiciel-agence-voyage/details-du-voyage',
        destination: '/fr-ca/travel-agency-software/trip-details',
      },
      {
        source: '/fr-ca/logiciel-agence-voyage/gestion-des-tours',
        destination: '/fr-ca/travel-agency-software/tour-management',
      },
      {
        source: '/fr-ca/logiciel-agence-voyage/outils-crm',
        destination: '/fr-ca/travel-agency-software/crm-tools',
      },
      {
        source: '/fr-ca/logiciel-agence-voyage/integration-multiple',
        destination: '/fr-ca/travel-agency-software/multiple-integration',
      },
      {
        source: '/fr-ca/logiciel-agence-voyage/tableau-de-bord-rapports',
        destination: '/fr-ca/travel-agency-software/dashboard-reports',
      },
      {
        source: '/fr-ca/logiciel-agence-voyage/customizations',
        destination: '/fr-ca/travel-agency-software/customizations',
      },
      {
        source: '/fr-ca/logiciel-agence-voyage/:slug',
        destination: '/fr-ca/travel-agency-software/:slug',
      },
      {
        source: '/fr-ca/formation/plateforme-de-formation',
        destination: '/fr-ca/training/training-platform',
      },
      {
        source: '/fr-ca/formation/base-de-connaissances',
        destination: '/fr-ca/training/knowledge-base',
      },
      {
        source: '/fr-ca/demander-une-demo',
        destination: '/fr-ca/ask-for-a-demo',
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

export default withNextIntl(nextConfig);
