import { NextRequest, NextResponse } from 'next/server';
import {
  aboutUsSegmentByRouteLocale,
  aboutUsSlugs,
  demoByRouteLocale,
  newsCategorySegmentByRouteLocale,
  newsCategorySlugs,
  newsSegmentByRouteLocale,
  trainingSegmentByRouteLocale,
  trainingSlugs,
  travelAgencySoftwareSegmentByRouteLocale,
  travelAgencySoftwareSlugs,
} from '@/app/[locale]/locale-config';

const DEFAULT_ROUTE_LOCALE = 'en';
const SUPPORTED_ROUTE_LOCALES = ['en', 'en-ca', 'fr-ca', 'en-au'] as const;

function getFirstSegment(pathname: string) {
  return pathname.split('/')[1] ?? '';
}

function getCanonicalSlug(
  slugsByCanonical: Record<string, Record<string, string>>,
  routeLocale: string,
  localizedSlug: string,
): string {
  for (const [canonical, byLocale] of Object.entries(slugsByCanonical)) {
    if (byLocale[routeLocale] === localizedSlug) {
      return canonical;
    }
  }

  return localizedSlug;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Keep static assets and framework routes untouched.
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || /\.[^/]+$/.test(pathname)) {
    return NextResponse.next();
  }

  // Redirect explicit default locale URLs to clean, unprefixed URLs.
  if (pathname === `/${DEFAULT_ROUTE_LOCALE}` || pathname.startsWith(`/${DEFAULT_ROUTE_LOCALE}/`)) {
    const url = request.nextUrl.clone();
    const nextPath = pathname.slice(DEFAULT_ROUTE_LOCALE.length + 1) || '/';
    url.pathname = nextPath;
    return NextResponse.redirect(url, 308);
  }

  // Rewrite unprefixed paths to the default locale while keeping clean URLs.
  // Examples: / -> /en, /features -> /en/features
  const firstSegment = getFirstSegment(pathname);
  const isLocalePrefixed = SUPPORTED_ROUTE_LOCALES.includes(
    firstSegment as (typeof SUPPORTED_ROUTE_LOCALES)[number],
  );

  if (!isLocalePrefixed) {
    const url = request.nextUrl.clone();
    url.pathname = `/${DEFAULT_ROUTE_LOCALE}${pathname === '/' ? '' : pathname}`;
    return NextResponse.rewrite(url);
  }

  // Rewrite localized locale-prefixed routes to canonical file-system routes.
  const routeLocale = firstSegment;
  const pathSegments = pathname.split('/').filter(Boolean);
  const routeSegments = pathSegments.slice(1);

  if (routeSegments.length > 0) {
    let rewritten = false;

    if (routeSegments[0] === aboutUsSegmentByRouteLocale[routeLocale]) {
      routeSegments[0] = 'about-us';
      rewritten = true;

      if (routeSegments.length > 1) {
        routeSegments[1] = getCanonicalSlug(aboutUsSlugs, routeLocale, routeSegments[1]);
      }
    }

    if (routeSegments[0] === travelAgencySoftwareSegmentByRouteLocale[routeLocale]) {
      routeSegments[0] = 'travel-agency-software';
      rewritten = true;

      if (routeSegments.length > 1) {
        routeSegments[1] = getCanonicalSlug(
          travelAgencySoftwareSlugs,
          routeLocale,
          routeSegments[1],
        );
      }
    }

    if (routeSegments[0] === trainingSegmentByRouteLocale[routeLocale]) {
      routeSegments[0] = 'training';
      rewritten = true;

      if (routeSegments.length > 1) {
        routeSegments[1] = getCanonicalSlug(trainingSlugs, routeLocale, routeSegments[1]);
      }
    }

    if (routeSegments[0] === demoByRouteLocale[routeLocale]) {
      routeSegments[0] = 'ask-for-a-demo';
      rewritten = true;
    }

    if (routeSegments[0] === newsSegmentByRouteLocale[routeLocale]) {
      routeSegments[0] = 'news';
      rewritten = true;

      if (
        routeSegments.length > 1 &&
        routeSegments[1] === newsCategorySegmentByRouteLocale[routeLocale]
      ) {
        routeSegments[1] = 'category';

        if (routeSegments.length > 2) {
          routeSegments[2] = getCanonicalSlug(newsCategorySlugs, routeLocale, routeSegments[2]);
        }
      }
    }

    if (rewritten) {
      const rewrittenPath = `/${routeLocale}/${routeSegments.join('/')}`;
      if (rewrittenPath !== pathname) {
        const url = request.nextUrl.clone();
        url.pathname = rewrittenPath;
        return NextResponse.rewrite(url);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
