import { ArrowRight, LockKeyhole } from 'lucide-react';

type SecurityBannerCardProps = {
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
  className?: string;
};

export default function SecurityBannerCard({
  title = 'Robust, Fast, Reliable and Secured',
  description = 'Years of development were spent developing software focused on robustness, speed, reliability and security.',
  buttonLabel = 'See More',
  buttonHref = '#',
  className,
}: SecurityBannerCardProps) {
  const rootClassName = [
    'w-full max-w-[300px] overflow-hidden rounded-sm border border-neutral-border bg-neutral-canvas',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <aside className={rootClassName} aria-label="Security banner">
      <div className="flex flex-col items-center justify-center px-6 pb-5 pt-8 sm:pb-8 sm:pt-10">
        <p className="text-center text-[3.1rem] font-semibold italic leading-none tracking-[-0.02em] text-brand-blue sm:text-[3.5rem]">
          Travel<span className="font-medium text-neutral-dark">Works</span>
        </p>
        <p className="mt-2 text-center text-sm font-medium italic tracking-[0.04em] text-neutral-muted sm:text-base">
          Travel Technology Solutions
        </p>

        <div className="mt-8 rounded-full border-4 border-brand-blue/20 p-4">
          <LockKeyhole className="h-16 w-16 text-brand-blue sm:h-20 sm:w-20" strokeWidth={2.1} />
        </div>
      </div>

      <div className="bg-brand-blue px-6 pb-8 pt-7 text-center text-white sm:px-8 sm:pb-10 sm:pt-8">
        <h3 className="text-[2.1rem] font-medium uppercase leading-tight sm:text-[2.45rem]">
          {title}
        </h3>
        <p className="mx-auto mt-5 max-w-[22ch] text-[1.35rem] leading-tight text-white/95 sm:text-[1.5rem] sm:leading-tight">
          {description}
        </p>

        <a
          href={buttonHref}
          className="mt-7 inline-flex items-center gap-2 rounded-md bg-brand-orange-light px-5 py-2.5 text-[1.15rem] font-semibold uppercase tracking-[0.03em] text-brand-blue transition-colors hover:bg-brand-orange-dark hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-light"
        >
          {buttonLabel}
          <ArrowRight className="h-5 w-5" strokeWidth={2.6} />
        </a>
      </div>
    </aside>
  );
}
