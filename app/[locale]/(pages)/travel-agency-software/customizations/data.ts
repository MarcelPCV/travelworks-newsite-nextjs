import { PlanningDemoSectionModel } from '../../(home)/components/demo-section/type';
import { PageHeroModel } from '../../../components/shared/page-hero/type';
import { SplitSectionModel } from '../../../components/shared/SplitSection/type';
import { YoutubeVideoModel } from '../../../components/shared/video/type';

export type Layout =
  PageHeroModel | SplitSectionModel | YoutubeVideoModel | PlanningDemoSectionModel;

export type Page = {
  slug: string;
  layout: Layout[];
};

export const CustomizationsPage: Page = {
  slug: 'travel-agency-software/back-office-travel-agency',
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
      heading: 'block-type-split.heading',
      description: 'block-type-split.description',
      imageSrc: 'block-type-split.imageSrc',
      imageAlt: 'block-type-split.imageAlt',
      imagePosition: 'left',
    },
    {
      blockType: 'YoutubeVideo',
      heading: 'block-type-youtube-video.heading',
      videoId: 'block-type-youtube-video.videoId',
      channelLabel: 'block-type-youtube-video.channelLabel',
      description: 'block-type-youtube-video.description',
    },
    {
      blockType: 'PlanningDemoSection',
      heading: 'block-type-planning-demo-section.heading',
      image: {
        placeholderLabel: 'block-type-planning-demo-section.image.placeholderLabel',
        linkHref: '/images/pages/home/planning-demo/travelworks.jpg',
      },
      form: {
        fields: [
          {
            id: 'full-name',
            name: 'fullName',
            label: 'block-type-planning-demo-section.form.nameLabel',
            type: 'text',
          },
          {
            id: 'email',
            name: 'email',
            label: 'block-type-planning-demo-section.form.emailLabel',
            type: 'email',
          },
          {
            id: 'agency-name',
            name: 'agencyName',
            label: 'block-type-planning-demo-section.form.companyLabel',
            type: 'text',
          },
          {
            id: 'phone',
            name: 'phone',
            label: 'block-type-planning-demo-section.form.phoneLabel',
            type: 'tel',
          },
        ],
        country: {
          label: 'block-type-planning-demo-section.form.countryLabel',
          placeholder: 'block-type-planning-demo-section.form.countryPlaceholder',
        },
        submitButton: {
          label: 'block-type-planning-demo-section.form.submitButtonLabel',
        },
      },
    },
  ],
};
