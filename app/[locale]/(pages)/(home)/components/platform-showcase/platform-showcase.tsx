'use client';

import { PlatformShowcaseModel } from './type';
import Image from 'next/image';
import TitleSection from '../../../../components/ui/title-section';

export default function PlatformShowcase({
  title,
  description,
  mainImage,
  mainImageAlt,
  secondaryImage,
  secondaryImageAlt,
}: PlatformShowcaseModel) {
  return (
    <div className="relative mx-auto flex w-full flex-col gap-4 bg-brand-blue css-gradient-background-animation py-8">
      {title && (
        <TitleSection title={title} alignment="center" size="extra-large" color="text-white" />
      )}
      <div className="relative">
        <div className="mx-auto max-w-5xl rounded-2xl">
          <div className="flex items-center justify-center rounded-xl w-full h-auto">
            <Image
              src={mainImage}
              alt={mainImageAlt}
              title={mainImageAlt}
              width={800}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl text-center text-white">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 p-6">
          <p className="text-xl mt-4 text-white text-align-center md:mr-2">{description}</p>
          <div className="max-w-[180px]">
            <Image
              src={secondaryImage}
              alt={secondaryImageAlt}
              title={secondaryImageAlt}
              width={800}
              height={400}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
