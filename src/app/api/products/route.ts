/**
 * ARCO API Routes - Professional Backend Architecture
 * Clean API endpoints with validation, error handling, and proper HTTP methods
 */

import { NextRequest, NextResponse } from 'next/server';
import { mongodbService } from '@/lib/mongodb';
import { getCurrentUser, isAdmin } from '@/lib/auth';
import { auditLogService } from '@/lib/auditLog';
import { z } from 'zod';

// Validation schemas
const ProductSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  price: z.number().positive('Price must be positive'),
  original_price: z.number().positive().optional(),
  discount_percentage: z.number().min(0).max(100).optional(),
  affiliate_link: z.string().url('Must be a valid URL'),
  source_platform: z.string().min(1, 'Platform is required'),
  main_image: z.string().url().optional(),
  additional_images: z.array(z.string().url()).optional(),
  category: z.string().optional(),
  brand: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
  reviews_count: z.number().min(0).optional(),
  in_stock: z.boolean(),
  stock_quantity: z.number().min(0).optional(),
  slug: z.string().min(1, 'Slug is required'),
  tags: z.array(z.string()).optional(),
  featured: z.boolean(),
  active: z.boolean(),
});

const ProductUpdateSchema = ProductSchema.partial();

const ProductFiltersSchema = z.object({
  active: z.boolean().optional(),
  featured: z.boolean().optional(),
  category: z.string().optional(),
  limit: z.number().positive().optional(),
});

// Error handling utility
function handleError(error: unknown) {
  console.error('API Error:', error);
  
  if (error instanceof z.ZodError) {
    return NextResponse.json(
      { 
        error: 'Validation failed', 
        details: error.errors 
      },
      { status: 400 }
    );
  }
  
  if (error instanceof Error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
  
  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  );
}

// GET /api/products - List products with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const filters = ProductFiltersSchema.parse({
      active: searchParams.get('active') ? searchParams.get('active') === 'true' : undefined,
      featured: searchParams.get('featured') ? searchParams.get('featured') === 'true' : undefined,
      category: searchParams.get('category') || undefined,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined,
    });

    const products = await mongodbService.getProducts(filters);
    
    return NextResponse.json({
      success: true,
      data: products,
      total: products.length
    });
  } catch (error) {
    return handleError(error);
  }
}

// POST /api/products - Create new product (Admin only)
export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!isAdmin(user)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const validatedData = ProductSchema.parse(body);
    
    // Ensure required fields have defaults
    const productData = {
      ...validatedData,
      description: validatedData.description || '',
      main_image: validatedData.main_image || '',
      category: validatedData.category || 'Geral',
      additional_images: validatedData.additional_images || [],
      tags: validatedData.tags || [],
    };
    
    const newProduct = await mongodbService.addProduct(productData);
    
    if (!newProduct) {
      return NextResponse.json(
        { error: 'Failed to create product' },
        { status: 500 }
      );
    }

    // Log the admin action
    await auditLogService.logAction({
      user: user!,
      action: 'CREATE_PRODUCT',
      target: { id: newProduct.id, type: 'product' },
    });
    
    return NextResponse.json({
      success: true,
      data: newProduct
    }, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}