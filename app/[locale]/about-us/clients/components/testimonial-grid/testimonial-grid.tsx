import TestimonialCard from "../testimonial-card/testimonial-card";

type Props = {
  testimonials: any[];
};

export default function TestimonialsGrid({
  testimonials,
}: Props) {
  return (
    <section className="bg-slate-50 py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-light md:text-5xl text-gray-800">
          Customer Testimonials
        </h2>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  );
}