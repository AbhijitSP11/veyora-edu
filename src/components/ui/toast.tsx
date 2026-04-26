import * as ToastPrimitive from '@radix-ui/react-toast';
import { X } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const ToastProvider = ToastPrimitive.Provider;
export const ToastViewport = ({ className, ...props }: ToastPrimitive.ToastViewportProps) => (
  <ToastPrimitive.Viewport
    className={cn(
      'fixed top-4 right-4 z-[100] flex max-h-screen w-full max-w-sm flex-col gap-2',
      className,
    )}
    {...props}
  />
);

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-xl border p-4 pr-8 shadow-lg transition-all',
  {
    variants: {
      variant: {
        default: 'border-gray-200 bg-white text-gray-900',
        success: 'border-emerald-200 bg-emerald-50 text-emerald-900',
        error: 'border-red-200 bg-red-50 text-red-900',
        warning: 'border-amber-200 bg-amber-50 text-amber-900',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

export interface ToastProps
  extends ToastPrimitive.ToastProps,
    VariantProps<typeof toastVariants> {}

export function Toast({ className, variant, ...props }: ToastProps) {
  return (
    <ToastPrimitive.Root
      className={cn(
        toastVariants({ variant }),
        'data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]',
        'data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=open]:animate-in',
        'data-[state=closed]:animate-out data-[swipe=end]:animate-out',
        'data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full',
        'data-[state=open]:slide-in-from-top-full',
        className,
      )}
      {...props}
    />
  );
}

export function ToastClose({ className, ...props }: ToastPrimitive.ToastCloseProps) {
  return (
    <ToastPrimitive.Close
      className={cn(
        'absolute right-2 top-2 rounded-md p-1 text-gray-400 hover:text-gray-600 transition-colors',
        className,
      )}
      toast-close=""
      {...props}
    >
      <X className="size-4" />
    </ToastPrimitive.Close>
  );
}

export function ToastTitle({ className, ...props }: ToastPrimitive.ToastTitleProps) {
  return (
    <ToastPrimitive.Title
      className={cn('text-sm font-semibold', className)}
      {...props}
    />
  );
}

export function ToastDescription({ className, ...props }: ToastPrimitive.ToastDescriptionProps) {
  return (
    <ToastPrimitive.Description
      className={cn('text-sm opacity-90', className)}
      {...props}
    />
  );
}

export type ToastActionElement = React.ReactElement<typeof ToastPrimitive.Action>;
