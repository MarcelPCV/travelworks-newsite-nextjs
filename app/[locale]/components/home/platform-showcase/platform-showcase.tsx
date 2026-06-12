"use client";

import { PlatformShowcaseModel } from './type';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function PlatformShowcase() {
  const t = useTranslations('home.platform-showcase');

  const platformShowcaseData: PlatformShowcaseModel = {
    title: t.rich('title', {
      strong: (chunks) => <strong>{chunks}</strong>,
    }),
    description: t.rich('description', {
      strong: (chunks) => (
        <strong className="font-semibold text-white">{chunks}</strong>
      ),
    }),
    mainImage: t('mainImage'),
    secondaryImage: t('secondaryImage'),
  };

  return (
    <div className="relative mx-auto max-w-7xl flex w-full flex-col gap-8 bg-blue-700 py-8">
      { platformShowcaseData.title && (
         <h2 className="text-center text-3xl font-medium uppercase tracking-tight text-brand-blue sm:text-4xl text-white">
           {platformShowcaseData.title}
         </h2>
      )}
      <div className="relative">
        <div className="mx-auto max-w-4xl rounded-2xl">
          <div className="flex items-center justify-center rounded-xl w-full h-auto">
            <Image 
              src={platformShowcaseData.mainImage} 
              alt="" 
              width={800} 
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl text-center text-white">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 p-6">
          <p className="text-xl mt-4 text-white">
          {t.rich('description', {
            strong: (chunks) => (
              <strong className="font-semibold text-white">{chunks}</strong>
            ),
          })}
        </p>
        <div className="max-w-[120px]">
          <Image 
            src={platformShowcaseData.secondaryImage} 
            alt="" 
            width={800} 
            height={400}
          />
        </div>
        </div>
      </div>
    </div>
  );
}