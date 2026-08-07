export type Partner = {
  name: string;
  logo: string;
  alt?: string;
};

export type IntegrationSectionId =
  | 'gds'
  | 'booking-tools'
  | 'online-payment-solution'
  | 'insurance-companies'
  | 'other-partners'
  | 'tourism-schools'
  | 'travel-industry-associations';

export type PartnersSectionModel = {
  id: IntegrationSectionId;
  title: string;
  partners: Partner[];
};

export type SectionAnchorItem = {
  id: IntegrationSectionId;
  label: string;
};
