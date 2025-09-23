'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/design-system/primitives/card';
import { Badge } from '@/components/design-system/primitives/badge';
import { Button } from '@/components/design-system/primitives/button';
import { Input } from '@/components/design-system/primitives/input';
import { Label } from '@/components/design-system/primitives/label';
import { Textarea } from '@/components/design-system/primitives/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/design-system/primitives/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/design-system/primitives/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/design-system/primitives/dialog';
import {
  Link,
  Copy,
  ExternalLink,
  QrCode,
  Download,
  Share2,
  Eye,
  MousePointer,
  ShoppingCart,
  Plus,
  Search,
  Filter
} from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Curso Marketing Digital Completo',
    image: '/api/placeholder/200/150',
    price: 'R$ 497',
    commission: '50%',
    category: 'Cursos',
    clicks: 2840,
    conversions: 34,
    earnings: 'R$ 637,50'
  },
  {
    id: 2,
    name: 'E-book Growth Hacking',
    image: '/api/placeholder/200/150',
    price: 'R$ 97',
    commission: '45%',
    category: 'E-books',
    clicks: 1920,
    conversions: 28,
    earnings: 'R$ 315,00'
  },
  {
    id: 3,
    name: 'Consultoria Estratégica 1:1',
    image: '/api/placeholder/200/150',
    price: 'R$ 1.997',
    commission: '30%',
    category: 'Serviços',
    clicks: 980,
    conversions: 12,
    earnings: 'R$ 1.140,00'
  },
];

const myLinks = [
  {
    id: 1,
    product: 'Curso Marketing Digital',
    url: 'arco.com/aff/ABC123/curso-marketing-digital',
    clicks: 2840,
    conversions: 34,
    created: '15/03/2024',
    status: 'active'
  },
  {
    id: 2,
    product: 'E-book Growth Hacking',
    url: 'arco.com/aff/ABC123/ebook-growth-hacking',
    clicks: 1920,
    conversions: 28,
    created: '12/03/2024',
    status: 'active'
  },
];

