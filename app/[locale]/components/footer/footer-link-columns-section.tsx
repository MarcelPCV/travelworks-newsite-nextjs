import Link from 'next/link';

export type FooterLinkItem = {
  label: string;
  href?: string;
};

export type FooterLinkColumn = {
  id: string;
  heading: string;
  links: FooterLinkItem[];
};

type FooterLinkColumnsSectionProps = {
  title?: string;
  columns?: FooterLinkColumn[];
  copyrightText?: string;
  className?: string;
};

const defaultColumns: FooterLinkColumn[] = [
  {
    id: 'solution',
    heading: 'The Solution',
    links: [
      { label: 'Features', href: '#' },
      { label: 'Back Office System', href: '#' },
      { label: 'Tour Management', href: '#' },
      { label: 'Tour Online', href: '#' },
      { label: 'CRM Tools', href: '#' },
      { label: 'Multiple Integration', href: '#' },
      { label: 'Customizations', href: '#' },
      { label: 'Multiple Reports', href: '#' },
    ],
  },
  {
    id: 'benefits',
    heading: 'Benefits',
    links: [
      { label: 'Cloud Based', href: '#' },
      { label: 'Efficient', href: '#' },
      { label: 'Scalable', href: '#' },
      { label: 'Secure', href: '#' },
      { label: 'Smart', href: '#' },
      { label: 'Reliable', href: '#' },
      { label: 'Evolutionary', href: '#' },
    ],
  },
  {
    id: 'travelworks',
    heading: 'Travelworks',
    links: [
      { label: 'About us', href: '#' },
      { label: 'Clients', href: '#' },
      { label: 'Partners', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'Ask for a demo', href: '#' },
      { label: 'Training', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Privacy Policy', href: '#' },
    ],
  },
  {
    id: 'news',
    heading: 'News',
    links: [
      { label: 'All News', href: '#' },
      { label: 'Accountant', href: '#' },
      { label: 'Agency Owner', href: '#' },
      { label: 'IT Manager', href: '#' },
      { label: 'Technology', href: '#' },
    ],
  },
];

function FooterLinkColumnList({ column }: { column: FooterLinkColumn }) {
  return (
    <div>
      <h3 className="type-h6 text-white">{column.heading}</h3>
      <ul className="mt-4 space-y-2.5">
        {column.links.map((link) => (
          <li key={`${column.id}-${link.label}`}>
            {link.href ? (
              <Link
                href={link.href}
                className="type-normal-16 inline-flex text-white/95 transition-colors duration-200 hover:text-brand-orange-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange-light/80 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-blue"
              >
                {link.label}
              </Link>
            ) : (
              <span className="type-normal-16 inline-flex text-white/95">{link.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function FooterLinkColumnsSection({
  title = 'Footer navigation',
  columns = defaultColumns,
  copyrightText = '© Pc Voyages 2000 Inc. All rights reserved',
  className,
}: FooterLinkColumnsSectionProps) {
  const rootClassName = ['w-full overflow-hidden rounded-2xl bg-brand-blue text-white', className]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={rootClassName} aria-labelledby="footer-link-columns-heading">
      <h2 id="footer-link-columns-heading" className="sr-only">
        {title}
      </h2>

      <nav aria-label={title} className="px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12 xl:px-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {columns.map((column) => (
            <FooterLinkColumnList key={column.id} column={column} />
          ))}
        </div>
      </nav>

      <div className="border-t border-white/20 px-6 py-5 text-center sm:px-8 lg:px-10 lg:text-right xl:px-12">
        <p className="text-[1.05rem] font-medium text-white/95">{copyrightText}</p>
      </div>
    </section>
  );
}
