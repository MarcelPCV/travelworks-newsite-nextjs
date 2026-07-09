import type { Metadata } from 'next';
import { NewsListPage } from './news-list-page';
import { getNewsLabels } from './lib/labels';
import { generateNewsMetadata } from './lib/seo';
import { getListAlternates } from './lib/news';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const labels = getNewsLabels(locale);

  return generateNewsMetadata({
    locale,
    title: labels.pageTitle,
    description: labels.pageDescription,
    alternates: getListAlternates(),
    keywords: ['travelworks', 'travel agency software', 'news', 'updates'],
  });
}

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <NewsListPage locale={locale} page={1} />;
}
