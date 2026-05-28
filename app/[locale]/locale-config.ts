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
