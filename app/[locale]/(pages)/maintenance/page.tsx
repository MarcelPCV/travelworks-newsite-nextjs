import { getTranslations, setRequestLocale } from 'next-intl/server';
import { TourOnlinePageData } from './data';
import PageHero from '@/app/[locale]/components/shared/page-hero/page-hero';
import TextSectionComp from '@/app/[locale]/components/shared/text-section-comp/text-section-comp';
import { routeToMessageLocale } from '@/app/[locale]/locale-config';
import { getAlternates } from '@/app/lib/SEO/getAlternates';
import { Metadata } from 'next';
import { Locale } from 'next-intl';
import { Breadcrumb } from '@/app/[locale]/(pages)/news/components/breadcrumb';
import type { BreadcrumbItem } from '@/app/[locale]/(pages)/news/types';
import { Cog } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale: routeToMessageLocale[locale] ?? 'en-us',
    namespace: 'metadata.about-us',
  });

  return {
    title: t('the-company.title'),
    description: t('the-company.description'),
    keywords: t('the-company.keywords'),
    alternates: getAlternates(
      {
        en: '/maintenance',
        'en-au': '/en-au/maintenance',
        fr: '/fr/maintenance',
      },
      locale,
    ),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.maintenance');
  const homeHref = locale === 'en' ? '/' : `/${locale}`;
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: t('breadcrumb.maintenance-label'), href: '#' },
  ];

  return (
    <main>
      <Breadcrumb items={breadcrumbItems} homeHref={homeHref} />
      <div className="flex justify-center items-center mt-10">
        <div className="flex items-center justify-center bg-white rounded-full p-5 shadow-md border-b-2 border-orange-400">
          <Cog className="mx-auto h-20 w-20 text-orange-400" />
        </div>
      </div>
      {TourOnlinePageData.layout.map((layout, index) => {
        switch (layout.blockType) {
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
          default:
            return null;
        }
      })}
    </main>
  );
}
