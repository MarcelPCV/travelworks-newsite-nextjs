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
}: PageHeroModel) {
  const rootClassName = [
    'relative mx-auto max-w-7xl w-full overflow-hidden bg-[#e5e5e5]',
    'before:pointer-events-none before:absolute before:inset-0 before:hidden before:bg-[radial-gradient(circle_at_8%_88%,rgba(255,170,59,0.55),transparent_13%),radial-gradient(circle_at_16%_14%,rgba(255,255,255,0.5),transparent_18%),linear-gradient(132deg,rgba(255,255,255,0.54)_0%,rgba(255,255,255,0)_34%),linear-gradient(-132deg,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0)_30%),radial-gradient(circle_at_87%_17%,rgba(255,170,59,0.6),transparent_14%),radial-gradient(circle_at_80%_88%,rgba(255,170,59,0.5),transparent_12%)] before:lg:block',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={rootClassName} aria-labelledby="features-hero-title">
      <div className="mx-auto w-full max-w-7xl lg:px-8">
        <div className="grid w-full lg:min-h-140 lg:grid-cols-[1fr_1.22fr] lg:gap-8 lg:py-3">
          <div className="flex flex-col lg:justify-center">
            {mobileTopImageSrc ? (
              <div className="relative aspect-video w-full lg:hidden">
                <Image
                  src={mobileTopImageSrc}
                  alt="Travelworks hero highlight"
                  fill
                  priority
                  className="rounded-sm object-cover"
                  sizes="100vw"
                />
              </div>
            ) : (
              <div className="aspect-video w-full rounded-sm lg:hidden" aria-hidden="true" />
            )}

            <div className="px-6 pb-10 pt-4 text-center sm:px-10 sm:pb-12 lg:px-0 lg:pb-0 lg:pt-0">
              <div className="mx-auto w-full max-w-65 sm:max-w-70 lg:max-w-57.5">
                {logoImageSrc && (
                  <div className="relative aspect-auto w-full overflow-hidden rounded-sm">
                    <Image
                      src={logoImageSrc}
                      alt="Travelworks logo image"
                      width={440}
                      height={200}
                      className="h-auto w-full"
                    />
                  </div>
                )}
              </div>

              <h1
                id="features-hero-title"
                className="mt-5 text-3xl font-semibold uppercase tracking-wide text-brand-blue lg:mt-7"
              >
                {title}
              </h1>

              <p className="mx-auto mt-4 max-w-[22ch] text-[1.4rem] leading-tight text-neutral-dark sm:max-w-[24ch]">
                {description}
              </p>

              <div className="flex justify-center mt-10 w-full">
                {ctaImageSrc && (
                  <div>
                    <Image
                      src={ctaImageSrc}
                      alt="Travelworks call to action image"
                      width={160}
                      height={50}
                    />
                  </div>
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
                  className="object-cover"
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
