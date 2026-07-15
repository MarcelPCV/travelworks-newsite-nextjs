'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  DEFAULT_ROUTE_LOCALE,
  getTravelAgencySoftwareSegment,
  localeOptions,
  travelAgencySoftwareSlugs,
} from '@/app/[locale]/locale-config';
import { travelAgencyMenuItems } from './menu-travel-agency-software-config';

type ResolvedMenuItem = {
  key: string;
  label: string;
  href: string;
  localizedSlug: string;
  icon: React.ComponentType<{ className?: string }>;
};

function normalizePathname(pathname: string): string {
  if (!pathname) return '/';
  return pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
}

function getRouteLocaleFromMessageLocale(messageLocale: string): string {
  return (
    localeOptions.find((item) => item.messageLocale === messageLocale)?.routeLocale ??
    DEFAULT_ROUTE_LOCALE
  );
}

export default function MenuTravelAgencySoftware() {
  const pathname = usePathname();
  const messageLocale = useLocale();
  const t = useTranslations('nav.products.links');
  const tNav = useTranslations('nav');

  const containerRef = useRef<HTMLDivElement | null>(null);
  const measureMoreRef = useRef<HTMLButtonElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const itemMeasureRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const [visibleCount, setVisibleCount] = useState(travelAgencyMenuItems.length);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMeasured, setIsMeasured] = useState(false);

  const routeLocale = getRouteLocaleFromMessageLocale(messageLocale);
  const localizedSegment = getTravelAgencySoftwareSegment(routeLocale);

  const withLocalePrefix = useCallback(
    (path: string) => (routeLocale === DEFAULT_ROUTE_LOCALE ? path : `/${routeLocale}${path}`),
    [routeLocale],
  );

  const items = useMemo<ResolvedMenuItem[]>(
    () =>
      travelAgencyMenuItems.map((item) => {
        const localizedSlug =
          travelAgencySoftwareSlugs[item.canonicalSlug]?.[routeLocale] ?? item.canonicalSlug;
        return {
          key: item.key,
          label: t(item.key),
          href: withLocalePrefix(`/${localizedSegment}/${localizedSlug}`),
          localizedSlug,
          icon: item.icon,
        };
      }),
    [localizedSegment, routeLocale, t, withLocalePrefix],
  );

  const activeKey = useMemo(() => {
    const normalized = normalizePathname(pathname);
    const segments = normalized.split('/').filter(Boolean);
    const pathSegments =
      routeLocale === DEFAULT_ROUTE_LOCALE
        ? segments
        : segments.length > 0
          ? segments.slice(1)
          : [];

    if (pathSegments[0] !== localizedSegment || pathSegments.length !== 2) {
      return null;
    }

    const currentSlug = pathSegments[1];
    return items.find((item) => item.localizedSlug === currentSlug)?.key ?? null;
  }, [items, localizedSegment, pathname, routeLocale]);

  const recalcVisible = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.clientWidth;
    if (containerWidth <= 0) return;

    const itemWidths = items.map((item) => {
      const el = itemMeasureRefs.current[item.key];
      return el ? el.offsetWidth : 0;
    });

    if (itemWidths.some((width) => width === 0)) {
      setVisibleCount(items.length);
      setIsMeasured(false);
      return;
    }

    const moreWidth = measureMoreRef.current?.offsetWidth ?? 100;
    const gap = 8;

    const totalItemsWidth = itemWidths.reduce((sum, width, index) => {
      return sum + width + (index > 0 ? gap : 0);
    }, 0);

    if (totalItemsWidth <= containerWidth) {
      setVisibleCount(items.length);
      setIsMeasured(true);
      return;
    }

    let running = 0;
    let fitCount = 0;

    for (let i = 0; i < itemWidths.length; i += 1) {
      const next = itemWidths[i] + (i > 0 ? gap : 0);
      const reserveMore = i < itemWidths.length - 1 ? moreWidth + gap : 0;
      if (running + next + reserveMore > containerWidth) {
        break;
      }
      running += next;
      fitCount = i + 1;
    }

    setVisibleCount(Math.max(0, fitCount));
    setIsMeasured(true);
  }, [items]);

  useEffect(() => {
    recalcVisible();
    const observer = new ResizeObserver(() => recalcVisible());

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [recalcVisible]);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    };

    const onEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMoreOpen(false);
      }
    };

    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onEsc);
    };
  }, []);

  const visibleItems = items.slice(0, visibleCount);
  const overflowItems = items.slice(visibleCount);
  const showMore = isMeasured && overflowItems.length > 0;

  return (
    <div className="relative z-20 hidden border-b border-zinc-600 bg-zinc-800 md:block">
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-6 lg:px-8">
        <div ref={containerRef} className="relative flex min-h-20 items-center justify-center">
          <div
            className={`flex min-w-0 flex-1 justify-center overflow-hidden ${
              showMore ? 'pr-24' : ''
            }`}
          >
            <div className="flex items-center gap-2">
              {visibleItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeKey === item.key;
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={`group inline-flex shrink-0 items-center gap-2 rounded-md px-2 py-3 text-sm transition-colors duration-150 ${
                      isActive ? 'text-white' : 'text-zinc-300 hover:text-white'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full border transition-colors ${
                        isActive
                          ? 'border-orange-400 bg-orange-400/20'
                          : 'border-zinc-500 bg-zinc-600/40 group-hover:border-zinc-300'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className={`whitespace-nowrap ${isActive ? 'font-semibold' : ''}`}>
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {showMore ? (
            <div ref={dropdownRef} className="absolute right-0 top-1/2 z-30 -translate-y-1/2">
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-md border border-zinc-500 px-3 py-2 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-300 hover:text-white"
                aria-haspopup="menu"
                aria-expanded={isMoreOpen}
                onClick={() => setIsMoreOpen((prev) => !prev)}
              >
                {tNav('more')}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${isMoreOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <div
                role="menu"
                aria-hidden={!isMoreOpen}
                className={`absolute right-0 top-full z-50 mt-2 w-72 rounded-lg border border-zinc-600 bg-zinc-900 p-2 shadow-xl transition duration-150 ${
                  isMoreOpen ? 'visible opacity-100' : 'pointer-events-none invisible opacity-0'
                }`}
              >
                {overflowItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeKey === item.key;
                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      role="menuitem"
                      className={`flex items-center gap-2 rounded-md border-l-2 px-2 py-2 text-sm transition-colors ${
                        isActive
                          ? 'border-orange-400 bg-orange-400/15 text-white'
                          : 'border-transparent text-zinc-200 hover:bg-zinc-700/50 hover:text-white'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full border bg-zinc-700/40 ${
                          isActive ? 'border-orange-400' : 'border-zinc-500'
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <span className={isActive ? 'font-semibold' : ''}>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div
        className="pointer-events-none absolute left-[-9999px] top-0 opacity-0"
        aria-hidden="true"
      >
        <div className="flex items-center gap-2">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.key}
                ref={(element) => {
                  itemMeasureRefs.current[item.key] = element;
                }}
                className="inline-flex items-center gap-2 rounded-md px-2 py-3 text-sm text-zinc-300"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-500 bg-zinc-600/40">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="whitespace-nowrap">{item.label}</span>
              </a>
            );
          })}
          <button
            ref={measureMoreRef}
            type="button"
            className="inline-flex items-center gap-1 rounded-md border border-zinc-500 px-3 py-2 text-sm font-medium"
          >
            {tNav('more')}
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
