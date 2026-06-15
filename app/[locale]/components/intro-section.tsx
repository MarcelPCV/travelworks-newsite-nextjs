import Image from 'next/image';
import { useId } from 'react';

// --- Types ---
type ImagePosition = 'left' | 'right';

interface IntroSectionProps {
  /** Optional text above the main heading (e.g., "Featured Brand"). */
  eyebrow?: string;
  /** The main title of the section. */
  heading: string;
  /** The descriptive paragraph content. */
  description: string;
  /** URL source for the hero image. */
  imageSrc: string;
  /** Alt text for accessibility. */
  imageAlt: string;
  /** Determines if the image is on the left or right side of the text block. Defaults to 'left'. */
  imagePosition?: ImagePosition;
  /** Optional additional classes applied to the root <section> element. */
  className?: string;
}

// --- Component ---
export default function IntroSection({
  eyebrow,
  heading,
  description,
  imageSrc,
  imageAlt,
  imagePosition = 'left',
  className,
}: IntroSectionProps) {
  const headingId = useId();

  // 1. Encapsulate dynamic ordering logic for clarity
  const getOrderClasses = (position: ImagePosition) => ({
    imageOrder: position === 'right' ? 'md:order-2' : 'md:order-1',
    textOrder: position === 'right' ? 'md:order-1' : 'md:order-2',
  });

  const { imageOrder: imageOrderClassName, textOrder: textOrderClassName } = getOrderClasses(imagePosition);

  // 2. Define base classes for better separation of concerns
  const rootBaseClasses = [
    'w-full mx-auto max-w-7xl rounded-[2rem] bg-neutral-background py-5 sm:py-6 lg:py-8',
  ].join(' ');

  const contentGridClasses = `grid grid-cols-1 gap-5 overflow-hidden rounded-[1.6rem] border border-neutral-border/70 bg-white md:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] md:gap-0`;

  return (
    <section className={`${rootBaseClasses} ${className}`} aria-labelledby={headingId}>
      <div className={contentGridClasses}>
        {/* Image Container */}
        <div className={`relative min-h-68 overflow-hidden md:min-h-96 lg:min-h-112 ${imageOrderClassName}`}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 767px) 100vw, 52vw"
            className="object-cover"
          />
        </div>

        {/* Text Content Container */}
        <div className={`flex flex-col justify-center px-5 py-6 text-center sm:px-7 sm:py-8 md:px-8 md:py-10 md:text-left lg:px-10 lg:py-12 ${textOrderClassName}`}>
          {eyebrow ? (
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-blue/75 sm:text-base">{eyebrow}</p>
          ) : null}

          <h2 id={headingId} className="mt-3 text-3xl font-semibold uppercase tracking-[0.04em] text-brand-blue sm:text-[2.35rem] lg:text-[2.7rem]">
            {heading}
          </h2>

          <p className="mt-4 text-lg leading-8 text-neutral-dark sm:text-xl sm:leading-9 lg:max-w-[26ch] lg:text-[1.55rem] lg:leading-10">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}