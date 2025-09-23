/**
 * ARCO Product Card Component
 * S-tier product card with professional design
 */

'use client';

import React from 'react';
import { Button } from '@/components/design-system/primitives/button';
import { Card, CardContent, CardHeader } from '@/components/design-system/primitives/card';
import { Badge } from '@/components/design-system/primitives/badge';
import { 
  ShoppingCart, 
  ExternalLink, 
  Heart,
  Share,
  Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PlatformBadge, Rating, Price } from '../shared';
import Image from 'next/image';
import Link from 'next/link';

export interface Product {
  id: string;
  title: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  rating: number;
  reviews: number;
  category: string;
  platform: 'amazon' | 'magalu' | 'shopee' | 'mercadolivre';
  affiliateLink: string;
  image: string;
  commission: string;
  features: string[];
  inStock: boolean;
  badge?: {
    text: string;
    variant: 'bestseller' | 'new' | 'limited' | 'featured';
  };
}

interface ProductCardProps {
  product: Product;
  variant?: 'grid' | 'list' | 'featured';
  showQuickActions?: boolean;
  onFavorite?: (productId: string) => void;
  onShare?: (product: Product) => void;
  className?: string;
}

export function ProductCard({ 
  product, 
  variant = 'grid',
  showQuickActions = true,
  onFavorite,
  onShare,
  className 
}: ProductCardProps) {
  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onFavorite?.(product.id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onShare?.(product);
  };

  const getBadgeStyle = (badgeVariant: string) => {
    switch (badgeVariant) {
      case 'bestseller':
        return 'bg-yellow-500 text-white hover:bg-yellow-600';
      case 'new':
        return 'bg-green-500 text-white hover:bg-green-600';
      case 'limited':
        return 'bg-red-500 text-white hover:bg-red-600';
      case 'featured':
        return 'bg-purple-500 text-white hover:bg-purple-600';
      default:
        return 'bg-blue-500 text-white hover:bg-blue-600';
    }
  };

  if (variant === 'list') {
    return (
      <Card className={cn("group overflow-hidden hover:shadow-lg transition-all duration-300", className)}>
        <div className="flex">
          <div className="relative w-32 h-32 flex-shrink-0">
            <Link href={`/ecommerce/product/${product.id}`}>
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
            
            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.discount && (
                <Badge className="bg-red-500 hover:bg-red-600 text-xs">
                  -{product.discount}
                </Badge>
              )}
              {product.badge && (
                <Badge className={cn("text-xs", getBadgeStyle(product.badge.variant))}>
                  {product.badge.text}
                </Badge>
              )}
            </div>

            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="secondary" className="bg-gray-800 text-white text-xs">
                  Fora de Estoque
                </Badge>
              </div>
            )}
          </div>

          <CardContent className="flex-1 p-4 space-y-2">
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <PlatformBadge platform={product.platform} />
                
                <Link 
                  href={`/ecommerce/product/${product.id}`}
                  className="block hover:text-blue-600 transition-colors"
                >
                  <h3 className="font-semibold line-clamp-2 text-sm">
                    {product.title}
                  </h3>
                </Link>

                <Rating rating={product.rating} reviews={product.reviews} size="sm" />
                
                <Price 
                  price={product.price}
                  originalPrice={product.originalPrice}
                  discount={product.discount}
                  commission={product.commission}
                  size="sm"
                />
              </div>

              <div className="flex flex-col gap-2 ml-4">
                {showQuickActions && (
                  <div className="flex flex-col gap-1">
                    <Button size="sm" variant="ghost" onClick={handleFavorite} className="h-8 w-8 p-0">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={handleShare} className="h-8 w-8 p-0">
                      <Share className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                
                <Button 
                  size="sm"
                  disabled={!product.inStock}
                  asChild
                >
                  <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer">
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    {product.inStock ? 'Ver' : 'Indisponível'}
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }

  if (variant === 'featured') {
    return (
      <Card className={cn("group overflow-hidden hover:shadow-xl transition-all duration-500 border-2", className)}>
        <CardHeader className="p-0 relative">
          <div className="relative h-64 overflow-hidden">
            <Link href={`/ecommerce/product/${product.id}`}>
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </Link>
            
            {/* Enhanced Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.discount && (
                <Badge className="bg-red-500 hover:bg-red-600 shadow-lg">
                  -{product.discount}
                </Badge>
              )}
              {product.badge && (
                <Badge className={cn("shadow-lg", getBadgeStyle(product.badge.variant))}>
                  {product.badge.text}
                </Badge>
              )}
            </div>

            {/* Stock Status */}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="secondary" className="bg-gray-800 text-white">
                  Fora de Estoque
                </Badge>
              </div>
            )}

            {/* Quick Actions */}
            {showQuickActions && (
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button size="sm" variant="secondary" onClick={handleFavorite} className="h-10 w-10 p-0 shadow-lg">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="secondary" onClick={handleShare} className="h-10 w-10 p-0 shadow-lg">
                  <Share className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="secondary" asChild className="h-10 w-10 p-0 shadow-lg">
                  <Link href={`/ecommerce/product/${product.id}`}>
                    <Eye className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}

            {/* Platform Badge Overlay */}
            <div className="absolute bottom-4 left-4">
              <PlatformBadge platform={product.platform} className="shadow-lg" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          <Link 
            href={`/ecommerce/product/${product.id}`}
            className="block hover:text-blue-600 transition-colors"
          >
            <h3 className="text-lg font-bold line-clamp-2 group-hover:text-blue-600 transition-colors">
              {product.title}
            </h3>
          </Link>

          <Rating rating={product.rating} reviews={product.reviews} size="lg" />

          <div className="space-y-2">
            {product.features.slice(0, 3).map((feature, index) => (
              <div key={index} className="text-sm text-gray-600 flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3" />
                {feature}
              </div>
            ))}
          </div>

          <Price 
            price={product.price}
            originalPrice={product.originalPrice}
            discount={product.discount}
            commission={product.commission}
            size="lg"
          />

          <Button 
            className="w-full group/btn"
            size="lg"
            disabled={!product.inStock}
            asChild
          >
            <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer">
              <ShoppingCart className="h-4 w-4 mr-2" />
              {product.inStock ? 'Ver Oferta Completa' : 'Indisponível'}
              <ExternalLink className="h-3 w-3 ml-2 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
            </a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Default grid variant
  return (
    <Card className={cn("group overflow-hidden hover:shadow-lg transition-all duration-300", className)}>
      <CardHeader className="p-0 relative">
        <div className="relative h-48 overflow-hidden">
          <Link href={`/ecommerce/product/${product.id}`}>
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.discount && (
              <Badge className="bg-red-500 hover:bg-red-600 text-xs">
                -{product.discount}
              </Badge>
            )}
            {product.badge && (
              <Badge className={cn("text-xs", getBadgeStyle(product.badge.variant))}>
                {product.badge.text}
              </Badge>
            )}
          </div>

          {/* Stock Status */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="secondary" className="bg-gray-800 text-white">
                Fora de Estoque
              </Badge>
            </div>
          )}

          {/* Quick Actions */}
          {showQuickActions && (
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="sm" variant="secondary" onClick={handleFavorite} className="h-8 w-8 p-0">
                <Heart className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="secondary" onClick={handleShare} className="h-8 w-8 p-0">
                <Share className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        <PlatformBadge platform={product.platform} />

        <Link 
          href={`/ecommerce/product/${product.id}`}
          className="block hover:text-blue-600 transition-colors"
        >
          <h3 className="text-sm font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.title}
          </h3>
        </Link>

        <Rating rating={product.rating} reviews={product.reviews} />

        <Price 
          price={product.price}
          originalPrice={product.originalPrice}
          discount={product.discount}
          commission={product.commission}
        />

        <div className="space-y-1">
          {product.features.slice(0, 2).map((feature, index) => (
            <div key={index} className="text-xs text-gray-600 flex items-center">
              <span className="w-1 h-1 bg-gray-400 rounded-full mr-2" />
              {feature}
            </div>
          ))}
        </div>

        <Button 
          className="w-full group/btn"
          disabled={!product.inStock}
          asChild
        >
          <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer">
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.inStock ? 'Ver Oferta' : 'Indisponível'}
            <ExternalLink className="h-3 w-3 ml-2 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}