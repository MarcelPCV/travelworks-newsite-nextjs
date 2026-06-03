'use client';

import HeroCarousel, { type HeroContentPosition, type HeroSlide } from '@/app/[locale]/components/hero-carousel';
import type { CmsBlock } from './types';
import { isRecord } from './types';

const backgrounds = [
  'bg-[radial-gradient(circle_at_85%_34%,rgba(255,170,59,0.9)_0_28%,transparent_29%),linear-gradient(135deg,#ffffff_0%,#f8fafc_45%,#eef3fb_100%)]',
  'bg-[radial-gradient(circle_at_78%_24%,rgba(243,112,34,0.75)_0_24%,transparent_25%),linear-gradient(130deg,#ffffff_0%,#f0f6ff_52%,#e7eefc_100%)]',
  'bg-[radial-gradient(circle_at_86%_30%,rgba(255,170,59,0.75)_0_26%,transparent_27%),linear-gradient(120deg,#ffffff_0%,#f6f9ff_45%,#ecf2fd_100%)]',
];

const mediaGradients = [
  'bg-[linear-gradient(155deg,#2e5cb3_0%,#3c79da_45%,#0b1e4a_100%)]',
  'bg-[linear-gradient(145deg,#0b1e4a_0%,#2e5cb3_40%,#3c79da_100%)]',
  'bg-[linear-gradient(150deg,#2e5cb3_0%,#0b1e4a_55%,#3c79da_100%)]',
];

function asString(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.trim() ? value : fallback;
}

function toContentPosition(value: unknown): HeroContentPosition | undefined {
  if (value === 'left' || value === 'right') {
    return value;
  }

  return undefined;
}

function toSlides(block: CmsBlock, pageTitle?: string): HeroSlide[] {
  if (!Array.isArray(block.slides)) {
    return [];
  }

  const eyebrow = asString(pageTitle, 'TravelWorks Page');

  return block.slides.map((rawSlide, index) => {
    const slide = isRecord(rawSlide) ? rawSlide : {};
    const slideImage = isRecord(slide.image) ? slide.image : {};
    const slideLink = isRecord(slide.link) ? slide.link : {};

    return {
      id: asString(slide.id, `api-slide-${index + 1}`),
      eyebrow,
      title: asString(slide.title, `Slide ${index + 1}`),
      description: asString(slide.description, 'No description available for this slide yet.'),
      ctaLabel: asString(slideLink.label, 'Learn more'),
      mediaCaption: asString(slideImage.alt, asString(slideImage.url, 'API media')),
      background: backgrounds[index % backgrounds.length],
      mediaGradient: mediaGradients[index % mediaGradients.length],
      contentPosition: toContentPosition(slide.align),
    };
  });
}

export default function CarouselBlock({ block, pageTitle }: { block: CmsBlock; pageTitle?: string }) {
  const slides = toSlides(block, pageTitle);

  if (!slides.length) {
    return null;
  }

  return (
    <div className="mx-auto w-full max-w-7xl">
      <HeroCarousel slides={slides} effect="fade" navigation pagination contentAlignment="alternate" />
    </div>
  );
}
