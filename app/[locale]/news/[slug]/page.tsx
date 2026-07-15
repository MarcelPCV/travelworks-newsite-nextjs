import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ArticleContent } from '@/app/[locale]/components/news/article-content';
import { ArticleFooter } from '@/app/[locale]/components/news/article-footer';
import { ArticleHeader } from '@/app/[locale]/components/news/article-header';
import { Breadcrumb } from '@/app/[locale]/components/news/breadcrumb';
import { CategorySidebar } from '@/app/[locale]/components/news/category-sidebar';
import { RelatedArticles } from '@/app/[locale]/components/news/related-articles';
import {
  generateBreadcrumbs,
  getAllArticles,
  getArticle,
  getArticleAlternates,
  getRelatedArticles,
  getRouteLocales,
} from '@/app/[locale]/news/lib/news';
import {
  getCategories,
  getNewsArticlePath,
  getNewsListPath,
} from '@/app/[locale]/news/lib/categories';
import { buildNewsArticleSchema, generateNewsMetadata } from '@/app/[locale]/news/lib/seo';

export async function generateStaticParams() {
  const routeLocales = getRouteLocales();
  const params: Array<{ locale: string; slug: string }> = [];

  for (const locale of routeLocales) {
    const articles = await getAllArticles(locale);
    for (const article of articles) {
      params.push({ locale, slug: article.slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await getArticle(slug, locale);

  if (!article) {
    return {};
  }

  return generateNewsMetadata({
    locale,
    title: article.seo.title,
    description: article.seo.description,
    alternates: await getArticleAlternates(article.id),
    keywords: article.seo.keywords,
    image: article.coverImage,
  });
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const article = await getArticle(slug, locale);

  if (!article) {
    notFound();
  }

  const categories = getCategories(locale);
  const categoryNames = categories
    .filter((category) => article.categories.includes(category.id))
    .map((category) => category.name);

  const recentArticles = (await getAllArticles(locale))
    .filter((entry) => entry.id !== article.id)
    .slice(0, 5);

  const relatedArticles = await getRelatedArticles(article, locale, 3);
  const breadcrumbItems = generateBreadcrumbs({
    locale,
    categoryId: article.categories[0],
    articleTitle: article.title,
  });

  const articlePath = getNewsArticlePath(locale, article.slug);
  const schema = buildNewsArticleSchema({
    article,
    locale,
    alternates: await getArticleAlternates(article.id),
  });

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 md:px-8">
      <Breadcrumb items={breadcrumbItems} homeHref={locale === 'en' ? '/' : `/${locale}`} />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <ArticleHeader article={article} categoryNames={categoryNames} />
          <section className="mt-8">
            <ArticleContent content={article.content} toc={article.toc} />
          </section>
          <ArticleFooter
            newsPath={getNewsListPath(locale)}
            articlePath={articlePath}
            articleTitle={article.title}
          />
        </div>

        <CategorySidebar
          locale={locale}
          categories={categories}
          recentArticles={recentArticles}
          relatedArticles={relatedArticles}
          activeCategoryId={article.categories[0]}
        />
      </div>

      <RelatedArticles locale={locale} articles={relatedArticles} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </main>
  );
}
