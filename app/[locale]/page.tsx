import HeroCarousel from './components/home/hero-carousel/hero-carousel'
import FeaturesHighlightsSection from './components/features/features-highlights-section';
import FeatureCards from './components/home/feature-cards/feature-cards';

export default async function LocalePage() {
  // if (!page) {
  //   return <CmsUnavailable />;
  // }

  return (
    <main>
      <h1 className="sr-only">{'Home'}</h1>
      <div className="flex w-full flex-col gap-4 py-2">
        <HeroCarousel />
        <FeatureCards />
        <FeaturesHighlightsSection />
      </div>
    </main>
  );
}
