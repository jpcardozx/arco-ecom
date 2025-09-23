/**
 * ARCO E-commerce Shared Components
 * Reusable components to avoid code duplication
 */

import React from 'react';
import { Badge } from '@/components/design-system/primitives/badge';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

// Platform Badge Component
interface PlatformBadgeProps {
  platform: 'amazon' | 'magalu' | 'shopee' | 'mercadolivre';
  className?: string;
}

export function PlatformBadge({ platform, className }: PlatformBadgeProps) {
  const getPlatformConfig = (platform: string) => {
    switch (platform) {
      case 'amazon': 
        return { 
          color: 'bg-orange-100 text-orange-800 border-orange-200',
          label: 'AMAZON',
          icon: '🛒'
        };
      case 'magalu': 
        return { 
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          label: 'MAGALU',
          icon: '💙'
        };
      case 'shopee': 
        return { 
          color: 'bg-orange-100 text-orange-800 border-orange-200',
          label: 'SHOPEE',
          icon: '🧡'
        };
      case 'mercadolivre': 
        return { 
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          label: 'MERCADO LIVRE',
          icon: '💛'
        };
      default: 
        return { 
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          label: 'UNKNOWN',
          icon: '❓'
        };
    }
  };

  const config = getPlatformConfig(platform);

  return (
    <Badge className={cn("text-xs font-medium", config.color, className)}>
      <span className="mr-1">{config.icon}</span>
      {config.label}
    </Badge>
  );
}

// Status Badge Component
interface StatusBadgeProps {
  status: 'active' | 'paused' | 'expired' | 'pending' | 'review';
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active': 
        return { 
          color: 'bg-green-100 text-green-800 border-green-200',
          label: 'Ativo'
        };
      case 'paused': 
        return { 
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          label: 'Pausado'
        };
      case 'expired': 
        return { 
          color: 'bg-red-100 text-red-800 border-red-200',
          label: 'Expirado'
        };
      case 'pending': 
        return { 
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          label: 'Pendente'
        };
      case 'review': 
        return { 
          color: 'bg-purple-100 text-purple-800 border-purple-200',
          label: 'Em Análise'
        };
      default: 
        return { 
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          label: 'Desconhecido'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge className={cn("text-xs", config.color, className)}>
      {config.label}
    </Badge>
  );
}

// Rating Component
interface RatingProps {
  rating: number;
  reviews?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  className?: string;
}

export function Rating({ rating, reviews, size = 'md', showCount = true, className }: RatingProps) {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          sizeClasses[size],
          i < Math.floor(rating) 
            ? "fill-yellow-400 text-yellow-400" 
            : "fill-gray-200 text-gray-200"
        )}
      />
    ));
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex">{renderStars(rating)}</div>
      {showCount && reviews && (
        <span className={cn("text-gray-600", textSizeClasses[size])}>
          {rating} ({reviews.toLocaleString()})
        </span>
      )}
    </div>
  );
}

// Price Component
interface PriceProps {
  price: string;
  originalPrice?: string;
  discount?: string;
  commission?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Price({ price, originalPrice, discount, commission, size = 'md', className }: PriceProps) {
  const priceClasses = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl'
  };

  const originalPriceClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex items-center gap-2 flex-wrap">
        <span className={cn("font-bold text-green-600", priceClasses[size])}>
          {price}
        </span>
        {originalPrice && (
          <span className={cn("text-gray-500 line-through", originalPriceClasses[size])}>
            {originalPrice}
          </span>
        )}
        {discount && (
          <Badge className="bg-red-500 hover:bg-red-600 text-xs">
            -{discount}
          </Badge>
        )}
      </div>
      {commission && (
        <p className="text-xs text-gray-500">
          Comissão: {commission}
        </p>
      )}
    </div>
  );
}

// Loading Skeleton for Product Cards
export function ProductCardSkeleton() {
  return (
    <div className="space-y-3 p-4 border rounded-lg">
      <div className="h-48 bg-gray-200 rounded animate-pulse" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
        <div className="h-8 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
}