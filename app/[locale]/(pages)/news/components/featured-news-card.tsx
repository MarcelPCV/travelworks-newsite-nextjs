import Image from 'next/image';
import Link from 'next/link';
import type { NewsArticle } from '@/app/[locale]/(pages)/news/types';
import CtaButton from '@/app/[locale]/components/ui/cta-button';
import { getBlurDataURL } from '@/app/[locale]/(pages)/news/lib/image';
import { ReadingTime } from './reading-time';
import { ArrowRight } from 'lucide-react';

export function FeaturedNewsCard({
  article,
  href,
  featuredLabel,
  readStoryLabel,
  minReadLabel,
}: {
  article: NewsArticle;
  href: string;
  featuredLabel: string;
  readStoryLabel: string;
  minReadLabel: string;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="grid gap-0 md:grid-cols-2">
        <Link href={href} className="relative block min-h-65">
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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
            {featuredLabel}
          </p>
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
            <ReadingTime minutes={article.readingTimeMinutes} minReadLabel={minReadLabel} />
          </div>
          <div className="mt-4">
            {href && readStoryLabel && (
              <Link href={href} className="inline-block">
                <CtaButton
                  label={readStoryLabel}
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
      </div>
    </article>
  );
}
