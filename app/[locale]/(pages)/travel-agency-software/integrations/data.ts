import { PageHeroModel } from '../../../components/shared/page-hero/type';
import { FeaturesHighlights } from '../../../components/features/type';
import { FeaturesCardsHighlights } from '../../../components/features/type';
import { CircleDollarSign, FileCheck2, Workflow } from 'lucide-react';
import { ImageBlockModel } from '../../../components/shared/image-block/type';

export type Layout = PageHeroModel | FeaturesHighlights | ImageBlockModel;

export type Page = {
  slug: string;
  layout: Layout[];
};

const featuresCards: FeaturesCardsHighlights[] = [
  {
    id: 0,
    title: 'block-type-features-highlights.online-reservation.title',
    description: 'block-type-features-highlights.online-reservation.description',
    icon: FileCheck2,
    linkTitle: '',
    linkUrl: '',
  },
  {
    id: 1,
    title: 'block-type-features-highlights.gds.title',
    description: 'block-type-features-highlights.gds.description',
    icon: Workflow,
    linkTitle: 'block-type-features-highlights.gds.linkTitle',
    linkUrl: 'block-type-features-highlights.gds.linkUrl',
  },
  {
    id: 2,
    title: 'block-type-features-highlights.insurance-companies.title',
    description: 'block-type-features-highlights.insurance-companies.description',
    icon: CircleDollarSign,
    linkTitle: 'block-type-features-highlights.insurance-companies.linkTitle',
    linkUrl: 'block-type-features-highlights.insurance-companies.linkUrl',
  },
];

export const IntegrationsPageData: Page = {
  slug: 'travel-agency-software/multiple-integration',
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
      blockType: 'ImageBlock',
      title: 'block-type-image-block.title',
      description: 'block-type-image-block.description',
      imageSrc: 'block-type-image-block.imageSrc',
      altText: 'block-type-image-block.altText',
      linkHref: 'block-type-image-block.linkHref',
      linkText: 'block-type-image-block.linkText',
      widthPercentage: '100%',
      hasCaption: true,
      captionText: 'block-type-image-block.captionText',
    },
    {
      blockType: 'FeaturesHighlights',
      cards: featuresCards,
    },
  ],
};
