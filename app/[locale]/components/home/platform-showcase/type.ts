import { ReactNode } from 'react';

export type PlatformShowcaseModel = {
  blockType: "PlatformShowcase";
  title: string | ReactNode;
  description: string | ReactNode;
  mainImage: string;
  secondaryImage: string;
};