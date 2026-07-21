'use client';

import Image from 'next/image';
import { PageHeroModel } from './type';

export default function PageHero({
  title,
  description,
  mobileTopImageSrc,
  desktopMainImageSrc,
  logoImageSrc,
  ctaImageSrc,
  logoWidth = 440,
  ctaWidth = 160,
}: PageHeroModel) {
  return (
    <section
      className="relative mx-auto w-full overflow-hidden bg-[#e5e5e5]"
      aria-labelledby="features-hero-title"
    >
      <div className="slider-bg inset-0 z-0"></div>
      <div className="relative z-10 mx-auto w-full max-w-[1600px] lg:px-8">
        <div className="grid w-full lg:min-h-140 lg:grid-cols-[1fr_1.22fr] lg:gap-8 lg:py-3">
          <div className="flex flex-col lg:justify-center">
            {mobileTopImageSrc ? (
              <div className="relative aspect-video w-full lg:hidden">
                <Image
                  src={mobileTopImageSrc}
                  alt="Travelworks hero highlight"
                  fill
                  priority
                  className="rounded-md object-cover shadow-2xl"
                  sizes="100vw"
                />
              </div>
            ) : (
              <div className="aspect-video w-full rounded-sm lg:hidden" aria-hidden="true" />
            )}

            <div className="px-6 pt-4 pb-10 text-center sm:px-10 sm:pb-12 lg:px-0 lg:pt-0 lg:pb-0">
              {logoImageSrc && (
                <div className="flex justify-center">
                  <Image
                    src={logoImageSrc}
                    alt="Travelworks logo image"
                    width={logoWidth}
                    height={Math.round(logoWidth * 0.45)}
                    className="h-auto"
                  />
                </div>
              )}

              <h1
                id="features-hero-title"
                className="mt-5 text-3xl font-semibold uppercase tracking-wide text-brand-blue lg:mt-7"
              >
                {title}
              </h1>

              <p className="mx-auto mt-4 max-w-[500px] text-[1.2rem] leading-tight text-neutral-dark">
                {description}
              </p>

              <div className="mt-10 flex w-full justify-center">
                {ctaImageSrc && (
                  <Image
                    src={ctaImageSrc}
                    alt="Travelworks call to action image"
                    width={ctaWidth}
                    height={Math.round(ctaWidth * 0.3125)}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="relative hidden items-center justify-center lg:flex">
            {desktopMainImageSrc ? (
              <div className="relative h-[86%] w-full max-w-215 overflow-hidden rounded-sm">
                <Image
                  src={desktopMainImageSrc}
                  alt="Travelworks platform preview"
                  fill
                  priority
                  className="rounded-2xl border-2 border-white object-cover"
                  sizes="50vw"
                />
              </div>
            ) : (
              <div className="h-[86%] w-full max-w-215 rounded-sm" aria-hidden="true" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
