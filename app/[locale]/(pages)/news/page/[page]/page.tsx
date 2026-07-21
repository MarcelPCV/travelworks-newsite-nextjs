import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { NewsListPage } from '@/app/[locale]/(pages)/news/news-list-page';
import { getAllArticles, getListAlternates, getRouteLocales } from '@/app/[locale]/(pages)/news/lib/news';
import { getNewsLabels } from '@/app/[locale]/(pages)/news/lib/labels';
import { generateNewsMetadata } from '@/app/[locale]/(pages)/news/lib/seo';
import { getNewsPagePath } from '@/app/[locale]/(pages)/news/lib/categories';

const PAGE_SIZE = 6;

export async function generateStaticParams() {
  const routeLocales = getRouteLocales();
  const params: Array<{ locale: string; page: string }> = [];

  for (const locale of routeLocales) {
    const articles = await getAllArticles(locale);
    const totalPages = Math.max(1, Math.ceil(articles.length / PAGE_SIZE));

    for (let page = 2; page <= totalPages; page += 1) {
      params.push({ locale, page: String(page) });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; page: string }>;
}): Promise<Metadata> {
  const { locale, page } = await params;
  const labels = getNewsLabels(locale);
  const pageNumber = Number(page);

  if (Number.isNaN(pageNumber) || pageNumber < 2) {
    return generateNewsMetadata({
      locale,
      title: labels.pageTitle,
      description: labels.pageDescription,
      alternates: getListAlternates(),
      noIndex: true,
    });
  }

  const alternates = getListAlternates();
  alternates.en = getNewsPagePath('en', pageNumber);
  alternates['en-ca'] = getNewsPagePath('en-ca', pageNumber);
  alternates['en-au'] = getNewsPagePath('en-au', pageNumber);
  alternates['fr-ca'] = getNewsPagePath('fr-ca', pageNumber);

  return generateNewsMetadata({
    locale,
    title: `${labels.pageTitle} | Page ${pageNumber}`,
    description: labels.pageDescription,
    alternates,
    noIndex: pageNumber > 1,
  });
}

export default async function NewsPaginationPage({
  params,
}: {
  params: Promise<{ locale: string; page: string }>;
}) {
  const { locale, page } = await params;
  const pageNumber = Number(page);

  if (Number.isNaN(pageNumber) || pageNumber <= 0) {
    notFound();
  }

  if (pageNumber === 1) {
    redirect(getNewsPagePath(locale, 1));
  }

  return <NewsListPage locale={locale} page={pageNumber} />;
}
