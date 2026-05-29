"use client";

import { useTranslations } from 'next-intl';
import BenefitsBanner from './components/benefits-banner';
import CustomersTrustSection from './components/customers-trust-section';
import FooterLinkColumnsSection from './components/footer-link-columns-section';
import ContactBarSection from './components/contact-bar-section';
import PageApiDebugCarousel from './components/page-api-debug-carousel';
import NewsTickerBar from './components/news-ticker-bar';
import NewsSection from './components/news-section';
import PlatformShowcaseSection from './components/platform-showcase-section';
import PlanningDemoSection from './components/planning-demo-section';
import TechnologyFeaturesSection from './components/technology-features-section';
import WhyTravelworksSection from './components/why-travelworks-section';

export default function LocalePage() {
  const t = useTranslations();

  return (
    <div className="flex w-full flex-col gap-4 py-2">
      <h1 className="sr-only">{t('title')}</h1>
      <NewsTickerBar />
      <PageApiDebugCarousel />
      <TechnologyFeaturesSection />
      <PlatformShowcaseSection />
      <WhyTravelworksSection />
      <BenefitsBanner />
      <CustomersTrustSection />
      <PlanningDemoSection />
      <NewsSection />
      <ContactBarSection />
      <FooterLinkColumnsSection />
    </div>
  );
}
