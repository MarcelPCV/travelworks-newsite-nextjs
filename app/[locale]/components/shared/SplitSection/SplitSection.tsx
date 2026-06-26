import Image from 'next/image';
import { useId } from 'react';
import { SplitSectionModel, ImagePosition } from './type';
import Link from 'next/link';

export default function SplitSection({
  heading,
  description,
  imageSrc,
  imageAlt,
  imagePosition = 'left',
  className,
  ctaLabel,
  ctaLink,
}: SplitSectionModel) {
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

  const contentGridClasses = `grid grid-cols-1 gap-5 overflow-hidden rounded-[1.6rem] md:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] md:gap-0`;
  const hasValidImageSrc =
    typeof imageSrc === 'string' &&
    (imageSrc.startsWith('/') || imageSrc.startsWith('http://') || imageSrc.startsWith('https://') || imageSrc.startsWith('data:'));

  return (
    <section className={`${rootBaseClasses} ${className}`} aria-labelledby={headingId}>
      <div className={contentGridClasses}>
        {/* Image Container */}
        <div className={`relative flex items-center min-h-68 overflow-hidden md:min-h-96 lg:min-h-112 ${imageOrderClassName}`}>
          {hasValidImageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt ?? ''}
              width={800}
              height={600}
            />
          ) : null}
        </div>

        {/* Text Content Container */}
        <div className={`flex flex-col justify-center px-5 py-6 text-center sm:px-7 sm:py-8 md:px-8 md:py-10 md:text-left lg:px-10 lg:py-12 ${textOrderClassName}`}>
          <h2 id={headingId} className="mt-3 text-2xl font-semibold uppercase tracking-[0.04em] text-brand-blue">
            {heading}
          </h2>

          <div className="mt-4 text-md leading-8 text-neutral-dark">
            {description}
          </div>

          {ctaLabel && ctaLink && (
            <div className="mt-8 flex justify-center md:justify-start">
              <Link
                href={ctaLink}
                className="inline-flex items-center justify-center rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue/90"
              >
                {ctaLabel}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}