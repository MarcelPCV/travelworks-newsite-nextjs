import Image from 'next/image';
import Link from 'next/link';
import type { NewsArticle } from '@/app/[locale]/(pages)/news/types';
import { getBlurDataURL } from '@/app/[locale]/(pages)/news/lib/image';
import { ReadingTime } from './reading-time';

export function FeaturedNewsCard({ article, href }: { article: NewsArticle; href: string }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="grid gap-0 md:grid-cols-2">
        <Link href={href} className="relative block min-h-[260px]">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover"
            placeholder="blur"
            blurDataURL={getBlurDataURL()}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </Link>
        <div className="px-6 py-6 md:px-8 md:py-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">Featured</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900">
            <Link href={href} className="hover:text-blue-700">
              {article.title}
            </Link>
          </h2>
          <p className="mt-3 text-sm text-slate-600">{article.excerpt}</p>
          <div className="mt-5 flex items-center gap-4 text-xs text-slate-500">
            <time dateTime={article.date}>
              {new Date(article.date).toLocaleDateString('en-CA')}
            </time>
            <ReadingTime minutes={article.readingTimeMinutes} />
          </div>
          <Link
            href={href}
            className="mt-6 inline-block text-sm font-semibold text-blue-700 hover:text-blue-800"
          >
            Read story
          </Link>
        </div>
      </div>
    </article>
  );
}
