import type { NewsArticle, NewsCategory } from '@/app/[locale]/news/types';
import { getNewsArticlePath } from '@/app/[locale]/news/lib/categories';
import { NewsCard } from './news-card';

type NewsGridProps = {
  locale: string;
  articles: NewsArticle[];
  categories: NewsCategory[];
};

export function NewsGrid({ locale, articles, categories }: NewsGridProps) {
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {articles.map((article) => {
        const firstCategory = categories.find((category) => article.categories.includes(category.id));

        return (
          <NewsCard
            key={`${article.id}-${article.slug}`}
            article={article}
            href={getNewsArticlePath(locale, article.slug)}
            categoryLabel={firstCategory?.name}
          />
        );
      })}
    </section>
  );
}
