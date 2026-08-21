import { NextResponse } from 'next/server';
import {
  aboutUsSegmentByRouteLocale,
  aboutUsSlugs,
  demoByRouteLocale,
  localeOptions,
  newsCategorySlugs,
  newsSegmentByRouteLocale,
  privacyPolicySegmentByRouteLocale,
  thankYouByRouteLocale,
  trainingSegmentByRouteLocale,
  trainingSlugs,
  travelAgencySoftwareSegmentByRouteLocale,
  travelAgencySoftwareSlugs,
} from '@/app/[locale]/locale-config';
import { getSiteUrl } from '@/app/lib/site-url';
import { getNewsArticlePath, getNewsCategoryPath } from '@/app/[locale]/(pages)/news/lib/categories';
import { getAllArticles } from '@/app/[locale]/(pages)/news/lib/news';
import type { NewsCategoryId } from '@/app/[locale]/(pages)/news/types';

type RouteLocale = 'en' | 'fr' | 'en-au';

type SitemapItem = {
  path: string;
  lastModified: string;
};

export const revalidate = 3600;

const CANONICAL_STATIC_PATHS: string[] = [
  '/',
  '/about-us',
  '/about-us/careers',
  '/about-us/clients',
  '/about-us/contact',
  '/about-us/partners',
  '/about-us/travelworks',
  '/ask-for-a-demo',
  '/demo-knowledge-base',
  '/demo-trip-details',
  '/integrations',
  '/maintenance',
  '/news',
  '/privacy-policy',
  '/thank-you',
  '/training',
  '/training/knowledge-base',
  '/training/training-platform',
  '/travel-agency-software',
  '/travel-agency-software/back-office-travel-agency',
  '/travel-agency-software/benefits',
  '/travel-agency-software/crm-tools',
  '/travel-agency-software/customizations',
  '/travel-agency-software/dashboard-reports',
  '/travel-agency-software/features',
  '/travel-agency-software/sirev',
  '/travel-agency-software/tour-management',
  '/travel-agency-software/tour-online',
  '/travel-agency-software/trip-details',
  '/travel-agency-software/trip-n-trouch',
];

const NEWS_CATEGORY_IDS = Object.keys(newsCategorySlugs);

function getActiveRouteLocales(): RouteLocale[] {
  return localeOptions
    .map((item) => item.routeLocale)
    .filter((locale): locale is RouteLocale => locale === 'en' || locale === 'fr' || locale === 'en-au');
}

function stripSlash(value: string): string {
  return value.replace(/^\/+|\/+$/g, '');
}

function localizeTopLevelSegment(routeLocale: RouteLocale, segment: string): string {
  if (segment === 'about-us') {
    return aboutUsSegmentByRouteLocale[routeLocale] ?? segment;
  }

  if (segment === 'ask-for-a-demo') {
    return demoByRouteLocale[routeLocale] ?? segment;
  }

  if (segment === 'news') {
    return newsSegmentByRouteLocale[routeLocale] ?? segment;
  }

  if (segment === 'privacy-policy') {
    return privacyPolicySegmentByRouteLocale[routeLocale] ?? segment;
  }

  if (segment === 'thank-you') {
    return thankYouByRouteLocale[routeLocale] ?? segment;
  }

  if (segment === 'training') {
    return trainingSegmentByRouteLocale[routeLocale] ?? segment;
  }

  if (segment === 'travel-agency-software') {
    return travelAgencySoftwareSegmentByRouteLocale[routeLocale] ?? segment;
  }

  return segment;
}

function localizeSecondLevelSegment(
  routeLocale: RouteLocale,
  parentSegment: string,
  childSegment: string,
): string {
  if (parentSegment === 'about-us') {
    return aboutUsSlugs[childSegment]?.[routeLocale] ?? childSegment;
  }

  if (parentSegment === 'training') {
    return trainingSlugs[childSegment]?.[routeLocale] ?? childSegment;
  }

  if (parentSegment === 'travel-agency-software') {
    return travelAgencySoftwareSlugs[childSegment]?.[routeLocale] ?? childSegment;
  }

  return childSegment;
}

function buildLocalizedStaticPath(routeLocale: RouteLocale, canonicalPath: string): string {
  if (canonicalPath === '/') {
    return routeLocale === 'en' ? '/' : `/${routeLocale}`;
  }

  const canonicalSegments = stripSlash(canonicalPath).split('/').filter(Boolean);

  if (canonicalSegments.length === 0) {
    return routeLocale === 'en' ? '/' : `/${routeLocale}`;
  }

  const localizedSegments = [...canonicalSegments];
  const canonicalParent = localizedSegments[0];

  localizedSegments[0] = localizeTopLevelSegment(routeLocale, canonicalParent);

  if (localizedSegments.length > 1) {
    localizedSegments[1] = localizeSecondLevelSegment(
      routeLocale,
      canonicalParent,
      localizedSegments[1],
    );
  }

  const suffix = localizedSegments.join('/');

  if (routeLocale === 'en') {
    return `/${suffix}`;
  }

  return `/${routeLocale}/${suffix}`;
}

function toIsoDate(value?: string): string {
  const parsed = value ? new Date(value) : new Date();
  if (Number.isNaN(parsed.getTime())) {
    return new Date().toISOString();
  }

  return parsed.toISOString();
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function buildSitemapItems(): Promise<SitemapItem[]> {
  const routeLocales = getActiveRouteLocales();
  const items = new Map<string, SitemapItem>();
  const now = new Date().toISOString();

  for (const locale of routeLocales) {
    for (const canonicalPath of CANONICAL_STATIC_PATHS) {
      const localizedPath = buildLocalizedStaticPath(locale, canonicalPath);
      items.set(localizedPath, {
        path: localizedPath,
        lastModified: now,
      });
    }

    for (const categoryId of NEWS_CATEGORY_IDS) {
      const categoryPath = getNewsCategoryPath(locale, categoryId as NewsCategoryId);
      items.set(categoryPath, {
        path: categoryPath,
        lastModified: now,
      });
    }

    const articles = await getAllArticles(locale);
    for (const article of articles) {
      const articlePath = getNewsArticlePath(locale, article.slug);
      items.set(articlePath, {
        path: articlePath,
        lastModified: toIsoDate(article.updated || article.date),
      });
    }
  }

  return Array.from(items.values()).sort((a, b) => a.path.localeCompare(b.path));
}

export async function GET() {
  const siteUrl = getSiteUrl();
  const items = await buildSitemapItems();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items
  .map((item) => {
    const absolute = `${siteUrl}${item.path}`;
    return `  <url>\n    <loc>${escapeXml(absolute)}</loc>\n    <lastmod>${item.lastModified}</lastmod>\n  </url>`;
  })
  .join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
