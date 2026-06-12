import { ClientsSectionModel } from './type';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function ClientTrustSection() {
  const t = useTranslations('home.client-trust-section');
  const clientsSectionData: ClientsSectionModel = {
    title: t.rich('title', {
      strong: (chunks) => <strong>{chunks}</strong>,
    }),
    clients: [
      {
        name: 'Carlson Wagonlit Travel',
        logo: '/images/components/client-trust-section/logo.jpg',
      },
      {
        name: 'Ensemble Travel Group',
        logo: '/images/components/client-trust-section/logo.jpg',
      },
      {
        name: 'Voyages En Direct',
        logo: '/images/components/client-trust-section/logo.jpg',
      },
      {
        name: 'Thomas Cook',
        logo: '/images/components/client-trust-section/logo.jpg',
      },
      {
        name: 'Revasol',
        logo: '/images/components/client-trust-section/logo.jpg',
      },
      {
        name: 'Voyages Bergeron',
        logo: '/images/components/client-trust-section/logo.jpg',
      },
      {
        name: 'Club Voyages',
        logo: '/images/components/client-trust-section/logo.jpg',
      },
      {
        name: 'Transat',
        logo: '/images/components/client-trust-section/logo.jpg',
      },
      {
        name: 'Vasco Travel',
        logo: '/images/components/client-trust-section/logo.jpg',
      },
      {
        name: 'Voyages Plein Soleil',
        logo: '/images/components/client-trust-section/logo.jpg',
      },
      {
        name: 'Marlin Travel',
        logo: '/images/components/client-trust-section/logo.jpg',
      },
      {
        name: 'Vaisse De Croisiere',
        logo: '/images/components/client-trust-section/logo.jpg',
      },
    ],
  };

  return (
    <section className="w-full py-16">
      <div className="mx-auto max-w-7xl px-4">
        {/* Title */}
        <h2 className="text-center text-3xl font-medium uppercase tracking-tight text-brand-blue sm:text-4xl mb-5">
          {clientsSectionData.title}
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {clientsSectionData.clients.map((client, index) => (
            <div key={index}>
            <div className="flex flex-col items-center justify-center rounded-xl bg-white p-4 shadow-sm hover:shadow-md transition">
              {/* Logo */}
              <div className="relative h-24 w-48 mb-3">
                <Image
                  src={client.logo}
                  alt={client.name}
                  fill
                  className="object-contain"
                  sizes="
                    (max-width: 768px) 50vw,
                    (max-width: 1024px) 25vw,
                    16.66vw
                  "
                />
              </div>
            </div>
              {/* Name */}
              <p className="text-sm text-center text-gray-700 pt-5">
                {client.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}