import Link from 'next/link';
import { getSiteAbsoluteUrl } from '@/app/[locale]/news/lib/seo';

export function ShareButtons({ path, title }: { path: string; title: string }) {
  const url = encodeURIComponent(getSiteAbsoluteUrl(path));
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    },
    {
      label: 'X',
      href: `https://twitter.com/intent/tweet?url=${url}&text=${encodedTitle}`,
    },
    {
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    },
    {
      label: 'Email',
      href: `mailto:?subject=${encodedTitle}&body=${url}`,
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Share article">
      {links.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-blue-300 hover:text-blue-700"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
