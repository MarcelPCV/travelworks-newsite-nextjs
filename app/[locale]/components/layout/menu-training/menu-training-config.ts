import {
  trainingLinkIcons,
  trainingLinks,
  trainingSlugByKey,
  type TrainingLinkKey,
} from '@/app/[locale]/components/layout/navbar/navbar-config';
import type { ComponentType } from 'react';

export type TrainingMenuItem = {
  key: TrainingLinkKey;
  canonicalSlug: string;
  icon: ComponentType<{ className?: string }>;
};

export const trainingMenuItems: TrainingMenuItem[] = trainingLinks.map((key) => ({
  key,
  canonicalSlug: trainingSlugByKey[key],
  icon: trainingLinkIcons[key],
}));
