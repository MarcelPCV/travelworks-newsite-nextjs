import { PageHeroModel } from '@/app/[locale]/components/shared/page-hero/type';
import { IntegrationSectionId, PartnersSectionModel, SectionAnchorItem } from './components/types';

export type Layout = PageHeroModel;

export type Page = {
  slug: string;
  layout: Layout[];
};

export const partnerSectionsBase: Array<
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
        name: 'FISERV - AIBMS',
        logo: '/images/pages/about-us/partners/FISERV-AIBMS.webp',
      },
      {
        name: 'PaySafe - NetBanx',
        logo: '/images/pages/about-us/partners/paysafe-netbanx.webp',
      },
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
        name: 'travelgenix',
        logo: '/images/pages/about-us/partners/travelgenix.webp',
      },
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

export const IntegrationsPageData: Page = {
  slug: 'travel-agency-software/multiple-integration',
  layout: [
    {
      blockType: 'PageHero',
      title: 'block-type-page-hero.title',
      description: 'block-type-page-hero.description',
      mobileTopImageSrc: 'block-type-page-hero.mobileTopImageSrc',
      desktopMainImageSrc: 'block-type-page-hero.desktopMainImageSrc',
      logoImageSrc: 'block-type-page-hero.logoImageSrc',
      ctaImageSrc: 'block-type-page-hero.ctaImageSrc',
    },
  ],
};
