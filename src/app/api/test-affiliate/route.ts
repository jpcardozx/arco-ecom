import { NextRequest, NextResponse } from 'next/server';
import { affiliateLinkParser as linkParser } from '@/lib/affiliate/link-parser';

/**
 * Test endpoint for affiliate link processing
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const testMode = searchParams.get('test') || 'sample';

  if (testMode === 'sample') {
    // Create sample products for testing
    const sampleProducts = [
      {
        url: 'https://produto.mercadolivre.com.br/MLB-1234567890',
        platform: 'mercadolivre' as const
      },
      {
        url: 'https://www.amazon.com.br/product/B01234567',
        platform: 'amazon' as const
      }
    ];

    const results = [];

    for (const sample of sampleProducts) {
      try {
        const result = await linkParser.parseLink(sample.url, {
          platform: sample.platform,
          extractImages: true,
          saveToDb: true
        });
        results.push({
          url: sample.url,
          platform: sample.platform,
          success: result.success,
          product: result.success && result.product ? {
            id: result.product.id,
            title: result.product.title,
            price: result.product.price,
            image: result.product.imageUrl
          } : null
        });
      } catch (error) {
        results.push({
          url: sample.url,
          platform: sample.platform,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return NextResponse.json({
      message: 'Test affiliate parsing completed',
      results
    });
  }

  return NextResponse.json({
    message: 'Affiliate link parser test endpoint',
    endpoints: {
      sample: '/api/test-affiliate?test=sample'
    }
  });
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    const result = await linkParser.parseLink(url, {
      platform: 'generic',
      extractImages: true,
      saveToDb: true
    });

    return NextResponse.json({
      success: true,
      result
    });

  } catch (error) {
    console.error('Test affiliate parsing error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}