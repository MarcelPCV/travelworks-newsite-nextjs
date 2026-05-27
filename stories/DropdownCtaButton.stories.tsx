import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { KeyRound, ShieldCheck, UserCog } from 'lucide-react';

import DropdownCtaButton from '@/app/[locale]/components/dropdown-cta-button';

const defaultOptions = [
  { id: 'travel-agent', label: 'Travel Agent Login', icon: <UserCog aria-hidden="true" />, href: '#' },
  { id: 'back-office', label: 'Back Office Login', icon: <KeyRound aria-hidden="true" />, href: '#' },
  { id: 'customer-portal', label: 'Customer Portal', icon: <ShieldCheck aria-hidden="true" />, href: '#' },
];

const meta = {
  title: 'App/DropdownCtaButton',
  component: DropdownCtaButton,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    variant: {
      control: { type: 'inline-radio' },
      options: ['default', 'secondary', 'tertiary', 'success', 'danger', 'warning', 'dark', 'ghost', 'blue', 'orangeGradient'],
    },
    size: {
      control: { type: 'inline-radio' },
      options: ['xs', 'sm', 'base', 'lg', 'xl'],
    },
    align: {
      control: { type: 'inline-radio' },
      options: ['left', 'right'],
    },
  },
} satisfies Meta<typeof DropdownCtaButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Blue: Story = {
  args: {
    label: 'LOG IN',
    variant: 'blue',
    size: 'xs',
    align: 'left',
    options: defaultOptions,
  },
  render: (args) => (
    <div className="bg-[#f2f2f2] px-6 py-10">
      <DropdownCtaButton {...args} />
    </div>
  ),
};

export const OrangeGradient: Story = {
  args: {
    label: 'MENU',
    variant: 'orangeGradient',
    size: 'sm',
    align: 'left',
    options: defaultOptions,
  },
  render: (args) => (
    <div className="bg-[#f2f2f2] px-6 py-10">
      <DropdownCtaButton {...args} />
    </div>
  ),
};

export const RightAligned: Story = {
  args: {
    label: 'LOG IN',
    variant: 'blue',
    size: 'xs',
    align: 'right',
    options: defaultOptions,
  },
  render: (args) => (
    <div className="bg-[#f2f2f2] px-6 py-10">
      <div className="mx-auto flex max-w-5xl justify-end">
        <DropdownCtaButton {...args} />
      </div>
    </div>
  ),
};
