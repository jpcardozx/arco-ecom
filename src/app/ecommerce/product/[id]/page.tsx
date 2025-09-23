/**
 * ARCO Dynamic Product Detail Page
 * Página de detalhes do produto com dados dinâmicos do banco
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Produto ${id} - ARCO Shopping`,
    description: 'Detalhes do produto premium no marketplace ARCO',
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  
  // Mock product data since we removed the database components
  const product = {
    id: id,
    name: `Produto Premium ${id}`,
    price: 199.99,
    description: 'Este é um produto premium selecionado especialmente para você.',
    category: 'Tecnologia',
    rating: 4.8,
    reviews: 127,
    inStock: true
  };

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 text-lg">Imagem do Produto</p>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">{product.category}</Badge>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl font-bold text-green-600">
                  R$ {product.price.toFixed(2)}
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★★★★★</span>
                  <span className="text-sm text-gray-600">({product.reviews} avaliações)</span>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Descrição</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{product.description}</p>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Comprar Agora
              </Button>
              <Button variant="outline" size="lg" className="w-full">
                Adicionar ao Carrinho
              </Button>
            </div>

            <div className="text-sm text-gray-600">
              <p>✅ Produto em estoque</p>
              <p>🚚 Entrega grátis para compras acima de R$ 150</p>
              <p>🔒 Compra 100% segura e garantida</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}