import Image from "next/image";

type FeatureSectionProps = {
  id: string;
  title: string;
  image: string;
  reverse?: boolean;
  points: {
    title: string;
    description: string;
  }[];
};

export default function FeatureSection({
  id,
  title,
  image,
  points,
  reverse = false,
}: FeatureSectionProps) {
  return (
    <section
      id={id}
      className="scroll-mt-28 border-b border-slate-200 bg-white"
    >
      <div
        className={`mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* Content */}
        <div>
          <h2 className="mb-8 text-3xl font-bold text-[#005ea8]">
            {title}
          </h2>

          <div className="space-y-8">
            {points.map((point) => (
              <div key={point.title}>
                <h3 className="mb-2 font-semibold text-[#005ea8]">
                  {point.title}
                </h3>

                <p className="leading-relaxed text-slate-600">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Illustration */}
        <div className="flex items-center justify-center">
          <div className="relative h-[250px] w-full max-w-[500px]">
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}