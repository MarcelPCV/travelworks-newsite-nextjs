import { getTranslations, setRequestLocale } from 'next-intl/server';
import { TourOnlinePageData } from './data';
import TextSectionComp from '@/app/[locale]/components/shared/text-section-comp/text-section-comp';
import { routeToMessageLocale } from '@/app/[locale]/locale-config';
import { getAlternates } from '@/app/lib/SEO/getAlternates';
import { Metadata } from 'next';
import { Locale } from 'next-intl';
import { Breadcrumb } from '@/app/[locale]/(pages)/news/components/breadcrumb';
import type { BreadcrumbItem } from '@/app/[locale]/(pages)/news/types';
import { MailCheck } from 'lucide-react';

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
        en: '/about-us/travelworks',
        'en-ca': '/en-ca/about-us/travelworks',
        'en-au': '/en-au/about-us/travelworks',
        fr: '/fr/a-propos/pcvoyages',
      },
      locale,
    ),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.thank-you');
  const homeHref = locale === 'en' ? '/' : `/${locale}`;
  const breadcrumbItems: BreadcrumbItem[] = [{ label: t('breadcrumb.thank-you-label'), href: '#' }];

  return (
    <main>
      <Breadcrumb items={breadcrumbItems} homeHref={homeHref} />
      <div className="flex justify-center items-center mt-10">
        <div className="flex items-center justify-center bg-white rounded-full p-5 shadow-md border-b-2 border-orange-400">
          <MailCheck className="mx-auto h-20 w-20 text-orange-400" />
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
      <hr className="border-t-2 border-zinc-200" />
    </main>
  );
}
