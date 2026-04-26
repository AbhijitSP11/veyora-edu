import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium',
  {
    variants: {
      variant: {
        default:  'bg-ink-100 text-ink-600',
        success:  'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20',
        warning:  'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20',
        error:    'bg-rose-50 text-rose-700 ring-1 ring-rose-600/20',
        info:     'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20',
        primary:  'bg-primary-light text-primary ring-1 ring-primary/20',
        violet:   'bg-violet-50 text-violet-700 ring-1 ring-violet-600/20',
        orange:   'bg-orange-50 text-orange-700 ring-1 ring-orange-600/20',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
