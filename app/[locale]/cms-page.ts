import { headers } from 'next/headers';
import type { CmsPage } from './[slug]/blocks/types';
import { isRecord } from './[slug]/blocks/types';

type PagesResponse = {
  docs?: CmsPage[];
};

const routeLocaleToApiLocale: Record<string, string> = {
  en: 'en-US',
  'en-ca': 'en-US',
  'fr-ca': 'fr-CA',
  'en-au': 'en-AU',
};

function toApiLocale(routeLocale: string): string {
  return routeLocaleToApiLocale[routeLocale] ?? 'en-US';
}

async function getBaseUrl() {
  const h = await headers();
  const proto = h.get('x-forwarded-proto') ?? 'http';
  const host = h.get('x-forwarded-host') ?? h.get('host') ?? 'localhost:3000';
  return `${proto}://${host}`;
}

export async function getCmsPageBySlug(slug: string, locale: string): Promise<CmsPage | null> {
  const query = new URLSearchParams({
    locale: toApiLocale(locale),
    depth: '2',
    draft: 'false',
    trash: 'false',
  });

  const baseUrl = await getBaseUrl();
  const response = await fetch(`${baseUrl}/api/pages/slug/${encodeURIComponent(slug)}?${query.toString()}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }

    throw new Error(`Failed to load page for slug: ${slug}`);
  }

  const data = (await response.json()) as PagesResponse;
  if (!Array.isArray(data.docs) || data.docs.length === 0) {
    return null;
  }

  const page = data.docs[0];
  if (!isRecord(page)) {
    return null;
  }

  return page;
}