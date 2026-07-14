'use client';

import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import type { CountryOption } from '@/app/lib/countries';
import type { PlanningDemoSectionModel } from './type';
import { demoRequestSchema, type DemoRequestErrors } from './zod-validations';
import Image from 'next/image';
import TitleSection from '../../ui/title-section';

type Props = {
  countries: CountryOption[];
  locale: string;
  model: PlanningDemoSectionModel;
};

export default function PlanningDemoSection({ countries, locale, model }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<DemoRequestErrors>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // ── 1. Collect raw values ────────────────────────────────────────────────
    const formData = new FormData(event.currentTarget);
    const raw = Object.fromEntries(formData.entries());

    // ── 2. Validate with Zod ─────────────────────────────────────────────────
    const result = demoRequestSchema.safeParse(raw);

    if (!result.success) {
      const errors: DemoRequestErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof DemoRequestErrors;
        if (!errors[key]) errors[key] = issue.message; // keep first error per field
      }
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({}); // clear stale errors before submitting
    setIsSubmitting(true);
    setStatus('idle');
    setErrorMessage(null);

    // ── 3. Submit ─────────────────────────────────────────────────────────────
    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...result.data, locale, formName: 'Demo Request Form' }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.error ?? 'Something went wrong.');
        setStatus('error');
        return;
      }

      setStatus('success');
      event.currentTarget.reset();
    } catch {
      setErrorMessage('Something went wrong. Please try again.');
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="w-full mx-auto max-w-[1600px] rounded-2xl bg-neutral-background py-10 text-zinc-900">
      <div className="mb-5">
        {model.heading && (
          <TitleSection title={model.heading} alignment="center" size="extra-large" color="text-brand-blue" />
        )}
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-neutral-border bg-neutral-canvas">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.95fr]">
          <div className="hidden md:block">
            {model.image.linkHref && model.image.placeholderLabel && (  
              <Image 
                src={model.image.linkHref} 
                alt={model.image.placeholderLabel} 
                width={1000} 
                height={800}
                className="h-full w-full object-cover"
              />
            )}
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <form onSubmit={handleSubmit} noValidate className="space-y-7">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {model.form.fields.map((field) => (
                  <label key={field.id} className="block">
                    <span className="text-[1rem] font-medium">{field.label}</span>

                    <input
                      name={field.name}
                      type={field.type ?? 'text'}
                      placeholder={field.placeholder}
                      aria-describedby={
                        fieldErrors[field.name as keyof DemoRequestErrors]
                          ? `${field.id}-error`
                          : undefined
                      }
                      className={`mt-2 w-full border-b bg-transparent py-2 text-[1.2rem] outline-none
                        ${
                          fieldErrors[field.name as keyof DemoRequestErrors]
                            ? 'border-red-500'
                            : 'border-neutral-border'
                        }`}
                    />

                    {fieldErrors[field.name as keyof DemoRequestErrors] && (
                      <p id={`${field.id}-error`} className="mt-1 text-[1.1rem] text-red-500">
                        {fieldErrors[field.name as keyof DemoRequestErrors]}
                      </p>
                    )}
                  </label>
                ))}
              </div>

              {/* Country */}
              <div>
                <label className="block">
                  <span className="text-[1rem] font-medium">{model.form.country.label}</span>

                  <select
                    name="country"
                    aria-describedby={fieldErrors.country ? 'country-error' : undefined}
                    className={`mt-2 w-full border-b bg-transparent py-2 text-[.9rem] outline-none
                      ${fieldErrors.country ? 'border-red-500' : 'border-neutral-border'}`}
                  >
                    <option value="">{model.form.country.placeholder}</option>
                    {countries.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>

                  {fieldErrors.country && (
                    <p id="country-error" className="mt-1 text-[1.1rem] text-red-500">
                      {fieldErrors.country}
                    </p>
                  )}
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 rounded-md bg-brand-blue px-6 py-3 text-white disabled:opacity-50"
              >
                {isSubmitting ? 'Sending…' : model.form.submitButton.label}
                <ArrowRight className="h-5 w-5" />
              </button>

              {status === 'success' && <p className="text-green-600">Request sent successfully.</p>}
              {status === 'error' && (
                <p className="text-red-600">{errorMessage ?? 'Something went wrong.'}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
