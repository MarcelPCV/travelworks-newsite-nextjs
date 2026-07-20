import React from 'react'
import Image from 'next/image';

export default function TitleHero({ title }: { title: string }) {
  return (

    <section className="overflow-hidden bg-[#015CAA] h-30 md:h-40  text-white">
        <div className='relative mx-auto max-w-[1600px] h-full'>
            <Image
                src="/images/pages/about-us/partners/partnerts-travelworks.webp"
                alt=""
                width={600}
                height={400}
                className="absolute right-0 top-[-30px] w-200 h-auto"
            />
            <div className="relative mx-auto w-full h-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
                <h1 className="flex items-center h-full text-[2rem] font-light uppercase tracking-[0.06em] sm:text-[2.4rem]">
                    {title}
                </h1>
            </div>
        </div>
    </section>
  )
}
