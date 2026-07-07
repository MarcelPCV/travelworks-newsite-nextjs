import { ReactNode } from 'react';

export type ImagePosition = 'left' | 'right';

export type SplitBannerSectionModel = {
  blockType: 'SplitBannerSection';
  title: string;
  heading: string;
  description: ReactNode;
  imageSrc: string;
  imageAlt: string;
  imageSecondarySrc?: string;
  imageSecondaryAlt?: string;
  imagePosition?: ImagePosition;
  className?: string;
  ctaLabel?: string;
  ctaLink?: string;
  backgroundColor?: string;
};
