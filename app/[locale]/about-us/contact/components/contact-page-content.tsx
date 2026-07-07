'use client';

import type { CountryOption } from '@/app/lib/countries';
import ContactForm from '@/app/[locale]/about-us/contact/components/contact-form';
import ContactMap from '@/app/[locale]/about-us/contact/components/contact-map';
import OfficeCards from '@/app/[locale]/about-us/contact/components/office-cards';
import OnlineTrainingCard from '@/app/[locale]/about-us/contact/components/online-training-card';
import { useTranslations } from 'next-intl';

type Props = {
  countries: CountryOption[];
  locale: string;
};

export default function ContactPageContent({ countries, locale }: Props) {
  const t = useTranslations('pages.about-us.contact.hero');

  return (
    <div className="flex w-full flex-col">
      <section className="relative overflow-hidden bg-brand-blue py-10 text-white">
        <div className="pointer-events-none absolute right-6 top-3 h-24 w-24 rotate-12 rounded-md bg-brand-orange-dark/90 sm:h-28 sm:w-32" />
        <div className="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full border border-white/20" />
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-[2rem] font-medium uppercase tracking-[0.06em] sm:text-[2.4rem]">
            {t('title')}
          </h1>
        </div>
      </section>

      <section className="bg-[#ededf0] py-8 sm:py-10 lg:py-12">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 xl:grid-cols-[1.45fr_1fr] xl:gap-12 lg:px-8">
          <ContactForm countries={countries} locale={locale} />

          <div className="space-y-6">
            <OfficeCards />
            <OnlineTrainingCard />
          </div>
        </div>
      </section>

      <ContactMap />
    </div>
  );
}
