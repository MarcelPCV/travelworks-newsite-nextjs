import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import ComparisonSolutionSection from '@/app/[locale]/components/comparison-solution-section';

const meta = {
  title: 'App/ComparisonSolutionSection',
  component: ComparisonSolutionSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ComparisonSolutionSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomHeading: Story = {
  args: {
    heading: 'The Complete Platform For Agencies',
  },
};
