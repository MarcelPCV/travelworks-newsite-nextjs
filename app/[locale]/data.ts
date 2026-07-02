import { BenefitsBannerItem, BenefitsBanner } from "./components/home/benefits-banner/type";
import { NewsTicker } from "./components/home/news-ticker/type";
import { HeroCarouselSection } from "./components/home/hero-carousel/type";
import { FeatureCardsSectionData } from "./components/home/feature-cards/type";
import { PlatformShowcaseModel } from "./components/home/platform-showcase/type";
import { WhyTravelworksSection, WhyTravelworksItems } from "./components/home/why/type";
import { CircleDollarSign, Cloud, Network, Users } from "lucide-react";
import { ClientsSectionModel, Client } from "./components/home/clients-section/type";

export type Layout =
  | BenefitsBanner
  | NewsTicker
  | FeatureCardsSectionData
  | WhyTravelworksSection
  | ClientsSectionModel
  | PlatformShowcaseModel
  | HeroCarouselSection;

export type Page = {
  slug: string;
  layout: Layout[];
};

const defaultItems: BenefitsBannerItem[] = [
  { id: 0, label: 'block-type-benefits-banner-1.list.0' },
  { id: 1, label: 'block-type-benefits-banner-1.list.1' },
  { id: 2, label: 'block-type-benefits-banner-1.list.2' },
  { id: 3, label: 'block-type-benefits-banner-1.list.3' },
];

const defaultItems2: BenefitsBannerItem[] = [
  { id: 0, label: "block-type-benefits-banner-2.list.0" },
  { id: 1, label: 'block-type-benefits-banner-2.list.1' },
  { id: 2, label: 'block-type-benefits-banner-2.list.2' },
  { id: 3, label: 'block-type-benefits-banner-2.list.3' },
];

const slides: HeroCarouselSection['slides'] = [
  {
    id: 'slide-1',
    title: 'block-type-carrousel.slides.concept.title',
    ctaLabel: 'block-type-carrousel.slides.concept.ctaLabel',
    ctaHref: 'block-type-carrousel.slides.concept.ctaHref',
    image: 'block-type-carrousel.slides.concept.image',
    contentPosition: 'left',
  },
  {
    id: 'slide-2',
    title: 'block-type-carrousel.slides.promo.title',
    ctaLabel: 'block-type-carrousel.slides.promo.ctaLabel',
    ctaHref: 'block-type-carrousel.slides.promo.ctaHref',
    image: 'block-type-carrousel.slides.promo.image',
    contentPosition: 'right',
  },
  {
    id: 'slide-3',
    title: 'block-type-carrousel.slides.tourOnline.title',
    ctaLabel: 'block-type-carrousel.slides.tourOnline.ctaLabel',
    ctaHref: 'block-type-carrousel.slides.tourOnline.ctaHref',
    image: 'block-type-carrousel.slides.tourOnline.image',
    contentPosition: 'left',
  },
]

const featureCards: FeatureCardsSectionData['items'] = [
  {
    id: '0',
    title: "block-type-features-cards.items.backoffice-tools.title",
    ctaHref: '/feature-1',
    image: {
      src: '/images/components/feature-cards/feature_strategic_management_tool.gif',
      alt: 'Feature 1',
      width: 400,
      height: 300,
    },
  },
  {
    id: '1',
    title: "block-type-features-cards.items.reservation-management.title",
    ctaHref: '/feature-1',
    image: {
      src: '/images/components/feature-cards/feature_strategic_management_tool.gif',
      alt: 'Feature 1',
      width: 400,
      height: 300,
    },
  },
  {
    id: '2',
    title: "block-type-features-cards.items.strategic-management-tool.title",
    ctaHref: '/feature-1',
    image: {
      src: '/images/components/feature-cards/feature_strategic_management_tool.gif',
      alt: 'Feature 1',
      width: 400,
      height: 300,
    },
  },
  {
    id: '3',
    title: "block-type-features-cards.items.tour-management.title",
    ctaHref: '/feature-1',
    image: {
      src: '/images/components/feature-cards/feature_strategic_management_tool.gif',
      alt: 'Feature 1',
      width: 400,
      height: 300,
    },
  },
  {
    id: '4',
    title: "block-type-features-cards.items.online-tour-booking.title",
    ctaHref: '/feature-1',
    image: {
      src: '/images/components/feature-cards/feature_strategic_management_tool.gif',
      alt: 'Feature 1',
      width: 400,
      height: 300,
    },
  },
  {
    id: '5',
    title: "block-type-features-cards.items.crm-tools.title",
    ctaHref: '/feature-1',
    image: {
      src: '/images/components/feature-cards/feature_strategic_management_tool.gif',
      alt: 'Feature 1',
      width: 400,
      height: 300,
    },
  },
  {
    id: '6',
    title: "block-type-features-cards.items.multiple-integration.title",
    ctaHref: '/feature-1',
    image: {
      src: '/images/components/feature-cards/feature_strategic_management_tool.gif',
      alt: 'Feature 1',
      width: 400,
      height: 300,
    },
  }
]

const whyItems: WhyTravelworksItems[] = [
  {
    id: 0,
    title: "block-type-why-travelworks.items.0.title",
    description: "block-type-why-travelworks.items.0.description",
    iconComponent: CircleDollarSign,
  },
  {
    id: 1,
    title: "block-type-why-travelworks.items.1.title",
    description: "block-type-why-travelworks.items.1.description",
    iconComponent: Network,
  },
  {
    id: 2,
    title: "block-type-why-travelworks.items.2.title",
    description: "block-type-why-travelworks.items.2.description",
    iconComponent: Cloud,
  },
  {
    id: 3,
    title: "block-type-why-travelworks.items.3.title",
    description: "block-type-why-travelworks.items.3.description",
    iconComponent: Users,
  },
];

const clientsSectionData: Client[] = [
  {
    name: 'Carlson Wagonlit Travel',
    logo: '/images/components/client-trust-section/logo.jpg',
  },
  {
    name: 'Ensemble Travel Group',
    logo: '/images/components/client-trust-section/logo.jpg',
  },
  {
    name: 'Voyages En Direct',
    logo: '/images/components/client-trust-section/logo.jpg',
  },
  {
    name: 'Thomas Cook',
    logo: '/images/components/client-trust-section/logo.jpg',
  },
  {
    name: 'Revasol',
    logo: '/images/components/client-trust-section/logo.jpg',
  },
  {
    name: 'Voyages Bergeron',
    logo: '/images/components/client-trust-section/logo.jpg',
  },
  {
    name: 'Club Voyages',
    logo: '/images/components/client-trust-section/logo.jpg',
  },
  {
    name: 'Transat',
    logo: '/images/components/client-trust-section/logo.jpg',
  },
  {
    name: 'Vasco Travel',
    logo: '/images/components/client-trust-section/logo.jpg',
  },
  {
    name: 'Voyages Plein Soleil',
    logo: '/images/components/client-trust-section/logo.jpg',
  },
  {
    name: 'Marlin Travel',
    logo: '/images/components/client-trust-section/logo.jpg',
  },
  {
    name: 'Vaisse De Croisiere',
    logo: '/images/components/client-trust-section/logo.jpg',
  },
]

export const HomePage: Page = {
  slug: "home",
  layout: [
    {
      blockType: "NewsTicker",
      id: "news-ticker-1",
      sectionTitle: "block-type-news-ticker.sectionTitle",
      newsLabel: "block-type-news-ticker.newsLabel",
      newsCtaHref: "block-type-news-ticker.newsCtaHref",
      phone: "block-type-news-ticker.phone",
    },
    {
      blockType: "HeroCarousel",
      slides: slides
    },
    {
      blockType: "FeatureCards",
      title: "block-type-features-cards.title",
      items: featureCards
    },
    {
      blockType: "PlatformShowcase",
      title: "block-type-platform-showcase.title",
      description: "block-type-platform-showcase.description",
      mainImage: "block-type-platform-showcase.mainImage",
      secondaryImage: "block-type-platform-showcase.secondaryImage"
    },
    {
      blockType: "WhyTravelworksSection",
      title: "block-type-why-travelworks.title",
      items: whyItems
    },
    {
      blockType: "BenefitsBanner",
      heading: "block-type-benefits-banner-1.heading",
      items: defaultItems,
      buttonLabel: "block-type-benefits-banner-1.buttonLabel",
      buttonHref: "block-type-benefits-banner-1.buttonHref",
      hideButton: false,
      imagePlaceholderLabel: "block-type-benefits-banner-1.imagePlaceholderLabel",
    },
    {
      blockType: "ClientTrustSection",
      title: "block-type-clients-trust.title",
      clients: clientsSectionData
    },
    {
      blockType: "BenefitsBanner",
      heading: "block-type-benefits-banner-2.heading",
      items: defaultItems2,
      buttonLabel: "block-type-benefits-banner-2.buttonLabel",
      buttonHref: "block-type-benefits-banner-2.buttonHref",
      hideButton: false,
      imagePlaceholderLabel: "block-type-benefits-banner-2.imagePlaceholderLabel",
    }
  ],
};