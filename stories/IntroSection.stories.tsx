import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import IntroSection from '@/app/[locale]/components/intro-section';

const demoImageSrc = '/globe.svg';

const meta = {
  title: 'App/IntroSection',
  component: IntroSection,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    eyebrow: 'Powerful And Smart Tools',
    heading: 'Designed Around Travel Agency Work',
    description:
      'Travel agency accounting needs are particular. TravelWorks covers daily operations with tools that raise productivity, strengthen customer service, and support profitability.',
    imageSrc: demoImageSrc,
    imageAlt: 'Abstract product illustration',
  },
  argTypes: {
    imagePosition: {
      control: { type: 'inline-radio' },
      options: ['left', 'right'],
    },
  },
} satisfies Meta<typeof IntroSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ImageLeft: Story = {
  args: {
    imagePosition: 'left',
  },
};

export const ImageRight: Story = {
  args: {
    imagePosition: 'right',
  },
};