import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const APP_PAGES_ROOT = path.join(process.cwd(), 'app', '[locale]', '(pages)');
const NEWS_CONTENT_ROOT = path.join(process.cwd(), 'content', 'news');

const ACTIVE_ROUTE_LOCALES = ['en', 'fr', 'en-au'];
const ROUTE_TO_CONTENT_LOCALE = {
  en: 'en-us',
  fr: 'fr-ca',
  'en-au': 'en-au',
};

const NEWS_CATEGORY_IDS = ['accounting', 'agency-owner', 'it-manager', 'technology'];

const TOP_LEVEL_SEGMENT_BY_LOCALE = {
  'about-us': {
    en: 'about-us',
    fr: 'a-propos',
    'en-au': 'about-us',
  },
  training: {
    en: 'training',
    fr: 'formation',
    'en-au': 'training',
  },
  'travel-agency-software': {
    en: 'travel-agency-software',
    fr: 'logiciel-agence-voyage',
    'en-au': 'travel-agency-software',
  },
  'ask-for-a-demo': {
    en: 'ask-for-a-demo',
    fr: 'demander-une-demo',
    'en-au': 'ask-for-a-demo',
  },
  'thank-you': {
    en: 'thank-you',
    fr: 'merci',
    'en-au': 'thank-you',
  },
  'privacy-policy': {
    en: 'privacy-policy',
    fr: 'politique-de-confidentialite',
    'en-au': 'privacy-policy',
  },
  news: {
    en: 'news',
    fr: 'nouvelles',
    'en-au': 'news',
  },
};

const SECOND_LEVEL_SEGMENT_BY_PARENT = {
  'about-us': {
    partners: {
      en: 'partners',
      fr: 'partenaires',
      'en-au': 'partners',
    },
    travelworks: {
      en: 'travelworks',
      fr: 'pc-voyages',
      'en-au': 'travelworks',
    },
    careers: {
      en: 'careers',
      fr: 'carrieres',
      'en-au': 'careers',
    },
  },
  training: {
    'training-platform': {
      en: 'training-platform',
      fr: 'plateforme-de-formation',
      'en-au': 'training-platform',
    },
    'knowledge-base': {
      en: 'knowledge-base',
      fr: 'base-de-connaissances',
      'en-au': 'knowledge-base',
    },
  },
  'travel-agency-software': {
    features: {
      en: 'features',
      fr: 'fonctionnalites',
      'en-au': 'features',
    },
    benefits: {
      en: 'benefits',
      fr: 'avantages',
      'en-au': 'benefits',
    },
    'back-office-travel-agency': {
      en: 'back-office-travel-agency',
      fr: 'back-office-agence-voyage',
      'en-au': 'back-office-travel-agency',
    },
    'trip-details': {
      en: 'trip-details',
      fr: 'details-du-voyage',
      'en-au': 'trip-details',
    },
    'tour-management': {
      en: 'tour-management',
      fr: 'gestion-des-tours',
      'en-au': 'tour-management',
    },
    'tour-online': {
      en: 'tour-online',
      fr: 'tour-online',
      'en-au': 'tour-online',
    },
    'crm-tools': {
      en: 'crm-tools',
      fr: 'outils-crm',
      'en-au': 'crm-tools',
    },
    integrations: {
      en: 'integrations',
      fr: 'integrations',
      'en-au': 'integrations',
    },
    'dashboard-reports': {
      en: 'dashboard-reports',
      fr: 'tableau-de-bord-rapports',
      'en-au': 'dashboard-reports',
    },
    customizations: {
      en: 'customizations',
      fr: 'customizations',
      'en-au': 'customizations',
    },
    sirev: {
      en: 'sirev',
      fr: 'sirev',
      'en-au': 'sirev',
    },
  },
};

const NEWS_CATEGORY_SEGMENT_BY_LOCALE = {
  en: 'category',
  fr: 'categorie',
  'en-au': 'category',
};

