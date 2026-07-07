import { setRequestLocale } from 'next-intl/server';
import { getCountryOptions } from '@/app/lib/countries';
import ContactPageContent from '@/app/[locale]/about-us/contact/components/contact-page-content';
import { routeToMessageLocale } from '@/app/[locale]/locale-config';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: routeLocale } = await params;
  setRequestLocale(routeLocale);

  const messageLocale = routeToMessageLocale[routeLocale] ?? 'en-us';
  const countries = getCountryOptions(messageLocale);

  return (
    <main>
      <ContactPageContent countries={countries} locale={messageLocale} />
    </main>
  );
}
