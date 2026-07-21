import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getCountryOptions } from '@/app/lib/countries';
import ContactPageContent from '@/app/[locale]/about-us/contact/components/contact-page-content';
import { routeToMessageLocale } from '@/app/[locale]/locale-config';
import { getAlternates } from '@/app/lib/SEO/getAlternates';
import { Metadata } from 'next';
import { Locale } from 'next-intl';
import { Breadcrumb } from '@/app/[locale]/components/news/breadcrumb';
import type { BreadcrumbItem } from '@/app/[locale]/news/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.about-us' });

  return {
    title: t('contact.title'),
    description: t('contact.description'),
    alternates: getAlternates(
      {
        en: '/about-us/contact',
        'en-ca': '/en-ca/about-us/contact',
        'en-au': '/en-au/about-us/contact',
        'fr-ca': '/fr-ca/a-propos/contact',
      },
      locale,
    ),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale: routeLocale, locale } = await params;
  setRequestLocale(routeLocale);
  const t = await getTranslations('pages.about-us.contact');

  const homeHref = locale === 'en' ? '/' : `/${locale}`;
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: t('breadcrumb.about-us-label'), href: t('breadcrumb.about-us-link') },
    { label: t('breadcrumb.contact-label'), href: '#' },
  ];

  const messageLocale = routeToMessageLocale[routeLocale] ?? 'en-us';
  const countries = getCountryOptions(messageLocale);

  return (
    <main>
      <Breadcrumb items={breadcrumbItems} homeHref={homeHref} />
      <ContactPageContent countries={countries} locale={messageLocale} />
    </main>
  );
}
