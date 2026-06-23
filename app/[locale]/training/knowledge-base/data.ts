import { PageHeroModel } from "../../components/shared/page-hero/type";
import { FeaturesHighlights } from "../../components/features/type";
import { ImageBlockModel } from "../../components/shared/image-block/type";
import { imageHappyLearning } from "../../components/pages-elements/happy-learning/type";

export type Layout =
  | PageHeroModel
  | FeaturesHighlights
  | ImageBlockModel
  | imageHappyLearning;

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
    },
    {
      blockType: "ImageBlock",
      title: "block-type-image-block.title",
      description: "block-type-image-block.description",
      imageSrc: "block-type-image-block.imageSrc",
      altText: "block-type-image-block.altText",
      linkHref: "block-type-image-block.linkHref",
      linkText: "block-type-image-block.linkText",
      widthPercentage: "100%",
      hasCaption: true,
      captionText: "block-type-image-block.captionText"
    },
    {
      blockType: "ImageHappyLearning",
      title: "block-type-image-happy-learning.title",
      imageSrc: "block-type-image-happy-learning.imageSrc",
      altText: "block-type-image-happy-learning.altText",
      widthPercentage: "100px",
    }
  ]
};