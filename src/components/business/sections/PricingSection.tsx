/**
 * ARCO Pricing Section - S-tier UI/UX
 * Professional pricing plans with feature comparison
 */

'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/design-system/primitives/card';
import { Badge } from '@/components/design-system/primitives/badge';
import { Button } from '@/components/design-system/primitives/button';
import { Switch } from '@/components/design-system/primitives/switch';
import { CheckCircle, X, Star, Zap, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Section } from './Section';

interface PricingFeature {
  name: string;
  included: boolean;
  description?: string;
}

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    annual: number;
  };
  features: PricingFeature[];
  highlighted?: boolean;
  popular?: boolean;
  icon: React.ReactNode;
  badge?: string;
  cta: string;
  subtitle?: string;
}

interface PricingSectionProps {
  variant?: 'default' | 'dark' | 'light';
  title?: string;
  subtitle?: string;
  description?: string;
  plans?: PricingPlan[];
  showAnnualToggle?: boolean;
  className?: string;
}

const defaultPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Diagnostic Sprint',
    description: 'Perfect for businesses starting their optimization journey',
    subtitle: 'Quick wins in 3 days',
    price: {
      monthly: 2997,
      annual: 2997
    },
    features: [
      { name: 'Complete marketing audit', included: true },
      { name: 'Lead quality analysis', included: true },
      { name: 'Conversion funnel review', included: true },
      { name: 'Performance baseline report', included: true },
      { name: 'Quick wins identification', included: true },
      { name: 'Implementation roadmap', included: true },
      { name: 'Email support', included: true },
      { name: 'Implementation support', included: false },
      { name: 'Ongoing optimization', included: false },
      { name: 'Performance monitoring', included: false }
    ],
    icon: <Zap className="h-6 w-6" />,
    cta: 'Start Diagnostic'
  },
  {
    id: 'professional',
    name: 'Revenue Rescue',
    description: 'Complete transformation with guaranteed results',
    subtitle: 'Our most popular package',
    price: {
      monthly: 7997,
      annual: 7997
    },
    features: [
      { name: 'Everything in Diagnostic Sprint', included: true },
      { name: 'Full implementation support', included: true },
      { name: 'Custom strategy development', included: true },
      { name: 'Team training & onboarding', included: true },
      { name: '30-day optimization period', included: true },
      { name: 'Performance monitoring', included: true },
      { name: 'Priority phone support', included: true },
      { name: 'Results guarantee', included: true },
      { name: 'Monthly strategy calls', included: false },
      { name: 'White-label reporting', included: false }
    ],
    highlighted: true,
    popular: true,
    badge: 'Most Popular',
    icon: <Star className="h-6 w-6" />,
    cta: 'Get Started Now'
  },
  {
    id: 'enterprise',
    name: 'Growth Partnership',
    description: 'Ongoing optimization partnership for sustained growth',
    subtitle: 'For serious scale-ups',
    price: {
      monthly: 12997,
      annual: 129970
    },
    features: [
      { name: 'Everything in Revenue Rescue', included: true },
      { name: 'Monthly strategy sessions', included: true },
      { name: 'Quarterly optimization sprints', included: true },
      { name: 'Advanced analytics dashboard', included: true },
      { name: 'White-label client reporting', included: true },
      { name: 'API access & integrations', included: true },
      { name: 'Dedicated success manager', included: true },
      { name: 'Custom automation setup', included: true },
      { name: '24/7 priority support', included: true },
      { name: 'Revenue guarantee', included: true }
    ],
    icon: <Crown className="h-6 w-6" />,
    cta: 'Contact Sales'
  }
];

