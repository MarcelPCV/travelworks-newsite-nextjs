import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { ReactNode } from 'react';
import { FeatureMasonryCard } from './type';

type RenderFeatureMasonryCard = Omit<FeatureMasonryCard, 'items'> & {
  items: ReactNode[];
};

type FeaturesMasonrySectionProps = {
  heading?: string;
  cards?: RenderFeatureMasonryCard[];
  className?: string;
};

function FeatureCard({ card }: { card: RenderFeatureMasonryCard }) {
  return (
    <article className="rounded-sm border border-neutral-border bg-neutral-canvas px-6 py-6 shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
      <h3 className="border-l-2 border-brand-orange-dark pl-3 text-[2rem] font-medium uppercase leading-none text-brand-blue">
        {card.title}
      </h3>

      {card.topLinkLabel ? (
        <p className="mt-4 text-[1.2rem] font-semibold text-brand-blue underline decoration-brand-blue/40 underline-offset-3">
          {card.topLinkLabel}
        </p>
      ) : null}

      {card.hasPreview ? (
        <div className="mt-4 flex h-32 items-center justify-center rounded-sm bg-[#3b3f45]">
          <span className="text-[3.5rem] font-semibold uppercase tracking-[0.04em] text-white/90">
            SIREV
          </span>
        </div>
      ) : null}

      <ul className="mt-5 space-y-3">
        {card.items.map((item, itemIndex) => (
          <li
            key={`${card.id}-${itemIndex}`}
            className="flex items-start gap-2.5 text-neutral-dark"
          >
            <CheckCircle2
              className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange-dark"
              strokeWidth={2.2}
            />
            <span className="text-[1.32rem] leading-tight">{item}</span>
          </li>
        ))}
      </ul>

      {card.ctaLabel ? (
        <a
          href={card.ctaHref ?? '#'}
          className="mt-5 inline-flex items-center gap-1.5 rounded-sm bg-brand-blue px-4 py-2 text-[1.02rem] font-semibold uppercase tracking-[0.03em] text-white transition-colors hover:bg-brand-sky"
        >
          {card.ctaLabel}
          <ArrowRight className="h-4 w-4" strokeWidth={2.6} />
        </a>
      ) : null}
    </article>
  );
}

export default function FeaturesMasonrySection({
  heading = 'Discover all features:',
  cards = [],
  className,
}: FeaturesMasonrySectionProps) {
  const rootClassName = [
    'w-full mx-auto max-w-7xl bg-[#ececec] px-3 py-7 sm:px-4 sm:py-8 lg:px-5 lg:py-10',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={rootClassName} aria-labelledby="features-masonry-heading">
      <div className="mx-auto w-full max-w-620">
        <h2
          id="features-masonry-heading"
          className="text-[4rem] font-medium leading-none text-brand-blue"
        >
          {heading}
        </h2>

        <div className="mt-6 lg:columns-2 lg:gap-4">
          {cards.map((card) => (
            <div key={card.id} className="mb-4 break-inside-avoid">
              <FeatureCard card={card} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
