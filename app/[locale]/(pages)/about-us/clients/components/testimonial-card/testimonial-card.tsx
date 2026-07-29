import Image from 'next/image';
import { Quote } from 'lucide-react';

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

export default function TestimonialCard({ testimonial }: Props) {
  return (
    <article className="rounded-xl bg-white p-8 shadow-md border-b-2 border-amber-600">
      <Quote className="mb-6 h-8 w-8 text-orange-500" />

      <p className="text-muted-foreground text-md leading-7 text-gray-800">
        {testimonial.quote}
      </p>

      <div className="mt-8 text-gray-800">
        <h3 className="font-semibold">
          {testimonial.author}
        </h3>

        <p className="text-sm text-muted-foreground">
          {testimonial.company}
        </p>
      </div>

      {/* <div className="relative mt-6 h-12 w-32">
        <Image
          fill
          src={testimonial.logo.src}
          alt={testimonial.logo.alt}
          className="object-contain object-left"
        />
      </div> */}
    </article>
  );
}
