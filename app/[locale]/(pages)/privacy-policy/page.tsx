import Link from 'next/link';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { ArrowRight, FileText } from 'lucide-react';
import TitleHero from '@/app/[locale]/components/shared/title-hero/title-hero';

function getPrivacyPath(locale: string, child: string): string {
  const parent = locale === 'fr' ? '/fr/politique-de-confidentialite' : locale === 'en-au' ? '/en-au/privacy-policy' : '/privacy-policy';
  return `${parent}/${child}`;
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isFrench = locale === 'fr';
  const options = [
    {
      label: isFrench ? 'PcVoyages - Politique de Confidentialité' : 'TravelWorks - Privacy Policy',
      href: getPrivacyPath(locale, 'travelworks'),
    },
    {
      label: isFrench ? "Trip'n touch - Politique de Confidentialité" : "Trip'n touch - Privacy Policy",
      href: getPrivacyPath(locale, 'trip-n-touch'),
    },
    {
      label: isFrench ? "Trip'n touch - Cookies" : "Trip'n touch - Cookies",
      href: getPrivacyPath(locale, 'trip-n-touch/cookies'),
    },
  ];

  return (
    <main>
      <TitleHero title={isFrench ? 'Politiques de confidentialité' : 'Privacy Policies'} imageSrc="/images/pages/privacy-policy/privacy-policy.png" />
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2">
          {options.map((option) => (
            <Link
              key={option.href}
              href={option.href}
              className="min-h-[120px] flex items-center justify-between rounded-md border-2 border-gray-200 bg-gray-100 px-5 py-4 font-bold text-brand-blue transition-colors hover:border-zinc-200 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            >
              <span className="flex items-center">
                <FileText className="h-8 w-8 text-brand-blue mr-2" aria-hidden="true" />
                {option.label}
              </span>
              <ArrowRight className="h-5 w-5 text-orange-600" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
