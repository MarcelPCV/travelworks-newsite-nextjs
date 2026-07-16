import {
  aboutUsLinkIcons,
  aboutUsLinks,
  aboutUsSlugByKey,
  type AboutUsLinkKey,
} from '@/app/[locale]/components/layout/navbar/navbar-config';
import type { ComponentType } from 'react';

export type AboutUsMenuItem = {
  key: AboutUsLinkKey;
  canonicalSlug: string;
  icon: ComponentType<{ className?: string }>;
};

export const aboutUsMenuItems: AboutUsMenuItem[] = aboutUsLinks.map((key) => ({
  key,
  canonicalSlug: aboutUsSlugByKey[key],
  icon: aboutUsLinkIcons[key],
}));
