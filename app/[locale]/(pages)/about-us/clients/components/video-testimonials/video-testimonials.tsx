import TitleSection from '@/app/[locale]/components/ui/title-section';
import VideoCard from '../video-card/video-card';

type Props = {
  videos: any[];
};

export default function VideoTestimonials({ videos }: Props) {
  return (
    <section className="bg-[#3F3F41] py-10">
      <div className="container mx-auto px-4">
        <TitleSection title="Customer What They Say About Us" alignment="center" size="extra-large" color="text-white" />
        <div className="grid gap-8 lg:grid-cols-3">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
}
