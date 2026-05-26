import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import BenefitsBanner, { type BenefitsBannerItem } from '@/app/[locale]/components/benefits-banner';

const customItems: BenefitsBannerItem[] = [
  { id: 'tailored', label: 'Tailored finance workflows for agencies' },
  { id: 'speed', label: 'Faster day-to-day team operations' },
  { id: 'security', label: 'Secure architecture for critical data' },
  { id: 'experience', label: 'Simple user experience for every role' },
];

const meta = {
  title: 'App/BenefitsBanner',
  component: BenefitsBanner,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof BenefitsBanner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomBullets: Story = {
  args: {
    heading: 'Benefits for Travel Agencies',
    items: customItems,
    buttonLabel: 'Explore Platform',
  },
};

export const NoButton: Story = {
  args: {
    hideButton: true,
  },
};