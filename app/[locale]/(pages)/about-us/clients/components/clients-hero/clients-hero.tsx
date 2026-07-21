import React from 'react';

type ClientsHeroProps = {
  title: string;
  subtitle: string;
};

export default function ClientsHero({ title, subtitle }: ClientsHeroProps) {
  return (
    <section className="bg-blue-800 text-white">
      <div className="container mx-auto px-4 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-light md:text-6xl">{title}</h1>

          <p className="mt-6 text-lg text-white/80 md:text-xl">{subtitle}</p>
        </div>
      </div>
    </section>
  );
}
