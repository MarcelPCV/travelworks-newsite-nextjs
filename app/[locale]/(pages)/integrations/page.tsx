import { getTranslations } from 'next-intl/server';
import PartnersSection from './components/partners-section';
import { PartnersSectionModel, SectionAnchorItem } from './components/types';
import { getAlternates } from '@/app/lib/SEO/getAlternates';
import { Breadcrumb } from '@/app/[locale]/(pages)/news/components/breadcrumb';
import type { BreadcrumbItem } from '@/app/[locale]/(pages)/news/types';
import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { Locale } from 'next-intl';
import { routeToMessageLocale } from '@/app/[locale]/locale-config';
import PageHero from '../../components/shared/page-hero/page-hero';
import { IntegrationsPageData } from './data';
import SectionAnchorMenu from './components/section-anchor-menu';
import TitleHero from '../../components/shared/title-hero/title-hero';
import { partnerSectionsBase } from './data';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale: routeToMessageLocale[locale] ?? 'en-us',
    namespace: 'metadata.integrations',
  });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: getAlternates(
      {
        en: '/integrations',
        'en-au': '/en-au/integrations',
        fr: '/fr/integrations',
      },
      locale,
    ),
  };
}

export default async function PartnersPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.integrations');

  const homeHref = locale === 'en' ? '/' : `/${locale}`;
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: t('breadcrumb.integrations-label'), href: '#' },
  ];

  const partnerSections: PartnersSectionModel[] = partnerSectionsBase.map((section) => ({
    id: section.id,
    title: t(section.titleKey),
    partners: section.partners,
  }));

  const sectionMenuItems: SectionAnchorItem[] = partnerSections.map((section) => ({
    id: section.id,
    label: section.title,
  }));

  return (
    <main className="bg-gray-50">
      <Breadcrumb items={breadcrumbItems} homeHref={homeHref} />
      <TitleHero
        title={locale === 'fr' ? 'Intégrations' : 'Integrations'}
        imageSrc="/images/pages/integrations/integrations.webp"
      />
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
                ctaImageSrc={layout.ctaImageSrc ? t(layout.ctaImageSrc) : ''}
              />
            );
          default:
            return null;
        }
      })}
      <SectionAnchorMenu items={sectionMenuItems} />
      <div className="mx-auto">
        {partnerSections.map((section, idx) => (
          <PartnersSection
            key={section.id}
            {...section}
            bgClass={idx % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'}
          />
        ))}
      </div>
    </main>
  );
}
