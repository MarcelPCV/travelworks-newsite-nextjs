import {
  ArrowRight,
} from "lucide-react";
import type { InfoCard, InfoCards} from "./type";

export default function TrainingFeatures({ cards } : InfoCards) {

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* Top Row */}
        <div className="grid gap-6 lg:grid-cols-3">
          {cards.slice(0, 3).map((card) => (
            <FeatureCard key={card.title} {...card} />
          ))}
        </div>

        {/* Bottom Row */}
        <div className="mx-auto mt-6 grid max-w-4xl gap-6 md:grid-cols-2">
          {cards.slice(3).map((card) => (
            <FeatureCard key={card.title} {...card} />
          ))}
        </div>

        {/* Footer Text */}
        <div className="mx-auto mt-16 max-w-4xl text-center">
          <p className="text-lg leading-relaxed text-slate-600">
            We are committed to supporting your success and ensuring you get
            the most out of TravelWorks. Join us on this journey to elevate
            your skills and transform your accounting experience!
          </p>

          <p className="mt-8 text-lg text-slate-600">
            For more information, please contact our support team at{" "}
            <a
              href="mailto:info@travelworkssolution.com"
              className="font-semibold text-blue-700 hover:underline"
            >
              info@travelworkssolution.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  title,
  description,
  icon: Icon,
  cta,
  ctaLabel,
  ctaLink,
}: InfoCard) {
  return (
    <div className="rounded-[28px] border-t-4 border-amber-400 bg-white p-8 shadow-lg shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex flex-col items-center text-center">
        <Icon className="mb-6 h-12 w-12 text-blue-700" strokeWidth={1.8} />

        <h3 className="text-xl font-bold uppercase tracking-wide text-blue-700">
          {title}
        </h3>

        <p className="mt-4 text-lg leading-relaxed text-slate-700">
          {description}
        </p>

        {cta && (
          <a
            href={ctaLink}
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
}