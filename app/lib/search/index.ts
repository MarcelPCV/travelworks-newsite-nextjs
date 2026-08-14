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

type MessageLocale = 'en-us' | 'en-au' | 'fr-ca';

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
    [key: string]: unknown;
  };
  pages?: Record<string, unknown>;
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

const SUPPORTED_ROUTE_LOCALES: RouteLocale[] = ['en', 'en-ca', 'en-au', 'fr'];
const CACHE_TTL_MS = 60 * 60 * 1000;
const MAX_PAGE_BODY_STRINGS = 80;
const MAX_PAGE_KEYWORDS = 72;

const PRODUCT_METADATA_KEY_OVERRIDES: Partial<
  Record<(typeof PRODUCT_PAGE_DEFINITIONS)[number]['labelKey'], string>
> = {
  backofficeSystem: 'back-office-travel-agency',
  crmTools: 'crm',
  'trip-n-trouch': 'trip-n-touch',
};

const ABOUT_US_METADATA_KEY_BY_LABEL: Record<
  (typeof ABOUT_US_PAGE_DEFINITIONS)[number]['labelKey'],
  string
> = {
  company: 'the-company',
  clients: 'clients',
  partners: 'partners',
  contact: 'contact',
  careers: 'careers',
};

const TRAINING_METADATA_KEY_BY_LABEL: Record<
  (typeof TRAINING_PAGE_DEFINITIONS)[number]['labelKey'],
  string
> = {
  platform: 'training-platform',
  knowledgeBase: 'knowledge-base',
};

const PRODUCT_INTENT_TERMS = new Set([
  'accounting',
  'invoicing',
  'billing',
  'finance',
  'bookings',
  'booking',
  'backoffice',
  'back',
  'office',
  'crm',
  'dashboard',
  'reports',
  'integrations',
  'customizations',
  'features',
  'benefits',
  'itinerary',
  'trip',
  'tour',
  'comptabilite',
  'facturation',
  'reservation',
]);

const STOPWORDS = new Set([
  'the',
  'and',
  'for',
  'with',
  'from',
  'that',
  'this',
  'your',
  'you',
  'des',
  'les',
  'pour',
  'avec',
  'dans',
  'une',
  'sur',
  'du',
  'de',
  'la',
  'le',
]);

const searchIndexCache = new Map<RouteLocale, { expiresAt: number; items: SearchIndexItem[] }>();

function normalizeRouteLocale(locale: string): RouteLocale {
  if (locale === 'en-ca' || locale === 'en-au' || locale === 'fr') {
    return locale;
  }

  return 'en';
}

function withLocalePrefix(path: string, routeLocale: RouteLocale): string {
  return routeLocale === DEFAULT_ROUTE_LOCALE ? path : `/${routeLocale}${path}`;
}

