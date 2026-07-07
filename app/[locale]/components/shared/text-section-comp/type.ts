import { ReactNode } from 'react';

export type TextSection = {
  blockType: 'TextSection';
  title?: string | ReactNode;
  description?: ReactNode;
};
