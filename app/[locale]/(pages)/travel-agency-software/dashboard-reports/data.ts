import { PageHeroModel } from '../../../components/shared/page-hero/type';
import { FeaturesCardsHighlights, FeaturesHighlights } from '../../../components/features/type';
import { CircleDollarSign, FileCheck2, Workflow } from 'lucide-react';
import { PlanningDemoSectionModel } from '../../(home)/components/demo-section/type';

export type Layout = PageHeroModel | FeaturesHighlights | PlanningDemoSectionModel;

export type Page = {
  slug: string;
  layout: Layout[];
};

const featuresCards: FeaturesCardsHighlights[] = [
  {
    id: 0,
    title: 'block-type-features-highlights.Internal-communications.title',
    description: 'block-type-features-highlights.Internal-communications.description',
    icon: FileCheck2,
  },
  {
    id: 1,
    title: 'block-type-features-highlights.deadlines-reminders.title',
    description: 'block-type-features-highlights.deadlines-reminders.description',
    icon: Workflow,
  },
  {
    id: 2,
    title: 'block-type-features-highlights.sales-performance.title',
    description: 'block-type-features-highlights.sales-performance.description',
    icon: CircleDollarSign,
  },
];

export const BackOfficeTravelAgencyPage: Page = {
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
