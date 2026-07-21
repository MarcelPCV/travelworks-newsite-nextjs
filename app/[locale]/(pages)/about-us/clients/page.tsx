import ClientsHero from '@/app/[locale]/(pages)/about-us/clients/components/clients-hero/clients-hero';
import ClientsLogoMarquee from '@/app/[locale]/(pages)/about-us/clients/components/clients-logo-marquee/clients-logo-marquee';
import TestimonialsGrid from '@/app/[locale]/(pages)/about-us/clients/components/testimonial-grid/testimonial-grid';
import VideoTestimonials from '@/app/[locale]/(pages)/about-us/clients/components/video-testimonials/video-testimonials';
import { getAlternates } from '@/app/lib/SEO/getAlternates';
import { Metadata } from 'next';
import { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Breadcrumb } from '@/app/[locale]/components/news/breadcrumb';
import type { BreadcrumbItem } from '@/app/[locale]/(pages)/news/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.about-us' });

  return {
    title: `${t('clients.title')}`,
    description: t('clients.description'),
    alternates: getAlternates(
      {
        en: '/about-us/clients',
        'en-ca': '/en-ca/about-us/clients',
        'en-au': '/en-au/about-us/clients',
        'fr-ca': '/fr-ca/a-propos/clients',
      },
      locale,
    ),
  };
}

export const clientsPageData = {
  hero: {
    title: 'More Than 1000 Travel Agencies Trust Us',
    subtitle:
      'TravelWorks powers agencies across Canada with modern accounting and back-office solutions.',
  },

  clients: [
    {
      id: 'club-voyages',
      name: 'Club Voyages',
      logo: {
        src: '/images/clients/club-voyages.webp',
        alt: 'Club Voyages',
      },
    },
    {
      id: 'selloff',
      name: 'SellOff Vacations',
      logo: {
        src: '/images/clients/selloff.webp',
        alt: 'SellOff Vacations',
      },
    },
    {
      id: 'plein-soleil',
      name: 'Voyages Plein Soleil',
      logo: {
        src: '/images/clients/plein-soleil.webp',
        alt: 'Voyages Plein Soleil',
      },
    },
    {
      id: 'vivid',
      name: 'Vivid Travel',
      logo: {
        src: '/images/clients/vivid.webp',
        alt: 'Vivid Travel',
      },
    },
    {
      id: 'marlin',
      name: 'Marlin Travel',
      logo: {
        src: '/images/clients/marlin.webp',
        alt: 'Marlin Travel',
      },
    },
    {
      id: 'thomas-cook',
      name: 'Thomas Cook',
      logo: {
        src: '/images/clients/thomas-cook.webp',
        alt: 'Thomas Cook',
      },
    },
  ],

  testimonials: [
    {
      id: '1',
      quote:
        'We have been working with TravelWorks for over 20 years. The system is easy to use and gives us centralized access to all our information.',
      author: 'Pierre Couture',
      company: 'Club Voyage Agathe Leclerc / Orford',
      logo: {
        src: '/images/clients/club-voyages.webp',
        alt: 'Club Voyages',
      },
    },

    {
      id: '2',
      quote:
        'TravelWorks is visually well designed and the accounting tools help us avoid costly mistakes while improving efficiency.',
      author: 'Chantal Lizotte',
      company: 'Club Voyages Daniel',
      logo: {
        src: '/images/clients/club-voyages.webp',
        alt: 'Club Voyages',
      },
    },

    {
      id: '3',
      quote:
        'The software significantly improved productivity by reducing manual accounting tasks and improving data integrity.',
      author: 'Manon Pellerin',
      company: 'Voyages Revasol',
      logo: {
        src: '/images/clients/revasol.webp',
        alt: 'Voyages Revasol',
      },
    },

    {
      id: '4',
      quote:
        'The web version is accessible from anywhere and the support team is always responsive and helpful.',
      author: 'Manon Lacelle-Lacroix',
      company: 'Marlin Travel',
      logo: {
        src: '/images/clients/marlin.webp',
        alt: 'Marlin Travel',
      },
    },

    {
      id: '5',
      quote:
        "TravelWorks gives us instant reporting and a complete overview of our agency's performance.",
      author: 'Hélène Boulianne',
      company: 'Plein Soleil Voyages',
      logo: {
        src: '/images/clients/plein-soleil.webp',
        alt: 'Plein Soleil Voyages',
      },
    },

    {
      id: '6',
      quote:
        'Even users with limited technical experience find the software intuitive and easy to use.',
      author: 'Nathalie Germain',
      company: 'Vitesse de Croisière',
      logo: {
        src: '/images/clients/vitesse.webp',
        alt: 'Vitesse de Croisière',
      },
    },
  ],

  videos: [
    {
      id: 'video-1',
      thumbnail: '/images/testimonials/video-1.webp',
      videoUrl: 'https://youtube.com/watch?v=example1',
      quote: "TravelWorks is the backbone of our agency. We couldn't run the business without it.",
      author: 'Agency Owner',
      company: 'Club Voyages',
    },

    {
      id: 'video-2',
      thumbnail: '/images/testimonials/video-2.webp',
      videoUrl: 'https://youtube.com/watch?v=example2',
      quote: 'The customer service is exceptional. Their team always responds quickly.',
      author: 'Agency Manager',
      company: 'Plein Soleil',
    },

    {
      id: 'video-3',
      thumbnail: '/images/testimonials/video-3.webp',
      videoUrl: 'https://youtube.com/watch?v=example3',
      quote: 'Being able to access everything from one place has transformed our operations.',
      author: 'Agency Director',
      company: 'Voyages Revasol',
    },
  ],
};

export default async function ClientsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const homeHref = locale === 'en' ? '/' : `/${locale}`;
  const t = await getTranslations('pages.about-us.clients');
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: t('breadcrumb.about-us-label'), href: t('breadcrumb.about-us-link') },
    { label: t('breadcrumb.clients-label'), href: '#' },
  ];
  return (
    <>
      <Breadcrumb items={breadcrumbItems} homeHref={homeHref} />

      <ClientsHero title={clientsPageData.hero.title} subtitle={clientsPageData.hero.subtitle} />

      <ClientsLogoMarquee clients={clientsPageData.clients} />

      <TestimonialsGrid testimonials={clientsPageData.testimonials} />

      <VideoTestimonials videos={clientsPageData.videos} />
    </>
  );
}
