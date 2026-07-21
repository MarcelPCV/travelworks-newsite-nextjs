import { getTranslations, setRequestLocale } from 'next-intl/server';
import { BackOfficeTravelAgencyPage } from './data';
import PageHero from '../../../components/shared/page-hero/page-hero';
import FeaturesHighlightsSection from '../../../components/features/features-highlights-section';
import { FeaturesCardsHighlights } from '../../../components/features/type';
import { getAlternates } from '@/app/lib/SEO/getAlternates';
import { Metadata } from 'next';
import { Locale } from 'next-intl';
import { Breadcrumb } from '../../../components/news/breadcrumb';
import type { BreadcrumbItem } from '@/app/[locale]/(pages)/news/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.travel-agency-software' });

  return {
    title: `${t('dashboard-reports.title')}`,
    description: t('dashboard-reports.description'),
    alternates: getAlternates(
      {
        en: '/travel-agency-software/dashboard-reports',
        'en-ca': '/en-ca/travel-agency-software/dashboard-reports',
        'en-au': '/en-au/travel-agency-software/dashboard-reports',
        'fr-ca': '/fr-ca/logiciel-agence-voyage/tableau-de-bord-rapports',
      },
      locale,
    ),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.travel-agency-software.dashboard-reports');

  const homeHref = locale === 'en' ? '/' : `/${locale}`;
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: t('breadcrumb.features-label'), href: t('breadcrumb.features-link') },
    { label: t('breadcrumb.dashboard-label'), href: '#' },
  ];

  return (
    <main>
      <Breadcrumb items={breadcrumbItems} homeHref={homeHref} />
      {BackOfficeTravelAgencyPage.layout.map((layout, index) => {
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
                ctaImageSrc={layout.ctaImageSrc ? t(layout.ctaImageSrc) : ''}
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
          default:
            return null;
        }
      })}
    </main>
  );
}
