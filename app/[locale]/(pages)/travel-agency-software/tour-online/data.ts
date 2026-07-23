import { PageHeroModel } from '../../../components/shared/page-hero/type';
import { FeaturesHighlights } from '../../../components/features/type';
import { SplitSectionModel } from '../../../components/shared/SplitSection/type';
import { ImageBlockModel } from '../../../components/shared/image-block/type';
import { TourOnlineCTAArea } from '../../../components/shared/touronline-cta/type';
import { SplitSectionMiniModel } from '@/app/[locale]/components/shared/split-section-mini/type';

export type Layout =
  PageHeroModel | SplitSectionModel | FeaturesHighlights | ImageBlockModel | TourOnlineCTAArea | SplitSectionMiniModel;

export type Page = {
  slug: string;
  layout: Layout[];
};

export const TourOnlinePageData: Page = {
  slug: 'travel-agency-software/tour-online',
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
      blockType: 'SplitSection',
      heading: 'block-type-split-section-0.heading',
      description: 'block-type-split-section-0.description',
      imageSrc: 'block-type-split-section-0.imageSrc',
      imageAlt: 'block-type-split-section-0.imageAlt',
      imagePosition: 'left',
      ctaLabel: 'block-type-split-section-0.ctaLabel',
      ctaLink: 'block-type-split-section-0.ctaLink',
    },
    {
      blockType: 'SplitSection',
      heading: 'block-type-split-section-1.heading',
      description: 'block-type-split-section-1.description',
      imageSrc: 'block-type-split-section-1.imageSrc',
      imageAlt: 'block-type-split-section-1.imageAlt',
      imagePosition: 'right',
      ctaLabel: 'block-type-split-section-1.ctaLabel',
      ctaLink: 'block-type-split-section-1.ctaLink',
    },
    {
      blockType: 'ImageBlock',
      title: 'block-type-image-block.title',
      description: 'block-type-image-block.description',
      imageSrc: 'block-type-image-block.imageSrc',
      altText: 'block-type-image-block.altText',
      linkHref: 'block-type-image-block.linkHref',
      linkText: 'block-type-image-block.linkText',
      maxWidth: '1500px',
      hasCaption: true,
      captionText: 'block-type-image-block.captionText',
    },
    {
      blockType: 'SplitSectionMini',
      heading: 'block-type-split-section-2.heading',
      description: 'block-type-split-section-2.description',
      imageSrc: 'block-type-split-section-2.imageSrc',
      imageAlt: 'block-type-split-section-2.imageAlt',
      imagePosition: 'left',
      ctaLabel: 'block-type-split-section-2.ctaLabel',
      ctaLink: 'block-type-split-section-2.ctaLink',
    },
    {
      blockType: 'SplitSection',
      heading: 'block-type-split-section-3.heading',
      description: 'block-type-split-section-3.description',
      imageSrc: 'block-type-split-section-3.imageSrc',
      imageAlt: 'block-type-split-section-3.imageAlt',
      imagePosition: 'left',
      ctaLabel: 'block-type-split-section-3.ctaLabel',
      ctaLink: 'block-type-split-section-3.ctaLink',
    },
    {
      blockType: 'TourOnlineCTAArea',
      imageSrc: 'block-type-tour-online-cta-area.imageSrc',
      imageAlt: 'block-type-tour-online-cta-area.imageAlt',
      ctaLink: 'block-type-tour-online-cta-area.ctaLink',
      ctaText: 'block-type-tour-online-cta-area.ctaText',
    },
  ],
};
