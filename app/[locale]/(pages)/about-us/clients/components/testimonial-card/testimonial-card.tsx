import { Quote } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

type Testimonial = {
  id: string;
  quote: string;
  author: string;
  company: string;
  logo: {
    src: string;
    alt: string;
  };
};

type Props = {
  testimonial: Testimonial;
};

export default async function TestimonialCard({ testimonial }: Props) {
  const t = await getTranslations('pages.about-us.clients');

  const resolveMessage = (value: string) => {
    if (!value) {
      return '';
    }

    return t.has(value) ? t(value) : value;
  };

  return (
    <article className="rounded-xl bg-white p-8 shadow-md border-b-2 border-amber-600">
      <Quote className="mb-6 h-8 w-8 text-orange-500" />

      <p className="text-muted-foreground text-sm leading-7 text-gray-800">
        {resolveMessage(testimonial.quote)}
      </p>

      <div className="mt-8 text-brand-blue text-lg border-l-2 border-amber-600 pl-4">
        <h3 className="font-semibold">{resolveMessage(testimonial.author)}</h3>

        <p className="text-sm text-muted-foreground">{resolveMessage(testimonial.company)}</p>
      </div>
    </article>
  );
}
