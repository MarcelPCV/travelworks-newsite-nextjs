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
  title: string;
  items: FeatureCard[];
};