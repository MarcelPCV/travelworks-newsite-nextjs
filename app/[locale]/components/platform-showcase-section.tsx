type PlatformShowcaseSectionProps = {
  title?: string;
  description?: string;
  className?: string;
  mediaPlaceholderLabel?: string;
  badgePlaceholderLabel?: string;
};

export default function PlatformShowcaseSection({
  title = 'A pleasant work environment for travel agents, considerable time-saving for accountants and an essential management tool for travel agency managers.',
  description,
  className,
  mediaPlaceholderLabel = 'Computer Image Placeholder',
  badgePlaceholderLabel = '30 Years Stamp Placeholder',
}: PlatformShowcaseSectionProps) {
  const rootClassName = ['relative overflow-hidden rounded-3xl bg-brand-blue px-4 py-8 sm:px-6 lg:px-10 lg:py-12', className]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={rootClassName} aria-labelledby="platform-showcase-title">
      <div className="pointer-events-none absolute inset-0">
        <span className="absolute -left-8 top-14 h-40 w-12 rotate-[36deg] rounded-full bg-brand-sky/25 blur-[1px] sm:h-56 sm:w-16" />
        <span className="absolute left-1/3 top-6 h-28 w-28 rounded-full bg-brand-sky/20 blur-sm sm:h-36 sm:w-36" />
        <span className="absolute bottom-24 right-[20%] h-52 w-14 rotate-[35deg] rounded-full bg-brand-sky/20 blur-[1px] sm:h-64 sm:w-20" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div className="relative">
          <div className="mx-auto w-full max-w-5xl rounded-2xl border border-white/35 bg-brand-navy/30 p-4 shadow-[0_30px_80px_rgba(7,22,60,0.45)] sm:p-6 lg:p-8">
            <div className="flex aspect-[16/8.5] items-center justify-center rounded-xl border-2 border-dashed border-white/55 bg-gradient-to-br from-brand-sky/35 to-brand-navy/50 px-6 text-center text-sm font-medium uppercase tracking-wide text-white/90 sm:text-base">
              {mediaPlaceholderLabel}
            </div>
          </div>

          <div className="mx-auto mt-5 flex w-fit items-center justify-center rounded-full border-4 border-white/80 bg-brand-blue px-6 py-4 text-center text-brand-orange-light shadow-[0_14px_40px_rgba(9,26,69,0.45)] sm:absolute sm:bottom-5 sm:right-4 sm:mt-0 sm:px-7 lg:right-8">
            <div className="leading-tight">
              <p className="text-3xl font-bold tracking-tight sm:text-4xl">+ 30</p>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white">Years</p>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.12em] text-white/90 sm:text-xs">
                {badgePlaceholderLabel}
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-4xl text-center text-white">
          <h2 id="platform-showcase-title" className="type-h4 font-medium text-white sm:type-h3">
            {title}
          </h2>
          {description ? <p className="type-normal-16 mt-4 text-white/85">{description}</p> : null}
        </div>
      </div>
    </section>
  );
}