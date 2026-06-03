import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ArrowRight, LogIn } from 'lucide-react';

import CtaButton from '@/app/[locale]/components/ui/cta-button';

const meta = {
  title: 'App/CtaButton',
  component: CtaButton,
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
    icon: { control: false },
    iconPosition: {
      control: { type: 'inline-radio' },
      options: ['before', 'after'],
    },
  },
} satisfies Meta<typeof CtaButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Blue: Story = {
  args: {
    label: 'Log In',
    variant: 'default',
    size: 'base',
    icon: <LogIn aria-hidden="true" />,
    iconPosition: 'after',
  },
};

export const OrangeGradient: Story = {
  args: {
    label: 'Ask For A Demo',
    variant: 'orangeGradient',
    size: 'base',
  },
};

export const IconBefore: Story = {
  args: {
    label: 'Get Started',
    variant: 'blue',
    size: 'base',
    icon: <ArrowRight aria-hidden="true" />,
    iconPosition: 'before',
  },
};

export const IconAfter: Story = {
  args: {
    label: 'Get Started',
    variant: 'blue',
    size: 'base',
    icon: <LogIn aria-hidden="true" />,
    iconPosition: 'after',
  },
};

export const NoIcon: Story = {
  args: {
    label: 'Get Started',
    variant: 'blue',
    size: 'base',
  },
};

export const SizesOnDarkSurface: Story = {
  args: {
    label: 'Sizes On Dark Surface',
  },
  render: () => (
    <div className="bg-[#020b1a] px-5 py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-4">
        <CtaButton label="Extra small" variant="blue" size="xs" />
        <CtaButton label="Small" variant="blue" size="sm" />
        <CtaButton label="Base" variant="blue" size="base" />
        <CtaButton label="Large" variant="blue" size="lg" />
        <CtaButton label="Extra large" variant="blue" size="xl" />
      </div>
    </div>
  ),
};

export const VariantsOnDarkSurface: Story = {
  args: {
    label: 'Variants On Dark Surface',
  },
  render: () => (
    <div className="bg-[#020b1a] px-5 py-8">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-4">
        <CtaButton label="Default" variant="default" size="base" />
        <CtaButton label="Secondary" variant="secondary" size="base" />
        <CtaButton label="Tertiary" variant="tertiary" size="base" />
        <CtaButton label="Success" variant="success" size="base" />
        <CtaButton label="Danger" variant="danger" size="base" />
        <CtaButton label="Warning" variant="warning" size="base" />
        <CtaButton label="Dark" variant="dark" size="base" />
        <CtaButton label="Ghost" variant="ghost" size="base" />
      </div>
    </div>
  ),
};

export const SizesOnLightSurface: Story = {
  args: {
    label: 'Sizes On Light Surface',
  },
  render: () => (
    <div className="bg-[#f5f6f8] px-5 py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-4">
        <CtaButton label="Extra small" variant="blue" size="xs" />
        <CtaButton label="Small" variant="blue" size="sm" />
        <CtaButton label="Base" variant="blue" size="base" />
        <CtaButton label="Large" variant="blue" size="lg" />
        <CtaButton label="Extra large" variant="blue" size="xl" />
      </div>
    </div>
  ),
};
