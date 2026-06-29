import { PageHeroModel } from "../../components/shared/page-hero/type";

export type Layout =
  | PageHeroModel

export type Page = {
  slug: string;
  layout: Layout[];
};


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
    }
  ]
};