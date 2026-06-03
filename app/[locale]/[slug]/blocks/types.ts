export type CmsBlock = {
  id?: string | number;
  blockType?: string;
  blockName?: string;
  [key: string]: unknown;
};

export type CmsPage = {
  title?: string;
  layout?: CmsBlock[];
  [key: string]: unknown;
};

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
