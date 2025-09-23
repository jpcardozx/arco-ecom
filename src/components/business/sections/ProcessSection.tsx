/**
 * ARCO Process Section - S-tier UI/UX
 * Interactive timeline with step-by-step process visualization
 */

'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/design-system/primitives/card';
import { Badge } from '@/components/design-system/primitives/badge';
import { Button } from '@/components/design-system/primitives/button';
import { Progress } from '@/components/design-system/primitives/progress';
import { CheckCircle, Circle, ArrowRight, Clock, Users, Target, TrendingUp, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Section } from './Section';

interface ProcessStep {
  id: string;
  title: string;
  description: string;
  duration: string;
  icon: React.ReactNode;
  details: string[];
  deliverables: string[];
}

interface ProcessSectionProps {
  variant?: 'default' | 'dark' | 'light' | 'gradient';
  title?: string;
  subtitle?: string;
  description?: string;
  steps?: ProcessStep[];
  interactive?: boolean;
  className?: string;
}

const defaultSteps: ProcessStep[] = [
  {
    id: 'audit',
    title: 'Comprehensive Audit',
    description: 'Deep-dive analysis of your current marketing funnel and lead generation processes.',
    duration: 'Days 1-2',
    icon: <Target className="h-6 w-6" />,
    details: [
      'Marketing funnel analysis',
      'Lead quality assessment',
      'Conversion rate evaluation',
      'Technology stack review'
    ],
    deliverables: [
      'Detailed audit report',
      'Performance baseline',
      'Opportunity identification'
    ]
  },
  {
    id: 'strategy',
    title: 'Strategy Development',
    description: 'Custom strategy creation based on audit findings and your business objectives.',
    duration: 'Days 3-4',
    icon: <Users className="h-6 w-6" />,
    details: [
      'Custom strategy design',
      'Goal setting and KPIs',
      'Resource allocation',
      'Timeline planning'
    ],
    deliverables: [
      'Strategic roadmap',
      'Implementation plan',
      'Success metrics'
    ]
  },
  {
    id: 'implementation',
    title: 'Implementation',
    description: 'Systematic execution of optimization strategies with continuous monitoring.',
    duration: 'Days 5-8',
    icon: <Zap className="h-6 w-6" />,
    details: [
      'Process optimization',
      'Technology integration',
      'Team training',
      'System testing'
    ],
    deliverables: [
      'Optimized processes',
      'Trained team',
      'Working systems'
    ]
  },
  {
    id: 'optimization',
    title: 'Results & Optimization',
    description: 'Monitor performance, gather insights, and continuously optimize for better results.',
    duration: 'Days 9-10',
    icon: <TrendingUp className="h-6 w-6" />,
    details: [
      'Performance monitoring',
      'Data analysis',
      'Continuous optimization',
      'Result reporting'
    ],
    deliverables: [
      'Performance report',
      'Optimization recommendations',
      'Ongoing support plan'
    ]
  }
];

export const ProcessSection: React.FC<ProcessSectionProps> = ({
  variant = 'light',
  title = 'Our Proven Process',
  subtitle = 'How We Work',
  description = 'Our systematic 10-day approach transforms your marketing funnel from analysis to optimization, ensuring maximum ROI and sustainable growth.',
  steps = defaultSteps,
  interactive = true,
  className,
}) => {
  const [activeStep, setActiveStep] = useState<string>(steps[0]?.id || '');
  const activeStepIndex = steps.findIndex(step => step.id === activeStep);
  const progressValue = ((activeStepIndex + 1) / steps.length) * 100;

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

          {interactive && (
            <div className="mt-8 space-y-2">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Progress</span>
                <span>{Math.round(progressValue)}% Complete</span>
              </div>
              <Progress value={progressValue} className="h-2" />
            </div>
          )}
        </div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px" />

          {/* Steps */}
          <div className="space-y-12">
            {steps.map((step, index) => {
              const isActive = interactive && step.id === activeStep;
              const isCompleted = interactive && index < activeStepIndex;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={step.id}
                  className={cn(
                    'relative flex items-center gap-8',
                    'md:gap-16',
                    !isEven && 'md:flex-row-reverse'
                  )}
                >
                  {/* Timeline Node */}
                  <div
                    className={cn(
                      'absolute left-8 flex h-16 w-16 items-center justify-center rounded-full border-4 transition-all duration-300',
                      'md:left-1/2 md:-translate-x-1/2',
                      isActive
                        ? 'border-primary bg-primary text-primary-foreground shadow-lg'
                        : isCompleted
                        ? 'border-primary bg-primary text-primary-foreground'
                        : variant === 'dark'
                        ? 'border-white/20 bg-white/5 text-white'
                        : 'border-border bg-background text-muted-foreground'
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-8 w-8" />
                    ) : (
                      step.icon
                    )}
                  </div>

                  {/* Content Card */}
                  <div className="ml-24 flex-1 md:ml-0 md:w-1/2">
                    <Card
                      className={cn(
                        'group cursor-pointer transition-all duration-300 hover:shadow-lg',
                        isActive && 'ring-2 ring-primary shadow-xl',
                        variant === 'dark' ? 'bg-white/5 border-white/10' : ''
                      )}
                      onClick={() => interactive && setActiveStep(step.id)}
                    >
                      <CardHeader className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge
                            variant="outline"
                            className={cn(
                              'text-xs',
                              isActive && 'border-primary text-primary',
                              variant === 'dark' ? 'border-white/20 text-white' : ''
                            )}
                          >
                            {step.duration}
                          </Badge>
                          {(isActive || isCompleted) && (
                            <div className="flex items-center space-x-1 text-primary">
                              <Clock className="h-4 w-4" />
                              <span className="text-xs font-medium">
                                {isCompleted ? 'Completed' : 'In Progress'}
                              </span>
                            </div>
                          )}
                        </div>

                        <CardTitle
                          className={cn(
                            'text-xl font-bold',
                            'font-[family-name:var(--font-ruwudu)]'
                          )}
                        >
                          {step.title}
                        </CardTitle>

                        <CardDescription
                          className={cn(
                            'text-base leading-relaxed',
                            variant === 'dark' ? 'text-white/70' : '',
                            'font-[family-name:var(--font-lora)]'
                          )}
                        >
                          {step.description}
                        </CardDescription>
                      </CardHeader>

                      {/* Expandable Content */}
                      {isActive && (
                        <CardContent className="space-y-6">
                          {/* Details */}
                          <div>
                            <h4 className="font-semibold text-sm mb-3">What We Do:</h4>
                            <ul className="space-y-2">
                              {step.details.map((detail, detailIndex) => (
                                <li key={detailIndex} className="flex items-center space-x-2">
                                  <Circle className="h-1.5 w-1.5 fill-primary text-primary" />
                                  <span className="text-sm">{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Deliverables */}
                          <div>
                            <h4 className="font-semibold text-sm mb-3">Deliverables:</h4>
                            <ul className="space-y-2">
                              {step.deliverables.map((deliverable, deliverableIndex) => (
                                <li key={deliverableIndex} className="flex items-center space-x-2">
                                  <CheckCircle className="h-4 w-4 text-primary" />
                                  <span className="text-sm font-medium">{deliverable}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  </div>
                </div>
              );
            })}
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
            Ready to start your transformation?
          </p>
          <Button size="lg" className="px-8">
            Start Your 10-Day Sprint
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default ProcessSection;