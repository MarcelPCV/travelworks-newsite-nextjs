import { getTranslations } from 'next-intl/server';
import PartnersSection from './components/partners-section';
import { IntegrationSectionId, PartnersSectionModel, SectionAnchorItem } from './components/types';
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: routeToMessageLocale[locale] ?? 'en-us', namespace: 'metadata.integrations' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: getAlternates(
      {
        en: '/integrations',
        'en-ca': '/en-ca/integrations',
        'en-au': '/en-au/integrations',
        'fr': '/fr/integrations',
      },
      locale,
    ),
  };
}

const partnerSectionsBase: Array<
  Omit<PartnersSectionModel, 'title'> & { titleKey: `section-labels.${IntegrationSectionId}` }
> = [
  {
    id: 'gds',
    titleKey: 'section-labels.gds',
    partners: [
      {
        name: 'Amadeus',
        logo: '/images/pages/about-us/partners/amadeus.webp',
      },
      {
        name: 'Sabre',
        logo: '/images/pages/about-us/partners/sabre-1.webp',
      },
      {
        name: 'Travelport Galileo',
        logo: '/images/pages/about-us/partners/travelport-galilleo.webp',
      },
    ],
  },
  {
    id: 'booking-tools',
    titleKey: 'section-labels.booking-tools',
    partners: [
      {
        name: 'Expedia TAAP',
        logo: '/images/pages/about-us/partners/expedia-taap2.webp',
      },
      {
        name: 'WooCommerce',
        logo: '/images/pages/about-us/partners/woocommerce.webp',
      },
      {
        name: 'Revelex',
        logo: '/images/pages/about-us/partners/revelex.webp',
      },
      {
        name: 'Vibe',
        logo: '/images/pages/about-us/partners/vibe.webp',
      },
      {
        name: 'TravelBrands',
        logo: '/images/pages/about-us/partners/travelbrands.webp',
      },
      {
        name: 'AGW',
        logo: '/images/pages/about-us/partners/agw.webp',
      },
      {
        name: 'Aeronology',
        logo: '/images/pages/about-us/partners/Aeronology.webp',
      },
      {
        name: 'Flight Network',
        logo: '/images/pages/about-us/partners/flight-network.webp',
      },
      {
        name: 'Bonotel',
        logo: '/images/pages/about-us/partners/bonotel.webp',
      },
      {
        name: 'Travolutionary',
        logo: '/images/pages/about-us/partners/travolutionary.webp',
      },
      {
        name: 'Softvoyage',
        logo: '/images/pages/about-us/partners/softvoyage.webp',
      },
      {
        name: 'Sirev',
        logo: '/images/pages/about-us/partners/sirev.webp',
      },
      {
        name: 'Express Travel Group',
        logo: '/images/pages/about-us/partners/expressTravelGroup.webp',
      },
    ],
  },
  {
    id: 'online-payment-solution',
    titleKey: 'section-labels.online-payment-solution',
    partners: [
      {
        name: 'Clover',
        logo: '/images/pages/about-us/partners/clover.webp',
      },
      {
        name: 'Nuvei',
        logo: '/images/pages/about-us/partners/nuvei.webp',
      },
      {
        name: 'Revolut',
        logo: '/images/pages/about-us/partners/Revolut.webp',
      },
      {
        name: 'TravelPay',
        logo: '/images/pages/about-us/partners/travelpay.webp',
      },
      {
        name: 'Global Payments',
        logo: '/images/pages/about-us/partners/GlobalPayments.webp',
      },
      {
        name: 'Payline',
        logo: '/images/pages/about-us/partners/PayLine.webp',
      },
      {
        name: 'Exact Payments',
        logo: '/images/pages/about-us/partners/Exact.webp',
      },
      {
        name: 'Square',
        logo: '/images/pages/about-us/partners/Square.webp',
      },
      {
        name: 'Bambora',
        logo: '/images/pages/about-us/partners/Bambora.webp',
      },
      {
        name: 'First Data',
        logo: '/images/pages/about-us/partners/first-data.webp',
      },
      {
        name: 'Stripe',
        logo: '/images/pages/about-us/partners/stripe.webp',
      },
      {
        name: 'Elavon',
        logo: '/images/pages/about-us/partners/elavon.webp',
      },
      {
        name: 'PsiGate',
        logo: '/images/pages/about-us/partners/psigate.webp',
      },
      {
        name: 'Moneris',
        logo: '/images/pages/about-us/partners/moneris.webp',
      },
      {
        name: 'Chase',
        logo: '/images/pages/about-us/partners/chase.webp',
      },
      {
        name: 'PayPal',
        logo: '/images/pages/about-us/partners/paypal.webp',
      },
      {
        name: 'Helcim',
        logo: '/images/pages/about-us/partners/helcim.webp',
      },
    ],
  },
  {
    id: 'insurance-companies',
    titleKey: 'section-labels.insurance-companies',
    partners: [
      {
        name: 'Manulife',
        logo: '/images/pages/about-us/partners/manuviegif.webp',
      },
      {
        name: 'TIPS',
        logo: '/images/pages/about-us/partners/tips.webp',
      },
      {
        name: 'Croix Bleue',
        logo: '/images/pages/about-us/partners/Croix-bleue.webp',
      },
      {
        name: 'RBC Insurance',
        logo: '/images/pages/about-us/partners/rbc.webp',
      },
    ],
  },
  {
    id: 'other-partners',
    titleKey: 'section-labels.other-partners',
    partners: [
      {
        name: 'SignatureAPI',
        logo: '/images/pages/about-us/partners/signatureApi.webp',
      },
      {
        name: 'InputKit',
        logo: '/images/pages/about-us/partners/inputkit.webp',
      },
      {
        name: 'Umapped',
        logo: '/images/pages/about-us/partners/umappedl.webp',
      },
      {
        name: 'Portway Systems',
        logo: '/images/pages/about-us/partners/portway.webp',
      },
      {
        name: 'Black Sheep Tourism',
        logo: '/images/pages/about-us/partners/blacksheepl.webp',
      },
      {
        name: 'PRISM',
        logo: '/images/pages/about-us/partners/Prism.webp',
      },
      {
        name: 'TripStax',
        logo: '/images/pages/about-us/partners/tripStax.webp',
      },
      {
        name: 'mTrip',
        logo: '/images/pages/about-us/partners/mtrip.webp',
      },
      {
        name: 'Zendesk',
        logo: '/images/pages/about-us/partners/Zendesk.webp',
      },
    ],
  },

  {
    id: 'tourism-schools',
    titleKey: 'section-labels.tourism-schools',
    partners: [
      {
        name: 'École Hôtelière de la Capitale',
        logo: '/images/pages/about-us/partners/ecole-capitale.webp',
      },
      {
        name: 'École des Métiers de la Restauration',
        logo: '/images/pages/about-us/partners/restauration-tourisme.webp',
      },
      {
        name: 'Cégep de Rivière-du-Loup',
        logo: '/images/pages/about-us/partners/riviere-du-loup.webp',
      },
      {
        name: 'Cegep St-Félicien',
        logo: '/images/pages/about-us/partners/st-felicien.webp',
      },
      {
        name: 'Collège Laflèche',
        logo: '/images/pages/about-us/partners/La-fleche.webp',
      },
      {
        name: 'Collège Mérici',
        logo: '/images/pages/about-us/partners/merici.webp',
      },
      {
        name: 'Collège Sigma',
        logo: '/images/pages/about-us/partners/sigma.webp',
      },
      {
        name: 'LaSalle College',
        logo: '/images/pages/about-us/partners/LaSalle.webp',
      },
      {
        name: 'Collège Montmorency',
        logo: '/images/pages/about-us/partners/montmorency.webp',
      },
      {
        name: 'Collège April-Fortier',
        logo: '/images/pages/about-us/partners/april-fortier.webp',
      },
      {
        name: 'École de voyage de Lanaudière',
        logo: '/images/pages/about-us/partners/lanaudiere.webp',
      },
    ],
  },
  {
    id: 'travel-industry-associations',
    titleKey: 'section-labels.travel-industry-associations',
    partners: [
      {
        name: 'ARF Québec',
        logo: '/images/pages/about-us/partners/ARF-Quebec.webp',
      },
      {
        name: 'ACTA',
        logo: '/images/pages/about-us/partners/acta.webp',
      },
      {
        name: 'GBTA',
        logo: '/images/pages/about-us/partners/gbta.webp',
      },
      {
        name: 'ASTA',
        logo: '/images/pages/about-us/partners/asta.webp',
      },
    ],
  },
];

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
        title={locale === "fr" ? "Intégrations" : "Integrations"} 
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
