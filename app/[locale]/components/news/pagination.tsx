import Link from 'next/link';
import { getNewsPagePath } from '@/app/[locale]/news/lib/categories';

function getPages(totalPages: number): number[] {
  return Array.from({ length: totalPages }, (_, index) => index + 1);
}

export function Pagination({
  locale,
  currentPage,
  totalPages,
}: {
  locale: string;
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = getPages(totalPages);

  return (
    <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
      {currentPage > 1 ? (
        <Link
          href={getNewsPagePath(locale, currentPage - 1)}
          className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-700"
        >
          Previous
        </Link>
      ) : null}

      {pages.map((page) => (
        <Link
          key={page}
          href={getNewsPagePath(locale, page)}
          aria-current={page === currentPage ? 'page' : undefined}
          className={`rounded-full px-3 py-1.5 text-sm font-semibold ${
            page === currentPage
              ? 'bg-blue-700 text-white'
              : 'border border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-700'
          }`}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages ? (
        <Link
          href={getNewsPagePath(locale, currentPage + 1)}
          className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-700"
        >
          Next
        </Link>
      ) : null}
    </nav>
  );
}
