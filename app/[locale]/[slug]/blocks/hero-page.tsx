import Image from 'next/image'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { RichText } from '@payloadcms/richtext-lexical/react'

import { isRecord, type CmsBlock } from './types'

type Media = {
  id: number
  alt?: string
  url: string
}

function toMedia(value: unknown): Media | null {
  if (!isRecord(value)) {
    return null
  }

  const url = typeof value.url === 'string' ? value.url : undefined

  if (!url) {
    return null
  }

  return {
    id: typeof value.id === 'number' ? value.id : 0,
    alt: typeof value.alt === 'string' ? value.alt : undefined,
    url,
  }
}

function toLexicalState(value: unknown): DefaultTypedEditorState | null {
  if (!isRecord(value) || !isRecord(value.root)) {
    return null
  }

  return value as DefaultTypedEditorState
}

type HeroPageProps = {
  block: CmsBlock
  pageTitle?: string
  className?: string
}

function ImageSlot({
  src,
  alt,
  className,
  priority,
}: {
  src?: string
  alt: string
  className: string
  priority?: boolean
}) {
  if (!src) {
    return (
      <div
        className={[className, 'rounded-sm bg-brand-orange-dark'].join(' ')}
        aria-hidden="true"
      />
    )
  }

  return (
    <div className={[className, 'relative overflow-hidden rounded-sm'].join(' ')}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover"
      />
    </div>
  )
}

export default function HeroPage({
  block,
  className,
}: HeroPageProps) {
  const title = typeof block.title === 'string' ? block.title : ''
  const description = toLexicalState(block.description)

  const logoImage = toMedia(block.logoImage)
  const secondaryImage = toMedia(block.secondaryImage)
  const mainImage = toMedia(block.mainImage)

  const rootClassName = [
    'relative w-full overflow-hidden bg-[#e5e5e5]',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section className={rootClassName}>
      <div className="mx-auto w-full max-w-7xl lg:px-8">
        {/* Mobile Hero Image */}
        {mainImage && (
          <div className="block lg:hidden">
            <ImageSlot
              src={mainImage.url}
              alt={mainImage.alt ?? ''}
              className="aspect-[16/10] w-full bg-yellow-400"
              priority
            />
          </div>
        )}

        <div className="grid w-full lg:min-h-140 lg:grid-cols-[1fr_1.22fr] lg:gap-8 lg:py-3">
          {/* Content Column */}
          <div className="flex flex-col lg:justify-center">
            <div className="px-6 pb-10 pt-4 text-center sm:px-10 sm:pb-12 lg:px-0 lg:pb-0 lg:pt-0">
              {logoImage && (
                <div className="mx-auto w-full max-w-65 sm:max-w-70 lg:max-w-57.5">
                  <ImageSlot
                    src={logoImage.url}
                    alt={logoImage.alt ?? ''}
                    className="aspect-11/5 w-full bg-red-300"
                  />
                </div>
              )}

              <h1 className="mt-5 text-4xl font-semibold uppercase tracking-wide text-brand-blue sm:text-[2.55rem] lg:mt-7 lg:text-[2rem]">
                {title}
              </h1>

              {description && (
                <div className="mx-auto mt-4 max-w-[22ch] text-[2rem] leading-tight text-neutral-dark sm:max-w-[24ch] sm:text-[1.2rem] lg:mt-5 lg:text-[1.35rem]">
                  <RichText data={description} />
                </div>
              )}

              {secondaryImage && (
                <div className="mx-auto mt-10 w-full max-w-65 sm:max-w-70 lg:mt-12 lg:max-w-57.5">
                  <ImageSlot
                    src={secondaryImage.url}
                    alt={secondaryImage.alt ?? ''}
                    className="aspect-11/5 w-full bg-green-300"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Desktop Hero Image */}
          {mainImage && (
            <div className="relative hidden items-center justify-center lg:flex">
              <ImageSlot
                src={mainImage.url}
                alt={mainImage.alt ?? ''}
                className="h-[86%] w-full max-w-215 bg-yellow-400"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}