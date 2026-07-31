import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getCountryOptions } from '@/app/lib/countries';
import AskForDemoPageContent from '@/app/[locale]/(pages)/ask-for-a-demo/components/ask-for-demo-page-content';
import { routeToMessageLocale } from '@/app/[locale]/locale-config';
import FeatureCards from '@/app/[locale]/(pages)/(home)/components/feature-cards/feature-cards';
import { getAlternates } from '@/app/lib/SEO/getAlternates';
import { Metadata } from 'next';
import { Locale } from 'next-intl';
import TitleHero from '../../components/shared/title-hero/title-hero';
import YoutubeVideoSection  from '@/app/[locale]/components/shared/video/youtube-video-section';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.ask-for-a-demo' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: getAlternates(
      {
        en: '/ask-for-a-demo',
        'en-ca': '/en-ca/ask-for-a-demo',
        'en-au': '/en-au/ask-for-a-demo',
        'fr-ca': '/fr-ca/demander-une-demo',
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
        title={locale === 'fr-ca' ? 'Demander une démo' : 'Ask for a demo'}
        imageSrc="/images/pages/ask-for-demo/sent.webp"
      />
      <AskForDemoPageContent countries={countries} locale={messageLocale} />
      <YoutubeVideoSection
        blockType="YoutubeVideo"
        heading={locale === 'fr-ca' ? 'BOOSTEZ L\'EFFICACITÉ DE VOTRE AGENCE DE VOYAGE !' : 'BOOST THE EFFICIENCY OF YOUR TRAVEL AGENCY!'}
        videoId="qG8LDdvA6TE"
        channelLabel="Travelworks Showcase"
        description={locale === 'fr-ca' ? "Cette vidéo met en lumière notre collaboration avec Acme Corp, démontrant l'efficacité de notre plateforme en temps réel." : "This video highlights our work with Acme Corp, demonstrating our platform's efficiency in real-time."}
      />
    </main>
  );
}
