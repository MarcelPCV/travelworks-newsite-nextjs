import { ReactNode } from 'react';

export type ImageBlockModel = {
  blockType: 'ImageBlock';
  title: string;
  description: ReactNode;
  imageSrc: string;
  altText: string;
  linkHref: string;
  linkText?: string;
  widthPercentage?: string;
  hasCaption?: boolean;
  captionText?: string;
  ctaLabel?: string;
  ctaLink?: string;
  backgroundColor?: string;
};
