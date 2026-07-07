import type { LucideIcon } from 'lucide-react';

export type CardIcon = {
  id: number;
  title: string;
  description: string;
  Icon: LucideIcon;
  iconBg?: string;
  iconColor?: string;
};

export type CardsIconsSection = {
  blockType: 'CardsIcons';
  cards?: CardIcon[];
  title?: string;
};
