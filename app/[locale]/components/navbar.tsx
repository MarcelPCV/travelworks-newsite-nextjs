'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { DEFAULT_ROUTE_LOCALE, localeOptions, routeToMessageLocale } from '../locale-config';
import { Globe } from 'lucide-react';
import CtaButton from './cta-button';

const topLevelLinks = [
  { key: 'home', href: '#' },
  { key: 'services', href: '#' },
  { key: 'pricing', href: '#' },
  { key: 'contact', href: '#' },
] as const;

const secondLevelLinks = [
  { key: 'dashboard', href: '#' },
  { key: 'team', href: '#' },
  { key: 'settings', href: '#' },
] as const;

function replaceLocaleInPath(pathname: string, targetLocale: string): string {
  const segments = pathname.split('/').filter(Boolean);
  const knownRouteLocales = new Set(localeOptions.map((item) => item.routeLocale));

  // If the current path starts with a locale segment, remove it before switching.
  if (segments.length > 0 && knownRouteLocales.has(segments[0])) {
    segments.shift();
  }

  const suffixPath = segments.join('/');

  if (targetLocale === DEFAULT_ROUTE_LOCALE) {
    return suffixPath ? `/${suffixPath}` : '/';
  }

  return suffixPath ? `/${targetLocale}/${suffixPath}` : `/${targetLocale}`;
}

export default function Navbar() {
  const pathname = usePathname();
  const activeMessageLocale = useLocale();
  const t = useTranslations('nav');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSectionOpen, setIsSectionOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const currentRouteLocale =
    localeOptions.find((item) => item.messageLocale === activeMessageLocale)?.routeLocale ?? DEFAULT_ROUTE_LOCALE;

  const homeHref = currentRouteLocale === DEFAULT_ROUTE_LOCALE ? '/' : `/${currentRouteLocale}`;

  const activeLanguageLabel =
    localeOptions.find((item) => item.routeLocale === currentRouteLocale)?.label ?? localeOptions[0].label;

  const languageLinks = useMemo(
    () =>
      localeOptions.map((item) => ({
        ...item,
        href: replaceLocaleInPath(pathname, item.routeLocale),
        isActive: routeToMessageLocale[item.routeLocale] === activeMessageLocale,
      })),
    [pathname, activeMessageLocale]
  );

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center px-4 py-3 sm:px-6 lg:px-8">
        <Link href={homeHref} className="text-xl font-semibold tracking-tight text-zinc-900">
          TravelWorks
        </Link>

        <button
          type="button"
          className="ml-auto inline-flex items-center rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 lg:hidden"
          aria-expanded={isMobileOpen}
          aria-controls="mobile-menu"
          onClick={() => {
            setIsMobileOpen((prev) => !prev);
            setIsSectionOpen(false);
            setIsLangOpen(false);
          }}
        >
          {isMobileOpen ? t('close') : t('menu')}
        </button>

        <div className="ml-10 hidden flex-1 items-center justify-between lg:flex">
          <ul className="flex items-center gap-2">
            {topLevelLinks.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-900"
                >
                  {t(`items.${item.key}`)}
                </Link>
              </li>
            ))}
            <li className="relative">
              <button
                type="button"
                className="rounded-md px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-900"
                aria-expanded={isSectionOpen}
                onClick={() => {
                  setIsSectionOpen((prev) => !prev);
                  setIsLangOpen(false);
                }}
              >
                {t('items.more')}
              </button>
              {isSectionOpen ? (
                <div className="absolute left-0 top-full mt-2 w-52 rounded-xl border border-zinc-200 bg-white p-2 shadow-lg">
                  {secondLevelLinks.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
                    >
                      {t(`secondLevel.${item.key}`)}
                    </Link>
                  ))}
                </div>
              ) : null}
            </li>
          </ul>

          <CtaButton label="ASK FOR A DEMO" variant="orangeGradient" size="xs" />
          <CtaButton label="LOG IN" variant="blue" size="xs" />

          <div className="relative">
            <button
              type="button"
              className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
              aria-expanded={isLangOpen}
              onClick={() => {
                setIsLangOpen((prev) => !prev);
                setIsSectionOpen(false);
              }}
            >
              <Globe className="inline-block mr-2 w-4 h-4" />
              {t('languagePrefix', { language: activeLanguageLabel })}
            </button>
            {isLangOpen ? (
              <div className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-zinc-200 bg-white p-2 shadow-lg">
                {languageLinks.map((item) => (
                  <Link
                    key={item.routeLocale}
                    href={item.href}
                    className={`block rounded-md px-3 py-2 text-sm transition ${
                      item.isActive ? 'bg-zinc-900 text-white' : 'text-zinc-700 hover:bg-zinc-100'
                    }`}
                    onClick={() => setIsLangOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </nav>

      {isMobileOpen ? (
        <div id="mobile-menu" className="border-t border-zinc-200 bg-white px-4 py-3 lg:hidden">
          <ul className="space-y-1">
            {topLevelLinks.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
                >
                  {t(`items.${item.key}`)}
                </Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                className="w-full rounded-md px-3 py-2 text-left text-sm font-medium text-zinc-700 hover:bg-zinc-100"
                onClick={() => setIsSectionOpen((prev) => !prev)}
              >
                {t('items.more')}
              </button>
              {isSectionOpen ? (
                <div className="mt-1 space-y-1 pl-3">
                  {secondLevelLinks.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-100"
                    >
                      {t(`secondLevel.${item.key}`)}
                    </Link>
                  ))}
                </div>
              ) : null}
            </li>
          </ul>

          <ul>
            <li className="py-2"><CtaButton label="ASK FOR A DEMO" variant="orangeGradient" size="xs" /></li>
            <li className="py-2"><CtaButton label="LOG IN" variant="blue" size="xs" /></li>
          </ul>

          <div className="mt-3 border-t border-zinc-200 pt-3">
            <p className="px-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">{t('languageTitle')}</p>
            <div className="mt-2 space-y-1">
              {languageLinks.map((item) => (
                <Link
                  key={item.routeLocale}
                  href={item.href}
                  className={`block rounded-md px-3 py-2 text-sm transition ${
                    item.isActive ? 'bg-zinc-900 text-white' : 'text-zinc-700 hover:bg-zinc-100'
                  }`}
                  onClick={() => setIsMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
