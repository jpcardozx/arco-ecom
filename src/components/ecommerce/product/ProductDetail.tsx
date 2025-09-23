/**
 * ARCO Product Detail Page - S-Tier Implementation
 * Professional product visualization with depth and textures
 */

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/design-system/primitives/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/design-system/primitives/card';
import { Badge } from '@/components/design-system/primitives/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/design-system/primitives/tabs';
import { Separator } from '@/components/design-system/primitives/separator';
import { 
  ShoppingCart, 
  ExternalLink, 
  Heart,
  Share,
  ArrowLeft,
  Star,
  Shield,
  Truck,
  RotateCcw,
  Check,
  Info,
  TrendingUp,
  Users,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PlatformBadge, Rating, Price } from '../shared';
import { Product } from './ProductCard';
import Image from 'next/image';
import Link from 'next/link';

interface ProductDetailProps {
  product: Product;
  className?: string;
}

// Mock detailed product data
const detailedFeatures = [
  'Display Super Retina XDR de 6.7 polegadas',
  'Sistema de câmera Pro com teleobjetiva 5x',
  'Chip A17 Pro com GPU de 6 núcleos',
  'Até 29 horas de reprodução de vídeo',
  'Resistente a água (classificação IP68)',
  'Face ID para autenticação segura',
  'Carregamento sem fio MagSafe',
  '1TB de armazenamento interno'
];

const specifications = {
  'Dimensões': '159.9 x 76.7 x 8.25 mm',
  'Peso': '221 gramas',
  'Tela': '6.7" Super Retina XDR OLED',
  'Resolução': '2796 x 1290 pixels',
  'Processador': 'Apple A17 Pro',
  'Armazenamento': '256GB / 512GB / 1TB',
  'Câmera Principal': '48MP + 12MP + 12MP',
  'Câmera Frontal': '12MP TrueDepth',
  'Bateria': '4441 mAh',
  'Sistema Operacional': 'iOS 17'
};

const benefits = [
  {
    icon: Shield,
    title: 'Garantia Oficial',
    description: 'Garantia de 1 ano com a Apple'
  },
  {
    icon: Truck,
    title: 'Frete Grátis',
    description: 'Entrega gratuita em todo Brasil'
  },
  {
    icon: RotateCcw,
    title: '30 Dias para Troca',
    description: 'Devolução sem perguntas'
  }
];

const similarProducts = [
  {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    price: 'R$ 8.999,99',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop&auto=format&q=80'
  },
  {
    id: 'samsung-s24',
    name: 'Samsung Galaxy S24',
    price: 'R$ 5.499,99',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop&auto=format&q=80'
  }
];

