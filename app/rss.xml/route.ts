import { NextResponse } from 'next/server';
import { getAllArticles, getRouteLocales } from '@/app/[locale]/(pages)/news/lib/news';
import { getNewsArticlePath } from '@/app/[locale]/(pages)/news/lib/categories';
import { getSiteAbsoluteUrl } from '@/app/[locale]/(pages)/news/lib/seo';

export const revalidate = 3600;

export async function GET() {
  const locales = getRouteLocales();
  const items: Array<{
    title: string;
    description: string;
    link: string;
    pubDate: string;
    guid: string;
  }> = [];

  for (const locale of locales) {
    const articles = await getAllArticles(locale);

    for (const article of articles) {
      const path = getNewsArticlePath(locale, article.slug);
      const url = getSiteAbsoluteUrl(path);
      items.push({
        title: article.title,
        description: article.excerpt,
        link: url,
        pubDate: new Date(article.updated || article.date).toUTCString(),
        guid: `${article.id}-${locale}`,
      });
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>TravelWorks News</title>
    <link>${getSiteAbsoluteUrl('/news')}</link>
    <description>Latest TravelWorks news across locales.</description>
    ${items
      .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
      .map(
        (item) => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <description><![CDATA[${item.description}]]></description>
      <link>${item.link}</link>
      <guid>${item.guid}</guid>
      <pubDate>${item.pubDate}</pubDate>
    </item>`,
      )
      .join('')}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
