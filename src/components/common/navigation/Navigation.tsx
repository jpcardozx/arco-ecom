/**
 * ARCO Navigation Component
 * Professional navigation with variants and responsive design
 */

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/design-system/primitives/button';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationLink {
  href: string;
  label: string;
  hasDropdown?: boolean;
}

interface NavigationProps {
  variant?: 'transparent' | 'solid' | 'dark';
  links?: NavigationLink[];
  showAuth?: boolean;
  className?: string;
}

const defaultLinks: NavigationLink[] = [
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#results', label: 'Results' },
  { href: '#resources', label: 'Resources', hasDropdown: true },
];

export const Navigation: React.FC<NavigationProps> = ({
  variant = 'dark',
  links = defaultLinks,
  showAuth = true,
  className,
}) => {
  const variants = {
    transparent: 'bg-transparent border-b border-white/10 backdrop-blur-md',
    solid: 'bg-background/95 backdrop-blur-md border-b border-border/20 shadow-lg shadow-black/5',
    dark: 'bg-[hsl(var(--arco-dark))]/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20',
  };

  return (
    <nav className={cn(
      'sticky top-0 z-50 w-full transition-all duration-300',
      'supports-[backdrop-filter]:bg-background/60',
      variants[variant],
      className
    )}>
      <div className="container mx-auto">
        <div className="flex h-16 md:h-18 items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Image
                  src="/logo-v2.svg"
                  alt="ARCO Logo"
                  width={96}
                  height={36}
                  className="h-9 w-auto transition-transform group-hover:scale-105"
                  priority
                />
                {/* Subtle glow effect */}
                <div className="absolute inset-0 -z-10 blur-sm opacity-0 group-hover:opacity-20 transition-opacity">
                  <Image
                    src="/logo-v2.svg"
                    alt=""
                    width={96}
                    height={36}
                    className="h-9 w-auto"
                  />
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center text-sm font-medium transition-all duration-200',
                  'px-4 py-2 rounded-lg hover:bg-white/10 hover:backdrop-blur-sm',
                  'border border-transparent hover:border-white/20',
                  variant === 'dark'
                    ? 'text-white/90 hover:text-white hover:shadow-lg hover:shadow-white/10'
                    : 'text-foreground/80 hover:text-primary hover:bg-primary/5 hover:border-primary/20'
                )}
              >
                {link.label}
                {link.hasDropdown && (
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                )}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          {showAuth && (
            <div className="hidden md:flex md:items-center md:space-x-3">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  'transition-all duration-200 border border-transparent',
                  variant === 'dark'
                    ? 'text-white/90 hover:bg-white/10 hover:text-white hover:border-white/20 hover:backdrop-blur-sm'
                    : 'text-foreground/80 hover:text-foreground hover:bg-muted/50'
                )}
              >
                Login
              </Button>
              <Button
                size="sm"
                className={cn(
                  'transition-all duration-200 shadow-lg',
                  'bg-gradient-to-r from-[hsl(var(--arco-san-marino))] to-[hsl(var(--arco-dark-blue))]',
                  'hover:from-[hsl(var(--arco-dark-blue))] hover:to-[hsl(var(--arco-san-marino))]',
                  'hover:shadow-xl hover:shadow-[hsl(var(--arco-san-marino))]/25',
                  'hover:scale-105 active:scale-95',
                  'text-white font-semibold border border-white/20'
                )}
              >
                Get Started
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="sm"
              className={cn(
                'transition-all duration-200',
                variant === 'dark'
                  ? 'text-white hover:bg-white/10 hover:backdrop-blur-sm'
                  : 'text-foreground hover:bg-muted/50'
              )}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;