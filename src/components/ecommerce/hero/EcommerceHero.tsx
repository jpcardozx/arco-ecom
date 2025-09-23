/**
 * ARCO Ecommerce Hero - S-Tier Cinematographic Design
 * Premium shopping experience with credibility and trust elements
 */

'use client';

import React from 'react';
import { Button } from '@/components/design-system/primitives/button';
import { Badge } from '@/components/design-system/primitives/badge';
import { Star, Shield, Award, TrendingUp, Users, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface HeroStat {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface TrustBadge {
  text: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const heroStats: HeroStat[] = [
  { value: '50k+', label: 'Produtos Premium', icon: Award },
  { value: '98%', label: 'Satisfação', icon: Star },
  { value: '24h', label: 'Entrega', icon: Zap },
  { value: '15k+', label: 'Clientes', icon: Users }
];

const trustBadges: TrustBadge[] = [
  {
    text: 'SSL Seguro',
    icon: Shield,
    color: 'bg-green-100 text-green-700 border-green-200'
  },
  {
    text: 'Melhor Custo x Benefício',
    icon: TrendingUp,
    color: 'bg-blue-100 text-blue-700 border-blue-200'
  },
  {
    text: 'Avaliação 4.9★',
    icon: Star,
    color: 'bg-yellow-100 text-yellow-700 border-yellow-200'
  }
];

export const EcommerceHero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cinematographic Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80"
          alt="Premium Shopping Experience"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      </div>

      {/* Premium Overlay Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Trust Badges */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            {trustBadges.map((badge, index) => (
              <Badge
                key={index}
                variant="outline"
                className={cn(
                  'px-4 py-2 backdrop-blur-sm border-2',
                  badge.color
                )}
              >
                <badge.icon className="w-4 h-4 mr-2" />
                {badge.text}
              </Badge>
            ))}
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
              Shopping
              <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Premium
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Descubra produtos exclusivos com{' '}
              <span className="text-yellow-400 font-semibold">descontos únicos</span> de marcas confiáveis.
              Qualidade garantida, entrega rápida.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-black font-semibold px-8 py-4 text-lg shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Explorar Produtos
              <Zap className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg"
            >
              Ver Ofertas Especiais
            </Button>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {heroStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300 group"
              >
                <stat.icon className="w-8 h-8 text-yellow-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-xl" />
      </div>
      <div className="absolute bottom-32 right-16 animate-float-delayed">
        <div className="w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-xl" />
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center text-white/70">
          <span className="text-sm font-medium mb-2">Explorar Produtos</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};