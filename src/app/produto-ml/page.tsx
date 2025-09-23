/**
 * PRODUTO S-TIER - MERCADO LIVRE
 * Página isolada com UI/UX premium focada em conversão
 * SEM navegação para outras partes do site
 */

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Star, 
  Heart, 
  Share2, 
  Shield, 
  Truck, 
  CreditCard, 
  ArrowRight,
  Check,
  Zap,
  Award,
  Users,
  Clock,
  ChevronLeft,
  ChevronRight,
  Play
} from 'lucide-react';
import { Button } from '@/components/design-system/primitives/button';
import { Badge } from '@/components/design-system/primitives/badge';
import { cn } from '@/lib/utils';

// Dados do produto (simulado)
const productData = {
  title: "Smartphone Samsung Galaxy A54 5G 128GB 6GB RAM Câmera Tripla",
  price: "R$ 1.299,99",
  originalPrice: "R$ 1.899,99", 
  discount: "32% OFF",
  rating: 4.8,
  reviews: 15847,
  soldCount: "500+ vendidos",
  seller: "Samsung Store Oficial",
  sellerRating: 5.0,
  images: [
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
    "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&q=80",
    "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&q=80",
    "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=800&q=80"
  ],
  features: [
    "Tela Super AMOLED 6.4\" FHD+",
    "Processador Exynos 1380 Octa-core",
    "Câmera principal de 50MP",
    "Bateria 5000mAh com carregamento rápido",
    "Resistente à água IP67",
    "Android 13 com One UI 5.1"
  ],
  specs: {
    "Tela": "6.4\" Super AMOLED, 2340 x 1080",
    "Processador": "Exynos 1380 Octa-core",
    "Memória": "6GB RAM + 128GB Storage",
    "Câmera": "50MP + 12MP + 5MP",
    "Bateria": "5000mAh",
    "Sistema": "Android 13"
  },
  benefits: [
    "✅ Frete GRÁTIS para todo Brasil",
    "✅ Garantia de 1 ano Samsung",
    "✅ Entrega expressa em 1-2 dias",
    "✅ Parcelamento sem juros em 12x",
    "✅ Devolução GRÁTIS em 30 dias",
    "✅ Loja oficial Samsung"
  ],
  mercadoLivreUrl: "https://mercadolivre.com/sec/1sovdhx"
};

