'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/design-system/primitives/button';
import { Badge } from '@/components/design-system/primitives/badge';
import {
  ArrowRight,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Star,
  ExternalLink,
  PlayCircle
} from 'lucide-react';

const CasesSection = () => {
  const cases = [
    {
      id: 'ipe',
      title: 'IPE Capital',
      category: 'Investimentos',
      image: '/case-thumb-ipe.png',
      logo: '/darkIpeLogo.png',
      description: 'Transformação digital completa para empresa de investimentos com crescimento de 450% em captação.',
      results: {
        growth: '+450%',
        leads: '15.000+',
        conversion: '12.5%',
        timeline: '6 meses'
      },
      tags: ['FinTech', 'B2B', 'Lead Generation'],
      color: 'from-blue-600 to-indigo-600'
    },
    {
      id: 'xora',
      title: 'Xora Digital',
      category: 'SaaS',
      image: '/case-thumb-xora.png',
      logo: '/logoXora.svg',
      description: 'Estratégia omnichannel para startup de SaaS resultando em crescimento exponencial de usuários.',
      results: {
        growth: '+320%',
        leads: '25.000+',
        conversion: '18.3%',
        timeline: '4 meses'
      },
      tags: ['SaaS', 'B2C', 'Growth Hacking'],
      color: 'from-purple-600 to-pink-600'
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge variant="outline" className="mb-4 px-4 py-2">
            <Star className="w-4 h-4 mr-2" />
            Cases de Sucesso
          </Badge>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Resultados que 
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Falam por Si Só
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Veja como empresas de diferentes segmentos transformaram seus negócios com nossas estratégias de marketing digital.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {cases.map((caseItem, index) => (
            <motion.div
              key={caseItem.id}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Case Card */}
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                {/* Hero Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={caseItem.image}
                    alt={caseItem.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${caseItem.color} opacity-60`} />
                  
                  {/* Logo Overlay */}
                  <div className="absolute top-6 left-6">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                      <Image
                        src={caseItem.logo}
                        alt={`${caseItem.title} logo`}
                        width={80}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Play Button */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                      <PlayCircle className="w-12 h-12 text-white" />
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="secondary" className="text-xs">
                      {caseItem.category}
                    </Badge>
                    {caseItem.tags.map((tag) => (
                      <span key={tag} className="text-xs text-gray-500">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {caseItem.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {caseItem.description}
                  </p>

                  {/* Results Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-center mb-2">
                        <TrendingUp className="w-5 h-5 text-green-600 mr-1" />
                        <span className="text-2xl font-bold text-gray-900">
                          {caseItem.results.growth}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">Crescimento</span>
                    </div>
                    
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-center mb-2">
                        <Users className="w-5 h-5 text-blue-600 mr-1" />
                        <span className="text-2xl font-bold text-gray-900">
                          {caseItem.results.leads}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">Leads</span>
                    </div>
                    
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-center mb-2">
                        <DollarSign className="w-5 h-5 text-purple-600 mr-1" />
                        <span className="text-2xl font-bold text-gray-900">
                          {caseItem.results.conversion}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">Conversão</span>
                    </div>
                    
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-center mb-2">
                        <Calendar className="w-5 h-5 text-orange-600 mr-1" />
                        <span className="text-2xl font-bold text-gray-900">
                          {caseItem.results.timeline}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">Tempo</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-gray-900 group-hover:text-white transition-all duration-300"
                      asChild
                    >
                      <Link href={`/cases/${caseItem.id}`} className="flex items-center justify-center gap-2">
                        Ver Case Completo
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Cases CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Button
            size="lg"
            variant="outline"
            className="px-8 py-4 hover:bg-gray-900 hover:text-white transition-all duration-300"
            asChild
          >
            <Link href="/cases" className="flex items-center gap-2">
              Ver Todos os Cases
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CasesSection;