/**
 * ARCO Stats Section - S-tier UI/UX
 * Animated statistics dashboard with real-time counters
 */

'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/design-system/primitives/card';
import { Badge } from '@/components/design-system/primitives/badge';
import { Progress } from '@/components/design-system/primitives/progress';
import { TrendingUp, Users, Target, DollarSign, Clock, Award, Globe, Zap } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { cn } from '@/lib/utils';
import { Section } from './Section';

interface Stat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  icon: React.ReactNode;
  color: 'primary' | 'green' | 'blue' | 'purple' | 'orange';
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
    period: string;
  };
}

interface StatsSectionProps {
  variant?: 'default' | 'dark' | 'light' | 'gradient';
  title?: string;
  subtitle?: string;
  description?: string;
  stats?: Stat[];
  animated?: boolean;
  showTrends?: boolean;
  layout?: 'grid' | 'carousel' | 'minimal';
  className?: string;
}

const defaultStats: Stat[] = [
  {
    id: 'clients',
    label: 'Successful Projects',
    value: 500,
    suffix: '+',
    icon: <Users className="h-6 w-6" />,
    color: 'primary',
    description: 'Businesses transformed',
    trend: {
      value: 12,
      isPositive: true,
      period: 'this quarter'
    }
  },
  {
    id: 'roi',
    label: 'Average ROI Increase',
    value: 312,
    suffix: '%',
    icon: <TrendingUp className="h-6 w-6" />,
    color: 'green',
    description: 'Return on investment',
    trend: {
      value: 8,
      isPositive: true,
      period: 'vs last year'
    }
  },
  {
    id: 'conversion',
    label: 'Conversion Rate Boost',
    value: 89,
    suffix: '%',
    icon: <Target className="h-6 w-6" />,
    color: 'blue',
    description: 'Average improvement',
    trend: {
      value: 5,
      isPositive: true,
      period: 'month over month'
    }
  },
  {
    id: 'revenue',
    label: 'Revenue Generated',
    value: 2.4,
    suffix: 'M',
    prefix: '$',
    icon: <DollarSign className="h-6 w-6" />,
    color: 'purple',
    description: 'For our clients',
    trend: {
      value: 23,
      isPositive: true,
      period: 'this year'
    }
  },
  {
    id: 'speed',
    label: 'Implementation Time',
    value: 10,
    suffix: ' days',
    icon: <Clock className="h-6 w-6" />,
    color: 'orange',
    description: 'Average project delivery'
  },
  {
    id: 'satisfaction',
    label: 'Client Satisfaction',
    value: 98,
    suffix: '%',
    icon: <Award className="h-6 w-6" />,
    color: 'green',
    description: '4.9/5 average rating'
  },
  {
    id: 'countries',
    label: 'Countries Served',
    value: 15,
    suffix: '+',
    icon: <Globe className="h-6 w-6" />,
    color: 'blue',
    description: 'Global reach'
  },
  {
    id: 'response',
    label: 'Support Response',
    value: 2,
    suffix: ' hours',
    icon: <Zap className="h-6 w-6" />,
    color: 'primary',
    description: 'Average response time'
  }
];

const AnimatedCounter: React.FC<{
  value: number;
  suffix?: string;
  prefix?: string;
  inView: boolean;
  duration?: number;
}> = ({ value, suffix = '', prefix = '', inView, duration = 2.5 }) => {
  return (
    <CountUp
      start={0}
      end={inView ? value : 0}
      duration={duration}
      decimals={value < 10 && value % 1 !== 0 ? 1 : 0}
      prefix={prefix}
      suffix={suffix}
      preserveValue
    />
  );
};

export const StatsSection: React.FC<StatsSectionProps> = ({
  variant = 'default',
  title = 'Proven Track Record',
  subtitle = 'By the Numbers',
  description = 'Our results speak for themselves. Here\'s what we\'ve achieved for our clients.',
  stats = defaultStats,
  animated = true,
  showTrends = true,
  layout = 'grid',
  className,
}) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const getColorClasses = (color: string) => {
    const colors = {
      primary: 'text-primary bg-primary/10',
      green: 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400',
      blue: 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400',
      purple: 'text-purple-600 bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400',
      orange: 'text-orange-600 bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400'
    };
    return colors[color as keyof typeof colors] || colors.primary;
  };

  const getTrendColor = (isPositive: boolean) => {
    return isPositive ? 'text-green-600' : 'text-red-600';
  };

  return (
    <Section variant={variant} size="lg" className={className}>
      <div className="space-y-16">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center space-y-4">
          {subtitle && (
            <Badge
              variant="secondary"
              className={cn(
                'text-sm font-semibold px-4 py-2',
                variant === 'dark' ? 'bg-white/10 text-white hover:bg-white/20' : ''
              )}
            >
              {subtitle}
            </Badge>
          )}

          <h2 className="arco-heading-lg">
            {title}
          </h2>

          <p className="arco-text-lg text-muted-foreground">
            {description}
          </p>
        </div>

        {/* Stats Grid */}
        <div ref={ref} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card
              key={stat.id}
              className={cn(
                'group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl',
                variant === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white',
                animated && 'animate-fade-in-up'
              )}
              style={{
                animationDelay: animated ? `${index * 0.1}s` : '0s'
              }}
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Icon and Trend */}
                  <div className="flex items-start justify-between">
                    <div
                      className={cn(
                        'flex h-12 w-12 items-center justify-center rounded-xl transition-colors',
                        getColorClasses(stat.color)
                      )}
                    >
                      {stat.icon}
                    </div>

                    {showTrends && stat.trend && (
                      <div className="text-right">
                        <div className={cn(
                          'flex items-center space-x-1 text-xs font-medium',
                          getTrendColor(stat.trend.isPositive)
                        )}>
                          <TrendingUp className="h-3 w-3" />
                          <span>{stat.trend.isPositive ? '+' : ''}{stat.trend.value}%</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {stat.trend.period}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Main Stat */}
                  <div className="space-y-2">
                    <div className="text-3xl font-bold">
                      {animated ? (
                        <AnimatedCounter
                          value={stat.value}
                          prefix={stat.prefix}
                          suffix={stat.suffix}
                          inView={inView}
                        />
                      ) : (
                        `${stat.prefix || ''}${stat.value}${stat.suffix || ''}`
                      )}
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-semibold text-sm leading-tight">
                        {stat.label}
                      </h3>
                      {stat.description && (
                        <p className="text-xs text-muted-foreground">
                          {stat.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar (for percentage stats) */}
                  {stat.suffix === '%' && (
                    <div className="space-y-2">
                      <Progress
                        value={animated && inView ? stat.value : 0}
                        className="h-2"
                      />
                    </div>
                  )}
                </div>

                {/* Hover Effect */}
                <div
                  className={cn(
                    'absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-10',
                    stat.color === 'primary' && 'from-primary to-primary-600',
                    stat.color === 'green' && 'from-green-500 to-green-600',
                    stat.color === 'blue' && 'from-blue-500 to-blue-600',
                    stat.color === 'purple' && 'from-purple-500 to-purple-600',
                    stat.color === 'orange' && 'from-orange-500 to-orange-600'
                  )}
                />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            * Data updated monthly from verified client results
          </p>
        </div>
      </div>
    </Section>
  );
};

export default StatsSection;