/**
 * ARCO Admin Campaigns Management
 * Professional campaign management with performance tracking
 */

'use client';

import React, { useState } from 'react';
import {
  Plus,
  Target,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  MousePointer,
  Eye,
  Calendar,
  Filter,
  Search,
  MoreHorizontal,
  Play,
  Pause,
  Edit3,
  Trash2,
  BarChart3
} from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'draft' | 'completed';
  type: 'cpc' | 'cpm' | 'cpa' | 'affiliate';
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  roas: number;
  startDate: string;
  endDate: string;
  platforms: string[];
}

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Black Friday - Eletrônicos',
    status: 'active',
    type: 'cpc',
    budget: 5000,
    spent: 3200,
    impressions: 125000,
    clicks: 2400,
    conversions: 48,
    roas: 4.2,
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    platforms: ['Google Ads', 'Facebook', 'Instagram']
  },
  {
    id: '2',
    name: 'Retargeting - Carrinho Abandonado',
    status: 'active',
    type: 'cpm',
    budget: 2000,
    spent: 1850,
    impressions: 89000,
    clicks: 1200,
    conversions: 32,
    roas: 3.8,
    startDate: '2024-01-01',
    endDate: '2024-03-01',
    platforms: ['Facebook', 'Instagram']
  },
  {
    id: '3',
    name: 'Prospecção - Novos Clientes',
    status: 'paused',
    type: 'cpa',
    budget: 3500,
    spent: 1200,
    impressions: 45000,
    clicks: 800,
    conversions: 12,
    roas: 2.1,
    startDate: '2024-01-20',
    endDate: '2024-02-20',
    platforms: ['Google Ads', 'LinkedIn']
  }
];

const statusColors = {
  active: 'bg-green-100 text-green-800',
  paused: 'bg-yellow-100 text-yellow-800',
  draft: 'bg-gray-100 text-gray-800',
  completed: 'bg-blue-100 text-blue-800'
};

const statusLabels = {
  active: 'Ativa',
  paused: 'Pausada',
  draft: 'Rascunho',
  completed: 'Finalizada'
};

export default function CampaignsPage() {
  const [campaigns] = useState<Campaign[]>(mockCampaigns);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || campaign.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Calculate summary metrics
  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
  const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0);
  const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);
  const avgRoas = campaigns.reduce((sum, c) => sum + c.roas, 0) / campaigns.length;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Campanhas</h1>
          <p className="text-slate-600 mt-1">Gerencie suas campanhas de marketing</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nova Campanha
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Orçamento Total</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {formatCurrency(totalBudget)}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Gasto Total</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {formatCurrency(totalSpent)}
              </p>
              <p className="text-sm text-slate-500 mt-1">
                {((totalSpent / totalBudget) * 100).toFixed(1)}% do orçamento
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Conversões</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {formatNumber(totalConversions)}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Target className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">ROAS Médio</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {avgRoas.toFixed(1)}x
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar campanhas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-900"
          >
            <option value="all">Todos os status</option>
            <option value="active">Ativas</option>
            <option value="paused">Pausadas</option>
            <option value="draft">Rascunhos</option>
            <option value="completed">Finalizadas</option>
          </select>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-slate-700">Campanha</th>
                <th className="text-left py-3 px-6 font-medium text-slate-700">Status</th>
                <th className="text-left py-3 px-6 font-medium text-slate-700">Orçamento</th>
                <th className="text-left py-3 px-6 font-medium text-slate-700">Performance</th>
                <th className="text-left py-3 px-6 font-medium text-slate-700">ROAS</th>
                <th className="text-left py-3 px-6 font-medium text-slate-700">Período</th>
                <th className="text-left py-3 px-6 font-medium text-slate-700">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-slate-50">
                  <td className="py-4 px-6">
                    <div>
                      <h3 className="font-semibold text-slate-900">{campaign.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                          {campaign.type.toUpperCase()}
                        </span>
                        <div className="flex gap-1">
                          {campaign.platforms.map((platform, index) => (
                            <span key={index} className="text-xs text-slate-500">
                              {platform}{index < campaign.platforms.length - 1 && ','}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[campaign.status]}`}>
                      {statusLabels[campaign.status]}
                    </span>
                  </td>

                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-slate-900">
                        {formatCurrency(campaign.spent)} / {formatCurrency(campaign.budget)}
                      </p>
                      <div className="w-full bg-slate-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${Math.min((campaign.spent / campaign.budget) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Eye className="h-4 w-4 text-slate-400" />
                        <span>{formatNumber(campaign.impressions)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MousePointer className="h-4 w-4 text-slate-400" />
                        <span>{formatNumber(campaign.clicks)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Target className="h-4 w-4 text-slate-400" />
                        <span>{campaign.conversions} conversões</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold ${campaign.roas >= 3 ? 'text-green-600' : campaign.roas >= 2 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {campaign.roas.toFixed(1)}x
                      </span>
                      {campaign.roas >= 3 ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <div className="text-sm text-slate-600">
                      <p>{new Date(campaign.startDate).toLocaleDateString('pt-BR')}</p>
                      <p>até {new Date(campaign.endDate).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {campaign.status === 'active' ? (
                        <button className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg" title="Pausar campanha">
                          <Pause className="h-4 w-4" />
                        </button>
                      ) : (
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg" title="Ativar campanha">
                          <Play className="h-4 w-4" />
                        </button>
                      )}

                      <button className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg" title="Editar campanha">
                        <Edit3 className="h-4 w-4" />
                      </button>

                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="Excluir campanha">
                        <Trash2 className="h-4 w-4" />
                      </button>

                      <button className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg" title="Mais opções">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12">
            <Target className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Nenhuma campanha encontrada
            </h3>
            <p className="text-slate-600">
              {campaigns.length === 0
                ? 'Crie sua primeira campanha para começar.'
                : 'Tente ajustar os filtros de busca.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}