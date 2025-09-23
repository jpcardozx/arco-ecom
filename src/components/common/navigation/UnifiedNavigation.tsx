/**
 * ARCO Unified Navigation - S-Tier UI/UX
 * Premium navbar with glassmorphism, logo, and sophisticated interactions
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/design-system/primitives/button';
import { Badge } from '@/components/design-system/primitives/badge';
import { 
  Home, 
  Store, 
  Menu, 
  X, 
  User, 
  Search,
  ShoppingCart,
  Bell,
  Heart,
  Settings,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface UnifiedNavProps {
  className?: string;
}

export const UnifiedNavigation: React.FC<UnifiedNavProps> = ({ className }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isEcommercePage = pathname?.startsWith('/ecommerce');
  const isHomePage = pathname === '/';

  const mainNavItems = [
    {
      href: '/',
      label: 'Home',
      icon: Home,
      active: isHomePage
    },
    {
      href: '/ecommerce',
      label: 'E-commerce',
      icon: Store,
      active: isEcommercePage
    }
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled 
        ? "bg-background/80 backdrop-blur-glass border-b border-border shadow-soft" 
        : "bg-transparent",
      className
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              ARCO
            </span>
          </Link>

          {/* Main Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200",
                    "hover:bg-muted/50 hover:shadow-soft",
                    item.active 
                      ? "bg-primary-50 text-primary-700 font-medium shadow-soft" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            
            {/* Search - Only on ecommerce */}
            {isEcommercePage && (
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:flex items-center space-x-2 text-muted-foreground hover:text-foreground"
              >
                <Search className="w-4 h-4" />
                <span className="hidden lg:inline">Buscar</span>
              </Button>
            )}

            {/* Cart - Only on ecommerce */}
            {isEcommercePage && (
              <Button
                variant="ghost"
                size="sm"
                className="relative text-muted-foreground hover:text-foreground"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </Button>
            )}

            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              className="relative text-muted-foreground hover:text-foreground"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>

            {/* Auth Section */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                <User className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Entrar</span>
              </Button>
              
              <Button
                size="sm"
                className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white shadow-glow"
              >
                <span className="hidden sm:inline">Cadastrar</span>
                <span className="sm:hidden">+</span>
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-glass">
            <div className="py-4 space-y-2">
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
                      item.active 
                        ? "bg-primary-50 text-primary-700 font-medium" 
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              
              {/* Mobile Search */}
              {isEcommercePage && (
                <button className="flex items-center space-x-3 px-4 py-3 w-full text-left text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors">
                  <Search className="w-5 h-5" />
                  <span>Buscar Produtos</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default UnifiedNavigation;