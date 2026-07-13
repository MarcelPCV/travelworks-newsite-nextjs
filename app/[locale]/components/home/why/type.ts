import { type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

export type WhyTravelworksItems = {
  id: number;
  title: ReactNode;
  description: string;
  imageHref: string;
  imageAlt?: string;
  icon?: ReactNode;
  iconComponent?: LucideIcon;
  blockLink?: string;
};

export type WhyTravelworksSection = {
  blockType: 'WhyTravelworksSection';
  title: string;
  items?: WhyTravelworksItems[];
};
