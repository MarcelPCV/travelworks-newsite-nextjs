'use client';

import { ArrowRight, BadgeCheck, Globe, Headset } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import type { CountryOption } from '@/app/lib/countries';
import { demoRequestSchema, type DemoRequestErrors } from '../../components/home/demo-section/zod-validations';

type Props = {
  countries: CountryOption[];
  locale: string;
};

type HighlightItem = {
  id: string;
  text: string;
  icon: typeof Globe;
};

export default function AskForDemoPageContent({ countries, locale }: Props) {
  const t = useTranslations('home.ask-for-a-demo');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<DemoRequestErrors>({});

  const highlightItems = useMemo<HighlightItem[]>(() => [
    { id: 'users', text: t('highlights.users'), icon: Globe },
    { id: 'support', text: t('highlights.support'), icon: Headset },
    { id: 'security', text: t('highlights.security'), icon: BadgeCheck },
  ], [t]);

  const solutions = useMemo(() => [
    t('solutions.cards.0'),
    t('solutions.cards.1'),
    t('solutions.cards.2'),
    t('solutions.cards.3'),
    t('solutions.cards.4'),
    t('solutions.cards.5'),
    t('solutions.cards.6'),
    t('solutions.cards.7'),
    t('solutions.cards.8'),
  ], [t]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const raw = Object.fromEntries(formData.entries());
    const result = demoRequestSchema.safeParse(raw);

    if (!result.success) {
      const errors: DemoRequestErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof DemoRequestErrors;
        if (!errors[key]) {
          errors[key] = issue.message;
        }
      }
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);
    setStatus('idle');
    setErrorMessage(null);

    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...result.data, locale, formName: t('form.formName') }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.error ?? t('form.feedback.error'));
        setStatus('error');
        return;
      }

      setStatus('success');
      event.currentTarget.reset();
    } catch {
      setErrorMessage(t('form.feedback.error'));
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex w-full flex-col bg-white">
      <section className="bg-brand-blue py-6 text-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-[1.9rem] font-medium uppercase tracking-[0.06em] sm:text-[2.3rem]">
            {t('title')}
          </h2>
        </div>
      </section>

      <section className="bg-[#ebebee] py-8 sm:py-10 lg:py-12">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="relative min-h-96 rounded-xl bg-linear-to-br from-[#f8fbff] via-[#d8e8fb] to-[#b9d5f5] p-6 shadow-sm sm:min-h-120">
            <div className="absolute left-6 top-6 h-20 w-28 rounded-lg bg-white/70 shadow sm:h-28 sm:w-40" />
            <div className="absolute right-6 top-12 h-16 w-20 rounded-lg bg-brand-blue/75 shadow sm:h-24 sm:w-32" />
            <div className="absolute bottom-8 left-10 h-20 w-24 rounded-lg bg-brand-orange-light/80 shadow sm:h-28 sm:w-36" />
            <div className="absolute bottom-8 right-8 h-24 w-28 rounded-lg bg-brand-orange-dark/80 shadow sm:h-32 sm:w-44" />
            <div className="absolute inset-x-8 bottom-1/2 top-1/3 rounded-xl border border-white/50 bg-white/45 backdrop-blur-sm" />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="rounded-full bg-white/85 px-5 py-2 text-center text-[1.2rem] font-medium text-brand-blue">
                {t('heroPlaceholder')}
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-transparent">
            <h3 className="text-[1.8rem] font-medium uppercase text-brand-blue sm:text-[2rem]">
              {t('form.heading')}
            </h3>

            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
              <label className="block">
                <span className="text-[1rem] text-neutral-dark">{t('form.fields.fullName')}</span>
                <input
                  name="fullName"
                  type="text"
                  aria-describedby={fieldErrors.fullName ? 'fullName-error' : undefined}
                  className={`mt-2 w-full border-b bg-transparent py-2 text-[1rem] outline-none ${
                    fieldErrors.fullName ? 'border-red-500' : 'border-neutral-border'
                  }`}
                />
                {fieldErrors.fullName && (
                  <p id="fullName-error" className="mt-1 text-sm text-red-600">
                    {fieldErrors.fullName}
                  </p>
                )}
              </label>

              <label className="block">
                <span className="text-[1rem] text-neutral-dark">{t('form.fields.email')}</span>
                <input
                  name="email"
                  type="email"
                  aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                  className={`mt-2 w-full border-b bg-transparent py-2 text-[1rem] outline-none ${
                    fieldErrors.email ? 'border-red-500' : 'border-neutral-border'
                  }`}
                />
                {fieldErrors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-600">
                    {fieldErrors.email}
                  </p>
                )}
              </label>

              <label className="block">
                <span className="text-[1rem] text-neutral-dark">{t('form.fields.phone')}</span>
                <input
                  name="phone"
                  type="tel"
                  aria-describedby={fieldErrors.phone ? 'phone-error' : undefined}
                  className={`mt-2 w-full border-b bg-transparent py-2 text-[1rem] outline-none ${
                    fieldErrors.phone ? 'border-red-500' : 'border-neutral-border'
                  }`}
                />
                {fieldErrors.phone && (
                  <p id="phone-error" className="mt-1 text-sm text-red-600">
                    {fieldErrors.phone}
                  </p>
                )}
              </label>

              <label className="block">
                <span className="text-[1rem] text-neutral-dark">{t('form.fields.agencyName')}</span>
                <input
                  name="agencyName"
                  type="text"
                  aria-describedby={fieldErrors.agencyName ? 'agencyName-error' : undefined}
                  className={`mt-2 w-full border-b bg-transparent py-2 text-[1rem] outline-none ${
                    fieldErrors.agencyName ? 'border-red-500' : 'border-neutral-border'
                  }`}
                />
                {fieldErrors.agencyName && (
                  <p id="agencyName-error" className="mt-1 text-sm text-red-600">
                    {fieldErrors.agencyName}
                  </p>
                )}
              </label>

              <label className="block">
                <span className="text-[1rem] text-neutral-dark">{t('form.fields.country')}</span>
                <select
                  name="country"
                  aria-describedby={fieldErrors.country ? 'country-error' : undefined}
                  className={`mt-2 w-full border-b bg-transparent py-2 text-[1rem] outline-none ${
                    fieldErrors.country ? 'border-red-500' : 'border-neutral-border'
                  }`}
                >
                  <option value="">{t('form.countryPlaceholder')}</option>
                  {countries.map((country) => (
                    <option key={country.value} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                </select>
                {fieldErrors.country && (
                  <p id="country-error" className="mt-1 text-sm text-red-600">
                    {fieldErrors.country}
                  </p>
                )}
              </label>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-md bg-brand-blue px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-brand-navy disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? t('form.submitPending') : t('form.submit')}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {status === 'success' && (
                <p className="text-sm text-green-600">{t('form.feedback.success')}</p>
              )}
              {status === 'error' && (
                <p className="text-sm text-red-600">{errorMessage ?? t('form.feedback.error')}</p>
              )}
            </form>
          </div>
        </div>
      </section>

      <section className="bg-neutral-background py-8">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 sm:grid-cols-3 sm:gap-8 sm:px-6 lg:px-8">
          {highlightItems.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.id} className="flex flex-col items-center text-center">
                <div className="mb-3 rounded-full bg-brand-orange-light/20 p-3 text-brand-orange-dark">
                  <Icon className="h-9 w-9" strokeWidth={1.8} />
                </div>
                <p className="max-w-[22ch] text-[1.05rem] leading-snug text-brand-blue">{item.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-brand-blue py-10 text-white sm:py-12">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-center text-[1.9rem] font-medium uppercase tracking-[0.06em] sm:text-[2.2rem]">
            {t('solutions.title')}
          </h3>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((item, index) => {
              const isOdd = index % 2 === 1;
              return (
                <div
                  key={`${item}-${index}`}
                  className={`flex min-h-32 items-center justify-center rounded-md px-6 text-center text-[1rem] font-medium leading-snug ${
                    isOdd ? 'bg-[#0d4f96] text-white' : 'bg-[#e9edf1] text-brand-blue'
                  }`}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
