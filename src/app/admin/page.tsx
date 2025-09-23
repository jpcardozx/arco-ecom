'use client';

/**
 * ARCO Admin Dashboard - Modern Overview Interface
 * Clean, professional dashboard with key metrics and quick actions
 */

import React from 'react';
import Link from 'next/link';
import {
  Package,
  TrendingUp,
  Link as LinkIcon,
  Settings,
  BarChart3,
  Target,
  Plus
} from 'lucide-react';

interface DashboardStats {
  title: string;
  value: string;
  change: number;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
}

interface RecentActivity {
  id: string;
  type: 'product_added' | 'campaign_created' | 'insight_generated';
  title: string;
  description: string;
  timestamp: Date;
}

const quickActions = [
  {
    title: 'Adicionar Produto',
    description: 'Cole um link de afiliado para extrair automaticamente',
    href: '/admin/links',
    icon: Plus,
    color: 'bg-blue-600 hover:bg-blue-700'
  },
  {
    title: 'Gerenciar Produtos',
    description: 'Visualizar, editar e organizar produtos',
    href: '/admin/products',
    icon: Package,
    color: 'bg-green-600 hover:bg-green-700'
  },
  {
    title: 'Analytics',
    description: 'Visualizar estatísticas e performance',
    href: '/admin/analytics',
    icon: BarChart3,
    color: 'bg-purple-600 hover:bg-purple-700'
  },
  {
    title: 'Configurações',
    description: 'Gerenciar configurações do sistema',
    href: '/admin/settings',
    icon: Settings,
    color: 'bg-slate-600 hover:bg-slate-700'
  }
];

export default function AdminPage() {
  // Dashboard statistics
  const stats: DashboardStats[] = [
    {
      title: 'Total de Produtos',
      value: '2,847',
      change: 12.5,
      icon: Package,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Links Ativos',
      value: '1,203',
      change: 8.3,
      icon: Link,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Conversões Hoje',
      value: '89',
      change: -2.4,
      icon: Target,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Revenue Total',
      value: 'R$ 45.2k',
      change: 15.2,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-1">Visão geral do seu sistema de afiliados</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className={`${stat.bgColor} rounded-lg p-6 border border-slate-200`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                  <p className={`text-sm ${stat.color} mt-1`}>
                    {stat.change > 0 ? '+' : ''}{stat.change}% desde o último mês
                  </p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                href={action.href}
                className="block p-6 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
              >
                <div className="space-y-3">
                  <div className={`${action.color} text-white p-3 rounded-lg w-fit`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{action.title}</h3>
                    <p className="text-sm text-slate-600 mt-1">{action.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Atividade Recente</h2>
        <div className="text-center py-8">
          <Package className="h-12 w-12 text-slate-400 mx-auto mb-3" />
          <p className="text-slate-600">Nenhuma atividade recente</p>
          <p className="text-sm text-slate-500 mt-1">Comece adicionando alguns produtos</p>
        </div>
      </div>
    </div>
  );
}