export const PricingSection: React.FC<PricingSectionProps> = ({
  variant = 'default',
  title = 'Simple, Transparent Pricing',
  subtitle = 'Pricing',
  description = 'Choose the perfect plan for your business growth. All plans include our satisfaction guarantee.',
  plans = defaultPlans,
  showAnnualToggle = true,
  className,
}) => {
  const [isAnnual, setIsAnnual] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getDisplayPrice = (plan: PricingPlan) => {
    const price = isAnnual ? plan.price.annual : plan.price.monthly;
    return formatPrice(price);
  };

  const getSavings = (plan: PricingPlan) => {
    if (!isAnnual) return null;
    const monthlyTotal = plan.price.monthly * 12;
    const savings = monthlyTotal - plan.price.annual;
    if (savings > 0) {
      return formatPrice(savings);
    }
    return null;
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

          {/* Annual Toggle */}
          {showAnnualToggle && (
            <div className="flex items-center justify-center space-x-3">
              <span className={cn(
                'text-sm font-medium',
                !isAnnual ? 'text-foreground' : 'text-muted-foreground'
              )}>
                Monthly
              </span>
              <Switch
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
                className="data-[state=checked]:bg-primary"
              />
              <span className={cn(
                'text-sm font-medium',
                isAnnual ? 'text-foreground' : 'text-muted-foreground'
              )}>
                Annual
              </span>
              <Badge variant="secondary" className="ml-2">
                Save 17%
              </Badge>
            </div>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => {
            const savings = getSavings(plan);

            return (
              <Card
                key={plan.id}
                className={cn(
                  'relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl',
                  plan.highlighted && 'border-primary shadow-lg lg:scale-105',
                  variant === 'dark' ? 'bg-white/5 border-white/10' : ''
                )}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -right-3 top-6 rotate-12">
                    <Badge className="bg-primary text-primary-foreground shadow-lg">
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                <CardHeader className="space-y-4 pb-8">
                  {/* Icon */}
                  <div
                    className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-xl',
                      plan.highlighted
                        ? 'bg-primary text-primary-foreground'
                        : variant === 'dark'
                        ? 'bg-white/10 text-white'
                        : 'bg-primary/10 text-primary'
                    )}
                  >
                    {plan.icon}
                  </div>

                  {/* Plan Info */}
                  <div className="space-y-2">
                    <CardTitle className="text-xl font-bold">
                      {plan.name}
                    </CardTitle>

                    {plan.subtitle && (
                      <p className="text-sm font-medium text-primary">
                        {plan.subtitle}
                      </p>
                    )}

                    <CardDescription className="text-base">
                      {plan.description}
                    </CardDescription>
                  </div>

                  {/* Pricing */}
                  <div className="space-y-2">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-bold">
                        {getDisplayPrice(plan)}
                      </span>
                      {plan.id !== 'starter' && (
                        <span className="text-muted-foreground">
                          /{isAnnual ? 'year' : 'month'}
                        </span>
                      )}
                    </div>

                    {savings && (
                      <p className="text-sm font-medium text-green-600">
                        Save {savings} annually
                      </p>
                    )}
                  </div>

                  {/* CTA Button */}
                  <Button
                    className={cn(
                      'w-full',
                      plan.highlighted ? 'bg-primary hover:bg-primary/90' : ''
                    )}
                    variant={plan.highlighted ? 'default' : 'outline'}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </CardHeader>

                <CardContent className="space-y-4 pt-0">
                  {/* Features List */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">What's included:</h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-3">
                          {feature.included ? (
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          ) : (
                            <X className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          )}
                          <span
                            className={cn(
                              'text-sm',
                              feature.included
                                ? 'text-foreground'
                                : 'text-muted-foreground line-through'
                            )}
                          >
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center space-y-4">
          <p className="text-lg font-medium">
            Not sure which plan is right for you?
          </p>
          <Button variant="outline" size="lg">
            Schedule a Free Consultation
          </Button>
          <p className="text-sm text-muted-foreground">
            30-day money-back guarantee • No setup fees • Cancel anytime
          </p>
        </div>
      </div>
    </Section>
  );
};

export default PricingSection;