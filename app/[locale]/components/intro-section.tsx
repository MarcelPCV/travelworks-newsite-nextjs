import Image from 'next/image';
import { useId } from 'react';

type ImagePosition = 'left' | 'right';

type IntroSectionProps = {
  eyebrow?: string;
  heading: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: ImagePosition;
  className?: string;
};

export default function IntroSection({
  eyebrow,
  heading,
  description,
  imageSrc,
  imageAlt,
  imagePosition = 'left',
  className,
}: IntroSectionProps) {
  const headingId = useId();
  const imageOrderClassName = imagePosition === 'right' ? 'md:order-2' : 'md:order-1';
  const textOrderClassName = imagePosition === 'right' ? 'md:order-1' : 'md:order-2';

  const rootClassName = ['w-full rounded-[2rem] bg-neutral-background px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8', className]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={rootClassName} aria-labelledby={headingId}>
      <div className="grid grid-cols-1 gap-5 overflow-hidden rounded-[1.6rem] border border-neutral-border/70 bg-white md:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] md:gap-0">
        <div className={[imageOrderClassName, 'relative min-h-[17rem] overflow-hidden md:min-h-[24rem] lg:min-h-[28rem]'].join(' ')}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 767px) 100vw, 52vw"
            className="object-cover"
          />
        </div>

        <div
          className={[
            textOrderClassName,
            'flex flex-col justify-center px-5 py-6 text-center sm:px-7 sm:py-8 md:px-8 md:py-10 md:text-left lg:px-10 lg:py-12',
          ].join(' ')}
        >
          {eyebrow ? (
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-blue/75 sm:text-base">{eyebrow}</p>
          ) : null}

          <h2 id={headingId} className="mt-3 text-3xl font-semibold uppercase tracking-[0.04em] text-brand-blue sm:text-[2.35rem] lg:text-[2.7rem]">
            {heading}
          </h2>

          <p className="mt-4 text-lg leading-8 text-neutral-dark sm:text-xl sm:leading-9 lg:max-w-[26ch] lg:text-[1.55rem] lg:leading-10">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}