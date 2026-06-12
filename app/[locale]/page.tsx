import HeroCarousel from './components/home/hero-carousel/hero-carousel'
import FeaturesHighlightsSection from './components/features/features-highlights-section';
import FeatureCards from './components/home/feature-cards/feature-cards';
import WhyTravelworksSection from './components/home/why/why-travelworks-section';
import PlanningDemoSection from './components/home/demo-section/planning-demo-section';
import PlatformShowcase from './components/home/platform-showcase/platform-showcase';
import NewsTickerBar from './components/home/news-ticker/news-ticker-bar';
import ClientTrustSection from './components/home/clients-section/client-trust-section';
import BenefitsBanner from './components/home/benefits-banner/benefits-banner';
import { setRequestLocale } from 'next-intl/server';
import { getCountryOptions } from '@/app/lib/countries';
import { routeToMessageLocale } from './locale-config';


export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: routeLocale } = await params;
  setRequestLocale(routeLocale);
  const messageLocale = routeToMessageLocale[routeLocale] ?? 'en-us';
  const countries = getCountryOptions(messageLocale);
  // if (!page) {
  //   return <CmsUnavailable />;
  // }

  return (
    <main>
      <h1 className="sr-only">{'Home'}</h1>
      <div className="flex w-full flex-col gap-4 py-2">
        <NewsTickerBar />
        <HeroCarousel />
        <FeatureCards />
        <PlatformShowcase />
        <WhyTravelworksSection />
        <BenefitsBanner />
        <ClientTrustSection />
        <BenefitsBanner />
        <PlanningDemoSection
          countries={countries}
          locale={messageLocale}
        />
        <FeaturesHighlightsSection />
      </div>
    </main>
  );
}
