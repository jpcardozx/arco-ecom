/**
 * ARCO Hero Component
 * Flexible hero section with multiple variants and responsive design
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/design-system/primitives/button';
import { UnifiedNavigation } from '@/components/common/navigation/UnifiedNavigationStier';
import { cn } from '@/lib/utils';

interface HeroAction {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'default' | 'secondary' | 'outline' | 'ghost';
}

interface HeroProps {
  variant?: 'centered' | 'split' | 'minimal';
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  backgroundColor?: 'dark' | 'light' | 'gradient' | 'arco-dark';
  actions?: HeroAction[];
  overlay?: boolean;
  showNavigation?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Hero: React.FC<HeroProps> = ({
  variant = 'centered',
  title,
  subtitle,
  description,
  backgroundImage,
  backgroundColor = 'arco-dark',
  actions = [],
  overlay = true,
  showNavigation = true,
  className,
  children,
}) => {
  const backgroundVariants = {
    dark: 'bg-arco-midnight',
    light: 'bg-arco-light',
    gradient: 'bg-gradient-to-br from-arco-midnight via-arco-obsidian to-arco-steel',
    'arco-dark': 'bg-arco-midnight',
  };

  const textColorVariants = {
    dark: 'text-white',
    light: 'text-gray-900',
    gradient: 'text-gray-900',
    'arco-dark': 'text-white',
  };

  return (
    <>
      {/* Navigation */}
      {showNavigation && <UnifiedNavigation />}
      
      <section
        className={cn(
          'relative flex items-center justify-center overflow-hidden',
          variant === 'minimal' ? 'py-16 md:py-24' : 'min-h-[600px] py-20 md:py-32',
          backgroundVariants[backgroundColor],
          'bg-texture-dots', // Add subtle texture
          className
        )}
      >
      {/* Background Image */}
      {backgroundImage && (
        <>
          <Image
            src={backgroundImage}
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
          {overlay && (
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
          )}
        </>
      )}

      {/* Hero background with improved visibility */}
      {backgroundImage ? (
        <>
          <Image
            src={backgroundImage}
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
          {overlay && (
            <div className="absolute inset-0 bg-gradient-to-br from-arco-midnight/80 via-arco-midnight/60 to-arco-midnight/80" />
          )}
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-arco-san-marino via-arco-dark-blue to-arco-midnight" />
          <div className="absolute inset-0 bg-texture-grid" />
        </>
      )}

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-arco-blue/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-arco-accent/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-arco-san-marino/10 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div
          className={cn(
            'mx-auto flex flex-col items-center text-center',
            variant === 'minimal' ? 'max-w-2xl' : 'max-w-4xl'
          )}
        >
          {/* Subtitle */}
          {subtitle && (
            <div className="mb-6">
              <span
                className={cn(
                  'inline-block rounded-full px-6 py-3 text-sm font-semibold backdrop-blur-sm',
                  'border border-white/20 shadow-lg transition-all duration-300 hover:scale-105',
                  backgroundColor === 'light'
                    ? 'bg-primary/10 text-primary border-primary/20'
                    : 'bg-white/10 text-white hover:bg-white/15'
                )}
              >
                {subtitle}
              </span>
            </div>
          )}

          {/* Title */}
          <h1
            className={cn(
              'mb-8 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl',
              textColorVariants[backgroundColor],
              'font-display drop-shadow-lg',
              backgroundColor === 'light'
                ? 'text-arco-midnight'
                : 'bg-gradient-to-br from-white via-white to-white/90 bg-clip-text text-transparent'
            )}
            style={{ textWrap: 'balance' } as React.CSSProperties}
          >
            {title}
          </h1>

          {/* Description */}
          {description && (
            <p
              className={cn(
                'mb-10 max-w-2xl text-lg leading-relaxed md:text-xl',
                backgroundColor === 'light'
                  ? 'text-arco-gray'
                  : 'text-white/90 drop-shadow-sm',
                'font-body'
              )}
              style={{ textWrap: 'pretty' } as React.CSSProperties}
            >
              {description}
            </p>
          )}

          {/* Actions */}
          {actions.length > 0 && (
            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant || (index === 0 ? 'default' : 'outline')}
                  size="lg"
                  className={cn(
                    'min-w-[160px] shadow-float transition-all duration-300',
                    index === 0 && 'gradient-arco-primary hover:shadow-glow animate-pulse-glow',
                    action.variant === 'outline' && backgroundColor !== 'light'
                      ? 'border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
                      : ''
                  )}
                  onClick={action.onClick}
                  asChild={!!action.href}
                >
                  {action.href ? (
                    <a href={action.href}>{action.label}</a>
                  ) : (
                    action.label
                  )}
                </Button>
              ))}
            </div>
          )}

          {/* Custom Children */}
          {children && (
            <div className="mt-8">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
    </>
  );
};

export default Hero;