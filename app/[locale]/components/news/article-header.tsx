import Image from 'next/image';
import { getBlurDataURL } from '@/app/[locale]/(pages)/news/lib/image';
import type { NewsArticle } from '@/app/[locale]/(pages)/news/types';
import { ReadingTime } from './reading-time';

export function ArticleHeader({
  article,
  categoryNames,
}: {
  article: NewsArticle;
  categoryNames: string[];
}) {
  return (
    <header>
      <div className="mb-4 flex flex-wrap gap-2">
        {categoryNames.map((categoryName) => (
          <span
            key={categoryName}
            className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700"
          >
            {categoryName}
          </span>
        ))}
      </div>
      <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">{article.title}</h1>
      <p className="mt-3 text-lg text-slate-600">{article.description}</p>
      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
        <span>{article.author}</span>
        <span aria-hidden="true">•</span>
        <time dateTime={article.date}>{new Date(article.date).toLocaleDateString('en-CA')}</time>
        <span aria-hidden="true">•</span>
        <ReadingTime minutes={article.readingTimeMinutes} />
      </div>
      <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl border border-slate-200">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          className="object-cover"
          placeholder="blur"
          blurDataURL={getBlurDataURL()}
          sizes="(max-width: 1024px) 100vw, 1000px"
        />
      </div>
    </header>
  );
}
