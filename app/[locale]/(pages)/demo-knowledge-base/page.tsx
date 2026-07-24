import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getCountryOptions } from '@/app/lib/countries';
import AskForDemoPageContent from '@/app/[locale]/(pages)/ask-for-a-demo/components/ask-for-demo-page-content';
import { routeToMessageLocale } from '@/app/[locale]/locale-config';
import FeatureCards from '@/app/[locale]/(pages)/(home)/components/feature-cards/feature-cards';
import { getAlternates } from '@/app/lib/SEO/getAlternates';
import { Metadata } from 'next';
import { Locale } from 'next-intl';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.ask-for-a-demo' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: getAlternates(
      {
        en: '/ask-for-a-demo',
        'en-ca': '/en-ca/ask-for-a-demo',
        'en-au': '/en-au/ask-for-a-demo',
        'fr-ca': '/fr-ca/demander-une-demo',
      },
      locale,
    ),
  };
}

export default async function PageDemoTripDetails({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: routeLocale } = await params;
  setRequestLocale(routeLocale);

  const messageLocale = routeToMessageLocale[routeLocale] ?? 'en-us';
  const countries = getCountryOptions(messageLocale);

  return (
    <main>
      <h1 className="sr-only">Ask for a Demo</h1>
      <AskForDemoPageContent countries={countries} locale={messageLocale} />
      <FeatureCards />
    </main>
  );
}
