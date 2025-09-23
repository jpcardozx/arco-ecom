/**
 * ARCO - Detailed Product Visualization Page
 * S-Tier implementation for Mercado Livre product visualization
 */

import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Visualização de Produto</CardTitle>
            <CardDescription>Produto carregado de: {decodedUrl}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-6">
              <p className="text-gray-500">Carregando produto...</p>
            </div>
            <div className="space-y-4">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                Ver Produto Original
              </Button>
              <p className="text-sm text-gray-600 text-center">
                URL: <code className="bg-gray-100 px-2 py-1 rounded">{decodedUrl}</code>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}