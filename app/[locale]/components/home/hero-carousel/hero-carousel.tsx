'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useMemo, useRef, useState } from 'react';
import { A11y, Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper/types';
import { useTranslations } from 'next-intl';
import type { HeroSlide } from './type';

import 'swiper/css';
import 'swiper/css/effect-fade';

type HeroCarouselProps = {
  slides?: HeroSlide[];
  effect?: 'fade';
  navigation?: boolean;
  pagination?: boolean;
  contentAlignment?: 'left' | 'right' | 'alternate';
};

const backgrounds = [
  'bg-[radial-gradient(circle_at_85%_34%,rgba(255,170,59,0.9)_0_28%,transparent_29%),linear-gradient(135deg,#ffffff_0%,#f8fafc_45%,#eef3fb_100%)]',
  'bg-[radial-gradient(circle_at_78%_24%,rgba(243,112,34,0.75)_0_24%,transparent_25%),linear-gradient(130deg,#ffffff_0%,#f0f6ff_52%,#e7eefc_100%)]',
  'bg-[radial-gradient(circle_at_86%_30%,rgba(255,170,59,0.75)_0_26%,transparent_27%),linear-gradient(120deg,#ffffff_0%,#f6f9ff_45%,#ecf2fd_100%)]',
];

export default function HeroCarousel({
  slides = [],
  effect = 'fade',
  navigation = true,
  pagination = true,
  contentAlignment = 'alternate',
}: HeroCarouselProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const t = useTranslations('home.hero-caroussel');

  const stripHtml = (s: string) => s.replace(/<[^>]+>/g, '');

  const items: HeroSlide[] = useMemo(() => {
    if (slides.length) return slides;

    return [
      {
        id: 'slide-1',
        title: String(t.raw('concept.title')),
        ctaLabel: t('concept.cta'),
        ctaHref: '/travel-agency-software',
        image: '/images/components/hero-carousel/hero.png',
        contentPosition: 'left',
      },
      {
        id: 'slide-2',
        title: String(t.raw('promo.title')),
        ctaLabel: t('promo.cta'),
        ctaHref: '/solutions',
        image: '/images/components/hero-carousel/hero.png',
        contentPosition: 'right',
      },
      {
        id: 'slide-3',
        title: String(t.raw('tourOnline.title')),
        ctaLabel: t('tourOnline.cta'),
        ctaHref: '/online-booking',
        image: '/images/components/hero-carousel/hero.png',
        contentPosition: 'left',
      },
    ];
  }, [slides, t]);

  return (
    <section
      className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-2xl border border-neutral-border shadow-[0_10px_35px_rgba(11,30,74,0.12)]"
      aria-label="Hero carousel"
    >
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
        {items.map((slide, index) => {
          const effectiveAlignment =
            slide.contentPosition ??
            (contentAlignment === 'alternate'
              ? index % 2 === 0
                ? 'left'
                : 'right'
              : contentAlignment);

          const textOrderClass =
            effectiveAlignment === 'left' ? 'lg:order-1' : 'lg:order-2';

          const mediaOrderClass =
            effectiveAlignment === 'left' ? 'lg:order-2' : 'lg:order-1';

          return (
            <SwiperSlide key={slide.id}>
              <article
                className={`relative h-full w-full overflow-hidden ${
                  backgrounds[index % backgrounds.length]
                }`}
              >
                <div className="pointer-events-none absolute -left-24 bottom-0 h-56 w-56 rounded-full bg-white/75 blur-sm sm:h-72 sm:w-72" />
                <div className="pointer-events-none absolute left-1/4 top-0 h-full w-24 rotate-12 bg-white/35" />
                <div className="pointer-events-none absolute right-0 top-0 h-full w-[44%] bg-white/20" />

                <div className="relative z-10 flex h-full flex-col lg:flex-row">
                  {/* TEXT */}
                  <div
                    className={`order-2 flex h-[46%] flex-col justify-center px-6 pb-12 text-brand-blue sm:px-10 ${textOrderClass} lg:h-full lg:w-1/2 lg:px-12 lg:pb-16`}
                  >
                    <h2
                      className="mt-3 max-w-xl text-4xl leading-[1.08] tracking-tight text-brand-blue"
                      dangerouslySetInnerHTML={{ __html: slide.title }}
                    />

                    <div className="mt-7">
                      <a
                        href={slide.ctaHref}
                        className="inline-flex rounded-lg bg-brand-blue px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-all duration-300 hover:scale-[1.03] hover:bg-brand-sky"
                      >
                        {slide.ctaLabel}
                      </a>
                    </div>
                  </div>

                  {/* IMAGE */}
                  <div
                    className={`order-1 h-[54%] px-4 pt-6 sm:px-8 sm:pt-8 ${mediaOrderClass} lg:h-full lg:w-1/2 lg:px-12 lg:py-12`}
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/45 bg-white/15 shadow-2xl">
                      <Image
                        src={slide.image}
                        alt={stripHtml(slide.title)}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="w-screen h-[50vw] object-cover"
                      />
                    </div>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* NAVIGATION */}
      {navigation && (
        <>
          <button
            type="button"
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 text-brand-blue hover:scale-110"
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-9 w-9 sm:h-10 sm:w-10" />
          </button>

          <button
            type="button"
            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 text-brand-blue hover:scale-110"
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next slide"
          >
            <ChevronRight className="h-9 w-9 sm:h-10 sm:w-10" />
          </button>
        </>
      )}

      {/* PAGINATION */}
      {pagination && (
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
          {items.map((slide, index) => {
            const isActive = activeSlide === index;

            return (
              <button
                key={`${slide.id}-dot`}
                type="button"
                onClick={() => swiperRef.current?.slideToLoop(index)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-brand-blue'
                    : 'bg-neutral-muted opacity-40 hover:opacity-70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}