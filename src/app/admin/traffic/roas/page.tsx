/**
 * ARCO Admin ROAS & ROI Analysis
 * Detailed return on ad spend and investment analysis
 */

'use client';

import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Target,
  BarChart3,
  PieChart,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  CheckCircle,
  Info,
  Zap
} from 'lucide-react';

interface ROASData {
  channel: string;
  adSpend: number;
  revenue: number;
  roas: number;
  roi: number;
  impressions: number;
  clicks: number;
  conversions: number;
  cpc: number;
  ctr: number;
  conversionRate: number;
  target: number;
  status: 'excellent' | 'good' | 'average' | 'poor';
}

const mockROASData: ROASData[] = [
  {
    channel: 'Google Search',
    adSpend: 12500,
    revenue: 62400,
    roas: 4.99,
    roi: 399,
    impressions: 245000,
    clicks: 4900,
    conversions: 156,
    cpc: 2.55,
    ctr: 2.0,
    conversionRate: 3.18,
    target: 4.0,
    status: 'excellent'
  },
  {
    channel: 'Facebook Ads',
    adSpend: 8900,
    revenue: 35600,
    roas: 4.00,
    roi: 300,
    impressions: 189000,
    clicks: 3780,
    conversions: 89,
    cpc: 2.35,
    ctr: 2.0,
    conversionRate: 2.35,
    target: 3.5,
    status: 'excellent'
  },
  {
    channel: 'Instagram Shopping',
    adSpend: 6200,
    revenue: 18600,
    roas: 3.00,
    roi: 200,
    impressions: 156000,
    clicks: 2340,
    conversions: 46,
    cpc: 2.65,
    ctr: 1.5,
    conversionRate: 1.97,
    target: 3.0,
    status: 'good'
  },
  {
    channel: 'YouTube Ads',
    adSpend: 4500,
    revenue: 11250,
    roas: 2.50,
    roi: 150,
    impressions: 125000,
    clicks: 1500,
    conversions: 22,
    cpc: 3.00,
    ctr: 1.2,
    conversionRate: 1.47,
    target: 2.5,
    status: 'good'
  },
  {
    channel: 'LinkedIn Ads',
    adSpend: 3200,
    revenue: 6080,
    roas: 1.90,
    roi: 90,
    impressions: 45000,
    clicks: 640,
    conversions: 12,
    cpc: 5.00,
    ctr: 1.42,
    conversionRate: 1.88,
    target: 2.0,
    status: 'average'
  },
  {
    channel: 'Display Network',
    adSpend: 2800,
    revenue: 3360,
    roas: 1.20,
    roi: 20,
    impressions: 95000,
    clicks: 950,
    conversions: 8,
    cpc: 2.95,
    ctr: 1.0,
    conversionRate: 0.84,
    target: 1.5,
    status: 'poor'
  }
];

const getStatusColor = (status: string) => {
  const colors = {
    excellent: 'bg-green-100 text-green-800 border-green-200',
    good: 'bg-blue-100 text-blue-800 border-blue-200',
    average: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    poor: 'bg-red-100 text-red-800 border-red-200'
  };
  return colors[status as keyof typeof colors] || colors.average;
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'excellent':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'good':
      return <TrendingUp className="h-4 w-4 text-blue-600" />;
    case 'average':
      return <Info className="h-4 w-4 text-yellow-600" />;
    case 'poor':
      return <AlertTriangle className="h-4 w-4 text-red-600" />;
    default:
      return <Info className="h-4 w-4 text-slate-600" />;
  }
};

