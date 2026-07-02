import { PageHeroModel } from "../../components/shared/page-hero/type";
import { CardIcon, CardsIconsSection,  } from "../../components/shared/cards-icons/type";
import { DollarSign, Monitor, Rocket, Settings } from "lucide-react";

export type Layout =
  | PageHeroModel
  | CardsIconsSection;
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
    }
  ]
};