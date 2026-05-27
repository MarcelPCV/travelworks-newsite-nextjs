'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { DEFAULT_ROUTE_LOCALE, localeOptions, routeToMessageLocale } from '../locale-config';
import {
  BarChart3,
  BookOpen,
  Building2,
  ChevronDown,
  KeyRound,
  Globe,
  GraduationCap,
  Link2,
  Mail,
  Map,
  MessageCircle,
  ShieldCheck,
  PlayCircle,
  Settings,
  SlidersHorizontal,
  Star,
  UserCog,
  Users,
  CircleArrowRight,
  type LucideIcon,
} from 'lucide-react';
import CtaButton from './cta-button';
import DropdownCtaButton, { type DropdownCtaOption } from './dropdown-cta-button';

type DesktopPanel = 'products' | 'aboutUs' | 'training' | null;
type ProductCategory = 'travelworks';
type ProductLinkKey =
  | 'features'
  | 'benefits'
  | 'backofficeSystem'
  | 'tripDetails'
  | 'tourManagement'
  | 'tourOnline'
  | 'crmTools'
  | 'integrations'
  | 'dashboardReports'
  | 'customizations'
  | 'askForDemo'
  | 'tryIt';

const productCategories: ProductCategory[] = ['travelworks'];

const productColumnsByCategory: Record<ProductCategory, ProductLinkKey[][]> = {
  travelworks: [
    ['features', 'benefits', 'backofficeSystem', 'tripDetails'],
    ['tourManagement', 'tourOnline', 'crmTools', 'integrations'],
    ['dashboardReports', 'customizations', 'askForDemo'],
  ],
};

const aboutUsLinks = ['company', 'clients', 'partners', 'contact'] as const;
const trainingLinks = ['platform', 'knowledgeBase'] as const;

const menuItemIconClassName = 'w-5 h-5 text-zinc-800';

const productLinkIcons: Record<ProductLinkKey, LucideIcon> = {
  features: Settings,
  benefits: Star,
  backofficeSystem: Building2,
  tripDetails: Map,
  tourManagement: Map,
  tourOnline: Link2,
  crmTools: Users,
  dashboardReports: BarChart3,
  integrations: Link2,
  customizations: SlidersHorizontal,
  askForDemo: MessageCircle,
  tryIt: PlayCircle,
};

const aboutUsLinkIcons: Record<(typeof aboutUsLinks)[number], LucideIcon> = {
  company: Building2,
  clients: Users,
  partners: Users,
  contact: Mail,
};

