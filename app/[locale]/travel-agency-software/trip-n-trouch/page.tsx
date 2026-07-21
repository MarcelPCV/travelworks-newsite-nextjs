import { getTranslations, setRequestLocale } from 'next-intl/server';
import { TripNTouchPage } from './data';
import PageHero from '../../components/shared/page-hero/page-hero';
import YoutubeVideoSection from '../../components/shared/video/youtube-video-section';
import { getAlternates } from '@/app/lib/SEO/getAlternates';
import { Metadata } from 'next';
import { Locale } from 'next-intl';
import { Breadcrumb } from '../../components/news/breadcrumb';
import type { BreadcrumbItem } from '@/app/[locale]/(pages)/news/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.travel-agency-software' });

  return {
    title: `${t('trip-n-touch.title')}`,
    description: t('trip-n-touch.description'),
    alternates: getAlternates(
      {
        en: '/travel-agency-software/trip-n-touch',
        'en-ca': '/en-ca/travel-agency-software/trip-n-touch',
        'en-au': '/en-au/travel-agency-software/trip-n-touch',
        'fr-ca': '/fr-ca/logiciel-agence-voyage/trip-n-touch',
      },
      locale,
    ),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.travel-agency-software.trip-n-touch');

  const homeHref = locale === 'en' ? '/' : `/${locale}`;
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: t('breadcrumb.features-label'), href: t('breadcrumb.features-link') },
    { label: t('breadcrumb.trip-n-touch-label'), href: '#' },
  ];

  return (
    <main>
      <Breadcrumb items={breadcrumbItems} homeHref={homeHref} />
      {TripNTouchPage.layout.map((layout, index) => {
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
            case 'YoutubeVideo':
              return (
                <YoutubeVideoSection
                  key={index}
                  {...layout}
                  heading={
                    layout.heading
                      ? t.rich(layout.heading as string, {
                          strong: (chunks) => (
                            <strong className="font-semibold text-brand-blue">{chunks}</strong>
                          ),
                        })
                      : ''
                  }
                  videoId={layout.videoId ? t(layout.videoId) : ''}
                  channelLabel={layout.channelLabel ? t(layout.channelLabel) : ''}
                  description={
                    layout.description
                      ? t.rich(layout.description as string, {
                          strong: (chunks) => (
                            <strong className="font-semibold text-brand-blue">{chunks}</strong>
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
