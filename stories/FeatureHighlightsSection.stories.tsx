import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CircleDollarSign, FileCheck2, Laptop, Workflow } from 'lucide-react';

import FeaturesHighlightsSection, {
  type FeatureHighlightItem,
} from '@/app/[locale]/components/features-highlights-section';

const customItems: FeatureHighlightItem[] = [
  {
    id: 'billing',
    title: 'Smart Billing Workflows',
    iconComponent: FileCheck2,
    paragraphs: ['Create clean invoices and speed up approvals with reusable templates.'],
  },
  {
    id: 'automation',
    title: 'Operational Automation',
    iconComponent: Workflow,
    paragraphs: ['Reduce repetitive back-office steps and keep your team focused on service.'],
  },
  {
    id: 'accounting',
    title: 'Live Accounting Insights',
    iconComponent: CircleDollarSign,
    paragraphs: ['Review financial data in real time and close periods faster with fewer errors.'],
  },
  {
    id: 'access',
    title: 'Anytime Data Access',
    iconComponent: Laptop,
    paragraphs: ['Access receivables, payables, and reports securely from any location.'],
  },
];

const meta = {
  title: 'App/FeatureHighlightsSection',
  component: FeaturesHighlightsSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FeaturesHighlightsSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomItems: Story = {
  args: {
    items: customItems,
  },
};