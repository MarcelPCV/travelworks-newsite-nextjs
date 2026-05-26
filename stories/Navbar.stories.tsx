import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Navbar from '@/app/[locale]/components/navbar';

const meta = {
  title: 'App/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Navbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
