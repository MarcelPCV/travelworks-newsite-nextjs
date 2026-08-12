import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getCountryOptions } from '@/app/lib/countries';
import AskForDemoPageContent from '@/app/[locale]/(pages)/ask-for-a-demo/components/ask-for-demo-page-content';
import { routeToMessageLocale } from '@/app/[locale]/locale-config';
import { getAlternates } from '@/app/lib/SEO/getAlternates';
import { Metadata } from 'next';
import { Locale } from 'next-intl';
import TitleHero from '../../components/shared/title-hero/title-hero';
import YoutubeVideoSection from '@/app/[locale]/components/shared/video/youtube-video-section';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.demo-trip-details' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: getAlternates(
      {
        en: '/demo-trip-details',
        'en-ca': '/en-ca/demo-trip-details',
        'en-au': '/en-au/demo-trip-details',
        'fr-ca': '/fr-ca/demo-trip-details',
      },
      locale,
    ),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: routeLocale, locale } = await params;
  setRequestLocale(routeLocale);

  const messageLocale = routeToMessageLocale[routeLocale] ?? 'en-us';
  const countries = getCountryOptions(messageLocale);
  return (
    <main>
      <TitleHero
        title={locale === 'fr-ca' ? 'Détails du voyage' : 'Trip Details'}
        imageSrc="/images/pages/ask-for-demo/sent.webp"
      />
      <AskForDemoPageContent countries={countries} locale={messageLocale} />
      <YoutubeVideoSection
        blockType="YoutubeVideo"
        heading={
          locale === 'fr-ca'
            ? "BOOSTEZ L'EFFICACITÉ DE VOTRE AGENCE DE VOYAGE !"
            : 'BOOST THE EFFICIENCY OF YOUR TRAVEL AGENCY!'
        }
        videoId="qG8LDdvA6TE"
        channelLabel="Travelworks Showcase"
        description={
          locale === 'fr-ca'
            ? "Cette vidéo met en lumière notre collaboration avec Acme Corp, démontrant l'efficacité de notre plateforme en temps réel."
            : "This video highlights our work with Acme Corp, demonstrating our platform's efficiency in real-time."
        }
      />
    </main>
  );
}
