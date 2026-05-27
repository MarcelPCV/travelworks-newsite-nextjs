'use client';

import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { useEffect, useId, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from 'react';
import CtaButton, { type CtaButtonProps } from './cta-button';

type DropdownCtaButtonVariant = NonNullable<CtaButtonProps['variant']>;
type DropdownCtaButtonSize = NonNullable<CtaButtonProps['size']>;
type DropdownCtaAlign = 'left' | 'right';

const optionIconSizeClassNames: Record<DropdownCtaButtonSize, string> = {
  xs: 'w-5 h-5',
  sm: 'w-5 h-5',
  base: 'w-5 h-5',
  md: 'w-5 h-5',
  lg: 'w-5 h-5',
  xl: 'w-5 h-5',
};

export type DropdownCtaOption = {
  id: string;
  label: string;
  icon?: ReactNode;
  href?: string;
  onSelect?: () => void;
  disabled?: boolean;
  target?: string;
  rel?: string;
};

export type DropdownCtaButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onSelect'> & {
  label: string;
  variant?: DropdownCtaButtonVariant;
  size?: DropdownCtaButtonSize;
  options: DropdownCtaOption[];
  onSelect?: (option: DropdownCtaOption) => void;
  align?: DropdownCtaAlign;
  menuClassName?: string;
};

export default function DropdownCtaButton({
  label,
  variant = 'blue',
  size = 'base',
  options,
  onSelect,
  align = 'left',
  menuClassName,
  className,
  type = 'button',
  ...props
}: DropdownCtaButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuId = `dropdown-cta-menu-${useId()}`;

  const clearScheduledClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const scheduleClose = (delay = 120) => {
    clearScheduledClose();
    closeTimerRef.current = setTimeout(() => setIsOpen(false), delay);
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onDocumentClick = (event: MouseEvent) => {
      if (!rootRef.current) {
        return;
      }

      if (!rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', onDocumentClick);
    document.addEventListener('keydown', onEscape);

    return () => {
      document.removeEventListener('mousedown', onDocumentClick);
      document.removeEventListener('keydown', onEscape);
      clearScheduledClose();
    };
  }, [isOpen]);

  const onOptionSelect = (option: DropdownCtaOption) => {
    if (option.disabled) {
      return;
    }

    option.onSelect?.();
    onSelect?.(option);
    setIsOpen(false);
  };

  const alignmentClassName = align === 'right' ? 'right-0' : 'left-0';
  const optionIconClassName = optionIconSizeClassNames[size];

  return (
    <div
      ref={rootRef}
      className="relative inline-flex"
      onMouseEnter={() => {
        clearScheduledClose();
        setIsOpen(true);
      }}
      onMouseLeave={() => {
        scheduleClose();
      }}
    >
      <CtaButton
        label={label}
        variant={variant}
        size={size}
        className={className}
        type={type}
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-haspopup="menu"
        onClick={() => {
          clearScheduledClose();
          setIsOpen((prev) => !prev);
        }}
        icon={<ChevronDown className={`transition-transform duration-150 ${isOpen ? 'rotate-180' : 'rotate-0'}`} aria-hidden="true" />}
        iconPosition="after"
        {...props}
      />

      <div
        id={menuId}
        role="menu"
        aria-hidden={!isOpen}
        className={`absolute ${alignmentClassName} top-full z-50 mt-3 w-56 rounded-xl border border-zinc-300 bg-[#e5e5e5] p-3 shadow-lg transition duration-200 motion-reduce:transition-none ${
          isOpen ? 'visible translate-y-0 opacity-100' : 'pointer-events-none invisible -translate-y-1 opacity-0'
        } ${menuClassName ?? ''}`}
      >
        <ul className="space-y-1">
          {options.map((option) => {
            const content = (
              <>
                {option.icon ? (
                  <span className={`inline-flex shrink-0 items-center justify-center ${optionIconClassName} [&>svg]:text-zinc-800`}>{option.icon}</span>
                ) : null}
                <span>{option.label}</span>
              </>
            );

            if (option.href) {
              return (
                <li key={option.id}>
                  <Link
                    href={option.href}
                    role="menuitem"
                    target={option.target}
                    rel={option.rel}
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-zinc-800 transition duration-150 ${
                      option.disabled ? 'pointer-events-none opacity-45' : 'hover:bg-white'
                    }`}
                    onClick={() => onOptionSelect(option)}
                    aria-disabled={option.disabled ? 'true' : undefined}
                  >
                    {content}
                  </Link>
                </li>
              );
            }

            return (
              <li key={option.id}>
                <button
                  type="button"
                  role="menuitem"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-zinc-800 transition duration-150 hover:bg-white disabled:pointer-events-none disabled:opacity-45"
                  onClick={() => onOptionSelect(option)}
                  disabled={option.disabled}
                >
                  {content}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
