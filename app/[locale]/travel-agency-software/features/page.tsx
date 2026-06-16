import PageHero from "../../components/shared/page-hero/page-hero";
import IntroSection from "../../components/intro-section";
import FeaturesMasonrySection from "../../components/shared/features-masonry-section/features-masonry-section";
import YoutubeVideoSection from "../../components/shared/video/youtube-video-section";
import ComparisonSolutionSection from "../../components/shared/comparison-solution-section/comparison-solution-section";
import { FeaturesPage } from "./data";
import { getTranslations } from "next-intl/server";

export default async function Page() {
	const t = await getTranslations('pages.travel-agency-software.features');
	return (
		<main>
			{FeaturesPage.layout.map((layout, index) => {
				switch (layout.blockType) {
					case "PageHero":
						return (
							<PageHero 
								key={index}
								{...layout}
								title={layout.title ? t(layout.title) : ''}
                description={layout.description ? t(layout.description) : ''}
							/>);
					default:
						return null;
				}
			})}
			<IntroSection
				heading="Powerful and smart tools"
				description="Travel agency accounting needs are quite particular. Our system is designed to cover all aspects of the business. TravelWorks has the tools that will help you increase productivity, improve customer service and generate profitability."
				imageSrc="/images/pages/travel-agency-software/features/features-en.webp"
				imageAlt="TravelWorks platform overview"
				imagePosition = 'left'
			/>
			<FeaturesMasonrySection />
			<YoutubeVideoSection
				heading="See Our Latest Client Success Story"
				videoId="qG8LDdvA6TE"
				channelLabel="Travelworks Showcase"
				description="This video highlights our work with Acme Corp, demonstrating our platform's efficiency in real-time."
				className="mt-10 border-red-500/50" // Example of custom class override
			/>
			<ComparisonSolutionSection/>
		</main>
	);
}
