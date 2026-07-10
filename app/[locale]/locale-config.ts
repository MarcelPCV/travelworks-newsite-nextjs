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

export const aboutUsSegmentByRouteLocale: Record<string, string> = {
  en: 'about-us',
  'en-ca': 'about-us',
  'fr-ca': 'a-propos',
  'en-au': 'about-us',
};

export const trainingSegmentByRouteLocale: Record<string, string> = {
  en: 'training',
  'en-ca': 'training',
  'fr-ca': 'formation',
  'en-au': 'training',
};

export const demoByRouteLocale: Record<string, string> = {
  en: 'ask-for-a-demo',
  'en-ca': 'ask-for-a-demo',
  'fr-ca': 'demander-une-demo',
  'en-au': 'ask-for-a-demo',
};

export const newsSegmentByRouteLocale: Record<string, string> = {
  en: 'news',
  'en-ca': 'news',
  'fr-ca': 'nouvelles',
  'en-au': 'news',
};

export const newsCategorySegmentByRouteLocale: Record<string, string> = {
  en: 'category',
  'en-ca': 'category',
  'fr-ca': 'categorie',
  'en-au': 'category',
};

export const newsCategorySlugs: Record<string, Record<string, string>> = {
  accounting: {
    en: 'accounting',
    'en-ca': 'accounting',
    'fr-ca': 'comptabilite',
    'en-au': 'accounting',
  },
  'agency-owner': {
    en: 'agency-owner',
    'en-ca': 'agency-owner',
    'fr-ca': 'proprietaire-agence',
    'en-au': 'agency-owner',
  },
  'it-manager': {
    en: 'it-manager',
    'en-ca': 'it-manager',
    'fr-ca': 'gestionnaire-ti',
    'en-au': 'it-manager',
  },
  technology: {
    en: 'technology',
    'en-ca': 'technology',
    'fr-ca': 'technologie',
    'en-au': 'technology',
  },
};

export const travelAgencySoftwareSlugs: Record<string, Record<string, string>> = {
  features: {
    en: 'features',
    'en-ca': 'features',
    'fr-ca': 'fonctionnalites',
    'en-au': 'features',
  },
  benefits: {
    en: 'benefits',
    'en-ca': 'benefits',
    'fr-ca': 'avantages',
    'en-au': 'benefits',
  },
  'back-office-travel-agency': {
    en: 'back-office-travel-agency',
    'en-ca': 'back-office-travel-agency',
    'fr-ca': 'back-office-agence-voyage',
    'en-au': 'back-office-travel-agency',
  },
  'trip-details': {
    en: 'trip-details',
    'en-ca': 'trip-details',
    'fr-ca': 'details-du-voyage',
    'en-au': 'trip-details',
  },
  'tour-management': {
    en: 'tour-management',
    'en-ca': 'tour-management',
    'fr-ca': 'gestion-des-tours',
    'en-au': 'tour-management',
  },
  'tour-online': {
    en: 'tour-online',
    'en-ca': 'tour-online',
    'fr-ca': 'tour-online',
    'en-au': 'tour-online',
  },
  'crm-tools': {
    en: 'crm-tools',
    'en-ca': 'crm-tools',
    'fr-ca': 'outils-crm',
    'en-au': 'crm-tools',
  },
  integrations: {
    en: 'integrations',
    'en-ca': 'integrations',
    'fr-ca': 'integrations',
    'en-au': 'integrations',
  },
  'dashboard-reports': {
    en: 'dashboard-reports',
    'en-ca': 'dashboard-reports',
    'fr-ca': 'tableau-de-bord-rapports',
    'en-au': 'dashboard-reports',
  },
  customizations: {
    en: 'customizations',
    'en-ca': 'customizations',
    'fr-ca': 'customizations',
    'en-au': 'customizations',
  },
};

