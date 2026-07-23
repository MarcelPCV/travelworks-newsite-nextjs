import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { TourOnlineCTAArea } from './type';

export default function TourOnlineCTA({ imageSrc, imageAlt, ctaLink, ctaText }: TourOnlineCTAArea) {
  return (
    <section
      className={clsx(
        'flex flex-col items-center justify-center gap-6 rounded-lg bg-primary px-6 py-8 md:flex-row md:justify-center bg-brand-blue',
      )}
    >
      <div className="relative h-44 w-full max-w-[450px] overflow-hidden rounded-md">
        <Image src={imageSrc} alt={imageAlt} fill />
      </div>

      <Link
        href="https://preview.touronline.shop/#/"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-md border-transparent bg-gradient-to-r from-brand-orange-light to-brand-orange-dark text-white hover:from-[#f7b24a] hover:to-[#eb6f21] active:from-[#eaa63f] active:to-[#db641d] focus-visible:ring-[#fdba74] uppercase font-semibold"
      >
        {ctaText}
        <span aria-hidden>→</span>
      </Link>
    </section>
  );
}
