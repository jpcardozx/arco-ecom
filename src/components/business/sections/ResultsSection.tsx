/**
 * ARCO Results Section - S-tier UI/UX
 * Animated metrics showcase with client success stories
 */

'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/design-system/primitives/card';
import { Badge } from '@/components/design-system/primitives/badge';
import { Button } from '@/components/design-system/primitives/button';
import { Progress } from '@/components/design-system/primitives/progress';
import { TrendingUp, Users, Target, DollarSign, Clock, ArrowRight, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Section } from './Section';

interface Metric {
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: 'primary' | 'green' | 'blue' | 'purple';
}

interface CaseStudy {
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: Metric[];
  testimonial?: string;
  image?: string;
}

interface ResultsSectionProps {
  variant?: 'default' | 'dark' | 'light' | 'gradient';
  title?: string;
  subtitle?: string;
  description?: string;
  overallMetrics?: Metric[];
  caseStudies?: CaseStudy[];
  animated?: boolean;
  className?: string;
}

const defaultOverallMetrics: Metric[] = [
  {
    label: 'Average ROI Increase',
    value: '312%',
    change: '+127% vs baseline',
    icon: <TrendingUp className="h-6 w-6" />,
    color: 'green'
  },
  {
    label: 'Appointment Conversion',
    value: '89%',
    change: '+45% improvement',
    icon: <Target className="h-6 w-6" />,
    color: 'primary'
  },
  {
    label: 'Client Satisfaction',
    value: '98%',
    change: '4.9/5 rating',
    icon: <Star className="h-6 w-6" />,
    color: 'purple'
  },
  {
    label: 'Revenue Generated',
    value: '$2.4M+',
    change: 'For our clients',
    icon: <DollarSign className="h-6 w-6" />,
    color: 'blue'
  }
];

const defaultCaseStudies: CaseStudy[] = [
  {
    client: 'Johnson Realty',
    industry: 'Real Estate',
    challenge: 'Low appointment booking rates from online leads',
    solution: 'Implemented lead scoring and automated follow-up system',
    results: [
      {
        label: 'Appointment Rate',
        value: '76%',
        change: '+43%',
        icon: <Target className="h-5 w-5" />,
        color: 'primary'
      },
      {
        label: 'Revenue Growth',
        value: '340%',
        change: '+240%',
        icon: <TrendingUp className="h-5 w-5" />,
        color: 'green'
      },
      {
        label: 'Lead Quality',
        value: '92%',
        change: '+38%',
        icon: <Users className="h-5 w-5" />,
        color: 'blue'
      }
    ],
    testimonial: 'ARCO transformed our approach to marketing. We finally see qualified leads turning into real appointments!'
  },
  {
    client: 'MedCare Clinic',
    industry: 'Healthcare',
    challenge: 'High no-show rates and poor lead qualification',
    solution: 'Developed comprehensive patient journey optimization',
    results: [
      {
        label: 'No-show Reduction',
        value: '67%',
        change: '-33%',
        icon: <Clock className="h-5 w-5" />,
        color: 'purple'
      },
      {
        label: 'Patient Satisfaction',
        value: '96%',
        change: '+24%',
        icon: <Star className="h-5 w-5" />,
        color: 'primary'
      },
      {
        label: 'Revenue Per Patient',
        value: '185%',
        change: '+85%',
        icon: <DollarSign className="h-5 w-5" />,
        color: 'green'
      }
    ],
    testimonial: 'The systematic approach to patient acquisition has revolutionized our practice growth.'
  }
];

