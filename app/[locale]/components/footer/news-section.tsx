import Link from 'next/link';
import Image from 'next/image';
import TitleSection from '../ui/title-section';

export type NewsItem = {
  id: string;
  category: string;
  title: string;
  href: string;
  imageSrc?: string;
  backgroundClassName?: string;
};

type NewsSectionProps = {
  heading?: string;
  items?: NewsItem[];
  className?: string;
};

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <Link
      href={item.href}
      className="group relative min-h-56 overflow-hidden lg:min-h-64"
      aria-labelledby={`news-title-${item.id}`}
    >
      {item.imageSrc ? (
        <Image
          src={item.imageSrc}
          alt=""
          fill
          aria-hidden="true"
          className="absolute inset-0 object-cover"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
      ) : (
        <div className={`absolute inset-0 ${item.backgroundClassName ?? 'bg-brand-navy'}`} />
      )}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex h-full flex-col justify-end p-6 text-neutral-canvas sm:p-7">
        <p className="text-[1.15rem] font-medium text-brand-orange-light">{item.category}</p>
        <h3
          id={`news-title-${item.id}`}
          className="mt-2 text-[1.4rem] font-medium leading-tight text-white"
        >
          {item.title}
        </h3>
      </div>

      <span className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-brand-orange-dark/95" />
      <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 transition-opacity duration-300 group-hover:opacity-80" />
    </Link>
  );
}

export default function NewsSection({ heading = 'News', items = [], className }: NewsSectionProps) {
  const rootClassName = ['w-full rounded-2xl bg-neutral-background py-6 sm:py-8', className]
    .filter(Boolean)
    .join(' ');

  if (items.length === 0) {
    return null;
  }

  return (
    <section className={rootClassName} aria-labelledby="news-section-heading">
      <div className="mb-5">
        {heading && (
          <TitleSection
            title={heading}
            alignment="center"
            size="extra-large"
            color="text-brand-blue"
          />
        )}
      </div>

      <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-neutral-border lg:grid-cols-3 lg:divide-x lg:divide-neutral-border">
        {items.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
