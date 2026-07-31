'use client';

import { BadgeCheck, Globe, Headset } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslations } from 'next-intl';

type HighlightItem = {
  id: string;
  text: string;
  icon: typeof Globe;
};

export default function AskForDemoHighlightsSection() {
  const t = useTranslations('home.ask-for-a-demo');

  const highlightItems = useMemo<HighlightItem[]>(
    () => [
      { id: 'users', text: t('highlights.users'), icon: Globe },
      { id: 'support', text: t('highlights.support'), icon: Headset },
      { id: 'security', text: t('highlights.security'), icon: BadgeCheck },
    ],
    [t],
  );

  return (
    <section className="bg-neutral-background py-8">
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-6 px-4 sm:grid-cols-3 sm:gap-8 sm:px-6 lg:px-8">
        {highlightItems.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.id} className="flex flex-col items-center text-center">
              <div className="mb-3 rounded-full bg-brand-orange-light/20 p-3 text-brand-orange-dark border-b-4 border-amber-600">
                <Icon className="h-12 w-12" strokeWidth={1.8} />
              </div>
              <p className="max-w-[22ch] text-[1.05rem] leading-snug text-brand-blue">{item.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
