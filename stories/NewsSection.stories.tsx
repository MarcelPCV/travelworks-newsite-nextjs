import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import NewsSection, { type NewsItem } from '@/app/[locale]/components/news-section';

const customItems: NewsItem[] = [
  {
    id: 'automation',
    category: 'Travelworks',
    title: 'Automation upgrades that simplify invoicing and reconciliation',
    backgroundClassName:
      'bg-[linear-gradient(120deg,rgba(35,58,87,0.6)_0%,rgba(35,58,87,0.62)_52%,rgba(35,58,87,0.58)_100%),radial-gradient(circle_at_68%_22%,#96c0da_0%,#6d95be_28%,#3d638f_55%,#2a4b71_100%)]',
  },
  {
    id: 'partnerships',
    category: 'Partnerships',
    title: 'How agencies leverage integrations to accelerate team performance',
    backgroundClassName:
      'bg-[linear-gradient(120deg,rgba(55,66,84,0.55)_0%,rgba(55,66,84,0.58)_55%,rgba(55,66,84,0.52)_100%),radial-gradient(circle_at_32%_24%,#9d8a75_0%,#7a6b59_30%,#515c6f_58%,#344054_100%)]',
  },
  {
    id: 'security',
    category: 'IT Manager',
    title: 'Best practices to strengthen operational security for travel teams',
    backgroundClassName:
      'bg-[linear-gradient(120deg,rgba(22,33,54,0.64)_0%,rgba(22,33,54,0.66)_50%,rgba(22,33,54,0.62)_100%),radial-gradient(circle_at_78%_30%,#597395_0%,#35506f_30%,#213754_60%,#14253b_100%)]',
  },
];

const meta = {
  title: 'App/NewsSection',
  component: NewsSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof NewsSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomItems: Story = {
  args: {
    heading: 'Latest Updates',
    items: customItems,
  },
};
