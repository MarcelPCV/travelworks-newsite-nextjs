import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { TourOnlineCTAArea } from './type';

export default function TourOnlineCTA({ imageSrc, imageAlt, ctaLink, ctaText }: TourOnlineCTAArea) {
  return (
    <section
      className={clsx(
        'flex flex-col items-center justify-center gap-6 rounded-lg bg-primary px-6 py-8 md:flex-row md:justify-center bg-blue-900',
      )}
    >
      <div className="relative h-44 w-full max-w-[450px] overflow-hidden rounded-md">
        <Image src={imageSrc} alt={imageAlt} fill />
      </div>

      <Link
        href={ctaLink}
        className="inline-flex items-center gap-2 rounded-md bg-orange-500 px-6 py-4 text-base font-bold uppercase tracking-wide text-white transition hover:bg-orange-600"
      >
        {ctaText}
        <span aria-hidden>→</span>
      </Link>
    </section>
  );
}
