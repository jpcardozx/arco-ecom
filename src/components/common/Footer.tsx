/**
 * ARCO Footer - Sophisticated and Professional
 * Premium footer design for credibility and trust
 */

'use client';

import React from 'react';
import { Badge } from '@/components/design-system/primitives/badge';
import { 
  Shield, 
  Award, 
  Truck, 
  HeadphonesIcon,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ExternalLink,
  Star,
  Lock,
  CreditCard
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const trustIndicators = [
  {
    icon: Shield,
    title: 'Compra 100% Segura',
    description: 'SSL 256-bit'
  },
  {
    icon: Award,
    title: 'Produtos Certificados',
    description: 'Qualidade garantida'
  },
  {
    icon: Truck,
    title: 'Entrega Rápida',
    description: 'Em até 24h'
  },
  {
    icon: HeadphonesIcon,
    title: 'Suporte Premium',
    description: '24/7 disponível'
  }
];

const footerSections = [
  {
    title: 'Empresa',
    links: [
      { label: 'Sobre Nós', href: '/sobre' },
      { label: 'Nossa História', href: '/historia' },
      { label: 'Carreiras', href: '/carreiras' },
      { label: 'Imprensa', href: '/imprensa' }
    ]
  },
  {
    title: 'Atendimento',
    links: [
      { label: 'Central de Ajuda', href: '/ajuda' },
      { label: 'Trocas e Devoluções', href: '/trocas' },
      { label: 'Política de Privacidade', href: '/privacidade' },
      { label: 'Termos de Uso', href: '/termos' }
    ]
  },
  {
    title: 'Categorias',
    links: [
      { label: 'Eletrônicos', href: '/eletronicos' },
      { label: 'Casa e Jardim', href: '/casa-jardim' },
      { label: 'Moda e Beleza', href: '/moda-beleza' },
      { label: 'Esportes', href: '/esportes' }
    ]
  },
  {
    title: 'Contato',
    links: [
      { 
        label: '(11) 3000-0000', 
        href: 'tel:+551130000000',
        icon: Phone 
      },
      { 
        label: 'contato@arco.com.br', 
        href: 'mailto:contato@arco.com.br',
        icon: Mail 
      },
      { 
        label: 'São Paulo, SP', 
        href: '#',
        icon: MapPin 
      }
    ]
  }
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' }
];

const paymentMethods = [
  'Visa', 'Mastercard', 'Pix', 'Boleto', 'American Express'
];

const certifications = [
  { icon: Lock, label: 'SSL Secure' },
  { icon: Shield, label: 'Proteção ao Cliente' },
  { icon: Award, label: 'Empresa Certificada' }
];

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("bg-primary-950 text-white border-t border-primary-800", className)}>
      {/* Trust Indicators Bar */}
      <div className="border-b border-primary-800 bg-primary-900/50">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="flex items-center gap-3 text-center md:text-left">
                <div className="flex-shrink-0 w-10 h-10 bg-primary-700/50 rounded-full flex items-center justify-center">
                  <indicator.icon className="h-5 w-5 text-primary-200" />
                </div>
                <div>
                  <p className="font-medium text-primary-100">{indicator.title}</p>
                  <p className="text-sm text-primary-300">{indicator.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">ARCO</h3>
              <p className="text-primary-300 text-sm leading-relaxed">
                Sua plataforma premium de shopping online. Produtos selecionados, 
                qualidade garantida e experiência excepcional.
              </p>
            </div>
            
            {/* Social Links */}
            <div>
              <p className="text-primary-200 font-medium mb-3">Siga-nos</p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    className="w-9 h-9 bg-primary-800 hover:bg-primary-700 rounded-full flex items-center justify-center transition-colors duration-200"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4 text-primary-200" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <p className="text-primary-200 font-medium mb-3">Newsletter</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  className="flex-1 px-3 py-2 bg-primary-800 border border-primary-700 rounded-l-md text-sm text-white placeholder-primary-400 focus:outline-none focus:border-primary-500"
                />
                <button className="px-4 py-2 bg-primary-600 hover:bg-primary-500 rounded-r-md transition-colors duration-200">
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h4 className="text-primary-100 font-semibold text-lg">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-primary-300 hover:text-primary-100 transition-colors duration-200 text-sm"
                    >
                      {'icon' in link && link.icon && <link.icon className="h-4 w-4" />}
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-primary-800 bg-primary-900/30">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Certifications */}
            <div className="flex items-center gap-6">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center gap-2">
                  <cert.icon className="h-4 w-4 text-primary-400" />
                  <span className="text-sm text-primary-300">{cert.label}</span>
                </div>
              ))}
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-primary-300">Formas de Pagamento:</span>
              <div className="flex items-center gap-2">
                {paymentMethods.map((method, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="border-primary-700 text-primary-300 text-xs"
                  >
                    {method}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-primary-800 mt-8 pt-6 text-center">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-primary-400">
                © 2025 ARCO Shopping. Todos os direitos reservados.
              </p>
              <div className="flex items-center gap-4 text-sm text-primary-400">
                <Link href="/privacidade" className="hover:text-primary-200 transition-colors">
                  Política de Privacidade
                </Link>
                <span>•</span>
                <Link href="/termos" className="hover:text-primary-200 transition-colors">
                  Termos de Uso
                </Link>
                <span>•</span>
                <Link href="/cookies" className="hover:text-primary-200 transition-colors">
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}