import { notFound } from 'next/navigation';
import LayoutRenderer from './blocks/layout-renderer';
import { getCmsPageBySlug } from '../cms-page';

export default async function Page({
	params,
}: {
	params: { locale: string; slug: string } | Promise<{ locale: string; slug: string }>;
}) {
	const { locale, slug } = await Promise.resolve(params);
	const page = await getCmsPageBySlug(slug, locale);

	if (!page) {
		notFound();
	}

	return (
		<main>
			<h1 className="text-zinc-900">{page.title ?? 'Untitled page'}</h1>
			<div className="flex w-full flex-col gap-4 py-2">
				<LayoutRenderer layout={Array.isArray(page.layout) ? page.layout : []} pageTitle={page.title} />
			</div>
		</main>
	);
}
