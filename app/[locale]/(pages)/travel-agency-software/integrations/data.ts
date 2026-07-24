import { PageHeroModel } from '../../../components/shared/page-hero/type';
import { FeaturesHighlights } from '../../../components/features/type';
import { FeaturesCardsHighlights } from '../../../components/features/type';
import { CircleDollarSign, FileCheck2, Workflow } from 'lucide-react';
import { ImageBlockModel } from '../../../components/shared/image-block/type';
import { PlanningDemoSectionModel } from '../../(home)/components/demo-section/type';

export type Layout = PageHeroModel | FeaturesHighlights | ImageBlockModel | PlanningDemoSectionModel;

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
      maxWidth: '1000px',
      hasCaption: true,
      captionText: 'block-type-image-block.captionText',
    },
    {
      blockType: 'FeaturesHighlights',
      cards: featuresCards,
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
