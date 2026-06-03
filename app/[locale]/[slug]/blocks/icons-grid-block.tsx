"use client";

import Image from 'next/image';
import { BriefcaseBusiness, Cog, Handshake, Headset, Settings2, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

import { isRecord, type CmsBlock } from './types';

export type TechnologyFeatureMedia = {
  url?: string;
  thumbnailURL?: string;
  alt?: string;
};

export type TechnologyFeatureItem = {
  id: string;
  label?: string;
  title?: string;
  icon?: ReactNode | TechnologyFeatureMedia;
  iconComponent?: LucideIcon;
  iconName?: 'briefcase-business' | 'headset' | 'settings-2' | 'handshake';
};

export type TechnologyFeaturesSectionProps = {
  block?: CmsBlock;
  pageTitle?: string;
  items?: TechnologyFeatureItem[];
  headingPrefix?: string;
  headingEmphasis?: string;
  headingSuffix?: string;
  className?: string;
};

const iconComponentByName = {
  'briefcase-business': BriefcaseBusiness,
  headset: Headset,
  'settings-2': Settings2,
  handshake: Handshake,
} satisfies Record<NonNullable<TechnologyFeatureItem['iconName']>, LucideIcon>;

function getString(value: unknown): string | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmedValue = value.trim();

  return trimmedValue.length > 0 ? trimmedValue : undefined;
}

function getIconMedia(value: unknown): TechnologyFeatureMedia | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  const url = getString(value.url);
  const thumbnailURL = getString(value.thumbnailURL);
  const alt = getString(value.alt);

  if (!url && !thumbnailURL) {
    return undefined;
  }

  return { url, thumbnailURL, alt };
}

function mapIconsGridItems(block?: CmsBlock): TechnologyFeatureItem[] {
  if (!Array.isArray(block?.items) || block.items.length === 0) {
    return [];
  }

  return block.items
    .map((item, index): TechnologyFeatureItem | undefined => {
      if (!isRecord(item)) {
        return undefined;
      }

      const title = getString(item.title);
      const label = title ? undefined : getString(item.label);

      if (!title && !label) {
        return undefined;
      }

      const featureItem: TechnologyFeatureItem = {
        id: getString(item.id) ?? `${String(block.id ?? 'icons-grid')}-item-${index}`,
      };

      if (title) {
        featureItem.title = title;
      }

      if (label) {
        featureItem.label = label;
      }

      const icon = getIconMedia(item.icon);

      if (icon) {
        featureItem.icon = icon;
      }

      return featureItem;
    })
    .filter((item): item is TechnologyFeatureItem => Boolean(item));
}

function isMediaIcon(icon: TechnologyFeatureItem['icon']): icon is TechnologyFeatureMedia {
  return Boolean(icon && typeof icon === 'object' && ('url' in icon || 'thumbnailURL' in icon));
}

function FeatureIcon({ item }: { item: TechnologyFeatureItem }) {
  const Icon = item.iconComponent ?? (item.iconName ? iconComponentByName[item.iconName] : undefined) ?? Cog;
  const media = isMediaIcon(item.icon) ? item.icon : null;

  return (
    <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-brand-blue shadow-[0_10px_24px_rgba(46,92,179,0.26)]">
      {media ? (
        <div className="relative h-10 w-10 overflow-hidden rounded-full">
          <Image
            src={media.thumbnailURL ?? media.url ?? '/'}
            alt={media.alt ?? item.label ?? item.title ?? ''}
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
      ) : item.icon ? (
        <div className="h-10 w-10 [&>svg]:h-full [&>svg]:w-full">{item.icon as ReactNode}</div>
      ) : (
        <Icon className="h-10 w-10 text-white" strokeWidth={1.9} />
      )}
      <span className="pointer-events-none absolute -right-0.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-brand-orange-light" />
    </div>
  );
}

export default function IconsGridBlock({
  block,
  pageTitle,
  items: itemsProp,
  headingPrefix = 'Technology',
  headingEmphasis = 'Tailored',
  headingSuffix = 'to Travel Industry',
  className,
}: TechnologyFeaturesSectionProps) {
  const items = Array.isArray(itemsProp) ? itemsProp : mapIconsGridItems(block);
  const rootClassName = ['w-full rounded-2xl bg-[#e7e7e7] px-5 py-10 sm:px-8 lg:px-10', className]
    .filter(Boolean)
    .join(' ');
  const heading = block?.title ? String(block.title).trim() : pageTitle ?? null;

  return (
    <section className={rootClassName} aria-labelledby="technology-features-heading">
      {heading ? (
        <h2 id="technology-features-heading" className="text-center text-3xl font-medium uppercase tracking-tight text-brand-blue sm:text-4xl">
          {heading}
        </h2>
      ) : (
        <h2 id="technology-features-heading" className="text-center text-3xl font-medium uppercase tracking-tight text-brand-blue sm:text-4xl">
          <span>{headingPrefix} </span>
          <strong className="font-semibold">{headingEmphasis} </strong>
          <span>{headingSuffix}</span>
        </h2>
      )}

      <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-10">
        {items.map((item) => {
          return (
            <article
              key={item.id}
              className="flex w-[calc(50%-0.75rem)] max-w-44 flex-col items-center text-center sm:w-[calc(33.333%-1.3rem)] md:w-[calc(20%-1.5rem)] xl:w-[calc(14.285%-1.7rem)]"
            >
              <FeatureIcon item={item} />
              <p className="mt-3 max-w-[12ch] text-md font-medium leading-tight text-brand-blue">{item.title ?? item.label}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
