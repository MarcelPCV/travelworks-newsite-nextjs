import type { NewsArticle } from '@/app/[locale]/news/types';
import { getNewsArticlePath } from '@/app/[locale]/news/lib/categories';
import { NewsCard } from './news-card';

export function RelatedArticles({
  locale,
  articles,
}: {
  locale: string;
  articles: NewsArticle[];
}) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold text-slate-900">Related articles</h2>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        {articles.map((article) => (
          <NewsCard
            key={`${article.id}-${article.slug}`}
            article={article}
            href={getNewsArticlePath(locale, article.slug)}
          />
        ))}
      </div>
    </section>
  );
}
