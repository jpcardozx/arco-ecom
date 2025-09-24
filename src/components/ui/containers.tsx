/**
 * ARCO Standardized Container System
 * 4 responsive container models with consistent spacing
 */

import React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const containerVariants = cva(
  'mx-auto w-full',
  {
    variants: {
      size: {
        // Modelo 1: Tight - Para conteúdo focado
        tight: 'max-w-4xl px-4 sm:px-6 lg:px-8',
        // Modelo 2: Standard - Para uso geral
        standard: 'max-w-6xl px-4 sm:px-6 lg:px-8',
        // Modelo 3: Wide - Para showcases e galerias
        wide: 'max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12',
        // Modelo 4: Full - Para seções hero e backgrounds
        full: 'max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-16',
      },
      padding: {
        none: '',
        sm: 'py-8',
        md: 'py-12 lg:py-16',
        lg: 'py-16 lg:py-24',
        xl: 'py-20 lg:py-32',
      }
    },
    defaultVariants: {
      size: 'standard',
      padding: 'md',
    },
  }
);

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(containerVariants({ size, padding, className }))}
        {...props}
      />
    );
  }
);
Container.displayName = 'Container';

// Container específicos com comportamentos otimizados
export const TightContainer = React.forwardRef<HTMLDivElement, Omit<ContainerProps, 'size'>>(
  ({ className, ...props }, ref) => (
    <Container ref={ref} size="tight" className={className} {...props} />
  )
);
TightContainer.displayName = 'TightContainer';

export const StandardContainer = React.forwardRef<HTMLDivElement, Omit<ContainerProps, 'size'>>(
  ({ className, ...props }, ref) => (
    <Container ref={ref} size="standard" className={className} {...props} />
  )
);
StandardContainer.displayName = 'StandardContainer';

export const WideContainer = React.forwardRef<HTMLDivElement, Omit<ContainerProps, 'size'>>(
  ({ className, ...props }, ref) => (
    <Container ref={ref} size="wide" className={className} {...props} />
  )
);
WideContainer.displayName = 'WideContainer';

export const FullContainer = React.forwardRef<HTMLDivElement, Omit<ContainerProps, 'size'>>(
  ({ className, ...props }, ref) => (
    <Container ref={ref} size="full" className={className} {...props} />
  )
);
FullContainer.displayName = 'FullContainer';