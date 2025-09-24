'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ShoppingBag,
  Truck,
  Shield,
  Award,
  Star,
  Clock,
  Users,
  ArrowRight,
  CheckCircle,
  Gift,
  CreditCard,
  Smartphone
} from 'lucide-react';

const BenefitsShowcase = () => {
  const benefits = [
    {
      icon: Truck,
      title: "Entrega Expressa",
      subtitle: "Receba Hoje",
      description: "Entrega no mesmo dia para pedidos até 14h em capitais. Logística premium para sua conveniência.",
      features: ["Same-day delivery", "Rastreamento ao vivo", "Embalagem premium", "Seguro total"],
      color: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50"
    },
    {
      icon: Shield,
      title: "Garantia Total",
      subtitle: "100% Protegido",
      description: "Garantia estendida e proteção completa. Devolução sem perguntas em até 30 dias.",
      features: ["Garantia estendida", "Devolução fácil", "Reembolso rápido", "Suporte premium"],
      color: "from-blue-500 to-cyan-600",
      bgGradient: "from-blue-50 to-cyan-50"
    },
    {
      icon: Award,
      title: "Qualidade Premium",
      subtitle: "Curadoria Especial",
      description: "Produtos selecionados por especialistas. Apenas marcas premium e com alta avaliação.",
      features: ["Produtos certificados", "Marcas premium", "Qualidade garantida", "Curadoria expert"],
      color: "from-amber-500 to-orange-600",
      bgGradient: "from-amber-50 to-orange-50"
    }
  ];

  const advantages = [
    {
      icon: CreditCard,
      title: "Pagamento Flexível",
      description: "Parcelamento em até 12x sem juros no cartão ou PIX com desconto",
      color: "text-violet-600"
    },
    {
      icon: Smartphone,
      title: "App Exclusivo",
      description: "Aplicativo com ofertas especiais e notificações de promoções",
      color: "text-blue-600"
    },
    {
      icon: Gift,
      title: "Programa de Fidelidade",
      description: "Pontos em cada compra e descontos exclusivos para clientes VIP",
      color: "text-pink-600"
    },
    {
      icon: Users,
      title: "Comunidade Premium",
      description: "Acesso a grupo exclusivo com dicas e ofertas antecipadas",
      color: "text-emerald-600"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50/50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tl from-emerald-200/30 to-cyan-200/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-0">
            <Star className="w-4 h-4 mr-2" />
            Vantagens Exclusivas
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
            Muito Mais que uma
            <span className="block text-3xl sm:text-4xl mt-2">Loja Online</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Benefícios exclusivos que fazem toda a diferença na sua experiência de compra
          </p>
        </motion.div>

        {/* Main Benefits */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className={`h-full bg-gradient-to-br ${benefit.bgGradient} border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2`}>
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                    <Badge className={`bg-gradient-to-r ${benefit.color} text-white border-0 text-xs font-medium`}>
                      {benefit.subtitle}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">{benefit.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {benefit.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center justify-center gap-2 text-sm text-gray-500">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Avaliação média dos clientes</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Advantages */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/50 shadow-xl"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ainda Mais Benefícios para Você
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descubra todos os diferenciais que tornam sua experiência única e excepcional
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <advantage.icon className={`w-8 h-8 ${advantage.color}`} />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{advantage.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900 mb-1">500K+</div>
                <div className="text-sm text-gray-600">Produtos Entregues</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 mb-1">4.9/5</div>
                <div className="text-sm text-gray-600">Avaliação Média</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 mb-1">24h</div>
                <div className="text-sm text-gray-600">Suporte Ativo</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 mb-1">30 dias</div>
                <div className="text-sm text-gray-600">Garantia Total</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsShowcase;