import { PageHeroModel } from "../../components/shared/page-hero/type";
import { SplitSectionModel } from "../../components/shared/SplitSection/type";
import { FeatureMasonry, FeatureMasonryCard } from "../../components/shared/features-masonry-section/type";
import { YoutubeVideoModel } from "../../components/shared/video/type";
import { FeaturesCardsHighlights, FeaturesHighlights } from "../../components/features/type";
import {
  CircleDollarSign,
  FileCheck2,
  Laptop,
  Workflow,
} from 'lucide-react';


export type Layout =
  | PageHeroModel
  | SplitSectionModel
  | YoutubeVideoModel
  | FeaturesHighlights
  | FeatureMasonry;

export type Page = {
  slug: string;
  layout: Layout[];
};

const defaultCards: FeatureMasonryCard[] = [
  {
    id: 'passenger-groups',
    title: 'block-type-features-masonry.passenger-groups.title',
    topLinkLabel: 'block-type-features-masonry.passenger-groups.topLinkLabel',
    hasPreview: true,
    items: [
      'block-type-features-masonry.passenger-groups.items.0',
      'block-type-features-masonry.passenger-groups.items.1',
      'block-type-features-masonry.passenger-groups.items.2',
    ],
  },
  {
    id: 'suppliers-credit-cards',
    title: 'block-type-features-masonry.suppliers-credit-cards.title',
    hasPreview: false,
    items: [
      'block-type-features-masonry.suppliers-credit-cards.items.0',
      'block-type-features-masonry.suppliers-credit-cards.items.1',
    ],
  },
  {
    id: 'advanced-reports',
    title: 'block-type-features-masonry.advanced-reports.title',
    hasPreview: false,
    items: [
      'block-type-features-masonry.advanced-reports.items.0',
      'block-type-features-masonry.advanced-reports.items.1',
      'block-type-features-masonry.advanced-reports.items.2',
    ],
    ctaLabel: 'block-type-features-masonry.advanced-reports.ctaLabel',
    ctaHref: '#',
  },
  {
    id: 'mobile-solutions',
    title: 'block-type-features-masonry.mobile-solutions.title',
    hasPreview: false,
    items: [
      'block-type-features-masonry.mobile-solutions.items.0',
      'block-type-features-masonry.mobile-solutions.items.1',
      'block-type-features-masonry.mobile-solutions.items.2',
    ],
    ctaLabel: 'block-type-features-masonry.mobile-solutions.ctaLabel',
    ctaHref: '#',
  },
  {
    id: 'travel-agents-commissions',
    title: 'block-type-features-masonry.travel-agents-commissions.title',
    hasPreview: false,
    items: [
      'block-type-features-masonry.travel-agents-commissions.items.0',
      'block-type-features-masonry.travel-agents-commissions.items.1',
    ],
    ctaLabel: 'block-type-features-masonry.travel-agents-commissions.ctaLabel',
    ctaHref: '#',
  },
  {
    id: 'bsp-arc-management',
    title: 'block-type-features-masonry.bsp-arc-management.title',
    hasPreview: false,
    items: [
      'block-type-features-masonry.bsp-arc-management.items.0',
      'block-type-features-masonry.bsp-arc-management.items.1',
    ],
    ctaLabel: 'block-type-features-masonry.bsp-arc-management.ctaLabel',
    ctaHref: '#',
  },
  {
    id: 'travel-agents-dashboards',
    title: 'block-type-features-masonry.travel-agents-dashboards.title',
    hasPreview: false,
    items: [
      'block-type-features-masonry.travel-agents-dashboards.items.0',
      'block-type-features-masonry.travel-agents-dashboards.items.1',
      'block-type-features-masonry.travel-agents-dashboards.items.2',
    ],
    ctaLabel: 'block-type-features-masonry.travel-agents-dashboards.ctaLabel',
    ctaHref: '#',
  },
  {
    id: 'pci-compliance',
    title: 'block-type-features-masonry.pci-compliance.title',
    hasPreview: false,
    items: [
      'block-type-features-masonry.pci-compliance.items.0',
      'block-type-features-masonry.pci-compliance.items.1',
    ],
    ctaLabel: 'block-type-features-masonry.pci-compliance.ctaLabel',
    ctaHref: '#',
  }
];

const featuresCards: FeaturesCardsHighlights[] = [
  {
    id: 0,
    title: 'block-type-features-highlights.invoicing-methodology.title',
    description: 'block-type-features-highlights.invoicing-methodology.description',
    icon: FileCheck2
  },
  {
    id: 1,
    title: 'block-type-features-highlights.process-automation.title',
    description: 'block-type-features-highlights.process-automation.description',
    icon: Workflow
  },
  {
    id: 2,
    title: 'block-type-features-highlights.accounting-integration.title',
    description: 'block-type-features-highlights.accounting-integration.description',
    icon: CircleDollarSign,
  },
  {
    id: 3,
    title: 'block-type-features-highlights.data-anywhere.title',
    description: 'block-type-features-highlights.data-anywhere.description',
    icon: Laptop
  },
];

export const BackOfficeTravelAgencyPage: Page = {
  slug: "travel-agency-software/back-office-travel-agency",
  layout: [
    {
      blockType: "PageHero",
      title: "block-type-page-hero.title",
      description:"block-type-page-hero.description",
      mobileTopImageSrc:"block-type-page-hero.mobileTopImageSrc",
      desktopMainImageSrc:"block-type-page-hero.desktopMainImageSrc",
      logoImageSrc: "block-type-page-hero.logoImageSrc",
      ctaImageSrc: "block-type-page-hero.ctaImageSrc",
    },
    {
      blockType: "SplitSection",
      heading: "block-type-split.heading",
      description: "block-type-split.description",
      imageSrc: "block-type-split.imageSrc",
      imageAlt: "block-type-split.imageAlt",
      imagePosition: "left"
    },
    {
      blockType: "block-type-features-highlights",
      cards: featuresCards
    },
    {
      blockType: "FeatureMasonry",
      cards: defaultCards,
    },
    {
      blockType: "YoutubeVideo",
      heading: "block-type-youtube-video.heading",
      videoId: "block-type-youtube-video.videoId",
      channelLabel: "block-type-youtube-video.channelLabel",
      description: "block-type-youtube-video.description"
    },

  ],
};