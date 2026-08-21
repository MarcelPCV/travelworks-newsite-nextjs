import { getSitemapEntries } from './scripts/sitemap-paths.mjs';

const DEFAULT_PRODUCTION_SITE_URL = 'https://www.travelworkssolution.com';
const DEFAULT_DEVELOPMENT_SITE_URL = 'http://localhost:3000';

function trimTrailingSlash(value) {
  return value.replace(/\/+$/, '');
}

function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (configuredUrl) {
    return trimTrailingSlash(configuredUrl);
  }

  return process.env.NODE_ENV === 'production'
    ? DEFAULT_PRODUCTION_SITE_URL
    : DEFAULT_DEVELOPMENT_SITE_URL;
}

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: getSiteUrl(),
  generateRobotsTxt: false,
  outDir: 'public',
  changefreq: 'monthly',
  priority: 0.7,
  autoLastmod: false,
  sitemapSize: 5000,
  exclude: ['/api/*', '/auth/callback', '/news/page/*', '/fr/nouvelles/page/*', '/en-au/news/page/*'],
  transform: async () => null,
  additionalPaths: async () => {
    const entries = await getSitemapEntries();

    return entries.map((entry) => ({
      loc: entry.path,
      changefreq: entry.changefreq,
      priority: entry.priority,
      lastmod: entry.lastmod,
    }));
  },
};

export default config;
