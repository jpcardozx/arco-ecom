'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/design-system/primitives/card';
import { Button } from '@/components/design-system/primitives/button';
import { Badge } from '@/components/design-system/primitives/badge';
import {
  Github,
  Shield,
  Crown,
  Users,
  TrendingUp,
  Zap,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const benefits = [
  {
    icon: TrendingUp,
    title: 'Dashboard Personalizado',
    description: 'Acompanhe suas métricas e performance em tempo real'
  },
  {
    icon: Users,
    title: 'Programa de Afiliados',
    description: 'Acesso exclusivo ao programa premium de afiliados'
  },
  {
    icon: Zap,
    title: 'Ferramentas Avançadas',
    description: 'Gerador de links, analytics e materiais criativos'
  }
];

export default function SignInPage() {
  const handleGitHubSignIn = () => {
    signIn('github', {
      callbackUrl: '/ecommerce/affiliate/dashboard',
      redirect: true
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding & Benefits */}
        <div className="space-y-8">
          {/* Logo & Branding */}
          <div className="text-center lg:text-left">
            <div className="flex items-center gap-3 justify-center lg:justify-start mb-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary via-primary/80 to-accent rounded-xl flex items-center justify-center shadow-lg">
                  <Crown className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                  <Zap className="w-3 h-3 text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  ARCO
                </span>
                <span className="text-sm text-muted-foreground -mt-1">S-Tier Platform</span>
              </div>
            </div>

            <div className="space-y-2 mb-8">
              <h1 className="text-4xl font-bold">
                Bem-vindo de volta!
              </h1>
              <p className="text-xl text-muted-foreground">
                Acesse sua conta para continuar monetizando sua audiência
              </p>
            </div>

            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              <Badge className="bg-green-100 text-green-700 border-green-200">
                <Shield className="w-3 h-3 mr-1" />
                100% Seguro
              </Badge>
              <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                <Users className="w-3 h-3 mr-1" />
                50K+ Usuários
              </Badge>
            </div>
          </div>

          {/* Benefits */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">O que você terá acesso:</h3>
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">{benefit.title}</h4>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="flex justify-center lg:justify-end">
          <Card className="w-full max-w-md shadow-xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl">Fazer Login</CardTitle>
              <p className="text-muted-foreground">
                Entre com sua conta GitHub para continuar
              </p>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              {/* GitHub Sign In Button */}
              <Button
                onClick={handleGitHubSignIn}
                className="w-full h-12 text-base font-semibold bg-[#24292f] hover:bg-[#1c1f23] text-white"
                size="lg"
              >
                <Github className="w-5 h-5 mr-3" />
                Continuar com GitHub
                <ArrowRight className="w-5 h-5 ml-3" />
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-muted-foreground/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Seguro e confiável
                  </span>
                </div>
              </div>

              {/* Security Features */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Não armazenamos sua senha</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Autenticação via GitHub segura</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Dados protegidos por criptografia</span>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Não tem uma conta?{' '}
                  <button
                    onClick={() => signIn('github', {
                      callbackUrl: '/ecommerce/affiliate/signup',
                      redirect: true
                    })}
                    className="text-primary hover:underline font-medium"
                  >
                    Criar conta grátis
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}