export default function AffiliateLinksPage() {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [customSlug, setCustomSlug] = useState('');
  const [campaign, setCampaign] = useState('');

  const generateLink = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return '';

    const slug = customSlug || product.name.toLowerCase().replace(/\s+/g, '-');
    const campaignParam = campaign ? `?utm_campaign=${campaign}` : '';
    return `arco.com/aff/ABC123/${slug}${campaignParam}`;
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Gerador de Links</h1>
            <p className="text-muted-foreground mt-1">Crie e gerencie seus links de afiliado</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Novo Link
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Gerar Novo Link de Afiliado</DialogTitle>
              </DialogHeader>
              <div className="grid lg:grid-cols-2 gap-6 py-4">
                <div className="space-y-4">
                  <div>
                    <Label>Selecione o Produto</Label>
                    <Select onValueChange={(value) => setSelectedProduct(Number(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Escolha um produto" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map(product => (
                          <SelectItem key={product.id} value={product.id.toString()}>
                            {product.name} - {product.commission}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="slug">Slug Personalizado (Opcional)</Label>
                    <Input
                      id="slug"
                      placeholder="meu-link-personalizado"
                      value={customSlug}
                      onChange={(e) => setCustomSlug(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="campaign">Campanha (Opcional)</Label>
                    <Input
                      id="campaign"
                      placeholder="instagram-stories"
                      value={campaign}
                      onChange={(e) => setCampaign(e.target.value)}
                    />
                  </div>

                  {selectedProduct && (
                    <div className="p-4 bg-secondary/20 rounded-lg">
                      <Label className="text-sm font-medium">Link Gerado:</Label>
                      <div className="flex items-center gap-2 mt-2">
                        <Input
                          value={generateLink(selectedProduct)}
                          readOnly
                          className="text-xs"
                        />
                        <Button size="sm" variant="outline">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {selectedProduct && (
                  <div>
                    {(() => {
                      const product = products.find(p => p.id === selectedProduct);
                      return product ? (
                        <Card>
                          <CardContent className="p-4">
                            <div className="aspect-video bg-secondary/20 rounded mb-4"></div>
                            <h3 className="font-semibold mb-2">{product.name}</h3>
                            <div className="flex justify-between items-center mb-4">
                              <span className="text-lg font-bold text-primary">{product.price}</span>
                              <Badge>{product.commission} comissão</Badge>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-sm">
                              <div className="text-center p-2 bg-secondary/20 rounded">
                                <Eye className="w-4 h-4 mx-auto mb-1" />
                                <div className="font-medium">{product.clicks.toLocaleString()}</div>
                                <div className="text-xs text-muted-foreground">Cliques</div>
                              </div>
                              <div className="text-center p-2 bg-secondary/20 rounded">
                                <ShoppingCart className="w-4 h-4 mx-auto mb-1" />
                                <div className="font-medium">{product.conversions}</div>
                                <div className="text-xs text-muted-foreground">Conversões</div>
                              </div>
                              <div className="text-center p-2 bg-secondary/20 rounded">
                                <div className="font-medium text-primary">{product.earnings}</div>
                                <div className="text-xs text-muted-foreground">Ganhos</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ) : null;
                    })()}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">Gerar e Salvar Link</Button>
                <Button variant="outline">
                  <QrCode className="w-4 h-4 mr-2" />
                  QR Code
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList>
            <TabsTrigger value="products">Produtos Disponíveis</TabsTrigger>
            <TabsTrigger value="mylinks">Meus Links</TabsTrigger>
            <TabsTrigger value="materials">Materiais</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-4">
            {/* Filters */}
            <div className="flex gap-4">
              <div className="flex-1">
                <Input placeholder="Buscar produtos..." className="w-full" />
              </div>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="courses">Cursos</SelectItem>
                  <SelectItem value="ebooks">E-books</SelectItem>
                  <SelectItem value="services">Serviços</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="w-4 h-4" />
              </Button>
            </div>

            {/* Products Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="aspect-video bg-secondary/20"></div>
                  <CardContent className="p-4">
                    <Badge className="mb-2">{product.category}</Badge>
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-bold text-primary">{product.price}</span>
                      <Badge variant="secondary">{product.commission}</Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs mb-4">
                      <div className="text-center p-2 bg-secondary/20 rounded">
                        <div className="font-medium">{product.clicks.toLocaleString()}</div>
                        <div className="text-muted-foreground">Cliques</div>
                      </div>
                      <div className="text-center p-2 bg-secondary/20 rounded">
                        <div className="font-medium">{product.conversions}</div>
                        <div className="text-muted-foreground">Vendas</div>
                      </div>
                      <div className="text-center p-2 bg-secondary/20 rounded">
                        <div className="font-medium text-primary">{product.earnings}</div>
                        <div className="text-muted-foreground">Ganhos</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="flex-1" size="sm">
                            <Link className="w-4 h-4 mr-1" />
                            Gerar Link
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Gerar Link - {product.name}</DialogTitle>
                          </DialogHeader>
                          {/* Simplified form for individual product */}
                          <div className="space-y-4">
                            <div>
                              <Label>Link Personalizado (Opcional)</Label>
                              <Input placeholder="meu-link-especial" />
                            </div>
                            <div className="p-3 bg-secondary/20 rounded">
                              <div className="text-sm font-medium mb-2">Link Gerado:</div>
                              <div className="flex gap-2">
                                <Input value={`arco.com/aff/ABC123/${product.name.toLowerCase().replace(/\s+/g, '-')}`} readOnly />
                                <Button size="sm" variant="outline">
                                  <Copy className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                            <Button className="w-full">Criar Link</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mylinks" className="space-y-4">
            <div className="space-y-4">
              {myLinks.map((link) => (
                <Card key={link.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold">{link.product}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{link.url}</p>
                      </div>
                      <Badge variant={link.status === 'active' ? 'default' : 'secondary'}>
                        {link.status === 'active' ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 bg-secondary/20 rounded">
                        <MousePointer className="w-5 h-5 mx-auto mb-1 text-primary" />
                        <div className="font-semibold">{link.clicks.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Cliques</div>
                      </div>
                      <div className="text-center p-3 bg-secondary/20 rounded">
                        <ShoppingCart className="w-5 h-5 mx-auto mb-1 text-primary" />
                        <div className="font-semibold">{link.conversions}</div>
                        <div className="text-xs text-muted-foreground">Conversões</div>
                      </div>
                      <div className="text-center p-3 bg-secondary/20 rounded">
                        <div className="text-sm font-semibold text-primary">
                          {((link.conversions / link.clicks) * 100).toFixed(1)}%
                        </div>
                        <div className="text-xs text-muted-foreground">Taxa Conversão</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Criado em {link.created}</span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Copy className="w-4 h-4 mr-1" />
                          Copiar
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="w-4 h-4 mr-1" />
                          Compartilhar
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="materials" className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {['Banner 1200x628', 'Banner Quadrado', 'Stories Template', 'Video Promocional'].map((material, i) => (
                <Card key={i}>
                  <div className="aspect-video bg-secondary/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Download className="w-6 h-6 text-primary" />
                      </div>
                      <p className="font-medium">{material}</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex gap-2">
                      <Button className="flex-1" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}