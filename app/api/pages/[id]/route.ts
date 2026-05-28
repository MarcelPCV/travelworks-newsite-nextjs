import { NextRequest, NextResponse } from 'next/server';

const UPSTREAM_BASE_URL = process.env.UPSTREAM_BASE_URL ?? 'http://localhost:3001';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  const { id } = await Promise.resolve(context.params);

  const upstreamUrl = new URL(`/api/pages/${encodeURIComponent(id)}`, UPSTREAM_BASE_URL);
  upstreamUrl.search = request.nextUrl.searchParams.toString();

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
        upstream: `${UPSTREAM_BASE_URL}/api/pages/${id}`,
      },
      { status: 502 }
    );
  }
}