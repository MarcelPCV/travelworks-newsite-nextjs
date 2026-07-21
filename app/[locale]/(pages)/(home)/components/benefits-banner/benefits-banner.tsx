import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { BenefitsBanner } from '@/app/[locale]/(pages)/(home)/components/benefits-banner/type';
import TitleSection from '../../../../components/ui/title-section';
import Image from 'next/image';
import CtaButton from '../../../../components/ui/cta-button';

export default function BenefitsBannerSection({
  heading,
  items,
  imageHref,
  imageAlt,
  buttonLabel,
  buttonHref,
}: BenefitsBanner) {
  return (
    <section className="mx-auto px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
      {heading && (
        <TitleSection
          title={heading}
          alignment="center"
          size="extra-large"
          color="text-brand-blue"
          className="mb-5"
        />
      )}
      <div
        className="mx-auto relative overflow-hidden rounded-2xl bg-gray-100"
        aria-labelledby="benefits-banner-title"
      >
        <div className="pointer-events-none absolute inset-0">
          <span className="absolute -left-20 top-0 h-[140%] w-28 rotate-45 bg-neutral-border/45" />
          <span className="absolute right-[-5.5rem] top-0 h-[135%] w-28 -rotate-45 bg-neutral-border/40" />
          <span className="absolute left-[10%] top-[18%] h-20 w-20 rotate-45 border-[10px] border-brand-orange-light/75" />
          <span className="absolute right-[6%] top-[65%] h-20 w-20 rotate-45 border-[10px] border-brand-orange-light/70" />
        </div>

        <div className="mx-auto max-w-[1600px] relative grid grid-cols-1 gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10 lg:px-12 lg:py-12">
          <div className="flex max-w-[700px] items-end justify-center lg:justify-start">
            {imageHref && (
              <Image
                src={imageHref}
                alt={imageAlt ?? ''}
                width={700}
                height={400}
                className="h-auto w-full rounded-lg object-cover"
              />
            )}
          </div>

          <div className="mx-auto flex w-full max-w-xl flex-col justify-center lg:mx-0 lg:pr-4">
            <ul className="space-y-4 sm:space-y-5" aria-label={heading ?? undefined}>
              {items &&
                items.map((item) => (
                  <li key={item.id} className="flex items-start gap-3.5 text-brand-blue sm:gap-4">
                    <CheckCircle2
                      className="mt-0.5 h-7 w-7 shrink-0 text-brand-orange-dark"
                      strokeWidth={2.2}
                    />
                    <span className="text-lg font-medium leading-tight">{item.label}</span>
                  </li>
                ))}
            </ul>

            {buttonLabel && buttonHref && (
              <a href={buttonHref}>
                <CtaButton
                  label={buttonLabel}
                  variant="default"
                  size="sm"
                  icon={<ArrowRight className="h-6 w-6" strokeWidth={2.4} />}
                  iconPosition="after"
                  className="mt-6"
                />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
