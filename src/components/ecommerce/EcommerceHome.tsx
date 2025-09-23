/**
 * ARCO Shopping Center - Premium Experience
 * Curated products with exclusive deals and trusted quality
 */

'use client';

import React from 'react';
import { Button } from '@/components/design-system/primitives/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/design-system/primitives/card';
import { Badge } from '@/components/design-system/primitives/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/design-system/primitives/tabs';
import { 
  ShoppingBag, 
  TrendingUp, 
  Users, 
  Star,
  ExternalLink,
  BarChart3,
  Settings,
  Plus,
  Zap,
  Shield,
  Gift,
  Heart,
  Truck,
  Award
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { BUSINESS_IMAGES } from '@/lib/unsplash';
import { ProductShowcase } from './ProductShowcase';
import { AffiliateDashboard } from './dashboard/AffiliateDashboard';
import { Footer } from '@/components/common/Footer';
import Image from 'next/image';
import Link from 'next/link';

interface QuickStat {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ComponentType<{ className?: string }>;
}

interface FeatureCard {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const quickStats: QuickStat[] = [
  {
    label: 'Produtos Premium',
    value: '2.847',
    change: '+125 novos',
    positive: true,
    icon: ShoppingBag
  },
  {
    label: 'Clientes Satisfeitos',
    value: '15.8k',
    change: '+8.2%',
    positive: true,
    icon: Users
  },
  {
    label: 'Avaliação Média',
    value: '4.9★',
    change: '+0.1',
    positive: true,
    icon: Star
  },
  {
    label: 'Entrega Rápida',
    value: '24h',
    change: 'Média',
    positive: true,
    icon: Truck
  }
];

const features: FeatureCard[] = [
  {
    title: 'Produtos Selecionados',
    description: 'Curadoria especial dos melhores produtos do mercado',
    icon: Award,
    color: 'bg-primary-100/50 text-primary-700 backdrop-blur-sm'
  },
  {
    title: 'Entrega Express',
    description: 'Receba seus produtos rapidamente em casa',
    icon: Truck,
    color: 'bg-primary-100/50 text-primary-700 backdrop-blur-sm'
  },
  {
    title: 'Compra Segura',
    description: 'Proteção total em todas as suas compras',
    icon: Shield,
    color: 'bg-primary-100/50 text-primary-700 backdrop-blur-sm'
  },
  {
    title: 'Ofertas Exclusivas',
    description: 'Descontos especiais para você economizar mais',
    icon: Gift,
    color: 'bg-primary-100/50 text-primary-700 backdrop-blur-sm'
  }
];

interface EcommerceHomeProps {
  className?: string;
}

export function EcommerceHome({ className }: EcommerceHomeProps) {
  return (
    <div className={cn("min-h-screen", className)}>
      {/* Enhanced background with subtle texture and depth */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-muted/30 -z-10" />
      <div 
        className="fixed inset-0 opacity-[0.02] -z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="container mx-auto px-4 py-8 max-w-7xl space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6 py-12">
          <div className="space-y-4">
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 text-base">
              ✨ Shopping Premium Experience
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Descubra os
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Melhores </span>
              Produtos
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Curadoria especial dos melhores produtos com qualidade garantida. 
              Ofertas exclusivas, entrega rápida e atendimento premium.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6 shadow-lg">
              <ShoppingBag className="h-5 w-5 mr-2" />
              Explorar Produtos
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
              <Link href="#showcase">
                <Heart className="h-5 w-5 mr-2" />
                Ver Favoritos
              </Link>
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden border-primary-200/50 bg-white/80 backdrop-blur-sm shadow-soft hover:shadow-medium transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-primary-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-primary-900">{stat.value}</p>
                    <div className={cn(
                      "flex items-center text-sm",
                      stat.positive ? "text-emerald-600" : "text-red-500"
                    )}>
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {stat.change} este mês
                    </div>
                  </div>
                  <div className="h-12 w-12 bg-primary-100/70 backdrop-blur-sm rounded-full flex items-center justify-center shadow-soft">
                    <stat.icon className="h-6 w-6 text-primary-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-primary-900">Por que escolher nossa plataforma?</h2>
            <p className="text-lg text-primary-600 max-w-2xl mx-auto">
              Experiência premium de shopping com produtos cuidadosamente selecionados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-medium transition-all duration-300 border-primary-200/50 bg-white/80 backdrop-blur-sm group">
                <CardContent className="space-y-4">
                  <div className={cn("w-16 h-16 rounded-full flex items-center justify-center mx-auto transition-all duration-300 group-hover:scale-110", feature.color)}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary-900">{feature.title}</h3>
                  <p className="text-primary-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Navigation Tabs */}
        <Tabs defaultValue="showcase" className="space-y-8">
          <div className="flex justify-center">
            <TabsList className="grid w-full max-w-md grid-cols-3 bg-primary-100/50 backdrop-blur-sm border border-primary-200/50">
              <TabsTrigger 
                value="showcase" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-soft data-[state=active]:text-primary-900"
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Produtos
              </TabsTrigger>
              <TabsTrigger 
                value="dashboard"
                className="data-[state=active]:bg-white data-[state=active]:shadow-soft data-[state=active]:text-primary-900"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger 
                value="settings"
                className="data-[state=active]:bg-white data-[state=active]:shadow-soft data-[state=active]:text-primary-900"
              >
                <Settings className="h-4 w-4 mr-2" />
                Configurações
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="showcase" id="showcase" className="space-y-0">
            <ProductShowcase />
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-0">
            <AffiliateDashboard />
          </TabsContent>

          <TabsContent value="settings" className="space-y-8">
            <Card className="border-primary-200/50 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-primary-900">Configurações da Conta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center py-12">
                  <Settings className="h-16 w-16 text-primary-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-primary-900 mb-2">Configurações em Desenvolvimento</h3>
                  <p className="text-primary-600 mb-6">
                    Painel de configurações será implementado em breve com:
                  </p>
                  <div className="space-y-2 text-sm text-primary-600 max-w-md mx-auto">
                    <div className="flex items-center justify-center gap-2">
                      <Star className="h-4 w-4 text-primary-500" />
                      <span>Configuração de APIs de afiliados</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Star className="h-4 w-4 text-primary-500" />
                      <span>Personalização de links</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Star className="h-4 w-4 text-primary-500" />
                      <span>Notificações e alertas</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Star className="h-4 w-4 text-primary-500" />
                      <span>Relatórios personalizados</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Professional Footer */}
      <Footer />
    </div>
  );
}