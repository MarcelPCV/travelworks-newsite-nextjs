import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

export type CustomerTrustItem = {
  id: string;
  name: string;
  logo?: ReactNode;
};

type CustomersTrustSectionProps = {
  headingPrefix?: string;
  headingEmphasis?: string;
  headingSuffix?: string;
  items?: CustomerTrustItem[];
  buttonLabel?: string;
  buttonHref?: string;
  className?: string;
};

const defaultItems: CustomerTrustItem[] = [
  { id: 'carlson', name: 'Carlson Wagonlit Travel' },
  { id: 'ensemble', name: 'Ensemble Travel Group' },
  { id: 'ved', name: 'Voyages En Direct' },
  { id: 'thomas-cook', name: 'Thomas Cook' },
  { id: 'revasol', name: 'Revasol' },
  { id: 'bergeron', name: 'Voyages Bergeron' },
  { id: 'club-voyages', name: 'Club Voyages' },
  { id: 'transat', name: 'Transat' },
  { id: 'vasco', name: 'Vasco Travel' },
  { id: 'plein-soleil', name: 'Voyages Plein Soleil' },
  { id: 'marlin', name: 'Marlin Travel' },
  { id: 'vaisse', name: 'Vaisse De Croisiere' },
];

function LogoCard({ item }: { item: CustomerTrustItem }) {
  return (
    <article className="flex min-h-[9.5rem] items-center justify-center rounded-xl bg-neutral-canvas p-4 shadow-[0_12px_28px_rgba(11,30,74,0.08)] sm:min-h-[10.5rem]">
      {item.logo ? (
        <div className="max-h-24 max-w-full [&>img]:h-auto [&>img]:max-h-24 [&>img]:w-auto">{item.logo}</div>
      ) : (
        <p className="text-center text-[1.65rem] font-semibold leading-tight text-brand-blue/85">{item.name}</p>
      )}
    </article>
  );
}

export default function CustomersTrustSection({
  headingPrefix = 'More than',
  headingEmphasis = '1,000 Travel Agencies',
  headingSuffix = 'trust us',
  items = defaultItems,
  buttonLabel = 'Discover Our Customers',
  buttonHref = '#',
  className,
}: CustomersTrustSectionProps) {
  const rootClassName = ['w-full rounded-2xl bg-neutral-background px-4 py-10 sm:px-6 lg:px-8', className]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={rootClassName} aria-labelledby="customers-trust-heading">
      <h2
        id="customers-trust-heading"
        className="text-center text-[2.2rem] font-medium uppercase tracking-[0.06em] text-brand-blue sm:text-[2.6rem]"
      >
        <span>{headingPrefix} </span>
        <strong className="font-bold">{headingEmphasis} </strong>
        <span>{headingSuffix}</span>
      </h2>

      <div className="mx-auto mt-8 grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {items.map((item) => (
          <LogoCard key={item.id} item={item} />
        ))}
      </div>

      <div className="mt-9 flex justify-center">
        <a
          href={buttonHref}
          className="inline-flex items-center gap-2 rounded-md bg-brand-blue px-6 py-3 text-[1.2rem] font-semibold uppercase tracking-[0.04em] text-white transition-colors hover:bg-brand-sky focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
        >
          {buttonLabel}
          <ArrowRight className="h-6 w-6" strokeWidth={2.4} />
        </a>
      </div>
    </section>
  );
}