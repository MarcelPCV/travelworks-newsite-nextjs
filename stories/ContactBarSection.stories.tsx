import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ContactBarSection from '@/app/[locale]/components/contact-bar-section';
import React from 'react';

const Logo = (
  <svg width="96" height="32" viewBox="0 0 96 32" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
    <rect width="96" height="32" rx="6" fill="#0B1E4A" />
    <text x="12" y="20" fill="white" fontSize="12" fontFamily="Poppins, sans-serif" fontWeight="600">
      Logo
    </text>
  </svg>
);

const meta = {
  title: 'App/ContactBarSection',
  component: ContactBarSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ContactBarSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    phone: '+1 (800) 123-4567',
    email: 'support@example.com',
    socialLinks: {
      youtube: 'https://youtube.com',
      linkedin: 'https://linkedin.com',
      facebook: 'https://facebook.com',
    },
  },
};

export const WithLogo: Story = {
  args: {
    logo: Logo,
    phone: '+1 (800) 123-4567',
    email: 'support@example.com',
  },
};

export const Compact: Story = {
  args: {
    logo: Logo,
    phone: '+44 20 1234 5678',
    email: 'info@example.co.uk',
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};
