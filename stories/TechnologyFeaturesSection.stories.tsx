import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CircleDollarSign, ShieldCheck, Workflow } from 'lucide-react';

import TechnologyFeaturesSection, {
  type TechnologyFeatureItem,
} from '@/app/[locale]/components/technology-features-section';

const customItems: TechnologyFeatureItem[] = [
  { id: 'payments', label: 'Payments Hub', iconComponent: CircleDollarSign },
  { id: 'approvals', label: 'Approval Flows', iconComponent: ShieldCheck },
  { id: 'automations', label: 'Workflow Automation', iconComponent: Workflow },
];

const meta = {
  title: 'App/TechnologyFeaturesSection',
  component: TechnologyFeaturesSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof TechnologyFeaturesSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomItems: Story = {
  args: {
    headingPrefix: 'Platform',
    headingEmphasis: 'Built',
    headingSuffix: 'for Operations Teams',
    items: customItems,
  },
};