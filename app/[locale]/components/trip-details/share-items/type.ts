export type Item = {
  id: number;
  title: string;
};

export type ShareItemsSection = {
  blockType: 'ShareItems';
  items?: Item[];
  title?: string;
};
