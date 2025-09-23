/**
 * ARCO - Detailed Product Visualization Page
 * S-Tier implementation for Mercado Livre product visualization
 */

import { Metadata } from 'next';
import { DetailedProductView } from '@/components/ecommerce/product/DetailedProductView';
import { notFound } from 'next/navigation';

interface ProductViewPageProps {
  searchParams: Promise<{
    url?: string;
  }>;
}

export async function generateMetadata({ searchParams }: ProductViewPageProps): Promise<Metadata> {
  const params = await searchParams;
  
  return {
    title: 'Visualização Detalhada - ARCO',
    description: 'Visualização detalhada de produto extraído automaticamente',
    robots: 'noindex,nofollow', // Since this is dynamic content
  };
}

export default async function ProductViewPage({ searchParams }: ProductViewPageProps) {
  const params = await searchParams;
  const { url } = params;
  
  if (!url) {
    notFound();
  }

  // Decode URL if needed
  const decodedUrl = decodeURIComponent(url);
  
  // Validate if it's a supported URL
  const isSupportedUrl = 
    decodedUrl.includes('mercadolivre.com') || 
    decodedUrl.includes('mercadolibre.com') ||
    decodedUrl.includes('amazon.com') || 
    decodedUrl.includes('shopee.com');
    
  if (!isSupportedUrl) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <DetailedProductView url={decodedUrl} />
    </main>
  );
}