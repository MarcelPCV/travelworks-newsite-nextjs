import FeaturesHeroSection from '../components/features-hero-section';
import FeaturesMasonrySection from '../components/features-masonry-section';
import IntroSection from '../components/intro-section';
import ComparisonSolutionSection from '../components/comparison-solution-section';
import FeaturesHighlightsSection from '../components/features-highlights-section';
import YoutubeVideoSection from '../components/youtube-video-section';
import NewsSection from '../components/news-section';
import FooterLinkColumnsSection from '../components/footer-link-columns-section';

export default function FeaturesPage() {
  return (
    <div className="w-full py-4 sm:py-6">
      <FeaturesHeroSection />
      <IntroSection
        eyebrow="Powerful And Smart Tools"
        heading="Designed Around Travel Agency Work"
        description="Travel agency accounting needs are particular. TravelWorks covers daily operations with tools that raise productivity, strengthen customer service, and support profitability."
        imageSrc="/background-portfolio-features-mobile.webp"
        imageAlt="Abstract product illustration"
        imagePosition="right"
      />
      <FeaturesMasonrySection className="mt-4 sm:mt-6" />
      <YoutubeVideoSection className="mt-4 sm:mt-6" />
      <ComparisonSolutionSection className="mt-4 sm:mt-6" />
      <FeaturesHighlightsSection className="mt-4 sm:mt-6" />
      <NewsSection className="mt-4 sm:mt-6" />
      <FooterLinkColumnsSection className="mt-4 sm:mt-6" />
    </div>
  );
}
