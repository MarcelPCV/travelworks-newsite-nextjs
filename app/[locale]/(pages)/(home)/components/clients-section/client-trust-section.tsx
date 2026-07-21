import { ClientsSectionModel } from './type';
import Image from 'next/image';
import CtaButton from '@/app/[locale]/components/ui/cta-button';
import { ArrowRight } from 'lucide-react';
import TitleSection from '@/app/[locale]/components/ui/title-section';

export default function ClientTrustSection({
  title,
  clients,
  buttonLabel,
  buttonHref,
}: ClientsSectionModel) {
  return (
    <section className="w-full py-16">
      <div className="mx-auto max-w-[1600px] px-4">
        <div className="mb-5">
          {title && (
            <TitleSection
              title={title}
              alignment="center"
              size="extra-large"
              color="text-brand-blue"
            />
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {clients.map((client, index) => (
            <div key={index}>
              <div className="flex flex-col items-center justify-center rounded-xl bg-white shadow-sm hover:shadow-md transition">
                {/* Logo */}
                <div className="relative h-32 md:h-40 lg:42 w-48 mb-3">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    title={client.name}
                    fill
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <p className="text-sm text-center text-gray-700 pt-5">{client.name}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          {buttonLabel && buttonHref && (
            <a href={buttonHref}>
              <CtaButton
                label={buttonLabel}
                variant="default"
                size="sm"
                icon={<ArrowRight className="h-6 w-6" strokeWidth={2.4} />}
                iconPosition="after"
                className="mt-6"
              />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
