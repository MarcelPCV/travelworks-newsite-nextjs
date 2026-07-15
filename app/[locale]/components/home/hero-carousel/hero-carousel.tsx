'use client';

import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { A11y, Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper/types';
import type { HeroCarouselSection } from './type';
import CtaButton from '../../ui/cta-button';

import 'swiper/css';
import 'swiper/css/effect-fade';

export default function HeroCarousel({
  slides,
  effect = 'fade',
  navigation = true,
  pagination = true,
  contentAlignment = 'alternate',
}: HeroCarouselSection) {
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const stripHtml = (value: string) => value.replace(/<[^>]+>/g, '');

  return (
    <section
      className="relative mx-auto w-full max-w-[1600px] aspect-[8/11] sm:aspect-[8/8] md:aspect-[16/5] overflow-hidden rounded-md border border-neutral-border shadow-[0_10px_35px_rgba(11,30,74,0.12)]"
      aria-label="Hero carousel"
    >
      <Swiper
        modules={[EffectFade, Autoplay, A11y]}
        effect={effect}
        fadeEffect={{ crossFade: true }}
        speed={420}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        onSwiper={(instance) => {
          swiperRef.current = instance;
        }}
        onSlideChange={(instance) => {
          setActiveSlide(instance.realIndex);
        }}
        className="h-full w-full"
      >
        {slides.map((slide, index) => {
          const effectiveAlignment =
            slide.contentPosition ??
            (contentAlignment === 'alternate'
              ? index % 2 === 0
                ? 'left'
                : 'right'
              : contentAlignment);
          return (
            <SwiperSlide key={slide.id}>
              <article
                className={`
                  relative
                  h-full
                  w-full
                  overflow-hidden
                `}
              >
                {/* Desktop background image */}
                <Image
                  src={slide.desktopImage}
                  alt=""
                  fill
                  priority={index === 0}
                  className="
                    hidden
                    md:block
                    object-cover
                    pointer-events-none
                    select-none
                    opacity-100
                  "
                />

                {/* Content */}
                <div
                  className={`relative z-10 h-full ${
                    effectiveAlignment === 'right'
                      ? 'md:flex md:justify-end'
                      : 'md:flex md:justify-start'
                  }`}
                >
                  {/* ================= MOBILE ================= */}
                  <div className="flex h-full flex-col items-center md:hidden">
                    {/* Image - 70% */}
                    <div className="relative h-[60%] sm:h-[70%] w-full">
                      <Image
                        src={slide.mobileImage}
                        alt={stripHtml(slide.titlePlain ?? '')}
                        fill
                        priority={index === 0}
                        sizes="100vw"
                        className="object-cover"
                      />
                    </div>

                    {/* Text - 30% */}
                    <div className="flex h-[35%] flex-col items-center justify-center px-8 text-center">
                      <h2 className="text-xl text-brand-blue">
                        {slide.titleRich ?? slide.titlePlain ?? slide.title}
                      </h2>

                      {slide.ctaLabel && slide.ctaHref && (
                        <a href={slide.ctaHref}>
                          <CtaButton
                            label={slide.ctaLabel}
                            variant="default"
                            size="sm"
                            icon={<ArrowRight className="h-6 w-6" strokeWidth={2.4} />}
                            iconPosition="after"
                            className="mt-2 sm:mt-4"
                          />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* ================= DESKTOP ================= */}
                  <div className="hidden h-full items-center md:flex">
                    <div className="md:max-w-[500px] xl:max-w-2xl px-8 md:px-20 lg:px-22">
                      <h2 className="md:text-xl xl:text-3xl text-brand-blue">
                        {slide.titleRich ?? slide.titlePlain ?? slide.title}
                      </h2>

                      <div className="md:mt-4 lg:mt-8">
                        {slide.ctaLabel && slide.ctaHref && (
                          <a href={slide.ctaHref}>
                            <CtaButton
                              label={slide.ctaLabel}
                              variant="default"
                              size="sm"
                              icon={<ArrowRight className="h-6 w-6" strokeWidth={2.4} />}
                              iconPosition="after"
                              className="md:mt-4 lg:mt-6"
                            />
                          </a>
                        )}
                      </div>
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
            className="
              absolute
              left-3
              top-1/2
              z-20
              -translate-y-1/2
              text-brand-blue
              transition-transform
              hover:scale-110
            "
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous slide"
          >
            <ChevronLeft
              className="
                h-9
                w-9
                sm:h-10
                sm:w-10
              "
            />
          </button>

          <button
            type="button"
            className="
              absolute
              right-3
              top-1/2
              z-20
              -translate-y-1/2
              text-brand-blue
              transition-transform
              hover:scale-110
            "
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next slide"
          >
            <ChevronRight
              className="
                h-9
                w-9
                sm:h-10
                sm:w-10
              "
            />
          </button>
        </>
      )}

      {/* PAGINATION */}
      {pagination && (
        <div
          className="
            absolute
            bottom-4
            left-1/2
            z-20
            flex
            -translate-x-1/2
            items-center
            gap-3
            px-2
            py-1
            rounded-full
            bg-white/75
          "
        >
          {slides.map((slide, index) => {
            const isActive = activeSlide === index;

            return (
              <button
                key={`${slide.id}-dot`}
                type="button"
                onClick={() => swiperRef.current?.slideToLoop(index)}
                className={`
                  h-3
                  w-3
                  rounded-full
                  transition-all
                  duration-300
                  ${isActive ? 'bg-brand-blue' : 'bg-neutral-muted opacity-40 hover:opacity-70'}
                `}
                aria-label={`Go to slide ${index + 1}`}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
