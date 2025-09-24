'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { AdBanner } from '@/components/ads/GoogleAdsense';
import {
  Users,
  Award,
  Target,
  Heart,
  Zap,
  ShieldCheck,
  Star,
  ArrowRight,
  CheckCircle,
  Crown,
  Sparkles,
  TrendingUp
} from 'lucide-react';

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900/50 to-purple-900/50">
    {/* Background Effects */}
    <div className="absolute inset-0 bg-[url('/symbolic-overlay.png')] opacity-10 bg-cover bg-center" />
    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
    
    <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Badge className="mb-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border-white/20">
          <Sparkles className="w-4 h-4 mr-2" />
          Sobre a ARCO
        </Badge>
        
        <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
          Transformamos Experiências
        </h1>
        
        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
          Somos uma plataforma premium dedicada a conectar pessoas aos melhores produtos 
          através de tecnologia de ponta e curadoria especializada.
        </p>
        
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold"
        >
          Conheça Nossa História
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </div>
  </section>
);

const ValuesSection = () => {
  const values = [
    {
      icon: Heart,
      title: "Paixão por Excelência",
      description: "Buscamos sempre o melhor para nossos clientes, sem exceção",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: ShieldCheck,
      title: "Confiança e Segurança",
      description: "Transparência total em todos os processos e transações",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Zap,
      title: "Inovação Constante",
      description: "Tecnologia de ponta para a melhor experiência do usuário",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Users,
      title: "Foco no Cliente",
      description: "Cada decisão é tomada pensando no bem-estar dos nossos usuários",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">
            Nossos Valores
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Princípios que norteiam cada decisão e ação da nossa equipe
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full text-center p-6 hover:shadow-xl transition-shadow duration-300">
                <CardContent className="space-y-4">
                  <div className={`w-16 h-16 mx-auto bg-gradient-to-r ${value.color} rounded-full flex items-center justify-center`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  const stats = [
    { icon: Users, label: "Clientes Satisfeitos", value: "50K+", color: "from-blue-500 to-blue-600" },
    { icon: Award, label: "Produtos Curados", value: "10K+", color: "from-green-500 to-green-600" },
    { icon: Star, label: "Avaliação Média", value: "4.9/5", color: "from-yellow-500 to-orange-500" },
    { icon: Crown, label: "Anos de Experiência", value: "15+", color: "from-purple-500 to-purple-600" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">
            Números que Falam por Si
          </h2>
          <p className="text-lg text-gray-600">
            Resultados construídos com dedicação e excelência
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MissionSection = () => (
  <section className="py-24 bg-gradient-to-br from-blue-900 to-purple-900 text-white">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge className="mb-6 bg-white/10 text-white border-white/20">
            <Target className="w-4 h-4 mr-2" />
            Nossa Missão
          </Badge>
          
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">
            Conectar Pessoas aos Melhores Produtos
          </h2>
          
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Acreditamos que cada pessoa merece acesso aos melhores produtos do mercado. 
            Nossa missão é ser a ponte entre consumidores exigentes e produtos excepcionais, 
            sempre com transparência, qualidade e inovação.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              { icon: CheckCircle, text: "Curadoria Especializada" },
              { icon: ShieldCheck, text: "Compras Seguras" },
              { icon: TrendingUp, text: "Melhores Ofertas" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-blue-300" />
                </div>
                <span className="text-white font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default function AboutPage() {
  return (
    <>
      <HeroSection />
      <ValuesSection />
      <StatsSection />
      <div className="bg-white py-12">
        <div className="container mx-auto">
          <AdBanner position="content" />
        </div>
      </div>
      <MissionSection />
    </>
  );
}