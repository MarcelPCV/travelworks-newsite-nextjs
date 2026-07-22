import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import FeatureSection from './components/section';
import { sections } from './data';
import { getAlternates } from '@/app/lib/SEO/getAlternates';
import { Metadata } from 'next';
import { Locale } from 'next-intl';
import { Breadcrumb } from '../../../components/news/breadcrumb';
import type { BreadcrumbItem } from '@/app/[locale]/(pages)/news/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'metadata.travel-agency-software',
  });

  return {
    title: `${t('benefits.title')}`,
    description: t('benefits.description'),
    alternates: getAlternates(
      {
        en: '/travel-agency-software/benefits',
        'en-ca': '/en-ca/travel-agency-software/benefits',
        'en-au': '/en-au/travel-agency-software/benefits',
        'fr-ca': '/fr-ca/logiciel-agence-voyage/avantages',
      },
      locale,
    ),
  };
}

export default async function TravelWorksFeatures({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  const homeHref = locale === 'en' ? '/' : `/${locale}`;

  const t = await getTranslations(
    'pages.travel-agency-software.benefits'
  );

  const resolveMessage = (value: string) =>
    t.has(value) ? t(value) : value;

  const breadcrumbItems: BreadcrumbItem[] = [
    {
      label: t('breadcrumb.features-label'),
      href: t('breadcrumb.features-link'),
    },
    {
      label: t('breadcrumb.benefits-label'),
      href: '#',
    },
  ];

  return (
    <div className="relative scroll-smooth">
      <Breadcrumb items={breadcrumbItems} homeHref={homeHref} />

      {/* Hero */}
      <section className="relative h-[250px] overflow-hidden bg-[#005ea8] text-white">
        {/* Background Image */}
        <div className="absolute inset-[-110px] flex justify-center">
          <Image
            src="/images/pages/travel-agency-software/benefits/background.svg"
            alt=""
            width={1200}
            height={1200}
            priority
            className="h-[380px] w-auto object-cover"
          />
        </div>

        {/* Content */}
        <div className="relative mx-auto max-w-7xl px-6 py-16">
          <p className="text-center text-sm uppercase tracking-[4px] opacity-80 uppercase">
            {locale === 'fr-ca'
              ? 'Une solution éprouvée adaptée à'
              : 'A Well-Proven Solution Tailored To'}
          </p>

          <h1 className="mt-2 text-center text-4xl font-bold uppercase">
            {locale === 'fr-ca'
              ? "Logiciel de gestion d'agence de voyage"
              : 'Travel Agency Management'}
          </h1>
        </div>
      </section>

      {/* Section Navigation */}
      <div className="border-b bg-[#004B8E] text-white backdrop-blur lg:sticky lg:top-20 lg:z-30">
        <div className="mx-auto max-w-[1600px] px-6">
          <div className="flex flex-wrap items-center justify-center gap-8 py-4">
            {sections.map((section) => {
              const Icon = section.icon;

              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="group flex flex-col items-center gap-2 transition hover:scale-105"
                >
                  <Icon className="h-7 w-7 text-orange-400" />

                  <span className="text-sm">
                    {resolveMessage(section.title)}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div>
        {sections.map((section, index) => (
          <FeatureSection
            key={section.id}
            {...section}
            reverse={index % 2 !== 0}
            className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
          />
        ))}
      </div>
    </div>
  );
}