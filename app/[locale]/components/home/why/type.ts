import {
  type LucideIcon,
} from 'lucide-react';
import type { ReactNode } from 'react';

export type WhyTravelworksItem = {
  id: number;
  title: string;
  description: string;
  icon?: ReactNode;
  iconComponent?: LucideIcon;
};
