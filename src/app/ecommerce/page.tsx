/**
 * ARCO Shopping Center
 * Premium shopping experience with curated products
 * Best deals, quality products, trusted brands
 */

import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'ARCO Shopping - Premium Marketplace',
  description: 'Discover premium products and best deals in our curated marketplace',
};

export default async function EcommercePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ARCO Shopping Center
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Descubra produtos premium com as melhores ofertas em nosso marketplace curado
          </p>
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            Explorar Produtos
          </Button>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Categorias Populares</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {['Tecnologia', 'Casa & Jardim', 'Fashion'].map((category) => (
              <Card key={category} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{category}</CardTitle>
                  <CardDescription>Produtos selecionados em {category.toLowerCase()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">Ver Produtos</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}