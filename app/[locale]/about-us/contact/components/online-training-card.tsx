import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function OnlineTrainingCard() {
  const t = useTranslations('pages.about-us.contact.trainingCta');

  return (
    <aside className="rounded-md bg-white p-6 shadow-sm ring-1 ring-black/5">
      <h3 className="text-[1.4rem] font-medium uppercase tracking-wide text-brand-orange-dark">
        {t('title')}
      </h3>
      <p className="mt-2 text-[1rem] text-brand-blue">{t('description')}</p>

      <div className="mt-5 flex min-h-40 items-center justify-center rounded-md border border-dashed border-brand-blue/40 bg-slate-50 text-center text-[0.95rem] text-brand-blue/70">
        {t('imagePlaceholder')}
      </div>

      <button
        type="button"
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-blue px-4 py-2 text-[0.92rem] font-medium text-white transition hover:bg-brand-navy"
      >
        {t('button')}
        <ArrowRight className="h-4 w-4" />
      </button>
    </aside>
  );
}
