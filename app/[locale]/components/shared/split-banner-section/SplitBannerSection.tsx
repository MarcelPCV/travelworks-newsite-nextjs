import Image from 'next/image';
import { useId } from 'react';
import { SplitBannerSectionModel, ImagePosition } from './type';
import Link from 'next/link';
import TitleSection from '../../ui/title-section';

export default function SplitBannerSection({
  title,
  heading,
  description,
  imageSrc,
  imageAlt,
  imageSecondarySrc,
  imageSecondaryAlt,
  imagePosition = 'left',
  className,
  ctaLabel,
  ctaLink,
  backgroundColor,
}: SplitBannerSectionModel) {
  const headingId = useId();

  // 1. Encapsulate dynamic ordering logic for clarity
  const getOrderClasses = (position: ImagePosition) => ({
    imageOrder: position === 'right' ? 'md:order-2' : 'md:order-1',
    textOrder: position === 'right' ? 'md:order-1' : 'md:order-2',
  });

  const { imageOrder: imageOrderClassName, textOrder: textOrderClassName } =
    getOrderClasses(imagePosition);

  // 2. Define base classes for better separation of concerns
  const rootBaseClasses = [`w-full mx-auto max-w-[1600px] rounded-[2rem]`].join(
    ' ',
  );

  const normalizedBg =
    typeof backgroundColor === 'string' && backgroundColor.trim().length > 0
      ? backgroundColor.trim()
      : undefined;
  const contentGridClasses =
    'grid grid-cols-1 gap-5 overflow-hidden md:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] md:gap-0';
  const hasValidImageSrc =
    typeof imageSrc === 'string' &&
    (imageSrc.startsWith('/') ||
      imageSrc.startsWith('http://') ||
      imageSrc.startsWith('https://') ||
      imageSrc.startsWith('data:'));

  return (
    <div className="w-full bg-[#005BAA] my-10">
      <div className={`${rootBaseClasses} ${className}`} aria-labelledby={headingId}>
        <div className="pt-10">
          {title && (
            <TitleSection
              title={title}
              alignment="center"
              size="extra-large"
              color="text-white"
            />
          )}
        </div>
        <div
          className={contentGridClasses}
          style={normalizedBg ? { backgroundColor: normalizedBg } : undefined}
        >
          {/* Image Container */}
          <div
            className={`relative flex items-center min-h-68 overflow-hidden md:min-h-96 lg:min-h-112 ${imageOrderClassName}`}
          >
            {hasValidImageSrc ? (
              <Image src={imageSrc} alt={imageAlt ?? ''} width={800} height={600} />
            ) : null}
          </div>

          {/* Text Content Container */}
          <div
            className={`flex flex-col justify-center px-5 py-6 text-center sm:px-7 sm:py-8 md:px-8 md:py-10 md:text-left lg:px-10 ${textOrderClassName}`}
          >
            <h2
              id={headingId}
              className="mt-3 text-2xl font-semibold uppercase tracking-[0.04em] text-white"
            >
              {heading}
            </h2>

            <div className="mt-4 text-md leading-8 text-white">{description}</div>

            <div className="flex justify-center md:justify-start text-white my-5">
              <div>
                {imageSecondarySrc && (
                  <Image
                    src={imageSecondarySrc}
                    alt={imageSecondaryAlt ?? ''}
                    width={100}
                    height={100}
                  />
                )}
              </div>
            </div>

            {ctaLabel && ctaLink && (
              <div className="mt-8 flex justify-center md:justify-start">
                <Link
                  href={ctaLink}
                  className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-brand-blue transition-colors hover:bg-white uppercase"
                >
                  {ctaLabel}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
