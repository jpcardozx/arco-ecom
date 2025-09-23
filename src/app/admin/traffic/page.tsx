/**
 * ARCO Admin Traffic Overview
 * Comprehensive traffic analytics and performance monitoring
 */

'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Users,
  MousePointer,
  Eye,
  DollarSign,
  Target,
  BarChart3,
  Calendar,
  Filter,
  RefreshCw,
  Download,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface TrafficMetric {
  label: string;
  value: string;
  change: number;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface ChannelPerformance {
  channel: string;
  sessions: number;
  users: number;
  conversions: number;
  revenue: number;
  cpc: number;
  roas: number;
  trend: 'up' | 'down' | 'stable';
}

const mockMetrics: TrafficMetric[] = [
  {
    label: 'Sessões Totais',
    value: '24.5K',
    change: 12.5,
    changeType: 'positive',
    icon: Users,
    color: 'blue'
  },
  {
    label: 'Usuários Únicos',
    value: '18.2K',
    change: 8.3,
    changeType: 'positive',
    icon: Eye,
    color: 'green'
  },
  {
    label: 'Taxa de Conversão',
    value: '3.2%',
    change: -0.8,
    changeType: 'negative',
    icon: Target,
    color: 'purple'
  },
  {
    label: 'Receita',
    value: 'R$ 45.2K',
    change: 15.7,
    changeType: 'positive',
    icon: DollarSign,
    color: 'emerald'
  },
  {
    label: 'CPC Médio',
    value: 'R$ 1.85',
    change: -5.2,
    changeType: 'positive',
    icon: MousePointer,
    color: 'orange'
  },
  {
    label: 'ROAS Médio',
    value: '4.2x',
    change: 18.9,
    changeType: 'positive',
    icon: TrendingUp,
    color: 'indigo'
  }
];

const mockChannels: ChannelPerformance[] = [
  {
    channel: 'Google Ads',
    sessions: 8500,
    users: 6200,
    conversions: 185,
    revenue: 18500,
    cpc: 1.95,
    roas: 4.8,
    trend: 'up'
  },
  {
    channel: 'Facebook Ads',
    sessions: 6200,
    users: 4800,
    conversions: 142,
    revenue: 14200,
    cpc: 1.65,
    roas: 3.9,
    trend: 'up'
  },
  {
    channel: 'Instagram Ads',
    sessions: 4100,
    users: 3400,
    conversions: 89,
    revenue: 8900,
    cpc: 1.45,
    roas: 3.2,
    trend: 'stable'
  },
  {
    channel: 'LinkedIn Ads',
    sessions: 1200,
    users: 950,
    conversions: 24,
    revenue: 2400,
    cpc: 3.20,
    roas: 2.1,
    trend: 'down'
  },
  {
    channel: 'YouTube Ads',
    sessions: 2800,
    users: 2200,
    conversions: 45,
    revenue: 4500,
    cpc: 0.85,
    roas: 2.8,
    trend: 'up'
  }
];

export default function TrafficOverviewPage() {
  const [dateRange, setDateRange] = useState('7d');
  const [selectedChannel, setSelectedChannel] = useState('all');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  const getMetricColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      emerald: 'bg-emerald-100 text-emerald-600',
      orange: 'bg-orange-100 text-orange-600',
      indigo: 'bg-indigo-100 text-indigo-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <ArrowUpRight className="h-4 w-4 text-green-600" />;
      case 'down':
        return <ArrowDownRight className="h-4 w-4 text-red-600" />;
      default:
        return <div className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Tráfego Pago</h1>
          <p className="text-slate-600 mt-1">Visão geral de performance dos canais pagos</p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-900"
          >
            <option value="7d">Últimos 7 dias</option>
            <option value="30d">Últimos 30 dias</option>
            <option value="90d">Últimos 90 dias</option>
            <option value="custom">Período customizado</option>
          </select>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </button>

          <button className="border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {mockMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-lg border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getMetricColor(metric.color)}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  metric.changeType === 'positive' ? 'text-green-600' :
                  metric.changeType === 'negative' ? 'text-red-600' : 'text-slate-600'
                }`}>
                  {metric.changeType === 'positive' ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : metric.changeType === 'negative' ? (
                    <TrendingDown className="h-4 w-4" />
                  ) : null}
                  {Math.abs(metric.change)}%
                </div>
              </div>

              <div>
                <p className="text-2xl font-bold text-slate-900 mb-1">
                  {metric.value}
                </p>
                <p className="text-sm text-slate-600">
                  {metric.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Channel Performance */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Performance por Canal</h2>
            <div className="flex items-center gap-3">
              <select
                value={selectedChannel}
                onChange={(e) => setSelectedChannel(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 text-sm"
              >
                <option value="all">Todos os canais</option>
                <option value="google">Google Ads</option>
                <option value="facebook">Facebook Ads</option>
                <option value="instagram">Instagram Ads</option>
                <option value="linkedin">LinkedIn Ads</option>
                <option value="youtube">YouTube Ads</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-slate-700">Canal</th>
                <th className="text-right py-3 px-6 font-medium text-slate-700">Sessões</th>
                <th className="text-right py-3 px-6 font-medium text-slate-700">Usuários</th>
                <th className="text-right py-3 px-6 font-medium text-slate-700">Conversões</th>
                <th className="text-right py-3 px-6 font-medium text-slate-700">Receita</th>
                <th className="text-right py-3 px-6 font-medium text-slate-700">CPC</th>
                <th className="text-right py-3 px-6 font-medium text-slate-700">ROAS</th>
                <th className="text-center py-3 px-6 font-medium text-slate-700">Tendência</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {mockChannels.map((channel, index) => (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {channel.channel.charAt(0)}
                        </span>
                      </div>
                      <span className="font-medium text-slate-900">{channel.channel}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right font-medium text-slate-900">
                    {formatNumber(channel.sessions)}
                  </td>
                  <td className="py-4 px-6 text-right text-slate-700">
                    {formatNumber(channel.users)}
                  </td>
                  <td className="py-4 px-6 text-right text-slate-700">
                    {formatNumber(channel.conversions)}
                  </td>
                  <td className="py-4 px-6 text-right font-medium text-slate-900">
                    {formatCurrency(channel.revenue)}
                  </td>
                  <td className="py-4 px-6 text-right text-slate-700">
                    {formatCurrency(channel.cpc)}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className={`font-semibold ${
                      channel.roas >= 4 ? 'text-green-600' :
                      channel.roas >= 3 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {channel.roas.toFixed(1)}x
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    {getTrendIcon(channel.trend)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">ROAS Detalhado</h3>
            <BarChart3 className="h-6 w-6 opacity-80" />
          </div>
          <p className="text-blue-100 text-sm mb-4">
            Análise aprofundada do retorno sobre investimento por canal e campanha.
          </p>
          <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Ver ROAS Detalhado
          </button>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">CPC & CPM</h3>
            <MousePointer className="h-6 w-6 opacity-80" />
          </div>
          <p className="text-green-100 text-sm mb-4">
            Monitore custos por clique e impressão para otimizar investimentos.
          </p>
          <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Analisar Custos
          </button>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Conversões</h3>
            <Target className="h-6 w-6 opacity-80" />
          </div>
          <p className="text-purple-100 text-sm mb-4">
            Funil completo de conversões e oportunidades de otimização.
          </p>
          <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Ver Conversões
          </button>
        </div>
      </div>
    </div>
  );
}