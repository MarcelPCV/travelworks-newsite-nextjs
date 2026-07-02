import {
  type LucideIcon,
} from 'lucide-react';
import type { ReactNode } from 'react';

export type WhyTravelworksItems = {
  id: number;
  title: ReactNode;
  description: string;
  icon?: ReactNode;
  iconComponent?: LucideIcon;
}

export type WhyTravelworksSection = {
  blockType: "WhyTravelworksSection";
  title: string;
  items?: WhyTravelworksItems[];
};
