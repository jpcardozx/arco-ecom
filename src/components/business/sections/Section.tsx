/**
 * ARCO Section Component
 * Flexible section wrapper with consistent spacing and variants
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  variant?: 'default' | 'dark' | 'light' | 'gradient' | 'arco-dark' | 'arco-blue' | 'arco-gray';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  container?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  variant = 'default',
  size = 'md',
  container = true,
  className,
  children,
}) => {
  const variants = {
    default: 'bg-background text-foreground',
    dark: 'bg-gray-900 text-white',
    light: 'bg-gray-50 text-gray-900',
    gradient: 'bg-gradient-to-br from-primary/5 to-primary/10 text-foreground',
    'arco-dark': 'bg-[hsl(var(--arco-dark))] text-white',
    'arco-blue': 'bg-[hsl(var(--arco-blue))] text-white',
    'arco-gray': 'bg-[hsl(var(--arco-gray))] text-white',
  };

  const sizes = {
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-16 lg:py-20',
    lg: 'py-16 md:py-20 lg:py-24',
    xl: 'py-20 md:py-24 lg:py-32',
  };

  return (
    <section
      className={cn(
        'relative overflow-hidden',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {container ? (
        <div className="container mx-auto px-4 md:px-6">
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
};

export default Section;