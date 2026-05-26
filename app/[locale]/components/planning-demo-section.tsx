import { ArrowRight } from 'lucide-react';

export type DemoField = {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'tel';
  placeholder?: string;
};

type PlanningDemoSectionProps = {
  heading?: string;
  imagePlaceholderLabel?: string;
  fields?: DemoField[];
  buttonLabel?: string;
  countryLabel?: string;
  countryPlaceholder?: string;
  className?: string;
};

const defaultFields: DemoField[] = [
  { id: 'full-name', label: 'Full name', type: 'text' },
  { id: 'email', label: 'Email', type: 'email' },
  { id: 'phone', label: 'Phone', type: 'tel' },
  { id: 'agency-name', label: 'Name of Travel Agency', type: 'text' },
];

export default function PlanningDemoSection({
  heading = 'Planning a Demo',
  imagePlaceholderLabel = 'Teamwork Image Placeholder',
  fields = defaultFields,
  buttonLabel = 'Ask for Demo',
  countryLabel = 'Country',
  countryPlaceholder = 'Please choose an option',
  className,
}: PlanningDemoSectionProps) {
  const rootClassName = ['w-full rounded-2xl bg-neutral-background px-4 py-10 sm:px-6 lg:px-8', className]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={rootClassName} aria-labelledby="planning-demo-heading">
      <h2
        id="planning-demo-heading"
        className="text-center text-[2.2rem] font-medium uppercase tracking-[0.06em] text-brand-blue sm:text-[2.6rem]"
      >
        {heading}
      </h2>

      <div className="mt-8 overflow-hidden rounded-xl border border-neutral-border bg-neutral-canvas">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.95fr]">
          <div className="relative min-h-[20rem] border-b-4 border-brand-orange-dark/85 lg:min-h-[28rem] lg:border-b-0 lg:border-r-4">
            <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(140deg,#d8e0ed_0%,#f5f8fc_38%,#c9d5ea_100%)] px-6 text-center text-sm font-semibold uppercase tracking-[0.14em] text-brand-blue/75 sm:text-base">
              {imagePlaceholderLabel}
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <form className="space-y-7" onSubmit={(event) => event.preventDefault()}>
              <div className="grid grid-cols-1 gap-x-6 gap-y-7 md:grid-cols-2">
                {fields.map((field) => (
                  <label key={field.id} className="block">
                    <span className="text-[1.5rem] font-medium text-neutral-dark">{field.label}:</span>
                    <input
                      type={field.type ?? 'text'}
                      placeholder={field.placeholder}
                      className="mt-2 w-full border-0 border-b border-neutral-border bg-transparent px-0 py-2 text-[1.35rem] text-neutral-dark outline-none placeholder:text-neutral-muted/75 focus:border-brand-blue"
                    />
                  </label>
                ))}
              </div>

              <div className="max-w-xl">
                <label className="block">
                  <span className="text-[1.5rem] font-medium text-neutral-dark">{countryLabel}:</span>
                  <select className="mt-2 w-full border-0 border-b border-neutral-border bg-transparent px-0 py-2 text-[1.35rem] text-neutral-dark outline-none focus:border-brand-blue">
                    <option value="">- {countryPlaceholder} -</option>
                  </select>
                </label>
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-md bg-brand-blue px-6 py-3 text-[1.2rem] font-semibold uppercase tracking-[0.04em] text-white transition-colors hover:bg-brand-sky focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
              >
                {buttonLabel}
                <ArrowRight className="h-6 w-6" strokeWidth={2.4} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}