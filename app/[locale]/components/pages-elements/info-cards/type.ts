import type { LucideIcon } from 'lucide-react';

export type InfoCard = {
  title: string;
  description: string;
  icon: LucideIcon;
  cta?: boolean;
  ctaLabel?: string;
  ctaLink?: string;
};

export type InfoCards = {
  blockType: 'InfoCards';
  cards: InfoCard[];
};
