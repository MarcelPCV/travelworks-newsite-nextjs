import {PageHeroModel} from "../../components/shared/page-hero/type";

export type Layout =
  | PageHeroModel

export type Page = {
  slug: string;
//   seo: {
//     titleKey: string;
//     descriptionKey: string;
//   };
  layout: Layout[];
};


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
      mobileTopImageSrc:
        "/images/pages/travel-agency-software/features/background-portfolio-features-mobile.webp",
      desktopMainImageSrc:
        "/images/pages/travel-agency-software/features/background-portfolio-features-mobile.webp",
      logoImageSrc: "",
      ctaImageSrc:
        "/images/pages/travel-agency-software/features/30-logo-en.svg",
    }
  ],
};