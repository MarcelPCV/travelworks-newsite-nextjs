import type { MetadataRoute } from 'next';
import { getCategories, getNewsCategoryPath, getNewsListPath, getNewsPagePath, getNewsArticlePath } from '@/app/[locale]/news/lib/categories';
import { getAllArticles, getRouteLocales } from '@/app/[locale]/news/lib/news';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://travelworks.com';
const PAGE_SIZE = 6;

function toAbsolute(pathname: string): string {
  return new URL(pathname, SITE_URL).toString();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [];
  const locales = getRouteLocales();

  routes.push({
    url: toAbsolute('/'),
    priority: 1,
    changeFrequency: 'weekly',
  });

  for (const locale of locales) {
    const articles = await getAllArticles(locale);
    const categories = getCategories(locale);

    routes.push({
      url: toAbsolute(getNewsListPath(locale)),
      priority: 0.9,
      changeFrequency: 'daily',
    });

    const totalPages = Math.max(1, Math.ceil(articles.length / PAGE_SIZE));
    for (let page = 2; page <= totalPages; page += 1) {
      routes.push({
        url: toAbsolute(getNewsPagePath(locale, page)),
        priority: 0.75,
        changeFrequency: 'daily',
      });
    }

    for (const category of categories) {
      routes.push({
        url: toAbsolute(getNewsCategoryPath(locale, category.id)),
        priority: 0.8,
        changeFrequency: 'daily',
      });
    }

    for (const article of articles) {
      routes.push({
        url: toAbsolute(getNewsArticlePath(locale, article.slug)),
        priority: 0.7,
        changeFrequency: 'monthly',
        lastModified: new Date(article.updated || article.date),
      });
    }
  }

  return routes;
}
