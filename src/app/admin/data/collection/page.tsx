/**
 * ARCO Admin Data Collection Management
 * Ethical data collection and LGPD compliance dashboard
 */

'use client';

import React, { useState } from 'react';
import {
  Database,
  Shield,
  Eye,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info,
  Settings,
  Download,
  Trash2,
  Filter,
  Search,
  Cookie,
  Fingerprint,
  Globe,
  MousePointer
} from 'lucide-react';

interface DataPoint {
  id: string;
  type: 'pageview' | 'click' | 'conversion' | 'session' | 'user_info';
  timestamp: Date;
  userId?: string;
  sessionId: string;
  data: any;
  consentLevel: 'essential' | 'functional' | 'analytics' | 'marketing';
  ipAddress: string;
  userAgent: string;
  gdprCompliant: boolean;
  anonymized: boolean;
}

interface ConsentStats {
  total: number;
  essential: number;
  functional: number;
  analytics: number;
  marketing: number;
  optOut: number;
}

const mockDataPoints: DataPoint[] = [
  {
    id: '1',
    type: 'pageview',
    timestamp: new Date('2024-01-15T10:30:00'),
    userId: 'user-123',
    sessionId: 'session-abc',
    data: { page: '/admin/products', referrer: 'google.com' },
    consentLevel: 'analytics',
    ipAddress: '192.168.1.***',
    userAgent: 'Mozilla/5.0...',
    gdprCompliant: true,
    anonymized: true
  },
  {
    id: '2',
    type: 'click',
    timestamp: new Date('2024-01-15T10:31:00'),
    sessionId: 'session-abc',
    data: { element: 'product-link', productId: 'prod-456' },
    consentLevel: 'functional',
    ipAddress: '192.168.1.***',
    userAgent: 'Mozilla/5.0...',
    gdprCompliant: true,
    anonymized: true
  },
  {
    id: '3',
    type: 'conversion',
    timestamp: new Date('2024-01-15T10:35:00'),
    userId: 'user-123',
    sessionId: 'session-abc',
    data: { type: 'affiliate_click', revenue: 25.99 },
    consentLevel: 'marketing',
    ipAddress: '192.168.1.***',
    userAgent: 'Mozilla/5.0...',
    gdprCompliant: true,
    anonymized: true
  }
];

const mockConsentStats: ConsentStats = {
  total: 1547,
  essential: 1547,
  functional: 1203,
  analytics: 892,
  marketing: 634,
  optOut: 344
};

const typeIcons = {
  pageview: Eye,
  click: MousePointer,
  conversion: CheckCircle,
  session: Clock,
  user_info: Users
};

const consentColors = {
  essential: 'bg-blue-100 text-blue-800',
  functional: 'bg-green-100 text-green-800',
  analytics: 'bg-yellow-100 text-yellow-800',
  marketing: 'bg-purple-100 text-purple-800'
};

