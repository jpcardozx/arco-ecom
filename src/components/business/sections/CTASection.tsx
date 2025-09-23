/**
 * ARCO CTA Section - S-tier UI/UX
 * High-conversion call-to-action with urgency and social proof
 */

'use client';

import React from 'react';
import { Card, CardContent } from '@/components/design-system/primitives/card';
import { Badge } from '@/components/design-system/primitives/badge';
import { Button } from '@/components/design-system/primitives/button';
import { Input } from '@/components/design-system/primitives/input';
import { ArrowRight, CheckCircle, Clock, Users, Star, Zap, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Section } from './Section';

interface CTAVariant {
  type: 'primary' | 'urgency' | 'social-proof' | 'value-proposition';
  title: string;
  subtitle?: string;
  description: string;
  primaryAction: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  features?: string[];
  urgencyText?: string;
  socialProof?: {
    metric: string;
    label: string;
  }[];
  guarantee?: string;
}

interface CTASectionProps {
  variant?: 'default' | 'dark' | 'light' | 'gradient';
  layout?: 'centered' | 'split' | 'card';
  ctaVariant?: CTAVariant;
  includeEmailCapture?: boolean;
  className?: string;
}

const defaultCTAVariants: Record<string, CTAVariant> = {
  primary: {
    type: 'primary',
    title: 'Ready to Transform Your Marketing?',
    subtitle: 'Limited Time Offer',
    description: 'Join 500+ businesses that have revolutionized their appointment booking process with our proven system.',
    primaryAction: {
      label: 'Get Started Today',
      href: '#get-started'
    },
    secondaryAction: {
      label: 'Schedule Free Consultation',
      href: '#consultation'
    },
    features: [
      '10-day implementation guarantee',
      'Dedicated success manager',
      '30-day money-back guarantee',
      'Ongoing optimization support'
    ]
  },
  urgency: {
    type: 'urgency',
    title: 'Don\'t Let Another Lead Slip Away',
    description: 'Every day you wait is revenue lost. Our next cohort starts Monday - secure your spot before it\'s too late.',
    urgencyText: 'Only 3 spots remaining this month',
    primaryAction: {
      label: 'Claim Your Spot Now',
      href: '#claim-spot'
    },
    features: [
      'Immediate access to diagnostic tools',
      'Priority implementation queue',
      'Bonus: Advanced analytics dashboard'
    ]
  },
  'social-proof': {
    type: 'social-proof',
    title: 'Join Industry Leaders Who Trust ARCO',
    description: 'See why top-performing businesses choose us to optimize their marketing funnels.',
    primaryAction: {
      label: 'See How We Can Help You',
      href: '#help'
    },
    socialProof: [
      { metric: '500+', label: 'Successful Projects' },
      { metric: '98%', label: 'Client Satisfaction' },
      { metric: '$2.4M+', label: 'Revenue Generated' },
      { metric: '312%', label: 'Average ROI Increase' }
    ]
  },
  'value-proposition': {
    type: 'value-proposition',
    title: 'Everything You Need to Succeed',
    description: 'Complete marketing transformation package designed for maximum ROI and sustainable growth.',
    primaryAction: {
      label: 'Start Your Transformation',
      href: '#transform'
    },
    features: [
      'Comprehensive marketing audit',
      'Custom strategy development',
      'Implementation & optimization',
      'Performance monitoring',
      'Ongoing support & training'
    ],
    guarantee: '100% satisfaction guaranteed or your money back'
  }
};

