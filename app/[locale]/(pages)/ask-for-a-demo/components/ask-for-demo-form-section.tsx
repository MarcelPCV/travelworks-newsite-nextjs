'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import type { CountryOption } from '@/app/lib/countries';
import {
  demoRequestSchema,
  type DemoRequestErrors,
} from '@/app/[locale]/(pages)/(home)/components/demo-section/zod-validations';

type Props = {
  countries: CountryOption[];
  locale: string;
};

export default function AskForDemoFormSection({ countries, locale }: Props) {
  const t = useTranslations('home.ask-for-a-demo');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<DemoRequestErrors>({});

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
    <section className="bg-[#ebebee] py-8 sm:py-10 lg:py-12">
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-5 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="relative p-6 sm:min-h-120">
          <Image src="/images/pages/ask-for-demo/demo.webp" alt="" width={800} height={400} />
        </div>

        <div className="relative z-10 rounded-xl bg-transparent">
          <h3 className="text-[1.8rem] font-medium uppercase text-brand-blue sm:text-[2rem]">
            {locale === 'fr' ? "Demander l'accès" : 'Request Access'}
          </h3>

          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
            <label className="block">
              <span className="text-[1rem] text-neutral-dark">{t('form.fields.fullName')}</span>
              <input
                name="fullName"
                type="text"
                aria-describedby={fieldErrors.fullName ? 'fullName-error' : undefined}
                className={`mt-2 w-full border-b bg-transparent py-2 text-[1rem] text-slate-900 outline-none ${
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
                className={`mt-2 w-full border-b bg-transparent py-2 text-[1rem] text-slate-900 outline-none ${
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
                className={`mt-2 w-full border-b bg-transparent py-2 text-[1rem] text-slate-900 outline-none ${
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
                className={`mt-2 w-full border-b bg-transparent py-2 text-[1rem] text-slate-900 outline-none ${
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
                className={`mt-2 w-full border-b bg-transparent py-2 text-[1rem] text-slate-900 outline-none ${
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
  );
}
