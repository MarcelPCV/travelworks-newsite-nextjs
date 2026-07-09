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
      {
        source: '/fr-ca/news',
        destination: '/fr-ca/nouvelles',
        permanent: true,
      },
      {
        source: '/fr-ca/news/page/:page',
        destination: '/fr-ca/nouvelles/page/:page',
        permanent: true,
      },
      {
        source: '/fr-ca/news/category/accounting',
        destination: '/fr-ca/nouvelles/categorie/comptabilite',
        permanent: true,
      },
      {
        source: '/fr-ca/news/category/agency-owner',
        destination: '/fr-ca/nouvelles/categorie/proprietaire-agence',
        permanent: true,
      },
      {
        source: '/fr-ca/news/category/it-manager',
        destination: '/fr-ca/nouvelles/categorie/gestionnaire-ti',
        permanent: true,
      },
      {
        source: '/fr-ca/news/category/technology',
        destination: '/fr-ca/nouvelles/categorie/technologie',
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
      {
        source: '/fr-ca/nouvelles',
        destination: '/fr-ca/news',
      },
      {
        source: '/fr-ca/nouvelles/page/:page',
        destination: '/fr-ca/news/page/:page',
      },
      {
        source: '/fr-ca/nouvelles/categorie/comptabilite',
        destination: '/fr-ca/news/category/accounting',
      },
      {
        source: '/fr-ca/nouvelles/categorie/proprietaire-agence',
        destination: '/fr-ca/news/category/agency-owner',
      },
      {
        source: '/fr-ca/nouvelles/categorie/gestionnaire-ti',
        destination: '/fr-ca/news/category/it-manager',
      },
      {
        source: '/fr-ca/nouvelles/categorie/technologie',
        destination: '/fr-ca/news/category/technology',
      },
      {
        source: '/fr-ca/nouvelles/:slug',
        destination: '/fr-ca/news/:slug',
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
