'use client';

import { X } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import type { VideoTestimonial } from '../video-card/video-card';
import {useTranslations} from 'next-intl';

type Props = {
  video: VideoTestimonial | null;
  onClose: () => void;
};

function extractYouTubeVideoId(videoUrl: string): string | null {
  try {
    const url = new URL(videoUrl);

    if (url.hostname.includes('youtube.com')) {
      const id = url.searchParams.get('v');
      return id && id.trim() ? id : null;
    }

    if (url.hostname.includes('youtu.be')) {
      const id = url.pathname.replace('/', '').trim();
      return id || null;
    }

    return null;
  } catch {
    return null;
  }
}

export default function VideoModal({ video, onClose }: Props) {
  const videoId = useMemo(() => (video ? extractYouTubeVideoId(video.videoUrl) : null), [video]);
    const t = useTranslations('pages.about-us.clients');

  useEffect(() => {
    if (!video) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [video, onClose]);

  if (!video) {
    return null;
  }

  const embedUrl = videoId
    ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`
    : null;

  return (
    <div
      className="fixed inset-0 z-80 flex items-center justify-center bg-black/70 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-testimonial-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl rounded-2xl bg-[#1f1f21] p-4 text-white shadow-2xl sm:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 id="video-testimonial-modal-title" className="text-base font-semibold sm:text-lg">
            {t(video.author)} - {t(video.company)}
          </h2>
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:bg-white/10"
            aria-label="Close video modal"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="overflow-hidden rounded-xl bg-black">
          <div className="aspect-video w-full">
            {embedUrl && (
              <iframe
                src={embedUrl}
                title={`TravelWorks video testimonial - ${video.author}`}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
