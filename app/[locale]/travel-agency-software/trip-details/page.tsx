import FeaturesHeroSection from "../../components/shared/page-hero/page-hero";

export default async function Page() {

	return (
		<main>
			<FeaturesHeroSection
				blockType="PageHero"
				title=""
				description="Introducing TravelWorks' Trip-Itinerary Software, designed to connect your clients with the adventure."
				mobileTopImageSrc="/images/pages/travel-agency-software/trip-details/hero-image.webp"
				desktopMainImageSrc="/images/pages/travel-agency-software/trip-details/hero-image.webp"
				logoImageSrc="/images/pages/travel-agency-software/trip-details/trip-details.png"
				ctaImageSrc=""
			/>
		</main>
	);
}
