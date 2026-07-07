import { type LucideIcon } from 'lucide-react';

export type FeaturesCardsHighlights = {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  linkTitle?: string;
  linkUrl?: string;
};

export type FeaturesHighlights = {
  blockType: 'FeaturesHighlights';
  cards: FeaturesCardsHighlights[];
};

export type FeaturesHighlightsSectionProps = {
  cards: FeaturesCardsHighlights[];
};
