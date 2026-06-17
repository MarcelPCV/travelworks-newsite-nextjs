import { PageHeroModel } from "../../components/shared/page-hero/type";
import { SplitSectionModel } from "../../components/shared/SplitSection/type";
import { FeatureMasonry, FeatureMasonryCard } from "../../components/shared/features-masonry-section/type";
import { YoutubeVideoModel } from "../../components/shared/video/type";
import { ComparisonSolution, ComparisonSolutionRow, ComparisonColumn } from "../../components/shared/comparison-solution-section/type";

export type Layout =
  | PageHeroModel
  | SplitSectionModel
  | FeatureMasonry
  | YoutubeVideoModel
  | ComparisonSolution;

export type Page = {
  slug: string;
//   seo: {
//     titleKey: string;
//     descriptionKey: string;
//   };
  layout: Layout[];
};

const defaultCards: FeatureMasonryCard[] = [
  {
    id: 'reservation-management',
    title: 'block-type-features-masonry.reservation-management.title',
    topLinkLabel: 'block-type-features-masonry.reservation-management.topLinkLabel',
    hasPreview: true,
    items: [
      'block-type-features-masonry.reservation-management.items.0',
      'block-type-features-masonry.reservation-management.items.1',
      'block-type-features-masonry.reservation-management.items.2',
      'block-type-features-masonry.reservation-management.items.3',
      'block-type-features-masonry.reservation-management.items.4',
    ],
  },
  {
    id: 'strategic-management-tool',
    title: 'block-type-features-masonry.strategic-management-tool.title',
    hasPreview: false,
    items: [
      'block-type-features-masonry.strategic-management-tool.items.0',
      'block-type-features-masonry.strategic-management-tool.items.1',
      'block-type-features-masonry.strategic-management-tool.items.2',
    ],
  },
  {
    id: 'crm-marketing',
    title: 'block-type-features-masonry.crm-marketing.title',
    hasPreview: false,
    items: [
      'block-type-features-masonry.crm-marketing.items.0',
      'block-type-features-masonry.crm-marketing.items.1',
      'block-type-features-masonry.crm-marketing.items.2',
    ],
    ctaLabel: 'block-type-features-masonry.crm-marketing.ctaLabel',
    ctaHref: '#',
  },
  {
    id: 'accounting',
    title: 'block-type-features-masonry.accounting.title',
    hasPreview: false,
    items: [
      'block-type-features-masonry.accounting.items.0',
      'block-type-features-masonry.accounting.items.1',
      'block-type-features-masonry.accounting.items.2',
      'block-type-features-masonry.accounting.items.3',
      'block-type-features-masonry.accounting.items.4',
    ],
    ctaLabel: 'block-type-features-masonry.accounting.ctaLabel',
    ctaHref: '#',
  },
  {
    id: 'invoicing',
    title: 'block-type-features-masonry.invoicing.title',
    hasPreview: false,
    items: [
      'block-type-features-masonry.invoicing.items.0',
      'block-type-features-masonry.invoicing.items.1',
      'block-type-features-masonry.invoicing.items.2',
      'block-type-features-masonry.invoicing.items.3',
      'block-type-features-masonry.invoicing.items.4',
    ],
    ctaLabel: 'block-type-features-masonry.invoicing.ctaLabel',
    ctaHref: '#',
  },
  {
    id: 'tour-management',
    title: 'block-type-features-masonry.tour-management.title',
    hasPreview: false,
    items: [
      'block-type-features-masonry.tour-management.items.0',
      'block-type-features-masonry.tour-management.items.1',
      'block-type-features-masonry.tour-management.items.2',
      'block-type-features-masonry.tour-management.items.3',
    ],
    ctaLabel: 'block-type-features-masonry.tour-management.ctaLabel',
    ctaHref: '#',
  },
];

const defaultColumns: ComparisonColumn[] = [
  { 
    id: 0,
     label: 'block-type-comparison-solution.columns.0.label' 
  },
  { 
    id: 1, 
    label: 'block-type-comparison-solution.columns.1.label' 
  },
  { 
    id: 2, 
    label: 'block-type-comparison-solution.columns.2.label' 
  },
];

const defaultRows: ComparisonSolutionRow[] = [
  {
    id: 0,
    label: 'block-type-comparison-solution.rows.0.label',
    values: {
      '0': true,
      '1': true,
      '2': true,
    },
  },
  {
    id: 1,
    label: 'block-type-comparison-solution.rows.1.label',
    values: {
      '0': true,
      '1': false,
      '2': true,
    },
  },
  {
    id: 2,
    label: 'block-type-comparison-solution.rows.2.label',
    values: {
      '0': true,
      '1': true,
      '2': true,
    },
  },
  {
    id: 3,
    label: 'block-type-comparison-solution.rows.3.label',
    values: {
      '0': true,
      '1': false,
      '2': false,
    },
  },
  {
    id: 4,
    label: 'block-type-comparison-solution.rows.4.label',
    values: {
      '0': true,
      '1': false,
      '2': true,
    },
  },
  {
    id: 5,
    label: 'block-type-comparison-solution.rows.5.label',
    values: {
      '0': true,
      '1': false,
      '2': true,
    },
  },
  {
    id: 6,
    label: 'block-type-comparison-solution.rows.6.label',
    values: {
      '0': true,
      '1': false,
      '2': true,
    },
  },
  {
    id: 7,
    label: 'block-type-comparison-solution.rows.7.label',
    values: {
      '0': true,
      '1': false,
      '2': true,
    },
  },
  {
    id: 8,
    label: 'block-type-comparison-solution.rows.8.label',
    values: {
      '0': true,
      '1': false,
      '2': true,
    },
  },
  {
    id: 9,
    label: 'block-type-comparison-solution.rows.9.label',
    values: {
      '0': true,
      '1': true,
      '2': false,
    },
  },
  {
    id: 10,
    label: 'block-type-comparison-solution.rows.10.label',
    values: {
      '0': true,
      '1': false,
      '2': false,
    },
  },
  {
    id: 11,
    label: 'block-type-comparison-solution.rows.11.label',
    values: {
      '0': true,
      '1': false,
      '2': false,
    },
  },
  {
    id: 12,
    label: 'block-type-comparison-solution.rows.12.label',
    values: {
      '0': true,
      '1': false,
      '2': false,
    },
  },
];


export const FeaturesPage: Page = {
  slug: "travel-agency-software/features",

//   seo: {
//     titleKey: "travel-agency-software.features.seo.title",
//     descriptionKey: "travel-agency-software.features.seo.description",
//       "travel-agency-software.features.seo.description",
//   },

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
    {
      blockType: "ComparisonSolution",
      heading: "block-type-comparison-solution.heading",
      imageSrc: "block-type-comparison-solution.imageSrc",
      imageAlt: "block-type-comparison-solution.imageAlt",
      columns: defaultColumns,
      rows: defaultRows
    }
  ],
};