import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import CustomersTrustSection, {
  type CustomerTrustItem,
} from '@/app/[locale]/components/customers-trust-section';

const customItems: CustomerTrustItem[] = [
  { id: 'atlas', name: 'Atlas Voyages' },
  { id: 'horizon', name: 'Horizon Holidays' },
  { id: 'northern', name: 'Northern Routes' },
  { id: 'coastal', name: 'Coastal Escapes' },
  { id: 'city', name: 'City Breaks Co.' },
  { id: 'aurora', name: 'Aurora Travel Network' },
];

const meta = {
  title: 'App/CustomersTrustSection',
  component: CustomersTrustSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CustomersTrustSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomItems: Story = {
  args: {
    headingPrefix: 'Trusted by',
    headingEmphasis: 'Leading Travel Brands',
    headingSuffix: 'worldwide',
    items: customItems,
    buttonLabel: 'View Client Stories',
  },
};