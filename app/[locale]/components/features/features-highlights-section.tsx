'use client';

import {
  CircleDollarSign,
  FileCheck2,
  Laptop,
  Workflow,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Features } from './type';

function HeadingBadge() {
  return (
    <span className="relative mt-1 inline-flex h-6 w-6 shrink-0" aria-hidden="true">
      <span className="absolute left-0 top-2 h-4 w-4 rounded bg-brand-orange-light" />
      <span className="absolute left-2 top-0 h-4 w-4 rounded bg-brand-blue/60" />
    </span>
  );
}

function HighlightIcon({ item }: { item: Features }) {
  const Icon = item.icon ?? FileCheck2;

  return (
    <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#dbdbdb]">
      <Icon className="h-14 w-14 text-neutral-500" strokeWidth={1.6} />
    </div>
  );
}

export default function FeaturesHighlightsSection() {
  const t = useTranslations('features.highlights');
  
  const items: Features[] = [
    {
      id: 0,
      title: t.raw('invoicing-methodology.title'),
      description: t.raw('invoicing-methodology.description'),
      icon: FileCheck2
    },
    {
      id: 1,
      title: t.raw('process-automation.title'),
      description: t.raw('process-automation.description'),
      icon: Workflow
    },
    {
      id: 2,
      title: t.raw('accounting-integration.title'),
      description: t.raw('accounting-integration.description'),
      icon: CircleDollarSign,
    },
    {
      id: 3,
      title: t.raw('data-anywhere.title'),
      description: t.raw('data-anywhere.description'),
      icon: Laptop
    },
  ];

  return (
    <section className="w-full mx-auto max-w-7xl rounded-2xl bg-[#e7e7e7] px-4 py-8 sm:px-6 lg:px-10 lg:py-12" aria-label="Accounting and automation highlights">
      <div className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-2 lg:gap-y-14">
        {items.map((item) => {
          return (
            <div key={item.id} className="grid grid-cols-1 gap-5 sm:grid-cols-[8rem_1fr] sm:gap-6">
              <div className="sm:pt-3">
                <HighlightIcon item={item} />
              </div>

              <div>
                <h3 className="flex items-start gap-3 text-[1.95rem] font-medium uppercase leading-tight tracking-[0.01em] text-brand-blue">
                  <HeadingBadge />
                  <span>{item.title}</span>
                </h3>

                <div className="mt-4 space-y-4 text-lg leading-relaxed text-neutral-700">
                  <span dangerouslySetInnerHTML={{ __html: item.description }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}