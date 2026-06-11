'use client';

import { Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { NewsTicker } from './type';

export default function NewsTickerBar() {
  const t = useTranslations('home.news-ticker');

  const newsTickerData: NewsTicker = {
    id: '1',
    sectionTitle: t('section-title'),
    newsLabel: t('news-label'),
    newsCtaHref: "/features",
    phone: t('phone'),
  };

  return (
    <section className="mx-auto w-full max-w-7xl border border-zinc-300 rounded-sm bg-[#f5f5f5]" aria-label={newsTickerData.sectionTitle}>
      <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 py-1 sm:px-6 lg:px-8">
        <span className="shrink-0 text-[13px] font-semibold uppercase leading-none tracking-tight text-zinc-950">{newsTickerData.sectionTitle}</span>

        <span className="h-4 w-px shrink-0 bg-brand-blue" aria-hidden="true" />

        <div className="min-w-0 flex-1 truncate text-[13px] font-medium text-zinc-800">
          <a href={newsTickerData.newsCtaHref}>
          {newsTickerData.newsLabel}
          </a>
        </div>

        <a
          href={`tel:${newsTickerData.phone}`}
          className="inline-flex shrink-0 items-center gap-2 text-zinc-900 transition hover:opacity-80"
        >
          <Phone className="h-4 w-4 text-zinc-700" aria-hidden="true" />
          <span className="text-[13px] font-semibold leading-none">{newsTickerData.phone}</span>
        </a>
      </div>
    </section>
  );
}