import { ReactNode } from 'react';

export type TextSection = {
  blockType: "TextSection";
  text: ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
};
