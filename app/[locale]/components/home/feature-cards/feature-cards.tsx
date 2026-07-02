"use client";

import Image from 'next/image';
import Link from 'next/link';
import { FeatureCardsSection, FeatureCard } from './type';

function FeatureCards({ item }: { item: FeatureCard }) {
  return (
    <Link
      href={item.ctaHref}
      className="relative flex h-20 w-20 items-center justify-center rounded-full bg-brand-blue"
    >
      {item.image.src && (
        <div className="relative h-20 w-20 overflow-hidden rounded-full">
          <Image
            src={item.image.src ?? '/'}
            alt={item.image.alt ?? ''}
            width={80}
            height={80}
            className="h-20 w-20 object-cover"
          />
        </div>
      )}
    </Link>
  );
}

export default function IconsFeatures(props?: Partial<FeatureCardsSection>) {
  const { title, items = [] } = props ?? {};

  return (
    <section className='w-full mx-auto max-w-7xl rounded-2xl bg-[#e7e7e7] px-5 py-10 sm:px-8 lg:px-10' aria-labelledby="technology-features-heading">
      {title && (
         typeof title === 'string' ? (
           <h2 dangerouslySetInnerHTML={{ __html: title }} className="text-center text-3xl font-medium uppercase tracking-tight text-brand-blue sm:text-4xl"/>
         ) : (
           <h2 className="text-center text-3xl font-medium uppercase tracking-tight text-brand-blue sm:text-4xl">{title}</h2>
         )
      )}

      <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-10">
         {items.map((featureCard) => {
           return (
            <article
               key={featureCard.id}
               className="flex w-[calc(50%-0.75rem)] max-w-44 flex-col items-center text-center sm:w-[calc(33.333%-1.3rem)] md:w-[calc(20%-1.5rem)] xl:w-[calc(14.285%-1.7rem)]"
             >
              <FeatureCards item={featureCard} />
              <p className="mt-3 max-w-[12ch] text-md font-medium leading-tight text-brand-blue">{featureCard.title}</p>
             </article>
           );
         })}
       </div>
      <Link href="">

      </Link>
    </section>
  );
}
