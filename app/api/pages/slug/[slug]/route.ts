import { NextRequest, NextResponse } from 'next/server';

const UPSTREAM_BASE_URL = process.env.UPSTREAM_BASE_URL ?? process.env.PAYLOAD_URL ?? 'http://localhost:3001';

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  const { slug } = await Promise.resolve(context.params);

  const upstreamUrl = new URL('/api/pages', UPSTREAM_BASE_URL);
  const search = new URLSearchParams(request.nextUrl.searchParams);
  // Ensure we filter by slug and request nested content (depth) plus common flags
  search.set('where[slug][equals]', slug);
  // Default query params to include nested layout and published content
  if (!search.has('depth')) search.set('depth', '2');
  if (!search.has('draft')) search.set('draft', 'false');
  if (!search.has('trash')) search.set('trash', 'false');
  upstreamUrl.search = search.toString();

  try {
    const upstreamResponse = await fetch(upstreamUrl, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
      },
    });

    const contentType = upstreamResponse.headers.get('content-type') ?? '';
    const isJson = contentType.includes('application/json');

    if (!upstreamResponse.ok) {
      const errorBody = isJson
        ? await upstreamResponse.json().catch(() => null)
        : await upstreamResponse.text().catch(() => '');

      return NextResponse.json(
        {
          error: 'Upstream request failed',
          status: upstreamResponse.status,
          details: errorBody,
        },
        { status: upstreamResponse.status }
      );
    }

    const payload = isJson ? await upstreamResponse.json() : { raw: await upstreamResponse.text() };

    return NextResponse.json(payload, {
      status: upstreamResponse.status,
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch {
    return NextResponse.json(
      {
        error: 'Could not reach upstream API',
        upstream: `${UPSTREAM_BASE_URL}/api/pages`,
      },
      { status: 502 }
    );
  }
}