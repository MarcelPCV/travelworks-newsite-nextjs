import FeaturesHeroSection from "../../components/shared/page-hero/page-hero";

export default async function Page() {

	return (
		<main>
			<FeaturesHeroSection
				blockType="PageHero"
				title=""
				description="An online B2B/B2C booking website engine for your travel product portfolio."
				mobileTopImageSrc="/images/pages/travel-agency-software/tour-online/slider_wide.webp"
				desktopMainImageSrc="/images/pages/travel-agency-software/tour-online/slider_wide.webp"
				logoImageSrc="/images/pages/travel-agency-software/tour-online/TourOnline-logo-En.svg"
				ctaImageSrc="/images/pages/travel-agency-software/tour-online/b2b-b2c.svg"
			/>
		</main>
	);
}
