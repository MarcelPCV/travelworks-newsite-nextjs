import { getTranslations, setRequestLocale } from 'next-intl/server';
import { BackOfficeTravelAgencyPage } from './data';
import PageHero from '../../../components/shared/page-hero/page-hero';
import SplitSection from '../../../components/shared/SplitSection/SplitSection';
import FeaturesHighlightsSection from '../../../components/features/features-highlights-section';
import FeaturesMasonrySection from '../../../components/shared/features-masonry-section/features-masonry-section';
import { FeatureMasonryCard } from '../../../components/shared/features-masonry-section/type';
import YoutubeVideoSection from '../../../components/shared/video/youtube-video-section';
import { FeaturesCardsHighlights } from '../../../components/features/type';
import { getAlternates } from '@/app/lib/SEO/getAlternates';
import { Metadata } from 'next';
import { Locale } from 'next-intl';
import { BreadcrumbItem } from '../../news/types';
import { Breadcrumb } from '../../news/components/breadcrumb';
import PlanningDemoSection from '../../(home)/components/demo-section/planning-demo-section';
import { PlanningDemoField } from '../../(home)/components/demo-section/type';
import { getCountryOptions } from '@/app/lib/countries';
import { routeToMessageLocale } from '@/app/[locale]/locale-config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.travel-agency-software' });

  return {
    title: `${t('back-office-travel-agency.title')}`,
    description: t('back-office-travel-agency.description'),
    keywords: t('back-office-travel-agency.keywords'),
    alternates: getAlternates(
      {
        en: '/travel-agency-software/back-office-travel-agency',
        'en-ca': '/en-ca/travel-agency-software/back-office-travel-agency',
        'en-au': '/en-au/travel-agency-software/back-office-travel-agency',
        'fr-ca': '/fr-ca/logiciel-agence-voyage/back-office-agence-de-voyage',
      },
      locale,
    ),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.travel-agency-software.back-office-travel-agency');
  const { locale: routeLocale } = await params;
  setRequestLocale(routeLocale);
  const messageLocale = routeToMessageLocale[routeLocale] ?? 'en-us';
  const countries = getCountryOptions(messageLocale);

  const homeHref = locale === 'en' ? '/' : `/${locale}`;
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: t('breadcrumb.about-us-label'), href: t('breadcrumb.about-us-link') },
    { label: t('breadcrumb.back-office-label'), href: '#' },
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
                title={typeof layout.title === 'string' ? t(layout.title) : (layout.title ?? '')}
                description={
                  typeof layout.description === 'string'
                    ? t(layout.description)
                    : (layout.description ?? '')
                }
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
                heading={
                  typeof layout.heading === 'string'
                    ? t.rich(layout.heading, {
                        strong: (chunks) => (
                          <div className="font-semibold text-brand-blue">{chunks}</div>
                        ),
                      })
                    : ''
                }
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
              topLinkHref: card.topLinkHref ? t(card.topLinkHref) : undefined,
              items: card.items.map((item) => t(item)),
              ctaLabel: card.ctaLabel ? t(card.ctaLabel) : undefined,
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
                heading={typeof layout.heading === 'string' ? t(layout.heading) : ''}
                videoId={typeof layout.videoId === 'string' ? t(layout.videoId) : ''}
                channelLabel={typeof layout.channelLabel === 'string' ? t(layout.channelLabel) : ''}
                description={
                  typeof layout.description === 'string'
                    ? t(layout.description)
                    : (layout.description ?? '')
                }
              />
            );
          case 'PlanningDemoSection':
            return (
              <div key={index} className="flex w-full flex-col gap-4 py-2">
                <PlanningDemoSection
                  countries={countries}
                  locale={messageLocale}
                  model={{
                    ...layout,
                    heading: t(layout.heading),
                    image: {
                      ...layout.image,
                      placeholderLabel: t(layout.image.placeholderLabel),
                    },
                    form: {
                      ...layout.form,
                      fields: layout.form.fields.map((field: PlanningDemoField) => ({
                        ...field,
                        label: t(field.label),
                        placeholder: field.placeholder ? t(field.placeholder) : undefined,
                      })),
                      country: {
                        ...layout.form.country,
                        label: t(layout.form.country.label),
                        placeholder: t(layout.form.country.placeholder),
                      },
                      submitButton: {
                        ...layout.form.submitButton,
                        label: t(layout.form.submitButton.label),
                      },
                    },
                  }}
                />
              </div>
            );
          default:
            return null;
        }
      })}
    </main>
  );
}
