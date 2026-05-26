import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import PlatformShowcaseSection from '@/app/[locale]/components/platform-showcase-section';

const meta = {
  title: 'App/PlatformShowcaseSection',
  component: PlatformShowcaseSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof PlatformShowcaseSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: {
    title:
      'A complete workspace for travel agents and accounting teams, designed to improve speed, visibility, and confidence across daily operations.',
    description:
      'Replace the placeholder blocks with final computer and anniversary assets while keeping this responsive structure unchanged.',
    badgePlaceholderLabel: 'In Travel Software Development',
  },
};