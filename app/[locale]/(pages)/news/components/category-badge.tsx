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
      className={`inline-flex items-center rounded-md border px-3 py-1 text-xs font-semibold uppercase tracking-wide transition ${
        isActive
          ? 'border-brand-blue bg-brand-blue text-white'
          : 'border-blue-200 bg-white text-brand-blue hover:border-brand-blue hover:text-brand-blue'
      }`}
    >
      {label}
    </Link>
  );
}
