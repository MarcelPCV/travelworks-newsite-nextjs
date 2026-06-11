import { getRequestConfig } from 'next-intl/server';
import type { AbstractIntlMessages } from 'next-intl';
import { routeToMessageLocale } from '@/app/[locale]/locale-config';
import enUs from '../messages/en-us.json';

export default getRequestConfig(async ({ requestLocale }) => {
  const routeLocale = await requestLocale;
  const messageLocale = routeToMessageLocale[routeLocale ?? 'en'] ?? 'en-us';

  let messages: AbstractIntlMessages = enUs;

  if (messageLocale !== 'en-us') {
    try {
      messages = (await import(`../messages/${messageLocale}.json`)).default;
    } catch {
      messages = enUs;
    }
  }

  return {
    locale: messageLocale,
    messages,
  };
});
