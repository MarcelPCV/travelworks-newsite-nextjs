import Link from 'next/link';
import type { BreadcrumbItem } from '@/app/[locale]/news/types';
import { Home } from 'lucide-react';
import { useLocale } from 'next-intl';

export function Breadcrumb({ items, homeHref }: { items: BreadcrumbItem[]; homeHref: string }) {
  const locale = useLocale();
  return (
    <section
      className="mx-auto mt-3 mb-3 w-full max-w-[1600px] rounded-md border border-zinc-300 bg-white px-4 py-2"
      aria-label="Breadcrumb"
    >
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-800">
          <li>
            <Link className="flex items-center hover:text-slate-700" href={homeHref}>
              <Home className="mr-2 h-5 w-5 text-amber-600" />
              {locale === 'fr-ca' ? 'Accueil' : 'Home'}
            </Link>
          </li>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={`${item.label}-${index}`} className="flex items-center gap-2">
                <span>/</span>

                {item.href === '#' ? (
                  <span className={isLast ? 'font-semibold text-slate-700' : 'text-slate-700'}>
                    {item.label}
                  </span>
                ) : (
                  <Link
                    className={`hover:text-slate-700 ${isLast ? 'font-semibold' : ''}`}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </section>
  );
}
