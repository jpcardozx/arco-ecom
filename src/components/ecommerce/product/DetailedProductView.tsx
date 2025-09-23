/**
 * ARCO - Detailed Product View Component
 * S-Tier UI/UX for comprehensive product visualization
 */

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/design-system/primitives/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/design-system/primitives/card';
import { Badge } from '@/components/design-system/primitives/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/design-system/primitives/tabs';
import { 
  ArrowLeft,
  ExternalLink,
  Heart,
  Share2,
  Star,
  StarHalf,
  Shield,
  Truck,
  RotateCcw,
  MapPin,
  Clock,
  Check,
  ShoppingCart,
  Zap,
  Award,
  Users,
  TrendingUp,
  Eye,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface DetailedProductData {
  success: boolean;
  title: string;
  description: string;
  price: number;
  original_price?: number;
  discount_percentage?: number;
  image: string;
  additional_images: string[];
  platform: string;
  category: string;
  brand?: string;
  rating?: number;
  reviews_count?: number;
  specifications?: Record<string, string>;
  features?: string[];
  seller_info?: {
    name: string;
    rating: number;
    location: string;
  };
  shipping_info?: {
    free: boolean;
    estimated_days: number;
    methods: string[];
  };
  availability?: {
    in_stock: boolean;
    quantity?: number;
    location: string;
  };
  error?: string;
}

interface DetailedProductViewProps {
  url: string;
}

export function DetailedProductView({ url }: DetailedProductViewProps) {
  const [productData, setProductData] = useState<DetailedProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    fetchProductData();
  }, [url]);

  const fetchProductData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/parse-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: url,
          detailed: true
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch product data');
      }

      const result = await response.json();
      
      if (result.success) {
        setProductData(result.data);
      } else {
        setError(result.error || 'Failed to parse product');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  const handlePurchase = () => {
    if (productData) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: productData?.title,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled sharing
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600" />
          <p className="text-gray-600">Extraindo informações do produto...</p>
        </div>
      </div>
    );
  }

  if (error || !productData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <ExternalLink className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Erro ao carregar produto</h2>
            <p className="text-gray-600">{error || 'Não foi possível extrair as informações do produto.'}</p>
            <div className="flex gap-2 justify-center">
              <Button variant="outline" onClick={() => window.history.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <Button onClick={fetchProductData}>
                Tentar novamente
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const platformColors = {
    mercadolivre: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    amazon: 'bg-orange-100 text-orange-800 border-orange-200',
    shopee: 'bg-red-100 text-red-800 border-red-200',
    default: 'bg-gray-100 text-gray-800 border-gray-200',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link 
          href="/" 
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Link>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFavorited(!isFavorited)}
            className={cn(
              'transition-colors',
              isFavorited && 'bg-red-50 text-red-600 border-red-200'
            )}
          >
            <Heart className={cn('w-4 h-4 mr-2', isFavorited && 'fill-current')} />
            {isFavorited ? 'Favoritado' : 'Favoritar'}
          </Button>
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-2" />
            Compartilhar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Product Images */}
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-square relative">
                <Image
                  src={productData.additional_images[selectedImageIndex] || productData.image}
                  alt={productData.title}
                  fill
                  className="object-cover"
                  priority
                />
                {productData.discount_percentage && (
                  <Badge 
                    variant="destructive"
                    className="absolute top-4 left-4"
                  >
                    -{productData.discount_percentage}%
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Thumbnail Gallery */}
          {productData.additional_images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {productData.additional_images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={cn(
                    'aspect-square rounded-lg overflow-hidden border-2 transition-all',
                    selectedImageIndex === index 
                      ? 'border-blue-500 ring-2 ring-blue-200' 
                      : 'border-gray-200 hover:border-gray-300'
                  )}
                >
                  <Image
                    src={image}
                    alt={`${productData.title} - Imagem ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          {/* Platform Badge */}
          <Badge 
            variant="outline"
            className={cn(
              'w-fit',
              platformColors[productData.platform as keyof typeof platformColors] || platformColors.default
            )}
          >
            {productData.platform}
          </Badge>

          {/* Title and Description */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {productData.title}
            </h1>
            <p className="text-gray-600 leading-relaxed">
              {productData.description}
            </p>
          </div>

          {/* Rating and Reviews */}
          {productData.rating && (
            <div className="flex items-center gap-2">
              <div className="flex">
                {renderStars(productData.rating)}
              </div>
              <span className="text-sm font-medium text-gray-900">
                {productData.rating.toFixed(1)}
              </span>
              {productData.reviews_count && (
                <span className="text-sm text-gray-500">
                  ({productData.reviews_count.toLocaleString()} avaliações)
                </span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-green-600">
                {formatPrice(productData.price)}
              </span>
              {productData.original_price && (
                <span className="text-lg text-gray-500 line-through">
                  {formatPrice(productData.original_price)}
                </span>
              )}
            </div>
            {productData.shipping_info?.free && (
              <div className="flex items-center text-sm text-green-600">
                <Truck className="w-4 h-4 mr-1" />
                Frete grátis
              </div>
            )}
          </div>

          {/* Purchase Button */}
          <div className="space-y-3">
            <Button 
              size="lg" 
              className="w-full"
              onClick={handlePurchase}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Comprar no {productData.platform}
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
            
            {/* Quick Info */}
            <div className="grid grid-cols-3 gap-2 text-xs">
              {productData.availability?.in_stock && (
                <div className="flex items-center justify-center p-2 bg-green-50 rounded-lg">
                  <Check className="w-3 h-3 text-green-600 mr-1" />
                  <span className="text-green-700">Em estoque</span>
                </div>
              )}
              {productData.shipping_info && (
                <div className="flex items-center justify-center p-2 bg-blue-50 rounded-lg">
                  <Clock className="w-3 h-3 text-blue-600 mr-1" />
                  <span className="text-blue-700">{productData.shipping_info.estimated_days} dias</span>
                </div>
              )}
              {productData.seller_info && (
                <div className="flex items-center justify-center p-2 bg-purple-50 rounded-lg">
                  <Award className="w-3 h-3 text-purple-600 mr-1" />
                  <span className="text-purple-700">Verificado</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Information Tabs */}
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="specifications">Especificações</TabsTrigger>
              <TabsTrigger value="features">Características</TabsTrigger>
              <TabsTrigger value="seller">Vendedor</TabsTrigger>
              <TabsTrigger value="shipping">Entrega</TabsTrigger>
            </TabsList>
            
            <TabsContent value="specifications" className="mt-6">
              {productData.specifications && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(productData.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">{key}</span>
                      <span className="text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="features" className="mt-6">
              {productData.features && (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {productData.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
            </TabsContent>
            
            <TabsContent value="seller" className="mt-6">
              {productData.seller_info && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{productData.seller_info.name}</h3>
                    <div className="flex items-center">
                      {renderStars(productData.seller_info.rating)}
                      <span className="ml-2 text-sm font-medium">
                        {productData.seller_info.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {productData.seller_info.location}
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="shipping" className="mt-6">
              {productData.shipping_info && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Frete</span>
                    <span className={cn(
                      'font-semibold',
                      productData.shipping_info.free ? 'text-green-600' : 'text-gray-900'
                    )}>
                      {productData.shipping_info.free ? 'Grátis' : 'Consulte valores'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Prazo de entrega</span>
                    <span className="text-gray-900">
                      {productData.shipping_info.estimated_days} {productData.shipping_info.estimated_days === 1 ? 'dia útil' : 'dias úteis'}
                    </span>
                  </div>
                  {productData.shipping_info.methods.length > 0 && (
                    <div>
                      <span className="font-medium block mb-2">Modalidades disponíveis</span>
                      <div className="flex flex-wrap gap-2">
                        {productData.shipping_info.methods.map((method, index) => (
                          <Badge key={index} variant="outline">
                            {method}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}