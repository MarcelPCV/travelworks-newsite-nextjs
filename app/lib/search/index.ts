import {
  DEFAULT_ROUTE_LOCALE,
  aboutUsSlugs,
  getAboutUsSegment,
  getDemoSlug,
  getPrivacyPolicySegment,
  getTrainingSegment,
  getTravelAgencySoftwareSegment,
  routeToMessageLocale,
  trainingSlugs,
  travelAgencySoftwareSlugs,
} from '@/app/[locale]/locale-config';
import { getNewsLabels } from '@/app/[locale]/(pages)/news/lib/labels';
import { getNewsArticlePath, getNewsListPath } from '@/app/[locale]/(pages)/news/lib/categories';
import { getAllArticles } from '@/app/[locale]/(pages)/news/lib/news';
import type { RouteLocale } from '@/app/[locale]/(pages)/news/types';

type MessageLocale = 'en-us' | 'en-ca' | 'en-au' | 'fr-ca';

type SearchType = 'page' | 'news';

type SearchIndexItem = {
  id: string;
  href: string;
  title: string;
  description: string;
  type: SearchType;
  keywords: string[];
  publishedAt?: string;
};

export type SearchResultItem = {
  id: string;
  href: string;
  title: string;
  description: string;
  type: SearchType;
};

type SearchMessages = {
  nav?: {
    brand?: { name?: string };
    topLevel?: {
      products?: string;
      aboutUs?: string;
      training?: string;
      news?: string;
    };
    aboutUs?: {
      company?: string;
      clients?: string;
      partners?: string;
      contact?: string;
      careers?: string;
    };
    training?: {
      platform?: string;
      knowledgeBase?: string;
    };
    products?: {
      links?: Record<string, string>;
    };
    cta?: {
      askForDemo?: string;
    };
  };
  metadata?: {
    home?: { title?: string; description?: string };
    'ask-for-a-demo'?: { title?: string; description?: string };
  };
};

const PRODUCT_PAGE_DEFINITIONS = [
  { labelKey: 'features', canonicalSlug: 'features' },
  { labelKey: 'benefits', canonicalSlug: 'benefits' },
  { labelKey: 'backofficeSystem', canonicalSlug: 'back-office-travel-agency' },
  { labelKey: 'tripDetails', canonicalSlug: 'trip-details' },
  { labelKey: 'tourManagement', canonicalSlug: 'tour-management' },
  { labelKey: 'tourOnline', canonicalSlug: 'tour-online' },
  { labelKey: 'crmTools', canonicalSlug: 'crm-tools' },
  { labelKey: 'integrations', canonicalSlug: 'integrations' },
  { labelKey: 'dashboardReports', canonicalSlug: 'dashboard-reports' },
  { labelKey: 'customizations', canonicalSlug: 'customizations' },
  { labelKey: 'sirev', canonicalSlug: 'sirev' },
  // This route is intentionally spelled with "trouch" in this codebase.
  { labelKey: 'trip-n-trouch', canonicalSlug: 'trip-n-trouch' },
] as const;

const ABOUT_US_PAGE_DEFINITIONS = [
  { labelKey: 'company', canonicalSlug: 'travelworks' },
  { labelKey: 'clients', canonicalSlug: 'clients' },
  { labelKey: 'partners', canonicalSlug: 'partners' },
  { labelKey: 'contact', canonicalSlug: 'contact' },
  { labelKey: 'careers', canonicalSlug: 'careers' },
] as const;

const TRAINING_PAGE_DEFINITIONS = [
  { labelKey: 'platform', canonicalSlug: 'training-platform' },
  { labelKey: 'knowledgeBase', canonicalSlug: 'knowledge-base' },
] as const;

const SUPPORTED_ROUTE_LOCALES: RouteLocale[] = ['en', 'en-ca', 'en-au', 'fr-ca'];
const CACHE_TTL_MS = 60 * 60 * 1000;
const searchIndexCache = new Map<RouteLocale, { expiresAt: number; items: SearchIndexItem[] }>();

function normalizeRouteLocale(locale: string): RouteLocale {
  if (locale === 'en-ca' || locale === 'en-au' || locale === 'fr-ca') {
    return locale;
  }

  return 'en';
}

function withLocalePrefix(path: string, routeLocale: RouteLocale): string {
  return routeLocale === DEFAULT_ROUTE_LOCALE ? path : `/${routeLocale}${path}`;
}

async function loadMessages(messageLocale: MessageLocale): Promise<SearchMessages> {
  switch (messageLocale) {
    case 'en-ca': {
      const mod = await import('@/messages/en-ca.json');
      return mod.default as SearchMessages;
    }
    case 'en-au': {
      const mod = await import('@/messages/en-au.json');
      return mod.default as SearchMessages;
    }
    case 'fr-ca': {
      const mod = await import('@/messages/fr-ca.json');
      return mod.default as SearchMessages;
    }
    case 'en-us':
    default: {
      const mod = await import('@/messages/en-us.json');
      return mod.default as SearchMessages;
    }
  }
}

