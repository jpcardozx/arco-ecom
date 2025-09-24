/**
 * Hero Section Component
 * Uses SectionWrapper + FullContainer + UI adornments
 */

import React from 'react';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { PremiumBadge, GradientText, FloatingElement, DecorativeArrow } from '@/components/ui/adornments';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Star, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  badge?: {
    text: string;
    icon?: 'sparkles' | 'star' | 'zap' | 'crown';
  };
  title: string;
  subtitle?: string;
  primaryCta?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryCta?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  showFloatingElements?: boolean;
  variant?: 'default' | 'gradient' | 'glass';
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  badge,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  showFloatingElements = true,
  variant = 'gradient'
}) => {
  return (
    <SectionWrapper
      size="full"
      padding="xl"
      animation="fadeIn"
      background={variant}
      pattern="mesh"
      badge={badge ? {
        text: badge.text,
        icon: badge.icon
      } : undefined}
      header={{
        title: (
          <>
            {title.split(' ').map((word, index) => (
              index === title.split(' ').length - 1 ? (
                <GradientText key={index} variant="primary">
                  {word}
                </GradientText>
              ) : (
                <span key={index}>{word} </span>
              )
            ))}
          </>
        ) as unknown as string,
        subtitle,
        alignment: 'center'
      }}
      cta={{
        primary: primaryCta ? {
          text: primaryCta.text,
          href: primaryCta.href,
          onClick: primaryCta.onClick,
          variant: 'default'
        } : undefined,
        secondary: secondaryCta ? {
          text: secondaryCta.text,
          href: secondaryCta.href,
          onClick: secondaryCta.onClick,
          variant: 'outline'
        } : undefined
      }}
      className="relative min-h-screen flex items-center"
    >
      {showFloatingElements && (
        <>
          <FloatingElement delay={0} className="top-20 left-10">
            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Star className="w-6 h-6 text-yellow-400" />
            </div>
          </FloatingElement>

          <FloatingElement delay={2} className="top-32 right-16">
            <PremiumBadge
              text="Premium"
              icon="crown"
              variant="premium"
              glow
              animate
            />
          </FloatingElement>

          <FloatingElement delay={4} className="bottom-32 left-20">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg text-white text-sm font-medium">
              AI-Powered
            </div>
          </FloatingElement>
        </>
      )}

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <DecorativeArrow direction="down" variant="muted" />
      </div>
    </SectionWrapper>
  );
};