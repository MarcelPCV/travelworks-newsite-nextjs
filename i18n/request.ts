import { getRequestConfig } from 'next-intl/server';
import type { AbstractIntlMessages } from 'next-intl';
import { headers } from 'next/headers';
import { routeToMessageLocale } from '@/app/[locale]/locale-config';
import enUs from '../messages/en-us.json';

export default getRequestConfig(async ({ requestLocale }) => {
  const requestHeaders = await headers();
  const routeLocale =
    (await requestLocale) ?? requestHeaders.get('x-travelworks-route-locale') ?? 'en';
  const messageLocale = routeToMessageLocale[routeLocale] ?? 'en-us';

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
