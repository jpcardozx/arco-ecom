/**
 * ARCO Design System - Professional Button Component
 * Enterprise-grade button with mandatory design system compliance
 */

'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';
import { useDesignGate } from '../../core/design-gate';

// Professional Button Variants - Conservative & Business-Appropriate
const buttonVariants = cva(
  // Base styles - Professional foundation
  [
    'inline-flex items-center justify-center gap-2',
    'text-sm font-medium tracking-wide',
    'transition-all duration-200 ease-in-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'select-none'
  ],
  {
    variants: {
      // Variant styles - Professional business variants
      variant: {
        // Primary - Main call-to-action
        primary: [
          'bg-slate-900 text-white shadow-sm',
          'hover:bg-slate-800',
          'focus-visible:ring-slate-950'
        ],

        // Secondary - Supporting actions
        secondary: [
          'bg-slate-100 text-slate-900 shadow-sm border border-slate-200',
          'hover:bg-slate-200 hover:border-slate-300',
          'focus-visible:ring-slate-500'
        ],

        // Outline - Tertiary actions
        outline: [
          'border border-slate-300 bg-transparent text-slate-700',
          'hover:bg-slate-50 hover:border-slate-400',
          'focus-visible:ring-slate-500'
        ],

        // Ghost - Subtle actions
        ghost: [
          'text-slate-700 hover:bg-slate-100',
          'focus-visible:ring-slate-500'
        ],

        // Link - Text-only actions
        link: [
          'text-slate-900 underline-offset-4 hover:underline',
          'focus-visible:ring-slate-500'
        ],

        // Destructive - Dangerous actions
        destructive: [
          'bg-red-600 text-white shadow-sm',
          'hover:bg-red-700',
          'focus-visible:ring-red-500'
        ]
      },

      // Size variants - Professional proportions
      size: {
        sm: 'h-8 px-3 text-xs',
        default: 'h-10 px-4 py-2',
        lg: 'h-12 px-6 text-base',
        xl: 'h-14 px-8 text-lg',
        icon: 'h-10 w-10 p-0'
      },

      // Professional radius options
      radius: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        default: 'rounded-md',
        lg: 'rounded-lg'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      radius: 'default'
    }
  }
);

// Button Props Interface
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// Professional Button Component
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      radius,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    // Design System Gate Validation
    useDesignGate('Button', { className, variant, size, radius, ...props });

    const Comp = asChild ? Slot : 'button';
    const isDisabled = disabled || loading;

    // Handle asChild case - wrap content in single element for Slot compatibility
    const content = (
      <>
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {leftIcon && !loading && leftIcon}
        {children}
        {rightIcon && !loading && rightIcon}
      </>
    );

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, radius }), className)}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {content}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
export type { VariantProps as ButtonVariantProps };