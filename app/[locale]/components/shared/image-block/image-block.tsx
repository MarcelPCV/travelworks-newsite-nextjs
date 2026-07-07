'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ImageBlockModel } from './type';
import CtaButton from '../../ui/cta-button';

export default function ImageBlock({
  title,
  description,
  imageSrc,
  altText,
  linkHref,
  linkText = 'Learn more',
  widthPercentage = '60%',
  hasCaption = false,
  captionText = '',
  ctaLabel,
  ctaLink,
  backgroundColor,
}: ImageBlockModel) {
  const imageContainerStyle: React.CSSProperties = {
    width: widthPercentage,
  };

  return (
    <div>
      <div
        className="mx-auto max-w-7xl flex flex-col text-center rounded-xl md:items-start"
        style={{ backgroundColor }}
      >
        <div className="mx-auto flex-1 space-y-4">
          {title && (
            <h2 className="mt-3 text-2xl font-semibold uppercase tracking-[0.04em] text-brand-blue">
              {title}
            </h2>
          )}

          {description && (
            <p className="mx-auto max-w-2xl mt-4 text-md leading-8 text-neutral-dark">
              {description}
            </p>
          )}

          {/* Call‑to‑action link */}
          {linkHref && linkText && (
            <Link
              href={linkHref}
              className="inline-block mt-2 text-base font-medium text-white hover:underline bg-blue-600 px-4 py-2 rounded-md transition-colors duration-200 mb-10"
            >
              {linkText}
            </Link>
          )}
        </div>

        {imageSrc && (
          <div className="mx-auto w-full mt-5" style={imageContainerStyle}>
            <div className="relative w-full overflow-hidden rounded-lg">
              <Image src={imageSrc} alt={altText} width={800} height={450} className="w-full" />
            </div>

            {hasCaption && captionText && (
              <p className="mt-2 text-sm italic text-gray-500">{captionText}</p>
            )}
          </div>
        )}
      </div>
      <div className="flex justify-center my-5">
        {ctaLink && ctaLabel && (
          <div>
            {ctaLink && ctaLabel && (
              <Link href={ctaLink}>
                <CtaButton label={ctaLabel} variant="default" size="xs" />
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
