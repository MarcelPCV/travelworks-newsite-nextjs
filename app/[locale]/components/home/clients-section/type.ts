import { ReactNode } from 'react';

export type Client = {
  name: string;
  logo: string;
};

export type ClientsSectionModel = {
  blockType: 'ClientTrustSection';
  title: ReactNode;
  buttonLabel?: string;
  buttonHref?: string;
  clients: Client[];
};