export const aboutUsSlugs: Record<string, Record<string, string>> = {
  partners: {
    en: 'partners',
    'en-ca': 'partners',
    'fr-ca': 'partenaires',
    'en-au': 'partners',
  },
  travelworks: {
    en: 'travelworks',
    'en-ca': 'travelworks',
    'fr-ca': 'pc-voyages',
    'en-au': 'travelworks',
  },
  careers: {
    en: 'careers',
    'en-ca': 'careers',
    'fr-ca': 'carrieres',
    'en-au': 'careers',
  }
};

export const trainingSlugs: Record<string, Record<string, string>> = {
  'training-platform': {
    en: 'training-platform',
    'en-ca': 'training-platform',
    'fr-ca': 'plateforme-de-formation',
    'en-au': 'training-platform',
  },
  'knowledge-base': {
    en: 'knowledge-base',
    'en-ca': 'knowledge-base',
    'fr-ca': 'base-de-connaissances',
    'en-au': 'knowledge-base',
  },
};

const travelAgencySoftwareSlugToCanonicalByLocale: Record<string, Record<string, string>> = {};
Object.entries(travelAgencySoftwareSlugs).forEach(([canonical, byLocale]) => {
  Object.entries(byLocale).forEach(([locale, slug]) => {
    if (!travelAgencySoftwareSlugToCanonicalByLocale[locale]) {
      travelAgencySoftwareSlugToCanonicalByLocale[locale] = {};
    }
    travelAgencySoftwareSlugToCanonicalByLocale[locale][slug] = canonical;
  });
});

const aboutUsSlugToCanonicalByLocale: Record<string, Record<string, string>> = {};
Object.entries(aboutUsSlugs).forEach(([canonical, byLocale]) => {
  Object.entries(byLocale).forEach(([locale, slug]) => {
    if (!aboutUsSlugToCanonicalByLocale[locale]) {
      aboutUsSlugToCanonicalByLocale[locale] = {};
    }
    aboutUsSlugToCanonicalByLocale[locale][slug] = canonical;
  });
});

const trainingSlugToCanonicalByLocale: Record<string, Record<string, string>> = {};
Object.entries(trainingSlugs).forEach(([canonical, byLocale]) => {
  Object.entries(byLocale).forEach(([locale, slug]) => {
    if (!trainingSlugToCanonicalByLocale[locale]) {
      trainingSlugToCanonicalByLocale[locale] = {};
    }
    trainingSlugToCanonicalByLocale[locale][slug] = canonical;
  });
});

const newsCategorySlugToCanonicalByLocale: Record<string, Record<string, string>> = {};
Object.entries(newsCategorySlugs).forEach(([canonical, byLocale]) => {
  Object.entries(byLocale).forEach(([locale, slug]) => {
    if (!newsCategorySlugToCanonicalByLocale[locale]) {
      newsCategorySlugToCanonicalByLocale[locale] = {};
    }
    newsCategorySlugToCanonicalByLocale[locale][slug] = canonical;
  });
});

const knownRouteLocales = new Set(localeOptions.map((item) => item.routeLocale));

const knownTravelAgencySoftwareSegments = new Set(
  Object.values(travelAgencySoftwareSegmentByRouteLocale),
);
export function getTravelAgencySoftwareSegment(routeLocale: string): string {
  return (
    travelAgencySoftwareSegmentByRouteLocale[routeLocale] ??
    travelAgencySoftwareSegmentByRouteLocale.en
  );
}

const knownAboutUsSegments = new Set(Object.values(aboutUsSegmentByRouteLocale));
export function getAboutUsSegment(routeLocale: string): string {
  return aboutUsSegmentByRouteLocale[routeLocale] ?? aboutUsSegmentByRouteLocale.en;
}

const knownTrainingSegments = new Set(Object.values(trainingSegmentByRouteLocale));
export function getTrainingSegment(routeLocale: string): string {
  return trainingSegmentByRouteLocale[routeLocale] ?? trainingSegmentByRouteLocale.en;
}

