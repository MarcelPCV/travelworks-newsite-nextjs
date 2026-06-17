// --- Types ---
export type ImagePosition = 'left' | 'right';

export type SplitSectionModel = {
  blockType: "SplitSection";
  heading: string;
  /** The descriptive paragraph content. */
  description: string;
  /** URL source for the hero image. */
  imageSrc: string;
  /** Alt text for accessibility. */
  imageAlt: string;
  /** Determines if the image is on the left or right side of the text block. Defaults to 'left'. */
  imagePosition?: ImagePosition;
  /** Optional additional classes applied to the root <section> element. */
  className?: string;
}