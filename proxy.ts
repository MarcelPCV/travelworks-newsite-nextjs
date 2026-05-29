import { NextRequest, NextResponse } from 'next/server';

const DEFAULT_ROUTE_LOCALE = 'en';
const SUPPORTED_ROUTE_LOCALES = ['en', 'en-ca', 'fr-ca', 'en-au'] as const;

function getFirstSegment(pathname: string) {
  return pathname.split('/')[1] ?? '';
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

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
