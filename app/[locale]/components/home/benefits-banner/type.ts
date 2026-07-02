export type BenefitsBannerItem = {
  id: number;
  label: string;
};

export type BenefitsBanner = {
  blockType: "BenefitsBanner";
  heading?: string;
  items?: BenefitsBannerItem[];
  buttonLabel?: string;
  buttonHref?: string;
  hideButton?: boolean;
  imagePlaceholderLabel?: string;
  className?: string;
};