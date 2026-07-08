type Locale = 'en' | 'en-ca' | 'en-au' | 'fr-ca';

export function getAlternates(
  paths: {
    en: string;
    'en-ca': string;
    'en-au': string;
    'fr-ca': string;
  },
  locale: Locale | string
) {
  const routeLocale: Locale =
    locale === 'en-ca' ||
    locale === 'en-au' ||
    locale === 'fr-ca'
      ? locale
      : 'en';

  return {
    canonical: paths[routeLocale],

    languages: {
      'en-US': paths.en,
      'en-CA': paths['en-ca'],
      'en-AU': paths['en-au'],
      'fr-CA': paths['fr-ca'],
      'x-default': paths.en,
    },
  };
}