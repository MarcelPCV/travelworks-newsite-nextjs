type TrackingConsent = {
  measurement: boolean;
  marketing: boolean;
};

type Clarity = {
  (...args: unknown[]): void;
  q?: IArguments[];
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    clarity?: Clarity;
  }
}

const gtmId = 'GTM-WPWFTW8H';
const gaId = 'G-R82T2VWRR5';
let initialized = false;

const gtag: (...args: unknown[]) => void = function () {
  // Google and GTM process gtag commands as arguments objects.
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer?.push(arguments);
};

function googleConsent({ measurement, marketing }: TrackingConsent) {
  return {
    analytics_storage: measurement ? 'granted' : 'denied',
    ad_storage: marketing ? 'granted' : 'denied',
    ad_user_data: marketing ? 'granted' : 'denied',
    ad_personalization: marketing ? 'granted' : 'denied',
  };
}

export function updateAnalyticsConsent(consent: TrackingConsent) {
  if (!initialized) return;

  gtag('consent', 'update', googleConsent(consent));
  window.clarity?.('consentv2', {
    analytics_Storage: consent.measurement ? 'granted' : 'denied',
    ad_Storage: consent.marketing ? 'granted' : 'denied',
  });
}

function loadScript(src: string) {
  const script = document.createElement('script');
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

export function startAnalytics(consent: TrackingConsent) {
  if (initialized) {
    updateAnalyticsConsent(consent);
    return;
  }

  initialized = true;
  window.dataLayer = window.dataLayer || [];
  gtag('consent', 'default', googleConsent({ measurement: false, marketing: false }));
  window.clarity = window.clarity || function () {
    // eslint-disable-next-line prefer-rest-params
    window.clarity?.q?.push(arguments);
  };
  window.clarity.q = window.clarity.q || [];
  updateAnalyticsConsent(consent);

  gtag('js', new Date());
  gtag('config', gaId);
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  loadScript(`https://www.googletagmanager.com/gtag/js?id=${gaId}`);
  loadScript(`https://www.googletagmanager.com/gtm.js?id=${gtmId}`);
}
