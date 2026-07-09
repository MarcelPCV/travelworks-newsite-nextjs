import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { buildCollectionPageSchema, generateNewsMetadata } from '@/app/[locale]/news/lib/seo';
import {
  getCategories,
  getCategoryIdFromSlug,
  getNewsCategoryPath,
  getNewsListPath,
} from '@/app/[locale]/news/lib/categories';
import { getCategoryAlternates, getRouteLocales, getArticlesByCategory } from '@/app/[locale]/news/lib/news';
import { getNewsLabels } from '@/app/[locale]/news/lib/labels';
import { CategoryBadge } from '@/app/[locale]/components/news/category-badge';
import { NewsGrid } from '@/app/[locale]/components/news/news-grid';
import { NewsHero } from '@/app/[locale]/components/news/news-hero';
import { NewsletterSection } from '@/app/[locale]/components/news/newsletter-section';

export async function generateStaticParams() {
  const routeLocales = getRouteLocales();

  return routeLocales.flatMap((locale) =>
    getCategories(locale).map((category) => ({
      locale,
      category: category.id,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale, category } = await params;
  const categoryId = getCategoryIdFromSlug(locale, category);

  if (!categoryId) {
    return {};
  }

  const currentCategory = getCategories(locale).find((item) => item.id === categoryId);

  if (!currentCategory) {
    return {};
  }

  return generateNewsMetadata({
    locale,
    title: currentCategory.seo.title,
    description: currentCategory.seo.description,
    alternates: await getCategoryAlternates(categoryId),
    keywords: currentCategory.seo.keywords,
  });
}

export default async function NewsCategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;
  setRequestLocale(locale);

  const labels = getNewsLabels(locale);
  const categoryId = getCategoryIdFromSlug(locale, category);

  if (!categoryId) {
    notFound();
  }

  const categories = getCategories(locale);
  const currentCategory = categories.find((item) => item.id === categoryId);

  if (!currentCategory) {
    notFound();
  }

  const articles = await getArticlesByCategory(categoryId, locale);
  const schema = buildCollectionPageSchema({
    locale,
    title: currentCategory.seo.title,
    description: currentCategory.seo.description,
    path: getNewsCategoryPath(locale, categoryId),
    category: currentCategory,
  });

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 md:px-8">
      <NewsHero title={currentCategory.name} description={currentCategory.seo.description} />

      <section className="mt-8 flex flex-wrap items-center gap-2" aria-label="News categories">
        <CategoryBadge label={labels.allNews} href={getNewsListPath(locale)} isActive={false} />
        {categories.map((entry) => (
          <CategoryBadge
            key={entry.id}
            label={entry.name}
            href={getNewsCategoryPath(locale, entry.id)}
            isActive={entry.id === categoryId}
          />
        ))}
      </section>

      <section className="mt-8">
        <NewsGrid locale={locale} articles={articles} categories={categories} />
      </section>

      <NewsletterSection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </main>
  );
}
