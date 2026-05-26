export type LocaleOption = {
  routeLocale: string;
  messageLocale: string;
  label: string;
};

export const DEFAULT_ROUTE_LOCALE = 'en';

export const localeOptions: LocaleOption[] = [
  { routeLocale: DEFAULT_ROUTE_LOCALE, messageLocale: 'en-US', label: 'English (Global - US)' },
  { routeLocale: 'ca-en', messageLocale: 'en-CA', label: 'English (Canada)' },
  { routeLocale: 'ca-fr', messageLocale: 'fr-CA', label: 'Francais (Canada)' },
  { routeLocale: 'au-en', messageLocale: 'en-AU', label: 'English (Australia)' },
];

export const routeToMessageLocale = localeOptions.reduce<Record<string, string>>((acc, item) => {
  acc[item.routeLocale] = item.messageLocale;
  return acc;
}, {});
