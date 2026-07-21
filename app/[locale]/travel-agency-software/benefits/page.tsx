import { getTranslations } from 'next-intl/server';
import FeatureSection from './components/section';
import { Cloud, Zap, BarChart3, Shield, Lightbulb, BadgeCheck, Rocket } from 'lucide-react';
import { getAlternates } from '@/app/lib/SEO/getAlternates';
import { Metadata } from 'next';
import { Locale } from 'next-intl';
import { Breadcrumb } from '../../components/news/breadcrumb';
import type { BreadcrumbItem } from '@/app/[locale]/news/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.travel-agency-software' });

  return {
    title: `${t('benefits.title')}`,
    description: t('benefits.description'),
    alternates: getAlternates(
      {
        en: '/travel-agency-software/benefits',
        'en-ca': '/en-ca/travel-agency-software/benefits',
        'en-au': '/en-au/travel-agency-software/benefits',
        'fr-ca': '/fr-ca/logiciel-agence-voyage/avantages',
      },
      locale,
    ),
  };
}

export default async function TravelWorksFeatures({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const sections = [
    {
      id: 'cloud',
      title: 'Cloud Based',
      icon: Cloud,
      image: '/images/pages/travel-agency-software/benefits/secure.webp',
      points: [
        {
          title: 'Easy Web Access',
          description: 'Access your system anywhere from any device with an internet connection.',
        },
        {
          title: 'No IT Staff',
          description: 'Avoid costly infrastructure and maintenance requirements.',
        },
        {
          title: 'No Backups to Think About',
          description: 'Automatic backups ensure your information remains protected.',
        },
        {
          title: 'No Updates to Manage',
          description: 'Updates are deployed automatically without interrupting your workflow.',
        },
      ],
    },
    {
      id: 'efficient',
      title: 'Efficient',
      icon: Zap,
      image: '/images/pages/travel-agency-software/benefits/secure.webp',
      points: [
        {
          title: 'No Lag',
          description: 'Fast response times help your team work more effectively.',
        },
        {
          title: 'Easy to Use',
          description: 'Designed to minimize training time and increase productivity.',
        },
        {
          title: 'Reduce Administrative Tasks',
          description: 'Automate repetitive work and focus on serving customers.',
        },
      ],
    },
    {
      id: 'scalable',
      title: 'Scalable',
      icon: BarChart3,
      image: '/images/pages/travel-agency-software/benefits/secure.webp',
      points: [
        {
          title: 'Designed for Your Travel Agency Size',
          description: 'Supports both small agencies and larger organizations.',
        },
        {
          title: 'No Worries to Grow',
          description: 'Scale confidently as your business expands.',
        },
      ],
    },
    {
      id: 'secure',
      title: 'Secure',
      icon: Shield,
      image: '/images/pages/travel-agency-software/benefits/secure.webp',
      points: [
        {
          title: 'Optimized Data',
          description: 'Hosted in secure environments with automatic monitoring.',
        },
        {
          title: 'Confidentiality',
          description: 'User permissions and access controls protect sensitive data.',
        },
      ],
    },
    {
      id: 'smart',
      title: 'Smart',
      icon: Lightbulb,
      image: '/images/pages/travel-agency-software/benefits/secure.webp',
      points: [
        {
          title: 'Intuitive Interface',
          description: 'A modern experience that is easy to learn and navigate.',
        },
        {
          title: 'Advanced Search',
          description: 'Find information quickly with powerful search tools.',
        },
        {
          title: 'Customizable',
          description: 'Configure the software to match your workflow.',
        },
      ],
    },
    {
      id: 'reliable',
      title: 'Reliable',
      icon: BadgeCheck,
      image: '/images/pages/travel-agency-software/benefits/secure.webp',
      points: [
        {
          title: 'Real-Time Data',
          description: 'Work with accurate information across your organization.',
        },
        {
          title: 'Everything Synchronized',
          description: 'Changes are reflected instantly throughout the platform.',
        },
      ],
    },
    {
      id: 'evolutionary',
      title: 'Evolutionary',
      icon: Rocket,
      image: '/images/pages/travel-agency-software/benefits/secure.webp',
      points: [
        {
          title: 'Built for the Future',
          description: 'Continuous improvements keep your agency ahead of industry changes.',
        },
      ],
    },
  ];

  const { locale } = await params;
  const homeHref = locale === 'en' ? '/' : `/${locale}`;
  const t = await getTranslations('pages.travel-agency-software.benefits');

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: t('breadcrumb.features-label'), href: t('breadcrumb.features-link') },
    { label: t('breadcrumb.benefits-label'), href: '#' },
  ];

  return (
    <div className="scroll-smooth">
      <Breadcrumb items={breadcrumbItems} homeHref={homeHref} />
      {/* Hero */}
      <section className="bg-[#005ea8] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="text-center text-sm uppercase tracking-[4px] opacity-80">
            A Well-Proven Solution Tailored To
          </p>

          <h1 className="mt-2 text-center text-4xl font-bold">Travel Agency Management</h1>
        </div>
      </section>

      {/* Section Navigation: visible on all screens, sticky on desktop only */}
      <div className="border-b bg-[#005ea8]/95 text-white backdrop-blur lg:sticky lg:top-16 lg:z-30">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-center justify-center gap-8 py-4">
            {sections.map((section) => {
              const Icon = section.icon;

              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="group flex flex-col items-center gap-2 transition hover:scale-105"
                >
                  <Icon className="h-7 w-7 text-orange-400" />
                  <span className="text-sm">{section.title}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div>
        {sections.map((section, index) => (
          <FeatureSection key={section.id} {...section} reverse={index % 2 !== 0} />
        ))}
      </div>
    </div>
  );
}
