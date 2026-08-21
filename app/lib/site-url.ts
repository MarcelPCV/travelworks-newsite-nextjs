const DEFAULT_PRODUCTION_SITE_URL = 'https://www.travelworkssolution.com/';
const DEFAULT_DEVELOPMENT_SITE_URL = 'http://localhost:3000';

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, '');
}

export function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (configuredUrl) {
    return trimTrailingSlash(configuredUrl);
  }

  return process.env.NODE_ENV === 'production'
    ? DEFAULT_PRODUCTION_SITE_URL
    : DEFAULT_DEVELOPMENT_SITE_URL;
}

export function getSiteUrlObject() {
  return new URL(getSiteUrl());
}