const AnimatedCounter: React.FC<{ value: string; duration?: number }> = ({
  value,
  duration = 2000
}) => {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/[^\d]/g, '')) || 0;

  useEffect(() => {
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      setCount(Math.floor(progress * numericValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [numericValue, duration]);

  return <span>{value.replace(/\d+/, count.toString())}</span>;
};

export const ResultsSection: React.FC<ResultsSectionProps> = ({
  variant = 'default',
  title = 'Proven Results',
  subtitle = 'Success Stories',
  description = 'Our data-driven approach consistently delivers exceptional results for clients across industries.',
  overallMetrics = defaultOverallMetrics,
  caseStudies = defaultCaseStudies,
  animated = true,
  className,
}) => {
  const getColorClasses = (color: string) => {
    const colors = {
      primary: 'text-primary bg-primary/10',
      green: 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400',
      blue: 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400',
      purple: 'text-purple-600 bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400'
    };
    return colors[color as keyof typeof colors] || colors.primary;
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

          <h2
            className={cn(
              'text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl',
              'font-[family-name:var(--font-ruwudu)]'
            )}
            style={{ textWrap: 'balance' } as React.CSSProperties}
          >
            {title}
          </h2>

          <p
            className={cn(
              'text-lg leading-relaxed md:text-xl',
              variant === 'dark' ? 'text-white/90' : 'text-muted-foreground',
              'font-[family-name:var(--font-lora)]'
            )}
            style={{ textWrap: 'pretty' } as React.CSSProperties}
          >
            {description}
          </p>
        </div>

        {/* Overall Metrics Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {overallMetrics.map((metric, index) => (
            <Card
              key={index}
              className={cn(
                'group transition-all duration-300 hover:scale-105 hover:shadow-lg',
                variant === 'dark' ? 'bg-white/5 border-white/10' : ''
              )}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div
                    className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-xl',
                      getColorClasses(metric.color)
                    )}
                  >
                    {metric.icon}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      {metric.label}
                    </p>
                    <p className="text-2xl font-bold">
                      {animated ? (
                        <AnimatedCounter value={metric.value} />
                      ) : (
                        metric.value
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {metric.change}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Case Studies */}
        <div className="space-y-12">
          <h3
            className={cn(
              'text-2xl font-bold text-center',
              'font-[family-name:var(--font-ruwudu)]'
            )}
          >
            Client Success Stories
          </h3>

          <div className="grid gap-8 lg:grid-cols-2">
            {caseStudies.map((study, index) => (
              <Card
                key={index}
                className={cn(
                  'group overflow-hidden transition-all duration-300 hover:shadow-xl',
                  variant === 'dark' ? 'bg-white/5 border-white/10' : ''
                )}
              >
                <CardHeader className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle
                        className={cn(
                          'text-xl font-bold',
                          'font-[family-name:var(--font-ruwudu)]'
                        )}
                      >
                        {study.client}
                      </CardTitle>
                      <Badge variant="outline" className="mt-2">
                        {study.industry}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Challenge:</h4>
                      <p className="text-sm text-muted-foreground">
                        {study.challenge}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Solution:</h4>
                      <p className="text-sm text-muted-foreground">
                        {study.solution}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Results Metrics */}
                  <div className="grid gap-4 sm:grid-cols-3">
                    {study.results.map((result, resultIndex) => (
                      <div
                        key={resultIndex}
                        className="text-center space-y-2"
                      >
                        <div
                          className={cn(
                            'mx-auto flex h-10 w-10 items-center justify-center rounded-lg',
                            getColorClasses(result.color)
                          )}
                        >
                          {result.icon}
                        </div>
                        <div>
                          <p className="text-2xl font-bold">
                            {animated ? (
                              <AnimatedCounter value={result.value} />
                            ) : (
                              result.value
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {result.label}
                          </p>
                          <p className="text-xs font-medium text-green-600">
                            {result.change}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Testimonial */}
                  {study.testimonial && (
                    <blockquote
                      className={cn(
                        'border-l-4 border-primary pl-4 italic',
                        variant === 'dark' ? 'text-white/90' : 'text-muted-foreground'
                      )}
                    >
                      "{study.testimonial}"
                    </blockquote>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center space-y-4">
          <p
            className={cn(
              'text-lg font-medium',
              variant === 'dark' ? 'text-white/90' : 'text-foreground',
              'font-[family-name:var(--font-lora)]'
            )}
          >
            Ready to see similar results for your business?
          </p>
          <Button size="lg" className="px-8">
            Get Your Free Audit
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default ResultsSection;