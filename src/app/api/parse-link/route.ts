import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { affiliateLinkParser as linkParser } from '@/lib/affiliate/link-parser';

/**
 * ARCO Link Parser API - S-Tier Clean Architecture
 * Uses new affiliate link parser and SQLite database
 */

// Validation schemas
const ParseLinkSchema = z.object({
  url: z.string().url('Invalid URL format'),
  platform: z.enum(['amazon', 'mercadolivre', 'shopee', 'magazine-luiza', 'casas-bahia', 'generic']).optional(),
  extractImages: z.string().optional().transform(val => val !== 'false'),
  saveToDb: z.string().optional().transform(val => val !== 'false')
});

interface ParsedProduct {
  success: boolean;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  currency: string;
  images: string[];
  availability: string;
  rating?: number;
  reviewCount?: number;
  brand?: string;
  category?: string;
  affiliateUrl: string;
  originalUrl: string;
  platform: string;
  lastUpdated: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, platform, extractImages, saveToDb } = ParseLinkSchema.parse(body);

    // Parse the affiliate link
    const result = await linkParser.parseLink(url, {
      platform: platform || 'generic',
      extractImages,
      saveToDb
    });

    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to parse link' },
        { status: 400 }
      );
    }

    return NextResponse.json(result);

  } catch (error) {
    console.error('Parse link API error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  const platform = searchParams.get('platform') as any;
  const extractImages = searchParams.get('extractImages') !== 'false';
  const saveToDb = searchParams.get('saveToDb') !== 'false';

  if (!url) {
    return NextResponse.json(
      { error: 'URL parameter is required' },
      { status: 400 }
    );
  }

  try {
    const { url: validatedUrl, platform: validatedPlatform, extractImages: validatedExtractImages, saveToDb: validatedSaveToDb } = ParseLinkSchema.parse({
      url,
      platform,
      extractImages: extractImages.toString(),
      saveToDb: saveToDb.toString()
    });

    const result = await linkParser.parseLink(validatedUrl, {
      platform: validatedPlatform || 'generic',
      extractImages: validatedExtractImages,
      saveToDb: validatedSaveToDb
    });

    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to parse link' },
        { status: 400 }
      );
    }

    return NextResponse.json(result);

  } catch (error) {
    console.error('Parse link API error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}