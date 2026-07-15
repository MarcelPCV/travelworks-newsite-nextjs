'use client';

import { ChevronDown, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { GlobeCheck } from 'lucide-react';
import {
  DEFAULT_ROUTE_LOCALE,
  localeOptions,
  replaceLocaleInPath,
  routeToMessageLocale,
} from '@/app/[locale]/locale-config';

const DISMISSED_STORAGE_KEY = 'travelworks.location_bar.dismissed';

export default function LocationConfirmationBar() {
  const pathname = usePathname();
  const router = useRouter();
  const activeMessageLocale = useLocale();
  const t = useTranslations('locationBar');

  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasPendingSelection, setHasPendingSelection] = useState(false);

  const activeRouteLocale =
    localeOptions.find((item) => item.messageLocale === activeMessageLocale)?.routeLocale ??
    DEFAULT_ROUTE_LOCALE;

  const [selectedRouteLocale, setSelectedRouteLocale] = useState(activeRouteLocale);

  useEffect(() => {
    const dismissed = window.localStorage.getItem(DISMISSED_STORAGE_KEY) === '1';
    if (dismissed) {
      const frameId = window.requestAnimationFrame(() => {
        setIsVisible(false);
      });

      return () => {
        window.cancelAnimationFrame(frameId);
      };
    }
  }, []);

  const effectiveRouteLocale = hasPendingSelection ? selectedRouteLocale : activeRouteLocale;

  const selectedLabel =
    localeOptions.find((item) => item.routeLocale === effectiveRouteLocale)?.label ??
    localeOptions[0].label;

  const localeLinks = useMemo(
    () =>
      localeOptions.map((item) => ({
        ...item,
        href: replaceLocaleInPath(pathname, item.routeLocale),
        isActive: routeToMessageLocale[item.routeLocale] === activeMessageLocale,
      })),
    [pathname, activeMessageLocale],
  );

  const targetHref = replaceLocaleInPath(pathname, effectiveRouteLocale);

  const handleClose = () => {
    window.localStorage.setItem(DISMISSED_STORAGE_KEY, '1');
    setIsVisible(false);
    setIsOpen(false);
  };

  const handleContinue = () => {
    setHasPendingSelection(false);
    router.push(targetHref);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="border-b border-zinc-700 bg-zinc-900 text-zinc-100">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center gap-2 lg:flex-row lg:items-center">
          <div className="w-6">
            <GlobeCheck className="h-6 w-6 text-gray-400" />
          </div>
          <p className="text-sm leading-5 text-zinc-100">{t('message')}</p>
        </div>
        <div className="flex items-center gap-2 self-start lg:self-auto">
          <div className="relative">
            <button
              type="button"
              className="inline-flex min-w-44 items-center justify-between rounded-md border border-zinc-600 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 transition hover:bg-zinc-700"
              aria-expanded={isOpen}
              aria-label={t('selectLabel')}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <span>{selectedLabel}</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </button>

            {isOpen ? (
              <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-md border border-zinc-700 bg-zinc-900 p-1 shadow-xl">
                {localeLinks.map((item) => (
                  <button
                    key={item.routeLocale}
                    type="button"
                    className={`block w-full rounded px-3 py-2 text-left text-sm transition ${
                      item.routeLocale === selectedRouteLocale
                        ? 'bg-zinc-100 text-zinc-900'
                        : 'text-zinc-100 hover:bg-zinc-800'
                    }`}
                    onClick={() => {
                      setSelectedRouteLocale(item.routeLocale);
                      setHasPendingSelection(true);
                      setIsOpen(false);
                    }}
                    aria-current={item.isActive ? 'true' : undefined}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <button
            type="button"
            className="rounded-md border border-zinc-300 bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-white"
            onClick={handleContinue}
          >
            {t('continue')}
          </button>

          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
            aria-label={t('close')}
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
