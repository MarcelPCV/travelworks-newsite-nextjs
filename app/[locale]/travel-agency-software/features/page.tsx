import FeaturesHeroSection from "../../components/shared/page-hero/page-hero";
import IntroSection from "../../components/intro-section";

export default async function Page() {

	return (
		<main>
			<FeaturesHeroSection
				heading="Discover the Power of TravelWorks"
				description="Experience how our cutting-edge solutions can transform your travel business."
				mobileTopImageSrc="/images/hero-mobile.jpg"
				desktopMainImageSrc="/images/hero-desktop.jpg"
				logoImageSrc="/images/travelworks-logo.png"
				ctaImageSrc="/images/cta-image.png"
				className="mt-10 border-blue-500/50"
			/>
			<IntroSection
				eyebrow="Why Choose TravelWorks?"
				heading="Empowering Your Travel Business with Innovative Solutions"
				description="Our platform offers a suite of tools designed to streamline operations, enhance customer experiences, and drive growth."
				imageSrc="/images/intro-image.jpg"
				imageAlt="TravelWorks platform overview"
				imagePosition = 'left'
			/>
		</main>
	);
}
