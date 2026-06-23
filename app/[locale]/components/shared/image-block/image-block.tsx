"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ImageBlockModel } from "./type";


export default function ImageBlock({
  title,
  description,
  imageSrc,
  altText,
  linkHref,
  linkText = "Learn more",
  widthPercentage = "60%",
  hasCaption = false,
  captionText = "",
}: ImageBlockModel) {
  const imageContainerStyle: React.CSSProperties = {
    width: widthPercentage,
  };

  return (
    <section className="mx-auto max-w-7xl flex flex-col text-center p-6 rounded-xl md:items-start">
      <div className="mx-auto flex-1 space-y-4">
        {/* Title */}
        { title && (
          <h2 className="mt-3 text-2xl font-semibold uppercase tracking-[0.04em] text-brand-blue">
            {title}
          </h2>
        )}

        {/* Description */}
        { description && (
          <p className="mx-auto max-w-2xl mt-4 text-md leading-8 text-neutral-dark">
            {description}
          </p>
        )}

        {/* Call‑to‑action link */}
        {linkHref && linkText && (
          <Link
            href={linkHref}
            className="inline-block mt-2 text-base font-medium text-white hover:underline bg-blue-600 px-4 py-2 rounded-md transition-colors duration-200 mb-10"
          >
            {linkText}
          </Link>
        )}
      </div>

      {/* ────────────────────── IMAGE CONTAINER ────────────────────── */}
      {imageSrc &&  (
      <div
        className="mx-auto w-full"
        style={imageContainerStyle} // applies the % width only on md+ screens
      >
        <div className="relative w-full overflow-hidden rounded-lg">
            <Image
                src={imageSrc}
                alt={altText}
                width={800}
                height={450}
								className="w-full"
            />
        </div>

        {/* Optional caption */}
        {hasCaption && captionText && (
          <p className="mt-2 text-sm italic text-gray-500">
            {captionText}
          </p>
        )}
      </div>
      )}
    </section>
  );
};
