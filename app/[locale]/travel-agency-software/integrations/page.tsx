import { getTranslations, setRequestLocale } from 'next-intl/server';
import { IntegrationsPageData } from './data';
import PageHero from '../../components/shared/page-hero/page-hero';
import { FeaturesCardsHighlights } from '../../components/features/type';
import FeaturesHighlightsSection from '../../components/features/features-highlights-section';
import ImageBlock from '../../components/shared/image-block/image-block';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.travel-agency-software.integrations');

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
          case 'ImageBlock':
            return (
              <ImageBlock
                key={index}
                {...layout}
                title={layout.title ? t(layout.title) : ''}
                description={
                  layout.description
                    ? t.rich(layout.description as string, {
                        strong: (chunks) => <strong>{chunks}</strong>,
                      })
                    : ''
                }
                imageSrc={layout.imageSrc ? t(layout.imageSrc) : ''}
                altText={layout.altText ? t(layout.altText) : ''}
                linkHref={layout.linkHref ? t(layout.linkHref) : ''}
                linkText={layout.linkText ? t(layout.linkText) : ''}
                widthPercentage={layout.widthPercentage}
                hasCaption={layout.hasCaption}
                captionText={layout.captionText ? t(layout.captionText) : ''}
              />
            );
          case 'FeaturesHighlights':
            const translatedHighlightCards: FeaturesCardsHighlights[] = layout.cards.map(
              (card) => ({
                ...card,
                title: t(card.title),
                linkTitle: card.linkTitle ? t(card.linkTitle) : '',
                linkUrl: card.linkUrl ? t(card.linkUrl) : '',
                description: String(t.raw(card.description)),
              }),
            );

            return <FeaturesHighlightsSection key={index} cards={translatedHighlightCards} />;
          default:
            return null;
        }
      })}
    </main>
  );
}
