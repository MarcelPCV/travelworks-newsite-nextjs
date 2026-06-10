"use client";

import {
  ArrowRight,
  CircleDollarSign,
  Cloud,
  Network,
  Users,
} from 'lucide-react';
import { WhyTravelworksItem } from './type';
import { useTranslations } from 'next-intl';


function WhyTravelworksIcon({ item }: { item: WhyTravelworksItem }) {
  const Icon = item.iconComponent ?? CircleDollarSign;

  if (item.icon) {
    return <div className="h-20 w-20 [&>svg]:h-full [&>svg]:w-full">{item.icon}</div>;
  }

  return <Icon className="h-20 w-20 text-brand-orange-dark" strokeWidth={1.7} />;
}

export default function WhyTravelworksSection() {
  const t = useTranslations('home.why-travelworks');

  const whyItems: WhyTravelworksItem[] = [
    {
      id: 0,
      title: t('optimize.title'),
      description: t('optimize.description'),
      iconComponent: CircleDollarSign,
    },
    {
      id: 1,
      title: t('gds.title'),
      description: t('gds.description'),
      iconComponent: Network,
    },
    {
      id: 2,
      title: t('cloud.title'),
      description: t('cloud.description'),
      iconComponent: Cloud,
    },
    {
      id: 3,
      title: t('crm.title'),
      description: t('crm.description'),
      iconComponent: Users,
    },
  ];

  return (
    <section className="w-full mx-auto max-w-7xl rounded-2xl bg-neutral-background py-8" aria-labelledby="why-travelworks-heading">
      {t('title') && (
         <h2 dangerouslySetInnerHTML={{ __html: t('title') }} className="text-center text-3xl font-medium uppercase tracking-tight text-brand-blue sm:text-4xl"/>
      )}

      <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-neutral-border sm:grid-cols-2 xl:grid-cols-4">
        {whyItems.map((item) => {
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