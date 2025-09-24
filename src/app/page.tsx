'use client';

import React from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { CTASection } from '@/components/sections/CTASection';
import { CategoriesSection } from '@/components/sections/CategoriesSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import InnovationShowcase from '@/components/sections/InnovationShowcase';
import SuccessStories from '@/components/sections/SuccessStories';
import { Crown, Truck, ShieldCheck, Heart } from 'lucide-react';

// Enhanced Hero Section using new HeroSection component
const EnhancedHero = () => (
  <HeroSection
    badge={{
      text: "Plataforma Premium de E-commerce Inteligente",
      icon: "sparkles"
    }}
    title="ARCO Transforme Seus Resultados"
    subtitle="A plataforma mais avançada para e-commerce premium e vendas inteligentes. Resultados comprovados, tecnologia de ponta."
    primaryCta={{
      text: "Explorar Produtos",
      href: "/ecommerce"
    }}
    secondaryCta={{
      text: "Ver Demonstração",
      href: "/ecommerce"
    }}
    variant="gradient"
    showFloatingElements={true}
  />
);

// Enhanced Features using new FeaturesSection component
const EnhancedFeatures = () => (
  <FeaturesSection
    badge="Por que escolher a ARCO?"
    title="Experiência de Compra Excepcional"
    subtitle="Oferecemos mais do que produtos - criamos experiências únicas para nossos clientes"
    features={[
      {
        icon: <Crown className="w-8 h-8 text-primary" />,
        title: "Produtos Premium",
        description: "Curadoria especial com produtos de alta qualidade e marcas reconhecidas mundialmente",
        status: "available",
        badge: "Premium"
      },
      {
        icon: <Truck className="w-8 h-8 text-primary" />,
        title: "Entrega Rápida",
        description: "Receba seus produtos com agilidade e segurança, com rastreamento completo",
        status: "available"
      },
      {
        icon: <ShieldCheck className="w-8 h-8 text-primary" />,
        title: "Compra Segura",
        description: "Transações 100% seguras com garantia total e suporte especializado",
        status: "available"
      },
      {
        icon: <Heart className="w-8 h-8 text-primary" />,
        title: "Atendimento Exclusivo",
        description: "Suporte personalizado para garantir a melhor experiência de compra",
        status: "available",
        badge: "24/7"
      }
    ]}
    columns={4}
  />
);

// Enhanced Stats using new StatsSection component
const EnhancedStats = () => (
  <StatsSection
    badge="Resultados Comprovados"
    title="Números que Impressionam"
    subtitle="Métricas reais da nossa plataforma e resultados dos nossos clientes"
    stats={[
      {
        label: "Clientes Satisfeitos",
        value: 50000,
        suffix: "+",
        description: "Usuários ativos mensalmente",
        variant: "gradient"
      },
      {
        label: "Produtos Premium",
        value: 10000,
        suffix: "+",
        description: "Catálogo curado",
        variant: "success"
      },
      {
        label: "Taxa de Conversão",
        value: 12.5,
        max: 15,
        suffix: "%",
        description: "Acima da média do mercado",
        variant: "gradient"
      },
      {
        label: "Satisfação",
        value: 98,
        max: 100,
        suffix: "%",
        description: "NPS dos clientes",
        variant: "success"
      }
    ]}
    layout="grid"
    showProgress={true}
  />
);

// Enhanced CTA using new CTASection component
const EnhancedCTA = () => (
  <CTASection
    badge="Comece Agora"
    title="Pronto para Transformar Seus Resultados?"
    subtitle="Junte-se a mais de 50.000 empreendedores que já aumentaram sua receita com nossa plataforma. Setup gratuito em menos de 5 minutos."
    primaryCta={{
      text: "Criar Conta Grátis",
      href: "/auth/signup"
    }}
    secondaryCta={{
      text: "Falar com Consultor",
      href: "/contato"
    }}
    variant="premium"
    showDecorations={true}
  />
);

export default function HomePage() {
  return (
    <>
      <EnhancedHero />
      <EnhancedFeatures />
      <CategoriesSection />
      <InnovationShowcase />
      <EnhancedStats />
      <SuccessStories />
      <TestimonialsSection />
      <EnhancedCTA />
    </>
  );
}
