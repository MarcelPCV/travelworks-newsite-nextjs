import {
  CircleDollarSign,
  FileCheck2,
  Laptop,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import type { ReactNode } from 'react';

export type FeatureHighlightItem = {
  id: string;
  title: string;
  iconComponent?: LucideIcon;
  paragraphs: ReactNode[];
};

type FeaturesHighlightsSectionProps = {
  items?: FeatureHighlightItem[];
  className?: string;
};

const defaultItems: FeatureHighlightItem[] = [
  {
    id: 'invoicing-methodology',
    title: 'Professional Invoicing Methodology',
    iconComponent: FileCheck2,
    paragraphs: [
      <>
        With TravelWorks, you can generate <strong className="font-semibold text-brand-blue">standardized invoices with one click</strong>. You can easily define your <strong className="font-semibold text-brand-blue">invoice template with customized messages</strong> for your agency.
      </>,
      <>
        Invoices with <strong className="font-semibold text-brand-blue">your Terms and Conditions</strong> can easily be emailed to your customers. All invoice changes are tracked by the file history, avoiding re-work for your agents.
      </>,
    ],
  },
  {
    id: 'process-automation',
    title: 'Process Automation',
    iconComponent: Workflow,
    paragraphs: [
      <>
        <strong className="font-semibold text-brand-blue">Generate invoices in our system from your booking engines</strong>, activate automatic calculation of service fees, and manage passenger groups without re-entering redundant information.
      </>,
      <>
        <strong className="font-semibold text-brand-blue">This is how you reduce administrative tasks in your travel agency</strong>, so your agents can focus on customer service.
      </>,
    ],
  },
  {
    id: 'real-time-accounting',
    title: 'Accurate Accounting In Real Time',
    iconComponent: CircleDollarSign,
    paragraphs: [
      <>
        Your travel agency is dealing with an external accountant; how valuable it is for them to consult your data without having to travel to your location.
      </>,
      <>
        Your up-to-date accounting helps quickly identify files that require additional screening and close accounting periods without wasting time.
      </>,
      <>
        <strong className="font-semibold text-brand-blue">Less work for your accountant means more money in your travel agency&apos;s pockets.</strong>
      </>,
    ],
  },
  {
    id: 'data-anywhere',
    title: 'Available Data From Anywhere, Even For Accountants',
    iconComponent: Laptop,
    paragraphs: [
      <>
        Our system was built to <strong className="font-semibold text-brand-blue">help you identify at any time your accounts payable and accounts receivable</strong> within your travel agency.
      </>,
      <>
        Bank reconciliations are carried out easily and financial statements are produced quickly.
      </>,
      <>
        The general ledger automatically adjusts and accounting reports can be generated in a few clicks.
      </>,
    ],
  },
];

function HeadingBadge() {
  return (
    <span className="relative mt-1 inline-flex h-6 w-6 shrink-0" aria-hidden="true">
      <span className="absolute left-0 top-2 h-4 w-4 rounded bg-brand-orange-light" />
      <span className="absolute left-2 top-0 h-4 w-4 rounded bg-brand-blue/60" />
    </span>
  );
}

function HighlightIcon({ item }: { item: FeatureHighlightItem }) {
  const Icon = item.iconComponent ?? FileCheck2;

  return (
    <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#dbdbdb]">
      <Icon className="h-14 w-14 text-neutral-500" strokeWidth={1.6} />
    </div>
  );
}

export default function FeaturesHighlightsSection({
  items = defaultItems,
  className,
}: FeaturesHighlightsSectionProps) {
  const rootClassName = ['w-full rounded-2xl bg-[#e7e7e7] px-4 py-8 sm:px-6 lg:px-10 lg:py-12', className]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={rootClassName} aria-label="Accounting and automation highlights">
      <div className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-2 lg:gap-y-14">
        {items.map((item) => {
          return (
            <article key={item.id} className="grid grid-cols-1 gap-5 sm:grid-cols-[8rem_1fr] sm:gap-6">
              <div className="sm:pt-3">
                <HighlightIcon item={item} />
              </div>

              <div>
                <h3 className="flex items-start gap-3 text-[1.95rem] font-medium uppercase leading-tight tracking-[0.01em] text-brand-blue">
                  <HeadingBadge />
                  <span>{item.title}</span>
                </h3>

                <div className="mt-4 space-y-4 text-lg leading-relaxed text-neutral-700">
                  {item.paragraphs.map((paragraph, index) => {
                    return <p key={`${item.id}-${index}`}>{paragraph}</p>;
                  })}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}