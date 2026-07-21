import { ReactNode } from 'react';

export type HeroSlide = {
  id: string;
  title: string;
  titleRich?: ReactNode;
  titlePlain?: string;
  ctaLabel: string;
  ctaHref: string;
  desktopImage: string;
  mobileImage: string;
  contentPosition?: 'left' | 'right';
};

export type HeroCarouselSection = {
  blockType: 'HeroCarousel';
  slides: HeroSlide[];
  effect?: 'fade';
  navigation?: boolean;
  pagination?: boolean;
  contentAlignment?: 'left' | 'right' | 'alternate';
};
