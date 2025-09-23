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
  LogOut,
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface UnifiedNavProps {
  className?: string;
}

export const UnifiedNavigation: React.FC<UnifiedNavProps> = ({ className }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
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
  const isAdminPage = pathname?.startsWith('/admin');

  const mainNavItems = [
    {
      href: '/',
      label: 'Home',
      icon: Home,
      active: isHomePage,
    },
    {
      href: '/ecommerce',
      label: 'Shopping',
      icon: Store,
      active: isEcommercePage,
    },
  ];

  if (isAdminPage) {
    mainNavItems.push({
      href: '/admin',
      label: 'Admin',
      icon: Settings,
      active: isAdminPage,
    });
  }

  return (
    <nav className={cn(
      'sticky top-0 z-50 w-full transition-all duration-300',
      'border-b border-primary-200/50',
      isScrolled 
        ? 'bg-white/80 backdrop-blur-glass shadow-medium' 
        : 'bg-white/60 backdrop-blur-sm',
      className
    )}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 md:h-18 items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Image
                  src="/logo-v2.svg"
                  alt="ARCO"
                  width={120}
                  height={40}
                  className="h-8 w-auto transition-transform group-hover:scale-105"
                  priority
                />
                {/* Glow effect on hover */}
                <div className="absolute inset-0 -z-10 blur-sm opacity-0 group-hover:opacity-20 transition-opacity duration-300">
                  <Image
                    src="/logo-v2.svg"
                    alt=""
                    width={120}
                    height={40}
                    className="h-8 w-auto"
                  />
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200",
                    "border border-transparent hover:border-primary-200/50",
                    item.active 
                      ? "bg-primary-100/70 backdrop-blur-sm text-primary-800 font-medium shadow-soft border-primary-200/50" 
                      : "text-primary-600 hover:text-primary-800 hover:bg-primary-50/50"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            
            {/* Search - Only on ecommerce */}
            {isEcommercePage && (
              <div className="hidden lg:flex items-center space-x-2 bg-primary-50/50 backdrop-blur-sm border border-primary-200/50 rounded-lg px-3 py-2">
                <Search className="w-4 h-4 text-primary-500" />
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  className="bg-transparent border-none outline-none text-sm text-primary-700 placeholder-primary-400 w-48"
                />
              </div>
            )}

            {/* Quick Actions */}
            <div className="flex items-center space-x-2">
              
              {/* Favorites - Only on ecommerce */}
              {isEcommercePage && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative text-primary-600 hover:text-primary-800 hover:bg-primary-100/50"
                >
                  <Heart className="w-4 h-4" />
                  <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    2
                  </Badge>
                </Button>
              )}

              {/* Cart - Only on ecommerce */}
              {isEcommercePage && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative text-primary-600 hover:text-primary-800 hover:bg-primary-100/50"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <Badge className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    3
                  </Badge>
                </Button>
              )}

              {/* Notifications */}
              <Button
                variant="ghost"
                size="sm"
                className="relative text-primary-600 hover:text-primary-800 hover:bg-primary-100/50"
              >
                <Bell className="w-4 h-4" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              </Button>
            </div>

            {/* User Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 text-primary-600 hover:text-primary-800 hover:bg-primary-100/50"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-soft">
                  <User className="w-4 h-4 text-white" />
                </div>
                <ChevronDown className="w-3 h-3 transition-transform duration-200" />
              </Button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white/90 backdrop-blur-glass border border-primary-200/50 rounded-lg shadow-medium py-2">
                  <Link href="/perfil" className="flex items-center space-x-2 px-4 py-2 text-primary-700 hover:bg-primary-50/50 transition-colors">
                    <User className="w-4 h-4" />
                    <span>Meu Perfil</span>
                  </Link>
                  <Link href="/favoritos" className="flex items-center space-x-2 px-4 py-2 text-primary-700 hover:bg-primary-50/50 transition-colors">
                    <Heart className="w-4 h-4" />
                    <span>Favoritos</span>
                  </Link>
                  <Link href="/configuracoes" className="flex items-center space-x-2 px-4 py-2 text-primary-700 hover:bg-primary-50/50 transition-colors">
                    <Settings className="w-4 h-4" />
                    <span>Configurações</span>
                  </Link>
                  <hr className="my-2 border-primary-200/50" />
                  <button className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50/50 transition-colors w-full text-left">
                    <LogOut className="w-4 h-4" />
                    <span>Sair</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-primary-600 hover:text-primary-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-primary-200/50 bg-white/80 backdrop-blur-glass">
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
                        ? "bg-primary-100/70 text-primary-800 font-medium shadow-soft" 
                        : "text-primary-600 hover:text-primary-800 hover:bg-primary-50/50"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              
              {/* Mobile Search */}
              {isEcommercePage && (
                <div className="px-4 py-3">
                  <div className="flex items-center space-x-2 bg-primary-50/50 border border-primary-200/50 rounded-lg px-3 py-2">
                    <Search className="w-4 h-4 text-primary-500" />
                    <input
                      type="text"
                      placeholder="Buscar produtos..."
                      className="bg-transparent border-none outline-none text-sm text-primary-700 placeholder-primary-400 flex-1"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default UnifiedNavigation;