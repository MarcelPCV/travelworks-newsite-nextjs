import { getTranslations, setRequestLocale } from 'next-intl/server';
import { TourOnlinePageData } from './data';
import PageHero from '../../components/shared/page-hero/page-hero';
import TextSectionComp from '../../components/shared/text-section-comp/text-section-comp';
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
  const t = await getTranslations({ locale, namespace: 'metadata.about-us' });

  return {
    title: t('careers.title'),
    description: t('careers.description'),
    alternates: getAlternates(
      {
        en: '/about-us/careers',
        'en-ca': '/en-ca/about-us/careers',
        'en-au': '/en-au/about-us/careers',
        'fr-ca': '/fr-ca/a-propos/carrieres',
      },
      locale,
    ),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.about-us.careers');
  const homeHref = locale === 'en' ? '/' : `/${locale}`;
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: t('breadcrumb.about-us-label'), href: t('breadcrumb.about-us-link') },
    { label: t('breadcrumb.careers-label'), href: '#' },
  ];

  return (
    <main>
      <Breadcrumb items={breadcrumbItems} homeHref={homeHref} />
      {TourOnlinePageData.layout.map((layout, index) => {
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
          case 'TextSection':
            return (
              <TextSectionComp
                key={index}
                {...layout}
                description={
                  layout.description
                    ? t.rich(layout.description as string, {
                        p: (chunks: React.ReactNode) => <p className="my-5">{chunks}</p>,
                        strong: (chunks: React.ReactNode) => <strong>{chunks}</strong>,
                        a: (chunks: React.ReactNode) => (
                          <a href="mailto:career@travelworkssolution.com">{chunks}</a>
                        ),
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
