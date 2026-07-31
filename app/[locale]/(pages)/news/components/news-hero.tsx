type NewsHeroProps = {
  title: string;
  description: string;
};

export function NewsHero({ title, description }: NewsHeroProps) {
  return (
    <section className="rounded-2xl bg-linear-to-r from-blue-900 via-blue-700 to-blue-800 px-6 py-12 text-white md:px-12">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-200">Newsroom</p>
      <h1 className="mt-3 text-3xl font-semibold md:text-4xl">{title}</h1>
      <p className="mt-4 max-w-3xl text-base text-blue-100 md:text-lg">{description}</p>
    </section>
  );
}
