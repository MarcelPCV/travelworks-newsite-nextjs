'use client';

import React, { ReactNode } from 'react';
import { ArrowUp } from 'lucide-react';

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
  logo,
  phone = '+1 (555) 555-5555',
  email = 'hello@example.com',
  socialLinks = {},
  className,
  showBackToTop = true,
}: ContactBarSectionProps) {
  const handleBackToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const rootClassName = ['w-full rounded-2xl bg-neutral-canvas px-4 py-6 sm:px-6 lg:px-8', className]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={rootClassName} aria-labelledby="contact-bar-heading">
      <div className="mx-auto max-w-7xl flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center justify-center sm:justify-start">
          {logo ? (
            <div className="h-10">{logo}</div>
          ) : (
            <div className="text-[1.05rem] font-semibold text-brand-blue">Logo</div>
          )}
        </div>

        <address className="not-italic text-center sm:text-left">
          <div className="type-normal-16 text-neutral-700">
            <span className="mr-2">Call us:</span>
            <a href={`tel:${phone}`} className="font-semibold text-brand-blue hover:underline">
              {phone}
            </a>
          </div>
          <div className="type-normal-16 text-neutral-700">
            <span className="mr-2">Email:</span>
            <a href={`mailto:${email}`} className="font-semibold text-brand-blue hover:underline">
              {email}
            </a>
          </div>
        </address>

        <div className="flex items-center justify-center gap-2">
          <a
            href={socialLinks.youtube ?? '#'}
            aria-label="YouTube"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md hover:bg-neutral-100"
          >
            <svg className="h-5 w-5 text-neutral-800" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <rect width="24" height="24" rx="4" fill="#FF0000" />
              <path d="M9 8l6 4-6 4V8z" fill="#fff" />
            </svg>
          </a>
          <a
            href={socialLinks.linkedin ?? '#'}
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md hover:bg-neutral-100"
          >
            <svg className="h-5 w-5 text-neutral-800" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <rect width="24" height="24" rx="4" fill="#0A66C2" />
              <path d="M7 10v7H4v-7h3zm-1.5-5a1.75 1.75 0 110 3.5 1.75 1.75 0 010-3.5zM12 10v7h-3v-7h3zm1.5 0h2.8v1.1h.04c.39-.73 1.34-1.5 2.76-1.5 2.95 0 3.5 1.94 3.5 4.46V17h-3v-3.2c0-.76-.01-1.74-1.06-1.74-1.06 0-1.22.83-1.22 1.67V17h-3v-7z" fill="#fff" />
            </svg>
          </a>
          <a
            href={socialLinks.facebook ?? '#'}
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md hover:bg-neutral-100"
          >
            <svg className="h-5 w-5 text-neutral-800" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <rect width="24" height="24" rx="4" fill="#1877F2" />
              <path d="M15 8h1.5V5.5H15c-1.38 0-2.5 1.12-2.5 2.5V10H11v2h1.5v5H15v-5h1.5l.5-2H15V8z" fill="#fff" />
            </svg>
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
