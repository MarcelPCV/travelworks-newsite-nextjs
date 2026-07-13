'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import {
  DEFAULT_ROUTE_LOCALE,
  getAboutUsSegment,
  getNewsSegment,
  getTrainingSegment,
  getTravelAgencySoftwareSegment,
  localeOptions,
  replaceLocaleInPath,
  routeToMessageLocale,
} from '@/app/[locale]/locale-config';
import { ChevronDown, Globe, CircleArrowRight, Search, X } from 'lucide-react';
import CtaButton from '@/app/[locale]/components/ui/cta-button';
import DropdownCtaButton, {
  type DropdownCtaOption,
} from '@/app/[locale]/components/ui/dropdown-cta-button';
import {
  aboutUsLinkIcons,
  aboutUsLinks,
  loginSlugByOptionId,
  menuItemIconClassName,
  productColumnsByCategory,
  productLinkIcons,
  trainingLinkIcons,
  trainingLinks,
  type ProductCategory,
  type ProductLinkKey,
} from '@/app/[locale]/components/layout/navbar/navbar-config';
import {
  getAboutUsHref,
  getAskForDemoHref,
  getOneLevelHref,
  getSolutionHref,
  getTrainingHref,
} from '@/app/[locale]/components/layout/navbar/navbar-href';

type DesktopPanel = 'products' | 'aboutUs' | 'training' | null;
const EXTERNAL_RETURN_REFRESH_KEY = 'travelworks.navbar.external-return-refresh';

function normalizePath(path: string): string {
  if (!path) return '/';
  return path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
}

