import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import type { NewsCategoryId } from './types';
import {
  getCategories,
  getNewsArticlePath,
  getNewsCategoryPath,
  getNewsListPath,
} from './lib/categories';
import { getNewsLabels } from './lib/labels';
import { getAllArticles, paginateArticles } from './lib/news';
import { CategoryBadge } from '@/app/[locale]/(pages)/news/components/category-badge';
import { FeaturedNewsCard } from '@/app/[locale]/(pages)/news/components/featured-news-card';
import { NewsGrid } from '@/app/[locale]/(pages)/news/components/news-grid';
import { NewsHero } from '@/app/[locale]/(pages)/news/components/news-hero';
import { NewsletterSection } from '@/app/[locale]/(pages)/news/components/newsletter-section';
import { Pagination } from '@/app/[locale]/(pages)/news/components/pagination';
import TitleHero from '../../components/shared/title-hero/title-hero';
import { useLocale } from 'next-intl';

const PAGE_SIZE = 6;

export async function NewsListPage({
  locale,
  page,
  activeCategory,
}: {
  locale: string;
  page: number;
  activeCategory?: NewsCategoryId;
}) {
  setRequestLocale(locale);

  const categories = getCategories(locale);
  const labels = getNewsLabels(locale);

  const allArticles = activeCategory
    ? (await getAllArticles(locale)).filter((article) =>
        article.categories.includes(activeCategory),
      )
    : await getAllArticles(locale);

  const paginated = paginateArticles(allArticles, page, PAGE_SIZE);

  if (page > paginated.totalPages && paginated.totalPages > 0) {
    notFound();
  }

  const featuredArticle = page === 1 ? paginated.items.find((article) => article.featured) : null;

  const gridArticles = featuredArticle
    ? paginated.items.filter((article) => article.id !== featuredArticle.id)
    : paginated.items;

  return (
    <main className=''>
      <TitleHero 
        title={locale === 'fr-ca' ? 'Actualités' : 'News'}
        imageSrc="/images/pages/privacy-policy/privacy-policy.png"
      />

      <div className="mx-auto w-full max-w-[1600px] px-4 pb-16 md:px-8">
        <section className="mt-8 flex flex-wrap items-center gap-2" aria-label="News categories">
          <CategoryBadge
            label={labels.allNews}
            href={getNewsListPath(locale)}
            isActive={!activeCategory}
          />
          {categories.map((category) => (
            <CategoryBadge
              key={category.id}
              label={category.name}
              href={getNewsCategoryPath(locale, category.id)}
              isActive={activeCategory === category.id}
            />
          ))}
        </section>

        {featuredArticle ? (
          <section className="mt-8">
            <FeaturedNewsCard
              article={featuredArticle}
              href={getNewsArticlePath(locale, featuredArticle.slug)}
            />
          </section>
        ) : null}

        <section className="mt-8">
          <NewsGrid locale={locale} articles={gridArticles} categories={categories} />
        </section>

        <Pagination locale={locale} currentPage={paginated.page} totalPages={paginated.totalPages} />

      </div>
    </main>
  );
}
