import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import HeroCarousel, { type HeroSlide } from '@/app/[locale]/components/old-components/hero-carousel';

const perSlideOverrideSlides: HeroSlide[] = [
  {
    id: 'override-1',
    eyebrow: 'Back-office intelligence',
    title: 'Run faster, smarter operations',
    description: 'Track departures, margins and inventory in one responsive workspace built for travel teams.',
    ctaLabel: 'Explore Platform',
    background:
      'bg-[radial-gradient(circle_at_80%_26%,rgba(243,112,34,0.7)_0_24%,transparent_25%),linear-gradient(130deg,#ffffff_0%,#f0f6ff_52%,#e7eefc_100%)]',
    mediaGradient: 'bg-[linear-gradient(145deg,#0b1e4a_0%,#2e5cb3_40%,#3c79da_100%)]',
    mediaCaption: 'Revenue and inventory intelligence',
    contentPosition: 'right',
  },
  {
    id: 'override-2',
    eyebrow: 'Connected customer journeys',
    title: 'From campaign to conversion',
    description: 'Coordinate marketing, sales and service around one source of truth to improve every booking funnel.',
    ctaLabel: 'View Product Tour',
    background:
      'bg-[radial-gradient(circle_at_86%_30%,rgba(255,170,59,0.75)_0_26%,transparent_27%),linear-gradient(120deg,#ffffff_0%,#f6f9ff_45%,#ecf2fd_100%)]',
    mediaGradient: 'bg-[linear-gradient(150deg,#2e5cb3_0%,#0b1e4a_55%,#3c79da_100%)]',
    mediaCaption: 'Data-rich experiences for every channel',
  },
  {
    id: 'override-3',
    eyebrow: 'TravelWorks platform',
    title: 'A comprehensive solution',
    description: 'Booking, CRM, inventory, billing, accounting and marketing in one elegant workspace.',
    ctaLabel: 'Discover Tour Online',
    background:
      'bg-[radial-gradient(circle_at_85%_35%,rgba(255,170,59,0.92)_0_28%,transparent_29%),linear-gradient(135deg,#ffffff_0%,#f8fafc_45%,#eef3fb_100%)]',
    mediaGradient: 'bg-[linear-gradient(155deg,#2e5cb3_0%,#3c79da_45%,#0b1e4a_100%)]',
    mediaCaption: 'For the perfect vacations',
    contentPosition: 'right',
  },
];

const meta = {
  title: 'App/HeroCarousel',
  component: HeroCarousel,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    contentAlignment: {
      control: { type: 'inline-radio' },
      options: ['left', 'right', 'alternate'],
    },
  },
} satisfies Meta<typeof HeroCarousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    navigation: true,
    pagination: true,
    effect: 'fade',
    contentAlignment: 'alternate',
  },
};

export const WithoutControls: Story = {
  args: {
    navigation: false,
    pagination: false,
    effect: 'fade',
  },
};

export const LeftAligned: Story = {
  args: {
    navigation: true,
    pagination: true,
    effect: 'fade',
    contentAlignment: 'left',
  },
};

export const RightAligned: Story = {
  args: {
    navigation: true,
    pagination: true,
    effect: 'fade',
    contentAlignment: 'right',
  },
};

export const PerSlideOverride: Story = {
  args: {
    navigation: true,
    pagination: true,
    effect: 'fade',
    contentAlignment: 'left',
    slides: perSlideOverrideSlides,
  },
};