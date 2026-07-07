export type NewsItem = {
  id: string;
  category: string;
  title: string;
  backgroundClassName?: string;
};

type NewsSectionProps = {
  heading?: string;
  items?: NewsItem[];
  className?: string;
};

const defaultItems: NewsItem[] = [
  {
    id: 'itinerary-builder',
    category: 'Featured',
    title: 'New Itinerary Builder: Seamlessly create a complete itinerary.',
    backgroundClassName:
      'bg-[linear-gradient(120deg,rgba(44,55,73,0.55)_0%,rgba(44,55,73,0.6)_55%,rgba(44,55,73,0.58)_100%),radial-gradient(circle_at_28%_20%,#8f7a66_0%,#6e6152_24%,#445064_58%,#2b3344_100%)]',
  },
  {
    id: 'accounting-tools',
    category: 'Travelworks',
    title: 'TravelWorks launches new tools to master accounting software',
    backgroundClassName:
      'bg-[linear-gradient(120deg,rgba(29,60,101,0.55)_0%,rgba(29,60,101,0.62)_52%,rgba(29,60,101,0.58)_100%),radial-gradient(circle_at_65%_22%,#8dbad4_0%,#678db5_28%,#3c6390_55%,#26496e_100%)]',
  },
  {
    id: 'security-article',
    category: 'IT Manager',
    title: 'Information Security: 5 Key Elements for Your Travel Agency',
    backgroundClassName:
      'bg-[linear-gradient(120deg,rgba(23,35,57,0.62)_0%,rgba(23,35,57,0.64)_50%,rgba(23,35,57,0.6)_100%),radial-gradient(circle_at_80%_30%,#4f6989_0%,#2f4766_30%,#1e314e_60%,#111f33_100%)]',
  },
];

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article
      className="group relative min-h-[14rem] overflow-hidden lg:min-h-[16rem]"
      aria-labelledby={`news-title-${item.id}`}
    >
      <div className={`absolute inset-0 ${item.backgroundClassName ?? 'bg-brand-navy'}`} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,13,23,0.15)_0%,rgba(7,13,23,0.55)_100%)]" />

      <div className="relative z-10 flex h-full flex-col justify-end p-6 text-neutral-canvas sm:p-7">
        <p className="text-[1.15rem] font-medium text-brand-orange-light">{item.category}</p>
        <h3
          id={`news-title-${item.id}`}
          className="mt-2 text-[1.9rem] font-medium leading-[1.25] text-white"
        >
          {item.title}
        </h3>
      </div>

      <span className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-brand-orange-dark/95" />
      <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 transition-opacity duration-300 group-hover:opacity-80" />
    </article>
  );
}

export default function NewsSection({
  heading = 'News',
  items = defaultItems,
  className,
}: NewsSectionProps) {
  const rootClassName = ['w-full rounded-2xl bg-neutral-background py-6 sm:py-8', className]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={rootClassName} aria-labelledby="news-section-heading">
      <h2
        id="news-section-heading"
        className="mb-6 text-center text-[2.2rem] font-medium uppercase tracking-[0.08em] text-brand-blue sm:mb-8 sm:text-[2.6rem]"
      >
        {heading}
      </h2>

      <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-neutral-border lg:grid-cols-3 lg:divide-x lg:divide-neutral-border">
        {items.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
