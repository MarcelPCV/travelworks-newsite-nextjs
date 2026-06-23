import Image from "next/image";
import { ExpertProfile } from "./type";

export default function ProductKnowledgeExpert(
  { heading, person, quote, bio }: ExpertProfile
) {

  return (
    <section
      className={`relative overflow-hidden bg-[#f4f4f4] py-16 lg:py-24`}
    >
      {/* Background Graphic */}
      <div className="absolute inset-0 opacity-10">
        <Image
          src="/images/world-network.svg"
          alt=""
          fill
          className="object-contain object-center"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <h2
          className="mb-16 text-center text-3xl font-light uppercase tracking-wide md:text-5xl"
          style={{ color: "#005baa" }}
        >
          {heading}
        </h2>

        <div className="grid gap-12 lg:grid-cols-[500px_1fr] lg:gap-20">
          {/* Left Image */}
          <div className="flex justify-center lg:justify-start">
            <div
              className="relative h-[320px] w-[320px] overflow-hidden rounded-full border-[6px] md:h-[500px] md:w-[500px]"
              style={{ borderColor: "#f5b544" }}
            >
              <Image
                src={person.image.src}
                alt={person.image.alt}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Right Content */}
          <div>
            {/* Quote Card */}
            <div
              className="mb-10 rounded-[28px] border-t-[6px] bg-white p-8 shadow-sm lg:p-12"
              style={{ borderTopColor: "#f5b544" }}
            >
              <div className="flex gap-4">
                <span
                  className="text-6xl font-bold leading-none"
                  style={{ color: "#ff7a00" }}
                >
                  “
                </span>

                <p className="text-xl italic leading-relaxed text-slate-700 lg:text-2xl">
                  {quote}
                </p>
              </div>
            </div>

            {/* Name & Role */}
            <div className="mb-8">
              <h3 className="text-3xl font-bold italic text-slate-700">
                {person.name}
              </h3>

              <p className="text-xl font-semibold italic text-slate-600">
                {person.role}
              </p>
            </div>

            <hr className="mb-8 border-slate-300" />

            {/* Bio */}
            <div className="space-y-6 text-lg leading-relaxed text-slate-600">
              {bio}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}