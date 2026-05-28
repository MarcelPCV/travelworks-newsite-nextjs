'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import HeroCarousel, { type HeroSlide, type HeroContentPosition } from './old-components/hero-carousel';

const PAGE_ID = '1';

const routeLocaleToApiLocale: Record<string, string> = {
  en: 'en-US',
  'en-ca': 'en-US',
  'fr-ca': 'fr-CA',
  'en-au': 'en-AU',
};

const backgrounds = [
  'bg-[radial-gradient(circle_at_85%_34%,rgba(255,170,59,0.9)_0_28%,transparent_29%),linear-gradient(135deg,#ffffff_0%,#f8fafc_45%,#eef3fb_100%)]',
  'bg-[radial-gradient(circle_at_78%_24%,rgba(243,112,34,0.75)_0_24%,transparent_25%),linear-gradient(130deg,#ffffff_0%,#f0f6ff_52%,#e7eefc_100%)]',
  'bg-[radial-gradient(circle_at_86%_30%,rgba(255,170,59,0.75)_0_26%,transparent_27%),linear-gradient(120deg,#ffffff_0%,#f6f9ff_45%,#ecf2fd_100%)]',
];

const mediaGradients = [
  'bg-[linear-gradient(155deg,#2e5cb3_0%,#3c79da_45%,#0b1e4a_100%)]',
  'bg-[linear-gradient(145deg,#0b1e4a_0%,#2e5cb3_40%,#3c79da_100%)]',
  'bg-[linear-gradient(150deg,#2e5cb3_0%,#0b1e4a_55%,#3c79da_100%)]',
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function asString(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.trim() ? value : fallback;
}

function toContentPosition(value: unknown): HeroContentPosition | undefined {
  if (value === 'left' || value === 'right') {
    return value;
  }

  return undefined;
}

function toApiSlides(payload: unknown): HeroSlide[] {
  if (!isRecord(payload)) {
    return [];
  }

  const layout = payload.layout;
  if (!Array.isArray(layout)) {
    return [];
  }

  const pageTitle = asString(payload.title, 'TravelWorks Page');
  const mappedSlides: HeroSlide[] = [];

  for (const block of layout) {
    if (!isRecord(block) || block.blockType !== 'carousel' || !Array.isArray(block.slides)) {
      continue;
    }

    for (let index = 0; index < block.slides.length; index += 1) {
      const rawSlide = block.slides[index];
      const slide = isRecord(rawSlide) ? rawSlide : {};
      const slideImage = isRecord(slide.image) ? slide.image : {};
      const slideLink = isRecord(slide.link) ? slide.link : {};

      const title = asString(slide.title, `Slide ${index + 1}`);
      const description = asString(slide.description, 'No description available for this slide yet.');
      const ctaLabel = asString(slideLink.label, 'Learn more');
      const mediaCaption = asString(slideImage.alt, asString(slideImage.url, 'API media'));

      mappedSlides.push({
        id: asString(slide.id, `api-slide-${index + 1}`),
        eyebrow: pageTitle,
        title,
        description,
        ctaLabel,
        background: backgrounds[index % backgrounds.length],
        mediaGradient: mediaGradients[index % mediaGradients.length],
        mediaCaption,
        contentPosition: toContentPosition(slide.align),
      });
    }
  }

  return mappedSlides;
}

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

        const extractedSlides = toApiSlides(payload);
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