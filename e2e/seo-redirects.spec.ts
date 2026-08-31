import { expect, test } from '@playwright/test';

type RedirectCase = {
  source: string;
  destination: string;
};

const redirects: RedirectCase[] = [
  { source: '/au', destination: '/en-au' },
  { source: '/home', destination: '/' },
  { source: '/fr/accueil', destination: '/fr' },
  { source: '/fr/home', destination: '/fr' },
  { source: '/en-au/home', destination: '/en-au' },
  { source: '/about-us', destination: '/about-us/travelworks' },
  { source: '/training', destination: '/training/training-platform' },
  { source: '/travel-agency-software', destination: '/travel-agency-software/features' },
  { source: '/en-US/about-us', destination: '/about-us/travelworks' },
  { source: '/en-us/training/knowledge-base', destination: '/training/knowledge-base' },
  { source: '/au-en/about-us', destination: '/en-au/about-us/travelworks' },
  { source: '/ca-fr/about-us', destination: '/fr/a-propos/pc-voyages' },
  { source: '/ca-en/about-us', destination: '/about-us/travelworks' },
  { source: '/fr/about-us', destination: '/fr/a-propos/pc-voyages' },
  { source: '/fr/about-us/travelworks', destination: '/fr/a-propos/pc-voyages' },
  { source: '/fr/about-us/careers', destination: '/fr/a-propos/carrieres' },
  { source: '/fr/about-us/contact', destination: '/fr/a-propos/contact' },
  { source: '/fr/training', destination: '/fr/formation/plateforme-de-formation' },
  {
    source: '/fr/training/training-platform',
    destination: '/fr/formation/plateforme-de-formation',
  },
  {
    source: '/fr/training/knowledge-base',
    destination: '/fr/formation/base-de-connaissances',
  },
  { source: '/fr/ask-for-a-demo', destination: '/fr/demander-une-demo' },
  { source: '/fr/thank-you', destination: '/fr/merci' },
  { source: '/fr/privacy-policy', destination: '/fr/politique-de-confidentialite' },
  {
    source: '/fr/travel-agency-software',
    destination: '/fr/logiciel-agence-voyage/fonctionnalites',
  },
  {
    source: '/fr/travel-agency-software/features',
    destination: '/fr/logiciel-agence-voyage/fonctionnalites',
  },
  {
    source: '/fr/travel-agency-software/benefits',
    destination: '/fr/logiciel-agence-voyage/avantages',
  },
  {
    source: '/fr/travel-agency-software/back-office-travel-agency',
    destination: '/fr/logiciel-agence-voyage/back-office-agence-voyage',
  },
  {
    source: '/fr/travel-agency-software/trip-details',
    destination: '/fr/logiciel-agence-voyage/details-du-voyage',
  },
  {
    source: '/fr/travel-agency-software/tour-management',
    destination: '/fr/logiciel-agence-voyage/gestion-des-tours',
  },
  {
    source: '/fr/travel-agency-software/crm-tools',
    destination: '/fr/logiciel-agence-voyage/outils-crm',
  },
  {
    source: '/fr/travel-agency-software/dashboard-reports',
    destination: '/fr/logiciel-agence-voyage/tableau-de-bord-rapports',
  },
  {
    source: '/fr/travel-agency-software/sirev',
    destination: '/fr/logiciel-agence-voyage/sirev',
  },
  {
    source: '/fr/travel-agency-software/tour-online',
    destination: '/fr/logiciel-agence-voyage/tour-online',
  },
  { source: '/fr/news', destination: '/fr/nouvelles' },
  { source: '/fr/news/page/2', destination: '/fr/nouvelles/page/2' },
  {
    source: '/fr/news/category/accounting',
    destination: '/fr/nouvelles/categorie/comptabilite',
  },
  {
    source: '/fr/news/category/agency-owner',
    destination: '/fr/nouvelles/categorie/proprietaire-agence',
  },
  {
    source: '/fr/news/category/it-manager',
    destination: '/fr/nouvelles/categorie/gestionnaire-ti',
  },
  {
    source: '/fr/news/category/technology',
    destination: '/fr/nouvelles/categorie/technologie',
  },
  { source: '/fr/news/back-office', destination: '/fr/nouvelles/back-office-travelworks' },
  { source: '/news/travelworks-launches-accounting-software', destination: '/' },
  { source: '/news/agency-growth-benchmarks-for-2026', destination: '/' },
  { source: '/news/automation-qa-checklist-for-travel-operations', destination: '/' },
  {
    source: '/news/how-to-maximize-the-use-of-your-credit-card-in-travelworks',
    destination: '/',
  },
  { source: '/news/platform-performance-update-faster-dashboard-loading', destination: '/' },
  { source: '/news/how-to-speed-up-reconciliation-without-losing-accuracy', destination: '/' },
  { source: '/news/security-playbook-preparing-your-agency-for-peak-season', destination: '/' },
  { source: '/fr/nouvelles/travelworks-lance-son-nouveau-logiciel', destination: '/fr' },
  { source: '/fr/nouvelles/nouveau-createur-itineraires', destination: '/fr' },
];

for (const redirect of redirects) {
  test(`${redirect.source} permanently redirects directly to ${redirect.destination}`, async ({ request }) => {
    const firstResponse = await request.get(redirect.source, { maxRedirects: 0 });

    expect(firstResponse.status()).toBe(308);
    expect(firstResponse.headers().location).toBe(redirect.destination);

    const finalResponse = await request.get(redirect.destination, { maxRedirects: 0 });
    expect(finalResponse.status()).toBe(200);
  });
}

test('preserves the query string when normalizing an obsolete locale prefix', async ({ request }) => {
  const response = await request.get('/en-us/about-us?campaign=seo', { maxRedirects: 0 });

  expect(response.status()).toBe(308);
  expect(response.headers().location).toBe('/about-us/travelworks?campaign=seo');
});