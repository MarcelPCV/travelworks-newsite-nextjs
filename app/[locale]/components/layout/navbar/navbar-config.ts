import {
  BarChart3,
  BookOpen,
  Building2,
  GraduationCap,
  Link2,
  Mail,
  Map,
  Settings,
  SlidersHorizontal,
  Star,
  Users,
  type LucideIcon,
} from 'lucide-react';

export type ProductCategory = 'travelworks';
export type ProductLinkKey =
  | 'features'
  | 'benefits'
  | 'backofficeSystem'
  | 'tripDetails'
  | 'tourManagement'
  | 'tourOnline'
  | 'crmTools'
  | 'integrations'
  | 'dashboardReports'
  | 'customizations';

export const productCategories: ProductCategory[] = ['travelworks'];

export const productColumnsByCategory: Record<ProductCategory, ProductLinkKey[][]> = {
  travelworks: [
    ['features', 'benefits', 'backofficeSystem', 'tripDetails'],
    ['tourManagement', 'tourOnline', 'crmTools', 'integrations'],
    ['dashboardReports', 'customizations'],
  ],
};

export const aboutUsLinks = ['company', 'clients', 'partners', 'contact', 'careers'] as const;
export type AboutUsLinkKey = (typeof aboutUsLinks)[number];

export const trainingLinks = ['platform', 'knowledgeBase'] as const;
export type TrainingLinkKey = (typeof trainingLinks)[number];

export const menuItemIconClassName = 'w-5 h-5 transition duration-150 text-zinc-900 group-hover:text-zinc-700 rounded-full';

export const productLinkIcons: Record<ProductLinkKey, LucideIcon> = {
  features: Settings,
  benefits: Star,
  backofficeSystem: Building2,
  tripDetails: Map,
  tourManagement: Map,
  tourOnline: Link2,
  crmTools: Users,
  dashboardReports: BarChart3,
  integrations: Link2,
  customizations: SlidersHorizontal,
};

export const aboutUsLinkIcons: Record<AboutUsLinkKey, LucideIcon> = {
  company: Building2,
  clients: Users,
  partners: Users,
  contact: Mail,
  careers: Star,
};

export const trainingLinkIcons: Record<TrainingLinkKey, LucideIcon> = {
  platform: GraduationCap,
  knowledgeBase: BookOpen,
};

export const productSlugByKey: Record<ProductLinkKey, string> = {
  features: 'features',
  benefits: 'benefits',
  backofficeSystem: 'back-office-travel-agency',
  tripDetails: 'trip-details',
  tourManagement: 'tour-management',
  tourOnline: 'tour-online',
  crmTools: 'crm-tools',
  integrations: 'multiple-integration',
  dashboardReports: 'dashboard-reports',
  customizations: 'customizations',
};

export const aboutUsSlugByKey: Record<AboutUsLinkKey, string> = {
  company: 'travelworks',
  clients: 'clients',
  partners: 'partners',
  contact: 'contact',
  careers: 'careers',
};

export const trainingSlugByKey: Record<TrainingLinkKey, string> = {
  platform: 'training-platform',
  knowledgeBase: 'knowledge-base',
};

export const loginSlugByOptionId: Record<'Travelworks' | 'Support' | 'Training' | 'Knowledge Base', string> = {
  Travelworks: 'travelworks',
  Support: 'support',
  Training: 'training-platform',
  'Knowledge Base': 'knowledge-base',
};
