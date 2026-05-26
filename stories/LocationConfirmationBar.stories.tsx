import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import LocationConfirmationBar from '@/app/[locale]/components/location-confirmation-bar';

const meta = {
  title: 'App/LocationConfirmationBar',
  component: LocationConfirmationBar,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof LocationConfirmationBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
