'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  TrendingUp,
  DollarSign,
  Users,
  Eye,
  MousePointer,
  ShoppingCart,
  Calendar,
  Link,
  Copy,
  ExternalLink
} from 'lucide-react';

const stats = [
  { label: 'Comissões do Mês', value: 'R$ 2.847', change: '+23%', icon: DollarSign },
  { label: 'Cliques Totais', value: '12.486', change: '+15%', icon: MousePointer },
  { label: 'Conversões', value: '89', change: '+8%', icon: ShoppingCart },
  { label: 'Taxa de Conversão', value: '7.1%', change: '+2.3%', icon: TrendingUp },
];

const recentSales = [
  { product: 'Curso Marketing Digital', commission: 'R$ 127,50', date: '2h', status: 'approved' },
  { product: 'E-book Growth Hacking', commission: 'R$ 45,00', date: '4h', status: 'pending' },
  { product: 'Consultoria 1:1', commission: 'R$ 380,00', date: '1d', status: 'approved' },
  { product: 'Template Landing Page', commission: 'R$ 89,90', date: '2d', status: 'approved' },
];

const topProducts = [
  { name: 'Curso Marketing Digital', clicks: 2840, conversions: 34, rate: '1.2%', commission: 'R$ 637,50' },
  { name: 'E-book Growth Hacking', clicks: 1920, conversions: 28, rate: '1.5%', commission: 'R$ 315,00' },
  { name: 'Consultoria 1:1', clicks: 980, conversions: 12, rate: '1.2%', commission: 'R$ 1.140,00' },
];

export default function AffiliateDashboardPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Dashboard Afiliado</h1>
            <p className="text-muted-foreground mt-1">Acompanhe sua performance e ganhos</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Este Mês
            </Button>
            <Button>
              <Link className="w-4 h-4 mr-2" />
              Gerar Links
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <stat.icon className="w-5 h-5 text-primary" />
                  <Badge variant="secondary" className="text-xs">
                    {stat.change}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="performance" className="space-y-4">
              <TabsList>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="products">Produtos</TabsTrigger>
                <TabsTrigger value="links">Links</TabsTrigger>
              </TabsList>

              <TabsContent value="performance" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Vendas Recentes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Produto</TableHead>
                          <TableHead>Comissão</TableHead>
                          <TableHead>Tempo</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentSales.map((sale, i) => (
                          <TableRow key={i}>
                            <TableCell className="font-medium">{sale.product}</TableCell>
                            <TableCell className="text-primary font-semibold">{sale.commission}</TableCell>
                            <TableCell className="text-muted-foreground">{sale.date}</TableCell>
                            <TableCell>
                              <Badge variant={sale.status === 'approved' ? 'default' : 'secondary'}>
                                {sale.status === 'approved' ? 'Aprovado' : 'Pendente'}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="products" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Produtos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Produto</TableHead>
                          <TableHead>Cliques</TableHead>
                          <TableHead>Conversões</TableHead>
                          <TableHead>Taxa</TableHead>
                          <TableHead>Comissão</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {topProducts.map((product, i) => (
                          <TableRow key={i}>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>{product.clicks.toLocaleString()}</TableCell>
                            <TableCell>{product.conversions}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{product.rate}</Badge>
                            </TableCell>
                            <TableCell className="font-semibold text-primary">
                              {product.commission}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="links" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Links Ativos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {['Curso Marketing Digital', 'E-book Growth Hacking', 'Consultoria 1:1'].map((product, i) => (
                      <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">{product}</p>
                          <p className="text-sm text-muted-foreground">
                            arco.com/aff/ABC123/{product.toLowerCase().replace(/\s+/g, '-')}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Goals */}
            <Card>
              <CardHeader>
                <CardTitle>Meta do Mês</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Comissões</span>
                    <span>R$ 2.847 / R$ 4.000</span>
                  </div>
                  <Progress value={71} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Conversões</span>
                    <span>89 / 120</span>
                  </div>
                  <Progress value={74} />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start">
                  <Link className="w-4 h-4 mr-2" />
                  Gerar Link
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Eye className="w-4 h-4 mr-2" />
                  Ver Materiais
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Sacar Comissões
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}