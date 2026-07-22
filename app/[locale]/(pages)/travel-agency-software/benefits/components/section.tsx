import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { ReactNode } from 'react';
import { Sparkles } from 'lucide-react';

type FeatureSectionProps = {
  id: string;
  title: string;
  image: string;
  reverse?: boolean;
  points: {
    title: string;
    description: string;
  }[];
  className?: string;
};

export default async function FeatureSection({
  id,
  title,
  image,
  points,
  reverse = false,
  className = '',
}: FeatureSectionProps) {
  const t = await getTranslations('pages.travel-agency-software.benefits');

  const resolveMessage = (value: string) =>
    t.has(value) ? t(value) : value;

  const resolveRichMessage = (value: string): ReactNode => {
    if (!t.has(value)) {
      return value;
    }

    return t.rich(value, {
      strong: (chunks) => (
        <strong className="font-semibold text-brand-blue">
          {chunks}
        </strong>
      ),
    });
  };

  const imageSrc = resolveMessage(image);
  const sectionTitle = resolveMessage(title);

  const pointsWithTranslations = points.map((point) => ({
    title: resolveRichMessage(point.title),
    description: resolveRichMessage(point.description),
  }));

  return (
    <section
      id={id}
      className={`scroll-mt-28 ${className}`}
    >
      <div
        className={`mx-auto grid max-w-[1600px] gap-12 px-6 py-20 lg:grid-cols-2 ${
          reverse ? 'lg:[&>*:first-child]:order-2' : ''
        }`}
      >
        {/* Content */}
        <div>
          <h2 className="mb-8 text-3xl font-bold text-[#005ea8] uppercase">
            {sectionTitle}
          </h2>

          <div className="space-y-8">
            {pointsWithTranslations.map((point, index) => (
              <div key={`${id}-${index}`}>
                <div className="mb-2 flex items-center">
                  <Sparkles className="mr-2 h-5 w-5 text-amber-600" />

                  <h3 className="font-semibold text-[#005ea8]">
                    {point.title}
                  </h3>
                </div>

                <p className="text-sm leading-relaxed text-slate-600">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Illustration */}
        <div className="flex items-center justify-center">
          <div className="relative h-full min-h-[300px] w-full max-w-[650px]">
            <Image
              src={imageSrc}
              alt={sectionTitle}
              title={sectionTitle}
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}