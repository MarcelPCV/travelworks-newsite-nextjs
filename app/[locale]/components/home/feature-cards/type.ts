import { ReactNode } from 'react';

export type FeatureCard = {
  id: string;
  title: string;
  ctaHref: string;
  image: MediaImage;
};

export type MediaImage = {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  priority?: boolean;
};

export type FeatureCardsSection = {
  blockType: "FeatureCards";
  title: ReactNode;
  items: FeatureCard[];
};

export type FeatureCardsSectionData = Omit<FeatureCardsSection, 'title'> & {
  title: string;
};