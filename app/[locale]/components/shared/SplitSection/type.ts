import { ReactNode } from 'react';

export type ImagePosition = 'left' | 'right';

export type SplitSectionModel = {
  blockType: 'SplitSection';
  heading: ReactNode;
  description: ReactNode;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: ImagePosition;
  className?: string;
  ctaLabel?: string;
  ctaLink?: string;
  backgroundClass?: string;
};
