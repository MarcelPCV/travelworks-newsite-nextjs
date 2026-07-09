import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import type {
  BreadcrumbItem,
  ContentLocale,
  NewsArticle,
  NewsArticleFrontmatter,
  NewsCategoryId,
  PaginatedNews,
  RouteLocale,
} from '../types';
import {
  getAllNewsPathByLocale,
  getCategories,
  getNewsArticlePath,
  getNewsCategoryPath,
  getNewsListPath,
  toContentLocale,
} from './categories';

const NEWS_CONTENT_ROOT = path.join(process.cwd(), 'content', 'news');

const CATEGORY_SET = new Set(['accounting', 'agency-owner', 'it-manager', 'technology']);

function toRouteLocale(locale: string): RouteLocale {
  if (locale === 'en-ca' || locale === 'en-au' || locale === 'fr-ca') {
    return locale;
  }

  return 'en';
}

function sortArticles(articles: NewsArticle[]): NewsArticle[] {
  return [...articles].sort((a, b) => {
    if (a.featured !== b.featured) {
      return a.featured ? -1 : 1;
    }

    const aDate = new Date(a.date).getTime();
    const bDate = new Date(b.date).getTime();
    return bDate - aDate;
  });
}

function slugifyHeading(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function parseToc(markdown: string): NewsArticle['toc'] {
  const lines = markdown.split('\n');
  const toc: NewsArticle['toc'] = [];
  let insideFence = false;

  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      insideFence = !insideFence;
      continue;
    }

    if (insideFence) {
      continue;
    }

    if (line.startsWith('## ')) {
      const text = line.replace(/^##\s+/, '').trim();
      toc.push({ id: slugifyHeading(text), text, level: 2 });
      continue;
    }

    if (line.startsWith('### ')) {
      const text = line.replace(/^###\s+/, '').trim();
      toc.push({ id: slugifyHeading(text), text, level: 3 });
    }
  }

  return toc;
}

export function calculateReadingTime(content: string): number {
  const words = content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 220));
}

function sanitizeCategories(raw: string[]): NewsCategoryId[] {
  return raw
    .map((item) => item.trim().toLowerCase())
    .filter((item): item is NewsCategoryId => CATEGORY_SET.has(item));
}

function toArticle(
  frontmatter: NewsArticleFrontmatter,
  content: string,
  locale: ContentLocale,
): NewsArticle {
  const readingTimeMinutes = calculateReadingTime(content);

  return {
    id: frontmatter.id,
    locale,
    title: frontmatter.title,
    description: frontmatter.description,
    excerpt: frontmatter.excerpt,
    slug: frontmatter.slug,
    date: frontmatter.date,
    updated: frontmatter.updated,
    author: frontmatter.author,
    categories: sanitizeCategories(frontmatter.category),
    featured: Boolean(frontmatter.featured),
    coverImage: frontmatter.coverImage,
    thumbnail: frontmatter.thumbnail,
    seo: {
      title: frontmatter.seo?.title || frontmatter.title,
      description: frontmatter.seo?.description || frontmatter.description,
      keywords: frontmatter.seo?.keywords || [],
    },
    content,
    readingTimeMinutes,
    toc: parseToc(content),
  };
}

async function readMarkdownFiles(directory: string): Promise<string[]> {
  try {
    const entries = await fs.readdir(directory, { withFileTypes: true });

    return entries
      .filter((entry) => entry.isFile() && /\.(md|mdx)$/i.test(entry.name))
      .map((entry) => path.join(directory, entry.name));
  } catch {
    return [];
  }
}

async function loadArticlesForContentLocale(contentLocale: ContentLocale): Promise<NewsArticle[]> {
  const localeDirectory =
    contentLocale === 'en-us' ? NEWS_CONTENT_ROOT : path.join(NEWS_CONTENT_ROOT, contentLocale);

  const files = await readMarkdownFiles(localeDirectory);
  const articlePromises = files.map(async (filePath) => {
    const rawFile = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(rawFile);
    const frontmatter = data as NewsArticleFrontmatter;

    if (!frontmatter.id || !frontmatter.slug || !frontmatter.title) {
      return null;
    }

    return toArticle(frontmatter, content, contentLocale);
  });

  const articles = (await Promise.all(articlePromises)).filter(
    (article): article is NewsArticle => Boolean(article),
  );

  return sortArticles(articles);
}

