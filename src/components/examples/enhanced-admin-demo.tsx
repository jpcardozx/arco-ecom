'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Filter, Download, Upload, MoreHorizontal, Eye, Edit, Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable, createSortableHeader, createActionMenu } from '@/components/ui/data-table'
import { DateRangePicker } from '@/components/ui/date-picker'
import { MultiSelect, Combobox } from '@/components/ui/advanced-select'
import { useNotifications, NotificationSystem, createNotification } from '@/components/ui/notification-system'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import type { ColumnDef } from '@tanstack/react-table'

// Mock data para produtos
interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: 'active' | 'inactive' | 'pending'
  createdAt: string
  sales: number
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    category: 'Eletrônicos',
    price: 8999.99,
    stock: 25,
    status: 'active',
    createdAt: '2025-09-20',
    sales: 145
  },
  {
    id: '2',  
    name: 'MacBook Pro M3',
    category: 'Computadores',
    price: 15999.99,
    stock: 8,
    status: 'active',
    createdAt: '2025-09-18',
    sales: 67
  },
  {
    id: '3',
    name: 'AirPods Pro',
    category: 'Acessórios',
    price: 2499.99,
    stock: 0,
    status: 'inactive',
    createdAt: '2025-09-15',
    sales: 234
  }
]

const categoryOptions = [
  { label: 'Eletrônicos', value: 'electronics' },
  { label: 'Computadores', value: 'computers' },
  { label: 'Acessórios', value: 'accessories' },
  { label: 'Casa & Decoração', value: 'home' },
  { label: 'Moda', value: 'fashion' }
]

const statusOptions = [
  { label: 'Ativo', value: 'active' },
  { label: 'Inativo', value: 'inactive' }, 
  { label: 'Pendente', value: 'pending' }
]

export default function EnhancedAdminDemo() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string>('')
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>()
  const { notifications, addNotification, dismissNotification } = useNotifications()

  // Definir colunas da tabela
  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: 'name',
      header: createSortableHeader('Produto', 'name'),
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.getValue('name')}</span>
          <span className="text-xs text-muted-foreground">ID: {row.original.id}</span>
        </div>
      ),
    },
    {
      accessorKey: 'category',
      header: createSortableHeader('Categoria', 'category'),
    },
    {
      accessorKey: 'price',
      header: createSortableHeader('Preço', 'price'),
      cell: ({ row }) => {
        const price = parseFloat(row.getValue('price'))
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price)
      },
    },
    {
      accessorKey: 'stock',
      header: createSortableHeader('Estoque', 'stock'),
      cell: ({ row }) => {
        const stock = row.getValue('stock') as number
        return (
          <span className={stock === 0 ? 'text-red-600 font-medium' : 'text-green-600'}>
            {stock}
          </span>
        )
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string
        const statusMap = {
          active: { label: 'Ativo', className: 'bg-green-100 text-green-800' },
          inactive: { label: 'Inativo', className: 'bg-red-100 text-red-800' },
          pending: { label: 'Pendente', className: 'bg-yellow-100 text-yellow-800' }
        }
        const statusInfo = statusMap[status as keyof typeof statusMap]
        
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.className}`}>
            {statusInfo.label}
          </span>
        )
      },
    },
    {
      accessorKey: 'sales',
      header: createSortableHeader('Vendas', 'sales'),
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue('sales')}</span>
      ),
    },
    {
      id: 'actions',
      header: 'Ações',
      cell: ({ row }) => {
        const product = row.original
        
        return createActionMenu([
          {
            label: 'Visualizar',
            onClick: () => addNotification(createNotification.info('Produto visualizado', `Abrindo ${product.name}`))
          },
          {
            label: 'Editar',
            onClick: () => addNotification(createNotification.info('Modo de edição', `Editando ${product.name}`))
          },
          {
            label: 'Excluir',
            onClick: () => addNotification(createNotification.warning('Confirmar exclusão', `Tem certeza que deseja excluir ${product.name}?`)),
            destructive: true
          }
        ])()
      },
    },
  ]

  const handleExport = () => {
    addNotification(createNotification.success('Exportação iniciada', 'Os dados serão baixados em instantes'))
  }

  const handleImport = () => {
    addNotification(createNotification.info('Importação', 'Selecione um arquivo CSV para importar produtos'))
  }

  const handleBulkDelete = () => {
    addNotification(createNotification.error('Operação cancelada', 'A exclusão em lote foi cancelada pelo usuário'))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Produtos</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Gerenciar Produtos</h1>
            <p className="text-slate-600 mt-1">Gerencie seu catálogo de produtos com ferramentas avançadas</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleImport}>
              <Upload className="w-4 h-4 mr-2" />
              Importar
            </Button>
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button className="bg-emerald-500 hover:bg-emerald-600">
              <Plus className="w-4 h-4 mr-2" />
              Novo Produto
            </Button>
          </div>
        </motion.div>

        {/* Advanced Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filtros Avançados
              </CardTitle>
              <CardDescription>
                Use os filtros abaixo para refinar sua busca
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Categorias</label>
                  <MultiSelect
                    options={categoryOptions}
                    values={selectedCategories}
                    onValuesChange={setSelectedCategories}
                    placeholder="Selecionar categorias"
                    maxSelected={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Combobox
                    options={statusOptions}
                    value={selectedStatus}
                    onValueChange={setSelectedStatus}
                    placeholder="Todos os status"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Período</label>
                  <DateRangePicker
                    dateRange={dateRange}
                    onDateRangeChange={setDateRange}
                    placeholder="Selecionar período"
                  />
                </div>

                <div className="flex items-end">
                  <Button 
                    variant="secondary" 
                    className="w-full"
                    onClick={() => {
                      setSelectedCategories([])
                      setSelectedStatus('')
                      setDateRange(undefined)
                      addNotification(createNotification.info('Filtros limpos', 'Todos os filtros foram removidos'))
                    }}
                  >
                    Limpar Filtros
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Data Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Lista de Produtos</CardTitle>
                  <CardDescription>
                    {mockProducts.length} produtos encontrados
                  </CardDescription>
                </div>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash className="w-4 h-4 mr-2" />
                      Excluir Selecionados
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Os produtos selecionados serão permanentemente removidos do sistema.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={handleBulkDelete} className="bg-red-600 hover:bg-red-700">
                        Confirmar Exclusão
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={columns}
                data={mockProducts}
                searchKey="name"
                searchPlaceholder="Buscar produtos..."
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Notification System */}
      <NotificationSystem 
        notifications={notifications}
        onDismiss={dismissNotification}
        position="top-right"
      />
    </div>
  )
}