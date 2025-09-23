/**
 * ARCO Link Parser API - S-Tier Clean Architecture
 * Eliminates hardcoded data, uses hierarchical product generation
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { productDataSource } from '@/lib/data-sources/product-data-source';
import { ProductCategory, ProductBrand, PricingTier } from '@/lib/types/product.types';

// Validation schemas
const ParseLinkSchema = z.object({
  url: z.string().url('Invalid URL format'),
  detailed: z.string().optional().transform(val => val === 'true')
});

interface ParsedProduct {
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const validation = ParseLinkSchema.safeParse({
      url: searchParams.get('url'),
      detailed: searchParams.get('detailed')
    });

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid parameters', details: validation.error.errors },
        { status: 400 }
      );
    }

    const { url, detailed } = validation.data;

    // Parse platform and product context from URL
    const urlContext = parseUrlContext(url);
    
    if (detailed) {
      const detailedProduct = await generateDetailedProduct(url, urlContext);
      return NextResponse.json(detailedProduct, { status: 200 });
    } else {
      const basicProduct = await generateBasicProduct(url, urlContext);
      return NextResponse.json(basicProduct, { status: 200 });
    }

  } catch (error) {
    console.error('Parse link error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}

/**
 * Parse URL to extract platform and product context
 */
function parseUrlContext(url: string) {
  const urlObj = new URL(url);
  const hostname = urlObj.hostname.toLowerCase();
  
  // Determine platform
  let platform = 'generic';
  if (hostname.includes('mercadolivre') || hostname.includes('mercadolibre')) {
    platform = 'mercadolivre';
  } else if (hostname.includes('amazon')) {
    platform = 'amazon';
  } else if (hostname.includes('shopee')) {
    platform = 'shopee';
  }

  // Extract product ID for consistent generation
  const productId = extractProductId(url);

  // Determine category and brand from URL patterns
  const category = inferCategoryFromUrl(url);
  const brand = inferBrandFromUrl(url);
  const pricingTier = inferPricingTier(url, platform);

  return {
    platform,
    productId,
    category,
    brand,
    pricingTier,
    region: 'BR' as const
  };
}

function extractProductId(url: string): string {
  // Extract meaningful identifier from URL
  const urlObj = new URL(url);
  const pathSegments = urlObj.pathname.split('/').filter(Boolean);
  const searchParams = urlObj.searchParams;
  
  // Try various URL patterns
  const id = searchParams.get('id') || 
            pathSegments.find(segment => segment.match(/^[A-Z0-9]{8,}$/)) ||
            pathSegments[pathSegments.length - 1] ||
            'generic-product';
            
  return id.slice(0, 20); // Limit length
}

function inferCategoryFromUrl(url: string): ProductCategory {
  const urlLower = url.toLowerCase();
  
  if (urlLower.includes('smartphone') || urlLower.includes('celular') || urlLower.includes('iphone') || urlLower.includes('samsung')) {
    return 'electronics';
  }
  if (urlLower.includes('tenis') || urlLower.includes('sapato') || urlLower.includes('nike') || urlLower.includes('adidas')) {
    return 'fashion';
  }
  if (urlLower.includes('casa') || urlLower.includes('home') || urlLower.includes('movel')) {
    return 'home';
  }
  if (urlLower.includes('esporte') || urlLower.includes('sport') || urlLower.includes('fitness')) {
    return 'sports';
  }
  
  return 'electronics'; // Default
}

function inferBrandFromUrl(url: string): ProductBrand {
  const urlLower = url.toLowerCase();
  
  if (urlLower.includes('samsung')) return 'samsung';
  if (urlLower.includes('apple') || urlLower.includes('iphone')) return 'apple';
  if (urlLower.includes('nike')) return 'nike';
  if (urlLower.includes('adidas')) return 'adidas';
  if (urlLower.includes('sony')) return 'sony';
  if (urlLower.includes('lg')) return 'lg';
  if (urlLower.includes('microsoft')) return 'microsoft';
  
  return 'generic';
}

function inferPricingTier(url: string, platform: string): PricingTier {
  const urlLower = url.toLowerCase();
  
  // Platform-based inference
  if (platform === 'amazon') return 'premium';
  if (platform === 'shopee') return 'budget';
  
  // URL pattern-based inference
  if (urlLower.includes('premium') || urlLower.includes('pro') || urlLower.includes('plus')) {
    return 'premium';
  }
  if (urlLower.includes('basic') || urlLower.includes('lite') || urlLower.includes('mini')) {
    return 'budget';
  }
  
  return 'mid'; // Default
}

/**
 * Generate basic product data for card display
 */
async function generateBasicProduct(url: string, context: any): Promise<ParsedProduct> {
  const productData = productDataSource.generateProduct({
    category: context.category,
    brand: context.brand,
    pricingTier: context.pricingTier,
    platform: context.platform,
    region: context.region
  }, context.productId);

  return {
    success: true,
    title: productData.title,
    description: productData.description.substring(0, 200) + '...',
    price: productData.price,
    original_price: productData.original_price,
    image: productData.images[0],
    rating: productData.rating,
    reviews_count: productData.reviews_count
  };
}

/**
 * Generate detailed product data for full visualization
 */
async function generateDetailedProduct(url: string, context: any): Promise<ParsedProduct> {
  const productData = productDataSource.generateProduct({
    category: context.category,
    brand: context.brand,
    pricingTier: context.pricingTier,
    platform: context.platform,
    region: context.region
  }, context.productId);

  return {
    success: true,
    title: productData.title,
    description: productData.description,
    price: productData.price,
    original_price: productData.original_price,
    image: productData.images[0],
    additional_images: productData.images,
    rating: productData.rating,
    reviews_count: productData.reviews_count,
    features: productData.features,
    specifications: productData.specifications,
    shipping: {
      free: productData.shipping.free,
      estimated_days: productData.shipping.estimated_days
    },
    availability: {
      in_stock: productData.availability.in_stock,
      quantity: productData.availability.quantity
    },
    seller: {
      name: productData.seller.name,
      rating: productData.seller.rating,
      verified: productData.seller.verified
    }
  };
}