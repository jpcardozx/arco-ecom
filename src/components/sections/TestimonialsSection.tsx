'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Star,
  Quote,
  CheckCircle,
  Users,
  Award,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Maria Silva",
    role: "Empresária",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b167?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    content: "A qualidade dos produtos é excepcional. Já comprei vários itens e nunca me decepcionei. O atendimento ao cliente é impecável e a entrega sempre pontual.",
    product: "MacBook Pro M3",
    verified: true
  },
  {
    id: 2,
    name: "João Santos",
    role: "Desenvolvedor",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    content: "Plataforma incrível! A curadoria de produtos é de primeiro mundo. Encontrei exatamente o que precisava com preços competitivos. Recomendo a todos!",
    product: "Setup Gaming",
    verified: true
  },
  {
    id: 3,
    name: "Ana Costa",
    role: "Designer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    content: "Experiência de compra fantástica! Interface limpa, processo de pagamento seguro e produtos de altíssima qualidade. Já indiquei para todos meus amigos.",
    product: "iPad Pro + Apple Pencil",
    verified: true
  },
  {
    id: 4,
    name: "Carlos Oliveira",
    role: "Fotógrafo",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    content: "Como profissional da área, preciso de equipamentos confiáveis. Encontrei na ARCO não só produtos premium, mas também suporte especializado.",
    product: "Sony A7R V",
    verified: true
  }
];

const stats = [
  {
    icon: Users,
    value: "50K+",
    label: "Clientes Satisfeitos",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "Avaliação Média",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: Award,
    value: "99.8%",
    label: "Taxa de Satisfação",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: TrendingUp,
    value: "200K+",
    label: "Produtos Entregues",
    color: "from-purple-500 to-pink-500"
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-32 right-20 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-32 left-20 w-96 h-96 bg-gradient-to-r from-green-400/20 to-cyan-400/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-black text-slate-800 mb-2">{stat.value}</div>
              <div className="text-slate-600 text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-800 border border-green-200/50 px-6 py-3 text-lg">
            <Quote className="w-5 h-5 mr-2" />
            Depoimentos Reais
          </Badge>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-slate-800 via-green-800 to-emerald-800 bg-clip-text text-transparent">
              O Que Dizem
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Nossos Clientes
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Histórias reais de pessoas que transformaram suas experiências com nossos produtos premium
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/90 backdrop-blur-sm h-full">
                <CardContent className="p-8">
                  {/* Quote Icon */}
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
                    <Quote className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  {/* Content */}
                  <p className="text-slate-700 mb-6 leading-relaxed italic text-lg">
                    "{testimonial.content}"
                  </p>
                  
                  {/* Product */}
                  <Badge className="mb-6 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border border-purple-200">
                    Produto: {testimonial.product}
                  </Badge>
                  
                  {/* Author */}
                  <div className="flex items-center">
                    <div className="relative">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-lg"
                      />
                      {testimonial.verified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="font-bold text-slate-800 text-lg">{testimonial.name}</div>
                      <div className="text-slate-600 text-sm">{testimonial.role}</div>
                      {testimonial.verified && (
                        <div className="flex items-center mt-1">
                          <ShieldCheck className="w-4 h-4 text-green-500 mr-1" />
                          <span className="text-xs text-green-600 font-medium">Cliente Verificado</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
                
                {/* Hover Effect */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
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
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Junte-se a Milhares de Clientes Satisfeitos
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Experimente a qualidade premium que nossos clientes adoram. Garantia de satisfação ou seu dinheiro de volta.
            </p>
            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => window.location.href = '/ecommerce'}
            >
              Começar Agora
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};