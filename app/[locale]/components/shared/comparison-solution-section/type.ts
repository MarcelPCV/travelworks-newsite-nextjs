export type ComparisonColumn = {
  id: number;
  label: string;
};

export type ComparisonSolutionRow = {
  id: number;
  label: string;
  values: Record<string, boolean>;
};

export type ComparisonSolution = {
  blockType: 'ComparisonSolution';
  heading?: string;
  imageSrc?: string;
  imageAlt?: string;
  columns?: ComparisonColumn[];
  rows?: ComparisonSolutionRow[];
  className?: string;
};
