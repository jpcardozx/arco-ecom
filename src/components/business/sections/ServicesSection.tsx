/**
 * ARCO Services Section - S-tier UI/UX
 * Premium services showcase with interactive cards and animations
 */

'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/design-system/primitives/card';
import { Badge } from '@/components/design-system/primitives/badge';
import { Button } from '@/components/design-system/primitives/button';
import { ArrowRight, Target, TrendingUp, Users, Zap, Shield, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Section } from './Section';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  badge?: string;
  popular?: boolean;
}

interface ServicesSectionProps {
  variant?: 'default' | 'dark' | 'light' | 'gradient';
  title?: string;
  subtitle?: string;
  description?: string;
  services?: Service[];
  className?: string;
}

const defaultServices: Service[] = [
  {
    icon: <Target className="h-8 w-8" />,
    title: 'Lead Quality Optimization',
    description: 'Transform low-quality leads into high-converting prospects with our proven qualification system.',
    features: [
      'Advanced lead scoring',
      'Behavioral analysis',
      'Conversion tracking',
      'Quality metrics'
    ],
    badge: 'Most Popular',
    popular: true,
  },
  {
    icon: <TrendingUp className="h-8 w-8" />,
    title: 'Funnel Performance Audit',
    description: 'Comprehensive analysis of your marketing funnel to identify bottlenecks and opportunities.',
    features: [
      'Multi-touchpoint analysis',
      'Conversion optimization',
      'Performance reporting',
      'ROI improvement'
    ],
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: 'Appointment Conversion',
    description: 'Maximize your appointment booking rates with our specialized conversion techniques.',
    features: [
      'Booking optimization',
      'Follow-up automation',
      'No-show reduction',
      'Customer journey mapping'
    ],
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: 'Revenue Acceleration',
    description: 'Fast-track your revenue growth with targeted strategies and rapid implementation.',
    features: [
      'Quick wins identification',
      'Implementation support',
      'Performance monitoring',
      'Results guarantee'
    ],
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: 'Marketing Compliance',
    description: 'Ensure your marketing practices meet industry standards and regulatory requirements.',
    features: [
      'Compliance auditing',
      'Risk assessment',
      'Policy development',
      'Training programs'
    ],
  },
  {
    icon: <BarChart3 className="h-8 w-8" />,
    title: 'Analytics & Insights',
    description: 'Deep-dive analytics to understand your customer behavior and market opportunities.',
    features: [
      'Data visualization',
      'Predictive analytics',
      'Custom dashboards',
      'Actionable insights'
    ],
  },
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  variant = 'default',
  title = 'Complete Marketing Solutions',
  subtitle = 'Services',
  description = 'From lead generation to appointment conversion, we provide comprehensive solutions to transform your marketing performance.',
  services = defaultServices,
  className,
}) => {
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

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card
              key={index}
              className={cn(
                'group relative overflow-hidden border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl',
                service.popular
                  ? 'border-primary bg-gradient-to-br from-primary/5 to-primary/10'
                  : 'hover:border-primary/20',
                variant === 'dark'
                  ? 'bg-white/5 border-white/10 hover:bg-white/10'
                  : ''
              )}
            >
              {/* Popular Badge */}
              {service.badge && (
                <div className="absolute -right-3 top-6 rotate-12">
                  <Badge className="bg-primary text-primary-foreground shadow-lg">
                    {service.badge}
                  </Badge>
                </div>
              )}

              <CardHeader className="space-y-4">
                {/* Icon */}
                <div
                  className={cn(
                    'flex h-16 w-16 items-center justify-center rounded-2xl transition-colors',
                    service.popular
                      ? 'bg-primary text-primary-foreground'
                      : variant === 'dark'
                      ? 'bg-white/10 text-white group-hover:bg-primary group-hover:text-primary-foreground'
                      : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground'
                  )}
                >
                  {service.icon}
                </div>

                {/* Title */}
                <CardTitle
                  className={cn(
                    'text-xl font-bold',
                    'font-[family-name:var(--font-ruwudu)]'
                  )}
                >
                  {service.title}
                </CardTitle>

                {/* Description */}
                <CardDescription
                  className={cn(
                    'text-base leading-relaxed',
                    variant === 'dark' ? 'text-white/70' : '',
                    'font-[family-name:var(--font-lora)]'
                  )}
                >
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Features List */}
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <div
                        className={cn(
                          'flex h-2 w-2 rounded-full',
                          service.popular ? 'bg-primary' : 'bg-primary/60'
                        )}
                      />
                      <span
                        className={cn(
                          'text-sm font-medium',
                          variant === 'dark' ? 'text-white/90' : 'text-foreground',
                          'font-[family-name:var(--font-lora)]'
                        )}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  variant={service.popular ? 'default' : 'outline'}
                  className={cn(
                    'w-full group/btn',
                    !service.popular && variant === 'dark'
                      ? 'border-white/20 bg-white/10 text-white hover:bg-white/20'
                      : ''
                  )}
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Button size="lg" className="px-8">
            View All Services
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default ServicesSection;