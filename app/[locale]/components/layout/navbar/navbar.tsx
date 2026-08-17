'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { useLocale, useTranslations } from 'next-intl';
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
import { CircleArrowRight, CircleX } from 'lucide-react';
import { type DropdownCtaOption } from '@/app/[locale]/components/ui/dropdown-cta-button';
import {
  aboutUsLinks,
  trainingLinks,
  type AboutUsLinkKey,
  type ProductCategory,
  type ProductLinkKey,
  type TrainingLinkKey,
} from '@/app/[locale]/components/layout/navbar/navbar-config';
import {
  DesktopPanel,
  NavbarDesktopContent,
  NavbarMobileMenu,
  NavbarSearchDialog,
  type NavbarSearchResult,
  type MobileSection,
} from '@/app/[locale]/components/layout/navbar/navbar-sections';
import {
  getAboutUsHref,
  getAskForDemoHref,
  getSolutionHref,
  getTrainingHref,
} from '@/app/[locale]/components/layout/navbar/navbar-href';
import { Menu } from 'lucide-react';

const EXTERNAL_RETURN_REFRESH_KEY = 'travelworks.navbar.external-return-refresh';
const SEARCH_MIN_QUERY_LENGTH = 2;
const SEARCH_DEBOUNCE_MS = 220;

