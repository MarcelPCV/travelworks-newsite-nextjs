import { getTranslations, setRequestLocale } from 'next-intl/server';
import { IntegrationsPageData } from './data';
import PageHero from '../../../components/shared/page-hero/page-hero';
import { FeaturesCardsHighlights } from '../../../components/features/type';
import FeaturesHighlightsSection from '../../../components/features/features-highlights-section';
import ImageBlock from '../../../components/shared/image-block/image-block';
import { getAlternates } from '@/app/lib/SEO/getAlternates';
import { Metadata } from 'next';
import { Locale } from 'next-intl';
import { Breadcrumb } from '../../news/components/breadcrumb';
import type { BreadcrumbItem } from '@/app/[locale]/(pages)/news/types';
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
    title: `${t('integrations.title')}`,
    description: t('integrations.description'),
    alternates: getAlternates(
      {
        en: '/travel-agency-software/integrations',
        'en-ca': '/en-ca/travel-agency-software/integrations',
        'en-au': '/en-au/travel-agency-software/integrations',
        'fr-ca': '/fr-ca/logiciel-agence-voyage/integrations',
      },
      locale,
    ),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.travel-agency-software.integrations');

  const { locale: routeLocale } = await params;
  setRequestLocale(routeLocale);
  const messageLocale = routeToMessageLocale[routeLocale] ?? 'en-us';
  const countries = getCountryOptions(messageLocale);

  const homeHref = locale === 'en' ? '/' : `/${locale}`;
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: t('breadcrumb.features-label'), href: t('breadcrumb.features-link') },
    { label: t('breadcrumb.integrations-label'), href: '#' },
  ];

  return (
    <main>
      <Breadcrumb items={breadcrumbItems} homeHref={homeHref} />
      {IntegrationsPageData.layout.map((layout, index) => {
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
                maxWidth={layout.maxWidth}
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
