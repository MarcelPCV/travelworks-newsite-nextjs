import Link from 'next/link';
import type { BreadcrumbItem } from '@/app/[locale]/news/types';

export function Breadcrumb({ items, homeHref }: { items: BreadcrumbItem[]; homeHref: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <li>
          <Link className="hover:text-slate-700" href={homeHref}>
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            <span>/</span>
            {item.href === '#' ? (
              <span className="text-slate-700">{item.label}</span>
            ) : (
              <Link className="hover:text-slate-700" href={item.href}>
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
