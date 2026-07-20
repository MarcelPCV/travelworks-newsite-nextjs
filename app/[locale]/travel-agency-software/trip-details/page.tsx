import { getTranslations, setRequestLocale } from 'next-intl/server';
import { IntegrationsPageData } from './data';
import PageHero from '../../components/shared/page-hero/page-hero';
import ImageBlock from '../../components/shared/image-block/image-block';
import RichTextSection from '../../components/shared/text-section-comp/text-section-comp';
import ShareItems from '../../components/trip-details/share-items/share-items';
import { getAlternates } from '@/app/lib/SEO/getAlternates';
import { Metadata } from 'next';
import { Locale } from 'next-intl';
import { Breadcrumb } from '../../components/news/breadcrumb';
import type { BreadcrumbItem } from '@/app/[locale]/news/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.travel-agency-software' });

  return {
    title: `${t('trip-details.title')}`,
    description: t('trip-details.description'),
    alternates: getAlternates(
      {
        en: '/travel-agency-software/trip-details',
        'en-ca': '/en-ca/travel-agency-software/trip-details',
        'en-au': '/en-au/travel-agency-software/trip-details',
        'fr-ca': '/fr-ca/logiciel-agence-voyage/details-du-voyage',
      },
      locale,
    ),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.travel-agency-software.trip-details');

  const homeHref = locale === 'en' ? '/' : `/${locale}`;
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: t('breadcrumb.features-label'), href: t('breadcrumb.features-link') },
    { label: t('breadcrumb.trip-details-label'), href: '#' },
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
              <RichTextSection
                key={index}
                {...layout}
                title={
                  layout.title
                    ? t.rich(layout.title as string, {
                        strong: (chunks) => <strong>{chunks}</strong>,
                      })
                    : ''
                }
                description={
                  layout.description
                    ? t.rich(layout.description as string, {
                        strong: (chunks) => <strong>{chunks}</strong>,
                      })
                    : ''
                }
              />
            );
          case 'ShareItems':
            const translatedItems = layout.items?.map((item) => ({
              ...item,
              title: t(item.title),
            }));
            return <ShareItems key={index} {...layout} items={translatedItems} />;
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
                ctaLabel={layout.ctaLabel ? t(layout.ctaLabel) : ''}
                ctaLink={layout.ctaLink ? t(layout.ctaLink) : ''}
                backgroundColor={layout.backgroundColor}
              />
            );
          default:
            return null;
        }
      })}
    </main>
  );
}
