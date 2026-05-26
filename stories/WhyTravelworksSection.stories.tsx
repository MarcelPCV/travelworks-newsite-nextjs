import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BadgeDollarSign, CloudUpload, Handshake, Workflow } from 'lucide-react';

import WhyTravelworksSection, {
  type WhyTravelworksItem,
} from '@/app/[locale]/components/why-travelworks-section';

const customItems: WhyTravelworksItem[] = [
  {
    id: 'finance',
    title: 'Financial Visibility and Automation',
    description: 'Keep invoicing and accounting synchronized with automated flows and cleaner controls.',
    iconComponent: BadgeDollarSign,
  },
  {
    id: 'engines',
    title: 'Booking Engine and GDS Connectivity',
    description: 'Integrate your reservation ecosystem in one workspace to reduce manual handoffs.',
    iconComponent: Workflow,
  },
  {
    id: 'cloud',
    title: 'Cloud-first Operations Platform',
    description: 'Scale confidently with a reliable cloud setup built for distributed teams.',
    iconComponent: CloudUpload,
  },
  {
    id: 'crm',
    title: 'CRM and Growth Marketing Toolkit',
    description: 'Activate personalized communications and strengthen loyalty across customer journeys.',
    iconComponent: Handshake,
  },
];

const meta = {
  title: 'App/WhyTravelworksSection',
  component: WhyTravelworksSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof WhyTravelworksSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomContent: Story = {
  args: {
    headingPrefix: 'Why',
    headingEmphasis: 'TravelWorks Platform?',
    items: customItems,
  },
};