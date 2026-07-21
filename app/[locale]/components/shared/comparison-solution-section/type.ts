export type ComparisonColumn = {
  id: number;
  label: string;
};

export type ComparisonSolutionRow = {
  id: number;
  label: string;
  values: Record<string, boolean>;
};

import { ReactNode } from 'react';

export type ComparisonSolution = {
  blockType: 'ComparisonSolution';
  heading?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  columns?: ComparisonColumn[];
  rows?: ComparisonSolutionRow[];
  className?: string;
};
