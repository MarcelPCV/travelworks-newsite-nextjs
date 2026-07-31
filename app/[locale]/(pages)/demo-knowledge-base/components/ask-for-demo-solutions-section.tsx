'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';

export default function AskForDemoSolutionsSection() {
  const t = useTranslations('home.ask-for-a-demo');

  const solutions = useMemo(
    () => [
      t('solutions.cards.0'),
      t('solutions.cards.1'),
      t('solutions.cards.2'),
      t('solutions.cards.3'),
      t('solutions.cards.4'),
      t('solutions.cards.5'),
      t('solutions.cards.6'),
      t('solutions.cards.7'),
      t('solutions.cards.8'),
    ],
    [t],
  );

  return (
    <section className="bg-brand-blue py-10 text-white sm:py-12">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <h3 className="text-center text-[1.9rem] font-medium uppercase tracking-[0.06em] sm:text-[2.2rem]">
          {t('solutions.title')}
        </h3>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((item, index) => {
            const isOdd = index % 2 === 1;
            const isBlueInTwoCols = index % 4 === 1 || index % 4 === 2;
            return (
              <div
                key={`${item}-${index}`}
                className={`flex min-h-32 items-center justify-center rounded-md px-6 text-center text-[1rem] font-medium leading-snug ${
                  isOdd ? 'bg-[#0d4f96] text-white' : 'bg-[#e9edf1] text-brand-blue'
                } ${
                  isBlueInTwoCols ? 'sm:bg-[#0d4f96] sm:text-white' : 'sm:bg-[#e9edf1] sm:text-brand-blue'
                } ${
                  isOdd ? 'lg:bg-[#0d4f96] lg:text-white' : 'lg:bg-[#e9edf1] lg:text-brand-blue'
                }`}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
