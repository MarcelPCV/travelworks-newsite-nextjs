import VideoCard from '../video-card/video-card';

type Props = {
  videos: any[];
};

export default function VideoTestimonials({ videos }: Props) {
  return (
    <section className="bg-gray-800 py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-light md:text-5xl">
          What They Say About Us
        </h2>

        <div className="grid gap-8 lg:grid-cols-3">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
}
