/**
 * ARCO Testimonial Section Component
 * Professional testimonial section with ratings and author info
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Section } from './Section';

interface Testimonial {
  quote: string;
  author: {
    name: string;
    role: string;
    company?: string;
    avatar?: string;
  };
  rating?: number;
  logo?: string;
}

interface TestimonialSectionProps {
  variant?: 'default' | 'dark' | 'light' | 'arco-dark' | 'arco-blue';
  testimonial: Testimonial;
  showPagination?: boolean;
  currentIndex?: number;
  totalItems?: number;
  className?: string;
}

export const TestimonialSection: React.FC<TestimonialSectionProps> = ({
  variant = 'arco-dark',
  testimonial,
  showPagination = true,
  currentIndex = 0,
  totalItems = 2,
  className,
}) => {
  const { quote, author, rating = 5, logo } = testimonial;

  return (
    <Section variant={variant} size="lg" className={className}>
      <div className="mx-auto max-w-4xl text-center">
        <div className="space-y-8">
          {/* Rating Stars */}
          <div className="flex justify-center space-x-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'h-5 w-5',
                  i < rating
                    ? 'fill-yellow-400 text-yellow-400'
                    : variant === 'dark' || variant === 'arco-dark'
                    ? 'text-white/30'
                    : 'text-gray-300'
                )}
              />
            ))}
          </div>

          {/* Quote */}
          <blockquote
            className={cn(
              'text-2xl font-medium leading-tight tracking-tight md:text-3xl lg:text-4xl',
              'font-[family-name:var(--font-ruwudu)]'
            )}
            style={{ textWrap: 'balance' } as React.CSSProperties}
          >
            "{quote}"
          </blockquote>

          {/* Author */}
          <div className="flex items-center justify-center space-x-6">
            {/* Avatar */}
            {author.avatar && (
              <div className="relative h-14 w-14 overflow-hidden rounded-full">
                <Image
                  src={author.avatar}
                  alt={author.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Author Info */}
            <div className="text-left">
              <div
                className={cn(
                  'font-semibold',
                  'font-[family-name:var(--font-lora)]'
                )}
              >
                {author.name}
              </div>
              <div
                className={cn(
                  'text-sm',
                  variant === 'dark' || variant === 'arco-dark'
                    ? 'text-white/70'
                    : 'text-muted-foreground',
                  'font-[family-name:var(--font-lora)]'
                )}
              >
                {author.role}
                {author.company && `, ${author.company}`}
              </div>
            </div>

            {/* Divider */}
            <div
              className={cn(
                'h-12 w-px',
                variant === 'dark' || variant === 'arco-dark'
                  ? 'bg-white/20'
                  : 'bg-border'
              )}
            />

            {/* Company Logo */}
            {logo && (
              <div className="h-12 w-28 rounded bg-white/10" />
            )}
          </div>

          {/* Pagination */}
          {showPagination && (
            <div className="flex justify-center space-x-2">
              {Array.from({ length: totalItems }).map((_, i) => (
                <button
                  key={i}
                  className={cn(
                    'h-2 w-2 rounded-full transition-colors',
                    i === currentIndex
                      ? variant === 'dark' || variant === 'arco-dark'
                        ? 'bg-white'
                        : 'bg-primary'
                      : variant === 'dark' || variant === 'arco-dark'
                      ? 'bg-white/20'
                      : 'bg-gray-300'
                  )}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};

export default TestimonialSection;