/**
 * ARCO Section Wrapper System
 * Advanced section wrapper with transitions, badges, headers, CTAs and UI adornments
 */

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Container, type ContainerProps } from './containers';
import { Badge } from './badge';
import { Button } from './button';
import { ArrowRight, Sparkles, Star, Zap, Crown } from 'lucide-react';

// Animation presets
const animationPresets = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  slideUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 40 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  },
  slideInRight: {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 40 },
  }
};

// Background patterns
const BackgroundPattern = ({ pattern }: { pattern: 'dots' | 'grid' | 'gradient' | 'mesh' }) => {
  if (pattern === 'dots') {
    return (
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1)_1px,transparent_1px)] bg-[length:24px_24px] opacity-50" />
    );
  }

  if (pattern === 'grid') {
    return (
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[length:32px_32px]" />
    );
  }

  if (pattern === 'gradient') {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
    );
  }

  if (pattern === 'mesh') {
    return (
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>
    );
  }

  return null;
};

// Adornment icons
const adornmentIcons = {
  sparkles: Sparkles,
  star: Star,
  zap: Zap,
  crown: Crown,
  arrow: ArrowRight,
};

export interface SectionWrapperProps extends Omit<ContainerProps, 'children'> {
  children: React.ReactNode;

  // Animation
  animation?: keyof typeof animationPresets | 'none';
  animationDelay?: number;
  animationDuration?: number;

  // Section styling
  background?: 'default' | 'muted' | 'accent' | 'gradient' | 'glass';
  pattern?: 'dots' | 'grid' | 'gradient' | 'mesh' | 'none';

  // Header system
  badge?: {
    text: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
    icon?: 'sparkles' | 'star' | 'zap' | 'crown' | 'arrow';
  };
  header?: {
    title: string;
    subtitle?: string;
    alignment?: 'left' | 'center' | 'right';
  };

  // CTA system
  cta?: {
    primary?: {
      text: string;
      href?: string;
      onClick?: () => void;
      variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    };
    secondary?: {
      text: string;
      href?: string;
      onClick?: () => void;
      variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    };
  };

  // Layout
  headerSpacing?: 'sm' | 'md' | 'lg';
  ctaSpacing?: 'sm' | 'md' | 'lg';
  contentSpacing?: 'sm' | 'md' | 'lg';
}

export const SectionWrapper = React.forwardRef<HTMLElement, SectionWrapperProps>(
  ({
    children,
    className,
    animation = 'fadeIn',
    animationDelay = 0,
    animationDuration = 0.6,
    background = 'default',
    pattern = 'none',
    badge,
    header,
    cta,
    headerSpacing = 'md',
    ctaSpacing = 'md',
    contentSpacing = 'md',
    ...containerProps
  }, ref) => {

    const backgroundClasses = {
      default: '',
      muted: 'bg-muted/30',
      accent: 'bg-accent/5',
      gradient: 'bg-gradient-to-b from-background to-muted/20',
      glass: 'bg-white/5 backdrop-blur-sm border border-white/10',
    };

    const spacingClasses = {
      sm: 'space-y-4',
      md: 'space-y-6',
      lg: 'space-y-8',
    };

    const alignmentClasses = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    };

    const MotionContainer = animation !== 'none' ? motion.section : 'section';
    const animationProps = animation !== 'none' ? {
      ...animationPresets[animation],
      transition: {
        duration: animationDuration,
        delay: animationDelay,
        ease: [0.21, 0.45, 0.27, 0.99],
      },
    } : {};

    return (
      <MotionContainer
        ref={ref}
        className={cn(
          'relative overflow-hidden',
          backgroundClasses[background],
          className
        )}
        {...animationProps}
      >
        {/* Background Pattern */}
        {pattern !== 'none' && <BackgroundPattern pattern={pattern} />}

        <Container {...containerProps}>
          {/* Badge */}
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: animationDelay + 0.1 }}
              className={cn(
                'flex justify-start',
                header?.alignment === 'center' && 'justify-center',
                header?.alignment === 'right' && 'justify-end'
              )}
            >
              <Badge variant={badge.variant || 'default'} className="mb-4">
                {badge.icon && React.createElement(adornmentIcons[badge.icon], {
                  className: 'w-3 h-3 mr-1.5'
                })}
                {badge.text}
              </Badge>
            </motion.div>
          )}

          {/* Header */}
          {header && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: animationDelay + 0.2 }}
              className={cn(
                spacingClasses[headerSpacing],
                alignmentClasses[header.alignment || 'left']
              )}
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {header.title}
              </h2>
              {header.subtitle && (
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  {header.subtitle}
                </p>
              )}
            </motion.div>
          )}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: animationDelay + 0.3 }}
            className={cn(
              spacingClasses[contentSpacing],
              (header || badge) && 'mt-8 lg:mt-12'
            )}
          >
            {children}
          </motion.div>

          {/* CTA */}
          {cta && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: animationDelay + 0.4 }}
              className={cn(
                'flex flex-col sm:flex-row gap-4',
                spacingClasses[ctaSpacing],
                'mt-8 lg:mt-12',
                header?.alignment === 'center' && 'justify-center',
                header?.alignment === 'right' && 'justify-end'
              )}
            >
              {cta.primary && (
                <Button
                  variant={cta.primary.variant || 'default'}
                  size="lg"
                  className="group"
                  onClick={cta.primary.onClick}
                  asChild={!!cta.primary.href}
                >
                  {cta.primary.href ? (
                    <a href={cta.primary.href}>
                      {cta.primary.text}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  ) : (
                    <>
                      {cta.primary.text}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              )}

              {cta.secondary && (
                <Button
                  variant={cta.secondary.variant || 'outline'}
                  size="lg"
                  onClick={cta.secondary.onClick}
                  asChild={!!cta.secondary.href}
                >
                  {cta.secondary.href ? (
                    <a href={cta.secondary.href}>{cta.secondary.text}</a>
                  ) : (
                    cta.secondary.text
                  )}
                </Button>
              )}
            </motion.div>
          )}
        </Container>
      </MotionContainer>
    );
  }
);
SectionWrapper.displayName = 'SectionWrapper';