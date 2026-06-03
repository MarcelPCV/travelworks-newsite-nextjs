export type LocaleOption = {
  routeLocale: string;
  messageLocale: string;
  label: string;
};

export const DEFAULT_ROUTE_LOCALE = 'en';

export const localeOptions: LocaleOption[] = [
  { routeLocale: DEFAULT_ROUTE_LOCALE, messageLocale: 'en-us', label: 'English (Global)' },
  { routeLocale: 'en-ca', messageLocale: 'en-ca', label: 'English (Canada)' },
  { routeLocale: 'fr-ca', messageLocale: 'fr-ca', label: 'Francais (Canada)' },
  { routeLocale: 'en-au', messageLocale: 'en-au', label: 'English (Australia)' },
];

export const routeToMessageLocale = localeOptions.reduce<Record<string, string>>((acc, item) => {
  acc[item.routeLocale] = item.messageLocale;
  return acc;
}, {});

export const homepageSlugByRouteLocale: Record<string, string> = {
  en: 'home',
  'en-ca': 'home',
  'fr-ca': 'accueil',
  'en-au': 'home',
};

export const travelAgencySoftwareSegmentByRouteLocale: Record<string, string> = {
  en: 'travel-agency-software',
  'en-ca': 'travel-agency-software',
  'fr-ca': 'logiciel-agence-voyage',
  'en-au': 'travel-agency-software',
};

// Canonical slug -> locale-specific slug mapping for this section.
export const travelAgencySoftwareSlugs: Record<string, Record<string, string>> = {
  features: {
    en: 'features',
    'en-ca': 'features',
    'fr-ca': 'fonctionnalites',
    'en-au': 'features',
  },
};

const slugToCanonicalByLocale: Record<string, Record<string, string>> = {};
Object.entries(travelAgencySoftwareSlugs).forEach(([canonical, byLocale]) => {
  Object.entries(byLocale).forEach(([locale, slug]) => {
    if (!slugToCanonicalByLocale[locale]) {
      slugToCanonicalByLocale[locale] = {};
    }
    slugToCanonicalByLocale[locale][slug] = canonical;
  });
});

const knownRouteLocales = new Set(localeOptions.map((item) => item.routeLocale));
const knownTravelAgencySoftwareSegments = new Set(Object.values(travelAgencySoftwareSegmentByRouteLocale));

export function getTravelAgencySoftwareSegment(routeLocale: string): string {
  return travelAgencySoftwareSegmentByRouteLocale[routeLocale] ?? travelAgencySoftwareSegmentByRouteLocale.en;
}

export function getHomepageSlug(routeLocale: string): string {
  return homepageSlugByRouteLocale[routeLocale] ?? homepageSlugByRouteLocale.en;
}

export function getHomepageSlugCandidates(routeLocale: string): string[] {
  const preferredSlug = getHomepageSlug(routeLocale);

  if (preferredSlug === 'home') {
    return [preferredSlug];
  }

  return [preferredSlug, 'home'];
}

export function replaceLocaleInPath(pathname: string, targetLocale: string): string {
  const segments = pathname.split('/').filter(Boolean);

  let currentLocale = DEFAULT_ROUTE_LOCALE;
  if (knownRouteLocales.has(segments[0] ?? '')) {
    currentLocale = segments[0];
    segments.shift();
  }

  // Keep the static travel-agency-software segment localized when switching locales.
  if (segments.length > 0 && knownTravelAgencySoftwareSegments.has(segments[0])) {
    segments[0] = getTravelAgencySoftwareSegment(targetLocale);

    // Also translate the page slug in this section when it has a locale-specific value.
    if (segments.length > 1) {
      const currentSlug = segments[1];
      const canonicalSlug = slugToCanonicalByLocale[currentLocale]?.[currentSlug];
      if (canonicalSlug && travelAgencySoftwareSlugs[canonicalSlug]?.[targetLocale]) {
        segments[1] = travelAgencySoftwareSlugs[canonicalSlug][targetLocale];
      }
    }
  }

  const suffixPath = segments.join('/');

  if (targetLocale === DEFAULT_ROUTE_LOCALE) {
    return suffixPath ? `/${suffixPath}` : '/';
  }

  return suffixPath ? `/${targetLocale}/${suffixPath}` : `/${targetLocale}`;
}
