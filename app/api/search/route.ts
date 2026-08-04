import { NextResponse } from 'next/server';
import { searchSite } from '@/app/lib/search';

export const runtime = 'nodejs';
export const revalidate = 3600;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = (url.searchParams.get('q') ?? '').trim();
  const locale = url.searchParams.get('locale') ?? 'en';
  const rawLimit = Number(url.searchParams.get('limit') ?? '12');
  const limit = Number.isFinite(rawLimit) ? Math.max(1, Math.min(Math.floor(rawLimit), 20)) : 12;

  if (query.length < 2) {
    return NextResponse.json({
      query,
      results: [],
    });
  }

  try {
    const results = await searchSite({ query, locale, limit });
    return NextResponse.json({ query, results });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Search failed';
    console.error('[search API]', message);
    return NextResponse.json({ error: message, results: [] }, { status: 500 });
  }
}
