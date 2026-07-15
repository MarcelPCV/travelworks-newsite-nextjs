import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CustomizationsPage } from './data';
import PageHero from '../../components/shared/page-hero/page-hero';
import SplitSection from '../../components/shared/SplitSection/SplitSection';
import FeaturesMasonrySection from '../../components/shared/features-masonry-section/features-masonry-section';
import SecurityBannerCard from '../../components/shared/security-banner-card/security-banner-card';
import { getAlternates } from '@/app/lib/SEO/getAlternates';
import { Metadata } from 'next';
import { Locale } from 'next-intl';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.travel-agency-software' });

  return {
    title: `${t('crm.title')}`,
    description: t('crm.description'),
    alternates: getAlternates(
      {
        en: '/travel-agency-software/crm-tools',
        'en-ca': '/en-ca/travel-agency-software/crm-tools',
        'en-au': '/en-au/travel-agency-software/crm-tools',
        'fr-ca': '/fr-ca/logiciel-agence-voyage/outils-crm',
      },
      locale,
    ),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.travel-agency-software.crm');

  return (
    <main>
      {CustomizationsPage.layout.map((layout, index) => {
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
                heading={layout.heading ? t(layout.heading) : ''}
                description={
                  layout.description
                    ? t.rich(layout.description as string, {
                        strong: (chunks) => <strong>{chunks}</strong>,
                      })
                    : ''
                }
                imageSrc={layout.imageSrc ? t(layout.imageSrc) : ''}
                imageAlt={layout.imageAlt ? t(layout.imageAlt) : ''}
              />
            );
          case 'FeatureMasonry':
            const translatedCards = layout.cards.map((card) => ({
              ...card,
              title: t(card.title),
              topLinkLabel: card.topLinkLabel ? t(card.topLinkLabel) : undefined,
              items: card.items.map((item) =>
                t.rich(item, {
                  strong: (chunks) => <strong>{chunks}</strong>,
                }),
              ),
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
          default:
            return null;
        }
      })}
    </main>
  );
}
