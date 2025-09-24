'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Menu,
  ShoppingBag,
  Users,
  TrendingUp,
  Crown,
  ArrowRight,
  Phone,
  Star,
  X,
  Truck,
  Shield,
  User,
  LogIn,
  BookOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Logo Component - Enhanced with proper size and animations
const ArcoLogo = ({ className }: { className?: string }) => (
  <motion.div 
    className={cn("relative group py-3", className)}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 400, damping: 25 }}
  >
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <Image
        src="/logo-v2.svg"
        alt="ARCO"
        width={120}
        height={48}
        className="h-12 w-auto object-contain drop-shadow-sm transition-all duration-300 group-hover:drop-shadow-md"
        priority
      />
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
        initial={{ scale: 0.8 }}
        whileHover={{ scale: 1.2 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </motion.div>
  </motion.div>
);

// Navigation Button Component - Enhanced UX
const NavButton = ({ href, children, icon: Icon, variant = "ghost" }: {
  href: string;
  children: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
  variant?: "ghost" | "default";
}) => (
  <motion.div 
    whileHover={{ scale: 1.02, y: -1 }} 
    whileTap={{ scale: 0.98 }}
    transition={{ type: "spring", stiffness: 400, damping: 25 }}
  >
    <Button
      variant={variant}
      size="sm"
      className={cn(
        "font-medium text-base px-5 py-2.5 h-11 rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg backdrop-blur-sm",
        variant === "ghost" 
          ? "text-gray-800 hover:bg-white/60 hover:text-gray-900 border border-transparent hover:border-white/30"
          : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-blue-500/25"
      )}
      asChild
    >
      <Link href={href} className="flex items-center gap-2">
        <Icon className="w-4 h-4" />
        {children}
      </Link>
    </Button>
  </motion.div>
);

// Navigation Items - Customer Focused & Simplified
const navigationItems = [
  {
    title: 'Produtos',
    items: [
      {
        title: 'Catálogo Premium',
        description: 'Produtos exclusivos com qualidade garantida',
        href: '/ecommerce',
        icon: ShoppingBag,
        color: 'from-emerald-500 to-teal-500',
        featured: true,
      },
      {
        title: 'Ofertas do Dia',
        description: 'Descontos especiais por tempo limitado',
        href: '/ecommerce/ofertas',
        icon: Star,
        color: 'from-amber-500 to-orange-500',
        badge: 'Novo',
      },
      {
        title: 'Mais Vendidos',
        description: 'Produtos favoritos dos nossos clientes',
        href: '/ecommerce/populares',
        icon: TrendingUp,
        color: 'from-slate-600 to-slate-500',
      },
    ],
  },
  {
    title: 'Conteúdo',
    items: [
      {
        title: 'Blog Editorial',
        description: 'Artigos exclusivos, tendências e insights',
        href: '/blog',
        icon: BookOpen,
        color: 'from-purple-500 to-violet-500',
        featured: true,
        badge: 'Premium',
      },
      {
        title: 'Guias de Compra',
        description: 'Dicas especializadas para suas decisões',
        href: '/blog?category=guias',
        icon: Star,
        color: 'from-amber-500 to-orange-500',
      },
      {
        title: 'Tendências',
        description: 'O que está em alta no mercado',
        href: '/blog?category=tendencias',
        icon: TrendingUp,
        color: 'from-rose-500 to-pink-500',
      },
    ],
  },
  {
    title: 'Atendimento',
    items: [
      {
        title: 'Sobre Nós',
        description: 'Conheça nossa história e compromissos',
        href: '/about',
        icon: Users,
        color: 'from-blue-500 to-blue-600',
        featured: true,
      },
      {
        title: 'Suporte ao Cliente',
        description: 'Tire suas dúvidas sobre produtos e pedidos',
        href: '/suporte',
        icon: Phone,
        color: 'from-green-500 to-green-600',
      },
      {
        title: 'Entrega e Devolução',
        description: 'Informações sobre frete e política de troca',
        href: '/politicas',
        icon: Truck,
        color: 'from-slate-600 to-slate-500',
      },
      {
        title: 'Garantia',
        description: 'Proteção completa para suas compras',
        href: '/garantia',
        icon: Shield,
        color: 'from-green-500 to-emerald-500',
      },
    ],
  },
];

export const PremiumNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: isScrolled
          ? 'linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.35) 100%)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.25) 100%)',
        backdropFilter: 'blur(40px) saturate(180%) brightness(1.1)',
        WebkitBackdropFilter: 'blur(40px) saturate(180%) brightness(1.1)',
        borderBottom: isScrolled
          ? '1px solid rgba(255,255,255,0.4)'
          : '1px solid rgba(255,255,255,0.3)',
        boxShadow: isScrolled
          ? '0 8px 40px rgba(0,0,0,0.08), 0 2px 16px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)'
          : '0 4px 24px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.5)',
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20">
          {/* Logo - Left Side with enhanced spacing */}
          <div className="flex-shrink-0 mr-10 py-2">
            <Link href="/" className="block">
              <ArcoLogo />
            </Link>
          </div>

          {/* Center Navigation - Main Links */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-6">
              <NavButton href="/about" icon={Users}>Sobre Nós</NavButton>
              <NavButton href="/ecommerce" icon={ShoppingBag}>Produtos</NavButton>
              <NavButton href="/blog" icon={TrendingUp}>Blog</NavButton>
              <NavButton href="/contato" icon={Phone}>Contato</NavButton>
            </div>
          </div>

          {/* Right Side - CTAs & Auth */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <NavButton href="/auth/login" icon={LogIn}>Entrar</NavButton>
            <NavButton href="/auth/signup" icon={User} variant="default">Cadastrar</NavButton>
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
                className="w-80 border-l border-white/50"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.90) 100%)',
                  backdropFilter: 'blur(35px) saturate(200%) brightness(1.05)',
                  WebkitBackdropFilter: 'blur(35px) saturate(200%) brightness(1.05)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.7)',
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
                    <Button className="w-full bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-900 hover:to-slate-800 text-white border-0" asChild>
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
