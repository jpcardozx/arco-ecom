'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Badge } from '@/components/design-system/primitives/badge';
import {
  Star,
  Quote,
  TrendingUp,
  Award,
  Users2
} from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Carlos Eduardo Silva',
      role: 'CEO',
      company: 'TechStart Ventures',
      avatar: '/profile.webp',
      rating: 5,
      content: 'A ARCO revolucionou nossa estratégia digital. Em apenas 3 meses vimos um crescimento de 400% em leads qualificados. A equipe é extremamente técnica e entrega resultados consistentes.',
      results: {
        metric: '+400%',
        label: 'Leads Qualificados'
      },
      featured: true
    },
    {
      id: 2,
      name: 'Marina Costa',
      role: 'CMO',
      company: 'E-commerce Plus',
      avatar: '/profile.webp',
      rating: 5,
      content: 'Implementação impecável de funis de conversão. Nossa taxa de conversão subiu de 2% para 8.5% em 2 meses. ROI fantástico!',
      results: {
        metric: '+325%',
        label: 'Taxa de Conversão'
      },
      featured: false
    },
    {
      id: 3,
      name: 'Roberto Fernandez',
      role: 'Founder',
      company: 'SaaS Innovation',
      avatar: '/profile.webp',
      rating: 5,
      content: 'A automação de marketing que desenvolveram nos economiza 40h/semana e triplicou nossa geração de leads. Investimento que se paga sozinho.',
      results: {
        metric: '+300%',
        label: 'Geração de Leads'
      },
      featured: false
    },
    {
      id: 4,
      name: 'Ana Paula Rodrigues',
      role: 'Diretora de Marketing',
      company: 'FinTech Pro',
      avatar: '/profile.webp',
      rating: 5,
      content: 'Estratégia de growth hacking excepcional. Alcançamos 50k usuários em 6 meses quando nossa meta era 20k. Superaram todas as expectativas.',
      results: {
        metric: '+250%',
        label: 'Meta Superada'
      },
      featured: true
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-slate-900 via-blue-900/50 to-purple-900/50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/images/testimonials-bg.svg')] opacity-5" />
      
      {/* Floating Testimonial Bubbles */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
      <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-1000" />
      <div className="absolute bottom-32 left-32 w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-2000" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge variant="outline" className="mb-4 px-4 py-2 bg-white/10 border-white/20 text-white">
            <Award className="w-4 h-4 mr-2" />
            Testemunhos Reais
          </Badge>
          <h2 className="text-5xl font-bold text-white mb-6">
            O Que Nossos Clientes
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Estão Dizendo
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Mais de 500 empresas já transformaram seus resultados conosco. 
            Veja os depoimentos de quem realmente cresceu.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className={`relative group ${
                testimonial.featured 
                  ? 'lg:col-span-2' 
                  : ''
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 group-hover:-translate-y-1">
                {/* Quote Icon */}
                <div className="absolute -top-4 left-8">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full">
                    <Quote className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Featured Badge */}
                {testimonial.featured && (
                  <div className="absolute -top-2 -right-2">
                    <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-0">
                      <Star className="w-3 h-3 mr-1" />
                      Destaque
                    </Badge>
                  </div>
                )}

                {/* Rating */}
                <div className="flex items-center gap-1 mb-6 pt-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-white text-lg leading-relaxed mb-8">
                  "{testimonial.content}"
                </blockquote>

                {/* Results Highlight */}
                <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <span className="text-2xl font-bold text-white">
                      {testimonial.results.metric}
                    </span>
                    <span className="text-gray-300">
                      {testimonial.results.label}
                    </span>
                  </div>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/20">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white/20" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-300">
                      {testimonial.role} • {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Stats */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-16 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {[
            { number: '500+', label: 'Clientes Ativos', icon: Users2 },
            { number: '4.9/5', label: 'Avaliação Média', icon: Star },
            { number: '98%', label: 'Taxa de Retenção', icon: Award },
            { number: '350%', label: 'ROI Médio', icon: TrendingUp }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center group"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4 group-hover:bg-white/20 transition-colors duration-300">
                <stat.icon className="w-8 h-8 text-cyan-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-300 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;