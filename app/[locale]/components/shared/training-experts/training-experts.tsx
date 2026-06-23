import Image from "next/image";

export default function ProductKnowledgeExpert() {
  const data = {
    heading: "Product Knowledge Experts",

    person: {
      name: "Danna Woods",
      role: "Director of Operations",
      image: {
        src: "/images/danna-woods.webp",
        alt: "Danna Woods",
      },
    },

    quote:
      "Developed by industry experts, this training program addresses common agency challenges with a practical, efficient approach that builds foundational skills and empowers real-world application to boost productivity.",

    bio: [
      "With a career spanning over a decade, Danna has cultivated deep expertise in account management, client training, and technical support.",

      "At TravelWorks, Danna plays a pivotal role in aligning customer needs with innovative software solutions. Her leadership in onboarding, client success, and technical enablement has contributed significantly to the company's reputation for excellence and reliability in the travel sector.",

      "Her ability to bridge the gap between technology and user experience makes her a trusted advisor to clients and a key asset to the TravelWorks leadership team.",
    ],

    styles: {
      sectionBg: "bg-[#f4f4f4]",
      primary: "#005baa",
      accent: "#f5b544",
      quoteMark: "#ff7a00",
    },
  };

  return (
    <section
      className={`relative overflow-hidden ${data.styles.sectionBg} py-16 lg:py-24`}
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
          style={{ color: data.styles.primary }}
        >
          {data.heading}
        </h2>

        <div className="grid gap-12 lg:grid-cols-[500px_1fr] lg:gap-20">
          {/* Left Image */}
          <div className="flex justify-center lg:justify-start">
            <div
              className="relative h-[320px] w-[320px] overflow-hidden rounded-full border-[6px] md:h-[500px] md:w-[500px]"
              style={{ borderColor: data.styles.accent }}
            >
              <Image
                src={data.person.image.src}
                alt={data.person.image.alt}
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
              style={{ borderTopColor: data.styles.accent }}
            >
              <div className="flex gap-4">
                <span
                  className="text-6xl font-bold leading-none"
                  style={{ color: data.styles.quoteMark }}
                >
                  “
                </span>

                <p className="text-xl italic leading-relaxed text-slate-700 lg:text-2xl">
                  {data.quote}
                </p>
              </div>
            </div>

            {/* Name & Role */}
            <div className="mb-8">
              <h3 className="text-3xl font-bold italic text-slate-700">
                {data.person.name}
              </h3>

              <p className="text-xl font-semibold italic text-slate-600">
                {data.person.role}
              </p>
            </div>

            <hr className="mb-8 border-slate-300" />

            {/* Bio */}
            <div className="space-y-6 text-lg leading-relaxed text-slate-600">
              {data.bio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}