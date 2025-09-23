'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/design-system/primitives/badge';
import {
  Search,
  Target,
  Rocket,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Zap,
  TrendingUp
} from 'lucide-react';

const ProcessSection = () => {
  const steps = [
    {
      number: '01',
      title: 'Análise & Auditoria',
      description: 'Diagnóstico completo do seu negócio, análise de concorrência e identificação de oportunidades de crescimento.',
      icon: Search,
      features: [
        'Auditoria completa de marketing',
        'Análise de competidores',
        'Mapeamento de personas',
        'Identificação de gaps'
      ],
      color: 'from-blue-500 to-cyan-500',
      delay: 0
    },
    {
      number: '02',
      title: 'Estratégia Personalizada',
      description: 'Desenvolvimento de estratégia sob medida baseada em dados e melhores práticas do mercado.',
      icon: Target,
      features: [
        'Planejamento estratégico',
        'Definição de KPIs',
        'Roadmap de implementação',
        'Budget e timeline'
      ],
      color: 'from-purple-500 to-pink-500',
      delay: 0.1
    },
    {
      number: '03',
      title: 'Implementação Acelerada',
      description: 'Execução rápida e precisa com metodologia ágil e ferramentas de última geração.',
      icon: Rocket,
      features: [
        'Setup de ferramentas',
        'Criação de campanhas',
        'Automações avançadas',
        'Testes A/B contínuos'
      ],
      color: 'from-emerald-500 to-teal-500',
      delay: 0.2
    },
    {
      number: '04',
      title: 'Otimização Contínua',
      description: 'Monitoramento 24/7, análise de performance e otimizações constantes para maximizar resultados.',
      icon: BarChart3,
      features: [
        'Monitoramento em tempo real',
        'Relatórios avançados',
        'Otimizações semanais',
        'Escalabilidade garantida'
      ],
      color: 'from-orange-500 to-red-500',
      delay: 0.3
    }
  ];

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge variant="outline" className="mb-4 px-4 py-2">
            <Zap className="w-4 h-4 mr-2" />
            Nossa Metodologia
          </Badge>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Processo Comprovado para
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Crescimento Exponencial
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nossa metodologia S-Tier em 4 etapas garante resultados previsíveis e escaláveis. 
            Cada fase é cuidadosamente planejada para maximizar seu ROI.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 opacity-20" />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: step.delay }}
                viewport={{ once: true }}
              >
                {/* Step Card */}
                <div className="relative bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-gray-200 transition-all duration-300 hover:shadow-xl group-hover:-translate-y-2">
                  {/* Step Number */}
                  <div className="absolute -top-6 left-8">
                    <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                      {step.number}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${step.color} mb-6 mt-4 group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3">
                    {step.features.map((feature, featureIndex) => (
                      <motion.li
                        key={feature}
                        className="flex items-center gap-3 text-gray-700"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: step.delay + (featureIndex * 0.1) }}
                        viewport={{ once: true }}
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Arrow for connection (desktop) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <div className="w-8 h-8 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shadow-sm">
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Results Preview */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Resultados Típicos em 90 Dias
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { metric: '300%+', label: 'Aumento em Leads', icon: TrendingUp },
                { metric: '150%+', label: 'Melhoria no ROI', icon: BarChart3 },
                { metric: '50%+', label: 'Redução em CAC', icon: Target }
              ].map((result, index) => (
                <motion.div
                  key={result.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4">
                    <result.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {result.metric}
                  </div>
                  <div className="text-gray-600">
                    {result.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;