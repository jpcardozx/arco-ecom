'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { UserPlus, TrendingUp, DollarSign, Users } from 'lucide-react';

export default function BlogSignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-accent/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Badge className="mb-4">Programa do Blog</Badge>
            <h1 className="text-4xl font-bold mb-4">Torne-se um Colaborador do Blog ARCO</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Compartilhe conhecimento e crie conteúdo premium. Oportunidades exclusivas de colaboração.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Benefits */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Benefícios
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Comissões até 50%</p>
                      <p className="text-sm text-muted-foreground">Produtos de alta conversão</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Suporte dedicado</p>
                      <p className="text-sm text-muted-foreground">Material e treinamento</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <UserPlus className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Aprovação rápida</p>
                      <p className="text-sm text-muted-foreground">24h para começar</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Dados para Cadastro</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome completo</Label>
                      <Input id="name" placeholder="Seu nome" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="seu@email.com" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input id="phone" placeholder="(11) 99999-9999" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="document">CPF/CNPJ</Label>
                      <Input id="document" placeholder="000.000.000-00" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="platform">Principal plataforma</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Onde promove produtos?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="youtube">YouTube</SelectItem>
                        <SelectItem value="tiktok">TikTok</SelectItem>
                        <SelectItem value="blog">Blog/Site</SelectItem>
                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        <SelectItem value="other">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="followers">Seguidores/Audiência</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Tamanho da audiência" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1k">1K - 10K</SelectItem>
                          <SelectItem value="10k">10K - 100K</SelectItem>
                          <SelectItem value="100k">100K - 1M</SelectItem>
                          <SelectItem value="1m">1M+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="niche">Nicho/Área</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Sua área de atuação" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="business">Negócios</SelectItem>
                          <SelectItem value="lifestyle">Lifestyle</SelectItem>
                          <SelectItem value="tech">Tecnologia</SelectItem>
                          <SelectItem value="health">Saúde</SelectItem>
                          <SelectItem value="education">Educação</SelectItem>
                          <SelectItem value="other">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Experiência com blog</Label>
                    <Textarea
                      id="experience"
                      placeholder="Conte sobre sua experiência promovendo produtos (opcional)"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="text-sm">
                        Aceito os termos do programa do blog
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="privacy" />
                      <Label htmlFor="privacy" className="text-sm">
                        Aceito a política de privacidade
                      </Label>
                    </div>
                  </div>

                  <Button className="w-full" size="lg">
                    Solicitar Aprovação
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}