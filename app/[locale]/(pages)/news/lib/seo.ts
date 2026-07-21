import type { Metadata } from 'next';
import { getAlternates } from '@/app/lib/SEO/getAlternates';
import type { NewsArticle, NewsCategory, RouteLocale } from '../types';
import { getNewsArticlePath, getNewsListPath } from './categories';

const FALLBACK_SITE_URL = 'https://travelworks.com';

function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL;
}

function normalizeLocale(locale: string): RouteLocale {
  if (locale === 'en-ca' || locale === 'en-au' || locale === 'fr-ca') {
    return locale;
  }

  return 'en';
}

function toAbsoluteUrl(pathname: string): string {
  return new URL(pathname, getSiteUrl()).toString();
}

export function generateNewsMetadata(params: {
  locale: string;
  title: string;
  description: string;
  alternates: Record<RouteLocale, string>;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const { locale, title, description, alternates, keywords = [], image, noIndex } = params;
  const routeLocale = normalizeLocale(locale);
  const canonicalPath = alternates[routeLocale] || getNewsListPath(routeLocale);
  const canonical = toAbsoluteUrl(canonicalPath);

  return {
    title,
    description,
    keywords,
    alternates: getAlternates(alternates, routeLocale),
    openGraph: {
      type: 'article',
      title,
      description,
      url: canonical,
      images: image ? [{ url: toAbsoluteUrl(image), width: 1200, height: 630, alt: title }] : [],
      locale: routeLocale,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [toAbsoluteUrl(image)] : [],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
  };
}

export function buildNewsArticleSchema(params: {
  article: NewsArticle;
  locale: string;
  alternates: Record<RouteLocale, string>;
}) {
  const { article, locale, alternates } = params;
  const routeLocale = normalizeLocale(locale);
  const articlePath = alternates[routeLocale] || getNewsArticlePath(routeLocale, article.slug);
  const articleUrl = toAbsoluteUrl(articlePath);

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    image: [toAbsoluteUrl(article.coverImage)],
    datePublished: article.date,
    dateModified: article.updated || article.date,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'TravelWorks',
      logo: {
        '@type': 'ImageObject',
        url: toAbsoluteUrl('/images/components/hero-carousel/hero.png'),
      },
    },
    description: article.description,
    mainEntityOfPage: articleUrl,
  };
}

export function buildCollectionPageSchema(params: {
  locale: string;
  title: string;
  description: string;
  path: string;
  category?: NewsCategory;
}) {
  const { title, description, path, category } = params;

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url: toAbsoluteUrl(path),
    about: category
      ? {
          '@type': 'Thing',
          name: category.name,
        }
      : undefined,
  };
}

export function getSiteAbsoluteUrl(pathname: string): string {
  return toAbsoluteUrl(pathname);
}
