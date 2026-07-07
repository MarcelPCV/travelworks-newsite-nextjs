'use client';

import Image from 'next/image';
import React from 'react';
import { imageHappyLearning } from './type';

export default function ImageHappyLearning({
  title,
  imageSrc,
  altText,
  widthPercentage,
}: imageHappyLearning) {
  const imageContainerStyle: React.CSSProperties = {
    width: widthPercentage,
  };

  return (
    <section className="mx-auto max-w-7xl flex flex-col text-center p-6 rounded-xl md:items-start">
      {imageSrc && (
        <div className="mx-auto w-full" style={imageContainerStyle}>
          <div className="relative w-full overflow-hidden rounded-lg">
            <Image src={imageSrc} alt={altText} width={800} height={450} className="w-full" />
          </div>
        </div>
      )}
      {title && (
        <div className="mx-auto flex-1 space-y-4">
          <h2 className="mt-3 text-2xl font-semibold uppercase tracking-[0.04em] text-brand-blue">
            {title}
          </h2>
        </div>
      )}
    </section>
  );
}
