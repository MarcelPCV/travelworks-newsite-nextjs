import { ReactNode } from 'react';

export type PageHeroModel = {
  blockType: 'PageHero';
  title?: ReactNode;
  description?: ReactNode;
  mobileTopImageSrc?: string;
  desktopMainImageSrc?: string;
  logoImageSrc?: string;
  logoWidth?: number;
  ctaImageSrc?: string;
  ctaWidth?: number;
};
