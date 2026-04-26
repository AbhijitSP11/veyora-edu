import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-40 select-none',
  {
    variants: {
      variant: {
        default:     'bg-primary text-white hover:bg-primary-hover active:scale-[0.98] shadow-xs',
        secondary:   'bg-white text-ink-700 border border-ink-200 hover:bg-ink-50 hover:border-ink-300 active:scale-[0.98]',
        destructive: 'bg-accent-coral text-white hover:bg-rose-600 active:scale-[0.98] shadow-xs',
        ghost:       'text-ink-500 hover:bg-ink-50 hover:text-ink-900',
        link:        'text-primary underline-offset-4 hover:underline p-0 h-auto',
        outline:     'border border-primary text-primary hover:bg-primary-light',
        warm:        'bg-accent-warm text-white hover:bg-orange-600 active:scale-[0.98] shadow-xs',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm:      'h-8 px-3 text-xs rounded-md',
        lg:      'h-11 px-6 text-base rounded-xl',
        xl:      'h-13 px-8 text-base rounded-xl',
        icon:    'h-9 w-9 rounded-lg',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = 'Button';
export { buttonVariants };
