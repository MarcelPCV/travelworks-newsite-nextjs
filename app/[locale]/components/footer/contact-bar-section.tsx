'use client';

import React, { ReactNode } from 'react';
import { ArrowUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { DEFAULT_ROUTE_LOCALE, localeOptions } from '@/app/[locale]/locale-config';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { Mail, Phone } from 'lucide-react';

type SocialLinks = {
  youtube?: string;
  linkedin?: string;
  facebook?: string;
};

type ContactBarSectionProps = {
  logo?: ReactNode;
  phone?: string;
  email?: string;
  socialLinks?: SocialLinks;
  className?: string;
  showBackToTop?: boolean;
};

export default function ContactBarSection({
  className,
  showBackToTop = true,
}: ContactBarSectionProps) {
  const t = useTranslations('footer.block-type-contact-bar-section');
  const phone = t('phone');
  const phone2 = t('phone2');
  const email = t('email');
  const title = t('title');
  const locale = useLocale();
  const activeMessageLocale = useLocale();
  const handleBackToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const rootClassName = [
    'w-full rounded-2xl bg-neutral-canvas px-4 py-6 sm:px-6 lg:px-8',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const homeHrefByRouteLocale: Record<string, string> = {
    [DEFAULT_ROUTE_LOCALE]: '/',
    'en-ca': '/en-ca',
    'fr-ca': '/fr-ca',
    'en-au': '/en-au',
  };

  const currentRouteLocale =
    localeOptions.find((item) => item.messageLocale === activeMessageLocale)?.routeLocale ??
    DEFAULT_ROUTE_LOCALE;

  const homeHref =
    homeHrefByRouteLocale[currentRouteLocale] ??
    (currentRouteLocale === DEFAULT_ROUTE_LOCALE ? '/' : `/${currentRouteLocale}`);

  return (
    <section className={rootClassName} aria-labelledby="contact-bar-heading">
      <div className="mx-auto max-w-7xl flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center justify-center sm:justify-start">
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
        </div>

        <address className="not-italic text-center sm:text-left">
          <div className="text-lg text-neutral-700">
            <div className="mr-2">{title}</div>

            {phone && (
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <span className="mr-2">
                  <Phone className="h-5 w-5 text-amber-600" />
                </span>
                <a
                  href={`tel:${phone}`}
                  className="text-md font-semibold text-brand-blue hover:underline"
                >
                  {phone}
                </a>
              </div>
            )}
            {phone2 && (
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <span className="mr-2">
                  <Phone className="h-5 w-5 text-amber-600" />
                </span>
                <a
                  href={`tel:${phone2}`}
                  className="text-md font-semibold text-brand-blue hover:underline"
                >
                  {phone2}
                </a>
              </div>
            )}
          </div>
          <div className="flex items-center justify-center gap-2 sm:justify-start">
            <span className="mr-2">
              <Mail className="h-5 w-5 text-amber-600" />
            </span>
            <a
              href={`mailto:${email}`}
              className="text-md font-semibold text-brand-blue hover:underline"
            >
              {email}
            </a>
          </div>
        </address>

        <div className="flex items-center justify-center gap-2">
          <a
            href="https://www.youtube.com/channel/UCL7XrLRtCA2k1bNnHX3biVA"
            aria-label="YouTube"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/images/branding/youtube.svg" alt="YouTube" width={35} height={35} />
          </a>
          <a
            href="https://www.linkedin.com/company/travelworks---pc-voyages"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/images/branding/linkedin.svg" alt="LinkedIn" width={35} height={35} />
          </a>
          <a
            href="https://www.facebook.com/TravelWorks-Div-of-PC-Voyages-113096271414403"
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/images/branding/facebook.svg" alt="Facebook" width={35} height={35} />
          </a>

          {showBackToTop && (
            <button
              type="button"
              onClick={handleBackToTop}
              aria-label="Back to top"
              className="ml-2 inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            >
              <ArrowUp className="h-4 w-4" />
              <span>Back to top</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
