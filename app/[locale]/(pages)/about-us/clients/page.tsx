import ClientsHero from '@/app/[locale]/(pages)/about-us/clients/components/clients-hero/clients-hero';
import ClientsLogoMarquee from '@/app/[locale]/(pages)/about-us/clients/components/clients-logo-marquee/clients-logo-marquee';
import TestimonialsGrid from '@/app/[locale]/(pages)/about-us/clients/components/testimonial-grid/testimonial-grid';
import VideoTestimonials from '@/app/[locale]/(pages)/about-us/clients/components/video-testimonials/video-testimonials';
import { getAlternates } from '@/app/lib/SEO/getAlternates';
import { Metadata } from 'next';
import { Locale } from 'next-intl';
import { routeToMessageLocale } from '@/app/[locale]/locale-config';
import { getTranslations } from 'next-intl/server';
import { Breadcrumb } from '@/app/[locale]/(pages)/news/components/breadcrumb';
import type { BreadcrumbItem } from '@/app/[locale]/(pages)/news/types';
import { getClientsPageData } from './data/index';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: routeToMessageLocale[locale] ?? 'en-us', namespace: 'metadata.about-us' });

  return {
    title: `${t('clients.title')}`,
    description: t('clients.description'),
    keywords: t('clients.keywords'),
    alternates: getAlternates(
      {
        en: '/about-us/clients',
        'en-ca': '/en-ca/about-us/clients',
        'en-au': '/en-au/about-us/clients',
        'fr': '/fr/a-propos/clients',
      },
      locale,
    ),
  };
}

export default async function ClientsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const homeHref = locale === 'en' ? '/' : `/${locale}`;
  const t = await getTranslations('pages.about-us.clients');
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: t('breadcrumb.about-us-label'), href: t('breadcrumb.about-us-link') },
    { label: t('breadcrumb.clients-label'), href: '#' },
  ];
  const clientsPageData = getClientsPageData(locale);
  return (
    <>
      <Breadcrumb items={breadcrumbItems} homeHref={homeHref} />

      <ClientsHero title={clientsPageData.hero.title} subtitle={clientsPageData.hero.subtitle} />

      <ClientsLogoMarquee clients={clientsPageData.clients} />

      <TestimonialsGrid testimonials={clientsPageData.testimonials} />

      <VideoTestimonials videos={clientsPageData.videos} />
    </>
  );
}