export function ProductDetail({ product, className }: ProductDetailProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  // Mock multiple product images
  const productImages = [
    product.image,
    product.image.replace('?w=400&h=400', '?w=400&h=400&sat=10'),
    product.image.replace('?w=400&h=400', '?w=400&h=400&brightness=10'),
    product.image.replace('?w=400&h=400', '?w=400&h=400&contrast=10')
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `Confira este produto: ${product.title}`,
        url: window.location.href
      });
    }
  };

  return (
    <div className={cn("min-h-screen", className)}>
      {/* Background with subtle texture */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-muted/20 -z-10" />
      <div 
        className="fixed inset-0 opacity-[0.02] -z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Navigation */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/ecommerce">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar aos Produtos
            </Link>
          </Button>
          
          <div className="text-sm text-gray-600 space-x-2">
            <Link href="/ecommerce" className="hover:text-blue-600">E-commerce</Link>
            <span>/</span>
            <Link href="/ecommerce" className="hover:text-blue-600">{product.category}</Link>
            <span>/</span>
            <span className="text-gray-900">{product.title}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-2xl shadow-lg overflow-hidden border">
              <Image
                src={productImages[selectedImageIndex]}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
              
              {/* Badges */}
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                {product.discount && (
                  <Badge className="bg-red-500 hover:bg-red-600 shadow-lg text-lg px-3 py-1">
                    -{product.discount}
                  </Badge>
                )}
                {product.badge && (
                  <Badge className="bg-purple-500 hover:bg-purple-600 shadow-lg text-lg px-3 py-1">
                    {product.badge.text}
                  </Badge>
                )}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-6 right-6 flex flex-col gap-3">
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => setIsFavorited(!isFavorited)}
                  className="h-12 w-12 p-0 shadow-lg"
                >
                  <Heart className={cn("h-5 w-5", isFavorited && "fill-red-500 text-red-500")} />
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={handleShare}
                  className="h-12 w-12 p-0 shadow-lg"
                >
                  <Share className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={cn(
                    "relative aspect-square rounded-lg overflow-hidden border-2 transition-all",
                    selectedImageIndex === index 
                      ? "border-blue-500 shadow-md" 
                      : "border-gray-200 hover:border-gray-300"
                  )}
                >
                  <Image
                    src={image}
                    alt={`${product.title} - Imagem ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <PlatformBadge platform={product.platform} className="text-base px-4 py-2" />
              
              <h1 className="text-4xl font-bold leading-tight">
                {product.title}
              </h1>

              <div className="flex items-center gap-4">
                <Rating rating={product.rating} reviews={product.reviews} size="lg" />
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>Mais de {product.reviews.toLocaleString()} avaliações</span>
                </div>
              </div>
            </div>

            {/* Price */}
            <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <Price 
                price={product.price}
                originalPrice={product.originalPrice}
                discount={product.discount}
                commission={product.commission}
                size="lg"
                className="mb-4"
              />
              
              <div className="flex items-center gap-2 text-sm text-green-700">
                <TrendingUp className="h-4 w-4" />
                <span>Melhor preço dos últimos 30 dias</span>
              </div>
            </Card>

            {/* Key Features */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Principais Características</h3>
              <div className="grid grid-cols-1 gap-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-900">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center p-4 bg-blue-50 rounded-lg">
                  <benefit.icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-sm">{benefit.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{benefit.description}</p>
                </div>
              ))}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-800 font-medium">
                {product.inStock ? 'Em estoque - Pronto para envio' : 'Fora de estoque'}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                size="lg"
                className="w-full text-lg py-6 shadow-lg"
                disabled={!product.inStock}
                asChild
              >
                <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer">
                  <ShoppingCart className="h-5 w-5 mr-3" />
                  {product.inStock ? 'Comprar Agora' : 'Indisponível'}
                  <ExternalLink className="h-4 w-4 ml-3" />
                </a>
              </Button>
              
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>Redirecionamento seguro para {product.platform}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <Tabs defaultValue="features" className="space-y-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="features">Características Detalhadas</TabsTrigger>
                <TabsTrigger value="specs">Especificações</TabsTrigger>
                <TabsTrigger value="reviews">Avaliações</TabsTrigger>
              </TabsList>

              <TabsContent value="features" className="space-y-6">
                <h3 className="text-2xl font-bold">Características Completas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {detailedFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-900">{feature}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="specs" className="space-y-6">
                <h3 className="text-2xl font-bold">Especificações Técnicas</h3>
                <div className="space-y-4">
                  {Object.entries(specifications).map(([key, value], index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-2 p-4 bg-gray-50 rounded-lg">
                      <span className="font-semibold text-gray-900 sm:w-48">{key}:</span>
                      <span className="text-gray-700">{value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <div className="text-center py-12">
                  <Star className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Avaliações em Breve</h3>
                  <p className="text-gray-600">Sistema de avaliações será implementado em breve</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Similar Products */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Produtos Similares</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {similarProducts.map((similar, index) => (
                <Link 
                  key={index}
                  href={`/ecommerce/product/${similar.id}`}
                  className="group space-y-3"
                >
                  <div className="relative aspect-square bg-white rounded-lg overflow-hidden border hover:shadow-md transition-all">
                    <Image
                      src={similar.image}
                      alt={similar.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {similar.name}
                    </h4>
                    <p className="text-green-600 font-bold">{similar.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}