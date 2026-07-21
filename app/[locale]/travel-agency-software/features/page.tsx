import PageHero from '../../components/shared/page-hero/page-hero';
import SplitSection from '../../components/shared/SplitSection/SplitSection';
import FeaturesMasonrySection from '../../components/shared/features-masonry-section/features-masonry-section';
import YoutubeVideoSection from '../../components/shared/video/youtube-video-section';
import ComparisonSolutionSection from '../../components/shared/comparison-solution-section/comparison-solution-section';
import { FeaturesPage } from './data';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { FeatureMasonryCard } from '../../components/shared/features-masonry-section/type';
import {
  ComparisonColumn,
  ComparisonSolutionRow,
} from '../../components/shared/comparison-solution-section/type';
import { getAlternates } from '@/app/lib/SEO/getAlternates';
import { Metadata } from 'next';
import { Locale } from 'next-intl';
import { Breadcrumb } from '@/app/[locale]/components/news/breadcrumb';
import type { BreadcrumbItem } from '@/app/[locale]/(pages)/news/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.travel-agency-software' });

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
      locale,
    ),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.travel-agency-software.features');

  const homeHref = locale === 'en' ? '/' : `/${locale}`;
  const breadcrumbItems: BreadcrumbItem[] = [{ label: t('breadcrumb.features-label'), href: '#' }];

  return (
    <main>
      <Breadcrumb items={breadcrumbItems} homeHref={homeHref} />
      {FeaturesPage.layout.map((layout, index) => {
        switch (layout.blockType) {
          case 'PageHero':
            return (
              <PageHero
                key={index}
                {...layout}
                title={
                  layout.title
                    ? t.rich(layout.title as string, {
                        strong: (chunks) => (
                          <strong className="font-semibold text-brand-blue">{chunks}</strong>
                        ),
                      })
                    : ''
                }
                description={
                  layout.description
                    ? t.rich(layout.description as string, {
                        strong: (chunks) => (
                          <strong className="font-semibold text-brand-blue">{chunks}</strong>
                        ),
                      })
                    : ''
                }
                mobileTopImageSrc={layout.mobileTopImageSrc ? t(layout.mobileTopImageSrc) : ''}
                desktopMainImageSrc={
                  layout.desktopMainImageSrc ? t(layout.desktopMainImageSrc) : ''
                }
                logoImageSrc={layout.logoImageSrc ? t(layout.logoImageSrc) : ''}
                logoWidth={200}
                ctaImageSrc={layout.ctaImageSrc ? t(layout.ctaImageSrc) : ''}
                ctaWidth={150}
              />
            );
          case 'SplitSection':
            return (
              <SplitSection
                key={index}
                {...layout}
                heading={t.rich(layout.heading as string, {
                  strong: (chunks) => (
                    <strong className="font-semibold text-brand-blue">{chunks}</strong>
                  ),
                })}
                description={t.rich(layout.description as string, {
                  strong: (chunks) => (
                    <strong className="font-semibold text-brand-blue">{chunks}</strong>
                  ),
                })}
                imageSrc={typeof layout.imageSrc === 'string' ? t(layout.imageSrc) : ''}
                imageAlt={typeof layout.imageAlt === 'string' ? t(layout.imageAlt) : ''}
              />
            );
          case 'FeatureMasonry':
            const translatedCards: FeatureMasonryCard[] = layout.cards.map((card) => ({
              ...card,
              title: t(card.title),
              topLinkLabel: card.topLinkLabel ? t(card.topLinkLabel) : undefined,
              topLinkHref: card.topLinkHref ? t(card.topLinkHref) : undefined,
              items: card.items.map((item) => t(item)),
              ctaLabel: card.ctaLabel ? t(card.ctaLabel) : undefined,
              ctaHref: card.ctaHref ? t(card.ctaHref) : undefined,
            }));

            return (
              <FeaturesMasonrySection
                key={index}
                heading={t('block-type-features-masonry.heading')}
                cards={translatedCards}
              />
            );
          case 'YoutubeVideo':
            return (
              <YoutubeVideoSection
                key={index}
                {...layout}
                heading={
                  layout.heading
                    ? t.rich(layout.heading as string, {
                        strong: (chunks) => (
                          <strong className="font-semibold text-brand-blue">{chunks}</strong>
                        ),
                      })
                    : ''
                }
                videoId={layout.videoId ? t(layout.videoId) : ''}
                channelLabel={layout.channelLabel ? t(layout.channelLabel) : ''}
                description={
                  layout.description
                    ? t.rich(layout.description as string, {
                        strong: (chunks) => (
                          <strong className="font-semibold text-brand-blue">{chunks}</strong>
                        ),
                      })
                    : ''
                }
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
                heading={
                  layout.heading
                    ? t.rich(layout.heading as string, {
                        strong: (chunks) => (
                          <strong className="font-semibold text-brand-blue">{chunks}</strong>
                        ),
                      })
                    : ''
                }
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
