import { getTranslations } from 'next-intl/server';
import PartnersSection from './components/partners-section';
import { PartnersSectionModel } from './components/types';
import { getAlternates } from '@/app/lib/SEO/getAlternates';
import { Breadcrumb } from '@/app/[locale]/components/news/breadcrumb';
import type { BreadcrumbItem } from '@/app/[locale]/news/types';
import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { Locale } from 'next-intl';
import TitleHero from '../../components/shared/title-hero/title-hero';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.about-us' });

  return {
    title: t('partners.title'),
    description: t('partners.description'),
    alternates: getAlternates(
      {
        en: '/about-us/partners',
        'en-ca': '/en-ca/about-us/partners',
        'en-au': '/en-au/about-us/partners',
        'fr-ca': '/fr-ca/a-propos/partenaires',
      },
      locale,
    ),
  };
}

const partnerSections: PartnersSectionModel[] = [
  {
    title: 'Travel Industry Associations',
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

  {
    title: 'Insurance Companies',
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
    title: 'GDS',
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
    title: 'Booking Tools',
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
    title: 'Online Payment Solution',
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
    title: 'Other Partners',
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
    title: 'Tourism Schools',
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
];

export default async function PartnersPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.about-us.partners');

  const homeHref = locale === 'en' ? '/' : `/${locale}`;
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: t('breadcrumb.about-us-label'), href: t('breadcrumb.about-us-link') },
    { label: t('breadcrumb.about-us-partners-label'), href: '#' },
  ];

  return (
    <main className="bg-gray-50">
      <Breadcrumb items={breadcrumbItems} homeHref={homeHref} />
      <TitleHero title={t('title-hero.title')} />
      <div className="mx-auto">
        {partnerSections.map((section, idx) => (
          <PartnersSection
            key={section.title}
            {...section}
            bgClass={idx % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'}
          />
        ))}
      </div>
    </main>
  );
}
