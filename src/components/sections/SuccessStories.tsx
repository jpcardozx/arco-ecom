'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Trophy,
  Users,
  TrendingUp,
  DollarSign,
  Crown,
  Star,
  ArrowRight,
  Briefcase,
  Target,
  Zap
} from 'lucide-react';

const SuccessStories = () => {
  const stories = [
    {
      name: "TechStartup Pro",
      industry: "SaaS B2B",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      result: "+340% ROI",
      timeframe: "6 meses",
      description: "Aumentamos as conversões em 340% implementando nossa estratégia de growth hacking personalizada.",
      metrics: [
        { label: "Conversões", before: "2.1%", after: "9.2%" },
        { label: "Revenue", before: "R$ 50K", after: "R$ 220K" },
        { label: "Leads", before: "1.2K", after: "5.8K" }
      ],
      color: "from-emerald-500 to-green-600"
    },
    {
      name: "Fashion Elite",
      industry: "E-commerce",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
      result: "+280% Vendas",
      timeframe: "4 meses",
      description: "Transformamos uma pequena loja online em um marketplace de referência no segmento fashion.",
      metrics: [
        { label: "Ticket Médio", before: "R$ 89", after: "R$ 247" },
        { label: "Vendas/mês", before: "450", after: "1.710" },
        { label: "ROAS", before: "2.1x", after: "6.8x" }
      ],
      color: "from-violet-500 to-purple-600"
    },
    {
      name: "InvestMax",
      industry: "Fintech",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      result: "+450% Leads",
      timeframe: "3 meses",
      description: "Revolucionamos a aquisição de clientes para consultoria financeira premium com automação avançada.",
      metrics: [
        { label: "CAC", before: "R$ 180", after: "R$ 45" },
        { label: "LTV", before: "R$ 1.2K", after: "R$ 4.8K" },
        { label: "Margem", before: "15%", after: "47%" }
      ],
      color: "from-blue-500 to-cyan-600"
    }
  ];

  const achievements = [
    { icon: Trophy, label: "Cases de Sucesso", value: "500+", color: "text-amber-600" },
    { icon: TrendingUp, label: "Média de Crescimento", value: "285%", color: "text-emerald-600" },
    { icon: DollarSign, label: "Revenue Gerado", value: "R$ 50M+", color: "text-blue-600" },
    { icon: Users, label: "Clientes Ativos", value: "2.500+", color: "text-violet-600" }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-violet-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-emerald-500/30 to-cyan-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
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
          <Badge className="mb-4 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 text-emerald-300 border-emerald-500/20">
            <Crown className="w-4 h-4 mr-2" />
            Cases de Sucesso
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
            Histórias Reais de
            <span className="block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Transformação
            </span>
          </h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
            Descubra como empresas reais alcançaram resultados extraordinários com nossa plataforma
          </p>
        </motion.div>

        {/* Achievement Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {achievements.map((achievement, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                <achievement.icon className={`w-8 h-8 ${achievement.color}`} />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{achievement.value}</div>
              <div className="text-blue-200 text-sm">{achievement.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Success Stories */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="h-full bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-500 group-hover:-translate-y-2 backdrop-blur-sm">
                <CardContent className="p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={story.avatar}
                        alt={story.name}
                        className="w-14 h-14 rounded-full border-2 border-white/20"
                      />
                      <div>
                        <h3 className="text-lg font-bold text-white">{story.name}</h3>
                        <Badge className="bg-white/10 text-white/70 border-0 text-xs">
                          {story.industry}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold bg-gradient-to-r ${story.color} bg-clip-text text-transparent`}>
                        {story.result}
                      </div>
                      <div className="text-white/60 text-sm">{story.timeframe}</div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/80 mb-6 leading-relaxed">{story.description}</p>

                  {/* Metrics */}
                  <div className="space-y-3 mb-6">
                    {story.metrics.map((metric, metricIndex) => (
                      <div key={metricIndex} className="flex items-center justify-between">
                        <span className="text-white/70 text-sm">{metric.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white/50 text-sm line-through">{metric.before}</span>
                          <ArrowRight className="w-3 h-3 text-white/50" />
                          <span className={`font-bold bg-gradient-to-r ${story.color} bg-clip-text text-transparent`}>
                            {metric.after}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10 group-hover:border-white/40"
                  >
                    Ver Case Completo
                    <Target className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10"
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Pronto para Ser o Próximo Case de Sucesso?
            </h3>
            <p className="text-blue-200 mb-8 leading-relaxed">
              Junte-se a mais de 2.500 empresas que já transformaram seus resultados conosco.
              <span className="block mt-2 font-semibold">Comece sua jornada hoje mesmo.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 px-8 py-6 text-lg font-semibold"
                asChild
              >
                <Link href="/auth/signup" className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Começar Agora
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg"
                asChild
              >
                <Link href="/contato" className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Agendar Consultoria
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SuccessStories;