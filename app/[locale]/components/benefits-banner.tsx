import { ArrowRight, CheckCircle2 } from 'lucide-react';

export type BenefitsBannerItem = {
  id: string;
  label: string;
};

type BenefitsBannerProps = {
  heading?: string;
  items?: BenefitsBannerItem[];
  buttonLabel?: string;
  buttonHref?: string;
  hideButton?: boolean;
  imagePlaceholderLabel?: string;
  className?: string;
};

const defaultItems: BenefitsBannerItem[] = [
  { id: 'accounting', label: 'Accounting tailored to the travel agency' },
  { id: 'productivity', label: 'Improves productivity' },
  { id: 'security', label: 'Robust and secured' },
  { id: 'usability', label: 'Easy to use and intuitive' },
];

export default function BenefitsBanner({
  heading = 'TravelWorks for Better Operations',
  items = defaultItems,
  buttonLabel = 'Discover Benefits',
  buttonHref = '#',
  hideButton = false,
  imagePlaceholderLabel = 'Laptop Image Placeholder',
  className,
}: BenefitsBannerProps) {
  const rootClassName = ['relative overflow-hidden rounded-2xl bg-neutral-background', className]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={rootClassName} aria-labelledby="benefits-banner-title">
      <div className="pointer-events-none absolute inset-0">
        <span className="absolute -left-20 top-0 h-[140%] w-28 rotate-45 bg-neutral-border/45" />
        <span className="absolute right-[-5.5rem] top-0 h-[135%] w-28 -rotate-45 bg-neutral-border/40" />
        <span className="absolute left-[10%] top-[18%] h-20 w-20 rotate-45 border-[10px] border-brand-orange-light/75" />
        <span className="absolute right-[6%] top-[65%] h-20 w-20 rotate-45 border-[10px] border-brand-orange-light/70" />
      </div>

      <div className="relative grid grid-cols-1 gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10 lg:px-12 lg:py-12">
        <div className="flex items-end justify-center lg:justify-start">
          <div className="w-full max-w-3xl rounded-2xl border border-neutral-border/80 bg-neutral-canvas p-3 shadow-[0_16px_38px_rgba(15,23,42,0.18)] sm:p-4">
            <div className="flex aspect-[16/10] items-center justify-center rounded-xl border-2 border-dashed border-brand-blue/35 bg-[linear-gradient(180deg,#ffffff_0%,#eef3fb_100%)] px-6 text-center text-sm font-semibold uppercase tracking-[0.14em] text-brand-blue/80 sm:text-base">
              {imagePlaceholderLabel}
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-xl flex-col justify-center lg:mx-0 lg:pr-4">
          <h2 id="benefits-banner-title" className="sr-only">
            {heading}
          </h2>

          <ul className="space-y-4 sm:space-y-5" aria-label={heading}>
            {items.map((item) => (
              <li key={item.id} className="flex items-start gap-3.5 text-brand-blue sm:gap-4">
                <CheckCircle2 className="mt-0.5 h-7 w-7 shrink-0 text-brand-orange-dark" strokeWidth={2.2} />
                <span className="text-[1.75rem] font-medium leading-tight sm:text-[2.1rem]">{item.label}</span>
              </li>
            ))}
          </ul>

          {!hideButton ? (
            <a
              href={buttonHref}
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-md bg-brand-blue px-6 py-3 text-[1.2rem] font-semibold uppercase tracking-[0.04em] text-white transition-colors hover:bg-brand-sky focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            >
              {buttonLabel}
              <ArrowRight className="h-6 w-6" strokeWidth={2.4} />
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}