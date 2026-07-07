import type { CardsIconsSection } from './type';

export default function CardsIconsSection({ cards, title }: CardsIconsSection) {
  return (
    <section className="py-12 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-3xl font-semibold text-[#0b66a6] mb-8">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards?.map((card) => (
            <article key={card.id} className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex justify-center mb-6">
                <div
                  className={`h-20 w-20 rounded-full flex items-center justify-center ${card.iconBg ?? 'bg-blue-600'}`}
                >
                  <card.Icon className={`h-10 w-10 ${card.iconColor ?? 'text-white'}`} />
                </div>
              </div>
              <h3 className="text-center text-lg font-medium text-[#0b66a6] mb-2">{card.title}</h3>
              <p className="text-center text-sm text-gray-600">{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
