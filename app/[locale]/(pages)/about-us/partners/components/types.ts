export type Partner = {
  name: string;
  logo: string;
  alt?: string;
};

export type PartnersSectionModel = {
  title: string;
  partners: Partner[];
};
