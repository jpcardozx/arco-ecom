/**
 * ARCO Contact Section - S-tier UI/UX
 * Professional contact form with validation and multiple contact methods
 */

'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/design-system/primitives/card';
import { Badge } from '@/components/design-system/primitives/badge';
import { Button } from '@/components/design-system/primitives/button';
import { Input } from '@/components/design-system/primitives/input';
import { Label } from '@/components/design-system/primitives/label';
import { Textarea } from '@/components/design-system/primitives/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/design-system/primitives/select';
import { Checkbox } from '@/components/design-system/primitives/checkbox';
import { useToast } from '@/components/design-system/primitives/use-toast';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  Calendar,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Section } from './Section';

interface ContactMethod {
  icon: React.ReactNode;
  title: string;
  description: string;
  value: string;
  href?: string;
  available?: string;
}

interface ContactSectionProps {
  variant?: 'default' | 'dark' | 'light';
  title?: string;
  subtitle?: string;
  description?: string;
  showContactMethods?: boolean;
  showCalendlyEmbed?: boolean;
  className?: string;
}

const contactMethods: ContactMethod[] = [
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: 'Live Chat',
    description: 'Get instant answers to your questions',
    value: 'Start Chat',
    href: '#chat',
    available: 'Available now'
  },
  {
    icon: <Phone className="h-6 w-6" />,
    title: 'Phone Support',
    description: 'Speak directly with our experts',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
    available: 'Mon-Fri 9AM-6PM EST'
  },
  {
    icon: <Mail className="h-6 w-6" />,
    title: 'Email Us',
    description: 'Send us a detailed message',
    value: 'hello@arco.agency',
    href: 'mailto:hello@arco.agency',
    available: 'Response within 4 hours'
  },
  {
    icon: <Calendar className="h-6 w-6" />,
    title: 'Book a Call',
    description: 'Schedule a free consultation',
    value: 'Choose Time',
    href: '#calendar',
    available: 'Available slots today'
  }
];

const projectTypes = [
  'Revenue Optimization',
  'Marketing Audit',
  'Lead Generation',
  'Conversion Optimization',
  'Growth Strategy',
  'Other'
];

const budgetRanges = [
  'Under $5,000',
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  '$25,000 - $50,000',
  '$50,000+',
  'Let\'s discuss'
];

export const ContactSection: React.FC<ContactSectionProps> = ({
  variant = 'default',
  title = 'Ready to Transform Your Marketing?',
  subtitle = 'Get Started',
  description = 'Let\'s discuss how we can help you achieve your growth goals. Choose the best way to reach us.',
  showContactMethods = true,
  showCalendlyEmbed = false,
  className,
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: '',
    budget: '',
    message: '',
    newsletter: false,
    terms: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
        duration: 5000,
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        projectType: '',
        budget: '',
        message: '',
        newsletter: false,
        terms: false
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name && formData.email && formData.message && formData.terms;

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

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Methods */}
          {showContactMethods && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
                <p className="text-muted-foreground">
                  Choose the communication method that works best for you.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {contactMethods.map((method, index) => (
                  <Card
                    key={index}
                    className={cn(
                      'group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg',
                      variant === 'dark' ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'hover:border-primary/20'
                    )}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div
                          className={cn(
                            'flex h-12 w-12 items-center justify-center rounded-xl transition-colors',
                            variant === 'dark'
                              ? 'bg-white/10 text-white group-hover:bg-primary group-hover:text-primary-foreground'
                              : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground'
                          )}
                        >
                          {method.icon}
                        </div>

                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold">{method.title}</h4>
                            <Badge variant="outline" className="text-xs">
                              {method.available}
                            </Badge>
                          </div>

                          <p className="text-sm text-muted-foreground">
                            {method.description}
                          </p>

                          <div className="pt-2">
                            {method.href ? (
                              <a
                                href={method.href}
                                className="text-sm font-medium text-primary hover:underline"
                              >
                                {method.value}
                              </a>
                            ) : (
                              <span className="text-sm font-medium">
                                {method.value}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Office Info */}
              <Card className={cn(
                variant === 'dark' ? 'bg-white/5 border-white/10' : ''
              )}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>Our Office</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-medium">ARCO Digital Agency</p>
                    <p className="text-sm text-muted-foreground">
                      123 Business District<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Monday - Friday: 9:00 AM - 6:00 PM EST</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Contact Form */}
          <Card className={cn(
            'h-fit',
            variant === 'dark' ? 'bg-white/5 border-white/10' : ''
          )}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Send className="h-5 w-5" />
                <span>Send us a Message</span>
              </CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you within 24 hours.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="john@company.com"
                      required
                    />
                  </div>
                </div>

                {/* Company and Phone */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder="Your Company"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                {/* Project Type and Budget */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="projectType">Project Type</Label>
                    <Select value={formData.projectType} onValueChange={(value) => handleInputChange('projectType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent>
                        {projectTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget Range</Label>
                    <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                      <SelectContent>
                        {budgetRanges.map((range) => (
                          <SelectItem key={range} value={range}>
                            {range}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Tell us about your project and goals..."
                    rows={4}
                    required
                  />
                </div>

                {/* Checkboxes */}
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="newsletter"
                      checked={formData.newsletter}
                      onCheckedChange={(checked) => handleInputChange('newsletter', checked as boolean)}
                    />
                    <Label htmlFor="newsletter" className="text-sm leading-relaxed">
                      Subscribe to our newsletter for marketing tips and insights
                    </Label>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      checked={formData.terms}
                      onCheckedChange={(checked) => handleInputChange('terms', checked as boolean)}
                      required
                    />
                    <Label htmlFor="terms" className="text-sm leading-relaxed">
                      I agree to the <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a> and <a href="/terms" className="text-primary hover:underline">Terms of Service</a> *
                    </Label>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="w-full"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-transparent border-t-current" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>

                {/* Response Time */}
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <Zap className="h-4 w-4" />
                  <span>We typically respond within 4 hours</span>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Section>
  );
};

export default ContactSection;