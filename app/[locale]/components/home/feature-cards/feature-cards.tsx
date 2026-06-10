"use client";

import Image from 'next/image';
import Link from 'next/link';
import { FeatureCardsSection, FeatureCard } from './type';
import { useTranslations } from 'next-intl';


function FeatureCards({ item }: { item: FeatureCard }) {
  return (
    <Link
      href={item.ctaHref}
      className="relative flex h-20 w-20 items-center justify-center rounded-full bg-brand-blue"
    >
      {item.image.src && (
        <div className="relative h-20 w-20 overflow-hidden rounded-full">
          <Image
            src={item.image.src ?? '/'}
            alt={item.image.alt ?? ''}
            width={80}
            height={80}
            className="h-20 w-20 object-cover"
          />
        </div>
      )}
    </Link>
  );
}

export default function IconsFeatures() {
  const t = useTranslations('home.features-cards');

const featureCardsData: FeatureCardsSection = {
  title: String(t.raw('title')),
  items: [
    {
      id: '0',
      title: t('items.backoffice-tools.title'),
      ctaHref: '/feature-1',
      image: {
        src: '/images/components/feature-cards/feature_strategic_management_tool.gif',
        alt: 'Feature 1',
        width: 400,
        height: 300,
      },
    },
    {
      id: '1',
      title: t('items.reservation-management.title'),
      ctaHref: '/feature-1',
      image: {
        src: '/images/components/feature-cards/feature_strategic_management_tool.gif',
        alt: 'Feature 1',
        width: 400,
        height: 300,
      },
    },
    {
      id: '2',
      title: t('items.strategic-management-tool.title'),
      ctaHref: '/feature-1',
      image: {
        src: '/images/components/feature-cards/feature_strategic_management_tool.gif',
        alt: 'Feature 1',
        width: 400,
        height: 300,
      },
    },
    {
      id: '3',
      title: t('items.tour-management.title'),
      ctaHref: '/feature-1',
      image: {
        src: '/images/components/feature-cards/feature_strategic_management_tool.gif',
        alt: 'Feature 1',
        width: 400,
        height: 300,
      },
    },
    {
      id: '4',
      title: t('items.online-tour-booking.title'),
      ctaHref: '/feature-1',
      image: {
        src: '/images/components/feature-cards/feature_strategic_management_tool.gif',
        alt: 'Feature 1',
        width: 400,
        height: 300,
      },
    },
    {
      id: '5',
      title: t('items.crm-tools.title'),
      ctaHref: '/feature-1',
      image: {
        src: '/images/components/feature-cards/feature_strategic_management_tool.gif',
        alt: 'Feature 1',
        width: 400,
        height: 300,
      },
    },
    {
      id: '6',
      title: t('items.multiple-integration.title'),
      ctaHref: '/feature-1',
      image: {
        src: '/images/components/feature-cards/feature_strategic_management_tool.gif',
        alt: 'Feature 1',
        width: 400,
        height: 300,
      },
    }
  ]
}

  return (
    <section className='w-full rounded-2xl bg-[#e7e7e7] px-5 py-10 sm:px-8 lg:px-10' aria-labelledby="technology-features-heading">
      {featureCardsData.title && (
         <h2 dangerouslySetInnerHTML={{ __html: featureCardsData.title }} className="text-center text-3xl font-medium uppercase tracking-tight text-brand-blue sm:text-4xl"/>
      )}

      <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-10">
         {featureCardsData.items.map((featureCard) => {
           return (
            <article
               key={featureCard.id}
               className="flex w-[calc(50%-0.75rem)] max-w-44 flex-col items-center text-center sm:w-[calc(33.333%-1.3rem)] md:w-[calc(20%-1.5rem)] xl:w-[calc(14.285%-1.7rem)]"
             >
              <FeatureCards item={featureCard} />
              <p className="mt-3 max-w-[12ch] text-md font-medium leading-tight text-brand-blue">{featureCard.title}</p>
             </article>
           );
         })}
       </div>
      <Link href="">

      </Link>
    </section>
  );
}
