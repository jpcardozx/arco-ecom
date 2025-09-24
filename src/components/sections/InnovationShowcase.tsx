'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Cpu,
  Zap,
  Shield,
  Rocket,
  Brain,
  Code,
  Globe,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

const InnovationShowcase = () => {
  const innovations = [
    {
      icon: Brain,
      title: "IA Avançada",
      subtitle: "Machine Learning",
      description: "Algoritmos inteligentes que otimizam automaticamente suas campanhas para máximo ROI",
      features: ["Auto-otimização", "Predição de tendências", "Segmentação inteligente"],
      color: "from-violet-500 to-purple-600",
      bgColor: "from-violet-500/10 to-purple-600/10",
      delay: 0
    },
    {
      icon: Rocket,
      title: "Performance Extrema",
      subtitle: "99.9% Uptime",
      description: "Infraestrutura de nível enterprise com velocidade e confiabilidade incomparáveis",
      features: ["CDN global", "Cache inteligente", "Monitoramento 24/7"],
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-500/10 to-cyan-500/10",
      delay: 0.1
    },
    {
      icon: Shield,
      title: "Segurança Total",
      subtitle: "Certificação SOC2",
      description: "Proteção de dados de nível bancário com criptografia end-to-end",
      features: ["Criptografia AES-256", "Compliance LGPD", "Auditoria contínua"],
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-500/10 to-emerald-500/10",
      delay: 0.2
    }
  ];

  const techStats = [
    { label: "Requests/seg", value: "50K+", icon: Zap },
    { label: "Latência", value: "<50ms", icon: Cpu },
    { label: "Países", value: "150+", icon: Globe },
    { label: "APIs", value: "99.9%", icon: Code }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-violet-400/20 to-cyan-400/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-gradient-to-r from-violet-100 to-blue-100 text-violet-700 border-0 text-sm font-medium">
            <Brain className="w-4 h-4 mr-2" />
            Tecnologia de Ponta
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-violet-800 bg-clip-text text-transparent">
            Inovação que Impulsiona
            <span className="block text-3xl sm:text-4xl mt-2">Seus Resultados</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Tecnologias enterprise que garantem performance excepcional e crescimento sustentável para seu negócio
          </p>
        </motion.div>

        {/* Innovation Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {innovations.map((innovation, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: innovation.delay }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${innovation.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <innovation.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{innovation.title}</h3>
                    <Badge className={`bg-gradient-to-r ${innovation.bgColor} border-0 text-xs font-medium`}>
                      {innovation.subtitle}
                    </Badge>
                  </div>
                  
                  <p className="text-slate-600 mb-6 leading-relaxed">{innovation.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {innovation.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2 text-sm text-slate-500">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${innovation.color}`} />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="ghost" className="w-full justify-between text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-slate-800 hover:to-slate-700">
                    Saiba Mais
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tech Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-white/50"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Performance em Números</h3>
            <p className="text-slate-600">Métricas que comprovam nossa excelência técnica</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {techStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-violet-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InnovationShowcase;