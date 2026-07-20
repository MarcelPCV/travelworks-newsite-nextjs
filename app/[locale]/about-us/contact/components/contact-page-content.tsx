'use client';

import type { CountryOption } from '@/app/lib/countries';
import ContactForm from '@/app/[locale]/about-us/contact/components/contact-form';
import ContactMap from '@/app/[locale]/about-us/contact/components/contact-map';
import OfficeCards from '@/app/[locale]/about-us/contact/components/office-cards';
import OnlineTrainingCard from '@/app/[locale]/about-us/contact/components/online-training-card';
import { useTranslations } from 'next-intl';
import TitleHero from '@/app/[locale]/components/shared/title-hero/title-hero';

type Props = {
  countries: CountryOption[];
  locale: string;
};

export default function ContactPageContent({ countries, locale }: Props) {
  const t = useTranslations('pages.about-us.contact.title-hero');

  return (
    <div className="flex w-full flex-col">
      <TitleHero title={t('title')} />
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
