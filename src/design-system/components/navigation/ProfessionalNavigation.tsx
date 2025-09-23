/**
 * ARCO Professional Navigation - Enterprise-Grade Header
 * Conservative, sophisticated navigation for business applications
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../button/Button';
import { useDesignGate } from '../../core/design-gate';
import { cn } from '@/lib/utils';
import {
  Menu,
  X,
  Phone,
  User,
  LogIn,
  ChevronDown
} from 'lucide-react';

// Professional Logo Component
const ProfessionalLogo = ({ className }: { className?: string }) => (
  <div className={cn("flex items-center", className)}>
    <Image
      src="/logo-v2.svg"
      alt="ARCO"
      width={120}
      height={48}
      className="h-12 w-auto object-contain"
      priority
    />
  </div>
);

// Navigation Link Component
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const NavLink = ({ href, children, className }: NavLinkProps) => (
  <Link
    href={href}
    className={cn(
      'text-slate-700 hover:text-slate-900 font-medium text-sm',
      'transition-colors duration-150',
      'px-3 py-2 rounded-sm hover:bg-slate-50',
      className
    )}
  >
    {children}
  </Link>
);

// Main Navigation Items
const navigationItems = [
  { label: 'Produtos', href: '/ecommerce' },
  { label: 'Sobre', href: '/about' },
  { label: 'Contato', href: '/contato' }
];

// Professional Navigation Component
export const ProfessionalNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Design System Gate Validation
  useDesignGate('ProfessionalNavigation', {});

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'bg-white/95 backdrop-blur-sm border-b border-slate-200',
        'transition-all duration-200',
        isScrolled && 'shadow-sm'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center py-2">
              <ProfessionalLogo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm" leftIcon={<LogIn className="w-4 h-4" />}>
                Entrar
              </Button>
            </Link>

            <Link href="/auth/signup">
              <Button variant="primary" size="sm" leftIcon={<User className="w-4 h-4" />}>
                Cadastrar
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Menu"
            >
              {isMobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-sm font-medium"
                  onClick={() => setIsMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-4 space-y-2">
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm" className="w-full justify-start" leftIcon={<LogIn className="w-4 h-4" />}>
                    Entrar
                  </Button>
                </Link>

                <Link href="/auth/signup">
                  <Button variant="primary" size="sm" className="w-full" leftIcon={<User className="w-4 h-4" />}>
                    Cadastrar
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default ProfessionalNavigation;