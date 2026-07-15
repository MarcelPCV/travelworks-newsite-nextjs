export type BenefitsBannerItem = {
  id: number;
  label: string;
};

export type BenefitsBanner = {
  blockType: 'BenefitsBanner';
  heading?: string;
  items?: BenefitsBannerItem[];
  imageHref?: string;
  imageAlt?: string;
  buttonLabel?: string;
  buttonHref?: string;
  hideButton?: boolean;
  imagePlaceholderLabel?: string;
  className?: string;
};
