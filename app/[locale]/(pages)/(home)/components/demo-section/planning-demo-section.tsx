'use client';

import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import type { CountryOption } from '@/app/lib/countries';
import type { PlanningDemoSectionModel } from './type';
import { demoRequestSchema, type DemoRequestErrors } from './zod-validations';
import Image from 'next/image';
import TitleSection from '@/app/[locale]/components/ui/title-section';

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
    </section>
  );
}
