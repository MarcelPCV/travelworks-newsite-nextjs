import PageHero from '../../components/shared/page-hero/page-hero';
import SplitSection from '../../components/shared/SplitSection/SplitSection';
import FeaturesMasonrySection from '../../components/shared/features-masonry-section/features-masonry-section';
import YoutubeVideoSection from '../../components/shared/video/youtube-video-section';
import ComparisonSolutionSection from '../../components/shared/comparison-solution-section/comparison-solution-section';
import { FeaturesPage } from './data';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import SecurityBannerCard from './../../components/shared/security-banner-card/security-banner-card';
import { FeatureMasonryCard } from '../../components/shared/features-masonry-section/type';
import {
  ComparisonColumn,
  ComparisonSolutionRow,
} from '../../components/shared/comparison-solution-section/type';
import { getAlternates } from '@/app/lib/SEO/getAlternates';
import { Metadata } from 'next';
import { Locale } from 'next-intl';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({locale, namespace: 'metadata.travel-agency-software'});

  return {
    title: `${t('features.title')}`,
    description: t('features.description'),
    alternates: getAlternates(
      {
        en: '/travel-agency-software/features',
        'en-ca': '/en-ca/travel-agency-software/features',
        'en-au': '/en-au/travel-agency-software/features',
        'fr-ca': '/fr-ca/logiciel-agence-voyage/fonctionnalites',
      },
      locale
    ),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.travel-agency-software.features');
  return (
    <main>
      {FeaturesPage.layout.map((layout, index) => {
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
          case 'ComparisonSolution':
            const translatedColumns: ComparisonColumn[] = (layout.columns ?? []).map((column) => {
              try {
                return { ...column, label: t(column.label) };
              } catch {
                return column;
              }
            });

            const translatedRows: ComparisonSolutionRow[] = (layout.rows ?? []).map((row) => {
              try {
                return { ...row, label: t(row.label) };
              } catch {
                return row;
              }
            });

            return (
              <ComparisonSolutionSection
                key={index}
                {...layout}
                heading={layout.heading ? t(layout.heading) : ''}
                imageSrc={layout.imageSrc ? t(layout.imageSrc) : ''}
                imageAlt={layout.imageAlt ? t(layout.imageAlt) : ''}
                columns={translatedColumns}
                rows={translatedRows}
              />
            );
          default:
            return null;
        }
      })}
    </main>
  );
}