async function loadMessages(messageLocale: MessageLocale): Promise<SearchMessages> {
  switch (messageLocale) {
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

function getNestedValue(value: unknown, path: string[]): unknown {
  let current: unknown = value;

  for (const segment of path) {
    if (!current || typeof current !== 'object') {
      return undefined;
    }

    current = (current as Record<string, unknown>)[segment];
  }

  return current;
}

function sanitizeText(value: string): string {
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function getCleanString(value: unknown): string | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }

  const cleaned = sanitizeText(value);
  return cleaned.length > 0 ? cleaned : undefined;
}

function collectStrings(value: unknown, collector: string[], limit: number): void {
  if (collector.length >= limit) {
    return;
  }

  if (typeof value === 'string') {
    const cleaned = sanitizeText(value);
    if (cleaned.length > 0) {
      collector.push(cleaned);
    }
    return;
  }

  if (!value || typeof value !== 'object') {
    return;
  }

  for (const child of Object.values(value as Record<string, unknown>)) {
    collectStrings(child, collector, limit);
    if (collector.length >= limit) {
      return;
    }
  }
}

function toSearchKeywords(values: string[]): string[] {
  const keywords = new Set<string>();

  for (const value of values) {
    if (!value) {
      continue;
    }

    const cleaned = sanitizeText(value);
    if (!cleaned) {
      continue;
    }

    keywords.add(cleaned);

    const normalizedTokens = normalizeSearchText(cleaned).split(' ');
    for (const token of normalizedTokens) {
      if (token.length < 3 || STOPWORDS.has(token)) {
        continue;
      }
      keywords.add(token);
    }

    if (keywords.size >= MAX_PAGE_KEYWORDS) {
      break;
    }
  }

  return Array.from(keywords).slice(0, MAX_PAGE_KEYWORDS);
}

function getSectionStrings(messages: SearchMessages, path: string[]): string[] {
  const section = getNestedValue(messages.pages, path);
  const collected: string[] = [];
  collectStrings(section, collected, MAX_PAGE_BODY_STRINGS);
  return collected;
}

function isProductIntentQuery(normalizedQuery: string, queryTokens: string[]): boolean {
  if (
    normalizedQuery.includes('back office') ||
    normalizedQuery.includes('trip details') ||
    normalizedQuery.includes('tableau de bord')
  ) {
    return true;
  }

  return queryTokens.some((token) => PRODUCT_INTENT_TERMS.has(token));
}

function scoreResult(
  item: SearchIndexItem,
  normalizedQuery: string,
  queryTokens: string[],
  preferProductPages: boolean,
): number {
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

  if (preferProductPages && item.type === 'page') {
    score += item.id.startsWith('page-product-') ? 24 : 8;
  }

  return score;
}

function buildPageIndexItems(
  routeLocale: RouteLocale,
  messages: SearchMessages,
): SearchIndexItem[] {
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
    routeLocale === 'fr' ? 'Demo Base de connaissances' : 'Demo Knowledge Base',
    routeLocale === 'fr'
      ? 'Demandez une demonstration orientee base de connaissances.'
      : 'Request a knowledge base focused demonstration.',
    ['demo', 'knowledge base', 'training'],
  );

  addPage(
    items,
    'page-demo-trip-details',
    withLocalePrefix('/demo-trip-details', routeLocale),
    routeLocale === 'fr' ? 'Demo Details du voyage' : 'Demo Trip Details',
    routeLocale === 'fr'
      ? 'Demandez une demonstration orientee details du voyage.'
      : 'Request a trip details focused demonstration.',
    ['demo', 'trip details', 'itinerary'],
  );

  addPage(
    items,
    'page-privacy-policy',
    withLocalePrefix(`/${getPrivacyPolicySegment(routeLocale)}`, routeLocale),
    routeLocale === 'fr' ? 'Politique de confidentialite' : 'Privacy Policy',
    routeLocale === 'fr'
      ? 'Politique de confidentialite TravelWorks.'
      : 'TravelWorks privacy policy.',
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
      travelAgencySoftwareSlugs[definition.canonicalSlug]?.[routeLocale] ??
      definition.canonicalSlug;
    const href = withLocalePrefix(`/${softwareSegment}/${localizedSlug}`, routeLocale);
    const title = productLinks[definition.labelKey] ?? definition.labelKey;
    const metadataKey =
      PRODUCT_METADATA_KEY_OVERRIDES[definition.labelKey] ?? definition.canonicalSlug;
    const metadataTitle = getCleanString(
      getNestedValue(messages.metadata, ['travel-agency-software', metadataKey, 'title']),
    );
    const metadataDescription = getCleanString(
      getNestedValue(messages.metadata, ['travel-agency-software', metadataKey, 'description']),
    );
    const pageBodyStrings = getSectionStrings(messages, ['travel-agency-software', metadataKey]);
    const description =
      metadataDescription ??
      pageBodyStrings.find((item) => item.length > 20) ??
      `${title} - ${topProductsLabel}`;

    addPage(
      items,
      `page-product-${definition.labelKey}`,
      href,
      title,
      description,
      toSearchKeywords([
        topProductsLabel,
        title,
        metadataTitle ?? '',
        metadataDescription ?? '',
        ...pageBodyStrings,
      ]),
    );
  }

  const aboutUsSegment = getAboutUsSegment(routeLocale);
  const aboutUsLabels = nav.aboutUs ?? {};
  for (const definition of ABOUT_US_PAGE_DEFINITIONS) {
    const localizedSlug =
      aboutUsSlugs[definition.canonicalSlug]?.[routeLocale] ?? definition.canonicalSlug;
    const href = withLocalePrefix(`/${aboutUsSegment}/${localizedSlug}`, routeLocale);
    const title = aboutUsLabels[definition.labelKey] ?? definition.labelKey;
    const metadataKey = ABOUT_US_METADATA_KEY_BY_LABEL[definition.labelKey];
    const metadataTitle = getCleanString(
      getNestedValue(messages.metadata, ['about-us', metadataKey, 'title']),
    );
    const metadataDescription = getCleanString(
      getNestedValue(messages.metadata, ['about-us', metadataKey, 'description']),
    );
    const pageBodyStrings = getSectionStrings(messages, ['about-us', metadataKey]);
    const description =
      metadataDescription ??
      pageBodyStrings.find((item) => item.length > 20) ??
      `${title} - ${topAboutUsLabel}`;

    addPage(
      items,
      `page-about-${definition.labelKey}`,
      href,
      title,
      description,
      toSearchKeywords([
        topAboutUsLabel,
        title,
        metadataTitle ?? '',
        metadataDescription ?? '',
        ...pageBodyStrings,
      ]),
    );
  }

  const trainingSegment = getTrainingSegment(routeLocale);
  const trainingLabels = nav.training ?? {};
  for (const definition of TRAINING_PAGE_DEFINITIONS) {
    const localizedSlug =
      trainingSlugs[definition.canonicalSlug]?.[routeLocale] ?? definition.canonicalSlug;
    const href = withLocalePrefix(`/${trainingSegment}/${localizedSlug}`, routeLocale);
    const title = trainingLabels[definition.labelKey] ?? definition.labelKey;
    const metadataKey = TRAINING_METADATA_KEY_BY_LABEL[definition.labelKey];
    const metadataTitle = getCleanString(
      getNestedValue(messages.metadata, ['training', metadataKey, 'title']),
    );
    const metadataDescription = getCleanString(
      getNestedValue(messages.metadata, ['training', metadataKey, 'description']),
    );
    const pageBodyStrings = getSectionStrings(messages, ['training', metadataKey]);
    const description =
      metadataDescription ??
      pageBodyStrings.find((item) => item.length > 20) ??
      `${title} - ${topTrainingLabel}`;

    addPage(
      items,
      `page-training-${definition.labelKey}`,
      href,
      title,
      description,
      toSearchKeywords([
        topTrainingLabel,
        title,
        metadataTitle ?? '',
        metadataDescription ?? '',
        ...pageBodyStrings,
      ]),
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
  const preferProductPages = isProductIntentQuery(normalizedQuery, queryTokens);
  const index = await getSearchIndex(routeLocale);

  const ranked = index
    .map((item) => ({
      item,
      score: scoreResult(item, normalizedQuery, queryTokens, preferProductPages),
    }))
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
