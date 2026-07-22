import MenuTravelAgencySoftware from '@/app/[locale]/(pages)/travel-agency-software/components/menu-travel-agency-software/menu-travel-agency-software';

export default function TravelAgencySoftwareLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MenuTravelAgencySoftware />
      {children}
    </>
  );
}
