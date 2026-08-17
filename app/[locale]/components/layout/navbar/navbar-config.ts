import {
  BarChart3,
  BookOpen,
  Building2,
  GraduationCap,
  Mail,
  Map,
  Settings,
  SlidersHorizontal,
  Star,
  Users,
  PanelTop,
  MapPinSearch,
  TicketsPlane,
  type LucideIcon,
  Rocket,
  Smartphone,
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
  | 'dashboardReports'
  | 'customizations'
  | 'sirev'
  | 'trip-n-trouch';

export const productCategories: ProductCategory[] = ['travelworks'];

export const productColumnsByCategory: Record<ProductCategory, ProductLinkKey[][]> = {
  travelworks: [
    ['features', 'benefits', 'backofficeSystem', 'tripDetails'],
    ['tourManagement', 'tourOnline', 'crmTools', 'dashboardReports'],
    ['customizations', 'sirev', 'trip-n-trouch'],
  ],
};

export const aboutUsLinks = ['company', 'clients', 'contact', 'careers'] as const;
export type AboutUsLinkKey = (typeof aboutUsLinks)[number];

export const trainingLinks = ['platform', 'knowledgeBase'] as const;
export type TrainingLinkKey = (typeof trainingLinks)[number];

export const productLinkIcons: Record<ProductLinkKey, LucideIcon> = {
  features: Settings,
  benefits: Star,
  backofficeSystem: Building2,
  tripDetails: TicketsPlane,
  tourManagement: Map,
  tourOnline: PanelTop,
  crmTools: Users,
  dashboardReports: BarChart3,
  customizations: SlidersHorizontal,
  sirev: MapPinSearch,
  'trip-n-trouch': Smartphone,
};

export const aboutUsLinkIcons: Record<AboutUsLinkKey, LucideIcon> = {
  company: Building2,
  clients: Users,
  contact: Mail,
  careers: Rocket,
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
  dashboardReports: 'dashboard-reports',
  customizations: 'customizations',
  sirev: 'sirev',
  'trip-n-trouch': 'trip-n-trouch',
};

export const aboutUsSlugByKey: Record<AboutUsLinkKey, string> = {
  company: 'travelworks',
  clients: 'clients',
  contact: 'contact',
  careers: 'careers',
};

export const trainingSlugByKey: Record<TrainingLinkKey, string> = {
  platform: 'training-platform',
  knowledgeBase: 'knowledge-base',
};

export const loginSlugByOptionId: Record<
  'Travelworks' | 'Support' | 'Training' | 'Knowledge Base',
  string
> = {
  Travelworks: 'travelworks',
  Support: 'support',
  Training: 'training-platform',
  'Knowledge Base': 'knowledge-base',
};
