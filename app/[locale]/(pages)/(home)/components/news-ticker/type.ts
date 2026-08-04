export type NewsTickerItem = {
  id: string;
  title: string;
  href: string;
};

export type NewsTicker = {
  blockType: 'NewsTicker';
  id: string;
  sectionTitle: string;
  newsLabel: string;
  newsCtaHref: string;
  phone: string;
  sectionHref?: string;
  items?: NewsTickerItem[];
};
