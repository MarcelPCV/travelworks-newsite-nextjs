import { ReactNode } from 'react';
import { clsx } from 'clsx';

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
  html?: boolean;
  titleMaxWidth?: string; // Optional Tailwind max-width class
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
  html = false,
  titleMaxWidth,
}: TitleSectionProps) {
  const isTailwindColorClass = color?.startsWith('text-');

  const titleContent =
    html && typeof title === 'string' ? (
      <span dangerouslySetInnerHTML={{ __html: title }} />
    ) : (
      title
    );

  return (
    <div
      className={clsx(
        'py-5 sm:py-5 uppercase flex justify-center',
        alignmentClassMap[alignment],
        className
      )}
    >
      <h2
        className={clsx(
          'font-light tracking-tight text-brand-blue [&_strong]:font-semibold',
          sizeClassMap[size],
          caseClassMap[textCase],
          titleMaxWidth,
          isTailwindColorClass && color
        )}
        style={!isTailwindColorClass && color ? { color } : undefined}
        aria-label={
          typeof title === 'string' ? `${title} section title` : undefined
        }
      >
        {titleContent}
      </h2>
    </div>
  );
}