export default function DataCollectionPage() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedConsent, setSelectedConsent] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('7d');

  const filteredData = mockDataPoints.filter(item => {
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesConsent = selectedConsent === 'all' || item.consentLevel === selectedConsent;
    const matchesSearch = searchTerm === '' ||
      item.id.includes(searchTerm) ||
      JSON.stringify(item.data).toLowerCase().includes(searchTerm.toLowerCase());

    return matchesType && matchesConsent && matchesSearch;
  });

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Coleta de Dados</h1>
          <p className="text-slate-600 mt-1">Gestão ética e compliance LGPD</p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-900"
          >
            <option value="24h">Últimas 24h</option>
            <option value="7d">Últimos 7 dias</option>
            <option value="30d">Últimos 30 dias</option>
          </select>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </button>
        </div>
      </div>

      {/* Consent Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <Users className="h-8 w-8 text-slate-600" />
            <div className="text-right">
              <p className="text-2xl font-bold text-slate-900">{mockConsentStats.total}</p>
              <p className="text-sm text-slate-600">Total de Usuários</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-900">{mockConsentStats.essential}</p>
              <p className="text-sm text-blue-700">Essenciais</p>
            </div>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: '100%' }}
            />
          </div>
        </div>

        <div className="bg-green-50 rounded-lg border border-green-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <Settings className="h-8 w-8 text-green-600" />
            <div className="text-right">
              <p className="text-2xl font-bold text-green-900">{mockConsentStats.functional}</p>
              <p className="text-sm text-green-700">Funcionais</p>
            </div>
          </div>
          <div className="w-full bg-green-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full"
              style={{ width: `${(mockConsentStats.functional / mockConsentStats.total) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <Eye className="h-8 w-8 text-yellow-600" />
            <div className="text-right">
              <p className="text-2xl font-bold text-yellow-900">{mockConsentStats.analytics}</p>
              <p className="text-sm text-yellow-700">Analytics</p>
            </div>
          </div>
          <div className="w-full bg-yellow-200 rounded-full h-2">
            <div
              className="bg-yellow-600 h-2 rounded-full"
              style={{ width: `${(mockConsentStats.analytics / mockConsentStats.total) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg border border-purple-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <Globe className="h-8 w-8 text-purple-600" />
            <div className="text-right">
              <p className="text-2xl font-bold text-purple-900">{mockConsentStats.marketing}</p>
              <p className="text-sm text-purple-700">Marketing</p>
            </div>
          </div>
          <div className="w-full bg-purple-200 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full"
              style={{ width: `${(mockConsentStats.marketing / mockConsentStats.total) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* LGPD Compliance Status */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Status de Compliance LGPD</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
            <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
            <div>
              <h3 className="font-semibold text-green-800">Consentimento Ativo</h3>
              <p className="text-sm text-green-700 mt-1">
                {((mockConsentStats.total - mockConsentStats.optOut) / mockConsentStats.total * 100).toFixed(1)}% dos usuários consentiram com coleta
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
            <Shield className="h-6 w-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-800">Dados Anonimizados</h3>
              <p className="text-sm text-blue-700 mt-1">
                100% dos dados pessoais foram anonimizados adequadamente
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
            <Cookie className="h-6 w-6 text-yellow-600 mt-1" />
            <div>
              <h3 className="font-semibold text-yellow-800">Cookies Essenciais</h3>
              <p className="text-sm text-yellow-700 mt-1">
                Apenas cookies necessários para funcionamento básico
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Collection Filters */}
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar dados..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-900"
          >
            <option value="all">Todos os tipos</option>
            <option value="pageview">Visualizações</option>
            <option value="click">Cliques</option>
            <option value="conversion">Conversões</option>
            <option value="session">Sessões</option>
          </select>

          <select
            value={selectedConsent}
            onChange={(e) => setSelectedConsent(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-900"
          >
            <option value="all">Todos os consentimentos</option>
            <option value="essential">Essenciais</option>
            <option value="functional">Funcionais</option>
            <option value="analytics">Analytics</option>
            <option value="marketing">Marketing</option>
          </select>

          <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtros Avançados
          </button>
        </div>
      </div>

      {/* Data Points Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">Pontos de Dados Coletados</h2>
          <p className="text-slate-600 text-sm mt-1">
            Visualização detalhada de todos os dados coletados com compliance LGPD
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-slate-700">Tipo</th>
                <th className="text-left py-3 px-6 font-medium text-slate-700">Data/Hora</th>
                <th className="text-left py-3 px-6 font-medium text-slate-700">Dados</th>
                <th className="text-left py-3 px-6 font-medium text-slate-700">Consentimento</th>
                <th className="text-left py-3 px-6 font-medium text-slate-700">IP</th>
                <th className="text-center py-3 px-6 font-medium text-slate-700">LGPD</th>
                <th className="text-center py-3 px-6 font-medium text-slate-700">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredData.map((item) => {
                const TypeIcon = typeIcons[item.type];
                return (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <TypeIcon className="h-5 w-5 text-slate-500" />
                        <span className="font-medium text-slate-900 capitalize">
                          {item.type.replace('_', ' ')}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-slate-700">
                      {formatDateTime(item.timestamp)}
                    </td>

                    <td className="py-4 px-6">
                      <div className="max-w-xs">
                        <code className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-800">
                          {JSON.stringify(item.data).substring(0, 50)}...
                        </code>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${consentColors[item.consentLevel]}`}>
                        {item.consentLevel}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-slate-700 font-mono text-sm">
                      {item.ipAddress}
                    </td>

                    <td className="py-4 px-6 text-center">
                      {item.gdprCompliant ? (
                        <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-red-600 mx-auto" />
                      )}
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg" title="Ver detalhes">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="Excluir">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <Database className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Nenhum dado encontrado
            </h3>
            <p className="text-slate-600">
              Ajuste os filtros para visualizar diferentes tipos de dados coletados.
            </p>
          </div>
        )}
      </div>

      {/* Data Retention Policy */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <Info className="h-6 w-6 text-yellow-600 mt-1" />
          <div>
            <h3 className="font-semibold text-yellow-800 mb-2">Política de Retenção de Dados</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Dados essenciais: Mantidos enquanto necessário para funcionamento</li>
              <li>• Dados funcionais: 2 anos após último acesso</li>
              <li>• Dados de analytics: 1 ano para análise de performance</li>
              <li>• Dados de marketing: 6 meses ou até revogação do consentimento</li>
              <li>• IPs e identificadores: Anonimizados após 30 dias</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}