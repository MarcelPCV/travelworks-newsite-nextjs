import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import type { ArticleTocItem } from '@/app/[locale]/news/types';
import { newsMdxComponents } from './mdx-components';

export function ArticleContent({
  content,
  toc,
}: {
  content: string;
  toc: ArticleTocItem[];
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_260px]">
      <article className="min-w-0">
        <MDXRemote
          source={content}
          components={newsMdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
            },
          }}
        />
      </article>

      {toc.length > 0 ? (
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700">On this page</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {toc.map((item) => (
                <li key={item.id} className={item.level === 3 ? 'ml-3' : ''}>
                  <a className="text-slate-600 hover:text-blue-700" href={`#${item.id}`}>
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      ) : null}
    </div>
  );
}
