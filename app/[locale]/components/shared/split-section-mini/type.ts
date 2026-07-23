import { ReactNode } from 'react';

export type ImagePosition = 'left' | 'right';

export type SplitSectionMiniModel = {
  blockType: 'SplitSectionMini';
  heading: ReactNode;
  description: ReactNode;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: ImagePosition;
  imageMaxWidth?: string;
  className?: string;
  ctaLabel?: string;
  ctaLink?: string;
};
