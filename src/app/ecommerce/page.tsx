'use client';

import React from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { CategoriesSection } from '@/components/sections/CategoriesSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import TrendingProducts from '@/components/sections/TrendingProducts';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  ShoppingBag,
  Star,
  Heart,
  Eye,
  Crown,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Truck,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { AdBanner } from '@/components/ads/GoogleAdsense';

// Product Type Interface
interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image?: string | null;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  featured: boolean;
}

// Enhanced E-commerce Hero using new HeroSection component
const EnhancedEcommerceHero = () => (
  <HeroSection
    badge={{
      text: "Marketplace Premium",
      icon: "star"
    }}
    title="Descubra o Extraordinário"
    subtitle="Uma curadoria exclusiva dos melhores produtos do mercado. Qualidade premium encontra experiência única em cada produto selecionado."
    primaryCta={{
      text: "Explorar Catálogo",
      onClick: () => {
        const featuredSection = document.querySelector('#featured-products');
        featuredSection?.scrollIntoView({ behavior: 'smooth' });
      }
    }}
    secondaryCta={{
      text: "Ver Ofertas",
      onClick: () => {
        const categoriesSection = document.querySelector('#categories');
        categoriesSection?.scrollIntoView({ behavior: 'smooth' });
      }
    }}
    variant="glass"
    showFloatingElements={true}
  />
);

// Enhanced Benefits using FeaturesSection
const EnhancedEcommerceBenefits = () => (
  <FeaturesSection
    badge="Vantagens Exclusivas"
    title="Por que Escolher Nosso Marketplace"
    subtitle="Benefícios únicos que fazem a diferença na sua experiência de compra"
    features={[
      {
        icon: <Crown className="w-8 h-8 text-primary" />,
        title: "Curadoria Premium",
        description: "Produtos selecionados com critérios rigorosos de qualidade e exclusividade",
        status: "available",
        badge: "Exclusivo"
      },
      {
        icon: <ShieldCheck className="w-8 h-8 text-primary" />,
        title: "Compra Protegida",
        description: "Garantia total em todas as compras com suporte especializado 24/7",
        status: "available"
      },
      {
        icon: <Truck className="w-8 h-8 text-primary" />,
        title: "Entrega Express",
        description: "Receba seus produtos rapidamente com rastreamento em tempo real",
        status: "available",
        badge: "Rápido"
      },
      {
        icon: <Sparkles className="w-8 h-8 text-primary" />,
        title: "Experiência Premium",
        description: "Interface intuitiva e atendimento personalizado para cada cliente",
        status: "available"
      }
    ]}
    columns={4}
  />
);

