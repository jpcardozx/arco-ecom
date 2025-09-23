/**
 * ARCO Modern Footer Component - S-tier UI/UX
 * Modern footer with glassmorphism and advanced animations
 */

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Star,
  Shield,
  Award,
  Zap,
  Send,
  ExternalLink,
  Heart,
  Sparkles,
  Users,
  TrendingUp,
  Crown
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
  badge?: string;
}

interface FooterSection {
  title: string;
  icon?: React.ElementType;
  links: FooterLink[];
}

interface FooterProps {
  variant?: 'default' | 'dark' | 'minimal';
  showNewsletter?: boolean;
  showSocial?: boolean;
  showTrustBadges?: boolean;
  className?: string;
}

const footerSections: FooterSection[] = [
  {
    title: 'Produtos',
    icon: TrendingUp,
    links: [
      { label: 'Eletrônicos', href: '/ecommerce?categoria=eletronicos' },
      { label: 'Casa & Jardim', href: '/ecommerce?categoria=casa' },
      { label: 'Moda & Beleza', href: '/ecommerce?categoria=moda' },
      { label: 'Esportes & Lazer', href: '/ecommerce?categoria=esportes' },
      { label: 'Ofertas Especiais', href: '/ecommerce?tab=ofertas', badge: 'Hot' },
      { label: 'Ver Todos', href: '/ecommerce' }
    ]
  },
  {
    title: 'E-commerce',
    icon: Sparkles,
    links: [
      { label: 'Catálogo Completo', href: '/ecommerce' },
      { label: 'Meus Favoritos', href: '/ecommerce?tab=favoritos' },
      { label: 'Ofertas do Dia', href: '/ecommerce/ofertas', badge: 'Novo' },
      { label: 'Produtos Premium', href: '/ecommerce/premium' },
      { label: 'Links de Afiliado', href: '/ecommerce/affiliate/links' }
    ]
  },
  {
    title: 'Recursos',
    icon: Users,
    links: [
      { label: 'Cases de Sucesso', href: '/cases' },
      { label: 'Blog', href: '/blog' },
      { label: 'Calculadora ROI', href: '/tools/roi-calculator' },
      { label: 'Toolkit Gratuito', href: '/resources/toolkit' },
      { label: 'Webinars', href: '/resources/webinars' },
      { label: 'Downloads', href: '/resources/downloads' }
    ]
  },
  {
    title: 'Empresa',
    icon: Crown,
    links: [
      { label: 'Sobre Nós', href: '/about' },
      { label: 'Nossa Equipe', href: '/team' },
      { label: 'Carreiras', href: '/careers' },
      { label: 'Imprensa', href: '/press' },
      { label: 'Parceiros', href: '/partners' },
      { label: 'Contato', href: '/contact' }
    ]
  }
];

const socialLinks = [
  { icon: Twitter, href: 'https://twitter.com/arcoplatform', label: 'Twitter', color: 'hover:text-blue-400' },
  { icon: Linkedin, href: 'https://linkedin.com/company/arcoplatform', label: 'LinkedIn', color: 'hover:text-blue-600' },
  { icon: Instagram, href: 'https://instagram.com/arcoplatform', label: 'Instagram', color: 'hover:text-pink-500' },
  { icon: Youtube, href: 'https://youtube.com/arcoplatform', label: 'YouTube', color: 'hover:text-red-500' }
];

const trustBadges = [
  { icon: Shield, text: 'Segurança SSL', color: 'from-green-500 to-emerald-500' },
  { icon: Award, text: 'Certificado ISO', color: 'from-blue-500 to-cyan-500' },
  { icon: Star, text: '4.9/5 Avaliação', color: 'from-yellow-500 to-orange-500' },
  { icon: Zap, text: 'Suporte 24/7', color: 'from-purple-500 to-violet-500' }
];

export const ModernFooter: React.FC<FooterProps> = ({
  variant = 'dark',
  showNewsletter = true,
  showSocial = true,
  showTrustBadges = true,
  className,
}) => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Newsletter signup:', email);
    setEmail('');
    setIsSubscribing(false);
  };

  return (
    <footer className={cn(
      'relative overflow-hidden',
      'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900',
      'text-white',
      className
    )}>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20" />
      <div className="absolute inset-0 bg-[url('/images/hero-bg.svg')] opacity-5" />
      
      {/* Newsletter Section */}
      {showNewsletter && (
        <motion.div 
          className="relative border-b border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-6 py-20">
            <div className="mx-auto max-w-4xl text-center space-y-8">
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Ofertas Exclusivas Para Você
                </h3>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                  Receba ofertas especiais, lançamentos de produtos e descontos exclusivos direto na sua caixa de entrada.
                </p>
              </motion.div>

              <motion.form 
                onSubmit={handleNewsletterSubmit} 
                className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Input
                  type="email"
                  placeholder="Seu melhor email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/15 h-12"
                  required
                />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    type="submit" 
                    disabled={isSubscribing}
                    className="px-8 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isSubscribing ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Inscrever-se
                      </>
                    )}
                  </Button>
                </motion.div>
              </motion.form>

              <motion.div 
                className="flex items-center justify-center gap-6 text-sm text-gray-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  +15.000 marketers
                </span>
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  100% seguro
                </span>
                <span className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Sem spam
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Footer Content */}
      <div className="relative container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3">
              <motion.div 
                className="w-12 h-12 relative"
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src="/logo-v2.svg"
                  alt="ARCO Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-lg scale-150 opacity-0 hover:opacity-100 transition-all duration-500 -z-10" />
              </motion.div>
              <div>
                <h4 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  ARCO
                </h4>
                <p className="text-sm text-gray-400 uppercase tracking-wider">
                  S-Tier Platform
                </p>
              </div>
            </div>
            
            <p className="text-gray-300 text-lg leading-relaxed max-w-md">
              Produtos premium com qualidade garantida, entrega rápida e os melhores preços do mercado.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg">
                  <Mail className="w-4 h-4" />
                </div>
                <span>contato@arcoplatform.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <div className="p-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+55 (11) 9999-9999</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <div className="p-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>São Paulo, Brasil</span>
              </div>
            </div>
          </motion.div>

          {/* Links Sections */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div 
              key={section.title} 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-white flex items-center gap-2">
                {section.icon && (
                  <div className="p-1.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg">
                    <section.icon className="w-4 h-4" />
                  </div>
                )}
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <motion.li key={link.label} whileHover={{ x: 4 }}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 group"
                    >
                      <span className="flex-1">{link.label}</span>
                      {link.badge && (
                        <Badge 
                          variant="outline" 
                          className="text-xs px-2 py-0 border-blue-400/50 text-blue-400 bg-blue-500/10"
                        >
                          {link.badge}
                        </Badge>
                      )}
                      {link.external && (
                        <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                      )}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      {showTrustBadges && (
        <motion.div 
          className="relative border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {trustBadges.map((badge, index) => (
                <motion.div
                  key={badge.text}
                  className="flex items-center gap-3 justify-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -2 }}
                >
                  <div className={cn(
                    "p-3 rounded-xl bg-gradient-to-r shadow-lg",
                    badge.color
                  )}>
                    <badge.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-300">
                    {badge.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Bottom Section */}
      <motion.div 
        className="relative border-t border-white/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>© 2025 ARCO Platform. Todos os direitos reservados.</span>
              <Separator orientation="vertical" className="h-4 bg-white/20" />
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacidade
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Termos
              </Link>
            </div>

            {/* Social Links */}
            {showSocial && (
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "p-3 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 transition-all duration-300",
                      social.color
                    )}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default ModernFooter;