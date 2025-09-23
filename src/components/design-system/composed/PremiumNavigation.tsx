'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
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
  Mail,
  MapPin,
  ChevronDown,
  Star,
  Sparkles,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ArcoLogo = ({ className }: { className?: string }) => (
  <motion.div 
    className={cn("flex items-center gap-3", className)}
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
  >
    <div className="relative group">
      <motion.div 
        className="w-10 h-10 relative"
        whileHover={{ rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Image
          src="/logo-v2.svg"
          alt="ARCO Logo"
          width={40}
          height={40}
          className="object-contain"
          priority
        />
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-lg scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10" />
      </motion.div>
    </div>
    <div className="flex flex-col">
      <motion.span 
        className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
        initial={{ opacity: 0.8 }}
        whileHover={{ opacity: 1 }}
      >
        ARCO
      </motion.span>
      <motion.span 
        className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
        initial={{ opacity: 0.6 }}
        whileHover={{ opacity: 0.8 }}
      >
        S-Tier Platform
      </motion.span>
    </div>
  </motion.div>
);

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
    badge: 'S-Tier',
    items: [
      {
        title: 'Shopping Center',
        description: 'Produtos premium com curadoria especializada',
        href: '/ecommerce',
        icon: ShoppingBag,
        color: 'from-indigo-500 to-blue-500',
        featured: true,
      },
      {
        title: 'Programa de Afiliados',
        description: 'Monetize sua audiência com comissões S-Tier',
        href: '/ecommerce/affiliate/signup',
        icon: Users,
        color: 'from-violet-500 to-purple-500',
        badge: 'Alta Conversão',
      },
      {
        title: 'Dashboard Analytics',
        description: 'Métricas avançadas em tempo real',
        href: '/ecommerce/affiliate/dashboard',
        icon: Sparkles,
        color: 'from-teal-500 to-cyan-500',
      },
    ],
  },
];

interface NavigationLinkProps {
  href: string;
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const NavigationLink = ({ href, title, description, icon: Icon }: NavigationLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <div className={cn(
        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
        "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        isActive && "bg-accent text-accent-foreground"
      )}>
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-4 h-4" />}
          <div className="text-sm font-medium leading-none">{title}</div>
        </div>
        {description && (
          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground ml-7">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
};

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

  const NavItem = ({ item, isMainNav = false }: { item: any; isMainNav?: boolean }) => (
    <motion.div
      className="group"
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-3 p-4 rounded-xl transition-all duration-300",
          "hover:bg-gradient-to-r hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-800/50",
          item.featured && "border border-gray-200/50 dark:border-gray-700/50",
          isMainNav ? "text-sm font-medium" : "text-base"
        )}
        style={{
          background: item.featured 
            ? `linear-gradient(135deg, transparent, ${item.color?.split(' ')[1] || 'rgba(59, 130, 246, 0.1)'})` 
            : undefined
        }}
      >
        <div className={cn(
          "p-2 rounded-lg transition-all duration-300 group-hover:scale-110",
          `bg-gradient-to-br ${item.color || 'from-gray-500 to-gray-600'}`
        )}>
          <item.icon className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {item.title}
            </h4>
            {item.badge && (
              <Badge 
                variant="secondary" 
                className="text-xs px-2 py-0.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0"
              >
                {item.badge}
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
            {item.description}
          </p>
        </div>
        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
      </Link>
    </motion.div>
  );

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm" 
          : "bg-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <ArcoLogo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {navigationItems.map((section) => (
                  <NavigationMenuItem key={section.title}>
                    <NavigationMenuTrigger className={cn(
                      "h-10 px-4 py-2 text-sm font-medium transition-all duration-300",
                      "bg-transparent hover:bg-gray-100/80 dark:hover:bg-gray-800/80",
                      "data-[active]:bg-gray-100 dark:data-[active]:bg-gray-800",
                      "data-[state=open]:bg-gray-100/80 dark:data-[state=open]:bg-gray-800/80",
                      "border-0 focus:border-0 focus:ring-0"
                    )}>
                      <span className="flex items-center gap-2">
                        {section.title}
                        {section.badge && (
                          <Badge 
                            variant="outline" 
                            className="text-xs px-1.5 py-0 border-blue-200 text-blue-600 dark:border-blue-800 dark:text-blue-400"
                          >
                            {section.badge}
                          </Badge>
                        )}
                      </span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="w-[500px]">
                      <motion.div 
                        className="p-6 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-xl shadow-xl"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="mb-4">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                            {section.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Soluções premium para acelerar seus resultados
                          </p>
                        </div>
                        <div className="grid gap-3">
                          {section.items.map((item) => (
                            <NavItem key={item.title} item={item} />
                          ))}
                        </div>
                      </motion.div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:inline-flex hover:bg-gray-100 dark:hover:bg-gray-800"
                asChild
              >
                <Link href="/auth/signin">
                  Login
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/ecommerce/affiliate/signup" className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Começar Agora
                </Link>
              </Button>
            </motion.div>

            {/* Mobile Menu Button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden p-2"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-full sm:w-96 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-l border-gray-200/50 dark:border-gray-800/50"
              >
                <motion.div 
                  className="py-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-center justify-between mb-8">
                    <ArcoLogo />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    {navigationItems.map((section) => (
                      <motion.div 
                        key={section.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                          {section.title}
                          {section.badge && (
                            <Badge variant="outline" className="text-xs">
                              {section.badge}
                            </Badge>
                          )}
                        </h3>
                        <div className="space-y-2 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                          {section.items.map((item) => (
                            <NavItem key={item.title} item={item} isMainNav />
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.div 
                    className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full justify-center"
                      asChild
                    >
                      <Link href="/auth/signin">
                        Login
                      </Link>
                    </Button>
                    <Button
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
                      asChild
                    >
                      <Link href="/ecommerce/affiliate/signup" className="flex items-center justify-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Começar Agora
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
};