export default function Navbar() {
  const pathname = usePathname();
  const activeMessageLocale = useLocale();
  const t = useTranslations('nav');
  const locale = useLocale();

  const [activeDesktopPanel, setActiveDesktopPanel] = useState<DesktopPanel>(null);
  const [activeProductCategory] =
    useState<ProductCategory>('travelworks');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<'products' | 'aboutUs' | 'training' | null>(
    null,
  );
  const [isMobileLoginOpen, setIsMobileLoginOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [loginDropdownCloseSignal, setLoginDropdownCloseSignal] = useState(0);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  const currentRouteLocale =
    localeOptions.find((item) => item.messageLocale === activeMessageLocale)?.routeLocale ??
    DEFAULT_ROUTE_LOCALE;

  const withLocalePrefix = useCallback(
    (path: string) =>
      currentRouteLocale === DEFAULT_ROUTE_LOCALE ? path : `/${currentRouteLocale}${path}`,
    [currentRouteLocale],
  );

  const oneLevelHref = useCallback(
    (slug: string) => getOneLevelHref(slug, withLocalePrefix),
    [withLocalePrefix],
  );

  const solutionHref = useCallback(
    (linkKey: ProductLinkKey) => getSolutionHref(linkKey, currentRouteLocale, withLocalePrefix),
    [currentRouteLocale, withLocalePrefix],
  );

  const aboutUsHref = useCallback(
    (linkKey: (typeof aboutUsLinks)[number]) =>
      getAboutUsHref(linkKey, currentRouteLocale, withLocalePrefix),
    [currentRouteLocale, withLocalePrefix],
  );

  const trainingHref = useCallback(
    (linkKey: (typeof trainingLinks)[number]) =>
      getTrainingHref(linkKey, currentRouteLocale, withLocalePrefix),
    [currentRouteLocale, withLocalePrefix],
  );

  const homeHrefByRouteLocale: Record<string, string> = {
    [DEFAULT_ROUTE_LOCALE]: '/',
    'en-ca': '/en-ca',
    'fr-ca': '/fr-ca',
    'en-au': '/en-au',
  };

  const homeHref =
    homeHrefByRouteLocale[currentRouteLocale] ??
    (currentRouteLocale === DEFAULT_ROUTE_LOCALE ? '/' : `/${currentRouteLocale}`);
  const askForDemoHref = getAskForDemoHref(currentRouteLocale, withLocalePrefix);
  const newsHref = withLocalePrefix(`/${getNewsSegment(currentRouteLocale)}`);
  const travelworks= "https://new.pcvweb.com/#/login/"
  const travelworksLegacy= locale === 'fr-ca' ? "https://www.pcvweb.com/Login.aspx?lang=FR" : "https://www.pcvweb.com/Login.aspx?lang=EN"
  const knowledgeBaseHref = "https://www.tw-pcv-learning.com/en"
  const supportLoginHref = 'https://support.pcvweb.com/auth/v3/signin?brand_id=360003288198&locale=en-ca&return_to=https%3A%2F%2Fsupport.pcvweb.com%2Fhc%2Fen-ca%2Frequests%2Fnew&role=end_user';

  const logInOptions: DropdownCtaOption[] = [
    {
      id: 'Travelworks',
      label: t('cta.logInOptions.travelworks'),
      href: travelworks,
      target: '_blank',
      rel: 'noopener noreferrer',
      icon: <CircleArrowRight aria-hidden="true" />,
    },
    {
      id: 'TravelworksLegacy',
      label: t('cta.logInOptions.travelworksLegacy'),
      href: travelworksLegacy,
      target: '_blank',
      rel: 'noopener noreferrer',
      icon: <CircleArrowRight aria-hidden="true" />,
    },
    {
      id: 'Support',
      label: t('cta.logInOptions.support'),
      href: supportLoginHref,
      target: '_blank',
      rel: 'noopener noreferrer',
      icon: <CircleArrowRight aria-hidden="true" />,
    },
    {
      id: 'Training',
      label: t('cta.logInOptions.trainingPlatform'),
      href: oneLevelHref(loginSlugByOptionId.Training),
      icon: <CircleArrowRight aria-hidden="true" />,
    },
    {
      id: 'Knowledge Base',
      label: t('cta.logInOptions.knowledgeBase'),
      href: knowledgeBaseHref,
      target: '_blank',
      rel: 'noopener noreferrer',
      icon: <CircleArrowRight aria-hidden="true" />,
    },
  ];

  const getLanguageLabel = useCallback(
    (route: string) => {
      const key = `languages.${route}`;
      try {
        const translated = t(key);
        if (translated && !translated.includes('languages.')) return translated;
      } catch {
        // ignore and fallback
      }
      return (
        localeOptions.find((item) => item.routeLocale === route)?.label ?? localeOptions[0].label
      );
    },
    [t],
  );

  const activeLanguageLabel = getLanguageLabel(currentRouteLocale);

  const languageLinks = useMemo(
    () =>
      localeOptions.map((item) => ({
        ...item,
        label: getLanguageLabel(item.routeLocale),
        href: replaceLocaleInPath(pathname, item.routeLocale),
        isActive: routeToMessageLocale[item.routeLocale] === activeMessageLocale,
      })),
    [pathname, activeMessageLocale, getLanguageLabel],
  );

  const isProductsOpen = activeDesktopPanel === 'products';
  const isAboutUsOpen = activeDesktopPanel === 'aboutUs';
  const isTrainingOpen = activeDesktopPanel === 'training';

  const normalizedPathname = normalizePath(pathname);
  const pathnameSegments = normalizedPathname.split('/').filter(Boolean);
  const contentPathSegments =
    currentRouteLocale === DEFAULT_ROUTE_LOCALE
      ? pathnameSegments
      : pathnameSegments.length > 0
        ? pathnameSegments.slice(1)
        : [];

  const activeTopLevelSection = contentPathSegments[0] ?? '';
  const isProductsActive =
    activeTopLevelSection === getTravelAgencySoftwareSegment(currentRouteLocale);
  const isAboutUsActive = activeTopLevelSection === getAboutUsSegment(currentRouteLocale);
  const isTrainingActive = activeTopLevelSection === getTrainingSegment(currentRouteLocale);

  const isHrefActive = useCallback(
    (href: string) => normalizePath(pathname) === normalizePath(href),
    [pathname],
  );

  const closeMobileMenu = useCallback(() => {
    setIsMobileOpen(false);
    setMobileSection(null);
    setIsMobileLoginOpen(false);
    setLoginDropdownCloseSignal((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (!isSearchOpen) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      searchInputRef.current?.focus();
    });

    return () => cancelAnimationFrame(frame);
  }, [isSearchOpen]);

  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      
      if (target.closest('[data-navbar-root="true"]')) {
        return;
      }

      setActiveDesktopPanel(null);
      setIsLangOpen(false);
      setLoginDropdownCloseSignal((prev) => prev + 1);
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDesktopPanel(null);
        setIsLangOpen(false);
        closeMobileMenu();
        setIsSearchOpen(false);
        setLoginDropdownCloseSignal((prev) => prev + 1);
      }
    };

    document.addEventListener('mousedown', onDocumentClick);
    document.addEventListener('keydown', onEscape);

    return () => {
      document.removeEventListener('mousedown', onDocumentClick);
      document.removeEventListener('keydown', onEscape);
    };
  }, [closeMobileMenu]);

  useEffect(() => {
    const recoverFromExternalReturn = () => {
      const shouldRefreshAfterExternalReturn =
        window.sessionStorage.getItem(EXTERNAL_RETURN_REFRESH_KEY) === '1';

      if (shouldRefreshAfterExternalReturn) {
        window.sessionStorage.removeItem(EXTERNAL_RETURN_REFRESH_KEY);
        window.location.reload();
        return true;
      }

      return false;
    };

    const onPageShow = (event: PageTransitionEvent) => {
      if (recoverFromExternalReturn()) {
        return;
      }

      if (!event.persisted) {
        return;
      }

      setActiveDesktopPanel(null);
      setIsLangOpen(false);
      closeMobileMenu();
      setIsSearchOpen(false);
      setLoginDropdownCloseSignal((prev) => prev + 1);
    };

    const onFocus = () => {
      recoverFromExternalReturn();
    };

    const onPopState = () => {
      recoverFromExternalReturn();
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        recoverFromExternalReturn();
      }
    };

    recoverFromExternalReturn();

    window.addEventListener('pageshow', onPageShow);
    window.addEventListener('focus', onFocus);
    window.addEventListener('popstate', onPopState);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.removeEventListener('pageshow', onPageShow);
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('popstate', onPopState);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [closeMobileMenu]);

  return (
    <>
      <header
        ref={headerRef}
        data-navbar-root="true"
        className="
          sticky top-0 z-40
          bg-white/60
          backdrop-blur-xl
          backdrop-brightness-105
          backdrop-saturate-200
          border-b border-white/80
          shadow-lg shadow-zinc-900/5
        "
        onBlurCapture={(event) => {
          const currentTarget = event.currentTarget;
          requestAnimationFrame(() => {
            const activeElement = document.activeElement;
            if (!activeElement || !currentTarget.contains(activeElement)) {
              setActiveDesktopPanel(null);
              setIsLangOpen(false);
              setLoginDropdownCloseSignal((prev) => prev + 1);
            }
          });
        }}
      >
        <nav className="mx-auto flex w-full max-w-[1600px] items-center py-2 px-4 sm:px-6 lg:px-8">
          <Link
            href={homeHref}
            className="text-xl font-semibold tracking-tight text-zinc-900 uppercase"
          >
            {locale === 'fr-ca' ? (
              <Image
                src="/images/branding/pcvoyages.svg"
                alt="PC Voyages"
                width={0}
                height={0}
                className="h-16 w-auto"
              />
            ) : (
              <Image
                src="/images/branding/travelworks.svg"
                alt="TravelWorks"
                width={0}
                height={0}
                className="h-16 w-auto"
              />
            )}
          </Link>

          <button
            type="button"
            className="ml-auto inline-flex items-center rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 lg:hidden"
            aria-expanded={isMobileOpen}
            aria-controls="mobile-menu"
            onClick={() => {
              setIsMobileOpen((prev) => !prev);
              setMobileSection(null);
              setIsMobileLoginOpen(false);
              setActiveDesktopPanel(null);
              setIsLangOpen(false);
            }}
          >
            {isMobileOpen ? t('close') : t('menu')}
          </button>

          <div className="ml-2 hidden flex-1 items-center justify-between lg:flex">
            <ul className="flex items-center gap-1">
              <li>
                <button
                  type="button"
                  className={`inline-flex items-center rounded-md px-3 py-2 text-sm uppercase transition duration-150 hover:bg-zinc-100 hover:border-b-2 hover:border-amber-600 ${
                    isProductsActive ? 'font-bold text-[#015caa]' : 'font-medium text-zinc-800'
                  }`}
                  aria-expanded={isProductsOpen}
                  aria-controls="products-mega-menu"
                  aria-haspopup="menu"
                  onClick={() => {
                    setActiveDesktopPanel((prev) => (prev === 'products' ? null : 'products'));
                    setIsLangOpen(false);
                  }}
                >
                  <span>{t('topLevel.products')}</span>
                  <ChevronDown
                    className={`ml-1 inline-block h-4 w-4 transition-transform duration-150 ${
                      isProductsOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </li>
              <li className="relative">
                <button
                  type="button"
                  className={`inline-flex items-center rounded-md px-3 py-2 text-sm uppercase transition duration-150 hover:bg-zinc-100 hover:border-b-2 hover:border-amber-600 ${
                    isAboutUsActive ? 'font-bold text-[#015caa]' : 'font-medium text-zinc-800'
                  }`}
                  aria-expanded={isAboutUsOpen}
                  aria-controls="about-us-menu"
                  aria-haspopup="menu"
                  onClick={() => {
                    setActiveDesktopPanel((prev) => (prev === 'aboutUs' ? null : 'aboutUs'));
                    setIsLangOpen(false);
                  }}
                >
                  <span>{t('topLevel.aboutUs')}</span>
                  <ChevronDown
                    className={`ml-1 inline-block h-4 w-4 transition-transform duration-150 ${
                      isAboutUsOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                    aria-hidden="true"
                  />
                </button>

                <div
                  id="about-us-menu"
                  role="menu"
                  aria-label={t('topLevel.aboutUs')}
                  aria-hidden={!isAboutUsOpen}
                  className={`absolute left-0 top-full mt-3 w-56 rounded-xl border border-zinc-200 bg-background/90 backdrop-blur-md p-3 shadow-lg transition duration-200 motion-reduce:transition-none ${
                    isAboutUsOpen
                      ? 'visible translate-y-0 opacity-100'
                      : 'pointer-events-none invisible -translate-y-1 opacity-0'
                  }`}
                >
                  {aboutUsLinks.map((link) =>
                    (() => {
                      const Icon = aboutUsLinkIcons[link];
                      const href = aboutUsHref(link);
                      const isActive = isHrefActive(href);
                      return (
                        <Link
                          key={link}
                          href={href}
                          role="menuitem"
                          className={`flex items-center gap-2 rounded-md border-l-2 px-3 py-2 text-sm transition duration-150 ${
                            isActive
                              ? 'border-orange-400 bg-white text-zinc-900'
                              : 'border-transparent text-white hover:bg-white hover:text-zinc-900'
                          }`}
                          onClick={() => setActiveDesktopPanel(null)}
                        >
                          <div className="w-10 h-10 shrink-0 bg-zinc-100 flex items-center justify-center rounded-full shadow-xl">
                            <Icon className={menuItemIconClassName} aria-hidden="true" />
                          </div>
                          <span className={isActive ? 'font-semibold' : 'font-medium'}>
                            {t(`aboutUs.${link}`)}
                          </span>
                        </Link>
                      );
                    })(),
                  )}
                </div>
              </li>
              <li className="relative">
                <button
                  type="button"
                  className={`inline-flex items-center rounded-md px-3 py-2 text-sm uppercase transition duration-150 hover:bg-zinc-100 hover:border-b-2 hover:border-amber-600 ${
                    isTrainingActive ? 'font-bold text-[#015caa]' : 'font-medium text-zinc-800'
                  }`}
                  aria-expanded={isTrainingOpen}
                  aria-controls="training-menu"
                  aria-haspopup="menu"
                  onClick={() => {
                    setActiveDesktopPanel((prev) => (prev === 'training' ? null : 'training'));
                    setIsLangOpen(false);
                  }}
                >
                  <span>{t('topLevel.training')}</span>
                  <ChevronDown
                    className={`ml-1 inline-block h-4 w-4 transition-transform duration-150 ${
                      isTrainingOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                    aria-hidden="true"
                  />
                </button>

                <div
                  id="training-menu"
                  role="menu"
                  aria-label={t('topLevel.training')}
                  aria-hidden={!isTrainingOpen}
                  className={`absolute left-0 top-full mt-3 w-56 rounded-xl border border-zinc-200 bg-background/90 backdrop-blur-md p-3 shadow-lg transition duration-200 motion-reduce:transition-none ${
                    isTrainingOpen
                      ? 'visible translate-y-0 opacity-100'
                      : 'pointer-events-none invisible -translate-y-1 opacity-0'
                  }`}
                >
                  {trainingLinks.map((link) =>
                    (() => {
                      const Icon = trainingLinkIcons[link];
                      const href = trainingHref(link);
                      const isActive = isHrefActive(href);
                      return (
                        <Link
                          key={link}
                          href={href}
                          role="menuitem"
                          className={`flex items-center gap-2 rounded-md border-l-2 px-3 py-2 text-sm transition duration-150 ${
                            isActive
                              ? 'border-orange-400 bg-white text-zinc-900'
                              : 'border-transparent text-white hover:bg-white hover:text-zinc-900'
                          }`}
                          onClick={() => setActiveDesktopPanel(null)}
                        >
                          <div className="w-10 h-10 shrink-0 bg-zinc-100 flex items-center justify-center rounded-full shadow-xl">
                            <Icon className={menuItemIconClassName} aria-hidden="true" />
                          </div>
                          <span className={isActive ? 'font-semibold' : 'font-medium'}>
                            {t(`training.${link}`)}
                          </span>
                        </Link>
                      );
                    })(),
                  )}
                </div>
              </li>
              <li>
                <Link
                  href={newsHref}
                  className="rounded-md px-3 py-2 text-sm font-medium text-zinc-800 uppercase transition duration-150 hover:bg-zinc-100"
                  onMouseEnter={() => {
                    setActiveDesktopPanel(null);
                    setIsLangOpen(false);
                  }}
                  onFocus={() => {
                    setActiveDesktopPanel(null);
                    setIsLangOpen(false);
                  }}
                >
                  {t('topLevel.news')}
                </Link>
              </li>
            </ul>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md text-zinc-700 transition hover:bg-zinc-200"
                aria-label="Open search"
                onClick={() => {
                  setIsSearchOpen(true);
                  setActiveDesktopPanel(null);
                  setIsLangOpen(false);
                  setLoginDropdownCloseSignal((prev) => prev + 1);
                }}
              >
                <Search className="h-5 w-5" aria-hidden="true" />
              </button>
              <Link href={askForDemoHref}>
                <CtaButton label={t('cta.askForDemo')} variant="orangeGradient" size="xs" />
              </Link>
              <div
                onFocusCapture={() => {
                  setActiveDesktopPanel(null);
                  setIsLangOpen(false);
                }}
              >
                <DropdownCtaButton
                  key={`desktop-login-${loginDropdownCloseSignal}`}
                  label={t('cta.logIn')}
                  variant="default"
                  size="xs"
                  options={logInOptions}
                  align="left"
                />
              </div>

              <div className="relative">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
                  aria-expanded={isLangOpen}
                  aria-controls="language-menu"
                  aria-haspopup="menu"
                  onClick={() => {
                    setIsLangOpen((prev) => !prev);
                    setActiveDesktopPanel(null);
                  }}
                >
                  <Globe className="mr-2 inline-block h-4 w-4" />
                  {t('languagePrefix', { language: activeLanguageLabel })}
                  <ChevronDown
                    className={`ml-1 inline-block h-4 w-4 transition-transform duration-150 ${
                      isLangOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {isLangOpen ? (
                  <div
                    id="language-menu"
                    role="menu"
                    className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-zinc-200 bg-white p-2 shadow-lg"
                  >
                    {languageLinks.map((item) => (
                      <Link
                        key={item.routeLocale}
                        href={item.href}
                        role="menuitem"
                        className={`block rounded-md px-3 py-2 text-sm transition ${
                          item.isActive
                            ? 'bg-zinc-900 text-white'
                            : 'text-zinc-700 hover:bg-zinc-100'
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
          </div>
        </nav>

        <div
          id="products-mega-menu"
          role="menu"
          aria-label={t('topLevel.products')}
          aria-hidden={!isProductsOpen}
          className={`absolute inset-x-0 top-full hidden border-t border-zinc-200 bg-background/90 backdrop-blur-md  rounded-b-2xl lg:block ${
            isProductsOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
          }`}
        >
          <div
            className={`mx-auto w-full max-w-6xl px-6 pb-6 pt-4 transition duration-200 motion-reduce:transition-none ${
              isProductsOpen ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'
            }`}
          >
            <div className="grid min-h-64 grid-cols-[260px_1fr] overflow-hidden">
              <div className="border-r border-zinc-600 p-8">
                <p className="max-w-[12ch] text-2xl font-semibold leading-[1.4] tracking-tight text-white">
                  {t('products.promoMessage')}
                </p>
              </div>

              <div className="p-7">
                <div className="grid grid-cols-3 gap-x-10 gap-y-8">
                  {productColumnsByCategory[activeProductCategory].map((column, columnIndex) => (
                    <div key={`${activeProductCategory}-${columnIndex}`} className="space-y-2">
                      {column.map((linkKey) => {
                        const Icon = productLinkIcons[linkKey];
                        const href = solutionHref(linkKey);
                        const isActive = isHrefActive(href);

                        return (
                          <Link
                            key={linkKey}
                            href={href}
                            role="menuitem"
                            onClick={() => setActiveDesktopPanel(null)}
                            className={`flex items-center gap-2 rounded-md border-l-2 px-3 py-2 text-sm transition duration-150 ${
                              isActive
                                ? 'border-orange-400 bg-zinc-300 text-zinc-900'
                                : 'border-transparent text-white hover:bg-zinc-300 hover:text-zinc-900'
                            }`}
                          >
                            <div className="w-10 h-10 shrink-0 bg-zinc-100 flex items-center justify-center rounded-full shadow-xl">
                              <Icon className={menuItemIconClassName} aria-hidden="true" />
                            </div>

                            <span className={`min-w-40 break-words ${isActive ? 'font-semibold' : 'font-medium'}`}>
                              {t(`products.links.${linkKey}`)}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {isMobileOpen ? (
          <div id="mobile-menu" className="border-t border-zinc-200 bg-white px-4 py-3 lg:hidden">
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium text-zinc-700 hover:bg-zinc-100"
                  onClick={() =>
                    setMobileSection((prev) => (prev === 'products' ? null : 'products'))
                  }
                >
                  <span>{t('topLevel.products')}</span>
                  <ChevronDown
                    className={`ml-1 inline-block h-4 w-4 transition-transform duration-150 ${
                      mobileSection === 'products' ? 'rotate-180' : 'rotate-0'
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {mobileSection === 'products' ? (
                  <div className="mt-2 rounded-xl bg-zinc-100 p-3">
                    <div className="space-y-1">
                      {productColumnsByCategory[activeProductCategory].flat().map((linkKey) =>
                        (() => {
                          const Icon = productLinkIcons[linkKey];
                          return (
                            <Link
                              key={`mobile-${linkKey}`}
                              href={solutionHref(linkKey)}
                              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-white"
                              onClick={closeMobileMenu}
                            >
                              <Icon className={menuItemIconClassName} aria-hidden="true" />
                              {t(`products.links.${linkKey}`)}
                            </Link>
                          );
                        })(),
                      )}
                    </div>
                  </div>
                ) : null}
              </li>

              <li>
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium text-zinc-700 hover:bg-zinc-100"
                  onClick={() =>
                    setMobileSection((prev) => (prev === 'aboutUs' ? null : 'aboutUs'))
                  }
                >
                  <span>{t('topLevel.aboutUs')}</span>
                  <ChevronDown
                    className={`ml-1 inline-block h-4 w-4 transition-transform duration-150 ${
                      mobileSection === 'aboutUs' ? 'rotate-180' : 'rotate-0'
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {mobileSection === 'aboutUs' ? (
                  <div className="mt-2 rounded-xl bg-zinc-100 p-3">
                    {aboutUsLinks.map((link) =>
                      (() => {
                        const Icon = aboutUsLinkIcons[link];
                        return (
                          <Link
                            key={`mobile-${link}`}
                            href={aboutUsHref(link)}
                            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-white"
                            onClick={closeMobileMenu}
                          >
                            <Icon className={menuItemIconClassName} aria-hidden="true" />
                            {t(`aboutUs.${link}`)}
                          </Link>
                        );
                      })(),
                    )}
                  </div>
                ) : null}
              </li>

              <li>
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium text-zinc-700 hover:bg-zinc-100"
                  onClick={() =>
                    setMobileSection((prev) => (prev === 'training' ? null : 'training'))
                  }
                >
                  <span>{t('topLevel.training')}</span>
                  <ChevronDown
                    className={`ml-1 inline-block h-4 w-4 transition-transform duration-150 ${
                      mobileSection === 'training' ? 'rotate-180' : 'rotate-0'
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {mobileSection === 'training' ? (
                  <div className="mt-2 rounded-xl bg-zinc-100 p-3">
                    {trainingLinks.map((link) =>
                      (() => {
                        const Icon = trainingLinkIcons[link];
                        return (
                          <Link
                            key={`mobile-${link}`}
                            href={trainingHref(link)}
                            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-white"
                            onClick={closeMobileMenu}
                          >
                            <Icon className={menuItemIconClassName} aria-hidden="true" />
                            {t(`training.${link}`)}
                          </Link>
                        );
                      })(),
                    )}
                  </div>
                ) : null}
              </li>

              <li>
                <Link
                  href={newsHref}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
                  onClick={closeMobileMenu}
                >
                  {t('topLevel.news')}
                </Link>
              </li>
              <li className="border-t border-zinc-200 pt-2">
                <Link
                  href={askForDemoHref}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
                  onClick={closeMobileMenu}
                >
                  {t('cta.askForDemo')}
                </Link>
              </li>

              <li>
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium text-zinc-700 hover:bg-zinc-100"
                  aria-expanded={isMobileLoginOpen}
                  aria-controls="mobile-login-menu"
                  onClick={() => setIsMobileLoginOpen((prev) => !prev)}
                >
                  <span>{t('cta.logIn')}</span>
                  <ChevronDown
                    className={`ml-1 inline-block h-4 w-4 transition-transform duration-150 ${
                      isMobileLoginOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {isMobileLoginOpen ? (
                  <div id="mobile-login-menu" className="mt-2 rounded-xl bg-zinc-100 p-3">
                    <div className="space-y-1">
                      {logInOptions.map((option) => (
                        <Link
                          key={`mobile-login-option-${option.id}`}
                          href={option.href ?? '#'}
                          target={option.target}
                          rel={option.rel}
                          className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition ${
                            option.disabled
                              ? 'pointer-events-none text-zinc-400'
                              : 'text-zinc-700 hover:bg-white'
                          }`}
                          onClick={(event) => {
                            if (option.disabled) {
                              event.preventDefault();
                              return;
                            }

                            if (option.href) {
                              try {
                                const targetUrl = new URL(option.href, window.location.origin);
                                if (targetUrl.origin !== window.location.origin) {
                                  window.sessionStorage.setItem(EXTERNAL_RETURN_REFRESH_KEY, '1');
                                }
                              } catch {
                                // Ignore invalid URL and proceed with regular navigation behavior.
                              }
                            }

                            option.onSelect?.();
                            closeMobileMenu();
                          }}
                          aria-disabled={option.disabled ? 'true' : undefined}
                        >
                          {option.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </li>
            </ul>

            <div className="mt-2 border-t border-zinc-200 pt-2">
              <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                {t('languageTitle')}
              </p>
              <div className="mt-2 space-y-1">
                {languageLinks.map((item) => (
                  <Link
                    key={item.routeLocale}
                    href={item.href}
                    className={`block rounded-md px-3 py-2 text-sm transition ${
                      item.isActive
                        ? 'font-semibold text-zinc-900 hover:bg-zinc-100'
                        : 'font-medium text-zinc-700 hover:bg-zinc-100'
                    }`}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </header>

      {isSearchOpen ? (
        <div
          className="
            fixed 
            inset-0 
            z-70 
            flex 
            items-center 
            justify-center   
            bg-white/60
            backdrop-blur-xl
            backdrop-saturate-150
            border-b border-white/10 px-4 sm:px-6
          "
          role="dialog"
          aria-modal="true"
          aria-label="Site search"
          onClick={() => setIsSearchOpen(false)}
        >
          <div className="w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
            <div className="rounded-2xl border border-zinc-300 bg-white p-4 shadow-2xl sm:p-6">
              <div className="flex items-center gap-3 rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 sm:px-5">
                <Search className="h-5 w-5 shrink-0 text-zinc-500" aria-hidden="true" />
                <input
                  ref={searchInputRef}
                  type="search"
                  placeholder="Search pages, products and help"
                  className="h-10 w-full bg-transparent text-base text-zinc-800 placeholder:text-zinc-500 focus:outline-none"
                />
                <button
                  type="button"
                  className="hidden shrink-0 rounded-lg border border-zinc-300 px-3 py-2 text-sm font-semibold text-zinc-600 sm:inline-flex"
                  onClick={() => setIsSearchOpen(false)}
                >
                  ESC
                </button>
                <button
                  type="button"
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-300 text-zinc-600 transition hover:bg-zinc-100"
                  aria-label="Close search"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <p className="mt-4 px-1 text-sm text-zinc-500">
                Type at least 2 characters to start searching.
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
