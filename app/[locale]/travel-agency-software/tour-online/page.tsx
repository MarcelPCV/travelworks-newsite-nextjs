import { getTranslations, setRequestLocale } from "next-intl/server";
import { TourOnlinePageData } from "./data";
import PageHero from "../../components/shared/page-hero/page-hero";
import SplitSection from "../../components/shared/SplitSection/SplitSection";
import ImageBlock from "../../components/shared/image-block/image-block";
import TourOnlineCTA from "../../components/shared/touronline-cta/touronline-ctba";

export default async function Page({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations('pages.travel-agency-software.tour-online');

	return (
		<main>
			{TourOnlinePageData.layout.map((layout, index) => {
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
								heading={typeof layout.heading === 'string' ? t(layout.heading) : ''}
								description={
									layout.description
										? t.rich(layout.description as string, {
												p: (chunks) => (
													<p className="mb-4 last:mb-0">
														{chunks}
													</p>
												),
												strong: (chunks) => <strong>{chunks}</strong>,
											})
										: ""
								}
								imageSrc={typeof layout.imageSrc === 'string' ? t(layout.imageSrc) : ''}
								imageAlt={typeof layout.imageAlt === 'string' ? t(layout.imageAlt) : ''}
								ctaLabel={typeof layout.ctaLabel === 'string' ? t(layout.ctaLabel) : ''}
								ctaLink={typeof layout.ctaLink === 'string' ? t(layout.ctaLink) : ''}
							/>
						);
					case "ImageBlock":
						return (
							<ImageBlock
								key={index}
								{...layout}
								title={layout.title ? t(layout.title) : ''}
								description={
									layout.description
										? t.rich(layout.description as string, {
												strong: (chunks) => <strong>{chunks}</strong>,
											})
										: ''
								}
								imageSrc={layout.imageSrc ? t(layout.imageSrc) : ''}
								altText={layout.altText ? t(layout.altText) : ''}
								linkHref={layout.linkHref ? t(layout.linkHref) : ''}
								linkText={layout.linkText ? t(layout.linkText) : ''}
								widthPercentage={layout.widthPercentage}
								hasCaption={layout.hasCaption}
								captionText={layout.captionText ? t(layout.captionText) : ''}
							/>);
					case "TourOnlineCTAArea":
						return (
							<TourOnlineCTA
								key={index}
								{...layout}
								imageSrc={layout.imageSrc ? t(layout.imageSrc) : ''}
								imageAlt={layout.imageAlt ? t(layout.imageAlt) : ''}
								ctaLink={layout.ctaLink ? t(layout.ctaLink) : ''}
								ctaText={layout.ctaText ? t(layout.ctaText) : ''}
							/>
						);
					default:
						return null;
				}
			})}
		</main>
	);
}