const knownDemoSlugs = new Set(Object.values(demoByRouteLocale));
export function getDemoSlug(routeLocale: string): string {
  return demoByRouteLocale[routeLocale] ?? demoByRouteLocale.en;
}

const knownNewsSegments = new Set(Object.values(newsSegmentByRouteLocale));
export function getNewsSegment(routeLocale: string): string {
  return newsSegmentByRouteLocale[routeLocale] ?? newsSegmentByRouteLocale.en;
}

export function getNewsCategorySegment(routeLocale: string): string {
  return (
    newsCategorySegmentByRouteLocale[routeLocale] ?? newsCategorySegmentByRouteLocale.en
  );
}

export function getNewsCategorySlug(routeLocale: string, canonicalSlug: string): string {
  return (
    newsCategorySlugs[canonicalSlug]?.[routeLocale] ??
    newsCategorySlugs[canonicalSlug]?.en ??
    canonicalSlug
  );
}

export function getNewsCategoryCanonicalSlug(
  routeLocale: string,
  localizedSlug: string,
): string {
  return (
    newsCategorySlugToCanonicalByLocale[routeLocale]?.[localizedSlug] ??
    newsCategorySlugToCanonicalByLocale.en?.[localizedSlug] ??
    localizedSlug
  );
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
      const canonicalSlug =
        travelAgencySoftwareSlugToCanonicalByLocale[currentLocale]?.[currentSlug];
      if (canonicalSlug && travelAgencySoftwareSlugs[canonicalSlug]?.[targetLocale]) {
        segments[1] = travelAgencySoftwareSlugs[canonicalSlug][targetLocale];
      }
    }
  }

  // Keep the static about-us segment localized when switching locales.
  if (segments.length > 0 && knownAboutUsSegments.has(segments[0])) {
    segments[0] = getAboutUsSegment(targetLocale);

    if (segments.length > 1) {
      const currentSlug = segments[1];
      const canonicalSlug = aboutUsSlugToCanonicalByLocale[currentLocale]?.[currentSlug];
      if (canonicalSlug && aboutUsSlugs[canonicalSlug]?.[targetLocale]) {
        segments[1] = aboutUsSlugs[canonicalSlug][targetLocale];
      }
    }
  }

  // Keep the static training segment localized when switching locales.
  if (segments.length > 0 && knownTrainingSegments.has(segments[0])) {
    segments[0] = getTrainingSegment(targetLocale);

    if (segments.length > 1) {
      const currentSlug = segments[1];
      const canonicalSlug = trainingSlugToCanonicalByLocale[currentLocale]?.[currentSlug];
      if (canonicalSlug && trainingSlugs[canonicalSlug]?.[targetLocale]) {
        segments[1] = trainingSlugs[canonicalSlug][targetLocale];
      }
    }
  }

  // Keep one-level demo page slug localized when switching locales.
  if (segments.length > 0 && knownDemoSlugs.has(segments[0])) {
    segments[0] = getDemoSlug(targetLocale);
  }

  // Keep the static news/category segments localized when switching locales.
  if (segments.length > 0 && knownNewsSegments.has(segments[0])) {
    segments[0] = getNewsSegment(targetLocale);

    if (segments.length > 1 && segments[1] === getNewsCategorySegment(currentLocale)) {
      segments[1] = getNewsCategorySegment(targetLocale);

      if (segments.length > 2) {
        const currentCategorySlug = segments[2];
        const canonicalCategorySlug = getNewsCategoryCanonicalSlug(
          currentLocale,
          currentCategorySlug,
        );
        const translatedCategorySlug = getNewsCategorySlug(targetLocale, canonicalCategorySlug);
        if (translatedCategorySlug) {
          segments[2] = translatedCategorySlug;
        }
      }
    }
  }

  const suffixPath = segments.join('/');

  if (targetLocale === DEFAULT_ROUTE_LOCALE) {
    return suffixPath ? `/${suffixPath}` : '/';
  }

  return suffixPath ? `/${targetLocale}/${suffixPath}` : `/${targetLocale}`;
}
