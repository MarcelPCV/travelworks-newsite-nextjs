'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Fragment, type ReactNode, useMemo, useRef, useState } from 'react';
import { A11y, Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper/types';
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';
import type { CmsBlock } from './types';
import { isRecord } from './types';
import 'swiper/css';
import 'swiper/css/effect-fade'; 

export type HeroContentPosition = 'left' | 'right';
export type HeroContentAlignment = HeroContentPosition | 'alternate';

export type HeroSlide = {
  id: string;
  eyebrow: string;
  title: string;
  titleRichText?: DefaultTypedEditorState;
  description?: string;
  ctaLabel: string;
  ctaHref?: string;
  ctaNewTab?: boolean;
  background: string;
  mediaGradient: string;
  mediaCaption: string;
  mediaUrl?: string;
  mediaAlt?: string;
  contentPosition?: HeroContentPosition;
};

type HeroCarouselProps = {
  slides?: HeroSlide[];
  effect?: 'fade';
  navigation?: boolean;
  pagination?: boolean;
  contentAlignment?: HeroContentAlignment;
  className?: string;
};

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

function getString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value : undefined;
}

function joinNonEmpty(values: string[], separator: string): string {
  return values.filter(Boolean).join(separator).trim();
}

function extractLexicalNodeText(value: unknown): string {
  if (!isRecord(value)) {
    return '';
  }

  const text = getString(value.text) ?? '';
  const rawChildren = Array.isArray(value.children) ? value.children : [];
  const childrenText = joinNonEmpty(rawChildren.map(extractLexicalNodeText), ' ');

  return joinNonEmpty([text, childrenText], ' ');
}

function extractLexicalText(value: unknown): string {
  if (!isRecord(value) || !isRecord(value.root)) {
    return '';
  }

  const rawChildren = Array.isArray(value.root.children) ? value.root.children : [];
  return joinNonEmpty(rawChildren.map(extractLexicalNodeText), ' ');
}

function toSlideTitle(value: unknown, fallback: string): string {
  const plainText = getString(value);
  if (plainText) {
    return plainText;
  }

  const lexicalText = extractLexicalText(value);
  return lexicalText || fallback;
}

function toLexicalState(value: unknown): DefaultTypedEditorState | null {
  if (!isRecord(value) || !isRecord(value.root) || !Array.isArray(value.root.children)) {
    return null;
  }

  return value as DefaultTypedEditorState;
}

function hasTextFormat(format: unknown, bit: number): boolean {
  if (typeof format === 'number') {
    return (format & bit) !== 0;
  }

  return false;
}

function renderLexicalInlineNode(value: unknown, key: string): ReactNode {
  if (!isRecord(value)) {
    return null;
  }

  const type = getString(value.type);

  if (type === 'paragraph') {
    if (!Array.isArray(value.children)) {
      return null;
    }

    return (
      <Fragment key={key}>
        {value.children.map((child, index) => renderLexicalInlineNode(child, `${key}-${index}`))}
      </Fragment>
    );
  }

  if (type === 'linebreak') {
    return <br key={key} />;
  }

  if (typeof value.text === 'string') {
    let content: ReactNode = value.text;

    if (hasTextFormat(value.format, 1)) {
      content = <strong>{content}</strong>;
    }

    if (hasTextFormat(value.format, 2)) {
      content = <em>{content}</em>;
    }

    return <Fragment key={key}>{content}</Fragment>;
  }

  if (Array.isArray(value.children)) {
    return (
      <Fragment key={key}>
        {value.children.map((child, index) => renderLexicalInlineNode(child, `${key}-${index}`))}
      </Fragment>
    );
  }

  return null;
}

function renderLexicalInlineTitle(value: DefaultTypedEditorState): ReactNode {
  if (!Array.isArray(value.root.children)) {
    return null;
  }

  return value.root.children.map((child, index) => (
    <Fragment key={`title-node-${index}`}>
      {renderLexicalInlineNode(child, `title-node-${index}`)}
      {index < value.root.children.length - 1 ? ' ' : null}
    </Fragment>
  ));
}

function toSlideDescription(value: unknown): string | undefined {
  const plainText = getString(value);
  if (plainText) {
    return plainText;
  }

  const lexicalText = extractLexicalText(value);
  return lexicalText || undefined;
}

function toLinkUrl(linkValue: unknown): string | undefined {
  if (!isRecord(linkValue)) {
    return undefined;
  }

  const directUrl = getString(linkValue.url);
  if (directUrl) {
    return directUrl;
  }

  if (!isRecord(linkValue.reference)) {
    return undefined;
  }

  const referenceValue = linkValue.reference.value;
  if (!isRecord(referenceValue)) {
    return undefined;
  }

  const slug = getString(referenceValue.slug);
  if (!slug) {
    return undefined;
  }

  return slug.startsWith('/') ? slug : `/${slug}`;
}

