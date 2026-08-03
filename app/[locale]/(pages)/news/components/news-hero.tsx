import { useLocale } from 'next-intl';

type NewsHeroProps = {
  title: string;
  description: string;
};

export function NewsHero({ title, description }: NewsHeroProps) {
  const locale = useLocale();
  return (
    <section className="rounded-lg bg-brand-blue px-6 py-6 text-white md:px-12 border-b-4 border-amber-500">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-200">
        {locale === 'fr-ca' ? 'Actualités' : 'News'}
      </p>
      <h1 className="mt-3 text-3xl font-semibold md:text-4xl">{title}</h1>
    </section>
  );
}
