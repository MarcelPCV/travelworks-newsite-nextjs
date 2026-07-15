import Link from 'next/link';
import type { NewsArticle, NewsCategory, NewsCategoryId } from '@/app/[locale]/news/types';
import { getNewsArticlePath, getNewsCategoryPath } from '@/app/[locale]/news/lib/categories';

type CategorySidebarProps = {
  locale: string;
  categories: NewsCategory[];
  recentArticles: NewsArticle[];
  relatedArticles: NewsArticle[];
  activeCategoryId?: NewsCategoryId;
};

export function CategorySidebar({
  locale,
  categories,
  recentArticles,
  relatedArticles,
  activeCategoryId,
}: CategorySidebarProps) {
  return (
    <aside className="space-y-6 lg:sticky lg:top-24" aria-label="News sidebar">
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">Categories</h2>
        <ul className="mt-3 space-y-2">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={getNewsCategoryPath(locale, category.id)}
                className={`text-sm transition hover:text-blue-700 ${
                  activeCategoryId === category.id
                    ? 'font-semibold text-blue-700'
                    : 'text-slate-600'
                }`}
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">Recent news</h2>
        <ul className="mt-3 space-y-3">
          {recentArticles.map((article) => (
            <li key={`${article.id}-${article.slug}`}>
              <Link
                href={getNewsArticlePath(locale, article.slug)}
                className="text-sm text-slate-600 hover:text-blue-700"
              >
                {article.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">Related news</h2>
        <ul className="mt-3 space-y-3">
          {relatedArticles.map((article) => (
            <li key={`${article.id}-${article.slug}`}>
              <Link
                href={getNewsArticlePath(locale, article.slug)}
                className="text-sm text-slate-600 hover:text-blue-700"
              >
                {article.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
