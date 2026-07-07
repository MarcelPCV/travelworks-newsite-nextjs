import { getTranslations, setRequestLocale } from 'next-intl/server';
import { IntegrationsPageData } from './data';
import PageHero from '../../components/shared/page-hero/page-hero';
import CardsIconsSection from '../../components/shared/cards-icons/cards-icons';
import SplitSection from '../../components/shared/SplitSection/SplitSection';
import SplitBannerSection from '@/app/[locale]/components/shared/split-banner-section/SplitBannerSection';
import ComparisonSolutionSection from '../../components/shared/comparison-solution-section/comparison-solution-section';
import {
  ComparisonColumn,
  ComparisonSolutionRow,
} from '../../components/shared/comparison-solution-section/type';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.travel-agency-software.tour-management');

  return (
    <main>
      {IntegrationsPageData.layout.map((layout, index) => {
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
          case 'CardsIcons':
            return (
              <CardsIconsSection
                key={index}
                {...layout}
                title={layout.title ? t(layout.title) : ''}
                cards={
                  layout.cards
                    ? layout.cards.map((card) => ({
                        ...card,
                        title: card.title ? t(card.title) : '',
                        description: card.description ? t(card.description) : '',
                      }))
                    : []
                }
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
          case 'SplitBannerSection':
            return (
              <SplitBannerSection
                key={index}
                {...layout}
                title={typeof layout.title === 'string' ? t(layout.title) : ''}
                heading={typeof layout.heading === 'string' ? t(layout.heading) : ''}
                description={typeof layout.description === 'string' ? t(layout.description) : ''}
                imageSrc={typeof layout.imageSrc === 'string' ? t(layout.imageSrc) : ''}
                imageAlt={typeof layout.imageAlt === 'string' ? t(layout.imageAlt) : ''}
                imageSecondarySrc={
                  typeof layout.imageSecondarySrc === 'string' ? t(layout.imageSecondarySrc) : ''
                }
                imageSecondaryAlt={
                  typeof layout.imageSecondaryAlt === 'string' ? t(layout.imageSecondaryAlt) : ''
                }
                backgroundColor={
                  typeof layout.backgroundColor === 'string' ? layout.backgroundColor : ''
                }
                ctaLabel={typeof layout.ctaLabel === 'string' ? t(layout.ctaLabel) : ''}
                ctaLink={typeof layout.ctaLink === 'string' ? t(layout.ctaLink) : ''}
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
