import { ArrowRight, CircleDollarSign } from 'lucide-react';
import { WhyTravelworksSection, WhyTravelworksItems } from './type';

function WhyTravelworksIcon({ iconComponent, icon }: WhyTravelworksItems) {
  const Icon = iconComponent ?? CircleDollarSign;

  if (icon) {
    return <div className="h-20 w-20 [&>svg]:h-full [&>svg]:w-full">{icon}</div>;
  }

  return <Icon className="h-20 w-20 text-brand-orange-dark" strokeWidth={1.7} />;
}

export default function WhyTravelworks({ title, items }: WhyTravelworksSection) {
  return (
    <section
      className="w-full mx-auto max-w-7xl rounded-2xl bg-neutral-background py-8"
      aria-labelledby="why-travelworks-heading"
    >
      {title && (
        <h2
          dangerouslySetInnerHTML={{ __html: title }}
          className="text-center text-3xl py-4 font-medium uppercase tracking-tight text-brand-blue sm:text-4xl"
        />
      )}

      <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-neutral-border sm:grid-cols-2 xl:grid-cols-4">
        {items &&
          items.map((item, index) => {
            return (
              <article
                key={index}
                className="flex min-h-[26rem] flex-col border-b border-neutral-border last:border-b-0 sm:min-h-[24rem] sm:[&:nth-last-child(-n+2)]:border-b-0 xl:min-h-[27rem] xl:border-b-0 xl:border-r xl:last:border-r-0"
              >
                <div className="flex h-56 items-center justify-center bg-[#ebe6dc] px-6">
                  <WhyTravelworksIcon {...item} />
                </div>

                <div className="flex flex-1 flex-col bg-neutral-dark p-6 text-neutral-canvas">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-[1.9rem] font-medium leading-tight">{item.title}</h3>
                    <ArrowRight
                      className="mt-1 h-7 w-7 shrink-0 text-brand-orange-light"
                      strokeWidth={2.2}
                    />
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
