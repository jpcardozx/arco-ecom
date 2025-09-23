/**
 * ARCO API - Individual Product Operations
 * GET /api/products/[id] - Get single product
 * PUT /api/products/[id] - Update product
 * DELETE /api/products/[id] - Delete product
 */

import { NextRequest, NextResponse } from 'next/server';
import { sqliteService } from '@/lib/sqlite';
import { z } from 'zod';

// Validation schemas
const ProductUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  price: z.number().positive().optional(),
  original_price: z.number().positive().optional(),
  discount_percentage: z.number().min(0).max(100).optional(),
  affiliate_link: z.string().url().optional(),
  source_platform: z.string().min(1).optional(),
  main_image: z.string().url().optional(),
  additional_images: z.array(z.string().url()).optional(),
  category: z.string().optional(),
  brand: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
  reviews_count: z.number().min(0).optional(),
  in_stock: z.boolean().optional(),
  stock_quantity: z.number().min(0).optional(),
  slug: z.string().min(1).optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  active: z.boolean().optional(),
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

// GET /api/products/[id] - Get single product
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const product = sqliteService.getProductById(params.id);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: product
    });
  } catch (error) {
    return handleError(error);
  }
}

// PUT /api/products/[id] - Update product
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const body = await request.json();
    const validatedData = ProductUpdateSchema.parse(body);
    
    const success = sqliteService.updateProduct(params.id, validatedData);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    const updatedProduct = sqliteService.getProductById(params.id);
    
    return NextResponse.json({
      success: true,
      data: updatedProduct
    });
  } catch (error) {
    return handleError(error);
  }
}

// DELETE /api/products/[id] - Delete product
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const success = sqliteService.deleteProduct(params.id);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    return handleError(error);
  }
}