'use client';

import { Phone } from 'lucide-react';
import { NewsTicker } from './type';
import Link from 'next/link';

export default function NewsTickerBar({ sectionTitle, newsLabel, newsCtaHref, phone }: NewsTicker) {
  return (
    <section
      className="mx-auto w-full max-w-7xl border border-zinc-300 rounded-sm bg-[#f5f5f5] mt-2 mb-3"
      aria-label={sectionTitle}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 py-1 sm:px-6 lg:px-8">
        <Link href="/news">
          <span className="shrink-0 text-[13px] font-semibold uppercase leading-none tracking-tight text-zinc-950 hover:underline">
            {sectionTitle}
          </span>
        </Link>

        <span className="h-4 w-px shrink-0 bg-brand-blue" aria-hidden="true" />

        <div className="min-w-0 flex-1 truncate text-[13px] font-medium text-zinc-800 hover:underline">
          <a href={newsCtaHref}>{newsLabel}</a>
        </div>

        <a
          href={`tel:${phone}`}
          className="inline-flex shrink-0 items-center gap-2 text-zinc-900 transition hover:opacity-80"
        >
          <Phone className="h-4 w-4 text-zinc-700" aria-hidden="true" />
          <span className="text-[13px] font-semibold leading-none">{phone}</span>
        </a>
      </div>
    </section>
  );
}
