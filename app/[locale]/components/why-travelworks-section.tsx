import {
  ArrowRight,
  CircleDollarSign,
  Cloud,
  Network,
  Users,
  type LucideIcon,
} from 'lucide-react';
import type { ReactNode } from 'react';

export type WhyTravelworksItem = {
  id: string;
  title: string;
  description: string;
  icon?: ReactNode;
  iconComponent?: LucideIcon;
};

type WhyTravelworksSectionProps = {
  items?: WhyTravelworksItem[];
  headingPrefix?: string;
  headingEmphasis?: string;
  className?: string;
};

const defaultItems: WhyTravelworksItem[] = [
  {
    id: 'optimize-accounting',
    title: 'Optimize Invoicing and Accounting',
    description:
      'Generate professional and standardized invoices. Automate invoice creation and maximize your accounting process with good practices.',
    iconComponent: CircleDollarSign,
  },
  {
    id: 'gds-integration',
    title: 'Integrated to GDS and Booking Engines',
    description:
      'Connect your current booking engines and reservation flow so processes stay centralized and your team works faster.',
    iconComponent: Network,
  },
  {
    id: 'cloud-system',
    title: 'Cloud System, a Turnkey Solution',
    description:
      'Operate from a reliable cloud environment that simplifies maintenance, collaboration, and growth across locations.',
    iconComponent: Cloud,
  },
  {
    id: 'crm-marketing',
    title: 'CRM Tool and Integrated Marketing',
    description:
      'Generate additional revenue with targeted campaigns and improve customer service with automated communication.',
    iconComponent: Users,
  },
];

function WhyTravelworksIcon({ item }: { item: WhyTravelworksItem }) {
  const Icon = item.iconComponent ?? CircleDollarSign;

  if (item.icon) {
    return <div className="h-20 w-20 [&>svg]:h-full [&>svg]:w-full">{item.icon}</div>;
  }

  return <Icon className="h-20 w-20 text-brand-orange-dark" strokeWidth={1.7} />;
}

export default function WhyTravelworksSection({
  items = defaultItems,
  headingPrefix = 'Why',
  headingEmphasis = 'TravelWorks?',
  className,
}: WhyTravelworksSectionProps) {
  const rootClassName = ['w-full rounded-2xl bg-neutral-background px-3 py-8 sm:px-5 lg:px-8', className]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={rootClassName} aria-labelledby="why-travelworks-heading">
      <h2 id="why-travelworks-heading" className="mb-8 text-center uppercase tracking-[0.08em] text-brand-blue sm:type-h4">
        <span className="font-normal">{headingPrefix} </span>
        <strong className="font-bold">{headingEmphasis}</strong>
      </h2>

      <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-neutral-border sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => {
          return (
            <article
              key={item.id}
              className="flex min-h-[26rem] flex-col border-b border-neutral-border last:border-b-0 sm:min-h-[24rem] sm:[&:nth-last-child(-n+2)]:border-b-0 xl:min-h-[27rem] xl:border-b-0 xl:border-r xl:last:border-r-0"
            >
              <div className="flex h-56 items-center justify-center bg-[#ebe6dc] px-6">
                <WhyTravelworksIcon item={item} />
              </div>

              <div className="flex flex-1 flex-col bg-neutral-dark p-6 text-neutral-canvas">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-[1.9rem] font-medium leading-tight">{item.title}</h3>
                  <ArrowRight className="mt-1 h-7 w-7 shrink-0 text-brand-orange-light" strokeWidth={2.2} />
                </div>
                <p className="mt-5 type-normal-16 text-neutral-canvas/90">{item.description}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}