import { Mail, MapPin, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';

type OfficeCardProps = {
  officeKey: 'northAmerica' | 'australia' | 'unitedKingdom';
};

function OfficeCard({ officeKey }: OfficeCardProps) {
  const t = useTranslations('pages.about-us.contact.offices');

  return (
    <article className="space-y-2 pb-5">
      <h4 className="text-[1.25rem] font-semibold uppercase text-brand-blue">
        {t(`${officeKey}.region`)}
      </h4>
      <p className="text-[1rem] font-semibold uppercase text-brand-blue">
        {t(`${officeKey}.office`)}
      </p>
      <p className="text-[0.95rem] leading-relaxed text-slate-700">{t(`${officeKey}.address`)}</p>

      <div className="space-y-1 pt-1 text-[0.95rem]">
        <p className="flex items-center gap-2 text-brand-blue">
          <Phone className="h-4 w-4" />
          <span>{t(`${officeKey}.phone1`)}</span>
        </p>

        {t(`${officeKey}.phone2`) && (
          <p className="flex items-center gap-2 text-brand-blue">
            <Phone className="h-4 w-4" />
            <span>{t(`${officeKey}.phone2`)}</span>
          </p>
        )}

        <p className="flex items-center gap-2 text-brand-blue">
          <Mail className="h-4 w-4" />
          <span>{t(`${officeKey}.email`)}</span>
        </p>
      </div>
    </article>
  );
}

export default function OfficeCards() {
  const t = useTranslations('pages.about-us.contact.offices');

  return (
    <aside className="rounded-md bg-white p-6 shadow-sm ring-1 ring-black/5">
      <div className="mb-5 flex items-center gap-2">
        <MapPin className="h-4 w-4 text-brand-orange-dark" />
        <h3 className="text-[1.4rem] font-medium uppercase tracking-wide text-brand-orange-dark">
          {t('title')}
        </h3>
      </div>

      <OfficeCard officeKey="northAmerica" />
      <OfficeCard officeKey="australia" />
      <OfficeCard officeKey="unitedKingdom" />
    </aside>
  );
}
