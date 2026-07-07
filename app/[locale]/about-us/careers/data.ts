import { PageHeroModel } from '../../components/shared/page-hero/type';
import { TextSection } from '../../components/shared/text-section-comp/type';

export type Layout = PageHeroModel | TextSection;
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
      blockType: 'TextSection',
      description: 'block-type-text-section.description',
    },
  ],
};
