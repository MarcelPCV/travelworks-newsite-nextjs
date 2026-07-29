import TitleSection from '@/app/[locale]/components/ui/title-section';
import TestimonialCard from '../testimonial-card/testimonial-card';

type Props = {
  testimonials: any[];
};

export default function TestimonialsGrid({ testimonials }: Props) {
  return (
    <section className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <TitleSection title="Customer Testimonials" alignment="center" size="extra-large" color="text-brand-blue" />
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
