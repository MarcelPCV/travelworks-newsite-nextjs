import { getTranslations, setRequestLocale } from "next-intl/server";
import { IntegrationsPageData } from "./data";
import PageHero from "../../components/shared/page-hero/page-hero";
import ImageBlock from "../../components/shared/image-block/image-block";
import ImageHappyLearning from "../../components/pages-elements/happy-learning/happy-learning";
import ComparisonCard from "../../components/shared/comparison-training/comparison-training";
import ExpertProfile from "../../components/shared/training-experts/training-experts";

export default async function Page({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations('pages.training.knowledge-base');

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
					case "ImageBlock":
						return (
							<ImageBlock
								key={index}
								{...layout}
								title={layout.title ? t(layout.title) : ''}
								description={
									layout.description
										? t.rich(layout.description as string, {
											strong: (chunks) => (
													<strong className="text-blue-800">
														{chunks}
													</strong>
												),
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
					case "ImageHappyLearning":
						return (
							<ImageHappyLearning
								key={index}
								{...layout}
								title={layout.title ? t(layout.title) : ''}
								imageSrc={layout.imageSrc ? t(layout.imageSrc) : ''}
								altText={layout.altText ? t(layout.altText) : ''}
								widthPercentage={layout.widthPercentage}
							/>);
					default:
						return null;
				}
			})}
			<ComparisonCard/>
			<ExpertProfile/>
		</main>
	);
}
