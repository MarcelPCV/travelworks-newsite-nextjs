'use client';

import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import type { CountryOption } from '@/app/lib/countries';
import {
  contactRequestSchema,
  type ContactRequestErrors,
} from '@/app/[locale]/(pages)/about-us/contact/components/contact-form-validations';

type Props = {
  countries: CountryOption[];
  locale: string;
};

export default function ContactForm({ countries, locale }: Props) {
  const t = useTranslations('pages.about-us.contact.form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<ContactRequestErrors>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const raw = {
      fullName: String(formData.get('fullName') ?? ''),
      email: String(formData.get('email') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      agencyName: String(formData.get('agencyName') ?? ''),
      country: String(formData.get('country') ?? ''),
      topics: formData.getAll('topics').map((value) => String(value)),
      message: String(formData.get('message') ?? ''),
    };

    const result = contactRequestSchema.safeParse(raw);

    if (!result.success) {
      const errors: ContactRequestErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof ContactRequestErrors;
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
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...result.data, locale, formName: t('formName') }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.error ?? t('feedback.error'));
        setStatus('error');
        return;
      }

      setStatus('success');
      event.currentTarget.reset();
    } catch {
      setErrorMessage(t('feedback.error'));
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section>
      <h2 className="text-[2rem] font-medium uppercase text-brand-blue">{t('title')}</h2>

      <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-5">
        <label className="block">
          <span className="text-[0.95rem] text-slate-700">{t('fields.fullName')}</span>
          <input
            name="fullName"
            type="text"
            aria-describedby={fieldErrors.fullName ? 'fullName-error' : undefined}
            className={`mt-2 w-full border-b bg-transparent py-2 text-[1rem] outline-none ${
              fieldErrors.fullName ? 'border-red-500' : 'border-slate-300'
            }`}
          />
          {fieldErrors.fullName && (
            <p id="fullName-error" className="mt-1 text-sm text-red-600">
              {fieldErrors.fullName}
            </p>
          )}
        </label>

        <label className="block">
          <span className="text-[0.95rem] text-slate-700">{t('fields.email')}</span>
          <input
            name="email"
            type="email"
            aria-describedby={fieldErrors.email ? 'email-error' : undefined}
            className={`mt-2 w-full border-b bg-transparent py-2 text-[1rem] outline-none ${
              fieldErrors.email ? 'border-red-500' : 'border-slate-300'
            }`}
          />
          {fieldErrors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-600">
              {fieldErrors.email}
            </p>
          )}
        </label>

        <label className="block">
          <span className="text-[0.95rem] text-slate-700">{t('fields.phone')}</span>
          <input
            name="phone"
            type="tel"
            aria-describedby={fieldErrors.phone ? 'phone-error' : undefined}
            className={`mt-2 w-full border-b bg-transparent py-2 text-[1rem] outline-none ${
              fieldErrors.phone ? 'border-red-500' : 'border-slate-300'
            }`}
          />
          {fieldErrors.phone && (
            <p id="phone-error" className="mt-1 text-sm text-red-600">
              {fieldErrors.phone}
            </p>
          )}
        </label>

        <label className="block">
          <span className="text-[0.95rem] text-slate-700">{t('fields.agencyName')}</span>
          <input
            name="agencyName"
            type="text"
            aria-describedby={fieldErrors.agencyName ? 'agencyName-error' : undefined}
            className={`mt-2 w-full border-b bg-transparent py-2 text-[1rem] outline-none ${
              fieldErrors.agencyName ? 'border-red-500' : 'border-slate-300'
            }`}
          />
          {fieldErrors.agencyName && (
            <p id="agencyName-error" className="mt-1 text-sm text-red-600">
              {fieldErrors.agencyName}
            </p>
          )}
        </label>

        <label className="block">
          <span className="text-[0.95rem] text-slate-700">{t('fields.country')}</span>
          <select
            name="country"
            aria-describedby={fieldErrors.country ? 'country-error' : undefined}
            className={`mt-2 w-full border-b bg-transparent py-2 text-[1rem] outline-none ${
              fieldErrors.country ? 'border-red-500' : 'border-slate-300'
            }`}
          >
            <option value="">{t('countryPlaceholder')}</option>
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

        <fieldset>
          <legend className="text-[0.95rem] text-slate-700">{t('fields.topics')}</legend>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-3">
            {['travelWorks', 'tourPremium', 'tourOnline', 'tripnTouch', 'other'].map((key) => (
              <label
                key={key}
                className="inline-flex items-center gap-2 text-[0.92rem] text-slate-700"
              >
                <input type="checkbox" name="topics" value={key} className="h-4 w-4" />
                {t(`topics.${key}`)}
              </label>
            ))}
          </div>
          {fieldErrors.topics && <p className="mt-1 text-sm text-red-600">{fieldErrors.topics}</p>}
        </fieldset>

        <label className="block">
          <span className="text-[0.95rem] text-slate-700">{t('fields.message')}</span>
          <textarea
            name="message"
            rows={7}
            aria-describedby={fieldErrors.message ? 'message-error' : undefined}
            className={`mt-2 w-full resize-y rounded-md border bg-transparent px-3 py-2 text-[1rem] outline-none ${
              fieldErrors.message ? 'border-red-500' : 'border-slate-300'
            }`}
          />
          {fieldErrors.message && (
            <p id="message-error" className="mt-1 text-sm text-red-600">
              {fieldErrors.message}
            </p>
          )}
        </label>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-md bg-brand-blue px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-brand-navy disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? t('submitPending') : t('submit')}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {status === 'success' && <p className="text-sm text-green-600">{t('feedback.success')}</p>}
        {status === 'error' && (
          <p className="text-sm text-red-600">{errorMessage ?? t('feedback.error')}</p>
        )}
      </form>
    </section>
  );
}
