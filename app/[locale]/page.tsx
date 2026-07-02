import { getTranslations, setRequestLocale } from "next-intl/server";
import { HomePage } from "./data";
import NewsTickerBar from "./components/home/news-ticker/news-ticker-bar";
import HeroCarousel from "./components/home/hero-carousel/hero-carousel";
import FeatureCards from "./components/home/feature-cards/feature-cards";
import PlatformShowcase from "./components/home/platform-showcase/platform-showcase";
import WhyTravelworks from "./components/home/why/why-travelworks-section";
import BenefitsBanner from "./components/home/benefits-banner/benefits-banner";
import ClientTrustSection from "./components/home/clients-section/client-trust-section";
import PlanningDemoSection from "./components/home/demo-section/planning-demo-section";
import { getCountryOptions } from '@/app/lib/countries';
import { routeToMessageLocale } from './locale-config';

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: routeLocale } = await params;
  const t = await getTranslations('pages.home');
  setRequestLocale(routeLocale);
  const messageLocale = routeToMessageLocale[routeLocale] ?? 'en-us';
  const countries = getCountryOptions(messageLocale);

  return (
    <main>
      <h1 className="sr-only">
        {'Home'}
      </h1>
      {HomePage.layout.map((layout, index) => {
        switch (layout.blockType) {
          case "BenefitsBanner":
            return (
              <BenefitsBanner
                key={index}
                {...layout}
                heading={layout.heading ? t(layout.heading) : ''}
                items={layout.items ? layout.items.map(item => ({
                  ...item,
                  label: t(item.label),
                })) : []}
                buttonLabel={layout.buttonLabel ? t(layout.buttonLabel) : ''}
                buttonHref={layout.buttonHref ? t(layout.buttonHref) : ''}
                hideButton={layout.hideButton}
                imagePlaceholderLabel={layout.imagePlaceholderLabel ? t(layout.imagePlaceholderLabel) : ''}
              />);
          case "NewsTicker":
            return (
              <NewsTickerBar
                key={index}
                {...layout}
                sectionTitle={layout.sectionTitle ? t(layout.sectionTitle) : ''}
                newsLabel={layout.newsLabel ? t(layout.newsLabel) : ''}
                newsCtaHref={layout.newsCtaHref ? t(layout.newsCtaHref) : ''}
                phone={layout.phone ? t(layout.phone) : ''}
              />);
          case "HeroCarousel":
            return (
              <HeroCarousel
                key={index}
                blockType={layout.blockType}
                effect={layout.effect}
                navigation={layout.navigation}
                pagination={layout.pagination}
                contentAlignment={layout.contentAlignment}
                slides={layout.slides.map((slide) => {
                  const translatedTitle = slide.title
                    ? t.markup(slide.title, {
                        strong: (chunks) => chunks,
                      })
                    : '';
                  const translatedHref = slide.ctaHref ? t(slide.ctaHref) : '';
                  const translatedImage = slide.image ? t(slide.image) : '';

                  return {
                    ...slide,
                    titleRich: slide.title
                      ? t.rich(slide.title, {
                          strong: (chunks) => <strong>{chunks}</strong>,
                        })
                      : undefined,
                    titlePlain: translatedTitle,
                    ctaLabel: slide.ctaLabel ? t(slide.ctaLabel) : '',
                    ctaHref: translatedHref || '#',
                    image:
                      translatedImage || '/images/components/hero-carousel/hero.png',
                  };
                })}
              />);
          case "FeatureCards":
            return (
              <FeatureCards
                key={index}
                {...layout}
                title={
                  layout.title
                    ? (typeof layout.title === 'string'
                        ? t.rich(layout.title, {
                            span: (chunks) => <span>{chunks}</span>,
                            strong: (chunks) => <strong>{chunks}</strong>,
                          })
                        : layout.title)
                    : ''
                }
                items={layout.items.map((item) => ({
                  ...item,
                  title: item.title ? t(item.title) : '',
                  ctaHref: item.ctaHref || '#',
                  image: {
                    ...item.image,
                    alt: item.image.alt || '',
                  }
                }))}
              />);
          case "PlatformShowcase":
            return (
              <PlatformShowcase
                key={index}
                {...layout}
                title={
                  layout.title
                    ? (typeof layout.title === 'string'
                        ? t.rich(layout.title, {
                            span: (chunks) => <span>{chunks}</span>,
                            strong: (chunks) => <strong>{chunks}</strong>,
                          })
                        : layout.title)
                    : ''
                }
                description={
                  layout.description
                    ? (typeof layout.description === 'string'
                        ? t.rich(layout.description, {
                            span: (chunks) => <span>{chunks}</span>,
                            strong: (chunks) => <strong>{chunks}</strong>,
                          })
                        : layout.description)
                    : ''
                }
                mainImage={layout.mainImage ? t(layout.mainImage) : ''}
                secondaryImage={layout.secondaryImage ? t(layout.secondaryImage) : ''}
              />
            );
          case "WhyTravelworksSection":
            return (
              <WhyTravelworks
                key={index}
                {...layout}
                title={layout.title ? t(layout.title) : ''}
                items={layout.items ? layout.items.map((item) => ({
                  ...item,
                  title:
                    typeof item.title === 'string'
                      ? t.rich(item.title, {
                          strong: (chunks) => <strong>{chunks}</strong>,
                        })
                      : item.title,
                  description: item.description ? t(item.description) : '',
                })) : []}
              />);
          case "ClientTrustSection":
            return (
              <ClientTrustSection
                key={index}
                {...layout}
                title={
                  layout.title
                    ? (typeof layout.title === 'string'
                        ? t.rich(layout.title, {
                            strong: (chunks) => <strong>{chunks}</strong>,
                          })
                        : layout.title)
                    : ''
                }
                clients={layout.clients ? layout.clients.map((client) => ({
                  ...client,
                  name: client.name,
                  logo: client.logo,
                })) : []}
              />);
          default:
            return null;
        }
      })}

      <div className="flex w-full flex-col gap-4 py-2">
        <PlanningDemoSection
          countries={countries}
          locale={messageLocale}
        />
      </div>
    </main>
  );
}

