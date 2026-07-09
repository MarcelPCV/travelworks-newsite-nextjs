import {
  getNewsCategorySegment,
  getNewsCategorySlug,
  getNewsSegment,
  routeToMessageLocale,
} from '@/app/[locale]/locale-config';
import type { ContentLocale, NewsCategory, NewsCategoryId, RouteLocale } from '../types';

const CATEGORY_DEFINITIONS: Record<
  NewsCategoryId,
  {
    names: Record<ContentLocale, string>;
    seo: Record<ContentLocale, { title: string; description: string; keywords: string[] }>;
  }
> = {
  accounting: {
    names: {
      'en-us': 'Accounting',
      'en-ca': 'Accounting',
      'en-au': 'Accounting',
      'fr-ca': 'Comptabilite',
    },
    seo: {
      'en-us': {
        title: 'Accounting News | TravelWorks',
        description: 'Latest accounting news for travel agencies.',
        keywords: ['accounting', 'travel agency accounting', 'travel software'],
      },
      'en-ca': {
        title: 'Accounting News | TravelWorks',
        description: 'Latest accounting news for travel agencies.',
        keywords: ['accounting', 'travel agency accounting', 'travel software'],
      },
      'en-au': {
        title: 'Accounting News | TravelWorks',
        description: 'Latest accounting news for travel agencies.',
        keywords: ['accounting', 'travel agency accounting', 'travel software'],
      },
      'fr-ca': {
        title: 'Nouvelles comptabilite | TravelWorks',
        description: 'Dernieres nouvelles comptables pour les agences de voyages.',
        keywords: ['comptabilite', 'agence de voyages', 'logiciel voyages'],
      },
    },
  },
  'agency-owner': {
    names: {
      'en-us': 'Agency Owner',
      'en-ca': 'Agency Owner',
      'en-au': 'Agency Owner',
      'fr-ca': "Proprietaire d'agence",
    },
    seo: {
      'en-us': {
        title: 'Agency Owner News | TravelWorks',
        description: 'Business and growth news for travel agency owners.',
        keywords: ['agency owner', 'travel agency growth', 'travel business'],
      },
      'en-ca': {
        title: 'Agency Owner News | TravelWorks',
        description: 'Business and growth news for travel agency owners.',
        keywords: ['agency owner', 'travel agency growth', 'travel business'],
      },
      'en-au': {
        title: 'Agency Owner News | TravelWorks',
        description: 'Business and growth news for travel agency owners.',
        keywords: ['agency owner', 'travel agency growth', 'travel business'],
      },
      'fr-ca': {
        title: "Nouvelles proprietaires d'agence | TravelWorks",
        description: "Nouvelles et conseils de croissance pour les proprietaires d'agences.",
        keywords: ['proprietaire agence', 'croissance', 'agence voyages'],
      },
    },
  },
  'it-manager': {
    names: {
      'en-us': 'IT Manager',
      'en-ca': 'IT Manager',
      'en-au': 'IT Manager',
      'fr-ca': 'Gestionnaire TI',
    },
    seo: {
      'en-us': {
        title: 'IT Manager News | TravelWorks',
        description: 'Security and platform updates for travel IT leaders.',
        keywords: ['IT manager', 'travel tech', 'security'],
      },
      'en-ca': {
        title: 'IT Manager News | TravelWorks',
        description: 'Security and platform updates for travel IT leaders.',
        keywords: ['IT manager', 'travel tech', 'security'],
      },
      'en-au': {
        title: 'IT Manager News | TravelWorks',
        description: 'Security and platform updates for travel IT leaders.',
        keywords: ['IT manager', 'travel tech', 'security'],
      },
      'fr-ca': {
        title: 'Nouvelles TI | TravelWorks',
        description: 'Mises a jour securite et plateforme pour les equipes TI.',
        keywords: ['gestionnaire ti', 'securite', 'technologie'],
      },
    },
  },
  technology: {
    names: {
      'en-us': 'Technology',
      'en-ca': 'Technology',
      'en-au': 'Technology',
      'fr-ca': 'Technologie',
    },
    seo: {
      'en-us': {
        title: 'Technology News | TravelWorks',
        description: 'Product and platform technology updates from TravelWorks.',
        keywords: ['technology', 'product update', 'travel platform'],
      },
      'en-ca': {
        title: 'Technology News | TravelWorks',
        description: 'Product and platform technology updates from TravelWorks.',
        keywords: ['technology', 'product update', 'travel platform'],
      },
      'en-au': {
        title: 'Technology News | TravelWorks',
        description: 'Product and platform technology updates from TravelWorks.',
        keywords: ['technology', 'product update', 'travel platform'],
      },
      'fr-ca': {
        title: 'Nouvelles technologiques | TravelWorks',
        description: 'Mises a jour de produit et de plateforme TravelWorks.',
        keywords: ['technologie', 'mise a jour produit', 'plateforme voyages'],
      },
    },
  },
};

