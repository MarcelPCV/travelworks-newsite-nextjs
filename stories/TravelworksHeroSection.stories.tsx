import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import FeaturesHeroSection from '@/app/[locale]/components/features-hero-section';

const meta = {
  title: 'App/FeaturesHeroSection',
  component: FeaturesHeroSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FeaturesHeroSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomHeading: Story = {
  args: {
    heading: 'TravelWorks Platform',
    description: 'Technology solutions built for travel agencies and tour operators.',
  },
};

export const WithImages: Story = {
  args: {
    mobileTopImageSrc: '/image.webp',
    desktopMainImageSrc: '/image.webp',
    logoImageSrc: '/image.webp',
    ctaImageSrc: '/image.webp',
  },
};
