/**
 * ARCO Affiliate Dashboard Component
 * Professional dashboard for affiliate link management
 */

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/design-system/primitives/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/design-system/primitives/card';
import { Badge } from '@/components/design-system/primitives/badge';
import { Input } from '@/components/design-system/primitives/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/design-system/primitives/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/design-system/primitives/tabs';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Link,
  Copy,
  ExternalLink,
  Edit,
  Trash2,
  Plus,
  BarChart3,
  Eye,
  MousePointerClick
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AffiliateLink {
  id: string;
  productName: string;
  originalUrl: string;
  shortUrl: string;
  platform: 'amazon' | 'magalu' | 'shopee' | 'mercadolivre';
  commission: string;
  clicks: number;
  conversions: number;
  revenue: number;
  createdAt: string;
  status: 'active' | 'paused' | 'expired';
}

interface DashboardStats {
  totalClicks: number;
  totalConversions: number;
  totalRevenue: number;
  conversionRate: number;
  topPerformer: string;
}

const mockAffiliateLinks: AffiliateLink[] = [
  {
    id: 'link-001',
    productName: 'Samsung Galaxy S24 Ultra',
    originalUrl: 'https://amazon.com.br/samsung-galaxy-s24-ultra...',
    shortUrl: 'arco.link/samsung-s24',
    platform: 'amazon',
    commission: '8.5%',
    clicks: 1247,
    conversions: 89,
    revenue: 2847.50,
    createdAt: '2024-01-15',
    status: 'active'
  },
  {
    id: 'link-002',
    productName: 'Notebook ASUS ROG Strix',
    originalUrl: 'https://magazineluiza.com.br/notebook-asus-rog...',
    shortUrl: 'arco.link/asus-rog',
    platform: 'magalu',
    commission: '6.2%',
    clicks: 892,
    conversions: 34,
    revenue: 1456.80,
    createdAt: '2024-01-10',
    status: 'active'
  },
  {
    id: 'link-003',
    productName: 'Smart TV LG OLED 65"',
    originalUrl: 'https://shopee.com.br/smart-tv-lg-oled...',
    shortUrl: 'arco.link/lg-oled',
    platform: 'shopee',
    commission: '5.8%',
    clicks: 634,
    conversions: 28,
    revenue: 987.40,
    createdAt: '2024-01-08',
    status: 'paused'
  },
  {
    id: 'link-004',
    productName: 'AirPods Pro 3ª Geração',
    originalUrl: 'https://amazon.com.br/airpods-pro-3-geracao...',
    shortUrl: 'arco.link/airpods-pro',
    platform: 'amazon',
    commission: '4.5%',
    clicks: 1456,
    conversions: 112,
    revenue: 1834.60,
    createdAt: '2024-01-05',
    status: 'active'
  }
];

const dashboardStats: DashboardStats = {
  totalClicks: 4229,
  totalConversions: 263,
  totalRevenue: 7126.30,
  conversionRate: 6.22,
  topPerformer: 'Samsung Galaxy S24 Ultra'
};

interface AffiliateDashboardProps {
  className?: string;
}

export function AffiliateDashboard({ className }: AffiliateDashboardProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLinks = mockAffiliateLinks.filter(link => {
    const platformMatch = selectedPlatform === 'all' || link.platform === selectedPlatform;
    const searchMatch = link.productName.toLowerCase().includes(searchTerm.toLowerCase());
    return platformMatch && searchMatch;
  });

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'amazon': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'magalu': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shopee': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'mercadolivre': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'expired': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <div className={cn("space-y-8", className)}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard de Afiliados</h1>
          <p className="text-lg text-gray-600">
            Gerencie seus links e acompanhe performance
          </p>
        </div>
        <Button className="lg:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Novo Link
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Clicks</CardTitle>
            <MousePointerClick className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.totalClicks.toLocaleString()}</div>
            <p className="text-xs text-gray-600">
              +12.5% desde o mês passado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversões</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.totalConversions}</div>
            <p className="text-xs text-gray-600">
              Taxa: {dashboardStats.conversionRate}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {dashboardStats.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-gray-600">
              +18.2% desde o mês passado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performer</CardTitle>
            <BarChart3 className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium line-clamp-2">{dashboardStats.topPerformer}</div>
            <p className="text-xs text-gray-600">
              Melhor conversão
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="links" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="links">Meus Links</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="links" className="space-y-6">
          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedPlatform === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPlatform('all')}
              >
                Todos
              </Button>
              <Button
                variant={selectedPlatform === 'amazon' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPlatform('amazon')}
              >
                Amazon
              </Button>
              <Button
                variant={selectedPlatform === 'magalu' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPlatform('magalu')}
              >
                Magalu
              </Button>
              <Button
                variant={selectedPlatform === 'shopee' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPlatform('shopee')}
              >
                Shopee
              </Button>
            </div>
          </div>

          {/* Links Table */}
          <Card>
            <CardHeader>
              <CardTitle>Links de Afiliados</CardTitle>
              <CardDescription>
                Gerencie e monitore seus links de afiliados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead>Plataforma</TableHead>
                    <TableHead>Link Curto</TableHead>
                    <TableHead>Clicks</TableHead>
                    <TableHead>Conversões</TableHead>
                    <TableHead>Receita</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLinks.map((link) => (
                    <TableRow key={link.id}>
                      <TableCell>
                        <div className="font-medium">{link.productName}</div>
                        <div className="text-sm text-gray-600">
                          Comissão: {link.commission}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn("text-xs", getPlatformColor(link.platform))}>
                          {link.platform.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                            {link.shortUrl}
                          </code>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(link.shortUrl)}
                            className="h-6 w-6 p-0"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4 text-gray-500" />
                          {link.clicks.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{link.conversions}</div>
                        <div className="text-sm text-gray-600">
                          {((link.conversions / link.clicks) * 100).toFixed(1)}%
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-green-600">
                          R$ {link.revenue.toFixed(2)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn("text-xs", getStatusColor(link.status))}>
                          {link.status.charAt(0).toUpperCase() + link.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-6 w-6 p-0"
                            asChild
                          >
                            <a href={link.originalUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Analytics em Desenvolvimento</CardTitle>
              <CardDescription>
                Gráficos e relatórios detalhados serão implementados em breve
              </CardDescription>
            </CardHeader>
            <CardContent className="h-64 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Dashboard de analytics em construção</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configurações</CardTitle>
              <CardDescription>
                Configure suas preferências e integrações
              </CardDescription>
            </CardHeader>
            <CardContent className="h-64 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Painel de configurações em desenvolvimento</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}