// Featured Products Section - Connected to Real Database
const FeaturedSection = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/products?featured=true&limit=8');
        if (!response.ok) {
          throw new Error('Erro ao carregar produtos');
        }
        const data = await response.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error('Erro ao carregar produtos:', err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        // Fallback para alguns produtos de exemplo caso a API falhe
        setProducts([
          {
            id: '1',
            name: "MacBook Pro 14\" M3",
            brand: "Apple",
            price: 15999,
            originalPrice: 18999,
            image: null,
            category: "Tecnologia",
            rating: 4.9,
            reviews: 847,
            inStock: true,
            featured: true
          },
          {
            id: '2', 
            name: "iPhone 15 Pro Max",
            brand: "Apple",
            price: 9999,
            originalPrice: 12999,
            image: null,
            category: "Smartphones",
            rating: 4.8,
            reviews: 1254,
            inStock: true,
            featured: true
          },
          {
            id: '3',
            name: "Sony WH-1000XM5",
            brand: "Sony", 
            price: 1899,
            originalPrice: 2399,
            image: null,
            category: "Audio",
            rating: 4.7,
            reviews: 623,
            inStock: true,
            featured: true
          },
          {
            id: '4',
            name: "iPad Air 11\" M2",
            brand: "Apple",
            price: 4999,
            originalPrice: 5999,
            image: null,
            category: "Tablets",
            rating: 4.6,
            reviews: 445,
            inStock: true,
            featured: true
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const calculateDiscount = (price: number, originalPrice?: number): number | null => {
    if (!originalPrice || originalPrice <= price) return null;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-800 border border-blue-200/50 px-6 py-3 text-lg">
              <Crown className="w-5 h-5 mr-2" />
              Carregando Produtos Premium...
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-64 rounded-t-xl"></div>
                <div className="bg-white p-6 rounded-b-xl border border-gray-100">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error && products.length === 0) {
    return (
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-6 bg-red-100 text-red-800 border border-red-200">
              <AlertCircle className="w-5 h-5 mr-2" />
              Erro ao Carregar Produtos
            </Badge>
            <p className="text-gray-600 mb-8">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Tentar Novamente
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-800 border border-blue-200/50 px-6 py-3 text-lg">
            <Crown className="w-5 h-5 mr-2" />
            Produtos Premium em Destaque
          </Badge>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-slate-800 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              Curadoria Especial
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Produtos selecionados com <span className="text-blue-600 font-semibold">qualidade premium</span> e 
            <span className="text-purple-600 font-semibold"> experiência de compra única</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8"
        >
          {products.slice(0, 4).map((product, index) => {
            const discount = calculateDiscount(product.price, product.originalPrice);
            
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group cursor-pointer"
              >
                <Link href={`/ecommerce/product/${product.id}`}>
                <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/90 backdrop-blur-sm">
                  {/* Product Image */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 h-64">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent z-10" />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                      {discount && (
                        <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 text-xs font-bold">
                          {discount}% OFF
                        </Badge>
                      )}
                      {product.featured && (
                        <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 text-xs font-bold">
                          Destaque
                        </Badge>
                      )}
                      {!product.inStock && (
                        <Badge className="bg-gray-500 text-white px-3 py-1 text-xs font-bold">
                          Esgotado
                        </Badge>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-10 h-10 p-0 bg-white/90 hover:bg-white border-white/50"
                        onClick={(e) => {
                          e.stopPropagation();
                          // TODO: Adicionar aos favoritos
                        }}
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-10 h-10 p-0 bg-white/90 hover:bg-white border-white/50"
                        onClick={(e) => {
                          e.stopPropagation();
                          // TODO: Preview rápido
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Product Image or Placeholder */}
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const next = target.nextSibling as HTMLElement;
                          if (next) next.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                      <div className="text-center">
                        <ShoppingBag className="w-16 h-16 mx-auto mb-2 opacity-50" />
                        <p className="text-sm font-medium">{product.brand}</p>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    {/* Brand and Rating */}
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className="text-slate-600 border-slate-200">
                        {product.brand}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-slate-600">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                    </div>

                    {/* Product Name */}
                    <h3 className="font-bold text-lg text-slate-800 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>

                    {/* Pricing */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl font-black text-slate-900">
                          R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-lg text-slate-400 line-through">
                            R$ {product.originalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        )}
                      </div>
                      {discount && (
                        <p className="text-sm text-green-600 font-semibold">
                          Economia de {discount}%
                        </p>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold transition-all duration-300 disabled:opacity-50"
                        size="sm"
                        disabled={!product.inStock}
                        onClick={(e) => {
                          e.stopPropagation();
                          // TODO: Adicionar ao carrinho
                        }}
                      >
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        {product.inStock ? 'Comprar' : 'Esgotado'}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-blue-200 text-blue-600 hover:bg-blue-50 transition-all duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        asChild
                      >
                        <Link href={`/ecommerce/product/${product.id}`}>
                          <Eye className="w-4 h-4 mr-1" />
                          Ver
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                </Link>
              </motion.div>
            );
          })}

          {products.length > 4 && (
            <div className="md:col-span-2 xl:col-span-4">
              <AdBanner position="content" />
            </div>
          )}

          {products.slice(4).map((product, index) => {
            const discount = calculateDiscount(product.price, product.originalPrice);
            
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (index + 4) * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group cursor-pointer"
              >
                <Link href={`/ecommerce/product/${product.id}`}>
                <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/90 backdrop-blur-sm">
                  {/* Product Image */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 h-64">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent z-10" />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                      {discount && (
                        <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 text-xs font-bold">
                          {discount}% OFF
                        </Badge>
                      )}
                      {product.featured && (
                        <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 text-xs font-bold">
                          Destaque
                        </Badge>
                      )}
                      {!product.inStock && (
                        <Badge className="bg-gray-500 text-white px-3 py-1 text-xs font-bold">
                          Esgotado
                        </Badge>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-10 h-10 p-0 bg-white/90 hover:bg-white border-white/50"
                        onClick={(e) => {
                          e.stopPropagation();
                          // TODO: Adicionar aos favoritos
                        }}
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-10 h-10 p-0 bg-white/90 hover:bg-white border-white/50"
                        onClick={(e) => {
                          e.stopPropagation();
                          // TODO: Preview rápido
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Product Image or Placeholder */}
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const next = target.nextSibling as HTMLElement;
                          if (next) next.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                      <div className="text-center">
                        <ShoppingBag className="w-16 h-16 mx-auto mb-2 opacity-50" />
                        <p className="text-sm font-medium">{product.brand}</p>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    {/* Brand and Rating */}
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className="text-slate-600 border-slate-200">
                        {product.brand}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-slate-600">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                    </div>

                    {/* Product Name */}
                    <h3 className="font-bold text-lg text-slate-800 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>

                    {/* Pricing */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl font-black text-slate-900">
                          R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-lg text-slate-400 line-through">
                            R$ {product.originalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        )}
                      </div>
                      {discount && (
                        <p className="text-sm text-green-600 font-semibold">
                          Economia de {discount}%
                        </p>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold transition-all duration-300 disabled:opacity-50"
                        size="sm"
                        disabled={!product.inStock}
                        onClick={(e) => {
                          e.stopPropagation();
                          // TODO: Adicionar ao carrinho
                        }}
                      >
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        {product.inStock ? 'Comprar' : 'Esgotado'}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-blue-200 text-blue-600 hover:bg-blue-50 transition-all duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        asChild
                      >
                        <Link href={`/ecommerce/product/${product.id}`}>
                          <Eye className="w-4 h-4 mr-1" />
                          Ver
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button 
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl group"
            onClick={() => window.location.href = '/ecommerce'}
          >
            <div className="flex items-center gap-3">
              Ver Catálogo Completo
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </div>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

// Simple export for the main page
export default function EcommercePage() {
  return (
    <div className="min-h-screen">
      <EnhancedEcommerceHero />
      <section id="featured-products">
        <FeaturedSection />
      </section>
      <EnhancedEcommerceBenefits />
      <section id="categories">
        <CategoriesSection />
      </section>
      <TrendingProducts />
      <TestimonialsSection />
    </div>
  );
}