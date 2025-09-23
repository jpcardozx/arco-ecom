/**
 * ARCO Image Upload API
 * Endpoint para upload manual de imagens de produtos
 * Integrado com Supabase Storage para máxima performance
 */

import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, isAdmin } from '@/lib/auth';
import { imageStorageService } from '@/lib/supabase/client';

// POST /api/products/images - Upload product images (Admin only)
export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!isAdmin(user)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const formData = await request.formData();
    const files = formData.getAll('images') as File[];
    const productId = formData.get('productId') as string;
    const imageType = formData.get('imageType') as 'main' | 'gallery' || 'gallery';

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No images provided' }, { status: 400 });
    }

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    console.log(`📸 Processando upload de ${files.length} imagem(ns) para produto ${productId}`);
    
    const uploadedImages: { url: string; path: string }[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        return NextResponse.json(
          { error: `File ${file.name} is not a valid image` }, 
          { status: 400 }
        );
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { error: `File ${file.name} is too large (max 5MB)` }, 
          { status: 400 }
        );
      }

      try {
        const path = imageStorageService.generateImagePath(productId, imageType, i);
        const result = await imageStorageService.uploadImage(file, path);
        uploadedImages.push(result);
        console.log(`✅ Imagem ${i + 1} salva: ${result.url}`);
      } catch (error) {
        console.error(`❌ Erro ao fazer upload da imagem ${file.name}:`, error);
        return NextResponse.json(
          { error: `Failed to upload ${file.name}` }, 
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      images: uploadedImages,
      message: `${uploadedImages.length} image(s) uploaded successfully`
    });

  } catch (error) {
    console.error('❌ Image upload API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/products/images - Delete product image (Admin only)
export async function DELETE(request: NextRequest) {
  const user = await getCurrentUser();
  if (!isAdmin(user)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const imagePath = searchParams.get('path');

    if (!imagePath) {
      return NextResponse.json({ error: 'Image path is required' }, { status: 400 });
    }

    await imageStorageService.deleteImage(imagePath);
    console.log(`🗑️ Imagem removida: ${imagePath}`);

    return NextResponse.json({
      success: true,
      message: 'Image deleted successfully'
    });

  } catch (error) {
    console.error('❌ Image deletion API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}