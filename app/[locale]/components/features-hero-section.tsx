import Image from 'next/image';

type FeaturesHeroSectionProps = {
  className?: string;
  heading?: string;
  description?: string;
  mobileTopImageSrc?: string;
  desktopMainImageSrc?: string;
  logoImageSrc?: string;
  ctaImageSrc?: string;
};

function ImageSlot({
  src,
  alt,
  className,
  priority,
}: {
  src?: string;
  alt: string;
  className: string;
  priority?: boolean;
}) {
  if (!src) {
    return <div className={[className, 'rounded-sm bg-brand-orange-dark'].join(' ')} aria-hidden="true" />;
  }

  return (
    <div className={[className, 'relative overflow-hidden rounded-sm'].join(' ')}>
      <Image src={src} alt={alt} fill priority={priority} className="object-cover" sizes="(max-width: 1023px) 100vw, 50vw" />
    </div>
  );
}

export default function FeaturesHeroSection({
  className,
  heading = 'TRAVELWORKS',
  description = 'State of the art technology solutions for travel agencies and tour operators.',
  mobileTopImageSrc,
  desktopMainImageSrc,
  logoImageSrc,
  ctaImageSrc,
}: FeaturesHeroSectionProps) {
  const rootClassName = [
    'relative w-full overflow-hidden bg-[#e5e5e5]',
    'before:pointer-events-none before:absolute before:inset-0 before:hidden before:bg-[radial-gradient(circle_at_8%_88%,rgba(255,170,59,0.55),transparent_13%),radial-gradient(circle_at_16%_14%,rgba(255,255,255,0.5),transparent_18%),linear-gradient(132deg,rgba(255,255,255,0.54)_0%,rgba(255,255,255,0)_34%),linear-gradient(-132deg,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0)_30%),radial-gradient(circle_at_87%_17%,rgba(255,170,59,0.6),transparent_14%),radial-gradient(circle_at_80%_88%,rgba(255,170,59,0.5),transparent_12%)] before:lg:block',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={rootClassName} aria-labelledby="features-hero-title">
      <div className="mx-auto w-full max-w-7xl lg:px-8">
        <div className="grid w-full lg:min-h-140 lg:grid-cols-[1fr_1.22fr] lg:gap-8 lg:py-3">
          <div className="flex flex-col lg:justify-center">
            <ImageSlot
              src={mobileTopImageSrc}
              alt="Travelworks hero highlight"
              className="aspect-video w-full lg:hidden"
              priority
            />

            <div className="px-6 pb-10 pt-4 text-center sm:px-10 sm:pb-12 lg:px-0 lg:pb-0 lg:pt-0">
              <div className="mx-auto w-full max-w-65 sm:max-w-70 lg:max-w-57.5">
                <ImageSlot src={logoImageSrc} alt="Travelworks logo image" className="aspect-11/5 w-full" />
              </div>

              <h1
                id="features-hero-title"
                className="mt-5 text-4xl font-semibold uppercase tracking-wide text-brand-blue sm:text-[2.55rem] lg:mt-7 lg:text-[3rem]"
              >
                {heading}
              </h1>

              <p className="mx-auto mt-4 max-w-[22ch] text-[2rem] leading-tight text-neutral-dark sm:max-w-[24ch] sm:text-[2.2rem] lg:mt-5 lg:text-[2.35rem]">
                {description}
              </p>

              <div className="mx-auto mt-10 w-full max-w-65 sm:max-w-70 lg:mt-12 lg:max-w-57.5">
                <ImageSlot src={ctaImageSrc} alt="Travelworks call to action image" className="aspect-11/5 w-full" />
              </div>
            </div>
          </div>

          <div className="relative hidden items-center justify-center lg:flex">
            <ImageSlot
              src={desktopMainImageSrc}
              alt="Travelworks platform preview"
              className="h-[86%] w-full max-w-215"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}