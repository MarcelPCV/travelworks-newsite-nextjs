import PartnerCard from './partner-card';
import { PartnersSectionModel } from './types';

export default function PartnersSection({ title, partners }: PartnersSectionModel) {
  return (
    <section className="mb-16">
      <h2 className="mb-8 text-center text-sm font-semibold uppercase tracking-widest text-blue-700">
        {title}
      </h2>

      <div className="flex flex-wrap justify-center gap-4">
        {partners.map((partner) => (
          <div key={partner.name} className="basis-[calc(50%-0.5rem)] md:basis-[220px] grow-0">
            <PartnerCard partner={partner} />
          </div>
        ))}
      </div>
    </section>
  );
}
