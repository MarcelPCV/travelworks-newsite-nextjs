import { FeaturesCardsHighlights, FeaturesHighlightsSectionProps } from './type';
import Link from 'next/link';

function HeadingBadge() {
  return (
    <span className="relative mt-1 inline-flex h-6 w-6 shrink-0" aria-hidden="true">
      <span className="absolute left-0 top-2 h-4 w-4 rounded bg-brand-orange-light" />
      <span className="absolute left-2 top-0 h-4 w-4 rounded bg-brand-blue/60" />
    </span>
  );
}

function normalizeClass(html: string) {
  return html.replace(/className=/g, 'class=');
}

function HighlightIcon({ item }: { item: FeaturesCardsHighlights }) {
  const Icon = item.icon;

  return (
    <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#dbdbdb]">
      <Icon className="h-14 w-14 text-neutral-500" strokeWidth={1.6} />
    </div>
  );
}

export default function FeaturesHighlightsSection({ cards }: FeaturesHighlightsSectionProps) {
  return (
    <section
      className="w-full mx-auto max-w-7xl rounded-2xl bg-[#e7e7e7] px-4 py-8 sm:px-6 lg:px-10 lg:py-12"
      aria-label="Feature highlights"
    >
      <div className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-2 lg:gap-y-14">
        {cards.map((item) => {
          return (
            <div key={item.id} className="grid grid-cols-1 gap-5 sm:grid-cols-[8rem_1fr] sm:gap-6">
              <div className="sm:pt-3">
                <HighlightIcon item={item} />
              </div>

              <div>
                <h3 className="flex items-start gap-3 text-[1.95rem] font-medium uppercase leading-tight tracking-[0.01em] text-brand-blue">
                  <HeadingBadge />
                  <span>{item.title}</span>
                </h3>

                <div className="mt-4 space-y-4 text-lg leading-relaxed text-neutral-700">
                  <div dangerouslySetInnerHTML={{ __html: normalizeClass(item.description) }} />
                </div>

                {item.linkUrl && item.linkTitle && (
                  <Link
                    href={item.linkUrl}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white bg-brand-blue px-2 py-1 rounded-md"
                  >
                    {item.linkTitle}
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
