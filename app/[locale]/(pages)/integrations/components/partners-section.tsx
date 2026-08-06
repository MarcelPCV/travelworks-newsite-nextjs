import TitleSection from '@/app/[locale]/components/ui/title-section';
import PartnerCard from './partner-card';
import { PartnersSectionModel } from './types';

export default function PartnersSection({
  title,
  partners,
  bgClass,
}: PartnersSectionModel & { bgClass?: string }) {
  return (
    <section className={`my-6 py-10 ${bgClass ?? ''}`}>
      {title && (
        <TitleSection title={title} alignment="center" size="large" color="text-brand-blue" />
      )}

      <div className="max-w-[1600px] mx-auto flex flex-wrap justify-center gap-4">
        {partners.map((partner) => (
          <div key={partner.name} className="basis-[calc(50%-0.5rem)] md:basis-[260px] grow-0">
            <PartnerCard partner={partner} />
          </div>
        ))}
      </div>
    </section>
  );
}
