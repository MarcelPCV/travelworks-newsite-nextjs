import { ReactNode } from 'react';

export type Client = {
  name: string;
  logo: string;
};

export type ClientsSectionModel = {
  blockType: 'ClientTrustSection';
  title: ReactNode;
  clients: Client[];
};
