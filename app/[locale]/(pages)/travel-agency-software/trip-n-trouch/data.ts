import { PageHeroModel } from '../../../components/shared/page-hero/type';
import { SplitSectionModel } from '../../../components/shared/SplitSection/type';
import { YoutubeVideoModel } from '../../../components/shared/video/type';

export type Layout = PageHeroModel | SplitSectionModel | YoutubeVideoModel;

export type Page = {
  slug: string;
  layout: Layout[];
};

export const TripNTouchPage: Page = {
  slug: 'travel-agency-software/trip-n-trouch',
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
      blockType: 'YoutubeVideo',
      heading: 'block-type-youtube-video.heading',
      videoId: 'block-type-youtube-video.videoId',
      channelLabel: 'block-type-youtube-video.channelLabel',
      description: 'block-type-youtube-video.description',
    },
  ],
};
