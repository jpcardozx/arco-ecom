/**
 * Testimonial Section Component
 * Uses SectionWrapper + StandardContainer + Card system
 */

import React from 'react';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { PremiumBadge, GradientText, StatusIndicator } from '@/components/ui/adornments';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

interface Testimonial {
  content: string;
  author: {
    name: string;
    role: string;
    company: string;
    avatar?: string;
  };
  rating?: number;
  verified?: boolean;
  featured?: boolean;
}

interface TestimonialSectionProps {
  badge?: string;
  title: string;
  subtitle?: string;
  testimonials: Testimonial[];
  layout?: 'grid' | 'carousel';
}

export const TestimonialSection: React.FC<TestimonialSectionProps> = ({
  badge,
  title,
  subtitle,
  testimonials,
  layout = 'grid'
}) => {
  const featuredTestimonial = testimonials.find(t => t.featured);
  const regularTestimonials = testimonials.filter(t => !t.featured);

  return (
    <SectionWrapper
      size="standard"
      padding="lg"
      animation="slideInLeft"
      background="default"
      pattern="grid"
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
      <div className="space-y-8">
        {/* Featured Testimonial */}
        {featuredTestimonial && (
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <PremiumBadge
                text="Featured"
                icon="star"
                variant="premium"
                glow
              />
            </div>

            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row gap-6 items-start">
                <div className="flex-1 space-y-4">
                  {featuredTestimonial.rating && (
                    <div className="flex items-center gap-1">
                      {Array.from({ length: featuredTestimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  )}

                  <blockquote className="text-lg leading-relaxed">
                    "{featuredTestimonial.content}"
                  </blockquote>

                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={featuredTestimonial.author.avatar} />
                      <AvatarFallback>
                        {featuredTestimonial.author.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{featuredTestimonial.author.name}</p>
                        {featuredTestimonial.verified && (
                          <StatusIndicator status="online" showPulse={false} />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {featuredTestimonial.author.role} at{' '}
                        <GradientText variant="primary">
                          {featuredTestimonial.author.company}
                        </GradientText>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Regular Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularTestimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  {testimonial.rating && (
                    <div className="flex items-center gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  )}

                  {testimonial.verified && (
                    <Badge variant="secondary" className="text-xs">
                      Verified
                    </Badge>
                  )}
                </div>

                <blockquote className="text-sm leading-relaxed">
                  "{testimonial.content}"
                </blockquote>

                <div className="flex items-center gap-3 pt-2 border-t">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={testimonial.author.avatar} />
                    <AvatarFallback className="text-xs">
                      {testimonial.author.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>

                  <div className="space-y-1">
                    <p className="font-medium text-sm">{testimonial.author.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.author.role} at {testimonial.author.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};