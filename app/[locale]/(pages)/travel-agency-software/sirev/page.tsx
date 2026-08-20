import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CustomizationsPage } from './data';
import PageHero from '../../../components/shared/page-hero/page-hero';
import SplitSection from '../../../components/shared/SplitSection/SplitSection';
import { getAlternates } from '@/app/lib/SEO/getAlternates';
import { Metadata } from 'next';
import { Locale } from 'next-intl';
import { Breadcrumb } from '../../news/components/breadcrumb';
import type { BreadcrumbItem } from '@/app/[locale]/(pages)/news/types';
import { PlanningDemoField } from '../../(home)/components/demo-section/type';
import PlanningDemoSection from '../../(home)/components/demo-section/planning-demo-section';
import { getCountryOptions } from '@/app/lib/countries';
import { routeToMessageLocale } from '@/app/[locale]/locale-config';
import { FeaturesCardsHighlights } from '@/app/[locale]/components/features/type';
import FeaturesHighlightsSection from '@/app/[locale]/components/features/features-highlights-section';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale: routeToMessageLocale[locale] ?? 'en-us',
    namespace: 'metadata.travel-agency-software',
  });

  return {
    title: `${t('sirev.title')}`,
    description: t('sirev.description'),
    keywords: t('sirev.keywords'),
    alternates: getAlternates(
      {
        en: '/travel-agency-software/crm-tools',
        'en-ca': '/en-ca/travel-agency-software/crm-tools',
        'en-au': '/en-au/travel-agency-software/crm-tools',
        fr: '/fr/logiciel-agence-voyage/outils-crm',
      },
      locale,
    ),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.travel-agency-software.sirev');

  const { locale: routeLocale } = await params;
  setRequestLocale(routeLocale);
  const messageLocale = routeToMessageLocale[routeLocale] ?? 'en-us';
  const countries = getCountryOptions(messageLocale);

  const homeHref = locale === 'en' ? '/' : `/${locale}`;
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: t('breadcrumb.features-label'), href: t('breadcrumb.features-link') },
    { label: t('breadcrumb.crm-label'), href: '#' },
  ];

  return (
    <main>
      <Breadcrumb items={breadcrumbItems} homeHref={homeHref} />
      {CustomizationsPage.layout.map((layout, index) => {
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
                logoWidth={120}
                ctaImageSrc={layout.ctaImageSrc ? t(layout.ctaImageSrc) : ''}
              />
            );
          case 'SplitSection':
            return (
              <SplitSection
                key={index}
                {...layout}
                heading={
                  typeof layout.heading === 'string' ? t(layout.heading) : (layout.heading ?? '')
                }
                description={
                  layout.description
                    ? t.rich(layout.description as string, {
                        strong: (chunks) => (
                          <strong className="text-semibold text-brand-blue">{chunks}</strong>
                        ),
                      })
                    : ''
                }
                imageSrc={layout.imageSrc ? t(layout.imageSrc) : ''}
                imageAlt={layout.imageAlt ? t(layout.imageAlt) : ''}
                ctaLabel={layout.ctaLabel ? t(layout.ctaLabel) : ''}
                ctaLink={layout.ctaLink ? t(layout.ctaLink) : ''}
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