function toLinkLabel(linkValue: unknown, fallback: string): string {
  if (!isRecord(linkValue)) {
    return fallback;
  }

  const label = getString(linkValue.label);
  if (label) {
    return label;
  }

  const text = getString(linkValue.text);
  return text || fallback;
}

function toMedia(value: unknown): { url?: string; alt?: string } {
  if (!isRecord(value)) return {}

  const raw =
    getString(value.url) ??
    getString(value.thumbnailURL)

  if (!raw) return {}

  return {
    url: raw, // 👈 CMS already returns absolute URL
    alt: getString(value.alt),
  }
}

function toContentPosition(value: unknown): HeroContentPosition | undefined {
  if (value === 'left' || value === 'right') {
    return value;
  }

  return undefined;
}

export function mapCmsBlockToHeroSlides(block: CmsBlock, pageTitle?: string): HeroSlide[] {
  if (!Array.isArray(block.slides)) {
    return [];
  }

  const eyebrow = asString(pageTitle, 'TravelWorks Page');

  return block.slides.map((rawSlide, index) => {
    const slide = isRecord(rawSlide) ? rawSlide : {};
    const slideMedia = toMedia(slide.image);
    const slideLink = isRecord(slide.link) ? slide.link : {};
    const ctaHref = toLinkUrl(slideLink);
    const titleRichText = toLexicalState(slide.title);

    return {
      id: asString(slide.id, `api-slide-${index + 1}`),
      eyebrow,
      title: toSlideTitle(slide.title, `Slide ${index + 1}`),
      titleRichText: titleRichText ?? undefined,
      description: toSlideDescription(slide.description),
      ctaLabel: toLinkLabel(slideLink, 'Learn more'),
      ctaHref,
      ctaNewTab: slideLink.newTab === true,
      mediaUrl: slideMedia.url,
      mediaAlt: slideMedia.alt,
      mediaCaption: asString(slideMedia.alt, asString(slideMedia.url, 'API media')),
      background: backgrounds[index % backgrounds.length],
      mediaGradient: mediaGradients[index % mediaGradients.length],
      contentPosition: toContentPosition(slide.align),
    };
  });
}

export function extractCarouselSlidesFromPagePayload(payload: unknown): HeroSlide[] {
  if (!isRecord(payload)) {
    return [];
  }

  if (Array.isArray(payload.slides) && payload.blockType === 'carousel-block') {
    return mapCmsBlockToHeroSlides(payload as CmsBlock, asString(payload.title ?? payload.blockName, 'TravelWorks Page'));
  }

  if (!Array.isArray(payload.layout)) {
    return [];
  }

  const pageTitle = asString(payload.title, 'TravelWorks Page');
  const mappedSlides: HeroSlide[] = [];

  for (const rawBlock of payload.layout) {
    if (!isRecord(rawBlock) || rawBlock.blockType !== 'carousel-block') {
      continue;
    }

    mappedSlides.push(...mapCmsBlockToHeroSlides(rawBlock as CmsBlock, pageTitle));
  }

  return mappedSlides;
}

export function CarouselBlock({ block, pageTitle }: { block: CmsBlock; pageTitle?: string }) {
  const slides = mapCmsBlockToHeroSlides(block, pageTitle);

  if (!slides.length) {
    return null;
  }

  return (
    <div className="mx-auto w-full max-w-7xl">
      <HeroCarousel slides={slides} effect="fade" navigation pagination contentAlignment="alternate" />
    </div>
  );
}

