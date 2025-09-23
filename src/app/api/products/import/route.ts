/**
 * ARCO Dynamic Product Import API (MongoDB & Supabase Storage)
 * Endpoint para importar produtos automaticamente via links de afiliados
 * Imagens armazenadas no Supabase Storage para máxima performance
 */

import { NextRequest, NextResponse } from 'next/server';
import { productScraperService } from '@/lib/scrapers/product-scraper';
import { mongodbService } from '@/lib/mongodb';
import { getCurrentUser, isAdmin } from '@/lib/auth';
import { auditLogService } from '@/lib/auditLog';
import { imageStorageService } from '@/lib/supabase/client';
import { z } from 'zod';

// Validation schema
const ImportProductSchema = z.object({
  affiliate_link: z.string().url('Link de afiliado deve ser uma URL válida'),
  featured: z.boolean().optional().default(false),
  active: z.boolean().optional().default(true),
  override_category: z.string().optional(),
  override_brand: z.string().optional()
});

// POST /api/products/import - Import product from affiliate link (Admin only)
export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!isAdmin(user)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const validatedData = ImportProductSchema.parse(body);

    console.log(`🔄 Iniciando scraping para: ${validatedData.affiliate_link}`);

    // 1. Fazer scraping do produto
    const scrapedProduct = await productScraperService.scrapeProduct(
      validatedData.affiliate_link
    );

    console.log(`✅ Dados extraídos: ${scrapedProduct.title}`);

    let finalProductData = {
      ...scrapedProduct,
      category: validatedData.override_category || scrapedProduct.category,
      brand: validatedData.override_brand || scrapedProduct.brand,
      featured: validatedData.featured,
      active: validatedData.active
    };

    // 2. Upload de imagens para Supabase Storage
    if (finalProductData.main_image) {
      try {
        console.log(`📸 Processando imagem principal: ${finalProductData.main_image}`);
        const slug = finalProductData.slug;
        const mainImageResult = await imageStorageService.uploadImageFromUrl(
          finalProductData.main_image,
          `${slug}-main-${Date.now()}`
        );
        finalProductData.main_image = mainImageResult.url;
        console.log(`✅ Imagem principal salva: ${mainImageResult.url}`);
      } catch (error) {
        console.error(`⚠️ Falha no upload da imagem principal (mantendo URL original):`, error);
        // Continua com URL original se falhar upload
      }
    }

    // 3. Upload de galeria de imagens (se houver)
    if (finalProductData.additional_images && finalProductData.additional_images.length > 0) {
      console.log(`� Processando ${finalProductData.additional_images.length} imagens adicionais`);
      const uploadedImages: string[] = [];
      
      for (let i = 0; i < finalProductData.additional_images.length; i++) {
        try {
          const slug = finalProductData.slug;
          const imageResult = await imageStorageService.uploadImageFromUrl(
            finalProductData.additional_images[i],
            `${slug}-gallery-${i}-${Date.now()}`
          );
          uploadedImages.push(imageResult.url);
          console.log(`✅ Imagem ${i + 1} da galeria salva: ${imageResult.url}`);
        } catch (error) {
          console.error(`⚠️ Falha no upload da imagem ${i + 1} (mantendo URL original):`, error);
          uploadedImages.push(finalProductData.additional_images[i]);
        }
      }
      
      finalProductData.additional_images = uploadedImages;
    }

    // 4. Salvar no banco de dados
    const savedProduct = await mongodbService.addProduct(finalProductData);

    if (!savedProduct) {
      return NextResponse.json(
        { error: 'Falha ao salvar produto no banco de dados' },
        { status: 500 }
      );
    }

    console.log(`💾 Produto salvo no banco: ${savedProduct.id}`);

    // Log the admin action
    await auditLogService.logAction({
      user: user!,
      action: 'IMPORT_PRODUCT',
      target: { id: savedProduct.id, type: 'product' },
      changes: { affiliate_link: validatedData.affiliate_link }, // Log the source link
    });

    return NextResponse.json({
      success: true,
      message: 'Produto importado com sucesso',
      data: savedProduct,
      metadata: {
        scraped_from: finalProductData.source_platform,
        import_timestamp: new Date().toISOString()
      }
    }, { status: 201 });

  } catch (error) {
    console.error('❌ Erro na importação:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Dados de entrada inválidos',
          details: error.errors
        },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        { 
          error: 'Falha na importação do produto',
          details: error.message
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// GET /api/products/import/status - Check import capabilities
export async function GET() {
  return NextResponse.json({
    success: true,
    supported_platforms: productScraperService.getSupportedPlatforms(),
    example_usage: {
      endpoint: '/api/products/import',
      method: 'POST',
      body: {
        affiliate_link: 'https://amzn.to/4nE3ZAC',
        featured: true,
        override_category: 'Eletrônicos'
      }
    },
    instructions: {
      '1': 'Envie um POST com o link de afiliado no campo affiliate_link',
      '2': 'O sistema fará scraping automático dos dados do produto',
      '3': 'Os dados serão salvos no banco com slug único gerado',
      '4': 'Opcionalmente defina featured, active, categoria e marca'
    }
  });
}
