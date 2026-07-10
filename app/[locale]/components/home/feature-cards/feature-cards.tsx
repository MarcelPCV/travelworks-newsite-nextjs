'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FeatureCardsSection, FeatureCard } from './type';
import TitleSection from '../../ui/title-section';

function FeatureCards({ item }: { item: FeatureCard }) {
  return (
    <div
      className="relative flex h-20 w-20 items-center justify-center rounded-full bg-brand-blue"
    >
      {item.image.src && (
        <div className="relative h-20 w-20 overflow-hidden rounded-full shadow-xl">
          <Image
            src={item.image.src ?? '/'}
            alt={item.image.alt ?? ''}
            title={item.image.alt ?? ''}
            width={80}
            height={80}
            className="h-20 w-20 object-cover"
          />
        </div>
      )}
    </div>
  );
}

export default function IconsFeatures(props?: Partial<FeatureCardsSection>) {
  const { title, items = [] } = props ?? {};

  return (
    <section
      className="w-full mx-auto max-w-7xl rounded-2xl px-5 py-10 sm:px-8 lg:px-10 my-5"
      aria-labelledby="technology-features-heading"
    >
      {title && (
        <TitleSection title={title} alignment="center" size="extra-large" color="text-brand-blue" />
      )}

      <div className="flex flex-wrap justify-center gap-x-6 gap-y-10">
        {items.map((featureCard) => {
          return (
            <Link
              href={featureCard.ctaHref}
              key={featureCard.id}
              className="cursor-pointer flex w-[calc(50%-0.75rem)] max-w-44 flex-col items-center text-center sm:w-[calc(33.333%-1.3rem)] md:w-[calc(20%-1.5rem)] xl:w-[calc(14.285%-1.7rem)] pt-3 hover:bg-white rounded-2xl transition-all duration-100 hover:shadow-lg hover:shadow-blue-500/30 border border-transparent hover:border hover:border-gray-200 hover:underline hover:decoration-brand-blue"
            >
              <FeatureCards item={featureCard} />
              <p className="my-3 max-w-[12ch] text-md font-medium leading-tight text-brand-blue">
                {featureCard.title}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