export default function ProductPageMLIsolated() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => 
        prev === productData.images.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === productData.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? productData.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header minimalista */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">ML</span>
              </div>
              <div className="text-sm text-slate-600">
                <span className="font-medium text-green-600">OFICIAL</span> • Mercado Livre
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm">
                <Heart className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Galeria de Imagens - Mobile/Desktop Responsivo */}
          <div className="space-y-4">
            {/* Imagem Principal */}
            <div 
              className="relative aspect-square bg-white rounded-2xl shadow-soft overflow-hidden cursor-pointer group"
              onClick={() => setIsImageModalOpen(true)}
            >
              <Image
                src={productData.images[currentImageIndex]}
                alt={productData.title}
                fill
                className="object-cover image-hover"
                priority
              />
              
              {/* Navegação de imagens */}
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="w-5 h-5 text-slate-700" />
              </button>
              
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="w-5 h-5 text-slate-700" />
              </button>

              {/* Discount Badge */}
              <div className="absolute top-4 left-4">
                <Badge className="bg-red-500 text-white font-bold px-3 py-1">
                  {productData.discount}
                </Badge>
              </div>

              {/* Indicadores */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {productData.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => { e.stopPropagation(); handleImageChange(index); }}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      index === currentImageIndex 
                        ? "bg-white w-8" 
                        : "bg-white/60"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnails - Desktop */}
            <div className="hidden md:grid grid-cols-4 gap-3">
              {productData.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleImageChange(index)}
                  className={cn(
                    "aspect-square rounded-lg overflow-hidden border-2 transition-all",
                    index === currentImageIndex 
                      ? "border-blue-500 shadow-glow" 
                      : "border-slate-200 hover:border-slate-300"
                  )}
                >
                  <Image
                    src={image}
                    alt={`${productData.title} - Imagem ${index + 1}`}
                    width={120}
                    height={120}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Video Demo - Placeholder */}
            <div className="hidden lg:block">
              <button
                onClick={() => setShowVideoModal(true)}
                className="w-full aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center group hover:shadow-md transition-all"
              >
                <div className="text-center">
                  <Play className="w-12 h-12 text-slate-600 mx-auto mb-2 group-hover:text-blue-600 transition-colors" />
                  <p className="text-slate-600 font-medium">Ver demonstração do produto</p>
                </div>
              </button>
            </div>
          </div>

          {/* Informações do Produto */}
          <div className="space-y-6">
            {/* Título e Rating */}
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 leading-tight mb-3">
                {productData.title}
              </h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-4 h-4",
                        i < Math.floor(productData.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-slate-300"
                      )}
                    />
                  ))}
                  <span className="text-sm font-medium text-slate-700 ml-1">
                    {productData.rating}
                  </span>
                </div>
                <span className="text-sm text-slate-500">
                  ({productData.reviews.toLocaleString()} avaliações)
                </span>
                <Badge variant="secondary">
                  {productData.soldCount}
                </Badge>
              </div>
            </div>

            {/* Preços */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
              <div className="flex items-end space-x-3 mb-3">
                <span className="text-3xl lg:text-4xl font-bold text-green-700">
                  {productData.price}
                </span>
                <span className="text-lg text-slate-500 line-through mb-1">
                  {productData.originalPrice}
                </span>
              </div>
              
              <p className="text-sm text-green-600 font-medium mb-4">
                💰 Economia de R$ 600,00 • Menor preço em 30 dias
              </p>

              <div className="space-y-3">
                <p className="text-sm text-slate-600">
                  <CreditCard className="w-4 h-4 inline mr-1" />
                  <strong>12x de R$ 108,33</strong> sem juros no cartão
                </p>
                <p className="text-sm text-slate-600">
                  <Zap className="w-4 h-4 inline mr-1" />
                  <strong>5% OFF</strong> pagando via PIX: <strong>R$ 1.234,99</strong>
                </p>
              </div>
            </div>

            {/* Benefícios */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {productData.benefits.slice(0, 4).map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 text-sm text-slate-700 bg-white rounded-lg p-3 border border-slate-100"
                >
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>{benefit.replace('✅ ', '')}</span>
                </div>
              ))}
            </div>

            {/* CTA Principal */}
            <div className="space-y-3">
              <Button
                size="lg"
                className="btn-premium w-full h-14 text-lg"
                onClick={() => window.open(productData.mercadoLivreUrl, '_blank')}
              >
                <span>Comprar no Mercado Livre</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <p className="text-xs text-center text-slate-500">
                🔒 Compra protegida • ⚡ Entrega rápida • 🎯 Melhor preço garantido
              </p>
            </div>

            {/* Vendedor */}
            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-slate-900">{productData.seller}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{productData.sellerRating}</span>
                    <Badge className="ml-2 bg-green-100 text-green-700">
                      <Award className="w-3 h-3 mr-1" />
                      MercadoLíder
                    </Badge>
                  </div>
                </div>
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600">+50mil vendas</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600">Responde em 2h</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Especificações - Seção Expandida */}
        <div className="mt-16 space-y-8">
          {/* Características Principais */}
          <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-soft">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Características Principais</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {productData.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-4 bg-slate-50 rounded-lg"
                >
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Especificações Técnicas */}
          <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-soft">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Especificações Técnicas</h2>
            
            <div className="grid gap-4">
              {Object.entries(productData.specs).map(([key, value], index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-slate-900">{key}</span>
                  <span className="text-slate-600 sm:text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            Não perca esta oferta exclusiva!
          </h2>
          <p className="text-lg opacity-90 mb-6">
            Últimas unidades com 32% de desconto + frete grátis
          </p>
          
          <Button
            size="lg"
            className="btn-premium h-14 px-8 text-lg bg-white text-blue-600 hover:bg-slate-100"
            onClick={() => window.open(productData.mercadoLivreUrl, '_blank')}
          >
            <span>Garantir Minha Oferta</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <p className="text-sm opacity-75 mt-4">
            ⏰ Oferta por tempo limitado • 🚚 Entrega expressa • 🔒 Compra 100% segura
          </p>
        </div>
      </div>
    </div>
  );
}