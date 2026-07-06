import { PageHeroModel } from "../../components/shared/page-hero/type";
import { CardIcon, CardsIconsSection,  } from "../../components/shared/cards-icons/type";
import { DollarSign, Monitor, Rocket, Settings } from "lucide-react";
import { SplitSectionModel } from "../../components/shared/SplitSection/type";
import { SplitBannerSectionModel } from "../../components/shared/split-banner-section/type";
import { ComparisonSolution, ComparisonSolutionRow, ComparisonColumn } from "../../components/shared/comparison-solution-section/type";

export type Layout =
  | PageHeroModel
  | CardsIconsSection
  | SplitSectionModel
  | SplitBannerSectionModel
  | ComparisonSolution;
export type Page = {
  slug: string;
  layout: Layout[];
};

const defaultCards: CardIcon[] = [
  {
    id: 0,
    title: 'block-type-cards-icons.0.title',
    description: 'block-type-cards-icons.0.description',
    Icon: Rocket,
    iconBg: 'bg-[#0b66a6]',
    iconColor: 'text-white',
  },
  {
    id: 1,
    title: 'block-type-cards-icons.1.title',
    description: 'block-type-cards-icons.1.description',
    Icon: DollarSign,
    iconBg: 'bg-[#0b66a6]',
    iconColor: 'text-white',
  },
  {
    id: 2,
    title: 'block-type-cards-icons.2.title',
    description: 'block-type-cards-icons.2.description',
    Icon: Settings,
    iconBg: 'bg-[#0b66a6]',
    iconColor: 'text-white',
  },
  {
    id: 3,
    title: 'block-type-cards-icons.3.title',
    description: 'block-type-cards-icons.3.description',
    Icon: Monitor,
    iconBg: 'bg-[#0b66a6]',
    iconColor: 'text-white',
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
  }
];

const defaultRows: ComparisonSolutionRow[] = [
  {
    id: 0,
    label: 'block-type-comparison-solution.rows.0.label',
    values: {
      '0': true,
      '1': true,
    },
  },
  {
    id: 1,
    label: 'block-type-comparison-solution.rows.1.label',
    values: {
      '0': true,
      '1': true,
    },
  },
  {
    id: 2,
    label: 'block-type-comparison-solution.rows.2.label',
    values: {
      '0': true,
      '1': true,
    },
  },
  {
    id: 3,
    label: 'block-type-comparison-solution.rows.3.label',
    values: {
      '0': true,
      '1': true,

    },
  },
  {
    id: 4,
    label: 'block-type-comparison-solution.rows.4.label',
    values: {
      '0': true,
      '1': true
    },
  },
  {
    id: 5,
    label: 'block-type-comparison-solution.rows.5.label',
    values: {
      '0': true,
      '1': false,
    },
  },
  {
    id: 6,
    label: 'block-type-comparison-solution.rows.6.label',
    values: {
      '0': true,
      '1': false,
    },
  },
  {
    id: 7,
    label: 'block-type-comparison-solution.rows.7.label',
    values: {
      '0': true,
      '1': false,
    },
  },
  {
    id: 8,
    label: 'block-type-comparison-solution.rows.8.label',
    values: {
      '0': true,
      '1': false,
    },
  },
  {
    id: 9,
    label: 'block-type-comparison-solution.rows.9.label',
    values: {
      '0': true,
      '1': false,
    },
  },
  {
    id: 10,
    label: 'block-type-comparison-solution.rows.10.label',
    values: {
      '0': true,
      '1': false,
    },
  },
  {
    id: 11,
    label: 'block-type-comparison-solution.rows.11.label',
    values: {
      '0': true,
      '1': false,
    },
  },
  {
    id: 12,
    label: 'block-type-comparison-solution.rows.12.label',
    values: {
      '0': true,
      '1': false,
    },
  },
];

export const IntegrationsPageData: Page = {
  slug: "travel-agency-software/multiple-integration",
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
      blockType: "CardsIcons",
      cards: defaultCards,
      title: "block-type-cards-icons.title",
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
      blockType: "SplitBannerSection",
      title: "block-type-split2.title",
      heading: "block-type-split2.heading",
      description: "block-type-split2.description",
      imageSrc: "block-type-split2.imageSrc",
      imageAlt: "block-type-split2.imageAlt",
      imagePosition: "left",
      imageSecondarySrc: "block-type-split2.imageSecondarySrc",
      imageSecondaryAlt: "block-type-split2.imageSecondaryAlt",
      ctaLabel: "block-type-split2.ctaLabel",
      ctaLink: "block-type-split2.ctaLink",
      backgroundColor: "#005BAA"
    },
    {
      blockType: "ComparisonSolution",
      heading: "block-type-comparison-solution.heading",
      imageSrc: "block-type-comparison-solution.imageSrc",
      imageAlt: "block-type-comparison-solution.imageAlt",
      columns: defaultColumns,
      rows: defaultRows
    }
  ]
};