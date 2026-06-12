'use client';

import { ConsentBanner, ConsentDialog, ConsentManagerProvider } from '@c15t/nextjs';
import type { AllConsentNames, ConsentManagerOptions } from '@c15t/nextjs';
import { useTranslations } from 'next-intl';

const hostedBackendUrl = process.env.NEXT_PUBLIC_C15T_BACKEND_URL;
const isHostedMode = Boolean(hostedBackendUrl);
const consentCategories: AllConsentNames[] = ['necessary', 'measurement', 'marketing'];

export default function ConsentManager() {
  const t = useTranslations('consent');

  const options: ConsentManagerOptions = isHostedMode
    ? {
        mode: 'hosted' as const,
        backendURL: hostedBackendUrl as string,
        consentCategories,
        overrides: process.env.NODE_ENV === 'development' ? { country: 'DE' } : undefined,
      }
    : {
        mode: 'offline' as const,
        consentCategories,
        overrides: process.env.NODE_ENV === 'development' ? { country: 'DE' } : undefined,
      };

  return (
    <ConsentManagerProvider options={options}>
      <ConsentBanner.Root>
        <ConsentBanner.Card className="shadow-2xl">
          <ConsentBanner.Header>
            <ConsentBanner.Title />
            <ConsentBanner.Description>
              <div className="max-w-xl">
                {t('descriptionBeforePrivacy')}{' '}
                <a
                  href={t('privacyPolicyUrl')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 decoration-current transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                >
                  {t('privacyPolicyLabel')}
                </a>
                {' '}
                {t('betweenLinksText')}{' '}
                <a
                  href={t('cookiePolicyUrl')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 decoration-current transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                >
                  {t('cookiePolicyLabel')}
                </a>
                {t('descriptionAfterCookie')}
              </div>
            </ConsentBanner.Description>
          </ConsentBanner.Header>
          <ConsentBanner.Footer>
            <ConsentBanner.PolicyActions />
          </ConsentBanner.Footer>
        </ConsentBanner.Card>
      </ConsentBanner.Root>
      <ConsentDialog />
    </ConsentManagerProvider>
  );
}
