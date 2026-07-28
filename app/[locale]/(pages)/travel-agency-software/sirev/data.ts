import { PageHeroModel } from '../../../components/shared/page-hero/type';
import { SplitSectionModel } from '../../../components/shared/SplitSection/type';
import { PlanningDemoSectionModel } from '../../(home)/components/demo-section/type';
import { FeaturesCardsHighlights, FeaturesHighlights } from '@/app/[locale]/components/features/type';
import { CircleDollarSign, FileCheck2, Laptop, Workflow } from 'lucide-react';

export type Layout = PageHeroModel | SplitSectionModel | PlanningDemoSectionModel | FeaturesHighlights ;

export type Page = {
	slug: string;
	layout: Layout[];
};

const featuresCards: FeaturesCardsHighlights[] = [
  {
    id: 0,
    title: 'block-type-features-highlights.invoicing-methodology.title',
    description: 'block-type-features-highlights.invoicing-methodology.description',
    icon: FileCheck2,
  },
  {
    id: 1,
    title: 'block-type-features-highlights.process-automation.title',
    description: 'block-type-features-highlights.process-automation.description',
    icon: Workflow,
  },
  {
    id: 2,
    title: 'block-type-features-highlights.accounting-integration.title',
    description: 'block-type-features-highlights.accounting-integration.description',
    icon: CircleDollarSign,
  }
];

export const CustomizationsPage: Page = {
	slug: 'travel-agency-software/crm-tools',
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
			ctaLabel: 'block-type-split.ctaLabel',
			ctaLink: 'block-type-split.ctaLink',
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
