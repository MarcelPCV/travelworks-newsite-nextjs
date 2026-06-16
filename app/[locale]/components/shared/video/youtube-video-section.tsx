import React from 'react';
import YouTubePlayer from './YouTubePlayer';

type YoutubeVideoSectionProps = {
  heading?: string;
  videoId?: string;
  channelLabel?: string;
  className?: string;
  description?: string; 
};

const defaultHeading = 'Boost The Efficiency Of Your Travel Agency!';
const defaultVideoId = 'M7lc1UVf-VE';
const defaultChannelLabel = 'Travelworks - PcVoyages';

export default function YoutubeVideoSection({
  heading = defaultHeading,
  videoId = defaultVideoId,
  channelLabel = defaultChannelLabel,
  className,
  description,
}: YoutubeVideoSectionProps) {
  const rootClassName = ['w-full mx-auto max-w-7xl rounded-[2rem] bg-[#3f3f41] px-4 py-8 sm:px-6 sm:py-10 lg:px-8', className]
    .filter(Boolean)
    .join(' ');

  // 1. Handle missing videoId (Robustness/Error Handling)
  if (!videoId) {
    return (
      <section className={rootClassName} aria-label="Video presentation placeholder">
        <h2 className="text-center text-2xl font-medium uppercase tracking-[0.06em] text-white sm:text-3xl lg:text-[2.35rem]">
          {heading || 'Video Content Unavailable'}
        </h2>
        <div 
            className="mx-auto mt-6 w-full max-w-5xl overflow-hidden border-4 border-[#66696c] bg-black shadow-[0_18px_38px_rgba(0,0,0,0.28)] p-10 text-center"
            role="alert" 
        >
          <p className="text-white">Video ID is required to display the video content.</p>
          {description && <p className="mt-2 text-sm text-gray-400">{description}</p>}
        </div>
      </section>
    );
  }

  // 2. Main rendering logic (Composition)
  return (
    <section 
      className={rootClassName} 
      aria-label={`Video presentation: ${heading || 'TravelWorks Video'}`}
      aria-describedby={description ? "video-description" : undefined}
    >
      <h2 className="text-center text-2xl font-medium uppercase tracking-[0.06em] text-white sm:text-3xl lg:text-[2.35rem]">
        {heading}
      </h2>

      {/* Use the dedicated player component */}
      <YouTubePlayer 
        videoId={videoId} 
        channelLabel={channelLabel} 
      />
      
      {/* Display description if provided */}
      {description && (
        <p id="video-description" className="text-center mt-4 text-sm text-gray-300 max-w-xl mx-auto">
          {description}
        </p>
      )}
    </section>
  );
}