export const CTASection: React.FC<CTASectionProps> = ({
  variant = 'primary',
  layout = 'centered',
  ctaVariant = defaultCTAVariants.primary,
  includeEmailCapture = false,
  className,
}) => {
  const isCardLayout = layout === 'card';
  const isSplitLayout = layout === 'split';

  const CTAContent = () => (
    <div className={cn(
      'space-y-8',
      layout === 'centered' && 'mx-auto max-w-4xl text-center',
      isSplitLayout && 'flex flex-col lg:flex-row lg:items-center lg:gap-16'
    )}>
      {/* Main Content */}
      <div className={cn(
        'space-y-6',
        isSplitLayout && 'flex-1'
      )}>
        {/* Subtitle/Badge */}
        {ctaVariant.subtitle && (
          <div className={cn(layout === 'centered' && 'flex justify-center')}>
            <Badge
              variant="secondary"
              className={cn(
                'text-sm font-semibold px-4 py-2',
                variant === 'dark' ? 'bg-white/10 text-white hover:bg-white/20' : '',
                variant === 'primary' ? 'bg-white/20 text-white hover:bg-white/30' : ''
              )}
            >
              {ctaVariant.subtitle}
            </Badge>
          </div>
        )}

        {/* Urgency Indicator */}
        {ctaVariant.urgencyText && (
          <div className={cn(
            'flex items-center gap-2',
            layout === 'centered' && 'justify-center'
          )}>
            <Clock className="h-4 w-4 text-orange-500 animate-pulse" />
            <span className="text-sm font-medium text-orange-500">
              {ctaVariant.urgencyText}
            </span>
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
          {ctaVariant.title}
        </h2>

        {/* Description */}
        <p
          className={cn(
            'text-lg leading-relaxed md:text-xl',
            variant === 'dark' || variant === 'primary' ? 'text-white/90' : 'text-muted-foreground',
            'font-[family-name:var(--font-lora)]'
          )}
          style={{ textWrap: 'pretty' } as React.CSSProperties}
        >
          {ctaVariant.description}
        </p>

        {/* Features List */}
        {ctaVariant.features && (
          <div className={cn(
            'space-y-3',
            layout === 'centered' ? 'max-w-md mx-auto' : ''
          )}>
            {ctaVariant.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className={cn(
                  'h-5 w-5 flex-shrink-0',
                  variant === 'dark' || variant === 'primary' ? 'text-green-400' : 'text-green-600'
                )} />
                <span
                  className={cn(
                    'text-sm font-medium',
                    variant === 'dark' || variant === 'primary' ? 'text-white/90' : 'text-foreground',
                    'font-[family-name:var(--font-lora)]'
                  )}
                >
                  {feature}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Social Proof Metrics */}
        {ctaVariant.socialProof && (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {ctaVariant.socialProof.map((proof, index) => (
              <div key={index} className="text-center space-y-1">
                <div className={cn(
                  'text-2xl font-bold',
                  variant === 'dark' || variant === 'primary' ? 'text-white' : 'text-foreground'
                )}>
                  {proof.metric}
                </div>
                <div className={cn(
                  'text-sm font-medium',
                  variant === 'dark' || variant === 'primary' ? 'text-white/70' : 'text-muted-foreground'
                )}>
                  {proof.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Area */}
      <div className={cn(
        'space-y-6',
        isSplitLayout && 'flex-1 max-w-md',
        layout === 'centered' && 'max-w-md mx-auto'
      )}>
        {/* Email Capture Form */}
        {includeEmailCapture && (
          <div className="space-y-4">
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className={cn(
                  'flex-1',
                  variant === 'dark' || variant === 'primary'
                    ? 'bg-white/10 border-white/20 text-white placeholder:text-white/60'
                    : ''
                )}
              />
              <Button
                size="lg"
                className={cn(
                  'px-6',
                  variant === 'primary' && 'bg-white text-primary hover:bg-white/90'
                )}
              >
                Get Started
              </Button>
            </div>
            <p className={cn(
              'text-xs',
              variant === 'dark' || variant === 'primary' ? 'text-white/60' : 'text-muted-foreground'
            )}>
              No spam. Unsubscribe anytime.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className={cn(
          'flex flex-col space-y-4',
          !includeEmailCapture && 'sm:flex-row sm:space-y-0 sm:space-x-4',
          layout === 'centered' && 'justify-center'
        )}>
          <Button
            size="lg"
            className={cn(
              'group px-8',
              variant === 'primary' && 'bg-white text-primary hover:bg-white/90'
            )}
            asChild={!!ctaVariant.primaryAction.href}
          >
            {ctaVariant.primaryAction.href ? (
              <a href={ctaVariant.primaryAction.href}>
                {ctaVariant.primaryAction.label}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            ) : (
              <span onClick={ctaVariant.primaryAction.onClick}>
                {ctaVariant.primaryAction.label}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            )}
          </Button>

          {ctaVariant.secondaryAction && (
            <Button
              variant="outline"
              size="lg"
              className={cn(
                'px-8',
                variant === 'dark' || variant === 'primary'
                  ? 'border-white/20 bg-white/10 text-white hover:bg-white/20'
                  : ''
              )}
              asChild={!!ctaVariant.secondaryAction.href}
            >
              {ctaVariant.secondaryAction.href ? (
                <a href={ctaVariant.secondaryAction.href}>
                  {ctaVariant.secondaryAction.label}
                </a>
              ) : (
                <span onClick={ctaVariant.secondaryAction.onClick}>
                  {ctaVariant.secondaryAction.label}
                </span>
              )}
            </Button>
          )}
        </div>

        {/* Guarantee */}
        {ctaVariant.guarantee && (
          <div className={cn(
            'flex items-center gap-2',
            layout === 'centered' && 'justify-center'
          )}>
            <Shield className={cn(
              'h-4 w-4',
              variant === 'dark' || variant === 'primary' ? 'text-green-400' : 'text-green-600'
            )} />
            <span className={cn(
              'text-sm font-medium',
              variant === 'dark' || variant === 'primary' ? 'text-white/90' : 'text-foreground'
            )}>
              {ctaVariant.guarantee}
            </span>
          </div>
        )}

        {/* Trust Indicators */}
        <div className={cn(
          'flex items-center gap-4 text-sm',
          layout === 'centered' && 'justify-center',
          variant === 'dark' || variant === 'primary' ? 'text-white/70' : 'text-muted-foreground'
        )}>
          <div className="flex items-center gap-1">
            <Zap className="h-4 w-4" />
            <span>Instant Setup</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>500+ Clients</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            <span>4.9/5 Rating</span>
          </div>
        </div>
      </div>
    </div>
  );

  if (isCardLayout) {
    return (
      <Section variant="default" size="lg" className={className}>
        <Card className={cn(
          'overflow-hidden',
          variant === 'primary' && 'bg-gradient-to-br from-primary to-primary-600 text-white border-primary'
        )}>
          <CardContent className="p-8 lg:p-12">
            <CTAContent />
          </CardContent>
        </Card>
      </Section>
    );
  }

  const sectionVariant = variant === 'gradient' ? 'gradient' : variant === 'dark' ? 'arco-dark' : 'default';

  return (
    <Section variant={sectionVariant} size="lg" className={className}>
      <CTAContent />
    </Section>
  );
};

export default CTASection;