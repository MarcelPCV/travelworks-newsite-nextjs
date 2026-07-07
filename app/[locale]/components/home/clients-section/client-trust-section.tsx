import { ClientsSectionModel } from './type';
import Image from 'next/image';

export default function ClientTrustSection({ title, clients }: ClientsSectionModel) {
  return (
    <section className="w-full py-16">
      <div className="mx-auto max-w-7xl px-4">
        {/* Title */}
        <h2 className="text-center text-3xl font-medium uppercase tracking-tight text-brand-blue sm:text-4xl mb-5">
          {title}
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {clients.map((client, index) => (
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
              <p className="text-sm text-center text-gray-700 pt-5">{client.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
