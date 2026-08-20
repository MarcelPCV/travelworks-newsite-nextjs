'use client';

import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import type { CountryOption } from '@/app/lib/countries';
import type { PlanningDemoSectionModel } from '@/app/[locale]/(pages)/(home)/components/demo-section/type';
import {
  demoRequestSchema,
  type DemoRequestErrors,
} from '@/app/[locale]/(pages)/(home)/components/demo-section/zod-validations';
import { DEFAULT_ROUTE_LOCALE, getThankYouSlug } from '@/app/[locale]/locale-config';

import TitleSection from '@/app/[locale]/components/ui/title-section';
import { is } from 'zod/v4/locales';

type Props = {
  countries: CountryOption[];
  locale: string;
  model: PlanningDemoSectionModel;
};

function getThankYouPath(locale: string) {
  const normalizedLocale = locale.toLowerCase();
  const routeLocale = normalizedLocale.startsWith('fr')
    ? 'fr'
    : normalizedLocale === 'en-au'
      ? 'en-au'
      : DEFAULT_ROUTE_LOCALE;
  const slug = getThankYouSlug(routeLocale);

  if (routeLocale === DEFAULT_ROUTE_LOCALE) {
    return `/${slug}`;
  }

  return `/${routeLocale}/${slug}`;
}

export default function PlanningDemoSection({
  countries,
  locale,
  model,
}: Props) {
  const router = useRouter();

  const isFrench = locale.toLowerCase().startsWith('fr');

  const genericErrorMessage = isFrench
    ? "Une erreur s'est produite. Veuillez réessayer."
    : 'Something went wrong. Please try again.';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] =
    useState<DemoRequestErrors>({});

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const form = event.currentTarget;

    // Reset previous errors
    setFieldErrors({});
    setErrorMessage(null);
    setStatus('idle');

    // 1. Get form data
    const formData = new FormData(form);
    const raw = Object.fromEntries(formData.entries());

    // 2. Validate with Zod
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
      setStatus('error');

      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Sending demo request:', result.data);

      const res = await fetch('/api/demo-section', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...result.data,
          locale,
          formName: isFrench ? 'Footer' : 'Pied de page',
          pageUrl: window.location.href,
          paidPromotion: isFrench ? 'Non' : 'No',
        }),
      });

      console.log('Response status:', res.status);

      // Get response as text first
      const text = await res.text();

      let data: {
        success?: boolean;
        error?: string;
        message?: string;
      } = {};

      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        console.error('API did not return valid JSON:', text);
      }

      console.log('API response:', data);

      // Handle API errors
      if (!res.ok || data.success === false) {
        const message =
          data.error ??
          data.message ??
          genericErrorMessage;

        console.error('API error:', {
          status: res.status,
          message,
          response: text,
        });

        setErrorMessage(message);
        setStatus('error');

        return;
      }

      // Success
      form.reset();

      setStatus('success');

      router.push(getThankYouPath(locale));
    } catch (error) {
      console.error('Demo form submission failed:', error);

      setErrorMessage(genericErrorMessage);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="w-full mx-auto max-w-[1600px] rounded-2xl bg-neutral-background py-10 text-zinc-900">
      <div className="mb-5">
        {model.heading && (
          <TitleSection
            title={model.heading}
            alignment="center"
            size="extra-large"
            color="text-brand-blue"
          />
        )}
      </div>

      <div className="overflow-hidden rounded-xl border border-neutral-border bg-neutral-canvas">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.95fr]">
          {/* Image */}
          <div className="hidden md:block">
            {model.image.linkHref &&
              model.image.placeholderLabel && (
                <Image
                  src={model.image.linkHref}
                  alt={model.image.placeholderLabel}
                  width={1000}
                  height={800}
                  className="h-full w-full object-cover"
                />
              )}
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8 lg:p-10">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-7"
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {model.form.fields.map((field) => {
                  const error =
                    fieldErrors[
                      field.name as keyof DemoRequestErrors
                    ];

                  return (
                    <label
                      key={field.id}
                      className="block"
                    >
                      <span className="text-[.9rem] font-medium">
                        {field.label}
                      </span>

                      <input
                        name={field.name}
                        type={field.type ?? 'text'}
                        placeholder={field.placeholder}
                        aria-invalid={Boolean(error)}
                        aria-describedby={
                          error
                            ? `${field.id}-error`
                            : undefined
                        }
                        className={`mt-2 w-full border-b bg-transparent py-2 text-[.9rem] outline-none ${
                          error
                            ? 'border-red-500'
                            : 'border-neutral-border'
                        }`}
                      />

                      {error && (
                        <p
                          id={`${field.id}-error`}
                          className="mt-1 text-[1.1rem] text-red-500"
                        >
                          {error}
                        </p>
                      )}
                    </label>
                  );
                })}
              </div>

              {/* Country */}
              <div>
                <label className="block">
                  <span className="text-[.9rem] font-medium">
                    {model.form.country.label}
                  </span>

                  <select
                    name="country"
                    aria-invalid={Boolean(fieldErrors.country)}
                    aria-describedby={
                      fieldErrors.country
                        ? 'country-error'
                        : undefined
                    }
                    className={`mt-2 w-full border-b bg-transparent py-2 text-[.9rem] outline-none ${
                      fieldErrors.country
                        ? 'border-red-500'
                        : 'border-neutral-border'
                    }`}
                  >
                    <option value="">
                      {model.form.country.placeholder}
                    </option>

                    {countries.map((country) => (
                      <option
                        key={country.value}
                        value={country.value}
                      >
                        {country.label}
                      </option>
                    ))}
                  </select>

                  {fieldErrors.country && (
                    <p
                      id="country-error"
                      className="mt-1 text-[1.1rem] text-red-500"
                    >
                      {fieldErrors.country}
                    </p>
                  )}
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer inline-flex items-center gap-2 rounded-md bg-brand-blue px-4 text-sm py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting
                  ? isFrench
                    ? 'Envoi...'
                    : 'Sending...'
                  : model.form.submitButton.label}

                <ArrowRight className="h-5 w-5" />
              </button>

              {/* General error */}
              {status === 'error' && (
                <p
                  role="alert"
                  className="text-red-600"
                >
                  {errorMessage ?? genericErrorMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}