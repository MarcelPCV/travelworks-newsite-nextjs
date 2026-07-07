import { PageHeroModel } from '../../components/shared/page-hero/type';
import { CardsIconsSection } from '../../components/shared/cards-icons/type';
import { SplitSectionModel } from '../../components/shared/SplitSection/type';
import { SplitBannerSectionModel } from '../../components/shared/split-banner-section/type';
import { ComparisonSolution } from '../../components/shared/comparison-solution-section/type';
import { ImageBlockModel } from '../../components/shared/image-block/type';
import { TextSection } from '../../components/shared/text-section-comp/type';
import { ShareItemsSection } from '../../components/trip-details/share-items/type';

export type Layout =
  | PageHeroModel
  | CardsIconsSection
  | SplitSectionModel
  | SplitBannerSectionModel
  | ImageBlockModel
  | TextSection
  | ShareItemsSection
  | ComparisonSolution;

export type Page = {
  slug: string;
  layout: Layout[];
};

const shareItemsData: ShareItemsSection['items'] = [
  {
    id: 0,
    title: 'block-type-share-items.0.title',
  },
  {
    id: 1,
    title: 'block-type-share-items.1.title',
  },
  {
    id: 2,
    title: 'block-type-share-items.2.title',
  },
];

export const IntegrationsPageData: Page = {
  slug: 'travel-agency-software/trip-details',
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
    {
      blockType: 'TextSection',
      title: 'block-type-text-section.title',
      description: 'block-type-text-section.description',
    },
    {
      blockType: 'ShareItems',
      items: shareItemsData,
    },
    {
      blockType: 'ImageBlock',
      title: 'block-type-image-block.title',
      description: 'block-type-image-block.description',
      imageSrc: 'block-type-image-block.imageSrc',
      altText: 'block-type-image-block.altText',
      linkHref: 'block-type-image-block.linkHref',
      linkText: 'block-type-image-block.linkText',
      widthPercentage: '70%',
      hasCaption: true,
      captionText: 'block-type-image-block.captionText',
      ctaLabel: 'block-type-image-block.ctaLabel',
      ctaLink: 'block-type-image-block.ctaLink',
      backgroundColor: '#ECECEC',
    },
    {
      blockType: 'ImageBlock',
      title: 'block-type-image-block2.title',
      description: 'block-type-image-block2.description',
      imageSrc: 'block-type-image-block2.imageSrc',
      altText: 'block-type-image-block2.altText',
      linkHref: 'block-type-image-block2.linkHref',
      linkText: 'block-type-image-block2.linkText',
      widthPercentage: '70%',
      hasCaption: true,
      captionText: 'block-type-image-block.captionText',
    },
    {
      blockType: 'ImageBlock',
      title: 'block-type-image-block3.title',
      description: 'block-type-image-block3.description',
      imageSrc: 'block-type-image-block3.imageSrc',
      altText: 'block-type-image-block3.altText',
      linkHref: 'block-type-image-block3.linkHref',
      linkText: 'block-type-image-block3.linkText',
      widthPercentage: '70%',
      hasCaption: true,
      captionText: 'block-type-image-block.captionText',
    },
    {
      blockType: 'ImageBlock',
      title: 'block-type-image-block4.title',
      description: 'block-type-image-block4.description',
      imageSrc: 'block-type-image-block4.imageSrc',
      altText: 'block-type-image-block4.altText',
      linkHref: 'block-type-image-block4.linkHref',
      linkText: 'block-type-image-block4.linkText',
      widthPercentage: '40%',
      hasCaption: true,
      captionText: 'block-type-image-block.captionText',
    },
    {
      blockType: 'ImageBlock',
      title: 'block-type-image-block5.title',
      description: 'block-type-image-block5.description',
      imageSrc: 'block-type-image-block5.imageSrc',
      altText: 'block-type-image-block5.altText',
      linkHref: 'block-type-image-block5.linkHref',
      linkText: 'block-type-image-block5.linkText',
      widthPercentage: '100%',
      hasCaption: true,
      captionText: 'block-type-image-block5.captionText',
      ctaLabel: 'block-type-image-block5.ctaLabel',
      ctaLink: 'block-type-image-block5.ctaLink',
    },
  ],
};
