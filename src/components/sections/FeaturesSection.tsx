/**
 * Features Section Component
 * Uses SectionWrapper + StandardContainer + UI adornments
 */

import React from 'react';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { PremiumBadge, StatusIndicator, PulsingIndicator } from '@/components/ui/adornments';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  status?: 'available' | 'coming-soon' | 'beta';
  badge?: string;
}

interface FeaturesSectionProps {
  badge?: string;
  title: string;
  subtitle?: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  badge,
  title,
  subtitle,
  features,
  columns = 3
}) => {
  const gridColumns = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <SectionWrapper
      size="standard"
      padding="lg"
      animation="slideUp"
      background="muted"
      pattern="dots"
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
      <div className={`grid gap-6 ${gridColumns[columns]}`}>
        {features.map((feature, index) => (
          <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-muted-foreground/10">
            <CardHeader className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-primary/10 rounded-lg w-fit group-hover:bg-primary/20 transition-colors">
                  {feature.icon}
                </div>
                {feature.status && (
                  <div className="flex items-center gap-2">
                    {feature.status === 'available' && (
                      <StatusIndicator status="online" showPulse={false} />
                    )}
                    {feature.status === 'coming-soon' && (
                      <StatusIndicator status="away" showPulse={false} />
                    )}
                    {feature.status === 'beta' && (
                      <PulsingIndicator variant="warning" size="sm" />
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  {feature.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <CardDescription className="leading-relaxed">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
};