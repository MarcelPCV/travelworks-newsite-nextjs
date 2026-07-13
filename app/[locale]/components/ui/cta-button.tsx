import type { ButtonHTMLAttributes, ReactNode } from 'react';

type CtaButtonVariant =
  | 'default'
  | 'blue'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'dark'
  | 'ghost'
  | 'orangeGradient';
type CtaButtonSize = 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl';
type CtaButtonIconPosition = 'before' | 'after';

export type CtaButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  variant?: CtaButtonVariant;
  size?: CtaButtonSize;
  icon?: ReactNode;
  iconPosition?: CtaButtonIconPosition;
};

const variantClassNames: Record<CtaButtonVariant, string> = {
  default:
    'border-transparent bg-brand-blue text-white hover:bg-[#1d4ed8] active:bg-[#1e40af] focus-visible:ring-[#93c5fd]',
  blue: 'border-transparent bg-[#2563eb] text-white hover:bg-[#1d4ed8] active:bg-[#1e40af] focus-visible:ring-[#93c5fd]',
  secondary:
    'border-[#334155] bg-[#1f2937] text-[#cbd5e1] hover:bg-[#273446] active:bg-[#1b2432] focus-visible:ring-[#64748b]',
  tertiary:
    'border-[#1e293b] bg-[#0f172a] text-[#cbd5e1] hover:bg-[#162236] active:bg-[#0b1425] focus-visible:ring-[#475569]',
  success:
    'border-transparent bg-[#2f9f77] text-white hover:bg-[#288b68] active:bg-[#22785a] focus-visible:ring-[#6ee7b7]',
  danger:
    'border-transparent bg-[#c31643] text-white hover:bg-[#ad133b] active:bg-[#961134] focus-visible:ring-[#fda4af]',
  warning:
    'border-transparent bg-[#f06b00] text-white hover:bg-[#d86100] active:bg-[#bf5600] focus-visible:ring-[#fdba74]',
  dark: 'border-transparent bg-[#1e293b] text-white hover:bg-[#273548] active:bg-[#172131] focus-visible:ring-[#94a3b8]',
  ghost:
    'border-transparent bg-transparent text-white shadow-none hover:bg-white/10 active:bg-white/20 focus-visible:ring-[#94a3b8]',
  orangeGradient:
    'border-transparent bg-gradient-to-r from-brand-orange-light to-brand-orange-dark text-white hover:from-[#f7b24a] hover:to-[#eb6f21] active:from-[#eaa63f] active:to-[#db641d] focus-visible:ring-[#fdba74]',
};

const sizeClassNames: Record<CtaButtonSize, string> = {
  xs: 'h-10 px-4 text-sm',
  sm: 'h-11 px-5 text-base',
  base: 'h-12 px-6 text-lg',
  md: 'h-12 px-6 text-lg',
  lg: 'h-14 px-8 text-xl',
  xl: 'h-16 px-10 text-[1.625rem]',
};

const iconSizeClassNames: Record<CtaButtonSize, string> = {
  xs: 'h-4 w-4',
  sm: 'h-[18px] w-[18px]',
  base: 'h-5 w-5',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-7 w-7',
};

export default function CtaButton({
  label,
  variant = 'blue',
  size = 'base',
  icon,
  iconPosition = 'after',
  className,
  type = 'button',
  ...props
}: CtaButtonProps) {
  const rootClassName = [
    'inline-flex items-center justify-center gap-2.5 rounded-sm border font-semibold leading-none shadow-[0_1px_2px_rgba(16,24,40,0.18)] transition-all duration-150',
    'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-55',
    variantClassNames[variant],
    sizeClassNames[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const iconClassName = iconSizeClassNames[size];
  const showIconBefore = Boolean(icon) && iconPosition === 'before';
  const showIconAfter = Boolean(icon) && iconPosition === 'after';

  return (
    <button type={type} className={rootClassName} {...props}>
      {showIconBefore ? (
        <span className={`inline-flex items-center justify-center shrink-0 ${iconClassName}`}>
          {icon}
        </span>
      ) : null}
      <span className="inline-flex items-center leading-none">
        {label}
      </span>
      {showIconAfter ? (
        <span className={`inline-flex items-center justify-center shrink-0 ${iconClassName}`}>
          {icon}
        </span>
      ) : null}
    </button>
  );
}
