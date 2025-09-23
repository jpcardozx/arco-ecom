/**
 * ARCO Product Showcase - S-Tier Implementation
 * Displays products from Supabase with premium UI/UX
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/design-system/primitives/button';
import { Card, CardContent } from '@/components/design-system/primitives/card';
import { Input } from '@/components/design-system/primitives/input';
import { Badge } from '@/components/design-system/primitives/badge';
import { 
  Grid3x3,
  List,
  Search,
  Loader2,
  ShoppingBag
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { productService, type Product } from '@/lib/api-client';
import { ProductCard } from './ProductCard';

interface ProductShowcaseProps {
  className?: string;
  variant?: 'grid' | 'showcase' | 'featured';
  showFilters?: boolean;
  limit?: number;
}

export function ProductShowcase({ 
  className, 
  variant = 'grid',
  showFilters = true,
  limit 
}: ProductShowcaseProps) {
  // State management
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'newest'>('newest');

  // Load products from Supabase
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getProducts({
          active: true,
          limit
        });
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [limit]);

  // Filter and search products
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product =>
        product.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, sortBy]);

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))];

  // Handle product interactions
  const handleProductView = (product: Product) => {
    // Redirect to detailed product view page
    if (product.affiliate_link) {
      const encodedUrl = encodeURIComponent(product.affiliate_link);
      window.open(`/produto/view?url=${encodedUrl}`, '_blank');
    } else {
      console.log('No affiliate link available for product:', product.slug);
    }
  };

  const handleProductFavorite = (productId: string) => {
    console.log('Toggle favorite:', productId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Carregando produtos...</span>
      </div>
    );
  }

  const featuredProducts = products.filter(p => p.featured);
  const regularProducts = products.filter(p => !p.featured);

  if (variant === 'showcase') {
    return (
      <div className={cn("space-y-8", className)}>
        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Produtos em Destaque</h2>
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                ⭐ Especiais
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.slice(0, 3).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  variant="featured"
                  onView={handleProductView}
                  onFavorite={handleProductFavorite}
                />
              ))}
            </div>
          </section>
        )}

        {/* Regular Products */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Todos os Produtos</h2>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className={cn(
            "grid gap-6",
            viewMode === 'grid' 
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1"
          )}>
            {regularProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                variant={viewMode === 'list' ? 'compact' : 'default'}
                onView={handleProductView}
                onFavorite={handleProductFavorite}
              />
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)} id="showcase">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Produtos <span className="text-primary">Premium</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Curadoria especial dos melhores produtos com ofertas exclusivas
        </p>
      </div>

      {/* Filters and Search */}
      {showFilters && (
        <Card className="border-0 shadow-lg bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar produtos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/80 backdrop-blur-sm"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="min-w-[200px]">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border rounded-lg bg-white/80 backdrop-blur-sm"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'Todas as categorias' : category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div className="min-w-[160px]">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full p-2 border rounded-lg bg-white/80 backdrop-blur-sm"
                >
                  <option value="newest">Mais recentes</option>
                  <option value="price">Menor preço</option>
                  <option value="rating">Melhor avaliação</option>
                </select>
              </div>

              {/* View Mode */}
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Info */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredProducts.length} produtos encontrados
          {searchQuery && ` para "${searchQuery}"`}
        </p>
        {selectedCategory !== 'all' && (
          <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
            {selectedCategory}
          </Badge>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className={cn(
          "grid gap-6",
          viewMode === 'grid' 
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        )}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              variant={viewMode === 'list' ? 'compact' : 'default'}
              onView={handleProductView}
              onFavorite={handleProductFavorite}
            />
          ))}
        </div>
      ) : (
        <Card className="border-0 shadow-lg bg-gradient-to-br from-gray-50 to-gray-100">
          <CardContent className="p-12 text-center">
            <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-gray-500 mb-4">
              Tente ajustar os filtros ou buscar por outros termos.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
            >
              Limpar filtros
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}