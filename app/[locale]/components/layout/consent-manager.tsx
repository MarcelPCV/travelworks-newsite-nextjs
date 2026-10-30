'use client';

import {
  ConsentBanner,
  ConsentDialog,
  ConsentManagerProvider,
  useConsentManager,
  useHeadlessConsentUI,
} from '@c15t/nextjs';
import type { AllConsentNames, ConsentManagerOptions } from '@c15t/nextjs';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import posthog from 'posthog-js';
import { useEffect, type ReactNode } from 'react';
import frenchConsentMessages from '@/messages/c15t-fr.json';
import styles from './consent-manager.module.css';

const hostedBackendUrl = process.env.NEXT_PUBLIC_C15T_BACKEND_URL;
const isHostedMode = Boolean(hostedBackendUrl);
const consentCategories: AllConsentNames[] = ['necessary', 'measurement', 'marketing'];
const consentI18n: NonNullable<ConsentManagerOptions['i18n']> = {
  locale: 'en',
  detectBrowserLanguage: false,
  messages: { en: {}, fr: frenchConsentMessages },
};
let posthogInitialized = false;

function stopPostHog() {
  if (posthogInitialized && !posthog.has_opted_out_capturing()) {
    posthog.opt_out_capturing();
  }
}

function PostHogConsent() {
  const { consents, hasFetchedBanner } = useConsentManager();
  const measurementAllowed = hasFetchedBanner && consents.measurement;

  useEffect(() => {
    if (!measurementAllowed) {
      stopPostHog();
      return;
    }

    if (!posthogInitialized) {
      posthog.init('phc_wQoHpk8osMmSmHiZ9ZNVmjFPVXTTPiM2fxtVGeqFcck2', {
        api_host: 'https://us.i.posthog.com',
        defaults: '2026-08-30',
        opt_out_capturing_by_default: true,
        opt_out_persistence_by_default: true,
        loaded: () => posthog.opt_in_capturing({ captureEventName: false }),
      });
      posthogInitialized = true;
    } else if (posthog.has_opted_out_capturing()) {
      posthog.opt_in_capturing({ captureEventName: false });
      posthog.capture('$pageview');
    }
  }, [measurementAllowed]);

  return null;
}

const callbacks: NonNullable<ConsentManagerOptions['callbacks']> = {
  onConsentSet: ({ preferences }) => {
    if (!preferences.measurement) stopPostHog();
  },
};

function BannerActions() {
  const { banner } = useHeadlessConsentUI();
  const defaultGroups = [
    [['reject', 'accept'], ['customize']],
    [['reject', 'accept', 'customize']],
  ];
  const useDefaultLayout =
    banner.direction === 'row' &&
    !banner.shouldFillActions &&
    defaultGroups.some((groups) => JSON.stringify(groups) === JSON.stringify(banner.actionGroups));

  if (!useDefaultLayout) return <ConsentBanner.PolicyActions />;

  return (
    <ConsentBanner.Footer className={styles.defaultActions}>
      <ConsentBanner.CustomizeButton
        consentAction="customize"
        isPrimary={banner.primaryActions.includes('customize')}
      />
      <ConsentBanner.FooterSubGroup>
        <ConsentBanner.RejectButton
          consentAction="reject"
          isPrimary={banner.primaryActions.includes('reject')}
        />
        <ConsentBanner.AcceptButton
          consentAction="accept"
          isPrimary={banner.primaryActions.includes('accept')}
        />
      </ConsentBanner.FooterSubGroup>
    </ConsentBanner.Footer>
  );
}

export default function ConsentManager({ children }: { children: ReactNode }) {
  const t = useTranslations('consent');
  const locale = useLocale();
  const isFrench = locale === 'fr-ca';
  const theme = {
    colors: { overlay: 'rgba(0, 0, 0, 0.5)' },
    dark: { overlay: 'rgba(0, 0, 0, 0.5)' },
  };
  const overrides = {
    language: isFrench ? 'fr' : 'en',
    ...(process.env.NODE_ENV === 'development' ? { country: 'DE' } : {}),
  };

  const options: ConsentManagerOptions = isHostedMode
    ? {
        mode: 'hosted' as const,
        backendURL: hostedBackendUrl as string,
        consentCategories,
        callbacks,
        i18n: consentI18n,
        theme,
        colorScheme: 'light',
        overrides,
      }
    : {
        mode: 'offline' as const,
        consentCategories,
        callbacks,
        i18n: consentI18n,
        theme,
        colorScheme: 'light',
        overrides,
      };

  return (
    <ConsentManagerProvider options={options}>
      <PostHogConsent />
      <ConsentBanner.Root scrollLock className={styles.bannerRoot}>
        <ConsentBanner.Card className={styles.bannerCard}>
          <ConsentBanner.Header className={styles.bannerHeader}>
            <div className={styles.logo}>
              <Image
                src={isFrench ? '/images/branding/pcvoyages.svg' : '/images/branding/travelworks.svg'}
                alt={isFrench ? 'PcVoyages' : 'TravelWorks'}
                width={135}
                height={53}
                className="h-auto w-[6.6rem] sm:w-[8.4rem]"
              />
            </div>
            <div className={styles.content}>
              <ConsentBanner.Title className={styles.title} />
              <ConsentBanner.Description className={styles.description}>
                {t('descriptionBeforePrivacy')}{' '}
                <a
                  href={t('privacyPolicyUrl')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 decoration-current transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                >
                  {t('privacyPolicyLabel')}
                </a>{' '}
                {t('descriptionAfterCookie')}
              </ConsentBanner.Description>
            </div>
          </ConsentBanner.Header>
          <BannerActions />
        </ConsentBanner.Card>
      </ConsentBanner.Root>
      <ConsentDialog />
      {children}
    </ConsentManagerProvider>
  );
}