export default function ROASAnalysisPage() {
  const [sortBy, setSortBy] = useState<'roas' | 'revenue' | 'adSpend'>('roas');
  const [timeframe, setTimeframe] = useState('30d');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const sortedData = [...mockROASData].sort((a, b) => {
    switch (sortBy) {
      case 'roas':
        return b.roas - a.roas;
      case 'revenue':
        return b.revenue - a.revenue;
      case 'adSpend':
        return b.adSpend - a.adSpend;
      default:
        return 0;
    }
  });

  // Calculate totals
  const totalAdSpend = mockROASData.reduce((sum, item) => sum + item.adSpend, 0);
  const totalRevenue = mockROASData.reduce((sum, item) => sum + item.revenue, 0);
  const overallROAS = totalRevenue / totalAdSpend;
  const overallROI = ((totalRevenue - totalAdSpend) / totalAdSpend) * 100;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">ROAS & ROI Analysis</h1>
          <p className="text-slate-600 mt-1">Análise detalhada do retorno sobre investimento</p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-900"
          >
            <option value="7d">Últimos 7 dias</option>
            <option value="30d">Últimos 30 dias</option>
            <option value="90d">Últimos 90 dias</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-900"
          >
            <option value="roas">Ordenar por ROAS</option>
            <option value="revenue">Ordenar por Receita</option>
            <option value="adSpend">Ordenar por Investimento</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="h-8 w-8 opacity-80" />
            <ArrowUpRight className="h-5 w-5 opacity-80" />
          </div>
          <p className="text-green-100 text-sm">ROAS Geral</p>
          <p className="text-3xl font-bold">{overallROAS.toFixed(2)}x</p>
          <p className="text-green-100 text-sm mt-1">
            {overallROAS >= 3 ? 'Excelente performance' : overallROAS >= 2 ? 'Boa performance' : 'Precisa melhorar'}
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="h-8 w-8 opacity-80" />
            <TrendingUp className="h-5 w-5 opacity-80" />
          </div>
          <p className="text-blue-100 text-sm">ROI Geral</p>
          <p className="text-3xl font-bold">{overallROI.toFixed(0)}%</p>
          <p className="text-blue-100 text-sm mt-1">Lucro líquido</p>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <Target className="h-8 w-8 opacity-80" />
            <Zap className="h-5 w-5 opacity-80" />
          </div>
          <p className="text-purple-100 text-sm">Investimento Total</p>
          <p className="text-3xl font-bold">{formatCurrency(totalAdSpend).replace('R$', '').trim()}</p>
          <p className="text-purple-100 text-sm mt-1">Últimos 30 dias</p>
        </div>

        <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="h-8 w-8 opacity-80" />
            <CheckCircle className="h-5 w-5 opacity-80" />
          </div>
          <p className="text-orange-100 text-sm">Receita Total</p>
          <p className="text-3xl font-bold">{formatCurrency(totalRevenue).replace('R$', '').trim()}</p>
          <p className="text-orange-100 text-sm mt-1">Gerada pelos anúncios</p>
        </div>
      </div>

      {/* Detailed ROAS Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">Performance Detalhada por Canal</h2>
          <p className="text-slate-600 text-sm mt-1">
            Métricas completas de ROAS, ROI e performance por canal de tráfego pago
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-slate-700">Canal</th>
                <th className="text-right py-3 px-6 font-medium text-slate-700">Investimento</th>
                <th className="text-right py-3 px-6 font-medium text-slate-700">Receita</th>
                <th className="text-right py-3 px-6 font-medium text-slate-700">ROAS</th>
                <th className="text-right py-3 px-6 font-medium text-slate-700">ROI</th>
                <th className="text-right py-3 px-6 font-medium text-slate-700">CPC</th>
                <th className="text-right py-3 px-6 font-medium text-slate-700">CTR</th>
                <th className="text-right py-3 px-6 font-medium text-slate-700">Conv. Rate</th>
                <th className="text-center py-3 px-6 font-medium text-slate-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {sortedData.map((item, index) => (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-medium">
                          {item.channel.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{item.channel}</p>
                        <p className="text-xs text-slate-500">
                          Meta: {item.target.toFixed(1)}x ROAS
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6 text-right">
                    <p className="font-medium text-slate-900">
                      {formatCurrency(item.adSpend)}
                    </p>
                    <p className="text-xs text-slate-500">
                      {formatNumber(item.impressions)} impressões
                    </p>
                  </td>

                  <td className="py-4 px-6 text-right">
                    <p className="font-medium text-slate-900">
                      {formatCurrency(item.revenue)}
                    </p>
                    <p className="text-xs text-slate-500">
                      {formatNumber(item.conversions)} conversões
                    </p>
                  </td>

                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span className={`font-bold text-lg ${
                        item.roas >= item.target ? 'text-green-600' :
                        item.roas >= item.target * 0.8 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {item.roas.toFixed(2)}x
                      </span>
                      {item.roas >= item.target ? (
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1 mt-2">
                      <div
                        className={`h-1 rounded-full ${
                          item.roas >= item.target ? 'bg-green-600' :
                          item.roas >= item.target * 0.8 ? 'bg-yellow-600' : 'bg-red-600'
                        }`}
                        style={{ width: `${Math.min((item.roas / item.target) * 100, 100)}%` }}
                      />
                    </div>
                  </td>

                  <td className="py-4 px-6 text-right">
                    <span className={`font-semibold ${
                      item.roi >= 200 ? 'text-green-600' :
                      item.roi >= 100 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {item.roi}%
                    </span>
                  </td>

                  <td className="py-4 px-6 text-right font-medium text-slate-900">
                    {formatCurrency(item.cpc)}
                  </td>

                  <td className="py-4 px-6 text-right text-slate-700">
                    {formatPercentage(item.ctr)}
                  </td>

                  <td className="py-4 px-6 text-right text-slate-700">
                    {formatPercentage(item.conversionRate)}
                  </td>

                  <td className="py-4 px-6">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                      {getStatusIcon(item.status)}
                      {item.status === 'excellent' ? 'Excelente' :
                       item.status === 'good' ? 'Bom' :
                       item.status === 'average' ? 'Médio' : 'Ruim'}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            💡 Insights de Performance
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-green-800">Google Search está superando a meta</p>
                <p className="text-sm text-green-700">ROAS de 4.99x vs meta de 4.0x (+25%)</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-800">Display Network precisa de otimização</p>
                <p className="text-sm text-yellow-700">ROAS de 1.20x vs meta de 1.5x (-20%)</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <Info className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-blue-800">Oportunidade no LinkedIn</p>
                <p className="text-sm text-blue-700">Alto CPC mas conversões de qualidade</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            📊 Recomendações Estratégicas
          </h3>
          <div className="space-y-4">
            <div className="p-3 border border-slate-200 rounded-lg">
              <p className="font-medium text-slate-900 mb-1">1. Aumentar investimento no Google Search</p>
              <p className="text-sm text-slate-600">Performance excelente com ROAS de 4.99x</p>
            </div>

            <div className="p-3 border border-slate-200 rounded-lg">
              <p className="font-medium text-slate-900 mb-1">2. Otimizar campanhas do Display Network</p>
              <p className="text-sm text-slate-600">Revisar segmentação e criativos</p>
            </div>

            <div className="p-3 border border-slate-200 rounded-lg">
              <p className="font-medium text-slate-900 mb-1">3. Testar novas estratégias no YouTube</p>
              <p className="text-sm text-slate-600">Potencial para melhorar taxa de conversão</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}