function normalizeRouteLocale(locale: string): RouteLocale {
  if (locale === 'en-ca' || locale === 'en-au' || locale === 'fr-ca') {
    return locale;
  }

  return 'en';
}

export function toContentLocale(locale: string): ContentLocale {
  const routeLocale = normalizeRouteLocale(locale);
  const mapped = routeToMessageLocale[routeLocale] ?? 'en-us';

  if (mapped === 'en-ca' || mapped === 'en-au' || mapped === 'fr-ca') {
    return mapped;
  }

  return 'en-us';
}

export function getCategories(locale: string): NewsCategory[] {
  const routeLocale = normalizeRouteLocale(locale);
  const contentLocale = toContentLocale(routeLocale);

  return (Object.keys(CATEGORY_DEFINITIONS) as NewsCategoryId[]).map((categoryId) => ({
    id: categoryId,
    slug: getNewsCategorySlug(routeLocale, categoryId),
    name: CATEGORY_DEFINITIONS[categoryId].names[contentLocale],
    seo: CATEGORY_DEFINITIONS[categoryId].seo[contentLocale],
  }));
}

export function getCategoryById(locale: string, categoryId: NewsCategoryId): NewsCategory {
  const categories = getCategories(locale);
  const category = categories.find((item) => item.id === categoryId);

  if (!category) {
    return categories[0];
  }

  return category;
}

export function getCategoryIdFromSlug(
  locale: string,
  categorySlug: string,
): NewsCategoryId | null {
  const routeLocale = normalizeRouteLocale(locale);
  const categories = getCategories(routeLocale);
  const match = categories.find(
    (category) => category.slug === categorySlug || category.id === categorySlug,
  );
  return match?.id ?? null;
}

export function getNewsListPath(locale: string): string {
  const routeLocale = normalizeRouteLocale(locale);
  const newsSegment = getNewsSegment(routeLocale);

  if (routeLocale === 'en') {
    return `/${newsSegment}`;
  }

  return `/${routeLocale}/${newsSegment}`;
}

export function getNewsCategoryPath(locale: string, categoryId: NewsCategoryId): string {
  const routeLocale = normalizeRouteLocale(locale);
  const newsSegment = getNewsSegment(routeLocale);
  const categorySegment = getNewsCategorySegment(routeLocale);
  const categorySlug = getNewsCategorySlug(routeLocale, categoryId);

  if (routeLocale === 'en') {
    return `/${newsSegment}/${categorySegment}/${categorySlug}`;
  }

  return `/${routeLocale}/${newsSegment}/${categorySegment}/${categorySlug}`;
}

export function getNewsPagePath(locale: string, page: number): string {
  const routeLocale = normalizeRouteLocale(locale);
  const listPath = getNewsListPath(routeLocale);

  if (page <= 1) {
    return listPath;
  }

  return `${listPath}/page/${page}`;
}

export function getNewsArticlePath(locale: string, slug: string): string {
  const routeLocale = normalizeRouteLocale(locale);
  const newsSegment = getNewsSegment(routeLocale);

  if (routeLocale === 'en') {
    return `/${newsSegment}/${slug}`;
  }

  return `/${routeLocale}/${newsSegment}/${slug}`;
}

export function getAllNewsPathByLocale(): Record<RouteLocale, string> {
  return {
    en: getNewsListPath('en'),
    'en-ca': getNewsListPath('en-ca'),
    'en-au': getNewsListPath('en-au'),
    'fr-ca': getNewsListPath('fr-ca'),
  };
}
