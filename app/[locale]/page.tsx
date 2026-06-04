import { notFound } from 'next/navigation';
import LayoutRenderer from './[slug]/blocks/layout-renderer';
import { getCmsPageBySlug } from './cms-page';
import { getHomepageSlugCandidates } from './locale-config';
import CmsUnavailable from './components/cms-unavailable';

export default async function LocalePage({
  params,
}: {
  params: { locale: string } | Promise<{ locale: string }>;
}) {
  const { locale } = await Promise.resolve(params);
  let page = null;

  for (const slug of getHomepageSlugCandidates(locale)) {
    page = await getCmsPageBySlug(slug, locale);
    if (page) {
      break;
    }
  }

  if (!page) {
    return <CmsUnavailable />;
  }

  return (
    <main>
      <h1 className="sr-only">{page.title ?? 'Home'}</h1>
      <div className="flex w-full flex-col gap-4 py-2">
        <LayoutRenderer layout={Array.isArray(page.layout) ? page.layout : []} pageTitle={page.title} />
      </div>
    </main>
  );
}
