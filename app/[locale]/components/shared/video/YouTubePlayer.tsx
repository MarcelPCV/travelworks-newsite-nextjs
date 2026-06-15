import React from 'react';

type YouTubePlayerProps = {
  videoId: string;
  channelLabel?: string;
  className?: string;
};

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  videoId,
  channelLabel = 'Video',
  className,
}) => {
  return (
    <div className="mx-auto mt-6 w-full max-w-5xl overflow-hidden border-4 border-[#66696c] bg-black shadow-[0_18px_38px_rgba(0,0,0,0.28)]">
      <div className="aspect-video w-full">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={`TravelWorks video presentation - ${channelLabel}`}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default YouTubePlayer;