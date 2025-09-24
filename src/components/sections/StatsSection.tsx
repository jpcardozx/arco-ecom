/**
 * Stats Section Component
 * Uses SectionWrapper + WideContainer + Animated Progress
 */

import React from 'react';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { AnimatedProgress, GradientText, PremiumBadge } from '@/components/ui/adornments';

interface Stat {
  label: string;
  value: number;
  max?: number;
  suffix?: string;
  description?: string;
  variant?: 'default' | 'success' | 'warning' | 'gradient';
}

interface StatsSectionProps {
  badge?: string;
  title: string;
  subtitle?: string;
  stats: Stat[];
  layout?: 'horizontal' | 'grid';
  showProgress?: boolean;
}

export const StatsSection: React.FC<StatsSectionProps> = ({
  badge,
  title,
  subtitle,
  stats,
  layout = 'horizontal',
  showProgress = true
}) => {
  return (
    <SectionWrapper
      size="wide"
      padding="lg"
      animation="scaleIn"
      background="accent"
      pattern="gradient"
      badge={badge ? {
        text: badge,
        icon: 'star'
      } : undefined}
      header={{
        title,
        subtitle,
        alignment: 'center'
      }}
    >
      <div className={`
        ${layout === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'
          : 'flex flex-wrap justify-center gap-8 lg:gap-12'
        }
      `}>
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`
              ${layout === 'grid' ? 'text-center' : 'flex-1 min-w-[200px] text-center'}
              space-y-3
            `}
          >
            <div className="space-y-2">
              <div className="text-3xl lg:text-4xl font-bold">
                <GradientText variant={stat.variant === 'gradient' ? 'primary' : 'primary'}>
                  {stat.value.toLocaleString()}{stat.suffix || ''}
                </GradientText>
              </div>

              <h3 className="text-lg font-semibold text-foreground">
                {stat.label}
              </h3>

              {stat.description && (
                <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                  {stat.description}
                </p>
              )}
            </div>

            {showProgress && stat.max && (
              <div className="max-w-xs mx-auto">
                <AnimatedProgress
                  value={stat.value}
                  max={stat.max}
                  variant={stat.variant || 'default'}
                  showValue={false}
                />
              </div>
            )}

            {stat.variant === 'success' && stat.value >= (stat.max || 100) && (
              <div className="flex justify-center">
                <PremiumBadge
                  text="Target Achieved"
                  icon="check"
                  variant="success"
                  glow
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};