'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  ShoppingCart,
  Zap,
  TrendingUp,
  Users,
  Globe,
  Smartphone,
  ArrowRight,
  BarChart3,
  Target,
  Crown,
  Sparkles,
  Award
} from 'lucide-react';

const TrendingProducts = () => {
  const trendingCategories = [
    {
      name: "Eletrônicos",
      growth: "+185%",
      hotProducts: ["iPhone 15 Pro", "MacBook Air M3", "AirPods Pro 2"],
      image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=300&fit=crop",
      color: "from-blue-500 to-cyan-500",
      icon: Smartphone,
      trend: "Em Alta"
    },
    {
      name: "Moda Premium",
      growth: "+142%",
      hotProducts: ["Tênis Designer", "Relógios Luxury", "Bolsas Grife"],
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
      color: "from-purple-500 to-pink-500",
      icon: Crown,
      trend: "Tendência"
    },
    {
      name: "Casa & Decor",
      growth: "+98%",
      hotProducts: ["Smart Home", "Móveis Design", "Arte Decorativa"],
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      color: "from-emerald-500 to-green-500",
      icon: Award,
      trend: "Popular"
    }
  ];

  const marketStats = [
    { label: "Crescimento Mensal", value: "+127%", icon: TrendingUp, color: "text-emerald-600" },
    { label: "Novos Produtos", value: "2.5K", icon: Sparkles, color: "text-blue-600" },
    { label: "Vendas Diárias", value: "15K+", icon: ShoppingCart, color: "text-purple-600" },
    { label: "Satisfação", value: "98.7%", icon: Target, color: "text-amber-600" }
  ];

  const topBrands = [
    { name: "Apple", sales: "45.2K", growth: "+23%" },
    { name: "Samsung", sales: "38.7K", growth: "+19%" },
    { name: "Nike", sales: "31.5K", growth: "+31%" },
    { name: "Adidas", sales: "28.9K", growth: "+27%" }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-tl from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [360, 180, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-300 border-cyan-500/20">
            <TrendingUp className="w-4 h-4 mr-2" />
            Trending Now
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
            Produtos em
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Alta Demanda
            </span>
          </h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
            Descubra os produtos mais procurados e as tendências que estão moldando o mercado
          </p>
        </motion.div>

        {/* Market Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {marketStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-blue-200 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trending Categories */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {trendingCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <Card className="h-full bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-500 group-hover:-translate-y-2 backdrop-blur-sm overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Trend Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className={`bg-gradient-to-r ${category.color} text-white border-0`}>
                      <category.icon className="w-3 h-3 mr-1" />
                      {category.trend}
                    </Badge>
                  </div>
                  
                  {/* Growth Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-green-500/90 text-white border-0">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {category.growth}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4">{category.name}</h3>
                  
                  <div className="space-y-2 mb-6">
                    <p className="text-blue-200 text-sm font-medium mb-2">Produtos em Alta:</p>
                    {category.hotProducts.map((product, productIndex) => (
                      <div key={productIndex} className="flex items-center gap-2 text-sm text-white/80">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color}`} />
                        {product}
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10 group-hover:border-white/40"
                    asChild
                  >
                    <Link href="/ecommerce">
                      Explorar Categoria
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Top Brands Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/10"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <Badge className="mb-4 bg-amber-500/10 text-amber-300 border-amber-500/20">
                <Crown className="w-4 h-4 mr-2" />
                Top Marcas
              </Badge>
              <h3 className="text-3xl font-bold text-white mb-6">
                Marcas Mais Vendidas
                <span className="block text-xl text-blue-200 font-normal mt-2">
                  Performance de vendas em tempo real
                </span>
              </h3>
              
              <div className="space-y-4">
                {topBrands.map((brand, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <div className="font-bold text-white">{brand.name}</div>
                        <div className="text-blue-200 text-sm">{brand.sales} vendas</div>
                      </div>
                    </div>
                    <Badge className="bg-green-500/20 text-green-300 border-0">
                      {brand.growth}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Right Content - Chart Visualization */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-white/5 to-white/10 rounded-3xl p-8 border border-white/10">
                <div className="text-center mb-8">
                  <h4 className="text-lg font-bold text-white mb-2">Crescimento de Vendas</h4>
                  <p className="text-blue-200 text-sm">Últimos 6 meses</p>
                </div>
                
                {/* Simplified Chart Visualization */}
                <div className="space-y-4">
                  {[85, 92, 78, 96, 88, 94].map((height, index) => (
                    <motion.div
                      key={index}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${height}%` }}
                      transition={{ duration: 1, delay: 0.6 + (index * 0.1) }}
                      viewport={{ once: true }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-8 text-blue-200 text-sm">
                        {new Date(2024, 6 + index).toLocaleDateString('pt-BR', { month: 'short' })}
                      </div>
                      <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-1000"
                          style={{ width: `${height}%` }}
                        />
                      </div>
                      <div className="w-12 text-white text-sm font-medium">{height}%</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrendingProducts;