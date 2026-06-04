'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import HeroCarousel, {
  extractCarouselSlidesFromPagePayload,
  type HeroSlide,
} from '../travel-agency-software/[slug]/blocks/hero-carousel';

const PAGE_ID = '1';

const routeLocaleToApiLocale: Record<string, string> = {
  en: 'en-US',
  'en-ca': 'en-US',
  'fr-ca': 'fr-CA',
  'en-au': 'en-AU',
};

function toApiLocale(routeLocale: unknown): string {
  if (typeof routeLocale !== 'string' || !routeLocale.trim()) {
    return 'en-US';
  }

  return routeLocaleToApiLocale[routeLocale] ?? 'en-US';
}

export default function PageApiDebugCarousel() {
  const params = useParams<{ locale?: string }>();
  const apiLocale = toApiLocale(params?.locale);
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const query = new URLSearchParams({
          depth: '2',
          draft: 'false',
          locale: apiLocale,
          trash: 'false',
        });

        const response = await fetch(`/api/pages/${PAGE_ID}?${query.toString()}`, { cache: 'no-store' });

        if (!response.ok) {
          if (!mounted) {
            return;
          }

          setSlides([]);
          setError(`Request failed: ${response.status} ${response.statusText}`);
          return;
        }

        const payload: unknown = await response.json();
        if (!mounted) {
          return;
        }

        const extractedSlides = extractCarouselSlidesFromPagePayload(payload);
        setSlides(extractedSlides);
        setError(extractedSlides.length ? null : `No carousel slides found in API payload for locale ${apiLocale}.`);
      } catch {
        if (!mounted) {
          return;
        }

        setSlides([]);
        setError(`Request failed: could not reach API endpoint for locale ${apiLocale}.`);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [apiLocale]);

  if (loading) {
    return (
      <section className="mx-auto w-full max-w-7xl rounded-lg border border-dashed border-slate-300 bg-white px-4 py-3 text-sm text-slate-600 sm:px-6 lg:px-8">
        Loading API carousel...
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto w-full max-w-7xl rounded-lg border border-dashed border-red-300 bg-white px-4 py-3 text-sm text-red-700 sm:px-6 lg:px-8">
        {error}
      </section>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl">
      <HeroCarousel slides={slides} effect="fade" navigation pagination contentAlignment="alternate" />
    </div>
  );
}