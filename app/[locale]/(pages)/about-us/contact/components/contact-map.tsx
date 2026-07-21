import { useTranslations } from 'next-intl';

export default function ContactMap() {
  const t = useTranslations('pages.about-us.contact.map');

  return (
    <section className="bg-white pb-4 pt-10">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-[1.8rem] font-medium uppercase tracking-wide text-brand-blue sm:text-[2.2rem]">
          {t('title')}
        </h2>

        <div className="mt-5 overflow-hidden rounded-md ring-1 ring-black/5">
          <iframe
            title={t('iframeTitle')}
            src="https://www.google.com/maps?q=75+Queen+St+1400,+Montreal,+QC+H3C+2N6,+Canada&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[20rem] w-full border-0 sm:h-[24rem] lg:h-[28rem]"
          />
        </div>
      </div>
    </section>
  );
}
