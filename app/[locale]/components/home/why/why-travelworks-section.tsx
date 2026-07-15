import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { WhyTravelworksSection } from './type';
import TitleSection from '../../ui/title-section';
import Link from 'next/link';

export default function WhyTravelworks({ title, items }: WhyTravelworksSection) {
  return (
    <section
      className="mx-auto w-full max-w-[1600px] rounded-2xl bg-neutral-background py-8 my-5"
      aria-labelledby="why-travelworks-heading"
    >
      {title && (
        <TitleSection
          title={title}
          alignment="center"
          size="extra-large"
          color="text-brand-blue"
          className="mb-5"
        />
      )}

      <div className="grid grid-cols-1 overflow-hidden rounded-xl sm:grid-cols-2 xl:grid-cols-4">
        {items?.map((item, index) => (
          <Link href={item.blockLink ?? '#'} key={index} className="group flex min-h-104 flex-col">
            <div className="relative h-60 overflow-hidden bg-[#ebe6dc]">
              <Image
                src={item.imageHref}
                alt={item.imageAlt ?? ''}
                title={item.imageAlt ?? ''}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw,
                       (max-width: 1280px) 50vw,
                       25vw"
              />
            </div>

            <div className="flex flex-1 flex-col bg-gray-800 p-6 text-neutral-canvas">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-[1.4rem] font-medium leading-tight">{item.title}</h3>

                <ArrowRight
                  className="mt-1 h-7 w-7 shrink-0 text-brand-orange-light transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={2.2}
                />
              </div>

              <p className="mt-5 type-normal-16 text-neutral-canvas/90">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
