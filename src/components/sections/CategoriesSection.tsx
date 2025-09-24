'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  Camera,
  Gamepad2,
  Home,
  Car,
  Shirt,
  Sparkles
} from 'lucide-react';

const categories = [
  {
    id: 'smartphones',
    name: 'Smartphones',
    icon: Smartphone,
    description: 'Última geração em tecnologia móvel',
    color: 'from-blue-500 to-cyan-500',
    count: '2.5k+ produtos'
  },
  {
    id: 'laptops',
    name: 'Laptops & PCs',
    icon: Laptop,
    description: 'Performance e produtividade máximas',
    color: 'from-purple-500 to-violet-500',
    count: '1.8k+ produtos'
  },
  {
    id: 'audio',
    name: 'Áudio & Fones',
    icon: Headphones,
    description: 'Som premium para audiófilos',
    color: 'from-green-500 to-emerald-500',
    count: '950+ produtos'
  },
  {
    id: 'wearables',
    name: 'Wearables',
    icon: Watch,
    description: 'Tecnologia vestível inteligente',
    color: 'from-orange-500 to-red-500',
    count: '720+ produtos'
  },
  {
    id: 'photography',
    name: 'Fotografia',
    icon: Camera,
    description: 'Capture momentos perfeitos',
    color: 'from-pink-500 to-rose-500',
    count: '630+ produtos'
  },
  {
    id: 'gaming',
    name: 'Gaming',
    icon: Gamepad2,
    description: 'Equipamentos para gamers',
    color: 'from-indigo-500 to-purple-500',
    count: '1.2k+ produtos'
  },
  {
    id: 'home',
    name: 'Casa & Jardim',
    icon: Home,
    description: 'Transforme seu lar',
    color: 'from-amber-500 to-yellow-500',
    count: '3.1k+ produtos'
  },
  {
    id: 'automotive',
    name: 'Automotivo',
    icon: Car,
    description: 'Acessórios e equipamentos',
    color: 'from-gray-500 to-slate-500',
    count: '850+ produtos'
  },
  {
    id: 'fashion',
    name: 'Moda & Estilo',
    icon: Shirt,
    description: 'Tendências e lifestyle',
    color: 'from-teal-500 to-cyan-500',
    count: '2.8k+ produtos'
  }
];

export const CategoriesSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-white to-slate-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-800 border border-purple-200/50 px-6 py-3 text-lg">
            <Sparkles className="w-5 h-5 mr-2" />
            Explore por Categorias
          </Badge>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-slate-800 via-purple-800 to-pink-800 bg-clip-text text-transparent">
              Encontre Exatamente
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              O Que Procura
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Navegue por nossas categorias cuidadosamente curadas com produtos de 
            <span className="text-purple-600 font-semibold"> alta qualidade</span> e 
            <span className="text-blue-600 font-semibold"> preços competitivos</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group cursor-pointer"
              onClick={() => window.location.href = `/ecommerce?categoria=${category.id}`}
            >
              <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm h-full">
                <CardContent className="p-8 text-center relative">
                  {/* Background Gradient */}
                  <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${category.color}`} />
                  
                  {/* Icon */}
                  <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <category.icon className="w-10 h-10 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-purple-600 transition-colors">
                    {category.name}
                  </h3>
                  
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  
                  <Badge 
                    variant="outline" 
                    className="text-slate-500 border-slate-200 group-hover:border-purple-300 group-hover:text-purple-600 transition-colors"
                  >
                    {category.count}
                  </Badge>
                  
                  {/* Hover Effect */}
                  <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${category.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-slate-600 mb-6">
            Não encontrou o que procura?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => window.location.href = '/contato'}
          >
            Fale Conosco
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};