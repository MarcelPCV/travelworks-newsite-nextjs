import Image from 'next/image';

type Client = {
  id: string;
  name: string;
  logo: {
    src: string;
    alt: string;
  };
};

type ClientsLogoMarqueeProps = {
  clients: Client[];
};

export default function ClientsLogoMarquee({ clients }: ClientsLogoMarqueeProps) {
  const duplicatedClients = [...clients, ...clients];

  return (
    <section className="overflow-hidden border-y bg-white text-gray-800 py-8">
      <div className="marquee">
        <div className="marquee-content">
          {duplicatedClients.map((client, index) => (
            <div key={`${client.id}-${index}`} className="relative h-20 w-40 shrink-0">
              <Image fill src={client.logo.src} alt={client.logo.alt} className="object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
