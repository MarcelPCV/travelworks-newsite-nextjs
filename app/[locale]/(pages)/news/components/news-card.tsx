import Image from 'next/image';
import Link from 'next/link';
import type { NewsArticle } from '@/app/[locale]/(pages)/news/types';
import { getBlurDataURL } from '@/app/[locale]/(pages)/news/lib/image';
import { ReadingTime } from './reading-time';
import { ArrowRight } from 'lucide-react';
import CtaButton from '@/app/[locale]/components/ui/cta-button';

type NewsCardProps = {
  article: NewsArticle;
  href: string;
  categoryLabel?: string;
  readMoreLabel: string;
  minReadLabel: string;
};

export function NewsCard({
  article,
  href,
  categoryLabel,
  readMoreLabel,
  minReadLabel,
}: NewsCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link href={href} className="relative block aspect-video overflow-hidden">
        <Image
          src={article.thumbnail}
          alt={article.title}
          fill
          className="object-cover transition duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={getBlurDataURL(640, 360)}
        />
      </Link>
      <div className="flex flex-1 flex-col px-5 py-4">
        {categoryLabel ? (
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
            {categoryLabel}
          </p>
        ) : null}
        <h3 className="mt-2 text-xl font-semibold text-slate-900">
          <Link href={href} className="hover:text-blue-700">
            {article.title}
          </Link>
        </h3>
        <p className="mt-3 text-sm text-slate-600">{article.excerpt}</p>
        <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
          <time dateTime={article.date}>{new Date(article.date).toLocaleDateString('en-CA')}</time>
          <ReadingTime minutes={article.readingTimeMinutes} minReadLabel={minReadLabel} />
        </div>
        <div className="mt-4">
          {href && readMoreLabel && (
            <Link href={href} className="inline-block">
              <CtaButton
                label={readMoreLabel}
                variant="default"
                size="xs"
                icon={<ArrowRight className="h-6 w-6" strokeWidth={2.4} />}
                iconPosition="after"
                className="mt-6"
              />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
