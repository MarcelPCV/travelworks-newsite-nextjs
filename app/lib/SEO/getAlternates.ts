type Locale = 'en' | 'en-ca' | 'en-au' | 'fr';

export function getAlternates(
  paths: {
    en: string;
    'en-au': string;
    fr: string;
  },
  locale: Locale | string,
) {
  const routeLocale: Locale =
    locale === 'en-au' || locale === 'fr' ? locale : 'en';
  return {
    canonical: paths[routeLocale],

    languages: {
      'en-US': paths.en,
      'en-AU': paths['en-au'],
      'fr-CA': paths.fr,
      'x-default': paths.en,
    },
  };
}
