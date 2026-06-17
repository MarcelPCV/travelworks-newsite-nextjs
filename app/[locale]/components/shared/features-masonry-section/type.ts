export type FeatureMasonryCard = {
  id: string;
  title: string;
  items: string[];
  topLinkLabel?: string;
  ctaHref?: string;
  ctaLabel?: string;
  hasPreview?: boolean;
}

export type FeatureMasonry = {
  blockType: "FeatureMasonry";
  cards: FeatureMasonryCard[];

};