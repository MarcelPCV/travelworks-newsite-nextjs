import { setRequestLocale } from 'next-intl/server';
import { getCountryOptions } from '@/app/lib/countries';
import AskForDemoPageContent from '@/app/[locale]/ask-for-a-demo/components/ask-for-demo-page-content';
import { routeToMessageLocale } from '../locale-config';
import FeatureCards from '../components/home/feature-cards/feature-cards';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
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
