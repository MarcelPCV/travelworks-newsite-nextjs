import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, FileText, Globe, Newspaper, Search, X } from 'lucide-react';
import CtaButton from '@/app/[locale]/components/ui/cta-button';
import DropdownCtaButton, {
  type DropdownCtaOption,
} from '@/app/[locale]/components/ui/dropdown-cta-button';
import {
  aboutUsLinkIcons,
  productColumnsByCategory,
  productLinkIcons,
  trainingLinkIcons,
  type AboutUsLinkKey,
  type ProductCategory,
  type ProductLinkKey,
  type TrainingLinkKey,
} from '@/app/[locale]/components/layout/navbar/navbar-config';

export type DesktopPanel = 'products' | 'aboutUs' | 'training' | null;
export type MobileSection = 'products' | 'aboutUs' | 'training' | null;

type LanguageLink = {
  routeLocale: string;
  href: string;
  label: string;
  isActive: boolean;
};

type NavbarLabels = {
  menu: string;
  close: string;
  products: string;
  aboutUs: string;
  training: string;
  news: string;
  integrations: string;
  askForDemo: string;
  logIn: string;
  languageTitle: string;
  languagePrefix: string;
  productsPromoMessage: React.ReactNode;
  searchPlaceholder: string;
  searchHint: string;
  searchDialogLabel: string;
  searchLoading: string;
  searchNoResults: string;
  searchPagesLabel: string;
  searchNewsLabel: string;
  searchError: string;
};

export type NavbarSearchResult = {
  id: string;
  href: string;
  title: string;
  description: string;
  type: 'page' | 'news';
};

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildHighlightParts(
  text: string,
  tokens: string[],
): Array<{ value: string; isMatch: boolean }> {
  if (!text || tokens.length === 0) {
    return [{ value: text, isMatch: false }];
  }

  const uniqueTokens = Array.from(new Set(tokens.map((token) => token.trim()).filter(Boolean)));
  if (uniqueTokens.length === 0) {
    return [{ value: text, isMatch: false }];
  }

  const pattern = uniqueTokens
    .sort((a, b) => b.length - a.length)
    .map((token) => escapeRegExp(token))
    .join('|');

  if (!pattern) {
    return [{ value: text, isMatch: false }];
  }

  const regex = new RegExp(`(${pattern})`, 'gi');
  const segments = text.split(regex).filter((segment) => segment.length > 0);

  return segments.map((segment) => ({
    value: segment,
    isMatch: uniqueTokens.some((token) => token.toLowerCase() === segment.toLowerCase()),
  }));
}

function formatResultPath(href: string): string {
  try {
    const parsed = href.startsWith('http')
      ? new URL(href)
      : new URL(href, 'https://travelworks.local');
    const pathname = decodeURIComponent(parsed.pathname || '/');
    return pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  } catch {
    return href;
  }
}

type SharedNavProps = {
  locale: string;
  homeHref: string;
  askForDemoHref: string;
  newsHref: string;
  integrationsHref: string;
  languageLinks: LanguageLink[];
  labels: NavbarLabels;
  logInOptions: DropdownCtaOption[];
  getProductLabel: (key: ProductLinkKey) => string;
  getAboutUsLabel: (key: AboutUsLinkKey) => string;
  getTrainingLabel: (key: TrainingLinkKey) => string;
  solutionHref: (linkKey: ProductLinkKey) => string;
  aboutUsHref: (linkKey: AboutUsLinkKey) => string;
  trainingHref: (linkKey: TrainingLinkKey) => string;
  isHrefActive: (href: string) => boolean;
  activeProductCategory: ProductCategory;
};

type NavbarDesktopContentProps = SharedNavProps & {
  isProductsOpen: boolean;
  isAboutUsOpen: boolean;
  isTrainingOpen: boolean;
  isProductsActive: boolean;
  isAboutUsActive: boolean;
  isTrainingActive: boolean;
  isLangOpen: boolean;
  loginDropdownCloseSignal: number;
  onToggleProducts: () => void;
  onToggleAboutUs: () => void;
  onToggleTraining: () => void;
  onClearPanels: () => void;
  onOpenSearch: () => void;
  onToggleLanguageMenu: () => void;
  onCloseLanguageMenu: () => void;
};

