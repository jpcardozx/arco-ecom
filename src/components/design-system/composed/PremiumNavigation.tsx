'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/design-system/primitives/button';
import { Badge } from '@/components/design-system/primitives/badge';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/design-system/primitives/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/design-system/primitives/sheet';
import {
  Menu,
  ShoppingBag,
  Users,
  TrendingUp,
  Zap,
  Crown,
  ArrowRight,
  Phone,
  Star,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Logo Component - Clean, only logo
const ArcoLogo = ({ className }: { className?: string }) => (
  <motion.div 
    className={cn("flex items-center", className)}
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
  >
    <div className="relative group">
      <motion.div 
        className="w-12 h-12 relative"
        whileHover={{ rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Image
          src="/logo-v2.svg"
          alt="ARCO"
          width={48}
          height={48}
          className="object-contain"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-all duration-700 -z-10" />
      </motion.div>
    </div>
  </motion.div>
);

// Navigation Items - Client Focused
const navigationItems = [
  {
    title: 'Soluções',
    badge: 'Premium',
    items: [
      {
        title: 'Marketing Digital',
        description: 'Estratégias avançadas de growth hacking',
        href: '/#services',
        icon: TrendingUp,
        color: 'from-blue-500 to-cyan-500',
        featured: true,
      },
      {
        title: 'Consultoria Elite',
        description: 'Consultoria 1:1 com experts certificados',
        href: '/#pricing',
        icon: Crown,
        color: 'from-purple-500 to-pink-500',
        featured: true,
      },
      {
        title: 'Diagnóstico IA',
        description: 'Análise completa com inteligência artificial',
        href: '/#contact',
        icon: Zap,
        color: 'from-amber-500 to-orange-500',
        badge: 'Novo',
      },
      {
        title: 'Cases de Sucesso',
        description: 'Resultados reais dos nossos clientes',
        href: '/#results',
        icon: Star,
        color: 'from-green-500 to-emerald-500',
      },
    ],
  },
  {
    title: 'E-commerce',
    badge: 'Premium',
    items: [
      {
        title: 'Loja Virtual Completa',
        description: 'Plataforma e-commerce com IA integrada',
        href: '/ecommerce',
        icon: ShoppingBag,
        color: 'from-emerald-500 to-teal-500',
        featured: true,
      },
      {
        title: 'Automação de Vendas',
        description: 'Funis automatizados que vendem 24/7',
        href: '/ecommerce/automation',
        icon: Zap,
        color: 'from-blue-500 to-indigo-500',
        featured: true,
      },
      {
        title: 'Analytics Avançado',
        description: 'Dashboards inteligentes para otimização',
        href: '/ecommerce/analytics',
        icon: TrendingUp,
        color: 'from-purple-500 to-pink-500',
        badge: 'Pro',
      },
      {
        title: 'Consultoria 1:1',
        description: 'Estratégia personalizada para seu negócio',
        href: '/ecommerce/consulting',
        icon: Users,
        color: 'from-amber-500 to-orange-500',
      },
    ],
  },
];

export const PremiumNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavItem = ({ item }: { item: any }) => (
    <motion.div
      className="group"
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link
        href={item.href}
        className="flex items-center gap-3 p-4 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:shadow-lg"
      >
        <div className={cn(
          "p-2 rounded-lg transition-all duration-300 group-hover:scale-110 bg-gradient-to-br",
          item.color || 'from-gray-500 to-gray-600'
        )}>
          <item.icon className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
              {item.title}
            </h4>
            {item.badge && (
              <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                {item.badge}
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {item.description}
          </p>
        </div>
        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
      </Link>
    </motion.div>
  );

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: isScrolled 
          ? 'linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.25) 100%)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 100%)',
        backdropFilter: 'blur(30px) saturate(200%)',
        WebkitBackdropFilter: 'blur(30px) saturate(200%)',
        borderBottom: '1px solid rgba(255,255,255,0.25)',
        boxShadow: isScrolled ? '0 8px 32px rgba(0,0,0,0.12)' : '0 4px 16px rgba(0,0,0,0.08)',
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Clean and Simple */}
          <Link href="/" className="flex-shrink-0">
            <ArcoLogo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                {navigationItems.map((section) => (
                  <NavigationMenuItem key={section.title}>
                    <NavigationMenuTrigger className={cn(
                      "h-10 px-4 py-2 text-sm font-semibold transition-all duration-300",
                      "bg-transparent hover:bg-white/40 text-gray-900 dark:text-white",
                      "border-0 focus:border-0 focus:ring-0"
                    )}>
                      <span className="flex items-center gap-2">
                        {section.title}
                        {section.badge && (
                          <Badge variant="outline" className="text-xs px-1.5 py-0 border-blue-400 text-blue-700 bg-white/70">
                            {section.badge}
                          </Badge>
                        )}
                      </span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent 
                      className="min-w-[400px] p-6 border border-white/40 shadow-2xl"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.95) 100%)',
                        backdropFilter: 'blur(25px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(25px) saturate(180%)',
                      }}
                    >
                      <div className="grid gap-3">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                          <h3 className="text-lg font-semibold text-gray-900">
                            {section.title}
                          </h3>
                        </div>
                        {section.items?.map((item) => (
                          <NavItem key={item.title} item={item} />
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-800 hover:bg-white/40 backdrop-blur-sm font-medium"
                asChild
              >
                <Link href="/contato" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Contato
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
                asChild
              >
                <Link href="/ecommerce" className="flex items-center gap-2">
                  <Crown className="w-4 h-4" />
                  Começar Agora
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-900 hover:bg-white/40">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-80 border-l border-white/40"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.95) 100%)',
                  backdropFilter: 'blur(25px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(25px) saturate(180%)',
                }}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between py-6 border-b border-gray-200/50">
                    <ArcoLogo />
                    <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(false)}>
                      <X className="w-5 h-5" />
                    </Button>
                  </div>

                  <nav className="flex-1 py-6 space-y-6">
                    {navigationItems.map((section) => (
                      <div key={section.title} className="space-y-3">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">{section.title}</h3>
                          {section.badge && (
                            <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                              {section.badge}
                            </Badge>
                          )}
                        </div>
                        <div className="space-y-1 pl-4">
                          {section.items?.map((item) => (
                            <Link
                              key={item.title}
                              href={item.href}
                              className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/60 transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <div className={cn("p-1.5 rounded-md bg-gradient-to-br", item.color)}>
                                <item.icon className="w-3 h-3 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-gray-900 text-sm">{item.title}</div>
                                <div className="text-xs text-gray-600">{item.description}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </nav>

                  <div className="space-y-3 pt-6 border-t border-gray-200/50">
                    <Button variant="outline" className="w-full bg-white/70 border-gray-300" asChild>
                      <Link href="/contato" className="flex items-center justify-center gap-2">
                        <Phone className="w-4 h-4" />
                        Entrar em Contato
                      </Link>
                    </Button>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0" asChild>
                      <Link href="/ecommerce" className="flex items-center justify-center gap-2">
                        <Crown className="w-4 h-4" />
                        Começar Agora
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default PremiumNavigation;
