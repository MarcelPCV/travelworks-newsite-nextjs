import { ReactNode } from 'react';

export type YoutubeVideoModel = {
  blockType: 'YoutubeVideo';
  heading?: ReactNode;
  videoId?: string;
  channelLabel?: string;
  className?: string;
  description?: ReactNode;
};
