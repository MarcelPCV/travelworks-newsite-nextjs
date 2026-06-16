import { ArrowRight, CheckCircle2 } from 'lucide-react';

import SecurityBannerCard from './security-banner-card';

export type FeatureMasonryCard = {
  id: string;
  title: string;
  items: string[];
  ctaLabel?: string;
  ctaHref?: string;
  hasPreview?: boolean;
  topLinkLabel?: string;
};

type FeaturesMasonrySectionProps = {
  heading?: string;
  leftCards?: FeatureMasonryCard[];
  rightCards?: FeatureMasonryCard[];
  className?: string;
};

const defaultLeftCards: FeatureMasonryCard[] = [
  {
    id: 'reservation-management',
    title: 'Reservation Management',
    topLinkLabel: 'Click Here and discover SIREV: The Online Booking Engine',
    hasPreview: true,
    items: [
      'Management of corporate accounts',
      'Management of passenger groups',
      'Additional optional products in existing bookings',
      'Automated service fee calculation',
      'Passenger history',
    ],
  },
  {
    id: 'strategic-management-tool',
    title: 'Strategic Management Tool',
    items: [
      'Dashboard with key deadlines for agents and managers.',
      'Custom performance indicators by agent, branch, and banner.',
      'Internal communications for targeted weekly promotions.',
    ],
  },
  {
    id: 'crm-marketing',
    title: 'CRM / Marketing',
    items: [
      'CRM and targeted email campaigns',
      'Automated reminder messaging',
      'Mobile app with itinerary details, maps, and destination content',
    ],
    ctaLabel: 'CRM Tools Features',
    ctaHref: '#',
  },
];

const defaultRightCards: FeatureMasonryCard[] = [
  {
    id: 'accounting',
    title: 'Accounting',
    items: [
      'Accounts payable',
      'Accounts receivable',
      'General ledger',
      'Accounting operations and reconciliations',
      'Reporting',
    ],
    ctaLabel: 'Accounting Features',
    ctaHref: '#',
  },
  {
    id: 'invoicing',
    title: 'Invoicing',
    items: [
      'Configuration of invoicing rules and preferences',
      'Invoice template configuration',
      'Invoice e-mailing with customized messages',
      'Real-time invoicing adjustment when adding new products',
      'Batch cheque generation',
    ],
    ctaLabel: 'Invoicing Features',
    ctaHref: '#',
  },
  {
    id: 'tour-management',
    title: 'Tour Management',
    items: ['Product and sub-product creation', 'Real-time inventory', 'Online reservation', 'Automated payment follow-up'],
    ctaLabel: 'Tour Management Features',
    ctaHref: '#',
  },
];

function FeatureCard({ card }: { card: FeatureMasonryCard }) {
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
          <span className="text-[3.5rem] font-semibold uppercase tracking-[0.04em] text-white/90">SIREV</span>
        </div>
      ) : null}

      <ul className="mt-5 space-y-3">
        {card.items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-neutral-dark">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange-dark" strokeWidth={2.2} />
            <span className="text-[1.32rem] leading-tight">{item}</span>
          </li>
        ))}
      </ul>

      {card.ctaLabel ? (
        <a
          href={card.ctaHref ?? '#'}
          className="mt-5 inline-flex items-center gap-1.5 rounded-sm bg-brand-blue px-4 py-2 text-[1.02rem] font-semibold uppercase tracking-[0.03em] text-white transition-colors hover:bg-brand-sky focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
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
  leftCards = defaultLeftCards,
  rightCards = defaultRightCards,
  className,
}: FeaturesMasonrySectionProps) {
  const rootClassName = ['w-full mx-auto max-w-7xl bg-[#ececec] px-3 py-7 sm:px-4 sm:py-8 lg:px-5 lg:py-10', className]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={rootClassName} aria-labelledby="features-masonry-heading">
      <div className="mx-auto w-full max-w-620">
        <h2 id="features-masonry-heading" className="text-[4rem] font-medium leading-none text-brand-blue">
          {heading}
        </h2>

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr_0.56fr] lg:items-start">
          <div className="space-y-4">
            {leftCards.map((card) => (
              <FeatureCard key={card.id} card={card} />
            ))}
          </div>

          <div className="space-y-4">
            {rightCards.map((card) => (
              <FeatureCard key={card.id} card={card} />
            ))}
          </div>

          <div className="lg:sticky lg:top-8">
            <SecurityBannerCard />
          </div>
        </div>
      </div>
    </section>
  );
}