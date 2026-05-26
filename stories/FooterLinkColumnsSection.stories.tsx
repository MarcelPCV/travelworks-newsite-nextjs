import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import FooterLinkColumnsSection, { type FooterLinkColumn } from '@/app/[locale]/components/footer-link-columns-section';

const longLabelColumns: FooterLinkColumn[] = [
  {
    id: 'solution',
    heading: 'The Solution',
    links: [
      { label: 'Integrated Feature Configuration Center', href: '#' },
      { label: 'Back Office System & Reconciliation Workflows', href: '#' },
      { label: 'Tour Management Operations Dashboard', href: '#' },
    ],
  },
  {
    id: 'benefits',
    heading: 'Benefits',
    links: [
      { label: 'Cloud Based Infrastructure for Distributed Teams', href: '#' },
      { label: 'Efficient and Scalable Processing Pipelines', href: '#' },
      { label: 'Reliable and Evolutionary Product Roadmap', href: '#' },
    ],
  },
  {
    id: 'travelworks',
    heading: 'Travelworks',
    links: [
      { label: 'About us', href: '#' },
      { label: 'Ask for a demo', href: '#' },
      { label: 'Privacy Policy and Data Governance Information', href: '#' },
    ],
  },
  {
    id: 'news',
    heading: 'News',
    links: [
      { label: 'All News', href: '#' },
      { label: 'Technology', href: '#' },
    ],
  },
];

const manyColumns: FooterLinkColumn[] = [
  {
    id: 'solution',
    heading: 'The Solution',
    links: [{ label: 'Features', href: '#' }, { label: 'Tour Online', href: '#' }],
  },
  {
    id: 'benefits',
    heading: 'Benefits',
    links: [{ label: 'Cloud Based', href: '#' }, { label: 'Reliable', href: '#' }],
  },
  {
    id: 'travelworks',
    heading: 'Travelworks',
    links: [{ label: 'Clients', href: '#' }, { label: 'Careers', href: '#' }],
  },
  {
    id: 'news',
    heading: 'News',
    links: [{ label: 'Agency Owner', href: '#' }, { label: 'Technology', href: '#' }],
  },
  {
    id: 'resources',
    heading: 'Resources',
    links: [{ label: 'Help Center', href: '#' }, { label: 'Developer Docs', href: '#' }],
  },
  {
    id: 'legal',
    heading: 'Legal',
    links: [{ label: 'Terms of Service', href: '#' }, { label: 'Cookie Policy', href: '#' }],
  },
];

const minimalColumns: FooterLinkColumn[] = [
  {
    id: 'quick-links',
    heading: 'Quick Links',
    links: [{ label: 'Home', href: '#' }, { label: 'Contact', href: '#' }],
  },
];

const meta = {
  title: 'App/FooterLinkColumnsSection',
  component: FooterLinkColumnsSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FooterLinkColumnsSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongLabels: Story = {
  args: {
    columns: longLabelColumns,
  },
};

export const ManyColumns: Story = {
  args: {
    columns: manyColumns,
  },
};

export const Minimal: Story = {
  args: {
    title: 'Minimal footer links',
    columns: minimalColumns,
    copyrightText: '© Demo Company. All rights reserved',
  },
};