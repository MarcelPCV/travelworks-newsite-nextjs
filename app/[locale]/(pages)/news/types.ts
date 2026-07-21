export type RouteLocale = 'en' | 'en-ca' | 'en-au' | 'fr-ca';

export type ContentLocale = 'en-us' | 'en-ca' | 'en-au' | 'fr-ca';

export type NewsCategoryId = 'accounting' | 'agency-owner' | 'it-manager' | 'technology';

export type ArticleTocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type NewsArticleFrontmatter = {
  id: string;
  title: string;
  description: string;
  excerpt: string;
  slug: string;
  date: string;
  updated?: string;
  author: string;
  category: string[];
  featured?: boolean;
  coverImage: string;
  thumbnail: string;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
};

export type NewsArticle = {
  id: string;
  locale: ContentLocale;
  title: string;
  description: string;
  excerpt: string;
  slug: string;
  date: string;
  updated?: string;
  author: string;
  categories: NewsCategoryId[];
  featured: boolean;
  coverImage: string;
  thumbnail: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  content: string;
  readingTimeMinutes: number;
  toc: ArticleTocItem[];
};

export type NewsCategory = {
  id: NewsCategoryId;
  slug: string;
  name: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
};

export type PaginatedNews = {
  items: NewsArticle[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type BreadcrumbItem = {
  label: string;
  href: string;
};
