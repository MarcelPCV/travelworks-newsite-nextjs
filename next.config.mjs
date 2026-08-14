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
        source: '/fr/accueil',
        destination: '/fr',
        permanent: true,
      },
      {
        source: '/fr/home',
        destination: '/fr',
        permanent: true,
      },
      {
        source: '/en-au/home',
        destination: '/en-au',
        permanent: true,
      },
      {
        source: '/fr/travel-agency-software/:slug',
        destination: '/fr/logiciel-agence-voyage/:slug',
        permanent: true,
      },
      {
        source: '/fr/news',
        destination: '/fr/nouvelles',
        permanent: true,
      },
      {
        source: '/fr/news/page/:page',
        destination: '/fr/nouvelles/page/:page',
        permanent: true,
      },
      {
        source: '/fr/news/category/accounting',
        destination: '/fr/nouvelles/categorie/comptabilite',
        permanent: true,
      },
      {
        source: '/fr/news/category/agency-owner',
        destination: '/fr/nouvelles/categorie/proprietaire-agence',
        permanent: true,
      },
      {
        source: '/fr/news/category/it-manager',
        destination: '/fr/nouvelles/categorie/gestionnaire-ti',
        permanent: true,
      },
      {
        source: '/fr/news/category/technology',
        destination: '/fr/nouvelles/categorie/technologie',
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
        source: '/fr/a-propos',
        destination: '/fr/about-us',
      },
      {
        source: '/fr/a-propos/partenaires',
        destination: '/fr/about-us/partners',
      },
      {
        source: '/fr/a-propos/pc-voyages',
        destination: '/fr/about-us/travelworks',
      },
      {
        source: '/fr/a-propos/:slug',
        destination: '/fr/about-us/:slug',
      },
      {
        source: '/fr/logiciel-agence-voyage/fonctionnalites',
        destination: '/fr/travel-agency-software/features',
      },
      {
        source: '/fr/logiciel-agence-voyage/avantages',
        destination: '/fr/travel-agency-software/benefits',
      },
      {
        source: '/fr/logiciel-agence-voyage/back-office-agence-voyage',
        destination: '/fr/travel-agency-software/back-office-travel-agency',
      },
      {
        source: '/fr/logiciel-agence-voyage/details-du-voyage',
        destination: '/fr/travel-agency-software/trip-details',
      },
      {
        source: '/fr/logiciel-agence-voyage/gestion-des-tours',
        destination: '/fr/travel-agency-software/tour-management',
      },
      {
        source: '/fr/logiciel-agence-voyage/outils-crm',
        destination: '/fr/travel-agency-software/crm-tools',
      },
      {
        source: '/fr/logiciel-agence-voyage/integrations',
        destination: '/fr/travel-agency-software/integrations',
      },
      {
        source: '/fr/logiciel-agence-voyage/tableau-de-bord-rapports',
        destination: '/fr/travel-agency-software/dashboard-reports',
      },
      {
        source: '/fr/logiciel-agence-voyage/customizations',
        destination: '/fr/travel-agency-software/customizations',
      },
      {
        source: '/fr/logiciel-agence-voyage/:slug',
        destination: '/fr/travel-agency-software/:slug',
      },
      {
        source: '/fr/formation/plateforme-de-formation',
        destination: '/fr/training/training-platform',
      },
      {
        source: '/fr/formation/base-de-connaissances',
        destination: '/fr/training/knowledge-base',
      },
      {
        source: '/fr/demander-une-demo',
        destination: '/fr/ask-for-a-demo',
      },
      {
        source: '/fr/nouvelles',
        destination: '/fr/news',
      },
      {
        source: '/fr/nouvelles/page/:page',
        destination: '/fr/news/page/:page',
      },
      {
        source: '/fr/nouvelles/categorie/comptabilite',
        destination: '/fr/news/category/accounting',
      },
      {
        source: '/fr/nouvelles/categorie/proprietaire-agence',
        destination: '/fr/news/category/agency-owner',
      },
      {
        source: '/fr/nouvelles/categorie/gestionnaire-ti',
        destination: '/fr/news/category/it-manager',
      },
      {
        source: '/fr/nouvelles/categorie/technologie',
        destination: '/fr/news/category/technology',
      },
      {
        source: '/fr/nouvelles/:slug',
        destination: '/fr/news/:slug',
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