function normalizeSearchText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function scoreResult(item: SearchIndexItem, normalizedQuery: string, queryTokens: string[]): number {
  const normalizedTitle = normalizeSearchText(item.title);
  const normalizedDescription = normalizeSearchText(item.description);
  const normalizedHref = normalizeSearchText(item.href);
  const normalizedKeywords = item.keywords.map(normalizeSearchText).filter(Boolean);

  const inTitle = normalizedTitle.includes(normalizedQuery);
  const inDescription = normalizedDescription.includes(normalizedQuery);
  const inHref = normalizedHref.includes(normalizedQuery);
  const inKeywords = normalizedKeywords.some((keyword) => keyword.includes(normalizedQuery));

  if (!inTitle && !inDescription && !inHref && !inKeywords) {
    return 0;
  }

  let score = 0;

  if (normalizedTitle === normalizedQuery) {
    score += 120;
  } else if (normalizedTitle.startsWith(normalizedQuery)) {
    score += 80;
  } else if (inTitle) {
    score += 55;
  }

  if (inKeywords) {
    score += 30;
  }

  if (inDescription) {
    score += 20;
  }

  if (inHref) {
    score += 15;
  }

  for (const token of queryTokens) {
    if (!token) {
      continue;
    }

    if (normalizedTitle.includes(token)) {
      score += 14;
      continue;
    }

    if (normalizedKeywords.some((keyword) => keyword.includes(token))) {
      score += 10;
      continue;
    }

    if (normalizedDescription.includes(token)) {
      score += 6;
    }
  }

  return score;
}

function buildPageIndexItems(routeLocale: RouteLocale, messages: SearchMessages): SearchIndexItem[] {
  const newsLabels = getNewsLabels(routeLocale);
  const nav = messages.nav ?? {};
  const productLinks = nav.products?.links ?? {};

  const topProductsLabel = nav.topLevel?.products ?? 'The Solution';
  const topAboutUsLabel = nav.topLevel?.aboutUs ?? 'About Us';
  const topTrainingLabel = nav.topLevel?.training ?? 'Training';
  const topNewsLabel = nav.topLevel?.news ?? 'News';

  const addPage = (
    items: SearchIndexItem[],
    id: string,
    href: string,
    title: string,
    description: string,
    keywords: string[],
  ) => {
    items.push({
      id,
      href,
      title,
      description,
      keywords,
      type: 'page',
    });
  };

  const items: SearchIndexItem[] = [];

  addPage(
    items,
    'page-home',
    routeLocale === DEFAULT_ROUTE_LOCALE ? '/' : `/${routeLocale}`,
    messages.metadata?.home?.title ?? nav.brand?.name ?? 'Home',
    messages.metadata?.home?.description ?? '',
    ['home', nav.brand?.name ?? 'travelworks'],
  );

  addPage(
    items,
    'page-ask-for-demo',
    withLocalePrefix(`/${getDemoSlug(routeLocale)}`, routeLocale),
    messages.metadata?.['ask-for-a-demo']?.title ?? nav.cta?.askForDemo ?? 'Ask for a Demo',
    messages.metadata?.['ask-for-a-demo']?.description ?? '',
    ['demo', 'request', 'booking'],
  );

  addPage(
    items,
    'page-demo-knowledge-base',
    withLocalePrefix('/demo-knowledge-base', routeLocale),
    routeLocale === 'fr-ca' ? 'Demo Base de connaissances' : 'Demo Knowledge Base',
    routeLocale === 'fr-ca'
      ? 'Demandez une demonstration orientee base de connaissances.'
      : 'Request a knowledge base focused demonstration.',
    ['demo', 'knowledge base', 'training'],
  );

  addPage(
    items,
    'page-demo-trip-details',
    withLocalePrefix('/demo-trip-details', routeLocale),
    routeLocale === 'fr-ca' ? 'Demo Details du voyage' : 'Demo Trip Details',
    routeLocale === 'fr-ca'
      ? 'Demandez une demonstration orientee details du voyage.'
      : 'Request a trip details focused demonstration.',
    ['demo', 'trip details', 'itinerary'],
  );

  addPage(
    items,
    'page-privacy-policy',
    withLocalePrefix(`/${getPrivacyPolicySegment(routeLocale)}`, routeLocale),
    routeLocale === 'fr-ca' ? 'Politique de confidentialite' : 'Privacy Policy',
    routeLocale === 'fr-ca' ? 'Politique de confidentialite TravelWorks.' : 'TravelWorks privacy policy.',
    ['privacy', 'policy', 'cookies'],
  );

  addPage(
    items,
    'page-news',
    getNewsListPath(routeLocale),
    newsLabels.pageTitle,
    newsLabels.pageDescription,
    [topNewsLabel, 'updates', 'articles'],
  );

  const softwareSegment = getTravelAgencySoftwareSegment(routeLocale);
  for (const definition of PRODUCT_PAGE_DEFINITIONS) {
    const localizedSlug =
      travelAgencySoftwareSlugs[definition.canonicalSlug]?.[routeLocale] ?? definition.canonicalSlug;
    const href = withLocalePrefix(`/${softwareSegment}/${localizedSlug}`, routeLocale);
    const title = productLinks[definition.labelKey] ?? definition.labelKey;

    addPage(
      items,
      `page-product-${definition.labelKey}`,
      href,
      title,
      `${title} - ${topProductsLabel}`,
      [topProductsLabel, title],
    );
  }

  const aboutUsSegment = getAboutUsSegment(routeLocale);
  const aboutUsLabels = nav.aboutUs ?? {};
  for (const definition of ABOUT_US_PAGE_DEFINITIONS) {
    const localizedSlug =
      aboutUsSlugs[definition.canonicalSlug]?.[routeLocale] ?? definition.canonicalSlug;
    const href = withLocalePrefix(`/${aboutUsSegment}/${localizedSlug}`, routeLocale);
    const title = aboutUsLabels[definition.labelKey] ?? definition.labelKey;

    addPage(
      items,
      `page-about-${definition.labelKey}`,
      href,
      title,
      `${title} - ${topAboutUsLabel}`,
      [topAboutUsLabel, title],
    );
  }

  const trainingSegment = getTrainingSegment(routeLocale);
  const trainingLabels = nav.training ?? {};
  for (const definition of TRAINING_PAGE_DEFINITIONS) {
    const localizedSlug = trainingSlugs[definition.canonicalSlug]?.[routeLocale] ?? definition.canonicalSlug;
    const href = withLocalePrefix(`/${trainingSegment}/${localizedSlug}`, routeLocale);
    const title = trainingLabels[definition.labelKey] ?? definition.labelKey;

    addPage(
      items,
      `page-training-${definition.labelKey}`,
      href,
      title,
      `${title} - ${topTrainingLabel}`,
      [topTrainingLabel, title],
    );
  }

  return items;
}

