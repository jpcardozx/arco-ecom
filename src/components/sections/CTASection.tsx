/**
 * Call-to-Action Section Component
 * Uses SectionWrapper + TightContainer + Premium styling
 */

import React from 'react';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { PremiumBadge, GradientText, FloatingElement, DecorativeArrow } from '@/components/ui/adornments';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, Star } from 'lucide-react';

interface CTASectionProps {
  badge?: string;
  title: string;
  subtitle?: string;
  primaryCta: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryCta?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  variant?: 'default' | 'premium' | 'glass';
  showDecorations?: boolean;
}

export const CTASection: React.FC<CTASectionProps> = ({
  badge,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  variant = 'premium',
  showDecorations = true
}) => {
  const backgroundVariant = variant === 'premium' ? 'gradient' : variant === 'glass' ? 'glass' : 'default';

  return (
    <SectionWrapper
      size="tight"
      padding="lg"
      animation="slideUp"
      background={backgroundVariant}
      pattern={variant === 'premium' ? 'mesh' : 'gradient'}
      badge={badge ? {
        text: badge,
        icon: 'zap',
        variant: variant === 'premium' ? 'default' : 'outline'
      } : undefined}
      header={{
        title: (
          <>
            {title.split(' ').slice(0, -1).join(' ')} <GradientText variant="secondary">{title.split(' ').slice(-1)[0]}</GradientText>
          </>
        ) as unknown as string,
        subtitle,
        alignment: 'center'
      }}
      cta={{
        primary: {
          text: primaryCta.text,
          href: primaryCta.href,
          onClick: primaryCta.onClick,
          variant: variant === 'premium' ? 'default' : 'default'
        },
        secondary: secondaryCta ? {
          text: secondaryCta.text,
          href: secondaryCta.href,
          onClick: secondaryCta.onClick,
          variant: 'ghost'
        } : undefined
      }}
      className="relative text-center"
    >
      {showDecorations && (
        <>
          <FloatingElement delay={0} className="top-4 left-4">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </FloatingElement>

          <FloatingElement delay={1} className="top-8 right-8">
            <PremiumBadge
              text="Limited Time"
              icon="zap"
              variant="warning"
              glow
            />
          </FloatingElement>

          <FloatingElement delay={2} className="bottom-12 left-8">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
              <Star className="w-3 h-3 text-yellow-400" />
              <span className="text-xs text-white font-medium">Trusted by 10k+</span>
            </div>
          </FloatingElement>

          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <DecorativeArrow direction="down" variant="accent" animated />
          </div>
        </>
      )}

      {/* Additional content area */}
      <div className="mt-8 pt-8 border-t border-border/20">
        <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            No credit card required
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            Free 14-day trial
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            Cancel anytime
          </span>
        </div>
      </div>
    </SectionWrapper>
  );
};