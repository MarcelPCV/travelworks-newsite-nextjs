import Image from 'next/image';
import { Check } from 'lucide-react';

export type ComparisonColumn = {
  id: string;
  label: string;
};

export type ComparisonSolutionRow = {
  id: string;
  label: string;
  values: Record<string, boolean>;
};

type ComparisonSolutionSectionProps = {
  heading?: string;
  imageSrc?: string;
  imageAlt?: string;
  columns?: ComparisonColumn[];
  rows?: ComparisonSolutionRow[];
  className?: string;
};

const defaultColumns: ComparisonColumn[] = [
  { id: 'travelworks', label: 'TravelWorks' },
  { id: 'generic-accounting', label: 'Generic accounting software' },
  { id: 'other-travel', label: 'Other travel software' },
];

const defaultRows: ComparisonSolutionRow[] = [
  {
    id: 'invoicing',
    label: 'Invoicing',
    values: {
      travelworks: true,
      'generic-accounting': true,
      'other-travel': true,
    },
  },
  {
    id: 'automated-invoicing-gds',
    label: 'Automated invoicing with GDS',
    values: {
      travelworks: true,
      'generic-accounting': false,
      'other-travel': true,
    },
  },
  {
    id: 'accounting-operations',
    label: 'Accounting operations',
    values: {
      travelworks: true,
      'generic-accounting': true,
      'other-travel': true,
    },
  },
  {
    id: 'integrated-crm',
    label: 'Integrated CRM',
    values: {
      travelworks: true,
      'generic-accounting': false,
      'other-travel': false,
    },
  },
  {
    id: 'passenger-groups',
    label: 'Passengers groups management',
    values: {
      travelworks: true,
      'generic-accounting': false,
      'other-travel': true,
    },
  },
  {
    id: 'agent-commission',
    label: 'Travel agent commission management',
    values: {
      travelworks: true,
      'generic-accounting': false,
      'other-travel': true,
    },
  },
  {
    id: 'supplier-cards',
    label: 'Management of suppliers credit cards',
    values: {
      travelworks: true,
      'generic-accounting': false,
      'other-travel': true,
    },
  },
  {
    id: 'bsp-arc',
    label: 'BSP / ARC management',
    values: {
      travelworks: true,
      'generic-accounting': false,
      'other-travel': true,
    },
  },
  {
    id: 'reporting-travel',
    label: 'Reporting tool tailored to travel industry',
    values: {
      travelworks: true,
      'generic-accounting': false,
      'other-travel': true,
    },
  },
  {
    id: 'genuine-cloud',
    label: 'Genuine cloud system',
    values: {
      travelworks: true,
      'generic-accounting': true,
      'other-travel': false,
    },
  },
  {
    id: 'insurance-api',
    label: 'Full integration (API) with insurance companies',
    values: {
      travelworks: true,
      'generic-accounting': false,
      'other-travel': false,
    },
  },
  {
    id: 'mobile-app-module',
    label: 'Mobile application module integrated to main system',
    values: {
      travelworks: true,
      'generic-accounting': false,
      'other-travel': false,
    },
  },
  {
    id: 'dashboard-timelines',
    label: 'Dashboard with key timelines per agent',
    values: {
      travelworks: true,
      'generic-accounting': false,
      'other-travel': false,
    },
  },
  {
    id: 'tablet-version',
    label: 'Tablet application version of the software',
    values: {
      travelworks: true,
      'generic-accounting': false,
      'other-travel': false,
    },
  },
];

export default function ComparisonSolutionSection({
  heading = 'A Complete Solution',
  imageSrc = '/image.webp',
  imageAlt = 'Travel agent smiling at a desk with a laptop',
  columns = defaultColumns,
  rows = defaultRows,
  className,
}: ComparisonSolutionSectionProps) {
  const rootClassName = ['w-full bg-[#e7e7e7] px-3 py-7 sm:px-4 sm:py-8 lg:px-5 lg:py-10', className]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={rootClassName} aria-labelledby="comparison-solution-heading">
      <div className="mx-auto w-full max-w-620">
        <h2
          id="comparison-solution-heading"
          className="text-center text-[2.1rem] font-medium uppercase tracking-[0.04em] text-brand-blue sm:text-[2.4rem]"
        >
          {heading}
        </h2>

        <div className="mt-4 grid grid-cols-1 overflow-hidden border border-neutral-border/70 bg-neutral-canvas lg:grid-cols-[1.9fr_1fr]">
          <div className="relative min-h-[21rem] sm:min-h-[26rem] lg:min-h-full">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 1023px) 100vw, 64vw"
              className="object-cover"
              priority={false}
            />
          </div>

          <div className="overflow-x-auto bg-brand-blue">
            <table className="w-full min-w-[32rem] border-collapse text-left text-white lg:min-w-0" aria-label="Travel software comparison table">
              <thead>
                <tr className="bg-[#255a9f]">
                  <th scope="col" className="w-[50%] px-4 py-4 text-xs font-medium uppercase tracking-[0.07em] text-transparent sm:text-sm">
                    Feature
                  </th>
                  {columns.map((column) => (
                    <th
                      key={column.id}
                      scope="col"
                      className="w-[16.66%] px-2 py-4 text-center text-[0.72rem] font-semibold leading-tight sm:px-3 sm:text-[0.82rem]"
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr key={row.id} className={rowIndex % 2 === 0 ? 'bg-[#2963ac]' : 'bg-[#255a9f]'}>
                    <th scope="row" className="px-4 py-3 text-sm font-medium leading-tight text-white sm:text-[1rem]">
                      {row.label}
                    </th>
                    {columns.map((column) => (
                      <td key={column.id} className="px-2 py-3 text-center sm:px-3">
                        {row.values[column.id] ? (
                          <Check className="mx-auto h-4 w-4 text-brand-orange-light sm:h-5 sm:w-5" strokeWidth={3} aria-hidden="true" />
                        ) : (
                          <span className="sr-only">Not available</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
