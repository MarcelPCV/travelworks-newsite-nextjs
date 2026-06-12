import { ReactNode } from 'react';

export type Client = {
  name: string;
  logo: string; // path like "/logo.gif" (you can replace later)
};

export type ClientsSectionModel = {
  title: ReactNode;
  clients: Client[];
};