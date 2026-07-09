import Link from 'next/link';

type CategoryBadgeProps = {
  label: string;
  href: string;
  isActive?: boolean;
};

export function CategoryBadge({ label, href, isActive }: CategoryBadgeProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide transition ${
        isActive
          ? 'border-blue-700 bg-blue-700 text-white'
          : 'border-blue-200 bg-white text-blue-700 hover:border-blue-600 hover:text-blue-800'
      }`}
    >
      {label}
    </Link>
  );
}