export function NavbarDesktopContent({
  locale,
  homeHref,
  askForDemoHref,
  integrationsHref,
  languageLinks,
  labels,
  logInOptions,
  getProductLabel,
  getAboutUsLabel,
  getTrainingLabel,
  solutionHref,
  aboutUsHref,
  trainingHref,
  isHrefActive,
  activeProductCategory,
  isProductsOpen,
  isAboutUsOpen,
  isTrainingOpen,
  isProductsActive,
  isAboutUsActive,
  isTrainingActive,
  isLangOpen,
  loginDropdownCloseSignal,
  onToggleProducts,
  onToggleAboutUs,
  onToggleTraining,
  onClearPanels,
  onOpenSearch,
  onToggleLanguageMenu,
  onCloseLanguageMenu,
}: NavbarDesktopContentProps) {
  const isFrenchLocale = locale.toLowerCase().startsWith('fr');

  return (
    <>
      <nav className="mx-auto flex w-full max-w-[1600px] items-center py-2 px-4 sm:px-6 lg:px-8">
        <Link
          href={homeHref}
          className="text-xl font-semibold tracking-tight text-zinc-900 uppercase"
        >
          {isFrenchLocale ? (
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

        <div className="ml-2 hidden flex-1 items-center justify-between lg:flex">
          <ul className="flex items-center gap-0">
            <li>
              <button
                type="button"
                className={`inline-flex items-center rounded-md px-2 py-2 text-[13px] uppercase transition duration-150 hover:bg-zinc-100 hover:border-b-2 hover:border-amber-600 ${
                  isProductsActive ? 'font-bold text-[#015caa]' : 'font-medium text-zinc-800'
                }`}
                aria-expanded={isProductsOpen}
                aria-controls="products-mega-menu"
                aria-haspopup="menu"
                onClick={onToggleProducts}
              >
                <span>{labels.products}</span>
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
                className={`inline-flex items-center rounded-md px-2 py-2 text-[13px] uppercase transition duration-150 hover:bg-zinc-100 hover:border-b-2 hover:border-amber-600 ${
                  isAboutUsActive ? 'font-bold text-[#015caa]' : 'font-medium text-zinc-800'
                }`}
                aria-expanded={isAboutUsOpen}
                aria-controls="about-us-menu"
                aria-haspopup="menu"
                onClick={onToggleAboutUs}
              >
                <span>{labels.aboutUs}</span>
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
                aria-label={labels.aboutUs}
                aria-hidden={!isAboutUsOpen}
                className={`absolute left-0 top-full mt-3 w-56 rounded-xl border border-zinc-200 bg-black/90 p-2 shadow-lg transition duration-200 motion-reduce:transition-none ${
                  isAboutUsOpen
                    ? 'visible translate-y-0 opacity-100'
                    : 'pointer-events-none invisible -translate-y-1 opacity-0'
                }`}
              >
                {(['company', 'clients', 'contact', 'careers'] as const).map((link) => {
                  const Icon = aboutUsLinkIcons[link];
                  const href = aboutUsHref(link);
                  const isActive = isHrefActive(href);
                  return (
                    <Link
                      key={link}
                      href={href}
                      role="menuitem"
                      className={`flex items-center gap-2 rounded-md border-l-2 px-3 py-2 text-[13px] transition duration-150 ${
                        isActive
                          ? 'border-orange-400 bg-brand-blue text-white uppercase'
                          : 'border-transparent text-white hover:bg-zinc-700 hover:border-l-2 hover:border-amber-500 uppercase'
                      }`}
                      onClick={onClearPanels}
                    >
                      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-brand-orange-light to-brand-orange-dark shadow-[0_3px_0_0_#9a3412] border-t-2 border-white/50">
                        {/* Main icon */}
                        <Icon
                          className="relative z-10 h-5.5 w-5.5 text-white transition duration-150"
                          aria-hidden="true"
                        />

                        {/* Shadow icon */}
                        <Icon
                          className="absolute h-5.5 w-5.5 top-[10px] left-[10px] text-orange-800"
                          aria-hidden="true"
                        />
                      </div>
                      <span className={isActive ? 'font-semibold' : 'font-medium'}>
                        {getAboutUsLabel(link)}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </li>
            <li>
              <Link
                href={integrationsHref}
                className={`inline-flex items-center rounded-md px-2 py-2 text-[13px] uppercase transition duration-150 hover:bg-zinc-100 hover:border-b-2 hover:border-amber-600 ${
                  isHrefActive(integrationsHref)
                    ? 'font-bold text-brand-blue'
                    : 'font-medium text-zinc-800'
                }`}
                onMouseEnter={onClearPanels}
                onFocus={onClearPanels}
              >
                {labels.integrations}
              </Link>
            </li>
            <li className="relative">
              <button
                type="button"
                className={`inline-flex items-center rounded-md px-2 py-2 text-[13px] uppercase transition duration-150 hover:bg-zinc-100 hover:border-b-2 hover:border-amber-600 ${
                  isTrainingActive ? 'font-bold text-[#015caa]' : 'font-medium text-zinc-800'
                }`}
                aria-expanded={isTrainingOpen}
                aria-controls="training-menu"
                aria-haspopup="menu"
                onClick={onToggleTraining}
              >
                <span>{labels.training}</span>
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
                aria-label={labels.training}
                aria-hidden={!isTrainingOpen}
                className={`absolute left-0 top-full mt-3 w-56 rounded-xl border border-zinc-200 bg-black/90 p-3 shadow-lg transition duration-200 motion-reduce:transition-none ${
                  isTrainingOpen
                    ? 'visible translate-y-0 opacity-100'
                    : 'pointer-events-none invisible -translate-y-1 opacity-0'
                }`}
              >
                {(['platform', 'knowledgeBase'] as const).map((link) => {
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
                          ? 'border-orange-400 bg-brand-blue text-white uppercase'
                          : 'border-transparent text-white hover:bg-zinc-700 hover:border-l-2 hover:border-amber-500 uppercase'
                      }`}
                      onClick={onClearPanels}
                    >
                      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-brand-orange-light to-brand-orange-dark shadow-[0_3px_0_0_#9a3412] border-t-2 border-white/50">
                        {/* Main icon */}
                        <Icon
                          className="relative z-10 h-5.5 w-5.5 text-white transition duration-150"
                          aria-hidden="true"
                        />

                        {/* Shadow icon */}
                        <Icon
                          className="absolute h-5.5 w-5.5 top-[10px] left-[10px]  text-orange-800"
                          aria-hidden="true"
                        />
                      </div>
                      <span className={isActive ? 'font-semibold' : 'font-medium'}>
                        {getTrainingLabel(link)}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </li>
          </ul>

          <div className="flex items-center gap-2">
            <Link href={askForDemoHref}>
              <div className="button-main">
                <CtaButton label={labels.askForDemo} variant="orangeGradient" size="xs" />
              </div>
            </Link>
            <div onFocusCapture={onClearPanels}>
              <DropdownCtaButton
                key={`desktop-login-${loginDropdownCloseSignal}`}
                label={labels.logIn}
                variant="default"
                size="xs"
                options={logInOptions}
                align="left"
              />
            </div>

            <div className="relative">
              <button
                type="button"
                className="inline-flex items-center rounded-md px-3 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
                aria-expanded={isLangOpen}
                aria-controls="language-menu"
                aria-haspopup="menu"
                onClick={onToggleLanguageMenu}
              >
                <Globe className="mr-2 inline-block h-5 w-5 text-brand-blue" />
                {labels.languagePrefix}
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
                  className={`absolute top-full mt-2 w-64 rounded-xl border border-zinc-200 bg-white max-w-[200px] p-2 shadow-lg`}
                >
                  {languageLinks.map((item) => (
                    <Link
                      key={item.routeLocale}
                      href={item.href}
                      role="menuitem"
                      className={`block rounded-md px-3 py-2 text-sm transition ${
                        item.isActive ? 'bg-zinc-900 text-white' : 'text-zinc-700 hover:bg-zinc-100'
                      }`}
                      onClick={onCloseLanguageMenu}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-zinc-700 transition bg-brand-blue hover:bg-[#284782]"
              aria-label="Open search"
              onClick={onOpenSearch}
            >
              <Search className="h-5 w-5 text-white" aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>

      <div
        id="products-mega-menu"
        role="menu"
        aria-label={labels.products}
        aria-hidden={!isProductsOpen}
        className={`absolute inset-x-0 top-full hidden border-t border-zinc-200 bg-black/90 rounded-b-2xl lg:block ${
          isProductsOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
        }`}
      >
        <div
          className={`mx-auto w-full max-w-7xl px-6  transition duration-200  ${
            isProductsOpen ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'
          }`}
        >
          <div className="grid min-h-54 grid-cols-[250px_1fr] overflow-hidden">
            <div className="border-r border-zinc-600 rounded-2xl p-8 bg-gradient-to-r from-transparent to-zinc-800 lg:mr-3 my-2">
              <p className="flex items-center h-full max-w-[120ch] text-xl font-regular leading-[1.4] tracking-tight text-white">
                <span>
                  {labels.productsPromoMessage}
                </span>
              </p>
            </div>
            <div className="p-7">
              <div className="grid grid-cols-4 gap-x-60 gap-y-80">
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
                          onClick={onClearPanels}
                          className={`inline-flex w-fit items-center gap-4 rounded-md border-l-2 px-3 py-2 text-sm transition duration-150 ${
                            isActive
                              ? 'border-orange-400 bg-brand-blue text-white uppercase'
                              : 'border-transparent text-white hover:bg-zinc-700 hover:border-amber-500 uppercase'
                          }`}
                        >
                          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-brand-orange-light to-brand-orange-dark shadow-[0_3px_0_0_#9a3412] border-t-2 border-white/50">
                            {/* Main icon */}
                            <Icon
                              className="relative z-10 h-5.5 w-5.5 text-white transition duration-150"
                              aria-hidden="true"
                            />

                            {/* Shadow icon */}
                            <Icon
                              className="absolute h-5.5 w-5.5 top-[10px] left-[10px]  text-orange-800"
                              aria-hidden="true"
                            />
                          </div>
                          <span
                            className={`min-w-40 break-words ${
                              isActive ? 'font-semibold' : 'font-medium'
                            }`}
                          >
                            {getProductLabel(linkKey)}
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
    </>
  );
}

type NavbarMobileMenuProps = SharedNavProps & {
  isMobileOpen: boolean;
  mobileSection: MobileSection;
  isMobileLoginOpen: boolean;
  onToggleMobileSection: (section: Exclude<MobileSection, null>) => void;
  onToggleMobileLogin: () => void;
  onCloseMobileMenu: () => void;
  onExternalOptionClick: (event: React.MouseEvent, href?: string, onSelect?: () => void) => void;
};

export function NavbarMobileMenu({
  isMobileOpen,
  mobileSection,
  isMobileLoginOpen,
  activeProductCategory,
  newsHref,
  askForDemoHref,
  labels,
  languageLinks,
  logInOptions,
  getProductLabel,
  getAboutUsLabel,
  getTrainingLabel,
  solutionHref,
  aboutUsHref,
  trainingHref,
  onToggleMobileSection,
  onToggleMobileLogin,
  onCloseMobileMenu,
  onExternalOptionClick,
}: NavbarMobileMenuProps) {
  if (!isMobileOpen) {
    return null;
  }

  return (
    <div id="mobile-menu" className="border-t border-zinc-200 bg-white px-4 py-3 lg:hidden">
      <ul className="space-y-2">
        <li>
          <button
            type="button"
            className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium text-zinc-700 hover:bg-zinc-100"
            onClick={() => onToggleMobileSection('products')}
          >
            <span>{labels.products}</span>
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
                {productColumnsByCategory[activeProductCategory].flat().map((linkKey) => {
                  const Icon = productLinkIcons[linkKey];
                  return (
                    <Link
                      key={`mobile-${linkKey}`}
                      href={solutionHref(linkKey)}
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-white"
                      onClick={onCloseMobileMenu}
                    >
                      <Icon className="relative z-10 w-5.5 h-5.5 transition duration-150 text-white group-hover:text-zinc-700 rounded-full" aria-hidden="true" />
                      {getProductLabel(linkKey)}
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : null}
        </li>

        <li>
          <button
            type="button"
            className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium text-zinc-700 hover:bg-zinc-100"
            onClick={() => onToggleMobileSection('aboutUs')}
          >
            <span>{labels.aboutUs}</span>
            <ChevronDown
              className={`ml-1 inline-block h-4 w-4 transition-transform duration-150 ${
                mobileSection === 'aboutUs' ? 'rotate-180' : 'rotate-0'
              }`}
              aria-hidden="true"
            />
          </button>
          {mobileSection === 'aboutUs' ? (
            <div className="mt-2 rounded-xl bg-zinc-100 p-3">
              {(['company', 'clients', 'contact', 'careers'] as const).map((link) => {
                const Icon = aboutUsLinkIcons[link];
                return (
                  <Link
                    key={`mobile-${link}`}
                    href={aboutUsHref(link)}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-white"
                    onClick={onCloseMobileMenu}
                  >
                    <Icon className="relative z-10 w-5.5 h-5.5 transition duration-150 text-white group-hover:text-zinc-700 rounded-full"aria-hidden="true" />
                    {getAboutUsLabel(link)}
                  </Link>
                );
              })}
            </div>
          ) : null}
        </li>

        <li>
          <button
            type="button"
            className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium text-zinc-700 hover:bg-zinc-100"
            onClick={() => onToggleMobileSection('training')}
          >
            <span>{labels.training}</span>
            <ChevronDown
              className={`ml-1 inline-block h-4 w-4 transition-transform duration-150 ${
                mobileSection === 'training' ? 'rotate-180' : 'rotate-0'
              }`}
              aria-hidden="true"
            />
          </button>
          {mobileSection === 'training' ? (
            <div className="mt-2 rounded-xl bg-zinc-100 p-3">
              {(['platform', 'knowledgeBase'] as const).map((link) => {
                const Icon = trainingLinkIcons[link];
                return (
                  <Link
                    key={`mobile-${link}`}
                    href={trainingHref(link)}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-white"
                    onClick={onCloseMobileMenu}
                  >
                    <Icon className="relative z-10 w-5.5 h-5.5 transition duration-150 text-white group-hover:text-zinc-700 rounded-full" aria-hidden="true" />
                    {getTrainingLabel(link)}
                  </Link>
                );
              })}
            </div>
          ) : null}
        </li>
        <li className="border-t border-zinc-200 pt-2">
          <Link
            href={askForDemoHref}
            className="block rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
            onClick={onCloseMobileMenu}
          >
            {labels.askForDemo}
          </Link>
        </li>
        <li>
          <button
            type="button"
            className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium text-zinc-700 hover:bg-zinc-100"
            aria-expanded={isMobileLoginOpen}
            aria-controls="mobile-login-menu"
            onClick={onToggleMobileLogin}
          >
            <span>{labels.logIn}</span>
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
                    onClick={(event) => onExternalOptionClick(event, option.href, option.onSelect)}
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
          {labels.languageTitle}
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
              onClick={onCloseMobileMenu}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

type NavbarSearchDialogProps = {
  isSearchOpen: boolean;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  labels: Pick<
    NavbarLabels,
    | 'searchDialogLabel'
    | 'searchPlaceholder'
    | 'searchHint'
    | 'searchLoading'
    | 'searchNoResults'
    | 'searchPagesLabel'
    | 'searchNewsLabel'
    | 'searchError'
  >;
  query: string;
  results: NavbarSearchResult[];
  isSearchLoading: boolean;
  searchError: string | null;
  activeResultIndex: number;
  onQueryChange: (value: string) => void;
  onInputKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onHoverResult: (index: number) => void;
  onSelectResult: (href: string) => void;
  onClose: () => void;
};

export function NavbarSearchDialog({
  isSearchOpen,
  searchInputRef,
  labels,
  query,
  results,
  isSearchLoading,
  searchError,
  activeResultIndex,
  onQueryChange,
  onInputKeyDown,
  onHoverResult,
  onSelectResult,
  onClose,
}: NavbarSearchDialogProps) {
  if (!isSearchOpen) {
    return null;
  }

  const pages = results.filter((item) => item.type === 'page');
  const news = results.filter((item) => item.type === 'news');
  const searchStarted = query.trim().length >= 2;
  const highlightTokens = query
    .trim()
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length >= 2)
    .slice(0, 8);
  const showNoResults = searchStarted && !isSearchLoading && !searchError && results.length === 0;

  const renderHighlightedText = (text: string, isActive: boolean) => {
    const parts = buildHighlightParts(text, highlightTokens);

    return parts.map((part, index) => {
      if (!part.isMatch) {
        return <span key={`${part.value}-${index}`}>{part.value}</span>;
      }

      return (
        <mark
          key={`${part.value}-${index}`}
          className={`rounded px-0.5 ${
            isActive ? 'bg-amber-300 text-zinc-900' : 'bg-amber-100 text-zinc-900'
          }`}
        >
          {part.value}
        </mark>
      );
    });
  };

  const renderResultGroup = (
    groupTitle: string,
    groupResults: NavbarSearchResult[],
    emptyStateClassName = 'mt-4',
  ) => {
    if (groupResults.length === 0) {
      return null;
    }

    return (
      <div className={emptyStateClassName}>
        <p className="px-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">
          {groupTitle}
        </p>
        <div className="mt-2 space-y-1">
          {groupResults.map((result) => {
            const globalIndex = results.findIndex((item) => item.id === result.id);
            const isActive = globalIndex === activeResultIndex;

            return (
              <Link
                key={result.id}
                href={result.href}
                className={`block rounded-xl border px-3 py-3 transition ${
                  isActive
                    ? 'border-zinc-900 bg-zinc-900 text-white'
                    : 'border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50'
                }`}
                onMouseEnter={() => onHoverResult(globalIndex)}
                onFocus={() => onHoverResult(globalIndex)}
                onClick={(event) => {
                  event.preventDefault();
                  onSelectResult(result.href);
                }}
              >
                <div className="mb-1 flex items-center gap-2 text-xs">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-semibold uppercase tracking-wide ${
                      isActive
                        ? 'border-zinc-200/70 text-zinc-100'
                        : 'border-zinc-300 text-zinc-600'
                    }`}
                  >
                    {result.type === 'page' ? (
                      <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                      <Newspaper className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    {result.type === 'page' ? labels.searchPagesLabel : labels.searchNewsLabel}
                  </span>
                  <span className={`truncate ${isActive ? 'text-zinc-200' : 'text-zinc-500'}`}>
                    {formatResultPath(result.href)}
                  </span>
                </div>
                <p className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-zinc-900'}`}>
                  {renderHighlightedText(result.title, isActive)}
                </p>
                <p
                  className={`mt-1 line-clamp-2 text-sm ${isActive ? 'text-zinc-200' : 'text-zinc-600'}`}
                >
                  {renderHighlightedText(result.description, isActive)}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    );
  };

  return (
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
      aria-label={labels.searchDialogLabel}
      onClick={onClose}
    >
      <div className="w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
        <div className="rounded-2xl border border-zinc-300 bg-white p-4 shadow-2xl sm:p-6">
          <div className="flex items-center gap-3 rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 sm:px-5">
            <Search className="h-5 w-5 shrink-0 text-zinc-500" aria-hidden="true" />
            <input
              ref={searchInputRef}
              type="search"
              placeholder={labels.searchPlaceholder}
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              onKeyDown={onInputKeyDown}
              className="h-10 w-full bg-transparent text-base text-zinc-800 placeholder:text-zinc-500 focus:outline-none"
            />
            <button
              type="button"
              className="hidden shrink-0 rounded-lg border border-zinc-300 px-3 py-2 text-sm font-semibold text-zinc-600 sm:inline-flex"
              onClick={onClose}
            >
              ESC
            </button>
            <button
              type="button"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-300 text-zinc-600 transition hover:bg-zinc-100"
              aria-label="Close search"
              onClick={onClose}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <p className="mt-4 px-1 text-sm text-zinc-500">{labels.searchHint}</p>

          {isSearchLoading ? (
            <p className="mt-4 px-1 text-sm text-zinc-600">{labels.searchLoading}</p>
          ) : null}

          {searchError ? (
            <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {labels.searchError}
            </p>
          ) : null}

          {showNoResults ? (
            <p className="mt-4 px-1 text-sm text-zinc-600">{labels.searchNoResults}</p>
          ) : null}

          {!isSearchLoading && !searchError && results.length > 0 ? (
            <div className="mt-4 max-h-[52vh] overflow-y-auto pr-1">
              {renderResultGroup(labels.searchPagesLabel, pages)}
              {renderResultGroup(labels.searchNewsLabel, news, pages.length > 0 ? 'mt-5' : 'mt-4')}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
