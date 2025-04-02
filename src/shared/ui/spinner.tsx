import React from 'react';
import { Loader2 } from 'lucide-react';

import { cn } from '@/shared/lib/tailwind-merge';

import { VariantProps, cva } from 'class-variance-authority';

const spinnerVariants = cva('flex-col items-center justify-center', {
  variants: {
    show: {
      true: 'flex',
      false: 'hidden',
    },
  },
  defaultVariants: {
    show: true,
  },
});

const loaderVariants = cva('animate-spin text-primary', {
  variants: {
    size: {
      small: 'size-6',
      medium: 'size-8',
      large: 'size-12',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

interface SpinnerContentProps
  extends VariantProps<typeof spinnerVariants>,
    VariantProps<typeof loaderVariants> {
  className?: string;
  containerClassName?: string;
  children?: React.ReactNode;
}

export function Spinner({
  size,
  show,
  children,
  className,
  containerClassName,
}: SpinnerContentProps) {
  return (
    <div className={cn('flex justify-center items-center h-full w-full', containerClassName)}>
      <span className={spinnerVariants({ show })}>
        <Loader2 className={cn(loaderVariants({ size }), className)} />
        {children}
      </span>
    </div>
  );
}
