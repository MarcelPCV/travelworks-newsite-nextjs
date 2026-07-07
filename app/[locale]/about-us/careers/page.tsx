import { getTranslations, setRequestLocale } from 'next-intl/server';
import { TourOnlinePageData } from './data';
import PageHero from '../../components/shared/page-hero/page-hero';
import TextSectionComp from '../../components/shared/text-section-comp/text-section-comp';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.about-us.careers');

  return (
    <main>
      {TourOnlinePageData.layout.map((layout, index) => {
        switch (layout.blockType) {
          case 'PageHero':
            return (
              <PageHero
                key={index}
                {...layout}
                title={layout.title ? t(layout.title) : ''}
                description={layout.description ? t(layout.description) : ''}
                mobileTopImageSrc={layout.mobileTopImageSrc ? t(layout.mobileTopImageSrc) : ''}
                desktopMainImageSrc={
                  layout.desktopMainImageSrc ? t(layout.desktopMainImageSrc) : ''
                }
                logoImageSrc={layout.logoImageSrc ? t(layout.logoImageSrc) : ''}
                ctaImageSrc={layout.ctaImageSrc ? t(layout.ctaImageSrc) : ''}
              />
            );
          case 'TextSection':
            return (
              <TextSectionComp
                key={index}
                {...layout}
                description={
                  layout.description
                    ? t.rich(layout.description as string, {
                        p: (chunks: React.ReactNode) => <p className="my-5">{chunks}</p>,
                        strong: (chunks: React.ReactNode) => <strong>{chunks}</strong>,
                        a: (chunks: React.ReactNode) => (
                          <a href="mailto:career@travelworkssolution.com">{chunks}</a>
                        ),
                      })
                    : ''
                }
              />
            );
          default:
            return null;
        }
      })}
    </main>
  );
}
