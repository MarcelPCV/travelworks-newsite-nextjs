import type { LucideIcon } from 'lucide-react';

export type CardIcon = {
  id: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  iconBg?: string;
  iconColor?: string;
};

export type CardsIconsSectionProps = {
  cards?: CardIcon[];
  title?: string;
};
