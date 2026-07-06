import React from 'react';
import { clsx } from 'clsx';
import { ReactNode } from 'react';

// This is a Server Component by default (no 'use client' needed —
// it has no state, effects, or event handlers). If you later add
// interactivity, add 'use client' at the top of the file.

type Alignment = 'left' | 'center' | 'right';
type Size = 'normal' | 'large' | 'extra-large';
type TextCase = 'upper' | 'normal';

interface TitleSectionProps {
  title: string | ReactNode;
  alignment?: Alignment;
  size?: Size;
  textCase?: TextCase;
  color?: string;
  className?: string;
}

const sizeClassMap: Record<Size, string> = {
  normal: 'text-2xl',
  large: 'text-3xl',
  'extra-large': 'text-4xl',
};

const alignmentClassMap: Record<Alignment, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

const caseClassMap: Record<TextCase, string> = {
  normal: '',
  upper: 'uppercase',
};

export default function TitleSection({
  title,
  alignment = 'left',
  size = 'normal',
  textCase = 'normal',
  color,
  className,
}: TitleSectionProps) {
  const isTailwindColorClass = color?.startsWith('text-');
  const isStringTitle = typeof title === 'string';

  return (
    <div className={clsx('py-5 sm:py-5', alignmentClassMap[alignment], className)}>
      <h2
        className={clsx(
          'font-medium uppercase tracking-tight text-brand-blue',
          sizeClassMap[size],
          caseClassMap[textCase],
          isTailwindColorClass && color
        )}
        style={!isTailwindColorClass && color ? { color } : undefined}
        aria-label={`${title} section title`}
        {...(isStringTitle && { dangerouslySetInnerHTML: { __html: title } })}
      >
        {!isStringTitle && title}
      </h2>
    </div>
  );
}