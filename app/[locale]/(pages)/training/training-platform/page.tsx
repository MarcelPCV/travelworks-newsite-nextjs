import { getTranslations, setRequestLocale } from 'next-intl/server';
import { IntegrationsPageData } from './data';
import PageHero from '@/app/[locale]/components/shared/page-hero/page-hero';
import ImageBlock from '@/app/[locale]/components/shared/image-block/image-block';
import ImageHappyLearning from '@/app/[locale]/components/pages-elements/happy-learning/happy-learning';
import ComparisonCard from '@/app/[locale]/components/shared/comparison-training/comparison-training';
import ExpertProfile from '@/app/[locale]/components/shared/training-experts/training-experts';
import InfoCards from '@/app/[locale]/components/pages-elements/info-cards/info-cards';
import { getAlternates } from '@/app/lib/SEO/getAlternates';
import { Metadata } from 'next';
import { Locale } from 'next-intl';
import { Breadcrumb } from '@/app/[locale]/(pages)/news/components/breadcrumb';
import type { BreadcrumbItem } from '@/app/[locale]/(pages)/news/types';
import { InfoCard } from '@/app/[locale]/components/pages-elements/info-cards/type';
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
  const t = await getTranslations({
    locale: routeToMessageLocale[locale] ?? 'en-us',
    namespace: 'metadata.training',
  });

  return {
    title: `${t('training-platform.title')}`,
    description: t('training-platform.description'),
    keywords: t('training-platform.keywords'),
    alternates: getAlternates(
      {
        en: '/training/training-platform',
        'en-au': '/en-au/training/training-platform',
        fr: '/fr/formation/plateforme-de-formation',
      },
      locale,
    ),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.training.training-platform');

  const homeHref = locale === 'en' ? '/' : `/${locale}`;
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: t('breadcrumb.training-platform-label'), href: '#' },
  ];

  const { locale: routeLocale } = await params;
  setRequestLocale(routeLocale);
  const messageLocale = routeToMessageLocale[routeLocale] ?? 'en-us';
  const countries = getCountryOptions(messageLocale);

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
                logoWidth={70}
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
                        strong: (chunks) => (
                          <strong className="text-brand-blue font-semibold">{chunks}</strong>
                        ),
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
                backgroundColor="#F5F6F6"
              />
            );
          case 'InfoCards': {
            const translatedCards = layout.cards.map((card: InfoCard) => ({
              ...card,
              title: t(card.title),
              description: t(card.description),
              icon: card.icon,
              cta: card.cta,
              ctaLabel: card.ctaLabel ? t(card.ctaLabel) : undefined,
              ctaLink: card.ctaLink ? t(card.ctaLink) : undefined,
            }));
            return <InfoCards key={index} {...layout} cards={translatedCards} />;
          }
          case 'ImageHappyLearning':
            return (
              <ImageHappyLearning
                key={index}
                {...layout}
                title={layout.title ? t(layout.title) : ''}
                imageSrc={layout.imageSrc ? t(layout.imageSrc) : ''}
                altText={layout.altText ? t(layout.altText) : ''}
                widthPercentage={layout.widthPercentage}
              />
            );
          case 'ConmparisonTraining':
            const translateFeatures = (features: { title: string; description: string }[]) =>
              features.map((feature) => ({
                title: t(feature.title),
                description: t(feature.description),
              }));

            return (
              <ComparisonCard
                key={index}
                {...layout}
                heading={layout.heading ? t(layout.heading) : ''}
                knowledgeBase={{
                  ...layout.knowledgeBase,
                  title: t(layout.knowledgeBase.title),
                  badge: layout.knowledgeBase.badge ? t(layout.knowledgeBase.badge) : '',
                  features: translateFeatures(layout.knowledgeBase.features),
                }}
                trainingPlatform={{
                  ...layout.trainingPlatform,
                  title: t(layout.trainingPlatform.title),
                  badge: layout.trainingPlatform.badge ? t(layout.trainingPlatform.badge) : '',
                  features: translateFeatures(layout.trainingPlatform.features),
                }}
              />
            );
          case 'ExpertProfile':
            return (
              <ExpertProfile
                key={index}
                {...layout}
                heading={layout.heading ? t(layout.heading) : ''}
                person={{
                  ...layout.person,
                  name: layout.person.name ? t(layout.person.name) : '',
                  role: layout.person.role ? t(layout.person.role) : '',
                  image: {
                    src: layout.person.image.src ? t(layout.person.image.src) : '',
                    alt: layout.person.image.alt ? t(layout.person.image.alt) : '',
                  },
                }}
                quote={layout.quote ? t(layout.quote) : ''}
                bio={
                  layout.bio
                    ? t.rich(layout.bio as string, {
                        p: (chunks) => <p>{chunks}</p>,
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
