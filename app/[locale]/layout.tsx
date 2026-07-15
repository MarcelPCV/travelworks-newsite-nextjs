import IntlProviderWrapper from './intl-provider';
import type { ReactNode } from 'react';
import type { AbstractIntlMessages } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import enUS from '../../messages/en-us.json';
import Navbar from './components/layout/navbar/navbar';
import LocationConfirmationBar from './components/layout/location-confirmation-bar';
import TopAnnouncementBar from './components/layout/top-announcement-bar';
import ConsentManager from './components/layout/consent-manager';
import { routeToMessageLocale } from './locale-config';
import Footer from './components/footer/index';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string } | Promise<{ locale: string }>;
}) {
  // `params` may be a Promise in some Next.js versions — await it and read locale to support both sync and async shapes
  const { locale } = await Promise.resolve(params);
  setRequestLocale(locale);
  const file = routeToMessageLocale[locale] ?? 'en-us';

  // Statically import the default messages so Turbopack can resolve the module during build.
  let messages: AbstractIntlMessages = enUS;

  if (file !== 'en-us') {
    try {
      messages = (await import(`../../messages/${file}.json`)).default;
    } catch {
      messages = enUS;
    }
  }

  // Pass the message locale (e.g. 'en-us') to the client provider so it can be inferred reliably
  return (
    <IntlProviderWrapper locale={file} messages={messages}>
      <div className="min-h-screen bg-zinc-50">
        <LocationConfirmationBar />
        <TopAnnouncementBar />
        <Navbar />
        <main className="mx-auto w-full">{children}</main>
        <ConsentManager />
        <Footer />
      </div>
    </IntlProviderWrapper>
  );
}
