import { getTranslations, setRequestLocale } from 'next-intl/server';
import { IntegrationsPageData } from './data';
import PageHero from '../../components/shared/page-hero/page-hero';
import ImageBlock from '../../components/shared/image-block/image-block';
import ImageHappyLearning from '../../components/pages-elements/happy-learning/happy-learning';
import ComparisonCard from '../../components/shared/comparison-training/comparison-training';
import ExpertProfile from '../../components/shared/training-experts/training-experts';
import InfoCards from '../../components/pages-elements/info-cards/info-cards';
import { getAlternates } from '@/app/lib/SEO/getAlternates';
import { Metadata } from 'next';
import { Locale } from 'next-intl';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.training' });

  return {
    title: `${t('training-platform.title')}`,
    description: t('training-platform.description'),
    alternates: getAlternates(
      {
        en: '/training/training-platform',
        'en-ca': '/en-ca/training/training-platform',
        'en-au': '/en-au/training/training-platform',
        'fr-ca': '/fr-ca/formation/plateforme-de-formation',
      },
      locale,
    ),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.training.training-platform');

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
                        strong: (chunks) => <strong className="text-blue-800">{chunks}</strong>,
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
          case 'InfoCards': {
            const translatedCards = layout.cards.map((card) => ({
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
          default:
            return null;
        }
      })}
    </main>
  );
}
