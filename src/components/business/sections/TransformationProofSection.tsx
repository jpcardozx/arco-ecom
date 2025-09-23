'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/design-system/primitives/card';
import { Badge } from '@/components/design-system/primitives/badge';
import { Button } from '@/components/design-system/primitives/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/design-system/primitives/tabs';
import { Progress } from '@/components/design-system/primitives/progress';
import {
  TrendingUp,
  DollarSign,
  Users,
  Calendar,
  ArrowRight,
  PlayCircle,
  Star,
  Award,
  Target,
  Zap,
  CheckCircle,
  Clock,
  BarChart3,
  Rocket
} from 'lucide-react';
import { cn } from '@/lib/utils';

const transformationCases = [
  {
    id: 'startup',
    category: 'Startup SaaS',
    client: 'TechFlow Solutions',
    industry: 'Software B2B',
    timeline: '90 dias',
    investment: 'R$ 15.000',
    before: {
      leads: 47,
      conversion: '2.1%',
      revenue: 'R$ 12.000',
      lv: 'R$ 380'
    },
    after: {
      leads: 312,
      conversion: '8.7%',
      revenue: 'R$ 89.000',
      lv: 'R$ 1.240'
    },
    improvements: {
      leads: '+563%',
      conversion: '+314%',
      revenue: '+642%',
      lv: '+226%'
    },
    challenge: 'Baixa qualidade de leads e funil de conversão ineficiente',
    solution: 'Reestruturação completa do funil + automação de qualificação + nurturing inteligente',
    results: [
      'Sistema de lead scoring implementado',
      'Automação de follow-up personalizada',
      'Landing pages otimizadas A/B testadas',
      'CRM integrado com análise preditiva'
    ],
    testimonial: {
      text: "Em 90 dias a ARCO transformou completamente nosso funil. Passamos de 2 reuniões por mês para 15 reuniões qualificadas por semana.",
      author: "Ricardo Mendes",
      role: "CEO, TechFlow Solutions"
    },
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 'ecommerce',
    category: 'E-commerce',
    client: 'Bella Cosméticos',
    industry: 'Varejo Online',
    timeline: '120 dias',
    investment: 'R$ 22.000',
    before: {
      leads: 180,
      conversion: '1.8%',
      revenue: 'R$ 45.000',
      lv: 'R$ 95'
    },
    after: {
      leads: 890,
      conversion: '6.2%',
      revenue: 'R$ 234.000',
      lv: 'R$ 387'
    },
    improvements: {
      leads: '+394%',
      conversion: '+244%',
      revenue: '+420%',
      lv: '+307%'
    },
    challenge: 'Alto custo de aquisição e baixa retenção de clientes',
    solution: 'Estratégia omnichannel + automação de remarketing + programa de fidelidade',
    results: [
      'Funil de remarketing inteligente',
      'Programa de fidelidade gamificado',
      'Email marketing behavioural',
      'Otimização de checkout mobile'
    ],
    testimonial: {
      text: "Resultado surpreendente! Triplicamos o faturamento e ainda melhoramos nossa margem. O ROI foi de 1.063% em 4 meses.",
      author: "Camila Santos",
      role: "Founder, Bella Cosméticos"
    },
    color: "from-pink-500 to-rose-500"
  },
  {
    id: 'services',
    category: 'Serviços B2B',
    client: 'Advocacia & Consultoria Lima',
    industry: 'Serviços Jurídicos',
    timeline: '75 dias',
    investment: 'R$ 18.500',
    before: {
      leads: 23,
      conversion: '13.0%',
      revenue: 'R$ 28.000',
      lv: 'R$ 4.200'
    },
    after: {
      leads: 127,
      conversion: '24.4%',
      revenue: 'R$ 156.000',
      lv: 'R$ 8.900'
    },
    improvements: {
      leads: '+452%',
      conversion: '+88%',
      revenue: '+457%',
      lv: '+112%'
    },
    challenge: 'Dificuldade para gerar leads qualificados em nicho específico',
    solution: 'Marketing de conteúdo especializado + LinkedIn outbound + webinars educativos',
    results: [
      'Blog jurídico com 50k+ visitantes/mês',
      'LinkedIn outbound com 31% reply rate',
      'Webinars mensais com 200+ participantes',
      'Sistema de nurturing especializado'
    ],
    testimonial: {
      text: "A ARCO nos posicionou como referência no mercado. Hoje temos uma fila de espera de clientes premium.",
      author: "Dr. Paulo Lima",
      role: "Sócio-fundador"
    },
    color: "from-emerald-500 to-teal-500"
  }
];