export default function HeroCarousel({
  slides,
  effect = 'fade',
  navigation = true,
  pagination = true,
  contentAlignment = 'alternate',
  className,
}: HeroCarouselProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const visibleSlides = useMemo(() => {
    if (slides && slides.length > 0) {
      return slides;
    }

    return [];
  }, [slides]);

  const rootClassName = [
    'relative w-full overflow-hidden rounded-2xl border border-neutral-border shadow-[0_10px_35px_rgba(11,30,74,0.12)]',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={rootClassName} aria-label="TravelWorks hero carousel">
      <Swiper
        modules={[EffectFade, Autoplay, A11y]}
        effect={effect}
        fadeEffect={{ crossFade: true }}
        speed={420}
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        onSwiper={(instance) => {
          swiperRef.current = instance;
        }}
        onSlideChange={(instance) => {
          setActiveSlide(instance.realIndex);
        }}
        className="h-[500px] sm:h-[560px] lg:h-[540px]"
      >
        {visibleSlides.map((slide, index) => {
          const effectiveAlignment: HeroContentPosition =
            slide.contentPosition ??
            (contentAlignment === 'alternate' ? (index % 2 === 0 ? 'left' : 'right') : contentAlignment);

          const textOrderClass = effectiveAlignment === 'left' ? 'lg:order-1' : 'lg:order-2';
          const mediaOrderClass = effectiveAlignment === 'left' ? 'lg:order-2' : 'lg:order-1';
          
          let imagelink: string = slide.mediaUrl || '';
          if (slide.mediaUrl) {
            const baseUrl = process.env.NEXT_PUBLIC_UPSTREAM_BASE_URL || process.env.UPSTREAM_BASE_URL || 'http://localhost:3001';
            const isAbsolute = slide.mediaUrl.startsWith('http');
            if (!isAbsolute) {
              imagelink = `${baseUrl}${slide.mediaUrl}`;
            }
          }

          console.log('Final Image Link:', imagelink);

          return (
            <SwiperSlide key={slide.id}>
              <article className={`relative h-full w-full overflow-hidden ${slide.background}`}>
              <div className="pointer-events-none absolute -left-24 bottom-0 h-56 w-56 rounded-full bg-white/75 blur-sm sm:h-72 sm:w-72" />
              <div className="pointer-events-none absolute left-1/4 top-0 h-full w-24 rotate-12 bg-white/35" />
              <div className="pointer-events-none absolute right-0 top-0 h-full w-[44%] bg-white/20" />

              <div className="relative z-10 flex h-full flex-col lg:flex-row">
                <div className={`order-2 flex h-[46%] flex-col justify-center px-6 pb-12 text-brand-blue sm:px-10 ${textOrderClass} lg:h-full lg:w-1/2 lg:px-12 lg:pb-16`}>
                  {index === 0 ? (
                    <div className="mt-3 max-w-xl text-4xl leading-[1.08] tracking-tight text-brand-blue">
                      {slide.titleRichText ? renderLexicalInlineTitle(slide.titleRichText) : slide.title}
                    </div>
                  ) : (
                    <div className="mt-3 max-w-xl text-4xl leading-[1.08] tracking-tight text-brand-blue ">
                      {slide.titleRichText ? renderLexicalInlineTitle(slide.titleRichText) : slide.title}
                    </div>
                  )}
                  <div className="mt-7">
                    <a
                      href={slide.ctaHref ?? '#'}
                      target={slide.ctaNewTab ? '_blank' : undefined}
                      rel={slide.ctaNewTab ? 'noreferrer noopener' : undefined}
                      className="inline-flex rounded-lg bg-brand-blue px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-all duration-300 hover:scale-[1.03] hover:bg-brand-sky focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
                    >
                      {slide.ctaLabel}
                    </a>
                  </div>
                </div>

                <div className={`order-1 h-[54%] px-4 pt-6 sm:px-8 sm:pt-8 ${mediaOrderClass} lg:h-full lg:w-1/2 lg:px-12 lg:py-12`}>
                  <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/45 bg-white/15 shadow-2xl backdrop-blur-[1px]">
                    {slide.mediaUrl ? (
                      <Image
                        src={imagelink}
                        alt={slide.mediaAlt ?? slide.mediaCaption}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                        priority={index === 0}
                        unoptimized
                      />
                    ) : null}
                  </div>
                </div>
              </div>
              </article>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {navigation ? (
        <>
          <button
            type="button"
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 text-brand-blue transition-all duration-300 hover:scale-110 hover:text-brand-sky focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue sm:left-5"
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-9 w-9 sm:h-10 sm:w-10" strokeWidth={2.25} />
          </button>
          <button
            type="button"
            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 text-brand-blue transition-all duration-300 hover:scale-110 hover:text-brand-sky focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue sm:right-5"
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next slide"
          >
            <ChevronRight className="h-9 w-9 sm:h-10 sm:w-10" strokeWidth={2.25} />
          </button>
        </>
      ) : null}

      {pagination ? (
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
          {visibleSlides.map((slide, index) => {
            const isActive = activeSlide === index;

            return (
              <button
                key={`${slide.id}-dot`}
                type="button"
                onClick={() => swiperRef.current?.slideToLoop(index)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  isActive ? 'bg-brand-blue opacity-100' : 'bg-neutral-muted opacity-30 hover:opacity-55'
                }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={isActive ? 'true' : undefined}
              />
            );
          })}
        </div>
      ) : null}
    </section>
  );
}