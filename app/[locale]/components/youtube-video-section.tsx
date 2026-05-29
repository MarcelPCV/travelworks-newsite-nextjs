type YoutubeVideoSectionProps = {
  heading?: string;
  videoId?: string;
  channelLabel?: string;
  className?: string;
};

export default function YoutubeVideoSection({
  heading = 'Boost The Efficiency Of Your Travel Agency!',
  videoId = 'M7lc1UVf-VE',
  channelLabel = 'Travelworks - PcVoyages',
  className,
}: YoutubeVideoSectionProps) {
  const rootClassName = ['w-full rounded-[2rem] bg-[#3f3f41] px-4 py-8 sm:px-6 sm:py-10 lg:px-8', className]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={rootClassName} aria-label="TravelWorks video presentation">
      <h2 className="text-center text-2xl font-medium uppercase tracking-[0.06em] text-white sm:text-3xl lg:text-[2.35rem]">
        {heading}
      </h2>

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
    </section>
  );
}