const kpis = [
  { label: 'ROI Médio', value: '847%', icon: TrendingUp, description: 'Retorno sobre investimento' },
  { label: 'Tempo Médio', value: '95 dias', icon: Clock, description: 'Para primeiros resultados' },
  { label: 'Taxa de Sucesso', value: '94.7%', icon: Target, description: 'Projetos com ROI positivo' },
  { label: 'Clientes Ativos', value: '847+', icon: Users, description: 'Empresas transformadas' }
];

export const TransformationProofSection = () => {
  const [activeCase, setActiveCase] = useState('startup');
  const activeCaseData = transformationCases.find(c => c.id === activeCase) || transformationCases[0];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/10 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Badge className="bg-green-100 text-green-700 border-green-200">
              <Award className="w-3 h-3 mr-1" />
              Casos Reais
            </Badge>
            <Badge className="bg-blue-100 text-blue-700 border-blue-200">
              <BarChart3 className="w-3 h-3 mr-1" />
              Resultados Comprovados
            </Badge>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Transformações
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent block">
              Que Mudaram Negócios
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Veja casos reais de empresas que multiplicaram seus resultados com nossas estratégias.
            Dados verificados, resultados auditados.
          </p>
        </div>

        {/* KPIs Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {kpis.map((kpi, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <kpi.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{kpi.value}</div>
                <div className="font-semibold mb-1">{kpi.label}</div>
                <div className="text-xs text-muted-foreground">{kpi.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Case Studies */}
        <div className="mb-16">
          <Tabs value={activeCase} onValueChange={setActiveCase} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12">
              {transformationCases.map((caseStudy) => (
                <TabsTrigger
                  key={caseStudy.id}
                  value={caseStudy.id}
                  className="text-sm font-medium"
                >
                  {caseStudy.category}
                </TabsTrigger>
              ))}
            </TabsList>

            {transformationCases.map((caseStudy) => (
              <TabsContent key={caseStudy.id} value={caseStudy.id}>
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Case Overview */}
                  <Card className="lg:col-span-2 overflow-hidden">
                    <div className={cn(
                      "h-2 bg-gradient-to-r",
                      caseStudy.color
                    )} />
                    <CardContent className="p-8">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <Badge className="mb-3">{caseStudy.category}</Badge>
                          <h3 className="text-2xl font-bold mb-2">{caseStudy.client}</h3>
                          <p className="text-muted-foreground">{caseStudy.industry}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Timeline</div>
                          <div className="font-semibold">{caseStudy.timeline}</div>
                        </div>
                      </div>

                      <div className="mb-8">
                        <h4 className="font-semibold mb-2 text-red-600">Desafio</h4>
                        <p className="text-muted-foreground mb-4">{caseStudy.challenge}</p>

                        <h4 className="font-semibold mb-2 text-blue-600">Solução</h4>
                        <p className="text-muted-foreground mb-4">{caseStudy.solution}</p>
                      </div>

                      {/* Before/After Comparison */}
                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="p-6 bg-red-50 rounded-lg border border-red-100">
                          <h4 className="font-semibold mb-4 text-red-700 flex items-center gap-2">
                            Antes da ARCO
                          </h4>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm">Leads/mês:</span>
                              <span className="font-semibold">{caseStudy.before.leads}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Taxa Conversão:</span>
                              <span className="font-semibold">{caseStudy.before.conversion}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Revenue/mês:</span>
                              <span className="font-semibold">{caseStudy.before.revenue}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">LTV Médio:</span>
                              <span className="font-semibold">{caseStudy.before.lv}</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-6 bg-green-50 rounded-lg border border-green-100">
                          <h4 className="font-semibold mb-4 text-green-700 flex items-center gap-2">
                            Depois da ARCO
                            <Rocket className="w-4 h-4" />
                          </h4>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm">Leads/mês:</span>
                              <div className="text-right">
                                <span className="font-semibold">{caseStudy.after.leads}</span>
                                <Badge className="ml-2 text-xs bg-green-100 text-green-700">
                                  {caseStudy.improvements.leads}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Taxa Conversão:</span>
                              <div className="text-right">
                                <span className="font-semibold">{caseStudy.after.conversion}</span>
                                <Badge className="ml-2 text-xs bg-green-100 text-green-700">
                                  {caseStudy.improvements.conversion}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Revenue/mês:</span>
                              <div className="text-right">
                                <span className="font-semibold">{caseStudy.after.revenue}</span>
                                <Badge className="ml-2 text-xs bg-green-100 text-green-700">
                                  {caseStudy.improvements.revenue}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">LTV Médio:</span>
                              <div className="text-right">
                                <span className="font-semibold">{caseStudy.after.lv}</span>
                                <Badge className="ml-2 text-xs bg-green-100 text-green-700">
                                  {caseStudy.improvements.lv}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Implementation Results */}
                      <div className="mb-6">
                        <h4 className="font-semibold mb-4 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          O que foi implementado
                        </h4>
                        <div className="grid md:grid-cols-2 gap-3">
                          {caseStudy.results.map((result, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                              {result}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Testimonial */}
                      <div className="border-l-4 border-primary pl-6 bg-primary/5 p-4 rounded-r-lg">
                        <blockquote className="text-muted-foreground italic mb-3">
                          "{caseStudy.testimonial.text}"
                        </blockquote>
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="font-semibold">{caseStudy.testimonial.author}</div>
                            <div className="text-sm text-muted-foreground">{caseStudy.testimonial.role}</div>
                          </div>
                          <div className="flex ml-auto">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Investment & ROI */}
                    <Card>
                      <CardContent className="p-6">
                        <h4 className="font-semibold mb-4 flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-primary" />
                          Investimento & ROI
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm">Investimento:</span>
                            <span className="font-semibold">{caseStudy.investment}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">ROI em {caseStudy.timeline}:</span>
                            <span className="font-bold text-green-600">
                              {Math.round((parseInt(caseStudy.after.revenue.replace(/[^\d]/g, '')) - parseInt(caseStudy.before.revenue.replace(/[^\d]/g, ''))) / parseInt(caseStudy.investment.replace(/[^\d]/g, '')) * 100)}%
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground border-t pt-2">
                            *Cálculo baseado no aumento de revenue mensal no período
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                      <CardContent className="p-6">
                        <h4 className="font-semibold mb-4">Quer resultados similares?</h4>
                        <div className="space-y-3">
                          <Button className="w-full">
                            <Calendar className="w-4 h-4 mr-2" />
                            Agendar Diagnóstico
                          </Button>
                          <Button variant="outline" className="w-full">
                            <PlayCircle className="w-4 h-4 mr-2" />
                            Ver Vídeo do Caso
                          </Button>
                          <Button variant="ghost" className="w-full text-primary">
                            Baixar Case Completo
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Industry Match */}
                    <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Target className="w-4 h-4 text-primary" />
                          <span className="font-semibold">Seu negócio é similar?</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          Se você atua no mesmo segmento, seus resultados podem ser ainda melhores.
                        </p>
                        <Button size="sm" className="w-full">
                          Falar com Especialista
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* CTA Final */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/20">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold mb-4">
                Pronto para ser o próximo caso de sucesso?
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Agende uma análise gratuita do seu negócio e descubra como podemos multiplicar seus resultados.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 px-8">
                  <Zap className="w-5 h-5 mr-2" />
                  Diagnóstico Gratuito
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" size="lg" className="px-8">
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Ver Todos os Cases
                </Button>
              </div>
              <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Sem compromisso
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Análise personalizada
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Estratégia gratuita
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};