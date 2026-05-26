import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import PlanningDemoSection, {
  type DemoField,
} from '@/app/[locale]/components/planning-demo-section';

const customFields: DemoField[] = [
  { id: 'name', label: 'Contact name', type: 'text' },
  { id: 'email', label: 'Work email', type: 'email' },
  { id: 'phone', label: 'Direct phone', type: 'tel' },
  { id: 'team-size', label: 'Team size', type: 'text', placeholder: 'e.g. 15 advisors' },
];

const meta = {
  title: 'App/PlanningDemoSection',
  component: PlanningDemoSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof PlanningDemoSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomFields: Story = {
  args: {
    heading: 'Request a Product Demo',
    fields: customFields,
    buttonLabel: 'Request Demo',
    countryPlaceholder: 'Select your country',
  },
};