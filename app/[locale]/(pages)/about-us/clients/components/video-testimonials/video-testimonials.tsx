'use client';

import { useState } from 'react';
import TitleSection from '@/app/[locale]/components/ui/title-section';
import VideoCard, { type VideoTestimonial } from '../video-card/video-card';
import VideoModal from '../video-modal/video-modal';

type Props = {
  videos: VideoTestimonial[];
};

export default function VideoTestimonials({ videos }: Props) {
  const [selectedVideo, setSelectedVideo] = useState<VideoTestimonial | null>(null);

  const openVideo = (video: VideoTestimonial) => {
    setSelectedVideo(video);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <>
      <section className="bg-[#3F3F41] py-10">
        <div className="container mx-auto px-4">
        <TitleSection title="Customer What They Say About Us" alignment="center" size="extra-large" color="text-white" />
        <div className="grid gap-8 lg:grid-cols-3">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} onOpen={openVideo} />
          ))}
        </div>
        </div>
      </section>

      <VideoModal video={selectedVideo} onClose={closeVideo} />
    </>
  );
}
