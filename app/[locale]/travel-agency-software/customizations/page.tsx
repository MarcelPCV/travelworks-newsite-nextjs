import FeaturesHeroSection from "../../components/shared/page-hero/page-hero";

export default async function Page() {

	return (
		<main>
			<FeaturesHeroSection
				blockType="PageHero"
				title="Customizations"
				description="We work with you to meet your needs"
				mobileTopImageSrc="/images/pages/travel-agency-software/customizations/background-portfolio-customization.webp"
				desktopMainImageSrc="/images/pages/travel-agency-software/customizations/background-portfolio-customization.webp"
				logoImageSrc=""
				ctaImageSrc="/images/pages/travel-agency-software/features/30-logo-en.svg"
			/>
		</main>
	);
}
