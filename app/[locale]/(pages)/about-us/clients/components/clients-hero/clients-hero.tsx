import Image from 'next/image';

type ClientsHeroProps = {
  title: string;
  subtitle: string;
};

export default function ClientsHero({ title, subtitle }: ClientsHeroProps) {
  return (
    <section className="relative bg-brand-blue text-white">
      <div className="absolute inset-0 top-0 left-1/2 -translate-x-1/2 z-10 overflow-hidden w-full h-full">
        <Image
          src="/images/pages/about-us/clients/globe.svg"
          alt="TravelWorks"
          height={1200}
          width={1200}
          className="object-cover object-center opacity-50 mx-auto"
          priority
        />
      </div>
      <div className="relative z-20 container mx-auto px-4 py-12 lg:py-24">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-light md:4xl lg:text-6xl uppercase" dangerouslySetInnerHTML={{ __html: title }} />
          <p
            className="mt-6 text-lg text-white md:text-xl"
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />
        </div>

      </div>
      <div className="relative z-20 h-5 bg-[#143f84]">
      </div>
      <div className="relative z-20 h-1 bg-[#ff9500]">
      </div>
    </section>
  );
}
