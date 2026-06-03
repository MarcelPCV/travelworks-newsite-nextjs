'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import { A11y, Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/effect-fade';

export type HeroContentPosition = 'left' | 'right';
export type HeroContentAlignment = HeroContentPosition | 'alternate';

export type HeroSlide = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  background: string;
  mediaGradient: string;
  mediaCaption: string;
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

const fallbackSlides: HeroSlide[] = [
  {
    id: 'travelworks-suite',
    eyebrow: 'TravelWorks Platform',
    title: 'A comprehensive solution',
    description: 'Booking, CRM, inventory, billing, accounting and marketing in one elegant workspace.',
    ctaLabel: 'Discover Tour Online',
    background:
      'bg-[radial-gradient(circle_at_85%_35%,rgba(255,170,59,0.92)_0_28%,transparent_29%),linear-gradient(135deg,#ffffff_0%,#f8fafc_45%,#eef3fb_100%)]',
    mediaGradient: 'bg-[linear-gradient(155deg,#2e5cb3_0%,#3c79da_45%,#0b1e4a_100%)]',
    mediaCaption: 'For the perfect vacations',
  },
  {
    id: 'smart-operations',
    eyebrow: 'Operations Intelligence',
    title: 'Scale travel operations faster',
    description: 'Sync teams, automate itineraries, and monitor margins in real time from one command center.',
    ctaLabel: 'Explore Platform',
    background:
      'bg-[radial-gradient(circle_at_80%_26%,rgba(243,112,34,0.7)_0_24%,transparent_25%),linear-gradient(130deg,#ffffff_0%,#f0f6ff_52%,#e7eefc_100%)]',
    mediaGradient: 'bg-[linear-gradient(145deg,#0b1e4a_0%,#2e5cb3_40%,#3c79da_100%)]',
    mediaCaption: 'Revenue and inventory intelligence',
  },
  {
    id: 'connected-journeys',
    eyebrow: 'Unified Journeys',
    title: 'Design travel stories clients love',
    description: 'Launch campaigns, personalize experiences, and convert faster with connected data and workflows.',
    ctaLabel: 'View Product Tour',
    background:
      'bg-[radial-gradient(circle_at_86%_30%,rgba(255,170,59,0.78)_0_26%,transparent_27%),linear-gradient(120deg,#ffffff_0%,#f6f9ff_45%,#ecf2fd_100%)]',
    mediaGradient: 'bg-[linear-gradient(150deg,#2e5cb3_0%,#0b1e4a_55%,#3c79da_100%)]',
    mediaCaption: 'Data-rich experiences for every channel',
  },
];

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

    return fallbackSlides;
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

          return (
            <SwiperSlide key={slide.id}>
              <article className={`relative h-full w-full overflow-hidden ${slide.background}`}>
              <div className="pointer-events-none absolute -left-24 bottom-0 h-56 w-56 rounded-full bg-white/75 blur-sm sm:h-72 sm:w-72" />
              <div className="pointer-events-none absolute left-1/4 top-0 h-full w-24 rotate-12 bg-white/35" />
              <div className="pointer-events-none absolute right-0 top-0 h-full w-[44%] bg-white/20" />

              <div className="relative z-10 flex h-full flex-col lg:flex-row">
                <div
                  className={`order-2 flex h-[46%] flex-col justify-center px-6 pb-12 text-brand-blue sm:px-10 ${textOrderClass} lg:h-full lg:w-1/2 lg:px-12 lg:pb-16`}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-muted sm:text-sm">
                    {slide.eyebrow}
                  </p>
                  {index === 0 ? (
                    <h1 className="mt-3 max-w-xl text-4xl font-semibold leading-[1.08] tracking-tight text-brand-blue sm:text-5xl lg:text-6xl">
                      {slide.title}
                    </h1>
                  ) : (
                    <h2 className="mt-3 max-w-xl text-4xl font-semibold leading-[1.08] tracking-tight text-brand-blue sm:text-5xl lg:text-6xl">
                      {slide.title}
                    </h2>
                  )}
                  <p className="mt-4 max-w-xl text-lg leading-relaxed text-neutral-dark sm:text-xl">{slide.description}</p>
                  <div className="mt-7">
                    <button
                      type="button"
                      className="rounded-lg bg-brand-blue px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-all duration-300 hover:scale-[1.03] hover:bg-brand-sky focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
                    >
                      {slide.ctaLabel}
                    </button>
                  </div>
                </div>

                <div
                  className={`order-1 h-[54%] px-4 pt-6 sm:px-8 sm:pt-8 ${mediaOrderClass} lg:h-full lg:w-1/2 lg:px-12 lg:py-12`}
                >
                  <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/45 bg-white/15 shadow-2xl backdrop-blur-[1px]">
                    <div className={`absolute inset-0 ${slide.mediaGradient}`} />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_24%,rgba(255,255,255,0.32)_0_22%,transparent_40%)]" />
                    <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-brand-navy/80 to-transparent" />

                    <div className="absolute left-5 top-5 h-12 w-28 rounded-md border border-white/50 bg-white/15 backdrop-blur-sm" />
                    <div className="absolute left-10 top-24 h-20 w-36 rounded-lg border border-white/45 bg-white/15 backdrop-blur-sm sm:h-24 sm:w-44" />
                    <div className="absolute right-8 top-16 h-28 w-16 rounded-xl border border-white/50 bg-white/20 backdrop-blur-sm sm:h-36 sm:w-20" />
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