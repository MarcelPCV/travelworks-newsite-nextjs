import { PageHeroModel } from "../../components/shared/page-hero/type";
import { FeaturesCardsHighlights, FeaturesHighlights } from "../../components/features/type";
import {
  CircleDollarSign,
  FileCheck2,
  Workflow,
} from 'lucide-react';


export type Layout =
  | PageHeroModel
  | FeaturesHighlights


export type Page = {
  slug: string;
  layout: Layout[];
};


const featuresCards: FeaturesCardsHighlights[] = [
  {
    id: 0,
    title: 'block-type-features-highlights.Internal-communications.title',
    description: 'block-type-features-highlights.Internal-communications.description',
    icon: FileCheck2
  },
  {
    id: 1,
    title: 'block-type-features-highlights.deadlines-reminders.title',
    description: 'block-type-features-highlights.deadlines-reminders.description',
    icon: Workflow
  },
  {
    id: 2,
    title: 'block-type-features-highlights.sales-performance.title',
    description: 'block-type-features-highlights.sales-performance.description',
    icon: CircleDollarSign,
  }
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
      blockType: "FeaturesHighlights",
      cards: featuresCards
    }
  ],
};