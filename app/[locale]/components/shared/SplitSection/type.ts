import { ReactNode } from 'react';

export type ImagePosition = 'left' | 'right';

export type SplitSectionModel = {
  blockType: "SplitSection";
  heading: string;
  description: ReactNode;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: ImagePosition;
  className?: string;
  ctaLabel?: string;
  ctaLink?: string;
}