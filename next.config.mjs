import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const archivedEnglishNewsSlugs = [
  'accountant/group-travel-management-how-can-travelworks-software-help-you-maximize-billing',
  'travelworks-launches-accounting-software',
  'agency-growth-benchmarks-for-2026',
  'automation-qa-checklist-for-travel-operations',
  'how-to-maximize-the-use-of-your-credit-card-in-travelworks',
  'platform-performance-update-faster-dashboard-loading',
  'how-to-speed-up-reconciliation-without-losing-accuracy',
  'security-playbook-preparing-your-agency-for-peak-season',
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/au',
        destination: '/en-au',
        permanent: true,
      },
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/clients',
        destination: '/about-us/clients',
        permanent: true,
      },
      {
        source: '/tour-online',
        destination: '/travel-agency-software/tour-online',
        permanent: true,
      },
      {
        source: '/tour-management',
        destination: '/travel-agency-software/tour-management',
        permanent: true,
      },
      {
        source:
          '/news/technology/travelworks-launches-trip-n-touch-mobile-application-that-will-be-highly-appreciated-by-travelers',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/news/accountant/accounting-for-travel-agencies-5-reasons-to-use-a-software-tailored-for-the-travel-industry',
        destination: '/',
        permanent: true,
      },
      {
        source: '/news/accountant/good-accounting-practices-for-new-travel-agency',
        destination: '/',
        permanent: true,
      },
      {
        source: '/news/featured/new-itinerary-builder-seamlessly-create-a-itinerary',
        destination: '/',
        permanent: true,
      },
      {
        source: '/careers',
        destination: '/about-us/careers',
        permanent: true,
      },
      {
        source: '/crm-tools',
        destination: '/travel-agency-software/crm-tools',
        permanent: true,
      },
      {
        source: '/benefits',
        destination: '/travel-agency-software/benefits',
        permanent: true,
      },
      {
        source: '/dashboard-reports-for-travel-agency',
        destination: '/travel-agency-software/dashboard-reports',
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
        source: '/about-us',
        destination: '/about-us/travelworks',
        permanent: true,
      },
      {
        source: '/training',
        destination: '/training/training-platform',
        permanent: true,
      },
      {
        source: '/travel-agency-software',
        destination: '/travel-agency-software/features',
        permanent: true,
      },
      {
        source: '/en-US/about-us',
        destination: '/about-us/travelworks',
        permanent: true,
      },
      {
        source: '/en-us/about-us',
        destination: '/about-us/travelworks',
        permanent: true,
      },
      {
        source: '/ca-en/about-us',
        destination: '/about-us/travelworks',
        permanent: true,
      },
      {
        source: '/au-en/about-us',
        destination: '/en-au/about-us/travelworks',
        permanent: true,
      },
      {
        source: '/ca-fr/about-us',
        destination: '/fr/a-propos/pc-voyages',
        permanent: true,
      },
      {
        source: '/en-US/training',
        destination: '/training/training-platform',
        permanent: true,
      },
      {
        source: '/en-us/training',
        destination: '/training/training-platform',
        permanent: true,
      },
      {
        source: '/ca-en/training',
        destination: '/training/training-platform',
        permanent: true,
      },
      {
        source: '/au-en/training',
        destination: '/en-au/training/training-platform',
        permanent: true,
      },
      {
        source: '/ca-fr/training',
        destination: '/fr/formation/plateforme-de-formation',
        permanent: true,
      },
      {
        source: '/en-US/travel-agency-software',
        destination: '/travel-agency-software/features',
        permanent: true,
      },
      {
        source: '/en-us/travel-agency-software',
        destination: '/travel-agency-software/features',
        permanent: true,
      },
      {
        source: '/ca-en/travel-agency-software',
        destination: '/travel-agency-software/features',
        permanent: true,
      },
      {
        source: '/au-en/travel-agency-software',
        destination: '/en-au/travel-agency-software/features',
        permanent: true,
      },
      {
        source: '/ca-fr/travel-agency-software',
        destination: '/fr/logiciel-agence-voyage/fonctionnalites',
        permanent: true,
      },
      {
        source: '/en-US/:path*',
        destination: '/:path*',
        permanent: true,
      },
      {
        source: '/en-us/:path*',
        destination: '/:path*',
        permanent: true,
      },
      {
        source: '/au-en/:path*',
        destination: '/en-au/:path*',
        permanent: true,
      },
      {
        source: '/ca-fr/:path*',
        destination: '/fr/:path*',
        permanent: true,
      },
      {
        source: '/ca-en/:path*',
        destination: '/:path*',
        permanent: true,
      },
      {
        source: '/fr/about-us',
        destination: '/fr/a-propos/pc-voyages',
        permanent: true,
      },
      {
        source: '/fr/about-us/travelworks',
        destination: '/fr/a-propos/pc-voyages',
        permanent: true,
      },
      {
        source: '/fr/about-us/careers',
        destination: '/fr/a-propos/carrieres',
        permanent: true,
      },
      {
        source: '/fr/about-us/:slug',
        destination: '/fr/a-propos/:slug',
        permanent: true,
      },
      {
        source: '/fr/training',
        destination: '/fr/formation/plateforme-de-formation',
        permanent: true,
      },
      {
        source: '/fr/training/training-platform',
        destination: '/fr/formation/plateforme-de-formation',
        permanent: true,
      },
      {
        source: '/fr/training/knowledge-base',
        destination: '/fr/formation/base-de-connaissances',
        permanent: true,
      },
      {
        source: '/fr/ask-for-a-demo',
        destination: '/fr/demander-une-demo',
        permanent: true,
      },
      {
        source: '/fr/thank-you',
        destination: '/fr/merci',
        permanent: true,
      },
      {
        source: '/fr/privacy-policy',
        destination: '/fr/politique-de-confidentialite',
        permanent: true,
      },
      {
        source: '/fr/travel-agency-software',
        destination: '/fr/logiciel-agence-voyage/fonctionnalites',
        permanent: true,
      },
      {
        source: '/fr/travel-agency-software/features',
        destination: '/fr/logiciel-agence-voyage/fonctionnalites',
        permanent: true,
      },
      {
        source: '/fr/travel-agency-software/benefits',
        destination: '/fr/logiciel-agence-voyage/avantages',
        permanent: true,
      },
      {
        source: '/fr/travel-agency-software/back-office-travel-agency',
        destination: '/fr/logiciel-agence-voyage/back-office-agence-voyage',
        permanent: true,
      },
      {
        source: '/fr/travel-agency-software/trip-details',
        destination: '/fr/logiciel-agence-voyage/details-du-voyage',
        permanent: true,
      },
      {
        source: '/fr/travel-agency-software/tour-management',
        destination: '/fr/logiciel-agence-voyage/gestion-des-tours',
        permanent: true,
      },
      {
        source: '/fr/travel-agency-software/crm-tools',
        destination: '/fr/logiciel-agence-voyage/outils-crm',
        permanent: true,
      },
      {
        source: '/fr/travel-agency-software/dashboard-reports',
        destination: '/fr/logiciel-agence-voyage/tableau-de-bord-rapports',
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
      {
        source: '/fr/nouvelles/travelworks-lance-son-nouveau-logiciel',
        destination: '/fr',
        permanent: true,
      },
      {
        source: '/fr/nouvelles/nouveau-createur-itineraires',
        destination: '/fr',
        permanent: true,
      },
      ...archivedEnglishNewsSlugs.map((slug) => ({
        source: `/news/${slug}`,
        destination: '/',
        permanent: true,
      })),
      {
        source: '/fr/news/back-office',
        destination: '/fr/nouvelles/back-office-travelworks',
        permanent: true,
      },
      {
        source: '/fr/news/:slug',
        destination: '/fr/nouvelles/:slug',
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: '/fr/a-propos',
        destination: '/fr/about-us',
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
