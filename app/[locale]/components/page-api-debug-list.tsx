'use client';

import { useEffect, useState } from 'react';

const PAGE_API_DEBUG_PATH = '/api/pages/1?depth=2&draft=false&locale=en-US&trash=false';

type DebugItem = {
  key: string;
  value: string;
};

type SlideDebugInfo = {
  index: number;
  id: string;
  title: string;
  description: string;
  align: string;
  imageUrl: string;
  imageAlt: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function stringifyValue(value: unknown): string {
  if (value == null) {
    return 'null';
  }

  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  try {
    const text = JSON.stringify(value);
    return text.length > 200 ? `${text.slice(0, 200)}...` : text;
  } catch {
    return '[unserializable value]';
  }
}

function toDebugItems(payload: unknown): DebugItem[] {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return [{ key: 'value', value: stringifyValue(payload) }];
  }

  const entries = Object.entries(payload as Record<string, unknown>);
  if (!entries.length) {
    return [{ key: 'value', value: '[empty object]' }];
  }

  return entries.slice(0, 30).map(([key, value]) => ({
    key,
    value: stringifyValue(value),
  }));
}

function toSlideDebugInfo(payload: unknown): SlideDebugInfo[] {
  if (!isRecord(payload)) {
    return [];
  }

  const layout = payload.layout;
  if (!Array.isArray(layout)) {
    return [];
  }

  const slideItems: SlideDebugInfo[] = [];

  for (const block of layout) {
    if (!isRecord(block)) {
      continue;
    }

    if (block.blockType !== 'carousel') {
      continue;
    }

    const slides = block.slides;
    if (!Array.isArray(slides)) {
      continue;
    }

    for (let index = 0; index < slides.length; index += 1) {
      const rawSlide = slides[index];

      if (!isRecord(rawSlide)) {
        slideItems.push({
          index,
          id: 'n/a',
          title: 'n/a',
          description: 'n/a',
          align: 'n/a',
          imageUrl: 'n/a',
          imageAlt: 'n/a',
        });
        continue;
      }

      const image = isRecord(rawSlide.image) ? rawSlide.image : null;
      const imageUrl = image && typeof image.url !== 'undefined' ? stringifyValue(image.url) : 'n/a';
      const imageAlt = image && typeof image.alt !== 'undefined' ? stringifyValue(image.alt) : 'n/a';

      slideItems.push({
        index,
        id: typeof rawSlide.id !== 'undefined' ? stringifyValue(rawSlide.id) : 'n/a',
        title: typeof rawSlide.title !== 'undefined' ? stringifyValue(rawSlide.title) : 'n/a',
        description: typeof rawSlide.description !== 'undefined' ? stringifyValue(rawSlide.description) : 'n/a',
        align: typeof rawSlide.align !== 'undefined' ? stringifyValue(rawSlide.align) : 'n/a',
        imageUrl,
        imageAlt,
      });
    }
  }

  return slideItems;
}

export default function PageApiDebugList() {
  const [items, setItems] = useState<DebugItem[]>([]);
  const [slides, setSlides] = useState<SlideDebugInfo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const response = await fetch(PAGE_API_DEBUG_PATH, { cache: 'no-store' });

        if (!response.ok) {
          if (!mounted) {
            return;
          }

          setItems([]);
          setError(`Request failed: ${response.status} ${response.statusText}`);
          return;
        }

        const payload: unknown = await response.json();
        if (!mounted) {
          return;
        }

        setItems(toDebugItems(payload));
        setSlides(toSlideDebugInfo(payload));
        setError(null);
      } catch {
        if (!mounted) {
          return;
        }

        setItems([]);
        setSlides([]);
        setError('Request failed: could not reach API endpoint.');
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
  }, []);

  return (
    <section className="mx-auto mt-3 w-full max-w-7xl rounded-lg border border-dashed border-slate-300 bg-white px-4 py-3 sm:px-6 lg:px-8">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700">Temporary API Debug Data</h2>
      <p className="mt-1 text-xs text-slate-500">{PAGE_API_DEBUG_PATH}</p>

      {loading ? <p className="mt-3 text-sm text-slate-600">Loading...</p> : null}

      {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}

      {!loading && !error ? (
        <>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
            {items.map((item) => (
              <li key={item.key}>
                <strong>{item.key}:</strong> {item.value}
              </li>
            ))}
          </ul>

          <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
            <h3 className="font-semibold text-slate-800">Slides ({slides.length})</h3>

            {slides.length ? (
              <ul className="mt-2 list-disc space-y-2 pl-5">
                {slides.map((slide, index) => (
                  <li key={`${slide.id}-${index}`}>
                    <div>
                      <strong>slideIndex:</strong> {slide.index}
                    </div>
                    <div>
                      <strong>id:</strong> {slide.id}
                    </div>
                    <div>
                      <strong>title:</strong> {slide.title}
                    </div>
                    <div>
                      <strong>description:</strong> {slide.description}
                    </div>
                    <div>
                      <strong>align:</strong> {slide.align}
                    </div>
                    <div>
                      <strong>imageUrl:</strong> {slide.imageUrl}
                    </div>
                    <div>
                      <strong>imageAlt:</strong> {slide.imageAlt}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-slate-600">No carousel slides found in payload.</p>
            )}
          </div>
        </>
      ) : null}
    </section>
  );
}