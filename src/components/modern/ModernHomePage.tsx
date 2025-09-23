'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/design-system/primitives/button';
import { Badge } from '@/components/design-system/primitives/badge';
import CasesSection from './CasesSection';
import TestimonialsSection from './TestimonialsSection';
import ProcessSection from './ProcessSection';
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  Users,
  Crown,
  Zap,
  Star,
  Play,
  CheckCircle,
  BarChart3,
  Target,
  Rocket,
  ShieldCheck
} from 'lucide-react';

const ModernHeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900/50 to-purple-900/50">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[url('/images/hero-bg.svg')] opacity-20 bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.15),transparent_50%)]" />
      
      {/* Enhanced Floating Elements */}
      <motion.div
        className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-blue-500/40 to-cyan-500/40 rounded-full blur-xl"
        animate={{ 
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.8, 0.4],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-32 right-32 w-32 h-32 bg-gradient-to-r from-purple-500/40 to-pink-500/40 rounded-full blur-xl"
        animate={{ 
          y: [0, 25, 0],
          scale: [1, 0.8, 1],
          opacity: [0.5, 1, 0.5],
          rotate: [360, 180, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute top-1/2 right-20 w-24 h-24 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-full blur-lg"
        animate={{ 
          x: [0, 20, 0],
          y: [0, -15, 0],
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="relative container mx-auto px-6 py-20 text-center">
        <motion.div
          className="max-w-5xl mx-auto space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge with Logo */}
          <motion.div
            className="flex items-center justify-center mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-4 px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Image
                src="/logo-v2.svg"
                alt="ARCO Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <Badge 
                variant="outline" 
                className="px-4 py-1 text-sm bg-transparent border-white/30 text-white"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Plataforma S-Tier de Marketing Digital
              </Badge>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            className="text-6xl lg:text-8xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transforme Seu 
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Negócio Digital
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Estratégias de marketing digital de alto impacto, tecnologia de ponta e 
            resultados comprovados para acelerar seu crescimento exponencial.
          </motion.p>

          {/* Enhanced Stats with Visual Impact */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-12 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {[
              { number: '500%', label: 'ROI Médio', icon: TrendingUp, color: 'from-green-400 to-emerald-500' },
              { number: '2.5M+', label: 'Leads Gerados', icon: Users, color: 'from-blue-400 to-cyan-500' },
              { number: '98%', label: 'Satisfação', icon: Star, color: 'from-yellow-400 to-orange-500' },
              { number: '24h', label: 'Suporte', icon: ShieldCheck, color: 'from-purple-400 to-pink-500' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center group cursor-pointer"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300,
                  delay: 0.5 + index * 0.1 
                }}
              >
                <div className="relative">
                  <motion.div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <stat.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider group-hover:text-gray-300 transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300"
                asChild
              >
                <Link href="/ecommerce/affiliate/signup" className="flex items-center gap-2">
                  <Rocket className="w-5 h-5" />
                  Começar Agora - Grátis
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg bg-white/10 border-white/20 text-white backdrop-blur-sm hover:bg-white/20"
                asChild
              >
                <Link href="#demo" className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Ver Demo
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="flex flex-wrap justify-center items-center gap-6 pt-12 opacity-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <span className="text-sm text-gray-400">Confiado por:</span>
            {['Enterprise', 'Startups', 'Agências', 'E-commerce'].map((trust) => (
              <div key={trust} className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-300">{trust}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-white rounded-full mt-2"
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

const TechShowcaseSection = () => {
  return (
    <section className="py-32 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/images/analytics.svg')] opacity-5 bg-repeat" />
      
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge variant="outline" className="mb-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
            <BarChart3 className="w-4 h-4 mr-2" />
            Tecnologia Avançada
          </Badge>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Plataforma de Marketing
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Baseada em IA
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nossa tecnologia proprietária combina machine learning, automação inteligente e analytics preditivo para maximizar seus resultados.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Visual Demo */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
              {/* Dashboard Preview */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-500 ml-3">dashboard.arco.digital</span>
                </div>
                <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg relative overflow-hidden">
                  <Image
                    src="/images/analytics.svg"
                    alt="Analytics Dashboard"
                    fill
                    className="object-contain p-8 opacity-80"
                  />
                  {/* Animated Metrics */}
                  <motion.div
                    className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="text-2xl font-bold text-green-600">+127%</div>
                    <div className="text-xs text-gray-600">Conversões</div>
                  </motion.div>
                  <motion.div
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    <div className="text-2xl font-bold text-blue-600">R$ 45K</div>
                    <div className="text-xs text-gray-600">ROI Mensal</div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-60"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
          </motion.div>

          {/* Right: Features List */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {[
              {
                icon: Target,
                title: 'IA para Segmentação',
                description: 'Algoritmos avançados identificam e segmentam seu público com precisão de 94%'
              },
              {
                icon: Zap,
                title: 'Automação Total',
                description: 'Workflows inteligentes que otimizam campanhas automaticamente em tempo real'
              },
              {
                icon: BarChart3,
                title: 'Analytics Preditivo',
                description: 'Preveja tendências e ajuste estratégias antes da concorrência'
              },
              {
                icon: ShieldCheck,
                title: 'Segurança Enterprise',
                description: 'Proteção de dados de nível bancário com certificações internacionais'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/50 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ x: 10 }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: TrendingUp,
      title: 'Growth Hacking Avançado',
      description: 'Estratégias testadas e comprovadas para crescimento exponencial usando técnicas de growth hacking de última geração.',
      color: 'from-blue-500 to-cyan-500',
      stats: '+500% ROI médio',
      image: '/images/marketing-strategy.svg'
    },
    {
      icon: Target,
      title: 'Targeting Inteligente',
      description: 'IA e machine learning para identificar e converter seu público ideal com precisão cirúrgica.',
      color: 'from-purple-500 to-pink-500',
      stats: '94% precisão',
      image: '/images/analytics.svg'
    },
    {
      icon: BarChart3,
      title: 'Analytics Preditivo',
      description: 'Dashboards avançados com insights preditivos para otimizar suas campanhas antes mesmo dos resultados.',
      color: 'from-emerald-500 to-teal-500',
      stats: '3x mais insights',
      image: '/images/analytics.svg'
    },
    {
      icon: Zap,
      title: 'Automação Total',
      description: 'Workflows automatizados que trabalham 24/7 para gerar leads, nutrir prospects e converter vendas.',
      color: 'from-orange-500 to-red-500',
      stats: '24/7 operando',
      image: '/images/marketing-strategy.svg'
    }
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50" />
      
      <div className="container mx-auto px-6 relative">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge variant="outline" className="mb-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
            <Crown className="w-4 h-4 mr-2" />
            Recursos S-Tier
          </Badge>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Tecnologia de Ponta para 
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Resultados Extraordinários
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nossa plataforma combina inteligência artificial, automação avançada e estratégias comprovadas para entregar resultados que superam suas expectativas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group relative overflow-hidden p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-gray-300 transition-all duration-500 hover:shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              {/* Background Image */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <Image
                  src={feature.image}
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>

              {/* Icon */}
              <motion.div
                className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.color} mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </motion.div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {feature.description}
                </p>
                
                {/* Stats Badge */}
                <motion.div
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${feature.color} text-white text-sm font-semibold`}
                  whileHover={{ scale: 1.05 }}
                >
                  <Star className="w-4 h-4" />
                  {feature.stats}
                </motion.div>
              </div>

              {/* Hover Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={false}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300"
              asChild
            >
              <Link href="/ecommerce/affiliate/signup" className="flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                Explorar Todos os Recursos
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[url('/images/hero-bg.svg')] opacity-10 bg-cover bg-center" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(59,130,246,0.2),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(147,51,234,0.2),transparent_70%)]" />
      
      {/* Animated Particles */}
      <motion.div
        className="absolute top-20 left-20 w-2 h-2 bg-white/60 rounded-full"
        animate={{ 
          y: [0, -100, 0],
          opacity: [0, 1, 0] 
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 0 }}
      />
      <motion.div
        className="absolute top-32 right-32 w-1 h-1 bg-cyan-400/80 rounded-full"
        animate={{ 
          y: [0, -80, 0],
          opacity: [0, 1, 0] 
        }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      />
      <motion.div
        className="absolute bottom-40 left-1/3 w-1.5 h-1.5 bg-purple-400/60 rounded-full"
        animate={{ 
          y: [0, -60, 0],
          opacity: [0, 1, 0] 
        }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 2 }}
      />
      
      <div className="container mx-auto px-6 text-center relative">
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Enhanced Badge */}
          <motion.div
            className="flex items-center justify-center mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="px-6 py-3 bg-white/10 border-white/20 text-white backdrop-blur-sm">
              <Sparkles className="w-5 h-5 mr-2" />
              <span className="text-base font-semibold">Oferta Limitada - 50% OFF no Primeiro Mês</span>
            </Badge>
          </motion.div>
          
          {/* Enhanced Headline */}
          <motion.h2
            className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Pronto para 
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Dominar Seu Mercado?
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Junte-se a centenas de empresas que já transformaram seus resultados. 
            Comece hoje mesmo e veja a diferença em 30 dias.
          </motion.p>

          {/* Enhanced CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="px-12 py-5 text-lg bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 text-white border-0 shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500 relative overflow-hidden group"
                asChild
              >
                <Link href="/ecommerce/affiliate/signup" className="flex items-center gap-3 relative z-10">
                  <Crown className="w-6 h-6" />
                  Começar Gratuitamente
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              className="flex items-center gap-3 text-gray-300"
              whileHover={{ scale: 1.05 }}
            >
              <CheckCircle className="w-6 h-6 text-green-400" />
              <span className="text-lg">Setup em 5 minutos • Sem cartão de crédito</span>
            </motion.div>
          </motion.div>

          {/* Enhanced Trust Indicators */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {[
              { icon: ShieldCheck, text: 'Garantia 30 dias', color: 'text-green-400' },
              { icon: Users, text: '+10.000 usuários', color: 'text-blue-400' },
              { icon: Star, text: '4.9/5 estrelas', color: 'text-yellow-400' },
              { icon: Crown, text: 'Suporte Premium', color: 'text-purple-400' }
            ].map((item, index) => (
              <motion.div
                key={item.text}
                className="flex flex-col items-center gap-3 p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300"
                whileHover={{ y: -5, scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <item.icon className={`w-8 h-8 ${item.color}`} />
                <span className="text-sm text-gray-300 font-medium text-center">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export const ModernHomePage = () => {
  return (
    <div className="overflow-x-hidden">
      <ModernHeroSection />
      <TechShowcaseSection />
      <FeaturesSection />
      <ProcessSection />
      <CasesSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
};