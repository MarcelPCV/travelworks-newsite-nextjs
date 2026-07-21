import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { ReactNode } from 'react';
import { FeatureMasonryCard } from './type';
import TitleSection from '../../ui/title-section';
import SecurityBannerCard from '../security-banner-card/security-banner-card';
import CtaButton from '../../ui/cta-button';
import Link from 'next/link';

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
      <h3 className="border-l-2 border-brand-orange-dark pl-3 text-[1.2rem] font-semibold uppercase leading-none text-brand-blue">
        {card.title}
      </h3>

      {card.topLinkLabel && card.topLinkHref &&  (
        <Link href={card.topLinkHref} className="group mt-4 block">
          <div className="mt-4 flex h-32 items-center justify-center rounded-sm bg-[#3b3f45]">
            <span className="text-[3.5rem] font-semibold uppercase tracking-[0.04em] text-white/90">
              SIREV
            </span>
          </div>
          <p className="mt-4 text-[.9rem] font-semibold text-brand-blue underline decoration-brand-blue/40 underline-offset-3">
            {card.topLinkLabel}
          </p>
        </Link>
      )}

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
            <span className="text-[.95rem]">
              {item}
            </span>
          </li>
        ))}
      </ul>

      {card.ctaLabel && card.ctaHref && (
        <a href={card.ctaHref}>
          <CtaButton
            label={card.ctaLabel}
            variant="default"
            size="sm"
            icon={<ArrowRight className="h-6 w-6" strokeWidth={2.4} />}
            iconPosition="after"
            className="mt-6 cursor-pointer"
          />
        </a>
      )}
    </article>
  );
}

export default function FeaturesMasonrySection({
  heading = 'Discover all features:',
  cards = [],
  className,
}: FeaturesMasonrySectionProps) {
  const rootClassName = [
    'w-full mx-auto max-w-7xl px-3 sm:px-4 lg:px-5',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="my-10 mx-auto max-w-[1600px]">
      <div className="mb-5">
        {heading && (
          <TitleSection
            title={heading}
            alignment="center"
            size="extra-large"
            color="text-brand-blue"
          />
        )}
      </div>
      <div className="mx-auto max-w-[1600px] flex flex-col lg:flex-row gap-10">
        <div className={rootClassName} aria-labelledby="features-masonry-heading">
          <div className="mx-auto w-full max-w-[1600px]">
            <div className="lg:columns-2 lg:gap-4">
              {cards.map((card) => (
                <div key={card.id} className="mb-4 break-inside-avoid">
                  <FeatureCard card={card} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          <SecurityBannerCard />
        </div>
      </div>
    </div>
  );
}
