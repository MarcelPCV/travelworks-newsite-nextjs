import { ReactNode } from 'react';

export type ExpertProfile = {
  blockType: 'ExpertProfile';
  heading: string;
  person: {
    name: string;
    role: string;
    image: {
      src: string;
      alt: string;
    };
  };
  quote: string;
  bio: ReactNode;
};
