/**
 * ARCO Admin Analytics - Inteligência Didática
 * Sistema inteligente de insights e recomendações
 */

'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Brain,
  TrendingUp,
  Target,
  Lightbulb,
  BarChart3,
  Zap,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  MousePointer
} from 'lucide-react';

interface AnalyticsInsight {
  id: string;
  type: 'performance' | 'optimization' | 'trend' | 'alert';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  confidence: number;
  actionable: boolean;
  recommendation?: string;
  data?: any;
}

interface PerformanceMetrics {
  roas: number;
  conversionRate: number;
  ctr: number;
  cpc: number;
  totalSpend: number;
  revenue: number;
  impressions: number;
  clicks: number;
}

export default function AnalyticsInsights() {
  const [insights, setInsights] = useState<AnalyticsInsight[]>([]);
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ai-insights');

  useEffect(() => {
    loadAnalyticsData();
  }, []);

  const loadAnalyticsData = async () => {
    try {
      // Simular carregamento de dados analíticos
      await new Promise(resolve => setTimeout(resolve, 1500));

      const mockMetrics: PerformanceMetrics = {
        roas: 4.2,
        conversionRate: 3.8,
        ctr: 2.1,
        cpc: 1.85,
        totalSpend: 15420,
        revenue: 64764,
        impressions: 842650,
        clicks: 17694
      };

      const mockInsights: AnalyticsInsight[] = [
        {
          id: '1',
          type: 'performance',
          title: 'ROAS Excepcional Detectado',
          description: 'Sua campanha "Tech Premium" está performando 67% acima da média do setor.',
          impact: 'high',
          confidence: 94,
          actionable: true,
          recommendation: 'Aumentar investimento em 40% para maximizar retorno.'
        },
        {
          id: '2',
          type: 'optimization',
          title: 'Oportunidade de Otimização CPC',
          description: 'Palavras-chave de cauda longa podem reduzir CPC em até 23%.',
          impact: 'medium',
          confidence: 87,
          actionable: true,
          recommendation: 'Implementar estratégia de long-tail keywords.'
        },
        {
          id: '3',
          type: 'trend',
          title: 'Tendência Sazonal Identificada',
          description: 'Conversões aumentam 45% entre 14h-16h durante weekdays.',
          impact: 'medium',
          confidence: 91,
          actionable: true,
          recommendation: 'Concentrar budget em horários de pico.'
        },
        {
          id: '4',
          type: 'alert',
          title: 'Queda na Taxa de Conversão',
          description: 'Conversões reduziram 12% nos últimos 3 dias.',
          impact: 'high',
          confidence: 96,
          actionable: true,
          recommendation: 'Revisar landing pages e processo de checkout.'
        }
      ];

      setMetrics(mockMetrics);
      setInsights(mockInsights);
    } catch (error) {
      console.error('Erro ao carregar analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'performance': return <TrendingUp className="h-5 w-5" />;
      case 'optimization': return <Zap className="h-5 w-5" />;
      case 'trend': return <BarChart3 className="h-5 w-5" />;
      case 'alert': return <AlertCircle className="h-5 w-5" />;
      default: return <Lightbulb className="h-5 w-5" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-500/10 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-500/10 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-500/10 text-green-700 border-green-200';
      default: return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Brain className="h-16 w-16 text-blue-600 animate-pulse mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-900">Analisando dados com IA...</p>
          <p className="text-sm text-gray-600 mt-2">Gerando insights inteligentes</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Inteligência Didática</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Insights automatizados e recomendações estratégicas baseadas em IA
          </p>
        </div>

        {/* KPI Overview */}
        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">ROAS</p>
                    <p className="text-2xl font-bold text-gray-900">{metrics.roas}x</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
                <div className="mt-4">
                  <Progress value={metrics.roas * 20} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Conv. Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{metrics.conversionRate}%</p>
                  </div>
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <div className="mt-4">
                  <Progress value={metrics.conversionRate * 10} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">CTR</p>
                    <p className="text-2xl font-bold text-gray-900">{metrics.ctr}%</p>
                  </div>
                  <MousePointer className="h-8 w-8 text-purple-600" />
                </div>
                <div className="mt-4">
                  <Progress value={metrics.ctr * 20} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">CPC</p>
                    <p className="text-2xl font-bold text-gray-900">R$ {metrics.cpc}</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-orange-600" />
                </div>
                <div className="mt-4">
                  <Progress value={100 - (metrics.cpc * 30)} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/70 backdrop-blur-sm">
            <TabsTrigger value="ai-insights" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              IA Insights
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Recomendações
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Tendências
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ai-insights" className="space-y-6">
            <div className="grid gap-6">
              {insights.map((insight) => (
                <Card key={insight.id} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          {getInsightIcon(insight.type)}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{insight.title}</CardTitle>
                          <CardDescription>{insight.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getImpactColor(insight.impact)}>
                          {insight.impact.toUpperCase()}
                        </Badge>
                        <div className="text-sm text-gray-600">
                          {insight.confidence}% confiança
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  {insight.recommendation && (
                    <CardContent>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="flex items-start gap-3">
                          <Lightbulb className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-blue-900 mb-1">Recomendação</p>
                            <p className="text-blue-800 text-sm">{insight.recommendation}</p>
                          </div>
                        </div>
                        {insight.actionable && (
                          <div className="mt-3 flex gap-2">
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              Implementar Agora
                            </Button>
                            <Button size="sm" variant="outline">
                              Agendar para Depois
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <div className="grid gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Ações Prioritárias
                  </CardTitle>
                  <CardDescription>
                    Recomendações com maior impacto potencial
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {insights
                    .filter(i => i.actionable && i.impact === 'high')
                    .map((insight) => (
                      <div key={insight.id} className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{insight.title}</h4>
                          <Badge className="bg-red-500/10 text-red-700 border-red-200">
                            ALTA PRIORIDADE
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{insight.recommendation}</p>
                        <div className="flex items-center gap-2">
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Implementar
                          </Button>
                          <Button size="sm" variant="outline">
                            <Clock className="h-4 w-4 mr-1" />
                            Agendar
                          </Button>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Análise de Tendências
                  </CardTitle>
                  <CardDescription>
                    Padrões identificados pela inteligência artificial
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-medium text-green-900 mb-2">
                        📈 Tendência Positiva - Conversões Móveis
                      </h4>
                      <p className="text-sm text-green-800 mb-3">
                        Conversões em dispositivos móveis aumentaram 34% nas últimas 2 semanas.
                      </p>
                      <div className="bg-white p-3 rounded border">
                        <div className="flex justify-between text-sm">
                          <span>Progresso:</span>
                          <span>+34%</span>
                        </div>
                        <Progress value={75} className="h-2 mt-2" />
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-900 mb-2">
                        🎯 Padrão de Comportamento - Horários de Pico
                      </h4>
                      <p className="text-sm text-blue-800 mb-3">
                        Usuários estão mais ativos entre 14h-16h e 19h-21h.
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white p-3 rounded border text-center">
                          <div className="text-lg font-bold text-blue-600">14h-16h</div>
                          <div className="text-xs text-gray-600">+45% conversões</div>
                        </div>
                        <div className="bg-white p-3 rounded border text-center">
                          <div className="text-lg font-bold text-blue-600">19h-21h</div>
                          <div className="text-xs text-gray-600">+38% conversões</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <h4 className="font-medium text-yellow-900 mb-2">
                        ⚠️ Atenção - Sazonalidade Detectada
                      </h4>
                      <p className="text-sm text-yellow-800 mb-3">
                        Queda de 15% na performance durante finais de semana.
                      </p>
                      <Button size="sm" variant="outline" className="border-yellow-300">
                        Ajustar Estratégia de Weekend
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}