export async function getAllArticles(locale: string): Promise<NewsArticle[]> {
  const contentLocale = toContentLocale(locale);
  const routeLocale = toRouteLocale(locale);

  const localeArticles = await loadArticlesForContentLocale(contentLocale);

  if (contentLocale === 'en-us') {
    return localeArticles;
  }

  const defaultArticles = await loadArticlesForContentLocale('en-us');
  const localeById = new Map(localeArticles.map((article) => [article.id, article]));

  for (const fallbackArticle of defaultArticles) {
    if (!localeById.has(fallbackArticle.id)) {
      localeById.set(fallbackArticle.id, {
        ...fallbackArticle,
        slug: fallbackArticle.slug,
      });
    }
  }

  const mergedArticles = Array.from(localeById.values());
  const sorted = sortArticles(mergedArticles);

  return sorted.map((article) => ({
    ...article,
    locale: toContentLocale(routeLocale),
  }));
}

export async function getArticle(slug: string, locale: string): Promise<NewsArticle | null> {
  const articles = await getAllArticles(locale);
  return articles.find((article) => article.slug === slug) ?? null;
}

export async function getArticlesByCategory(
  categoryId: NewsCategoryId,
  locale: string,
): Promise<NewsArticle[]> {
  const articles = await getAllArticles(locale);
  return articles.filter((article) => article.categories.includes(categoryId));
}

export async function getRelatedArticles(
  currentArticle: NewsArticle,
  locale: string,
  limit = 3,
): Promise<NewsArticle[]> {
  const articles = await getAllArticles(locale);

  const scored = articles
    .filter((article) => article.id !== currentArticle.id)
    .map((article) => {
      const overlap = article.categories.filter((category) =>
        currentArticle.categories.includes(category),
      ).length;

      return {
        article,
        overlap,
      };
    })
    .filter((item) => item.overlap > 0)
    .sort((a, b) => {
      if (a.overlap !== b.overlap) {
        return b.overlap - a.overlap;
      }

      return new Date(b.article.date).getTime() - new Date(a.article.date).getTime();
    });

  return scored.slice(0, limit).map((item) => item.article);
}

export function paginateArticles(
  articles: NewsArticle[],
  page: number,
  pageSize = 6,
): PaginatedNews {
  const totalItems = articles.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;

  return {
    items: articles.slice(start, end),
    page: currentPage,
    pageSize,
    totalItems,
    totalPages,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
}

export function generateBreadcrumbs(params: {
  locale: string;
  categoryId?: NewsCategoryId;
  articleTitle?: string;
}): BreadcrumbItem[] {
  const { locale, categoryId, articleTitle } = params;

  const crumbs: BreadcrumbItem[] = [{ label: 'News', href: getNewsListPath(locale) }];

  if (categoryId) {
    const category = getCategories(locale).find((item) => item.id === categoryId);
    if (category) {
      crumbs.push({
        label: category.name,
        href: getNewsCategoryPath(locale, categoryId),
      });
    }
  }

  if (articleTitle) {
    crumbs.push({
      label: articleTitle,
      href: '#',
    });
  }

  return crumbs;
}

export function getRouteLocales(): RouteLocale[] {
  return ['en', 'en-ca', 'en-au', 'fr-ca'];
}

export async function getArticleAlternates(articleId: string): Promise<Record<RouteLocale, string>> {
  const alternates: Record<RouteLocale, string> = {
    en: getNewsListPath('en'),
    'en-ca': getNewsListPath('en-ca'),
    'en-au': getNewsListPath('en-au'),
    'fr-ca': getNewsListPath('fr-ca'),
  };

  const locales = getRouteLocales();

  await Promise.all(
    locales.map(async (locale) => {
      const articles = await getAllArticles(locale);
      const article = articles.find((item) => item.id === articleId);
      if (article) {
        alternates[locale] = getNewsArticlePath(locale, article.slug);
      }
    }),
  );

  return alternates;
}

export async function getCategoryAlternates(
  categoryId: NewsCategoryId,
): Promise<Record<RouteLocale, string>> {
  return {
    en: getNewsCategoryPath('en', categoryId),
    'en-ca': getNewsCategoryPath('en-ca', categoryId),
    'en-au': getNewsCategoryPath('en-au', categoryId),
    'fr-ca': getNewsCategoryPath('fr-ca', categoryId),
  };
}

export function getListAlternates(): Record<RouteLocale, string> {
  return getAllNewsPathByLocale();
}
