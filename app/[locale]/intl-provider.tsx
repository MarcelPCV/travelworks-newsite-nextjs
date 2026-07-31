'use client';

import { NextIntlClientProvider } from 'next-intl';
import type { AbstractIntlMessages } from 'next-intl';
import type { ReactNode } from 'react';
import LoadingOverlay from '@/app/[locale]/components/shared/loading-overlay';

export default function IntlProviderWrapper({
  children,
  locale,
  messages,
}: {
  children: ReactNode;
  locale?: string;
  messages: AbstractIntlMessages;
}) {
  // Ensure a non-falsy locale is passed to NextIntlClientProvider
  const effectiveLocale = locale || 'en-us';

  return (
    <NextIntlClientProvider locale={effectiveLocale} messages={messages} timeZone="UTC">
      <LoadingOverlay />
      {children}
    </NextIntlClientProvider>
  );
}
