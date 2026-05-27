import {
  CalendarCheck2,
  CalendarDays,
  Cog,
  MonitorCheck,
  Orbit,
  Target,
  Users,
  type LucideIcon,
} from 'lucide-react';
import type { ReactNode } from 'react';

export type TechnologyFeatureItem = {
  id: string;
  label: string;
  icon?: ReactNode;
  iconComponent?: LucideIcon;
};

type TechnologyFeaturesSectionProps = {
  items?: TechnologyFeatureItem[];
  headingPrefix?: string;
  headingEmphasis?: string;
  headingSuffix?: string;
  className?: string;
};

const defaultItems: TechnologyFeatureItem[] = [
  { id: 'backoffice-tools', label: 'Backoffice Tools', iconComponent: Cog },
  { id: 'reservation-management', label: 'Reservation Management', iconComponent: CalendarCheck2 },
  { id: 'strategic-management-tool', label: 'Strategic Management Tool', iconComponent: Target },
  { id: 'tour-management', label: 'Tour management', iconComponent: MonitorCheck },
  { id: 'online-tour-booking', label: 'Online Tour Booking', iconComponent: CalendarDays },
  { id: 'crm-tools', label: 'CRM Tools', iconComponent: Users },
  { id: 'multiple-integration', label: 'Multiple integration', iconComponent: Orbit },
];

function FeatureIcon({ item }: { item: TechnologyFeatureItem }) {
  const Icon = item.iconComponent ?? Cog;

  return (
    <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-brand-blue shadow-[0_10px_24px_rgba(46,92,179,0.26)]">
      {item.icon ? (
        <div className="h-10 w-10 [&>svg]:h-full [&>svg]:w-full">{item.icon}</div>
      ) : (
        <Icon className="h-10 w-10 text-white" strokeWidth={1.9} />
      )}
      <span className="pointer-events-none absolute -right-0.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-brand-orange-light" />
    </div>
  );
}

export default function TechnologyFeaturesSection({
  items = defaultItems,
  headingPrefix = 'Technology',
  headingEmphasis = 'Tailored',
  headingSuffix = 'to Travel Industry',
  className,
}: TechnologyFeaturesSectionProps) {
  const rootClassName = ['w-full rounded-2xl bg-[#e7e7e7] px-5 py-10 sm:px-8 lg:px-10', className]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={rootClassName} aria-labelledby="technology-features-heading">
      <h2
        id="technology-features-heading"
        className="text-center text-3xl font-medium uppercase tracking-tight text-brand-blue sm:text-4xl"
      >
        <span>{headingPrefix} </span>
        <strong className="font-semibold">{headingEmphasis} </strong>
        <span>{headingSuffix}</span>
      </h2>

      <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-10">
        {items.map((item) => {
          return (
            <article
              key={item.id}
              className="flex w-[calc(50%-0.75rem)] max-w-[11rem] flex-col items-center text-center sm:w-[calc(33.333%-1.3rem)] md:w-[calc(20%-1.5rem)] xl:w-[calc(14.285%-1.7rem)]"
            >
              <FeatureIcon item={item} />
              <p className="mt-3 max-w-[12ch] text-md font-medium leading-tight text-brand-blue">{item.label}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}