const NEWS_CATEGORY_SLUGS = {
  accounting: {
    en: 'accounting',
    fr: 'comptabilite',
    'en-au': 'accounting',
  },
  'agency-owner': {
    en: 'agency-owner',
    fr: 'proprietaire-agence',
    'en-au': 'agency-owner',
  },
  'it-manager': {
    en: 'it-manager',
    fr: 'gestionnaire-ti',
    'en-au': 'it-manager',
  },
  technology: {
    en: 'technology',
    fr: 'technologie',
    'en-au': 'technology',
  },
};

const DEFAULT_LASTMOD = new Date().toISOString();

function isRouteGroup(segment) {
  return /^\(.*\)$/.test(segment);
}

function isDynamicSegment(segment) {
  return /^\[.*\]$/.test(segment);
}

function toPosixPath(filePath) {
  return filePath.split(path.sep).join('/');
}

function normalizePath(pathname) {
  if (!pathname || pathname === '/') {
    return '/';
  }

  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

function localizeTopLevelSegment(segment, locale) {
  const map = TOP_LEVEL_SEGMENT_BY_LOCALE[segment];
  if (!map) {
    return segment;
  }

  return map[locale] ?? map.en;
}

function localizeChildSegment(parentSegment, childSegment, locale) {
  const map = SECOND_LEVEL_SEGMENT_BY_PARENT[parentSegment]?.[childSegment];
  if (!map) {
    return childSegment;
  }

  return map[locale] ?? map.en;
}

function localizePathSegments(canonicalSegments, locale) {
  if (canonicalSegments.length === 0) {
    return locale === 'en' ? '/' : `/${locale}`;
  }

  const localized = [...canonicalSegments];
  const parent = localized[0];

  localized[0] = localizeTopLevelSegment(localized[0], locale);

  if (localized.length > 1) {
    localized[1] = localizeChildSegment(parent, localized[1], locale);
  }

  if (locale === 'en') {
    return `/${localized.join('/')}`;
  }

  return `/${locale}/${localized.join('/')}`;
}

async function walkForPageFiles(rootDir) {
  /** @type {string[]} */
  const found = [];

  async function walk(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        await walk(fullPath);
        continue;
      }

      if (entry.isFile() && /^page\.(tsx|ts|jsx|js)$/i.test(entry.name)) {
        found.push(fullPath);
      }
    }
  }

  await walk(rootDir);
  return found;
}

function segmentsFromPageFile(pageFilePath) {
  const relative = path.relative(APP_PAGES_ROOT, pageFilePath);
  const withoutFile = path.dirname(relative);

  if (withoutFile === '.') {
    return [];
  }

  return toPosixPath(withoutFile)
    .split('/')
    .filter(Boolean)
    .filter((segment) => !isRouteGroup(segment));
}

async function collectLocalizedStaticPageEntries() {
  const pageFiles = await walkForPageFiles(APP_PAGES_ROOT);
  /** @type {Map<string, { path: string; lastmod: string; changefreq: string; priority: number }>} */
  const entries = new Map();

  for (const pageFile of pageFiles) {
    const segments = segmentsFromPageFile(pageFile);

    if (segments.some((segment) => isDynamicSegment(segment))) {
      continue;
    }

    for (const locale of ACTIVE_ROUTE_LOCALES) {
      const localizedPath = normalizePath(localizePathSegments(segments, locale));
      const isHome = localizedPath === '/' || localizedPath === '/fr' || localizedPath === '/en-au';

      entries.set(localizedPath, {
        path: localizedPath,
        lastmod: DEFAULT_LASTMOD,
        changefreq: isHome ? 'weekly' : 'monthly',
        priority: isHome ? (localizedPath === '/' ? 1.0 : 0.9) : 0.8,
      });
    }
  }

  return entries;
}

