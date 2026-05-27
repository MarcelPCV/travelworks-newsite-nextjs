export type LocaleOption = {
  routeLocale: string;
  messageLocale: string;
  label: string;
};

export const DEFAULT_ROUTE_LOCALE = 'en';

export const localeOptions: LocaleOption[] = [
  { routeLocale: DEFAULT_ROUTE_LOCALE, messageLocale: 'en-US', label: 'English (Global)' },
  { routeLocale: 'ca-en', messageLocale: 'ca-en', label: 'English (Canada)' },
  { routeLocale: 'ca-fr', messageLocale: 'ca-fr', label: 'Francais (Canada)' },
  { routeLocale: 'au-en', messageLocale: 'au-en', label: 'English (Australia)' },
];

export const routeToMessageLocale = localeOptions.reduce<Record<string, string>>((acc, item) => {
  acc[item.routeLocale] = item.messageLocale;
  return acc;
}, {});
