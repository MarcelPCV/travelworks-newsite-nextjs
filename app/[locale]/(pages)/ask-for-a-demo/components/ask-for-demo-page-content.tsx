'use client';

import type { CountryOption } from '@/app/lib/countries';
import AskForDemoFormSection from '@/app/[locale]/(pages)/demo-knowledge-base/components/ask-for-demo-form-section';
import AskForDemoHighlightsSection from '@/app/[locale]/(pages)/ask-for-a-demo/components/ask-for-demo-highlights-section';
import AskForDemoSolutionsSection from '@/app/[locale]/(pages)/ask-for-a-demo/components/ask-for-demo-solutions-section';

type Props = {
  countries: CountryOption[];
  locale: string;
};

export default function AskForDemoPageContent({ countries, locale }: Props) {
  return (
    <div className="flex w-full flex-col bg-white">
      <AskForDemoFormSection countries={countries} locale={locale} />
      <AskForDemoHighlightsSection />
      <AskForDemoSolutionsSection />
    </div>
  );
}
