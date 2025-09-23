/**
 * ARCO Complete Landing Page - S-tier UI/UX
 * Comprehensive 15+ sections for maximum conversion
 */

'use client';

import React from 'react';
import { Hero } from '@/components/common/hero/Hero';
import { TransformationProofSection } from '@/components/business/sections/TransformationProofSection';
import { ServicesSection } from '@/components/business/sections/ServicesSection';
import { ProcessSection } from '@/components/business/sections/ProcessSection';
import { ResultsSection } from '@/components/business/sections/ResultsSection';
import { StatsSection } from '@/components/business/sections/StatsSection';
import { FeatureSection } from '@/components/business/sections/FeatureSection';
import { TestimonialSection } from '@/components/business/sections/TestimonialSection';
import { PricingSection } from '@/components/business/sections/PricingSection';
import { FAQSection } from '@/components/business/sections/FAQSection';
import { CTASection } from '@/components/business/sections/CTASection';
import { ContactSection } from '@/components/business/sections/ContactSection';
import { Footer } from '@/components/common/footer/Footer';
import { BUSINESS_IMAGES, getUnsplashImage } from '@/lib/unsplash';

export const CompleteLandingPage: React.FC = () => {
  // Hero configuration
  const heroActions = [
    {
      label: 'Get Started Today',
      href: '#pricing',
      variant: 'default' as const,
    },
    {
      label: 'Free Diagnostic',
      href: '#contact',
      variant: 'outline' as const,
    },
  ];

  // Diagnostic feature section data
  const diagnosticFeatures = [
    { text: 'Pinpoint lead quality issues in 24 hours' },
    { text: 'Analyze complete marketing funnel performance' },
    { text: 'Uncover hidden revenue opportunities' },
    { text: 'Identify conversion bottlenecks' },
    { text: 'Benchmark against industry standards' }
  ];

  const diagnosticActions = [
    {
      label: 'Start Free Audit',
      href: '#contact',
      variant: 'default' as const,
    },
    {
      label: 'View Sample Report',
      href: '#results',
      variant: 'outline' as const,
    },
  ];

  // Implementation feature section data
  const implementationFeatures = [
    { text: 'Custom strategy development' },
    { text: 'Team training and onboarding' },
    { text: 'Real-time performance monitoring' },
    { text: 'Ongoing optimization support' },
    { text: '30-day satisfaction guarantee' }
  ];

  const implementationActions = [
    {
      label: 'View Process',
      href: '#process',
      variant: 'default' as const,
    },
    {
      label: 'See Pricing',
      href: '#pricing',
      variant: 'outline' as const,
    },
  ];

  // Testimonial data
  const testimonial = {
    quote: 'ARCO transformed our approach to marketing. We finally see qualified leads turning into real appointments consistently!',
    author: {
      name: 'Emily Johnson',
      role: 'Owner',
      company: 'Johnson Realty',
      avatar: getUnsplashImage(BUSINESS_IMAGES.testimonials.client1, { width: 80, height: 80 }),
    },
    rating: 5,
  };

  // CTA variants for different sections
  const urgencyCTA = {
    type: 'urgency' as const,
    title: 'Don\'t Let Another Lead Slip Away',
    description: 'Every day you wait is revenue lost. Our next cohort starts Monday - secure your spot before it\'s too late.',
    urgencyText: 'Only 3 spots remaining this month',
    primaryAction: {
      label: 'Claim Your Spot Now',
      href: '#pricing'
    },
    features: [
      'Immediate access to diagnostic tools',
      'Priority implementation queue',
      'Bonus: Advanced analytics dashboard',
      '48-hour project kickoff guarantee'
    ]
  };

  const socialProofCTA = {
    type: 'social-proof' as const,
    title: 'Join Industry Leaders Who Trust ARCO',
    description: 'See why top-performing businesses choose us to optimize their marketing funnels and drive consistent growth.',
    primaryAction: {
      label: 'See How We Can Help You',
      href: '#contact'
    },
    socialProof: [
      { metric: '500+', label: 'Successful Projects' },
      { metric: '98%', label: 'Client Satisfaction' },
      { metric: '$2.4M+', label: 'Revenue Generated' },
      { metric: '312%', label: 'Average ROI Increase' }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Navigation */}
      <Hero
        title="Convert Clicks into Real Appointments Today"
        subtitle="Marketing Optimization Experts"
        description="Maximize your marketing budget with ARCO's proven, data-driven strategies. We help local service businesses turn inquiries into confirmed appointments effortlessly."
        backgroundImage="/hero-case-mosaic-2.png"
        backgroundColor="gradient"
        actions={heroActions}
        overlay
        showNavigation={false}
      />

      {/* Stats Section */}
      <StatsSection
        variant="light"
        title="Results That Speak for Themselves"
        subtitle="Proven Track Record"
        description="Our data-driven approach consistently delivers exceptional results across industries."
        animated
        showTrends
      />

      {/* Services Section */}
      <ServicesSection
        variant="default"
        title="Complete Marketing Solutions"
        subtitle="Our Services"
        description="From lead generation to appointment conversion, we provide comprehensive solutions to transform your marketing performance."
      />

      {/* Diagnostic Feature Section */}
      <FeatureSection
        variant="arco-gray"
        layout="image-left"
        badge="Free Diagnostic"
        title="Marketing Waste Radiography Tool"
        description="Instantly identify where your marketing budget is leaking. Our free diagnostic tool provides immediate insights into your appointment conversion challenges and revenue opportunities."
        features={diagnosticFeatures}
        image={{
          src: getUnsplashImage(BUSINESS_IMAGES.sections.analytics, { width: 800, height: 600 }),
          alt: 'Marketing Analytics Dashboard',
          width: 800,
          height: 600,
        }}
        actions={diagnosticActions}
      />

      {/* Process Section */}
      <ProcessSection
        variant="light"
        title="Our Proven 10-Day Process"
        subtitle="How We Work"
        description="Our systematic approach transforms your marketing funnel from analysis to optimization, ensuring maximum ROI and sustainable growth."
        interactive
      />

      {/* Results Section */}
      <ResultsSection
        variant="default"
        title="Real Results from Real Clients"
        subtitle="Success Stories"
        description="Our data-driven approach consistently delivers exceptional results for clients across industries."
        animated
      />

      {/* Transformation Proof Section */}
      <TransformationProofSection />

      {/* First Testimonial */}
      <TestimonialSection
        variant="arco-dark"
        testimonial={testimonial}
      />

      {/* Implementation Feature Section */}
      <FeatureSection
        variant="arco-blue"
        layout="image-right"
        badge="Implementation"
        title="Revenue Rescue Sprint"
        description="Our targeted intervention analyzes and optimizes your entire marketing funnel to maximize appointment conversions within 10 days."
        features={implementationFeatures}
        image={{
          src: getUnsplashImage(BUSINESS_IMAGES.sections.strategy, { width: 800, height: 600 }),
          alt: 'Strategy Implementation',
          width: 800,
          height: 600,
        }}
        actions={implementationActions}
      />

      {/* Urgency CTA Section */}
      <CTASection
        variant="gradient"
        layout="centered"
        ctaVariant={urgencyCTA}
      />

      {/* Pricing Section */}
      <PricingSection
        variant="light"
        title="Simple, Transparent Pricing"
        subtitle="Investment Options"
        description="Choose the perfect plan for your business growth. All plans include our satisfaction guarantee and proven methodology."
        showAnnualToggle
      />

      {/* Social Proof CTA */}
      <CTASection
        variant="gradient"
        layout="centered"
        ctaVariant={socialProofCTA}
      />

      {/* FAQ Section */}
      <FAQSection
        variant="default"
        title="Frequently Asked Questions"
        subtitle="FAQ"
        description="Find answers to common questions about our process, pricing, and results."
        showSearch
        showCategories
      />

      {/* Contact Section */}
      <ContactSection
        variant="light"
        title="Ready to Transform Your Marketing?"
        subtitle="Get Started"
        description="Let's discuss how we can help you achieve your growth goals. Choose the best way to reach us."
        showContactMethods
      />

      {/* Final CTA */}
      <CTASection
        variant="gradient"
        layout="card"
        ctaVariant={{
          type: 'value-proposition',
          title: 'Everything You Need to Succeed',
          description: 'Complete marketing transformation package designed for maximum ROI and sustainable growth.',
          primaryAction: {
            label: 'Start Your Transformation',
            href: '#pricing'
          },
          features: [
            'Comprehensive marketing audit',
            'Custom strategy development',
            'Implementation & optimization',
            'Performance monitoring',
            'Ongoing support & training'
          ],
          guarantee: '100% satisfaction guaranteed or your money back'
        }}
        includeEmailCapture
      />

      {/* Footer */}
      <Footer
        variant="dark"
        showNewsletter
        showSocial
        showTrustBadges
      />
    </div>
  );
};

export default CompleteLandingPage;