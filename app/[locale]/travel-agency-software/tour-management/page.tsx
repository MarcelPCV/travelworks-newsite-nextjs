import { getTranslations, setRequestLocale } from "next-intl/server";
import { IntegrationsPageData } from "./data";
import PageHero from "../../components/shared/page-hero/page-hero";
import CardsIconsSection from "../../components/shared/cards-icons/cards-icons";

export default async function Page({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations('pages.travel-agency-software.tour-management');

	return (
		<main>
			{IntegrationsPageData.layout.map((layout, index) => {
				switch (layout.blockType) {
					case "PageHero":
						return (
							<PageHero
								key={index}
								{...layout}
								title={layout.title ? t(layout.title) : ''}
								description={layout.description ? t(layout.description) : ''}
								mobileTopImageSrc={layout.mobileTopImageSrc ? t(layout.mobileTopImageSrc) : ''}
								desktopMainImageSrc={layout.desktopMainImageSrc ? t(layout.desktopMainImageSrc) : ''}
								logoImageSrc={layout.logoImageSrc ? t(layout.logoImageSrc) : ''}
								ctaImageSrc={layout.ctaImageSrc ? t(layout.ctaImageSrc) : ''}
							/>);
					case "CardsIcons":
						return (
							<CardsIconsSection
								key={index}
								{...layout}
								title={layout.title ? t(layout.title) : ''}
								cards={layout.cards ? layout.cards.map(card => ({
									...card,
									title: card.title ? t(card.title) : '',
									description: card.description ? t(card.description) : ''
								})) : []}
							/>
						);
					default:
						return null;
				}
			})}
		</main>
	);
}
