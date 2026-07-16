import MenuAboutUs from '@/app/[locale]/components/layout/menu-about-us/menu-about-us';

export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<MenuAboutUs />
			{children}
		</>
	);
}

