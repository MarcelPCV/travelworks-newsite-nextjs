import FeaturesHeroSection from "../../components/shared/page-hero/page-hero";

export default async function Page() {

	return (
		<main>
			<FeaturesHeroSection
				blockType="PageHero"
				title="Real-time activity dashboard"
				description="A dashboard displays for all users in real time their key information and important deadlines."
				mobileTopImageSrc="/images/pages/travel-agency-software/dashboard-reports/slider_wide.webp"
				desktopMainImageSrc="/images/pages/travel-agency-software/dashboard-reports/slider_wide.webp"
				logoImageSrc=""
				ctaImageSrc=""
			/>
		</main>
	);
}
