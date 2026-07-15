import { getTranslations, setRequestLocale } from 'next-intl/server';
import { TourOnlinePageData } from './data';
import PageHero from '../../components/shared/page-hero/page-hero';
import TextSectionComp from '../../components/shared/text-section-comp/text-section-comp';
import PlanningDemoSection from '../../components/home/demo-section/planning-demo-section';
import { getCountryOptions } from '@/app/lib/countries';
import { routeToMessageLocale } from '@/app/[locale]/locale-config';
import { getAlternates } from '@/app/lib/SEO/getAlternates';
import { Metadata } from 'next';
import { Locale } from 'next-intl';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.about-us' });

  return {
    title: t('the-company.title'),
    description: t('the-company.description'),
    alternates: getAlternates(
      {
        en: '/about-us/travelworks',
        'en-ca': '/en-ca/about-us/travelworks',
        'en-au': '/en-au/about-us/travelworks',
        'fr-ca': '/fr-ca/a-propos/pcvoyages',
      },
      locale,
    ),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { locale: routeLocale } = await params;
  const t = await getTranslations('pages.about-us.the-company');
  const messageLocale = routeToMessageLocale[routeLocale] ?? 'en-us';
  const countries = getCountryOptions(messageLocale);

  return (
    <main>
      {TourOnlinePageData.layout.map((layout, index) => {
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
          case 'TextSection':
            return (
              <TextSectionComp
                key={index}
                {...layout}
                description={
                  layout.description
                    ? t.rich(layout.description as string, {
                        p: (chunks) => <p className="my-5">{chunks}</p>,
                        strong: (chunks) => <strong>{chunks}</strong>,
                      })
                    : ''
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
                      fields: layout.form.fields.map((field) => ({
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
