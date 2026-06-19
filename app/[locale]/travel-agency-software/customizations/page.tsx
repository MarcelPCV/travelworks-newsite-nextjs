import { getTranslations, setRequestLocale } from "next-intl/server";
import { CustomizationsPage } from "./data";
import PageHero from "../../components/shared/page-hero/page-hero";
import SplitSection from "../../components/shared/SplitSection/SplitSection";
import YoutubeVideoSection from "../../components/shared/video/youtube-video-section";

export default async function Page({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations('pages.travel-agency-software.customizations');

	return (
		<main>
			{CustomizationsPage.layout.map((layout, index) => {
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
					case "SplitSection":
						return (
							<SplitSection
								key={index}
								{...layout}
								heading={layout.heading ? t(layout.heading) : ''}
								description={
									layout.description
										? t.rich(layout.description as string, {
												strong: (chunks) => <strong>{chunks}</strong>,
											})
										: ''
								}
								imageSrc={layout.imageSrc ? t(layout.imageSrc) : ''}
								imageAlt={layout.imageAlt ? t(layout.imageAlt) : ''}
							/>
						);
					case "YoutubeVideo":
						return (
							<YoutubeVideoSection
								key={index}
								{...layout}
								heading={layout.heading ? t(layout.heading) : ''}
								videoId={layout.videoId ? t(layout.videoId) : ''}
								channelLabel={layout.channelLabel ? t(layout.channelLabel) : ''}
								description={layout.description ? t(layout.description) : ''}
							/>
						);
					default:
						return null;
				}
			})}
		</main>
	);
}