function normalizePath(path: string): string {
  if (!path) return '/';
  return path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const activeMessageLocale = useLocale();
  const t = useTranslations('nav');
  const locale = useLocale();

  const [activeDesktopPanel, setActiveDesktopPanel] = useState<DesktopPanel>(null);
  const [activeProductCategory] = useState<ProductCategory>('travelworks');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<MobileSection>(null);
  const [isMobileLoginOpen, setIsMobileLoginOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<NavbarSearchResult[]>([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [activeSearchResultIndex, setActiveSearchResultIndex] = useState(-1);
  const [loginDropdownCloseSignal, setLoginDropdownCloseSignal] = useState(0);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const searchAbortControllerRef = useRef<AbortController | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  const currentRouteLocale =
    localeOptions.find((item) => item.messageLocale === activeMessageLocale)?.routeLocale ??
    DEFAULT_ROUTE_LOCALE;

  const withLocalePrefix = useCallback(
    (path: string) =>
      currentRouteLocale === DEFAULT_ROUTE_LOCALE ? path : `/${currentRouteLocale}${path}`,
    [currentRouteLocale],
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
    'fr': '/fr',
    'en-au': '/en-au',
  };

  const homeHref =
    homeHrefByRouteLocale[currentRouteLocale] ??
    (currentRouteLocale === DEFAULT_ROUTE_LOCALE ? '/' : `/${currentRouteLocale}`);
  const askForDemoHref = getAskForDemoHref(currentRouteLocale, withLocalePrefix);
  const newsHref = withLocalePrefix(`/${getNewsSegment(currentRouteLocale)}`);
  const integrationsHref = withLocalePrefix(`/integrations`);
  const travelworks = 'https://new.pcvweb.com/#/login/';
  const travelworksLegacy =
    locale === 'fr-ca'
      ? 'https://www.pcvweb.com/Login.aspx?lang=FR'
      : 'https://www.pcvweb.com/Login.aspx?lang=EN';
  const knowledgeBaseHref = 'https://www.tw-pcv-learning.com/en';
  const trainingPlatformHref =
    'https://travelworkssolutionpcvoyages.talentlms.com/plus/login?redirect=%2Fdashboard';
  const supportLoginHref =
    'https://support.pcvweb.com/auth/v3/signin?brand_id=360003288198&locale=en-ca&return_to=https%3A%2F%2Fsupport.pcvweb.com%2Fhc%2Fen-ca%2Frequests%2Fnew&role=end_user';

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
      href: trainingPlatformHref,
      target: '_blank',
      rel: 'noopener noreferrer',
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

  const clearDesktopPanels = useCallback(() => {
    setActiveDesktopPanel(null);
    setIsLangOpen(false);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileOpen(false);
    setMobileSection(null);
    setIsMobileLoginOpen(false);
    setLoginDropdownCloseSignal((prev) => prev + 1);
  }, []);

  const closeSearch = useCallback(() => {
    searchAbortControllerRef.current?.abort();
    searchAbortControllerRef.current = null;
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
    setSearchError(null);
    setIsSearchLoading(false);
    setActiveSearchResultIndex(-1);
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
    if (!isSearchOpen) {
      return;
    }

    const trimmedQuery = searchQuery.trim();

    if (trimmedQuery.length < SEARCH_MIN_QUERY_LENGTH) {
      searchAbortControllerRef.current?.abort();
      searchAbortControllerRef.current = null;
      return;
    }

    const timeout = window.setTimeout(async () => {
      searchAbortControllerRef.current?.abort();

      const controller = new AbortController();
      searchAbortControllerRef.current = controller;
      setIsSearchLoading(true);
      setSearchError(null);

      try {
        const params = new URLSearchParams({
          q: trimmedQuery,
          locale: currentRouteLocale,
          limit: '12',
        });

        const response = await fetch(`/api/search?${params.toString()}`, {
          method: 'GET',
          signal: controller.signal,
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error('Search request failed');
        }

        const payload = (await response.json()) as {
          results?: NavbarSearchResult[];
        };

        const results = Array.isArray(payload.results) ? payload.results : [];
        setSearchResults(results);
        setActiveSearchResultIndex((prev) =>
          results.length === 0 ? -1 : prev >= 0 && prev < results.length ? prev : -1,
        );
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }

        setSearchError(t('search.error'));
        setSearchResults([]);
        setActiveSearchResultIndex(-1);
      } finally {
        if (searchAbortControllerRef.current === controller) {
          searchAbortControllerRef.current = null;
        }

        setIsSearchLoading(false);
      }
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timeout);
      searchAbortControllerRef.current?.abort();
      searchAbortControllerRef.current = null;
    };
  }, [searchQuery, currentRouteLocale, isSearchOpen, t]);

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
        closeSearch();
        setLoginDropdownCloseSignal((prev) => prev + 1);
      }
    };

    document.addEventListener('mousedown', onDocumentClick);
    document.addEventListener('keydown', onEscape);

    return () => {
      document.removeEventListener('mousedown', onDocumentClick);
      document.removeEventListener('keydown', onEscape);
    };
  }, [closeMobileMenu, closeSearch]);

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
      closeSearch();
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
  }, [closeMobileMenu, closeSearch]);

  const labels = useMemo(
    () => ({
      menu: t('menu'),
      close: t('close'),
      products: t('topLevel.products'),
      aboutUs: t('topLevel.aboutUs'),
      training: t('topLevel.training'),
      news: t('topLevel.news'),
      integrations: t('topLevel.integrations'),
      askForDemo: t('cta.askForDemo'),
      logIn: t('cta.logIn'),
      languageTitle: t('languageTitle'),
      languagePrefix: t('languagePrefix', { language: activeLanguageLabel }),
      productsPromoMessage: t.rich('products.promoMessage', {
        strong: (chunks) => <strong>{chunks}</strong>,
      }),
      searchPlaceholder: t('search.placeholder'),
      searchHint: t('search.hint'),
      searchDialogLabel: t('search.dialogLabel'),
      searchLoading: t('search.loading'),
      searchNoResults: t('search.noResults'),
      searchPagesLabel: t('search.pagesLabel'),
      searchNewsLabel: t('search.newsLabel'),
      searchError: t('search.error'),
    }),
    [t, activeLanguageLabel],
  );

  const handleSearchQueryChange = useCallback((value: string) => {
    setSearchQuery(value);
    setSearchError(null);
    setActiveSearchResultIndex(-1);

    if (value.trim().length < SEARCH_MIN_QUERY_LENGTH) {
      setSearchResults([]);
      setIsSearchLoading(false);
    }
  }, []);

  const navigateToSearchResult = useCallback(
    (href: string) => {
      closeSearch();
      router.push(href);
    },
    [closeSearch, router],
  );

  const handleSearchInputKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'ArrowDown') {
        if (searchResults.length === 0) {
          return;
        }

        event.preventDefault();
        setActiveSearchResultIndex((prev) => Math.min(prev + 1, searchResults.length - 1));
        return;
      }

      if (event.key === 'ArrowUp') {
        if (searchResults.length === 0) {
          return;
        }

        event.preventDefault();
        setActiveSearchResultIndex((prev) => Math.max(prev - 1, 0));
        return;
      }

      if (event.key === 'Enter') {
        if (searchResults.length === 0) {
          return;
        }

        const targetIndex = activeSearchResultIndex >= 0 ? activeSearchResultIndex : 0;
        const target = searchResults[targetIndex];

        if (!target) {
          return;
        }

        event.preventDefault();
        navigateToSearchResult(target.href);
        return;
      }

      if (event.key === 'Escape') {
        event.preventDefault();
        closeSearch();
      }
    },
    [activeSearchResultIndex, closeSearch, navigateToSearchResult, searchResults],
  );

  const getProductLabel = useCallback(
    (linkKey: ProductLinkKey) => t(`products.links.${linkKey}`),
    [t],
  );
  const getAboutUsLabel = useCallback((link: AboutUsLinkKey) => t(`aboutUs.${link}`), [t]);
  const getTrainingLabel = useCallback((link: TrainingLinkKey) => t(`training.${link}`), [t]);

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
              clearDesktopPanels();
              setLoginDropdownCloseSignal((prev) => prev + 1);
            }
          });
        }}
      >
        <div className="relative">
          <NavbarDesktopContent
            locale={locale}
            homeHref={homeHref}
            askForDemoHref={askForDemoHref}
            newsHref={newsHref}
            integrationsHref={integrationsHref}
            languageLinks={languageLinks}
            labels={labels}
            logInOptions={logInOptions}
            getProductLabel={getProductLabel}
            getAboutUsLabel={getAboutUsLabel}
            getTrainingLabel={getTrainingLabel}
            solutionHref={solutionHref}
            aboutUsHref={aboutUsHref}
            trainingHref={trainingHref}
            isHrefActive={isHrefActive}
            activeProductCategory={activeProductCategory}
            isProductsOpen={isProductsOpen}
            isAboutUsOpen={isAboutUsOpen}
            isTrainingOpen={isTrainingOpen}
            isProductsActive={isProductsActive}
            isAboutUsActive={isAboutUsActive}
            isTrainingActive={isTrainingActive}
            isLangOpen={isLangOpen}
            loginDropdownCloseSignal={loginDropdownCloseSignal}
            onToggleProducts={() => {
              setActiveDesktopPanel((prev) => (prev === 'products' ? null : 'products'));
              setIsLangOpen(false);
            }}
            onToggleAboutUs={() => {
              setActiveDesktopPanel((prev) => (prev === 'aboutUs' ? null : 'aboutUs'));
              setIsLangOpen(false);
            }}
            onToggleTraining={() => {
              setActiveDesktopPanel((prev) => (prev === 'training' ? null : 'training'));
              setIsLangOpen(false);
            }}
            onClearPanels={clearDesktopPanels}
            onOpenSearch={() => {
              setIsSearchOpen(true);
              clearDesktopPanels();
              setLoginDropdownCloseSignal((prev) => prev + 1);
            }}
            onToggleLanguageMenu={() => {
              setIsLangOpen((prev) => !prev);
              setActiveDesktopPanel(null);
            }}
            onCloseLanguageMenu={() => setIsLangOpen(false)}
          />

          <button
            type="button"
            className="absolute right-4 top-1/2 z-10 inline-flex -translate-y-1/2 items-center rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-md hover:bg-zinc-50 sm:right-6 lg:hidden"
            aria-expanded={isMobileOpen}
            aria-controls="mobile-menu"
            onClick={() => {
              setIsMobileOpen((prev) => !prev);
              setMobileSection(null);
              setIsMobileLoginOpen(false);
              clearDesktopPanels();
            }}
          >
            {isMobileOpen ? (
              <div className="flex items-center">
                <CircleX className="mr-2 h-5 w-5 text-brand-blue" aria-hidden="true" />
                {labels.close}
              </div>
            ) : (
              <div className="flex items-center">
                <Menu className="mr-2 h-5 w-5 text-brand-blue" aria-hidden="true" />
                {labels.menu}
              </div>
            )}
          </button>
        </div>

        <NavbarMobileMenu
          locale={locale}
          homeHref={homeHref}
          askForDemoHref={askForDemoHref}
          newsHref={newsHref}
          integrationsHref={integrationsHref}
          languageLinks={languageLinks}
          labels={labels}
          logInOptions={logInOptions}
          getProductLabel={getProductLabel}
          getAboutUsLabel={getAboutUsLabel}
          getTrainingLabel={getTrainingLabel}
          solutionHref={solutionHref}
          aboutUsHref={aboutUsHref}
          trainingHref={trainingHref}
          isHrefActive={isHrefActive}
          activeProductCategory={activeProductCategory}
          isMobileOpen={isMobileOpen}
          mobileSection={mobileSection}
          isMobileLoginOpen={isMobileLoginOpen}
          onToggleMobileSection={(section) =>
            setMobileSection((prev) => (prev === section ? null : section))
          }
          onToggleMobileLogin={() => setIsMobileLoginOpen((prev) => !prev)}
          onCloseMobileMenu={closeMobileMenu}
          onExternalOptionClick={(event, href, onSelect) => {
            const option = logInOptions.find(
              (item) => item.href === href && item.onSelect === onSelect,
            );
            if (option?.disabled) {
              event.preventDefault();
              return;
            }

            if (href) {
              try {
                const targetUrl = new URL(href, window.location.origin);
                if (targetUrl.origin !== window.location.origin) {
                  window.sessionStorage.setItem(EXTERNAL_RETURN_REFRESH_KEY, '1');
                }
              } catch {
                // Ignore invalid URL and proceed with regular navigation behavior.
              }
            }

            onSelect?.();
            closeMobileMenu();
          }}
        />
      </header>

      <NavbarSearchDialog
        isSearchOpen={isSearchOpen}
        searchInputRef={searchInputRef}
        labels={labels}
        query={searchQuery}
        results={searchResults}
        isSearchLoading={isSearchLoading}
        searchError={searchError}
        activeResultIndex={activeSearchResultIndex}
        onQueryChange={handleSearchQueryChange}
        onInputKeyDown={handleSearchInputKeyDown}
        onHoverResult={setActiveSearchResultIndex}
        onSelectResult={navigateToSearchResult}
        onClose={closeSearch}
      />
    </>
  );
}
