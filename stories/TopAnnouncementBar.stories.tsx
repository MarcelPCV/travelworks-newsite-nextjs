import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import TopAnnouncementBar from '@/app/[locale]/components/top-announcement-bar';

const meta = {
  title: 'App/TopAnnouncementBar',
  component: TopAnnouncementBar,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof TopAnnouncementBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
