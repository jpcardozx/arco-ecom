/**
 * ARCO Product Card - S-Tier UI/UX Component
 * Premium product display with glassmorphism and micro-interactions
 */

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/design-system/primitives/button';
import { Badge } from '@/components/design-system/primitives/badge';
import { Card, CardContent } from '@/components/design-system/primitives/card';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  ExternalLink, 
  TrendingUp,
  Shield,
  Truck,
  Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product } from '@/lib/api-client';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'featured' | 'compact';
  showActions?: boolean;
  onFavorite?: (productId: string) => void;
  onView?: (product: Product) => void;
  className?: string;
}

export function ProductCard({
  product,
  variant = 'default',
  showActions = true,
  onFavorite,
  onView,
  className
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    onFavorite?.(product.id);
  };

  const handleView = () => {
    onView?.(product);
  };

  const handlePurchase = () => {
    window.open(product.affiliate_link, '_blank', 'noopener,noreferrer');
  };

  const discountAmount = product.original_price 
    ? product.original_price - product.price 
    : 0;

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const formatRating = (rating: number) => {
    return rating.toFixed(1);
  };

  const platformColors = {
    mercadolivre: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    amazon: 'bg-orange-100 text-orange-800 border-orange-200',
    shopee: 'bg-red-100 text-red-800 border-red-200',
    default: 'bg-gray-100 text-gray-800 border-gray-200',
  };

  const cardVariants = {
    default: 'aspect-[3/4]',
    featured: 'aspect-[4/3] md:aspect-[3/2]',
    compact: 'aspect-[4/3]',
  };

  return (
    <Card
      className={cn(
        'group relative overflow-hidden border-0 bg-gradient-to-br from-white/80 to-white/60',
        'backdrop-blur-lg shadow-lg hover:shadow-2xl transition-all duration-500',
        'hover:scale-[1.02] hover:-translate-y-1',
        variant === 'featured' && 'md:col-span-2 md:row-span-1',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Product Image Container */}
      <div className={cn('relative overflow-hidden', cardVariants[variant])}>
        {product.main_image ? (
          <>
            <Image
              src={product.main_image}
              alt={product.title}
              fill
              className={cn(
                'object-cover transition-all duration-700 group-hover:scale-110',
                imageLoaded ? 'opacity-100' : 'opacity-0'
              )}
              onLoad={() => setImageLoaded(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
            )}
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <ShoppingCart className="h-12 w-12 text-gray-400" />
          </div>
        )}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {(product.discount_percentage || 0) > 0 && (
            <Badge className="bg-red-500 text-white font-bold shadow-lg">
              -{product.discount_percentage}%
            </Badge>
          )}
          {product.featured && (
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg">
              ⭐ Destaque
            </Badge>
          )}
        </div>

        {/* Platform Badge */}
        <div className="absolute top-3 right-3">
          <Badge 
            variant="outline" 
            className={cn(
              'font-medium shadow-lg backdrop-blur-sm',
              platformColors[product.source_platform as keyof typeof platformColors] || 
              platformColors.default
            )}
          >
            {product.source_platform.toUpperCase()}
          </Badge>
        </div>

        {/* Quick Actions (on hover) */}
        {showActions && (
          <div className={cn(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            'flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300',
            'transform scale-75 group-hover:scale-100'
          )}>
            <Button
              size="sm"
              variant="secondary"
              className="rounded-full h-10 w-10 p-0 backdrop-blur-md bg-white/90 shadow-lg"
              onClick={handleView}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className={cn(
                'rounded-full h-10 w-10 p-0 backdrop-blur-md shadow-lg',
                isFavorited 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-white/90 hover:bg-red-50'
              )}
              onClick={handleFavorite}
            >
              <Heart className={cn('h-4 w-4', isFavorited && 'fill-current')} />
            </Button>
          </div>
        )}

        {/* Trust Indicators */}
        <div className="absolute bottom-3 left-3 flex gap-1">
          {product.in_stock && (
            <div className="bg-green-500/90 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
              <Truck className="h-3 w-3 inline mr-1" />
              Em estoque
            </div>
          )}
        </div>
      </div>

      {/* Product Info */}
      <CardContent className="p-4 space-y-3">
        {/* Rating */}
                {(product.rating || 0) > 0 && (
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4 transition-colors duration-200",
                    i < Math.floor(product.rating || 0)
                      ? "text-yellow-400 fill-current" 
                      : "text-gray-300"
                  )}
                />
              ))}
            </div>
            <div className="text-sm text-primary-600">
              {formatRating(product.rating || 0)}
              <span className="text-primary-400 ml-1">
                ({(product.reviews_count || 0).toLocaleString()})
              </span>
            </div>
          </div>
        )}

        {/* Title */}
        <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm leading-relaxed">
          {product.title}
        </h3>

        {/* Brand */}
        {product.brand && (
          <p className="text-xs text-gray-600 font-medium">
            {product.brand}
          </p>
        )}

        {/* Price Section */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-green-600">
              {formatPrice(product.price)}
            </span>
            {product.original_price && product.original_price > product.price && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.original_price)}
              </span>
            )}
          </div>
          
          {discountAmount > 0 && (
            <div className="flex items-center gap-1 text-xs text-green-600">
              <TrendingUp className="h-3 w-3" />
              <span>Economize {formatPrice(discountAmount)}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {(product.tags?.length || 0) > 0 && (
          <div className="flex flex-wrap gap-1">
            {(product.tags || []).slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600"
              >
                {tag}
              </Badge>
            ))}
            {(product.tags?.length || 0) > 3 && (
              <Badge
                variant="secondary"
                className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500"
              >
                +{(product.tags?.length || 0) - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Action Buttons */}
        {showActions && (
          <div className="space-y-2">
            {/* View Details Button */}
            <Button
              variant="outline"
              onClick={handleView}
              className="w-full border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300"
            >
              <Eye className="h-4 w-4 mr-2" />
              Ver Detalhes
            </Button>
            
            {/* Purchase Button */}
            <Button
              onClick={handlePurchase}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg transition-all duration-300"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Comprar Agora
              <ExternalLink className="h-3 w-3 ml-2" />
            </Button>
          </div>
        )}
      </CardContent>

      {/* Hover Effect Ring */}
      <div className="absolute inset-0 ring-1 ring-blue-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </Card>
  );
}