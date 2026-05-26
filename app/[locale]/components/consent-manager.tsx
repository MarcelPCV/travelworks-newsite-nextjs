'use client';

import { ConsentBanner, ConsentDialog, ConsentManagerProvider } from '@c15t/nextjs';
import type { AllConsentNames, ConsentManagerOptions } from '@c15t/nextjs';

const hostedBackendUrl = process.env.NEXT_PUBLIC_C15T_BACKEND_URL;
const isHostedMode = Boolean(hostedBackendUrl);
const consentCategories: AllConsentNames[] = ['necessary', 'measurement', 'marketing'];

export default function ConsentManager() {
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
      <ConsentBanner />
      <ConsentDialog />
    </ConsentManagerProvider>
  );
}
