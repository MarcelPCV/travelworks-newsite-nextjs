'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ImageBlockModel } from './type';
import CtaButton from '../../ui/cta-button';
import { ArrowRight } from 'lucide-react';
import TitleSection from '../../ui/title-section';

export default function ImageBlock({
  title,
  description,
  imageSrc,
  altText,
  linkHref,
  linkText,
  maxWidth,
  hasCaption = false,
  captionText = '',
  ctaLabel,
  ctaLink,
  backgroundColor,
}: ImageBlockModel) {
  return (
    <div>
      <div
        className="flex flex-col text-center rounded-xl md:items-start"
        style={{ backgroundColor }}
      >
        <div className="mx-auto max-w-[1600px] flex-1 space-y-4 mt-5">
          {title && (
            <TitleSection
              title={title}
              alignment="center"
              size="extra-large"
              color="text-brand-blue"
              titleMaxWidth="max-w-3xl"
            />
          )}

          {description && (
            <p className="mx-auto max-w-2xl text-md leading-8 text-neutral-dark">
              {description}
            </p>
          )}

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
          <div className="w-full mt-5">
            <div
              className="mx-auto w-full"
              style={{ maxWidth }}
            >
              <div className="relative w-full overflow-hidden rounded-lg">
                <Image
                  src={imageSrc}
                  alt={altText}
                  width={800}
                  height={450}
                  className="w-full"
                />
              </div>

              {hasCaption && captionText && (
                <p className="mt-2 text-sm italic text-gray-500">
                  {captionText}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center my-5">
        {ctaLink && ctaLabel && (
          <Link href={ctaLink}>
            <CtaButton
              label={ctaLabel}
              variant="default"
              size="xs"
              icon={<ArrowRight className="h-6 w-6" strokeWidth={2.4} />}
              iconPosition="after"
            />
          </Link>
        )}
      </div>
    </div>
  );
}