const trainingLinkIcons: Record<(typeof trainingLinks)[number], LucideIcon> = {
  platform: GraduationCap,
  knowledgeBase: BookOpen,
};

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

  const [activeDesktopPanel, setActiveDesktopPanel] = useState<DesktopPanel>(null);
  const [activeProductCategory, setActiveProductCategory] = useState<ProductCategory>('travelworks');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<'products' | 'aboutUs' | 'training' | null>(null);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [loginDropdownCloseSignal, setLoginDropdownCloseSignal] = useState(0);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  const currentRouteLocale =
    localeOptions.find((item) => item.messageLocale === activeMessageLocale)?.routeLocale ?? DEFAULT_ROUTE_LOCALE;

  const homeHref = currentRouteLocale === DEFAULT_ROUTE_LOCALE ? '/' : `/${currentRouteLocale}`;

  const logInOptions: DropdownCtaOption[] = [
    { id: 'Travelworks', label: t('cta.logInOptions.travelworks'), href: '#' , icon: <CircleArrowRight aria-hidden="true" /> },
    { id: 'Support', label: t('cta.logInOptions.support'), href: '#', icon: <CircleArrowRight aria-hidden="true" /> },
    { id: 'Training', label: t('cta.logInOptions.trainingPlatform'), href: '#', icon: <CircleArrowRight aria-hidden="true" /> },
    { id: 'Knowledge Base', label: t('cta.logInOptions.knowledgeBase'), href: '#', icon: <CircleArrowRight aria-hidden="true" /> },
  ];

  const getLanguageLabel = useCallback((route: string) => {
    const key = `languages.${route}`;
    try {
      const translated = t(key);
      if (translated && !translated.includes('languages.')) return translated;
    } catch {
      // ignore and fallback
    }
    return localeOptions.find((item) => item.routeLocale === route)?.label ?? localeOptions[0].label;
  }, [t]);

  const activeLanguageLabel = getLanguageLabel(currentRouteLocale);

  const languageLinks = useMemo(
    () =>
      localeOptions.map((item) => ({
        ...item,
        label: getLanguageLabel(item.routeLocale),
        href: replaceLocaleInPath(pathname, item.routeLocale),
        isActive: routeToMessageLocale[item.routeLocale] === activeMessageLocale,
      })),
    [pathname, activeMessageLocale, getLanguageLabel]
  );

  const isProductsOpen = activeDesktopPanel === 'products';
  const isAboutUsOpen = activeDesktopPanel === 'aboutUs';
  const isTrainingOpen = activeDesktopPanel === 'training';

  const clearScheduledClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openDesktopPanel = (panel: Exclude<DesktopPanel, null>) => {
    clearScheduledClose();
    setActiveDesktopPanel(panel);
    setIsLangOpen(false);
  };

  const schedulePanelClose = (delay = 120) => {
    clearScheduledClose();
    closeTimerRef.current = setTimeout(() => setActiveDesktopPanel(null), delay);
  };

  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      if (!headerRef.current) {
        return;
      }

      const target = event.target as Node;
      if (!headerRef.current.contains(target)) {
        setActiveDesktopPanel(null);
        setIsLangOpen(false);
        setLoginDropdownCloseSignal((prev) => prev + 1);
      }
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDesktopPanel(null);
        setIsLangOpen(false);
        setIsMobileOpen(false);
        setLoginDropdownCloseSignal((prev) => prev + 1);
      }
    };

    document.addEventListener('mousedown', onDocumentClick);
    document.addEventListener('keydown', onEscape);

    return () => {
      document.removeEventListener('mousedown', onDocumentClick);
      document.removeEventListener('keydown', onEscape);
      clearScheduledClose();
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 border-b border-zinc-200 bg-white/95 backdrop-blur"
      onMouseEnter={clearScheduledClose}
      onMouseLeave={() => {
        schedulePanelClose();
        setIsLangOpen(false);
        setLoginDropdownCloseSignal((prev) => prev + 1);
      }}
      onBlurCapture={(event) => {
        const nextFocused = event.relatedTarget as Node | null;
        if (!nextFocused || !event.currentTarget.contains(nextFocused)) {
          setActiveDesktopPanel(null);
          setIsLangOpen(false);
          setLoginDropdownCloseSignal((prev) => prev + 1);
        }
      }}
    >
      <nav className="mx-auto flex w-full max-w-7xl items-center px-4 py-3 sm:px-6 lg:px-8">
        <Link href={homeHref} className="text-xl font-semibold tracking-tight text-zinc-900">
          {t('brand.name')}
        </Link>

        <button
          type="button"
          className="ml-auto inline-flex items-center rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 lg:hidden"
          aria-expanded={isMobileOpen}
          aria-controls="mobile-menu"
          onClick={() => {
            setIsMobileOpen((prev) => !prev);
            setMobileSection(null);
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
                className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-zinc-800 uppercase transition duration-150 hover:bg-zinc-100"
                aria-expanded={isProductsOpen}
                aria-controls="products-mega-menu"
                aria-haspopup="menu"
                onMouseEnter={() => openDesktopPanel('products')}
                onFocus={() => openDesktopPanel('products')}
                onClick={() => {
                  setActiveDesktopPanel((prev) => (prev === 'products' ? null : 'products'));
                  setIsLangOpen(false);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    openDesktopPanel('products');
                  }
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
                className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-zinc-800 uppercase transition duration-150 hover:bg-zinc-100"
                aria-expanded={isAboutUsOpen}
                aria-controls="about-us-menu"
                aria-haspopup="menu"
                onMouseEnter={() => openDesktopPanel('aboutUs')}
                onFocus={() => openDesktopPanel('aboutUs')}
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
                className={`absolute left-0 top-full mt-3 w-56 rounded-xl border border-zinc-300 bg-[#e5e5e5] p-3 shadow-lg transition duration-200 motion-reduce:transition-none ${
                  isAboutUsOpen ? 'visible translate-y-0 opacity-100' : 'pointer-events-none invisible -translate-y-1 opacity-0'
                }`}
              >
                {aboutUsLinks.map((link) => (
                  (() => {
                    const Icon = aboutUsLinkIcons[link];
                    return (
                  <Link
                    key={link}
                    href="#"
                    role="menuitem"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-zinc-800 transition duration-150 hover:bg-white"
                    onClick={() => setActiveDesktopPanel(null)}
                  >
                    <Icon className={menuItemIconClassName} aria-hidden="true" />
                    {t(`aboutUs.${link}`)}
                  </Link>
                    );
                  })()
                ))}
              </div>
            </li>
            <li className="relative">
              <button
                type="button"
                className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-zinc-800 uppercase transition duration-150 hover:bg-zinc-100"
                aria-expanded={isTrainingOpen}
                aria-controls="training-menu"
                aria-haspopup="menu"
                onMouseEnter={() => openDesktopPanel('training')}
                onFocus={() => openDesktopPanel('training')}
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
                className={`absolute left-0 top-full mt-3 w-56 rounded-xl border border-zinc-300 bg-[#e5e5e5] p-3 shadow-lg transition duration-200 motion-reduce:transition-none ${
                  isTrainingOpen ? 'visible translate-y-0 opacity-100' : 'pointer-events-none invisible -translate-y-1 opacity-0'
                }`}
              >
                {trainingLinks.map((link) => (
                  (() => {
                    const Icon = trainingLinkIcons[link];
                    return (
                  <Link
                    key={link}
                    href="#"
                    role="menuitem"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-zinc-800 transition duration-150 hover:bg-white"
                    onClick={() => setActiveDesktopPanel(null)}
                  >
                    <Icon className={menuItemIconClassName} aria-hidden="true" />
                    {t(`training.${link}`)}
                  </Link>
                    );
                  })()
                ))}
              </div>
            </li>
            {/* <li>
              <Link
                href="#"
                className="rounded-md px-3 py-2 text-sm font-medium text-zinc-800 uppercase transition duration-150 hover:bg-zinc-100"
              >
                {t('topLevel.support')}
              </Link>
            </li> */}
          </ul>

          <div className="flex items-center gap-2">
            <CtaButton label={t('cta.askForDemo')} variant="orangeGradient" size="xs" />
            <div
              onMouseEnter={() => {
                clearScheduledClose();
                setActiveDesktopPanel(null);
                setIsLangOpen(false);
              }}
              onFocusCapture={() => {
                setActiveDesktopPanel(null);
                setIsLangOpen(false);
              }}
            >
              <DropdownCtaButton
                key={`desktop-login-${loginDropdownCloseSignal}`}
                label={t('cta.logIn')}
                variant="blue"
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
        </div>
      </nav>

      <div
        id="products-mega-menu"
        role="menu"
        aria-label={t('topLevel.products')}
        aria-hidden={!isProductsOpen}
        className={`absolute inset-x-0 top-full hidden border-t border-zinc-200 bg-gray-400 lg:block ${
          isProductsOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
        }`}
      >
        <div
          className={`mx-auto w-full max-w-6xl px-6 pb-6 pt-4 transition duration-200 motion-reduce:transition-none ${
            isProductsOpen ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'
          }`}
        >
          <div className="grid min-h-88 grid-cols-[260px_1fr] overflow-hidden rounded-2xl border border-zinc-300 bg-[#e5e5e5] shadow-xl">
            <div className="border-r border-zinc-300 bg-zinc-300/70 p-8">
              <p className="max-w-[12ch] text-2xl font-semibold leading-[1.4] tracking-tight text-zinc-950">
                {t('products.promoMessage')}
              </p>
            </div>

            <div className="p-7">
              <div className="grid grid-cols-3 gap-x-10 gap-y-8 xl:grid-cols-4">
                {productColumnsByCategory[activeProductCategory].map((column, columnIndex) => (
                  <div key={`${activeProductCategory}-${columnIndex}`} className="space-y-2">
                    {column.map((linkKey) => (
                      (() => {
                        const Icon = productLinkIcons[linkKey];
                        return (
                      <Link
                        key={linkKey}
                        href="#"
                        role="menuitem"
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-zinc-800 transition duration-150 hover:bg-white"
                        onClick={() => setActiveDesktopPanel(null)}
                      >
                        <Icon className={menuItemIconClassName} aria-hidden="true" />
                        {t(`products.links.${linkKey}`)}
                      </Link>
                        );
                      })()
                    ))}
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
                onClick={() => setMobileSection((prev) => (prev === 'products' ? null : 'products'))}
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
                  <div className="mb-3 flex flex-wrap gap-2">
                    {productCategories.map((category) => (
                      <button
                        key={category}
                        type="button"
                        className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                          activeProductCategory === category ? 'bg-white text-zinc-900 shadow-sm' : 'bg-zinc-200 text-zinc-700'
                        }`}
                        onClick={() => setActiveProductCategory(category)}
                      >
                        {t(`products.categories.${category}`)}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-1">
                    {productColumnsByCategory[activeProductCategory].flat().map((linkKey) => (
                      (() => {
                        const Icon = productLinkIcons[linkKey];
                        return (
                      <Link
                        key={`mobile-${linkKey}`}
                        href="#"
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-white"
                      >
                        <Icon className={menuItemIconClassName} aria-hidden="true" />
                        {t(`products.links.${linkKey}`)}
                      </Link>
                        );
                      })()
                    ))}
                  </div>
                </div>
              ) : null}
            </li>

            <li>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium text-zinc-700 hover:bg-zinc-100"
                onClick={() => setMobileSection((prev) => (prev === 'aboutUs' ? null : 'aboutUs'))}
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
                  {aboutUsLinks.map((link) => (
                    (() => {
                      const Icon = aboutUsLinkIcons[link];
                      return (
                    <Link
                      key={`mobile-${link}`}
                      href="#"
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-white"
                    >
                      <Icon className={menuItemIconClassName} aria-hidden="true" />
                      {t(`aboutUs.${link}`)}
                    </Link>
                      );
                    })()
                  ))}
                </div>
              ) : null}
            </li>

            <li>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium text-zinc-700 hover:bg-zinc-100"
                onClick={() => setMobileSection((prev) => (prev === 'training' ? null : 'training'))}
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
                  {trainingLinks.map((link) => (
                    (() => {
                      const Icon = trainingLinkIcons[link];
                      return (
                    <Link
                      key={`mobile-${link}`}
                      href="#"
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-white"
                    >
                      <Icon className={menuItemIconClassName} aria-hidden="true" />
                      {t(`training.${link}`)}
                    </Link>
                      );
                    })()
                  ))}
                </div>
              ) : null}
            </li>

            <li>
              <Link href="#" className="block rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100">
                {t('topLevel.support')}
              </Link>
            </li>
          </ul>

          <ul className="mt-3">
            <li className="py-2">
              <CtaButton label={t('cta.askForDemo')} variant="orangeGradient" size="xs" />
            </li>
            <li className="py-2">
              <DropdownCtaButton
                key={`mobile-login-${loginDropdownCloseSignal}`}
                label={t('cta.logIn')}
                variant="blue"
                size="xs"
                options={logInOptions}
                className="w-full"
                align="left"
                menuClassName="w-full min-w-0"
              />
            </li>
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
                  onClick={() => {
                    setIsMobileOpen(false);
                    setMobileSection(null);
                  }}
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
