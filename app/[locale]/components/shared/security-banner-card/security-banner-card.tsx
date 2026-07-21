'use client';

import { ArrowRight, LockKeyhole } from 'lucide-react';
import { useLocale } from 'next-intl';
import CtaButton from '../../ui/cta-button';

type SecurityBannerCardProps = {
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
  className?: string;
};

const translations = {
  en: {
    title: 'Robust, Fast, Reliable and Secure',
    description:
      'Years of development were spent building software focused on robustness, speed, reliability, and security.',
    buttonLabel: 'See More',
  },
  fr: {
    title: 'Robuste, rapide, fiable et sécurisé',
    description:
      "Des années de développement ont été consacrées à la création d'un logiciel axé sur la robustesse, la rapidité, la fiabilité et la sécurité.",
    buttonLabel: 'En savoir plus',
  },
};

export default function SecurityBannerCard({
  title,
  description,
  buttonLabel,
  buttonHref,
  className,
}: SecurityBannerCardProps) {
  const locale = useLocale();

  const t = locale === 'fr-ca' ? translations.fr : translations.en;
  const defaultHrefByLocale: Record<string, string> = {
    'fr-ca': '/fr-ca/logiciel-agence-voyage/avantages',
    'en-au': '/en-au/travel-agency-software/benefits',
    'en-ca': '/en-ca/travel-agency-software/benefits',
    'en-us': '/travel-agency-software/benefits',
  };
  const resolvedButtonHref =
    buttonHref ?? defaultHrefByLocale[locale] ?? '/travel-agency-software/benefits';

  const rootClassName = [
    'w-full max-w-[300px] overflow-hidden rounded-sm border border-neutral-border bg-neutral-canvas',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <aside className={rootClassName} aria-label="Security banner">
      <div className="flex flex-col items-center justify-center px-6 pb-5 pt-8 sm:pb-8 sm:pt-10">
        <div className="rounded-full border-4 border-amber-600 p-4">
          <LockKeyhole className="h-16 w-16 text-amber-600 sm:h-20 sm:w-20" strokeWidth={2.1} />
        </div>
      </div>

      <div className="bg-brand-blue px-6 pb-8 pt-7 text-center text-white sm:px-8 sm:pb-10 sm:pt-8">
        <h3 className="text-[2rem] font-medium uppercase leading-tight sm:text-[2.45rem]">
          {title ?? t.title}
        </h3>

        <p className="mx-auto mt-5 max-w-[22ch] text-[1rem] leading-tight text-white/95 sm:leading-tight">
          {description ?? t.description}
        </p>

        {(buttonLabel ?? t.buttonLabel) && resolvedButtonHref && (
          <a href={resolvedButtonHref}>
            <CtaButton
              label={buttonLabel ?? t.buttonLabel}
              variant="orangeGradient"
              size="sm"
              icon={<ArrowRight className="h-6 w-6" strokeWidth={2.4} />}
              iconPosition="after"
              className="mt-6"
            />
          </a>
        )}
      </div>
    </aside>
  );
}
