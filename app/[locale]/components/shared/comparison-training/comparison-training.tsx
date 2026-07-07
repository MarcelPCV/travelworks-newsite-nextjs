import { CheckCircle2 } from 'lucide-react';
import { ComparisonTrainingCard, ConmparisonTraining } from './type';

function ComparisonCard({ title, badge, features }: ComparisonTrainingCard) {
  return (
    <div className="w-full">
      <div className="mb-8 flex items-center gap-3">
        <h3 className="text-2xl font-light text-white">{title}</h3>

        {badge && (
          <span className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white">
            {badge}
          </span>
        )}
      </div>

      <ul className="space-y-6">
        {features.map((feature) => (
          <li key={feature.title} className="flex items-start gap-4">
            <CheckCircle2 className="mt-1 h-7 w-7 flex-shrink-0 text-orange-500" strokeWidth={2} />

            <p className="text-lg leading-relaxed text-white/95">
              <strong className="font-semibold text-orange-300">{feature.title}</strong>{' '}
              {feature.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TrainingComparison({
  heading,
  knowledgeBase,
  trainingPlatform,
}: ConmparisonTraining) {
  return (
    <section className="bg-zinc-700 px-6 py-16 md:px-10 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-16 text-center text-3xl font-light uppercase tracking-wide text-white md:text-5xl">
          {heading}
        </h2>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <ComparisonCard {...knowledgeBase} />
          <ComparisonCard {...trainingPlatform} />
        </div>
      </div>
    </section>
  );
}
