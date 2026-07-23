import Image from 'next/image';
import Link from 'next/link';
import { useId } from 'react';
import { clsx } from 'clsx';
import { SplitSectionModel } from './type';

export default function SplitSection({
  heading,
  description,
  imageSrc,
  imageAlt = '',
  imagePosition = 'left',
  className,
  backgroundClass = 'bg-neutral-light',
  ctaLabel,
  ctaLink,
}: SplitSectionModel) {
  const headingId = useId();

  const isImageRight = imagePosition === 'right';

  const hasValidImage =
    imageSrc &&
    /^(\/|https?:\/\/|data:)/.test(imageSrc);

  return (
    <section
      aria-labelledby={headingId}
      className={clsx('w-full', backgroundClass)}
    >
      <div
        className={clsx(
          'mx-auto w-full max-w-[1600px] rounded-[2rem] py-5 sm:py-6 lg:py-8',
          className
        )}
      >
        <div className="grid grid-cols-1 gap-5 overflow-hidden rounded-[1.6rem] md:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] md:gap-0">
          {/* Image */}
          <div
            className={clsx(
              'relative flex min-h-68 items-center overflow-hidden md:min-h-96 lg:min-h-112',
              isImageRight ? 'md:order-2' : 'md:order-1'
            )}
          >
            {hasValidImage && (
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={800}
                height={600}
              />
            )}
          </div>

          {/* Content */}
          <div
            className={clsx(
              'flex flex-col justify-center px-5 py-6 text-center sm:px-7 sm:py-8 md:px-8 md:py-10 md:text-left lg:px-10 lg:py-12',
              isImageRight ? 'md:order-1' : 'md:order-2'
            )}
          >
            <h2
              id={headingId}
              className="mt-3 text-2xl font-semibold uppercase tracking-[0.04em] text-brand-blue"
            >
              {heading}
            </h2>

            <div className="mt-4 text-md leading-8 text-neutral-dark">
              {description}
            </div>

            {ctaLabel && ctaLink && (
              <div className="mt-8 flex justify-center md:justify-start">
                <Link
                  href={ctaLink}
                  className="inline-flex items-center justify-center rounded-md bg-brand-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue/90"
                >
                  {ctaLabel}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}