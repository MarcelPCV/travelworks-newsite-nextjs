import MenuAboutUs from '@/app/[locale]/(pages)/about-us/components/menu-about-us/menu-about-us';

export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MenuAboutUs />
      {children}
    </>
  );
}
