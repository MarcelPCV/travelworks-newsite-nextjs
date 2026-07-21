import MenuTravelAgencySoftware from '@/app/[locale]/components/layout/menu-travel-agency-software/menu-travel-agency-software';

export default function TravelAgencySoftwareLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MenuTravelAgencySoftware />
      {children}
    </>
  );
}
