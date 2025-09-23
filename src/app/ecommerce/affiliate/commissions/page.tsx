'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import {
  DollarSign,
  TrendingUp,
  Calendar,
  Download,
  Eye,
  CreditCard,
  Clock,
  CheckCircle,
  AlertCircle,
  Filter,
  Search
} from 'lucide-react';

const commissionStats = [
  { label: 'Total Acumulado', value: 'R$ 12.847,50', change: '+18%', icon: DollarSign },
  { label: 'Disponível p/ Saque', value: 'R$ 2.847,50', change: '+23%', icon: CreditCard },
  { label: 'Pendente Aprovação', value: 'R$ 890,00', change: '+12%', icon: Clock },
  { label: 'Este Mês', value: 'R$ 3.247,50', change: '+15%', icon: TrendingUp },
];

const commissionHistory = [
  {
    id: 1,
    date: '23/03/2024',
    product: 'Curso Marketing Digital',
    customer: 'João Silva',
    orderValue: 'R$ 497,00',
    commission: 'R$ 248,50',
    rate: '50%',
    status: 'approved',
    payoutDate: '30/03/2024'
  },
  {
    id: 2,
    date: '22/03/2024',
    product: 'E-book Growth Hacking',
    customer: 'Maria Santos',
    orderValue: 'R$ 97,00',
    commission: 'R$ 43,65',
    rate: '45%',
    status: 'pending',
    payoutDate: null
  },
  {
    id: 3,
    date: '21/03/2024',
    product: 'Consultoria 1:1',
    customer: 'Pedro Costa',
    orderValue: 'R$ 1.997,00',
    commission: 'R$ 599,10',
    rate: '30%',
    status: 'approved',
    payoutDate: '28/03/2024'
  },
];

const payoutHistory = [
  {
    id: 1,
    date: '01/03/2024',
    amount: 'R$ 1.847,50',
    method: 'PIX',
    status: 'completed',
    transactionId: 'TXN123456789'
  },
  {
    id: 2,
    date: '01/02/2024',
    amount: 'R$ 2.247,90',
    method: 'Transferência',
    status: 'completed',
    transactionId: 'TXN123456788'
  },
  {
    id: 3,
    date: '15/03/2024',
    amount: 'R$ 890,00',
    method: 'PIX',
    status: 'processing',
    transactionId: 'TXN123456790'
  },
];

const monthlyEarnings = [
  { month: 'Jan', earnings: 1847 },
  { month: 'Fev', earnings: 2248 },
  { month: 'Mar', earnings: 3248 },
];

export default function CommissionsPage() {
  const [dateRange, setDateRange] = useState('this-month');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Aprovado</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pendente</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejeitado</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Pago</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800">Processando</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Comissões & Pagamentos</h1>
            <p className="text-muted-foreground mt-1">Acompanhe suas comissões e histórico de pagamentos</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button>
              <CreditCard className="w-4 h-4 mr-2" />
              Solicitar Saque
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {commissionStats.map((stat) => (
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
            <Tabs defaultValue="commissions" className="space-y-4">
              <TabsList>
                <TabsTrigger value="commissions">Comissões</TabsTrigger>
                <TabsTrigger value="payouts">Pagamentos</TabsTrigger>
                <TabsTrigger value="analytics">Análise</TabsTrigger>
              </TabsList>

              <TabsContent value="commissions" className="space-y-4">
                {/* Filters */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input placeholder="Buscar por produto ou cliente..." />
                  </div>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="this-month">Este Mês</SelectItem>
                      <SelectItem value="last-month">Mês Passado</SelectItem>
                      <SelectItem value="last-3-months">Últimos 3 Meses</SelectItem>
                      <SelectItem value="all-time">Todo Período</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="approved">Aprovados</SelectItem>
                      <SelectItem value="pending">Pendentes</SelectItem>
                      <SelectItem value="rejected">Rejeitados</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Histórico de Comissões</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Data</TableHead>
                          <TableHead>Produto</TableHead>
                          <TableHead>Cliente</TableHead>
                          <TableHead>Valor Pedido</TableHead>
                          <TableHead>Comissão</TableHead>
                          <TableHead>Taxa</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Pagamento</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {commissionHistory.map((commission) => (
                          <TableRow key={commission.id}>
                            <TableCell className="font-medium">{commission.date}</TableCell>
                            <TableCell>{commission.product}</TableCell>
                            <TableCell>{commission.customer}</TableCell>
                            <TableCell>{commission.orderValue}</TableCell>
                            <TableCell className="font-semibold text-primary">
                              {commission.commission}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{commission.rate}</Badge>
                            </TableCell>
                            <TableCell>{getStatusBadge(commission.status)}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {commission.payoutDate || 'Pendente'}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payouts" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Histórico de Pagamentos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Data</TableHead>
                          <TableHead>Valor</TableHead>
                          <TableHead>Método</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>ID Transação</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {payoutHistory.map((payout) => (
                          <TableRow key={payout.id}>
                            <TableCell className="font-medium">{payout.date}</TableCell>
                            <TableCell className="font-semibold text-primary">
                              {payout.amount}
                            </TableCell>
                            <TableCell>{payout.method}</TableCell>
                            <TableCell>{getStatusBadge(payout.status)}</TableCell>
                            <TableCell className="font-mono text-sm">
                              {payout.transactionId}
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Evolução Mensal</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {monthlyEarnings.map((month, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{month.month}</span>
                            <span className="font-medium">R$ {month.earnings.toLocaleString()}</span>
                          </div>
                          <Progress value={(month.earnings / 4000) * 100} />
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Top Produtos</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { name: 'Curso Marketing Digital', earnings: 'R$ 1.247,50', percentage: 38 },
                        { name: 'Consultoria 1:1', earnings: 'R$ 1.140,00', percentage: 35 },
                        { name: 'E-book Growth Hacking', earnings: 'R$ 459,00', percentage: 27 },
                      ].map((product, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">{product.name}</span>
                            <span className="text-primary font-semibold">{product.earnings}</span>
                          </div>
                          <Progress value={product.percentage} />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Payout Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Próximo Pagamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary">R$ 2.847,50</div>
                  <div className="text-sm text-muted-foreground">Disponível para saque</div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Próxima data:</span>
                    <span className="font-medium">01/04/2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Valor mínimo:</span>
                    <span className="font-medium">R$ 50,00</span>
                  </div>
                </div>
                <Button className="w-full">
                  Solicitar Saque
                </Button>
              </CardContent>
            </Card>

            {/* Commission Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Resumo por Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Aprovadas</span>
                  </div>
                  <span className="font-semibold text-green-600">R$ 2.847,50</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">Pendentes</span>
                  </div>
                  <span className="font-semibold text-yellow-600">R$ 890,00</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <span className="text-sm">Rejeitadas</span>
                  </div>
                  <span className="font-semibold text-red-600">R$ 127,50</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Estatísticas Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Média por venda:</span>
                  <span className="font-semibold">R$ 297,15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Total vendas:</span>
                  <span className="font-semibold">89</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Melhor mês:</span>
                  <span className="font-semibold">Março</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}