import {
  BarChart3,
  Building2,
  Link2,
  Map,
  Settings,
  SlidersHorizontal,
  Star,
  type LucideIcon,
  Users,
} from 'lucide-react';
import type { ProductLinkKey } from '@/app/[locale]/components/layout/navbar/navbar-config';

export type TravelAgencyMenuItem = {
  key: ProductLinkKey;
  canonicalSlug: string;
  icon: LucideIcon;
};

export const travelAgencyMenuItems: TravelAgencyMenuItem[] = [
  { key: 'features', canonicalSlug: 'features', icon: Settings },
  { key: 'benefits', canonicalSlug: 'benefits', icon: Star },
  {
    key: 'backofficeSystem',
    canonicalSlug: 'back-office-travel-agency',
    icon: Building2,
  },
  { key: 'tripDetails', canonicalSlug: 'trip-details', icon: Map },
  { key: 'tourManagement', canonicalSlug: 'tour-management', icon: Map },
  { key: 'tourOnline', canonicalSlug: 'tour-online', icon: Link2 },
  { key: 'crmTools', canonicalSlug: 'crm-tools', icon: Users },
  { key: 'integrations', canonicalSlug: 'integrations', icon: Link2 },
  { key: 'dashboardReports', canonicalSlug: 'dashboard-reports', icon: BarChart3 },
  { key: 'customizations', canonicalSlug: 'customizations', icon: SlidersHorizontal },
  { key: 'trip-n-trouch', canonicalSlug: 'trip-n-trouch', icon: SlidersHorizontal },
];
