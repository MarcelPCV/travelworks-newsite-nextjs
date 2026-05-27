'use client';

import { useTranslations } from 'next-intl';
import BenefitsBanner from './components/benefits-banner';
import CustomersTrustSection from './components/customers-trust-section';
import FooterLinkColumnsSection from './components/footer-link-columns-section';
import ContactBarSection from './components/contact-bar-section';
import HeroCarousel, { type HeroSlide } from './components/hero-carousel';
import NewsTickerBar from './components/news-ticker-bar';
import NewsSection from './components/news-section';
import PlatformShowcaseSection from './components/platform-showcase-section';
import PlanningDemoSection from './components/planning-demo-section';
import TechnologyFeaturesSection from './components/technology-features-section';
import WhyTravelworksSection from './components/why-travelworks-section';

export default function LocalePage() {
  const t = useTranslations();

  const slides: HeroSlide[] = [
    {
      id: 'localized-welcome',
      eyebrow: 'TravelWorks Platform',
      title: t('title'),
      description: 'A comprehensive solution: booking, CRM, inventory, billing, accounting and marketing.',
      ctaLabel: 'Discover Tour Online',
      background:
        'bg-[radial-gradient(circle_at_85%_34%,rgba(255,170,59,0.9)_0_28%,transparent_29%),linear-gradient(135deg,#ffffff_0%,#f8fafc_45%,#eef3fb_100%)]',
      mediaGradient: 'bg-[linear-gradient(155deg,#2e5cb3_0%,#3c79da_45%,#0b1e4a_100%)]',
      mediaCaption: 'For the perfect vacations',
    },
    {
      id: 'operations-clarity',
      eyebrow: 'Back-office intelligence',
      title: 'Run faster, smarter operations',
      description: 'Track departures, margins and inventory in one responsive workspace built for travel teams.',
      ctaLabel: 'Explore Platform',
      background:
        'bg-[radial-gradient(circle_at_78%_24%,rgba(243,112,34,0.75)_0_24%,transparent_25%),linear-gradient(130deg,#ffffff_0%,#f0f6ff_52%,#e7eefc_100%)]',
      mediaGradient: 'bg-[linear-gradient(145deg,#0b1e4a_0%,#2e5cb3_40%,#3c79da_100%)]',
      mediaCaption: 'Revenue and inventory intelligence',
    },
    {
      id: 'journeys-connected',
      eyebrow: 'Connected customer journeys',
      title: 'From campaign to conversion',
      description: 'Coordinate marketing, sales and service around one source of truth to improve every booking funnel.',
      ctaLabel: 'View Product Tour',
      background:
        'bg-[radial-gradient(circle_at_86%_30%,rgba(255,170,59,0.75)_0_26%,transparent_27%),linear-gradient(120deg,#ffffff_0%,#f6f9ff_45%,#ecf2fd_100%)]',
      mediaGradient: 'bg-[linear-gradient(150deg,#2e5cb3_0%,#0b1e4a_55%,#3c79da_100%)]',
      mediaCaption: 'Data-rich experiences for every channel',
    },
  ];

  return (
    <div className="flex w-full flex-col gap-10 py-2">
      <div className="space-y-0">
        <NewsTickerBar />
        <HeroCarousel slides={slides} effect="fade" navigation pagination contentAlignment="alternate" />
      </div>
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
