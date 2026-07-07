import { getTranslations, setRequestLocale } from 'next-intl/server';
import { BackOfficeTravelAgencyPage } from './data';
import PageHero from '../../components/shared/page-hero/page-hero';
import SplitSection from '../../components/shared/SplitSection/SplitSection';
import FeaturesHighlightsSection from '../../components/features/features-highlights-section';
import FeaturesMasonrySection from '../../components/shared/features-masonry-section/features-masonry-section';
import SecurityBannerCard from '../../components/shared/security-banner-card/security-banner-card';
import { FeatureMasonryCard } from '../../components/shared/features-masonry-section/type';
import YoutubeVideoSection from '../../components/shared/video/youtube-video-section';
import { FeaturesCardsHighlights } from '../../components/features/type';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.travel-agency-software.back-office-travel-agency');

  return (
    <main>
      {BackOfficeTravelAgencyPage.layout.map((layout, index) => {
        switch (layout.blockType) {
          case 'PageHero':
            return (
              <PageHero
                key={index}
                {...layout}
                title={layout.title ? t(layout.title) : ''}
                description={layout.description ? t(layout.description) : ''}
                mobileTopImageSrc={layout.mobileTopImageSrc ? t(layout.mobileTopImageSrc) : ''}
                desktopMainImageSrc={
                  layout.desktopMainImageSrc ? t(layout.desktopMainImageSrc) : ''
                }
                logoImageSrc={layout.logoImageSrc ? t(layout.logoImageSrc) : ''}
                ctaImageSrc={layout.ctaImageSrc ? t(layout.ctaImageSrc) : ''}
              />
            );
          case 'SplitSection':
            return (
              <SplitSection
                key={index}
                {...layout}
                heading={typeof layout.heading === 'string' ? t(layout.heading) : ''}
                description={typeof layout.description === 'string' ? t(layout.description) : ''}
                imageSrc={typeof layout.imageSrc === 'string' ? t(layout.imageSrc) : ''}
                imageAlt={typeof layout.imageAlt === 'string' ? t(layout.imageAlt) : ''}
              />
            );
          case 'FeaturesHighlights':
            const translatedHighlightCards: FeaturesCardsHighlights[] = layout.cards.map(
              (card) => ({
                ...card,
                title: t(card.title),
                description: String(t.raw(card.description)),
              }),
            );

            return <FeaturesHighlightsSection key={index} cards={translatedHighlightCards} />;
          case 'FeatureMasonry':
            const translatedCards: FeatureMasonryCard[] = layout.cards.map((card) => ({
              ...card,
              title: t(card.title),
              topLinkLabel: card.topLinkLabel ? t(card.topLinkLabel) : undefined,
              items: card.items.map((item) => t(item)),
              ctaLabel: card.ctaLabel ? t(card.ctaLabel) : undefined,
            }));

            return (
              <div key={index} className="mx-auto max-w-7xl flex flex-col lg:flex-row gap-10 mt-10">
                <FeaturesMasonrySection
                  heading={t('block-type-features-masonry.heading')}
                  cards={translatedCards}
                />
                <div className="hidden lg:block">
                  <SecurityBannerCard />
                </div>
              </div>
            );
          case 'YoutubeVideo':
            return (
              <YoutubeVideoSection
                key={index}
                {...layout}
                heading={layout.heading ? t(layout.heading) : ''}
                videoId={layout.videoId ? t(layout.videoId) : ''}
                channelLabel={layout.channelLabel ? t(layout.channelLabel) : ''}
                description={layout.description ? t(layout.description) : ''}
              />
            );
          default:
            return null;
        }
      })}
    </main>
  );
}
