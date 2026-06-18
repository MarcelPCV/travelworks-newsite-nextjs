import {
  type LucideIcon,
} from 'lucide-react';

export type FeaturesCardsHighlights = {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
};

export type FeaturesHighlights = {
  blockType: "block-type-features-highlights"
  cards: FeaturesCardsHighlights[];
};

