/**
 * ARCO Feature Section Component
 * Reusable feature section with image and content
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/design-system/primitives/button';
import { Badge } from '@/components/design-system/primitives/badge';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Section } from './Section';

interface Feature {
  text: string;
  icon?: React.ReactNode;
}

interface FeatureAction {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'default' | 'secondary' | 'outline' | 'ghost';
}

interface FeatureSectionProps {
  variant?: 'default' | 'dark' | 'light' | 'arco-dark' | 'arco-blue' | 'arco-gray';
  layout?: 'image-left' | 'image-right' | 'centered';
  badge?: string;
  title: string;
  description: string;
  features?: Feature[];
  image: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  actions?: FeatureAction[];
  className?: string;
}

export const FeatureSection: React.FC<FeatureSectionProps> = ({
  variant = 'default',
  layout = 'image-left',
  badge,
  title,
  description,
  features = [],
  image,
  actions = [],
  className,
}) => {
  const isImageLeft = layout === 'image-left';
  const isCentered = layout === 'centered';

  return (
    <Section variant={variant} className={className}>
      <div
        className={cn(
          'flex flex-col gap-12',
          isCentered ? 'items-center text-center' : 'lg:flex-row lg:items-center lg:gap-16',
          isImageLeft && !isCentered ? 'lg:flex-row' : 'lg:flex-row-reverse'
        )}
      >
        {/* Image */}
        <div className={cn('flex-1', isCentered ? 'max-w-2xl' : '')}>
          <div className="relative aspect-video overflow-hidden rounded-2xl">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width || 600}
              height={image.height || 400}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className={cn('flex-1', isCentered ? 'max-w-2xl' : '')}>
          <div className="space-y-6">
            {/* Badge */}
            {badge && (
              <div className={cn(isCentered ? 'flex justify-center' : '')}>
                <Badge
                  variant="secondary"
                  className={cn(
                    'text-sm font-semibold',
                    variant === 'dark' || variant === 'arco-dark' || variant === 'arco-blue'
                      ? 'bg-white/10 text-white hover:bg-white/20'
                      : ''
                  )}
                >
                  {badge}
                </Badge>
              </div>
            )}

            {/* Title */}
            <h2
              className={cn(
                'text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl',
                'font-[family-name:var(--font-ruwudu)]'
              )}
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              {title}
            </h2>

            {/* Description */}
            <p
              className={cn(
                'text-lg leading-relaxed md:text-xl',
                variant === 'dark' || variant === 'arco-dark' || variant === 'arco-blue'
                  ? 'text-white/90'
                  : 'text-muted-foreground',
                'font-[family-name:var(--font-lora)]'
              )}
              style={{ textWrap: 'pretty' } as React.CSSProperties}
            >
              {description}
            </p>

            {/* Features List */}
            {features.length > 0 && (
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div
                      className={cn(
                        'flex h-5 w-5 items-center justify-center rounded-full',
                        variant === 'dark' || variant === 'arco-dark' || variant === 'arco-blue'
                          ? 'bg-white/20'
                          : 'bg-primary/20'
                      )}
                    >
                      {feature.icon || (
                        <Check
                          className={cn(
                            'h-3 w-3',
                            variant === 'dark' || variant === 'arco-dark' || variant === 'arco-blue'
                              ? 'text-white'
                              : 'text-primary'
                          )}
                        />
                      )}
                    </div>
                    <span
                      className={cn(
                        'text-sm font-medium',
                        'font-[family-name:var(--font-lora)]'
                      )}
                    >
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            {actions.length > 0 && (
              <div
                className={cn(
                  'flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0',
                  isCentered ? 'justify-center' : ''
                )}
              >
                {actions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant || (index === 0 ? 'default' : 'outline')}
                    onClick={action.onClick}
                    className={cn(
                      action.variant === 'outline' &&
                        (variant === 'dark' || variant === 'arco-dark' || variant === 'arco-blue')
                        ? 'border-white/20 bg-white/10 text-white hover:bg-white/20'
                        : ''
                    )}
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
          </div>
        </div>
      </div>
    </Section>
  );
};

export default FeatureSection;