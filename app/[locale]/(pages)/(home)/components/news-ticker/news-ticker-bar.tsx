'use client';

import { Phone } from 'lucide-react';
import { NewsTicker } from './type';
import Link from 'next/link';

export default function NewsTickerBar({ sectionTitle, newsLabel, newsCtaHref, phone }: NewsTicker) {
  return (
      <section
        className="hidden md:block mx-auto mt-5 w-full max-w-[1600px] rounded-t-md border border-zinc-300 bg-gray-800 py-1"
        aria-label={sectionTitle}
      >
      <div className="mx-auto flex w-full items-center gap-3 px-4 py-1 sm:px-6 lg:px-8">
        <Link href="/news">
          <div className="flex items-center gap-2 text-amber-500 hover:text-amber-400 transition"> 
            <span className="shrink-0 text-[13px] font-semibold uppercase leading-none tracking-tight hover:underline">
              {sectionTitle}
            </span>
          </div>
        </Link>

        <span className="h-4 w-px shrink-0 bg-gray-500" aria-hidden="true" />

        <div className="min-w-0 flex-1 truncate text-[13px] font-normal text-white hover:underline">
          <a href={newsCtaHref}>{newsLabel}</a>
        </div>

        <a
          href={`tel:${phone}`}
          className="inline-flex shrink-0 items-center gap-2 text-white transition hover:opacity-80 bg-gray-600 px-2 py-1 rounded-md"
        >
          <Phone className="h-4 w-4 text-white" aria-hidden="true" />
          <span className="text-[13px] font-semibold leading-none">{phone}</span>
        </a>
      </div>
    </section>
  );
}