async function buildNewsIndexItems(routeLocale: RouteLocale): Promise<SearchIndexItem[]> {
  const articles = await getAllArticles(routeLocale);

  return articles.map((article) => ({
    id: `news-${article.id}-${routeLocale}`,
    href: getNewsArticlePath(routeLocale, article.slug),
    title: article.title,
    description: article.excerpt || article.description,
    type: 'news',
    keywords: [...article.categories, ...article.seo.keywords],
    publishedAt: article.updated || article.date,
  }));
}

async function buildSearchIndex(routeLocale: RouteLocale): Promise<SearchIndexItem[]> {
  const messageLocale = (routeToMessageLocale[routeLocale] ?? 'en-us') as MessageLocale;
  const messages = await loadMessages(messageLocale);
  const [pages, news] = await Promise.all([
    Promise.resolve(buildPageIndexItems(routeLocale, messages)),
    buildNewsIndexItems(routeLocale),
  ]);

  const byHref = new Map<string, SearchIndexItem>();
  for (const item of [...pages, ...news]) {
    byHref.set(item.href, item);
  }

  return Array.from(byHref.values());
}

async function getSearchIndex(routeLocale: RouteLocale): Promise<SearchIndexItem[]> {
  const now = Date.now();
  const cached = searchIndexCache.get(routeLocale);

  if (cached && cached.expiresAt > now) {
    return cached.items;
  }

  const items = await buildSearchIndex(routeLocale);
  searchIndexCache.set(routeLocale, {
    items,
    expiresAt: now + CACHE_TTL_MS,
  });

  return items;
}

export async function searchSite(params: {
  query: string;
  locale: string;
  limit?: number;
}): Promise<SearchResultItem[]> {
  const routeLocale = normalizeRouteLocale(params.locale);
  const query = params.query.trim();

  if (query.length < 2) {
    return [];
  }

  const limit = Math.max(1, Math.min(params.limit ?? 12, 20));
  const normalizedQuery = normalizeSearchText(query);
  const queryTokens = normalizedQuery.split(' ').filter(Boolean);
  const index = await getSearchIndex(routeLocale);

  const ranked = index
    .map((item) => ({ item, score: scoreResult(item, normalizedQuery, queryTokens) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => {
      if (a.score !== b.score) {
        return b.score - a.score;
      }

      if (a.item.type !== b.item.type) {
        return a.item.type === 'page' ? -1 : 1;
      }

      if (a.item.type === 'news' && a.item.publishedAt && b.item.publishedAt) {
        return new Date(b.item.publishedAt).getTime() - new Date(a.item.publishedAt).getTime();
      }

      return a.item.title.localeCompare(b.item.title);
    })
    .slice(0, limit)
    .map((entry) => ({
      id: entry.item.id,
      href: entry.item.href,
      title: entry.item.title,
      description: entry.item.description,
      type: entry.item.type,
    }));

  return ranked;
}

export function getSupportedSearchLocales(): RouteLocale[] {
  return [...SUPPORTED_ROUTE_LOCALES];
}
