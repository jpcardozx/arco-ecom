/**
 * ARCO FAQ Section - S-tier UI/UX
 * Animated accordion with search and categories
 */

'use client';

import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/design-system/primitives/accordion';
import { Badge } from '@/components/design-system/primitives/badge';
import { Input } from '@/components/design-system/primitives/input';
import { Button } from '@/components/design-system/primitives/button';
import { Search, MessageCircle, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Section } from './Section';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface FAQSectionProps {
  variant?: 'default' | 'dark' | 'light';
  title?: string;
  subtitle?: string;
  description?: string;
  faqs?: FAQ[];
  showSearch?: boolean;
  showCategories?: boolean;
  className?: string;
}

const defaultFAQs: FAQ[] = [
  {
    id: '1',
    category: 'Getting Started',
    question: 'How quickly can you start working on my project?',
    answer: 'We can typically begin your diagnostic audit within 24-48 hours of project confirmation. Our rapid-start process ensures minimal delay between signup and seeing initial insights about your marketing performance.'
  },
  {
    id: '2',
    category: 'Getting Started',
    question: 'What information do you need from me to get started?',
    answer: 'We\'ll need access to your current marketing analytics, website performance data, and lead generation metrics. Don\'t worry - we provide a comprehensive onboarding checklist and our team will guide you through the entire setup process.'
  },
  {
    id: '3',
    category: 'Process',
    question: 'What exactly happens during the 10-day Revenue Rescue Sprint?',
    answer: 'Our sprint follows a proven 4-phase methodology: Days 1-2 focus on comprehensive auditing, Days 3-4 on strategy development, Days 5-8 on implementation, and Days 9-10 on optimization and results reporting. You\'ll receive daily updates and can track progress in real-time.'
  },
  {
    id: '4',
    category: 'Process',
    question: 'Will I need to pause my current marketing during the process?',
    answer: 'Not at all! We work alongside your existing campaigns, making incremental improvements that enhance rather than disrupt your current efforts. Our approach is designed to improve performance while maintaining continuity.'
  },
  {
    id: '5',
    category: 'Results',
    question: 'What kind of results can I realistically expect?',
    answer: 'While results vary by industry and starting point, our clients typically see 25-75% improvement in appointment booking rates within the first 30 days. We provide conservative projections based on your specific situation during the initial audit.'
  },
  {
    id: '6',
    category: 'Results',
    question: 'Do you guarantee results?',
    answer: 'Yes! We offer a satisfaction guarantee. If you\'re not completely satisfied with the insights and improvements delivered, we\'ll refund your investment. We\'re confident in our methodology because it\'s been proven across 500+ projects.'
  },
  {
    id: '7',
    category: 'Pricing',
    question: 'Are there any hidden fees or additional costs?',
    answer: 'No hidden fees, ever. The price you see is exactly what you pay. All tools, software access, and team time are included. The only additional costs might be for premium tool subscriptions we recommend, but these are always optional and discussed upfront.'
  },
  {
    id: '8',
    category: 'Pricing',
    question: 'Can I upgrade or downgrade my plan later?',
    answer: 'Absolutely! You can upgrade to a higher tier at any time and we\'ll credit what you\'ve already paid. For our ongoing Growth Partnership clients, we review plan fit quarterly to ensure you\'re getting maximum value.'
  },
  {
    id: '9',
    category: 'Support',
    question: 'What level of support do I get during the project?',
    answer: 'All clients get dedicated email support with response times under 4 hours during business days. Revenue Rescue and Growth Partnership clients also get priority phone support and scheduled check-in calls.'
  },
  {
    id: '10',
    category: 'Support',
    question: 'What happens after the initial project is complete?',
    answer: 'You\'ll receive a comprehensive handoff package including all optimizations made, ongoing recommendations, and optional monthly check-ins. Many clients choose to continue with our Growth Partnership for ongoing optimization and support.'
  }
];

const categories = [
  'All',
  'Getting Started',
  'Process',
  'Results',
  'Pricing',
  'Support'
];

export const FAQSection: React.FC<FAQSectionProps> = ({
  variant = 'default',
  title = 'Frequently Asked Questions',
  subtitle = 'FAQ',
  description = 'Find answers to common questions about our process, pricing, and results.',
  faqs = defaultFAQs,
  showSearch = true,
  showCategories = true,
  className,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter FAQs based on search and category
  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

        {/* Search and Filters */}
        <div className="mx-auto max-w-4xl space-y-6">
          {/* Search Bar */}
          {showSearch && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          )}

          {/* Category Filters */}
          {showCategories && (
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* FAQ Accordion */}
        <div className="mx-auto max-w-4xl">
          {filteredFAQs.length > 0 ? (
            <Accordion type="single" collapsible className="space-y-4">
              {filteredFAQs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className={cn(
                    'rounded-xl border px-6 py-2 transition-all hover:shadow-md',
                    variant === 'dark' ? 'border-white/10 bg-white/5' : 'bg-white'
                  )}
                >
                  <AccordionTrigger className="text-left hover:no-underline group">
                    <div className="flex items-start space-x-3">
                      <HelpCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div className="space-y-1">
                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                          {faq.question}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          {faq.category}
                        </Badge>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="ml-8 pt-2 pb-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-16 space-y-4">
              <HelpCircle className="h-16 w-16 text-muted-foreground mx-auto" />
              <h3 className="text-xl font-semibold">No questions found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or category filter.
              </p>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <MessageCircle className="h-5 w-5" />
            <span>Still have questions?</span>
          </div>
          <div className="space-x-4">
            <Button variant="outline">
              Contact Support
            </Button>
            <Button>
              Schedule a Call
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default FAQSection;