/**
 * ARCO Footer Component - S-tier UI/UX
 * Professional footer with comprehensive links and branding
 */

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/design-system/primitives/button';
import { Input } from '@/components/design-system/primitives/input';
import { Separator } from '@/components/design-system/primitives/separator';
import { Badge } from '@/components/design-system/primitives/badge';
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Star,
  Shield,
  Award,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  variant?: 'default' | 'dark' | 'minimal';
  showNewsletter?: boolean;
  showSocial?: boolean;
  showTrustBadges?: boolean;
  className?: string;
}

const footerSections: FooterSection[] = [
  {
    title: 'Services',
    links: [
      { label: 'Revenue Optimization', href: '/services/revenue-optimization' },
      { label: 'Marketing Audit', href: '/services/marketing-audit' },
      { label: 'Lead Generation', href: '/services/lead-generation' },
      { label: 'Conversion Optimization', href: '/services/conversion-optimization' },
      { label: 'Growth Strategy', href: '/services/growth-strategy' },
      { label: 'View All Services', href: '/services' }
    ]
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Diagnostic Sprint', href: '/solutions/diagnostic' },
      { label: 'Revenue Rescue', href: '/solutions/revenue-rescue' },
      { label: 'Growth Partnership', href: '/solutions/growth-partnership' },
      { label: 'Custom Solutions', href: '/solutions/custom' },
      { label: 'Enterprise', href: '/enterprise' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Blog', href: '/blog' },
      { label: 'ROI Calculator', href: '/tools/roi-calculator' },
      { label: 'Marketing Toolkit', href: '/resources/toolkit' },
      { label: 'Webinars', href: '/resources/webinars' },
      { label: 'Downloads', href: '/resources/downloads' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Team', href: '/team' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
      { label: 'Partners', href: '/partners' },
      { label: 'Contact', href: '/contact' }
    ]
  }
];

const socialLinks = [
  { icon: Twitter, href: 'https://twitter.com/arcoagency', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/company/arcoagency', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://instagram.com/arcoagency', label: 'Instagram' },
  { icon: Youtube, href: 'https://youtube.com/arcoagency', label: 'YouTube' }
];

const trustBadges = [
  { icon: Shield, text: 'SSL Secured' },
  { icon: Award, text: 'Certified Agency' },
  { icon: Star, text: '4.9/5 Rating' },
  { icon: Zap, text: 'Fast Support' }
];

export const Footer: React.FC<FooterProps> = ({
  variant = 'dark',
  showNewsletter = true,
  showSocial = true,
  showTrustBadges = true,
  className,
}) => {
  const [email, setEmail] = React.useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  const isDark = variant === 'dark';

  return (
    <footer
      className={cn(
        'relative overflow-hidden',
        isDark ? 'bg-arco-dark text-white' : 'bg-gray-50 text-gray-900',
        className
      )}
    >
      {/* Newsletter Section */}
      {showNewsletter && (
        <div className={cn(
          'border-b',
          isDark ? 'border-white/10' : 'border-gray-200'
        )}>
          <div className="container mx-auto px-6 py-16">
            <div className="mx-auto max-w-4xl text-center space-y-8">
              <div className="space-y-4">
                <h3 className="text-3xl font-bold">
                  Stay Ahead of the Curve
                </h3>
                <p className={cn(
                  'text-lg',
                  isDark ? 'text-white/70' : 'text-gray-600'
                )}>
                  Get the latest marketing insights, growth strategies, and industry trends delivered to your inbox.
                </p>
              </div>

              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={cn(
                    'flex-1',
                    isDark ? 'bg-white/10 border-white/20 text-white placeholder:text-white/60' : ''
                  )}
                  required
                />
                <Button type="submit" className="px-6">
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              <p className={cn(
                'text-sm',
                isDark ? 'text-white/60' : 'text-gray-500'
              )}>
                Join 10,000+ marketers. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <Image
                src="/logo-v2.svg"
                alt="ARCO Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
              <p className={cn(
                'text-lg leading-relaxed max-w-md',
                isDark ? 'text-white/70' : 'text-gray-600'
              )}>
                We help local service businesses transform their marketing performance
                with proven, data-driven strategies that convert clicks into real appointments.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <a
                  href="mailto:hello@arco.agency"
                  className={cn(
                    'hover:text-primary transition-colors',
                    isDark ? 'text-white/90' : 'text-gray-600'
                  )}
                >
                  hello@arco.agency
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <a
                  href="tel:+15551234567"
                  className={cn(
                    'hover:text-primary transition-colors',
                    isDark ? 'text-white/90' : 'text-gray-600'
                  )}
                >
                  +1 (555) 123-4567
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span className={cn(
                  isDark ? 'text-white/90' : 'text-gray-600'
                )}>
                  New York, NY
                </span>
              </div>
            </div>

            {/* Trust Badges */}
            {showTrustBadges && (
              <div className="flex flex-wrap gap-3">
                {trustBadges.map((badge, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className={cn(
                      'flex items-center space-x-2 px-3 py-1',
                      isDark ? 'border-white/20 text-white/80' : 'border-gray-300'
                    )}
                  >
                    <badge.icon className="h-3 w-3" />
                    <span className="text-xs">{badge.text}</span>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h4 className="font-semibold text-lg">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className={cn(
                        'text-sm transition-colors hover:text-primary',
                        isDark ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                      )}
                      {...(link.external && {
                        target: '_blank',
                        rel: 'noopener noreferrer'
                      })}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <Separator className={isDark ? 'bg-white/10' : 'bg-gray-200'} />

      {/* Bottom Section */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className={cn(
            'text-sm',
            isDark ? 'text-white/60' : 'text-gray-500'
          )}>
            © {new Date().getFullYear()} ARCO Digital Agency. All rights reserved.
          </div>

          {/* Legal Links */}
          <div className="flex items-center space-x-6">
            <Link
              href="/privacy"
              className={cn(
                'text-sm transition-colors hover:text-primary',
                isDark ? 'text-white/60 hover:text-white' : 'text-gray-500 hover:text-gray-900'
              )}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className={cn(
                'text-sm transition-colors hover:text-primary',
                isDark ? 'text-white/60 hover:text-white' : 'text-gray-500 hover:text-gray-900'
              )}
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className={cn(
                'text-sm transition-colors hover:text-primary',
                isDark ? 'text-white/60 hover:text-white' : 'text-gray-500 hover:text-gray-900'
              )}
            >
              Cookie Policy
            </Link>
          </div>

          {/* Social Links */}
          {showSocial && (
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-full transition-all hover:scale-110',
                    isDark
                      ? 'bg-white/10 text-white/70 hover:bg-primary hover:text-white'
                      : 'bg-gray-200 text-gray-600 hover:bg-primary hover:text-white'
                  )}
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;