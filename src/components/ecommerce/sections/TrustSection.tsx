'use client';

import React from 'react';
import { Card, CardContent } from '@/components/design-system/primitives/card';
import { Badge } from '@/components/design-system/primitives/badge';
import { Button } from '@/components/design-system/primitives/button';
import {
  Shield,
  Award,
  Users,
  TrendingUp,
  Star,
  CheckCircle,
  Zap,
  Crown,
  ArrowRight,
  DollarSign,
  Clock,
  Target
} from 'lucide-react';
import { cn } from '@/lib/utils';

const trustStats = [
  {
    number: '50K+',
    label: 'Afiliados Ativos',
    description: 'Profissionais monetizando',
    icon: Users,
    color: 'text-blue-600'
  },
  {
    number: '98.5%',
    label: 'Taxa de Satisfação',
    description: 'Clientes recomendariam',
    icon: Star,
    color: 'text-yellow-600'
  },
  {
    number: 'R$ 2.4M+',
    label: 'Comissões Pagas',
    description: 'Nos últimos 12 meses',
    icon: DollarSign,
    color: 'text-green-600'
  },
  {
    number: '24h',
    label: 'Aprovação Express',
    description: 'Para começar a lucrar',
    icon: Clock,
    color: 'text-purple-600'
  }
];

const whyChooseUs = [
  {
    title: 'Produtos de Alta Conversão',
    description: 'Catálogo curado com produtos que realmente vendem. Taxa de conversão média 3.2x superior à concorrência.',
    icon: Target,
    stats: '3.2x maior conversão',
    color: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    title: 'Comissões Premium',
    description: 'Até 50% de comissão + bônus por performance. Sistema transparente com pagamentos pontuais.',
    icon: Crown,
    stats: 'Até 50% comissão',
    color: 'bg-yellow-50 text-yellow-700 border-yellow-200'
  },
  {
    title: 'Suporte S-Tier',
    description: 'Time dedicado, materiais criativos ilimitados e treinamentos exclusivos para maximizar seus ganhos.',
    icon: Zap,
    stats: 'Suporte 24/7',
    color: 'bg-purple-50 text-purple-700 border-purple-200'
  },
  {
    title: 'Tecnologia Avançada',
    description: 'Dashboard com analytics em tempo real, links inteligentes e automações para otimizar sua performance.',
    icon: TrendingUp,
    stats: 'Analytics em tempo real',
    color: 'bg-green-50 text-green-700 border-green-200'
  }
];

const socialProof = [
  {
    name: 'Marina Silva',
    role: 'Influencer de Negócios',
    followers: '120K',
    earnings: 'R$ 8.400',
    period: 'último mês',
    testimonial: 'Em 3 meses como afiliada ARCO já superei minha meta anual. A qualidade dos produtos e suporte é incomparável.',
    avatar: '👩🏻‍💼'
  },
  {
    name: 'Carlos Mendes',
    role: 'Coach Empresarial',
    followers: '85K',
    earnings: 'R$ 12.700',
    period: 'último mês',
    testimonial: 'Finalmente encontrei uma plataforma que entrega o que promete. Meus seguidores confiam nas indicações.',
    avatar: '👨🏽‍💼'
  },
  {
    name: 'Ana Carolina',
    role: 'Especialista em Marketing',
    followers: '200K',
    earnings: 'R$ 15.200',
    period: 'último mês',
    testimonial: 'A ARCO não é só uma plataforma de afiliados, é um ecossistema completo para quem quer crescer.',
    avatar: '👩🏼‍💻'
  }
];

export const TrustSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-background via-secondary/5 to-accent/5 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge className="bg-primary/10 text-primary border-primary/20">
              <Award className="w-3 h-3 mr-1" />
              Plataforma Premiada
            </Badge>
            <Badge className="bg-green-100 text-green-700 border-green-200">
              <Shield className="w-3 h-3 mr-1" />
              100% Seguro
            </Badge>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Por que +50mil profissionais
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent block">
              confiam na ARCO?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A única plataforma que combina produtos premium, comissões justas e tecnologia de ponta
            para maximizar seus resultados como afiliado.
          </p>
        </div>

        {/* Trust Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {trustStats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4",
                  `bg-${stat.color.split('-')[1]}-100`)}>
                  <stat.icon className={cn("w-6 h-6", stat.color)} />
                </div>
                <div className="text-3xl font-bold mb-1">{stat.number}</div>
                <div className="font-semibold text-foreground mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">
              O que torna a ARCO diferente?
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Não somos apenas mais uma plataforma. Somos o ecossistema completo para seu sucesso.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {whyChooseUs.map((item, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center border-2",
                      item.color
                    )}>
                      <item.icon className="w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {item.stats}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {item.description}
                  </p>
                  <div className="flex items-center text-primary font-medium group-hover:gap-3 transition-all">
                    <span>Saiba mais</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Social Proof */}
        <div className="mb-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">
              Resultados reais de afiliados reais
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Veja como profissionais estão transformando suas receitas com a ARCO.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {socialProof.map((person, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="text-4xl">{person.avatar}</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg">{person.name}</h4>
                      <p className="text-muted-foreground text-sm">{person.role}</p>
                      <p className="text-xs text-muted-foreground">{person.followers} seguidores</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">{person.earnings}</div>
                      <div className="text-xs text-muted-foreground">{person.period}</div>
                    </div>
                  </div>

                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <blockquote className="text-muted-foreground leading-relaxed italic">
                    "{person.testimonial}"
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-primary/20">
            <CardContent className="p-12">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-3xl font-bold mb-4">
                  Pronto para se juntar aos melhores?
                </h3>
                <p className="text-lg text-muted-foreground mb-8">
                  Processo de aprovação em 24h. Comece a monetizar sua audiência ainda hoje.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 px-8">
                    <Users className="w-5 h-5 mr-2" />
                    Tornar-se Afiliado
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button variant="outline" size="lg" className="px-8">
                    Ver Produtos Disponíveis
                  </Button>
                </div>
                <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Aprovação em 24h
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Sem taxa de inscrição
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Suporte gratuito
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};