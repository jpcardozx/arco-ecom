'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Star, Zap, Target, Award, BookOpen, TrendingUp, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface PremiumFeature {
  icon: React.ElementType
  title: string
  description: string
  color: string
  benefit: string
}

const premiumFeatures: PremiumFeature[] = [
  {
    icon: Sparkles,
    title: 'Experiência S-Tier',
    description: 'Interface premium com animações Framer Motion e micro-interações que elevam a experiência do usuário.',
    color: 'from-purple-500 to-violet-500',
    benefit: 'Engajamento +40%'
  },
  {
    icon: Zap,
    title: 'Performance Otimizada',
    description: 'Build otimizado com Next.js 15, TypeScript e componentes shadcn/ui para máxima velocidade.',
    color: 'from-emerald-500 to-teal-500',
    benefit: 'Loading -60%'
  },
  {
    icon: Target,
    title: 'Mobile-First Design',
    description: 'Design responsivo premium que funciona perfeitamente em todos os dispositivos e tamanhos de tela.',
    color: 'from-blue-500 to-indigo-500',
    benefit: 'Conversão +35%'
  },
  {
    icon: Award,
    title: 'Componentes Avançados',
    description: 'Biblioteca com 40+ componentes premium incluindo DataTables, DatePickers e sistemas de notificação.',
    color: 'from-amber-500 to-orange-500',
    benefit: 'Produtividade +80%'
  },
  {
    icon: BookOpen,
    title: 'Sistema Editorial',
    description: 'Blog premium com categorias inteligentes, sistema de busca avançado e experiência de leitura otimizada.',
    color: 'from-rose-500 to-pink-500',
    benefit: 'Tempo de leitura +50%'
  },
  {
    icon: TrendingUp,
    title: 'Analytics Integrado',
    description: 'Sistema de métricas e analytics integrado para acompanhar performance e engajamento em tempo real.',
    color: 'from-slate-500 to-gray-500',
    benefit: 'Insights +100%'
  }
]

const PremiumFeatureCard = ({ feature, index }: { feature: PremiumFeature; index: number }) => {
  const Icon = feature.icon
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group"
    >
      <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white overflow-hidden">
        <CardContent className="p-8">
          <div className="relative mb-6">
            <div className={cn(
              "inline-flex p-4 rounded-2xl bg-gradient-to-r mb-4",
              feature.color
            )}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            
            <Badge 
              className="absolute -top-2 -right-2 bg-emerald-500 text-white border-0 shadow-lg"
            >
              {feature.benefit}
            </Badge>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
            {feature.title}
          </h3>
          
          <p className="text-gray-600 leading-relaxed mb-6">
            {feature.description}
          </p>
          
          <Button 
            variant="outline" 
            className="w-full group-hover:bg-emerald-50 group-hover:border-emerald-200 transition-all duration-300"
          >
            Explorar Feature
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const StatsSection = () => {
  const stats = [
    { value: '40+', label: 'Componentes Premium', color: 'text-emerald-500' },
    { value: '100%', label: 'Mobile Responsive', color: 'text-blue-500' },
    { value: '99.9%', label: 'Uptime Garantido', color: 'text-purple-500' },
    { value: 'S-Tier', label: 'UX Experience', color: 'text-amber-500' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1 + index * 0.1, type: "spring", bounce: 0.5 }}
          className="space-y-2"
        >
          <div className={cn("text-3xl lg:text-4xl font-bold", stat.color)}>
            {stat.value}
          </div>
          <div className="text-gray-600 text-sm font-medium">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export const PremiumShowcase = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Badge className="bg-gradient-to-r from-emerald-400 to-blue-400 text-white border-0 mb-4">
            <Star className="w-4 h-4 mr-2" />
            Plataforma Premium
          </Badge>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Experiência
            <span className="block bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">
              S-Tier
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Plataforma de e-commerce premium com componentes avançados, design editorial 
            e funcionalidades que elevam a experiência do usuário a um novo patamar.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="mb-20">
          <StatsSection />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {premiumFeatures.map((feature, index) => (
            <PremiumFeatureCard 
              key={index} 
              feature={feature} 
              index={index} 
            />
          ))}
        </div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center bg-white rounded-3xl p-12 shadow-2xl"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Construído com Tecnologias Premium
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'Next.js 15', desc: 'React Framework' },
              { name: 'TypeScript', desc: 'Type Safety' },
              { name: 'Framer Motion', desc: 'Animations' },
              { name: 'shadcn/ui', desc: 'Components' }
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + index * 0.1 }}
                className="text-center p-4 rounded-xl bg-gray-50 hover:bg-emerald-50 transition-colors duration-300"
              >
                <div className="font-semibold text-gray-900 mb-1">{tech.name}</div>
                <div className="text-sm text-gray-600">{tech.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="text-center mt-16"
        >
          <Button 
            size="lg"
            className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-12 py-6 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            Explorar Plataforma
            <Sparkles className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default PremiumShowcase