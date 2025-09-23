/**
 * ARCO Product Types - S-Tier Type System
 * Clean, hierarchical type definitions for product data
 */

export type ProductCategory = 'electronics' | 'fashion' | 'home' | 'sports' | 'books' | 'automotive' | 'health' | 'gaming';

export type ProductBrand = 'samsung' | 'apple' | 'nike' | 'adidas' | 'sony' | 'lg' | 'microsoft' | 'generic';

export type PricingTier = 'budget' | 'mid' | 'premium' | 'luxury';

export type ProductPlatform = 'mercadolivre' | 'amazon' | 'shopee' | 'aliexpress' | 'magazine-luiza' | 'casas-bahia';

export type ProductRegion = 'BR' | 'US' | 'EU' | 'LATAM' | 'GLOBAL';

export type ProductCondition = 'new' | 'used' | 'refurbished' | 'open-box';

export type ShippingType = 'free' | 'standard' | 'express' | 'pickup';

export interface ProductDimensions {
  length: number;
  width: number;
  height: number;
  weight: number;
  unit: 'cm' | 'in';
  weightUnit: 'kg' | 'lb';
}

export interface ProductImage {
  url: string;
  alt: string;
  type: 'primary' | 'gallery' | 'thumbnail' | 'zoom';
  size: { width: number; height: number };
}

export interface ProductSpecification {
  key: string;
  label: string;
  value: string;
  category: 'technical' | 'physical' | 'performance' | 'compatibility';
}

export interface ProductFeature {
  title: string;
  description: string;
  icon?: string;
  highlighted: boolean;
}

export interface ProductPricing {
  current: number;
  original?: number;
  currency: string;
  discount_percentage?: number;
  installments?: {
    count: number;
    value: number;
    interest_free: boolean;
  };
  price_history?: {
    date: string;
    price: number;
  }[];
}

export interface ProductRating {
  average: number;
  count: number;
  distribution: {
    stars: 1 | 2 | 3 | 4 | 5;
    count: number;
    percentage: number;
  }[];
}

export interface ProductShipping {
  type: ShippingType;
  free: boolean;
  cost?: number;
  estimated_days: number;
  regions: string[];
  express_available: boolean;
  pickup_available: boolean;
  restrictions?: string[];
}

export interface ProductAvailability {
  in_stock: boolean;
  quantity?: number;
  stock_level: 'high' | 'medium' | 'low' | 'out';
  restock_date?: string;
  last_updated: string;
  warehouse_locations?: string[];
}

export interface ProductSeller {
  id: string;
  name: string;
  rating: number;
  reviews_count: number;
  verified: boolean;
  location: string;
  response_time: string;
  return_policy: string;
  seller_since: string;
  badges?: string[];
}

export interface ProductWarranty {
  duration: string;
  type: 'manufacturer' | 'seller' | 'extended';
  coverage: string[];
  terms_url?: string;
}

export interface ParsedProductCore {
  id: string;
  title: string;
  description: string;
  category: ProductCategory;
  brand?: ProductBrand;
  model?: string;
  condition: ProductCondition;
  source_platform: ProductPlatform;
  source_url: string;
  affiliate_link?: string;
  slug: string;
  sku?: string;
  gtin?: string; // Global Trade Item Number
  created_at: string;
  updated_at: string;
  active: boolean;
  featured: boolean;
}

export interface ParsedProductExtended extends ParsedProductCore {
  pricing: ProductPricing;
  images: ProductImage[];
  specifications: ProductSpecification[];
  features: ProductFeature[];
  rating?: ProductRating;
  shipping: ProductShipping;
  availability: ProductAvailability;
  seller: ProductSeller;
  warranty?: ProductWarranty;
  dimensions?: ProductDimensions;
  tags: string[];
  related_products?: string[];
  categories_path: string[];
}

// Legacy compatibility (for existing code)
export interface Product extends ParsedProductCore {
  price: number;
  original_price?: number;
  discount_percentage?: number;
  main_image: string;
  additional_images: string[];
  rating?: number;
  reviews_count?: number;
  in_stock: boolean;
  stock_quantity?: number;
}

export interface ParsedProduct {
  success: boolean;
  title: string;
  description: string;
  price: number;
  original_price?: number;
  image: string;
  additional_images?: string[];
  rating?: number;
  reviews_count?: number;
  features?: string[];
  specifications?: Record<string, string>;
  shipping?: {
    free: boolean;
    estimated_days: number;
  };
  availability?: {
    in_stock: boolean;
    quantity?: number;
  };
  seller?: {
    name: string;
    rating: number;
    verified: boolean;
  };
}

// Configuration Types
export interface ProductGenerationConfig {
  category: ProductCategory;
  brand?: ProductBrand;
  pricing_tier: PricingTier;
  platform: ProductPlatform;
  region: ProductRegion;
  condition?: ProductCondition;
  featured?: boolean;
  include_extended_data?: boolean;
}

export interface ProductDataSourceConfig {
  mock_mode: boolean;
  cache_duration: number;
  default_region: ProductRegion;
  default_currency: string;
  image_quality: 'low' | 'medium' | 'high';
  include_analytics: boolean;
}