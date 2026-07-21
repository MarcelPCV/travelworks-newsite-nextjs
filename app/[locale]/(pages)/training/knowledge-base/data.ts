import { PageHeroModel } from '@/app/[locale]/components/shared/page-hero/type';
import { FeaturesHighlights } from '@/app/[locale]/components/features/type';
import { ImageBlockModel } from '@/app/[locale]/components/shared/image-block/type';
import { imageHappyLearning } from '@/app/[locale]/components/pages-elements/happy-learning/type';
import { ConmparisonTraining } from '@/app/[locale]/components/shared/comparison-training/type';
import { ExpertProfile } from '@/app/[locale]/components/shared/training-experts/type';

export type Layout =
  | PageHeroModel
  | FeaturesHighlights
  | ImageBlockModel
  | ConmparisonTraining
  | ExpertProfile
  | imageHappyLearning;

export type Page = {
  slug: string;
  layout: Layout[];
};

const comparisonFeatures = {
  knowledgeBase: [
    {
      title: 'block-type-comparison-training.knowledgeBase.0.title',
      description: 'block-type-comparison-training.knowledgeBase.0.description',
    },
    {
      title: 'block-type-comparison-training.knowledgeBase.1.title',
      description: 'block-type-comparison-training.knowledgeBase.1.description',
    },
    {
      title: 'block-type-comparison-training.knowledgeBase.2.title',
      description: 'block-type-comparison-training.knowledgeBase.2.description',
    },
    {
      title: 'block-type-comparison-training.knowledgeBase.3.title',
      description: 'block-type-comparison-training.knowledgeBase.3.description',
    },
    {
      title: 'block-type-comparison-training.knowledgeBase.4.title',
      description: 'block-type-comparison-training.knowledgeBase.4.description',
    },
  ],
  trainingPlatform: [
    {
      title: 'block-type-comparison-training.trainingPlatform.0.title',
      description: 'block-type-comparison-training.trainingPlatform.0.description',
    },
    {
      title: 'block-type-comparison-training.trainingPlatform.1.title',
      description: 'block-type-comparison-training.trainingPlatform.1.description',
    },
    {
      title: 'block-type-comparison-training.trainingPlatform.2.title',
      description: 'block-type-comparison-training.trainingPlatform.2.description',
    },
    {
      title: 'block-type-comparison-training.trainingPlatform.3.title',
      description: 'block-type-comparison-training.trainingPlatform.3.description',
    },
    {
      title: 'block-type-comparison-training.trainingPlatform.4.title',
      description: 'block-type-comparison-training.trainingPlatform.4.description',
    },
  ],
};

export const IntegrationsPageData: Page = {
  slug: 'training/knowledge-base',
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
      blockType: 'ImageHappyLearning',
      title: 'block-type-image-happy-learning.title',
      imageSrc: 'block-type-image-happy-learning.imageSrc',
      altText: 'block-type-image-happy-learning.altText',
      widthPercentage: '100px',
    },
    {
      blockType: 'ConmparisonTraining',
      heading: 'block-type-comparison-training.heading',
      knowledgeBase: {
        title: 'block-type-comparison-training.knowledgeBase.title',
        badge: 'block-type-comparison-training.knowledgeBase.badge',
        features: comparisonFeatures.knowledgeBase,
      },
      trainingPlatform: {
        title: 'block-type-comparison-training.trainingPlatform.title',
        badge: 'block-type-comparison-training.trainingPlatform.badge',
        features: comparisonFeatures.trainingPlatform,
      },
    },
    {
      blockType: 'ExpertProfile',
      heading: 'block-type-expert-profile.heading',
      person: {
        name: 'block-type-expert-profile.person.name',
        role: 'block-type-expert-profile.person.role',
        image: {
          src: 'block-type-expert-profile.person.image.src',
          alt: 'block-type-expert-profile.person.image.alt',
        },
      },
      quote: 'block-type-expert-profile.quote',
      bio: 'block-type-expert-profile.bio',
    },
  ],
};
