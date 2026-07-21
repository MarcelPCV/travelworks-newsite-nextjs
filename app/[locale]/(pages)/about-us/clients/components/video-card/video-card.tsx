import Image from 'next/image';
import { Play } from 'lucide-react';

type VideoTestimonial = {
  id: string;
  thumbnail: string;
  videoUrl: string;
  quote: string;
  author: string;
  company: string;
};

type Props = {
  video: VideoTestimonial;
};

export default function VideoCard({ video }: Props) {
  return (
    <article>
      <a href={video.videoUrl} target="_blank" rel="noopener noreferrer" className="bg-gray-700">
        <div className="group relative aspect-video overflow-hidden rounded-xl bg-gray-600">
          <Image
            fill
            src={video.thumbnail}
            alt={video.author}
            className="object-cover transition duration-300 group-hover:scale-105"
          />

          <div className="absolute inset-0 flex items-center justify-center bg-gray-500">
            <div className="flex h-16 w-16 items-center justify-center rounded-full b">
              <Play className="ml-1 h-6 w-6" />
            </div>
          </div>
        </div>
      </a>

      <p className="mt-6 text-sm leading-7">{video.quote}</p>

      <div className="mt-4">
        <h3 className="font-semibold">{video.author}</h3>

        <p className="text-muted-foreground text-sm">{video.company}</p>
      </div>
    </article>
  );
}
