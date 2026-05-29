import { NextRequest, NextResponse } from 'next/server';

// Replacement for the deprecated `middleware.ts` convention.
// Keep behavior identical to the previous middleware implementation.

const DEFAULT_ROUTE_LOCALE = 'en';

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
    return NextResponse.redirect(url);
  }

  // Serve the default locale from root while keeping the visible URL clean.
  if (pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = `/${DEFAULT_ROUTE_LOCALE}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
