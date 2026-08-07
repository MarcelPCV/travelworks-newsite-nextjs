import Image from 'next/image';
import { Play } from 'lucide-react';
import { useTranslations } from 'next-intl';

export type VideoTestimonial = {
  id: string;
  thumbnail: string;
  videoUrl: string;
  quote: string;
  author: string;
  company: string;
};

type Props = {
  video: VideoTestimonial;
  onOpen: (video: VideoTestimonial) => void;
};

export default function VideoCard({ video, onOpen }: Props) {
  const t = useTranslations('pages.about-us.clients');

  return (
    <article>
      <button
        type="button"
        className="block w-full bg-gray-700 text-left"
        onClick={() => onOpen(video)}
        aria-label={`Play testimonial video from ${video.author} at ${video.company}`}
      >
        <div className="group relative aspect-video overflow-hidden rounded-xl bg-gray-600">
          <Image
            fill
            src={video.thumbnail}
            alt={video.author}
            className="object-cover transition duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-[15px] left-[15px] flex items-center justify-center bg-black/35 transition-colors group-hover:bg-black/45">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-brand-blue shadow-md">
              <Play className="ml-1 h-6 w-6" fill="currentColor" />
            </div>
          </div>
        </div>
      </button>

      <p className="mt-6 text-sm leading-7">{t(video.quote)}</p>

      <div className="mt-4 border-l-2 border-amber-600 pl-4">
        <h3 className="font-semibold text-lg">{t(video.author)}</h3>

        <p className="text-muted-foreground text-sm">{t(video.company)}</p>
      </div>
    </article>
  );
}