async function readArticleFrontmatterMap(contentLocale) {
  const localeDir =
    contentLocale === 'en-us'
      ? NEWS_CONTENT_ROOT
      : path.join(NEWS_CONTENT_ROOT, contentLocale);

  /** @type {Map<string, { id: string; slug: string; lastmod: string }>} */
  const map = new Map();

  let entries = [];
  try {
    entries = await fs.readdir(localeDir, { withFileTypes: true });
  } catch {
    return map;
  }

  const files = entries.filter(
    (entry) => entry.isFile() && /\.(md|mdx)$/i.test(entry.name),
  );

  for (const file of files) {
    const filePath = path.join(localeDir, file.name);
    const raw = await fs.readFile(filePath, 'utf8');
    const parsed = matter(raw);
    const articleId = typeof parsed.data.id === 'string' ? parsed.data.id.trim() : '';
    const articleSlug = typeof parsed.data.slug === 'string' ? parsed.data.slug.trim() : '';

    if (!articleId || !articleSlug) {
      continue;
    }

    const updated = typeof parsed.data.updated === 'string' ? parsed.data.updated : null;
    const date = typeof parsed.data.date === 'string' ? parsed.data.date : null;
    const parsedLastmod = updated ?? date;
    const lastmod =
      parsedLastmod && !Number.isNaN(new Date(parsedLastmod).getTime())
        ? new Date(parsedLastmod).toISOString()
        : DEFAULT_LASTMOD;

    map.set(articleId, {
      id: articleId,
      slug: articleSlug,
      lastmod,
    });
  }

  return map;
}

function buildNewsListPath(routeLocale) {
  const newsSegment = localizeTopLevelSegment('news', routeLocale);
  if (routeLocale === 'en') {
    return `/${newsSegment}`;
  }

  return `/${routeLocale}/${newsSegment}`;
}

function buildNewsCategoryPath(routeLocale, categoryId) {
  const newsSegment = localizeTopLevelSegment('news', routeLocale);
  const categorySegment = NEWS_CATEGORY_SEGMENT_BY_LOCALE[routeLocale] ?? 'category';
  const categorySlug = NEWS_CATEGORY_SLUGS[categoryId]?.[routeLocale] ?? categoryId;

  if (routeLocale === 'en') {
    return `/${newsSegment}/${categorySegment}/${categorySlug}`;
  }

  return `/${routeLocale}/${newsSegment}/${categorySegment}/${categorySlug}`;
}

function buildNewsArticlePath(routeLocale, slug) {
  const newsSegment = localizeTopLevelSegment('news', routeLocale);

  if (routeLocale === 'en') {
    return `/${newsSegment}/${slug}`;
  }

  return `/${routeLocale}/${newsSegment}/${slug}`;
}

async function collectNewsEntries() {
  /** @type {Map<string, { path: string; lastmod: string; changefreq: string; priority: number }>} */
  const entries = new Map();
  const baseArticles = await readArticleFrontmatterMap('en-us');

  for (const locale of ACTIVE_ROUTE_LOCALES) {
    const contentLocale = ROUTE_TO_CONTENT_LOCALE[locale] ?? 'en-us';
    const localizedArticles =
      contentLocale === 'en-us'
        ? new Map(baseArticles)
        : await readArticleFrontmatterMap(contentLocale);

    const mergedArticles = new Map(localizedArticles);

    for (const [id, article] of baseArticles.entries()) {
      if (!mergedArticles.has(id)) {
        mergedArticles.set(id, article);
      }
    }

    const listPath = normalizePath(buildNewsListPath(locale));
    entries.set(listPath, {
      path: listPath,
      lastmod: DEFAULT_LASTMOD,
      changefreq: 'weekly',
      priority: 0.8,
    });

    for (const categoryId of NEWS_CATEGORY_IDS) {
      const categoryPath = normalizePath(buildNewsCategoryPath(locale, categoryId));
      entries.set(categoryPath, {
        path: categoryPath,
        lastmod: DEFAULT_LASTMOD,
        changefreq: 'weekly',
        priority: 0.7,
      });
    }

    for (const article of mergedArticles.values()) {
      const articlePath = normalizePath(buildNewsArticlePath(locale, article.slug));
      entries.set(articlePath, {
        path: articlePath,
        lastmod: article.lastmod,
        changefreq: 'monthly',
        priority: 0.6,
      });
    }
  }

  return entries;
}

export async function getSitemapEntries() {
  const staticEntries = await collectLocalizedStaticPageEntries();
  const newsEntries = await collectNewsEntries();

  for (const [pathKey, entry] of newsEntries.entries()) {
    staticEntries.set(pathKey, entry);
  }

  return Array.from(staticEntries.values()).sort((a, b) => a.path.localeCompare(b.path));
}
