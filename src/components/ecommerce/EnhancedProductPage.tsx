/**
 * Enhanced Product Page
 * Página de produto completa com todas as funcionalidades do e-commerce
 */

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import {
  Star,
  Share2,
  Truck,
  ShieldCheck,
  RotateCcw,
  CreditCard,
  ShoppingBag,
  Heart,
  MessageCircle,
  Check,
  Plus,
  Minus,
  ArrowRight,
  Eye
} from 'lucide-react';
import { motion } from 'framer-motion';
import { AddToCartButton, useCart } from './Cart';
import { WishlistButton, useWishlist } from './Wishlist';
import { ProductReviews } from './ProductReviews';
import { AdBanner, ShoppingAd } from '../ads/GoogleAdsense';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  features: string[];
  specifications: { [key: string]: string };
  category: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockQuantity: number;
  affiliate_link: string;
  tags: string[];
}

const sampleProduct: Product = {
  id: '1',
  name: 'MacBook Pro 14" M3 Pro 18GB 512GB',
  brand: 'Apple',
  price: 15999.99,
  originalPrice: 18999.99,
  images: [
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
    'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800',
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800'
  ],
  description: 'O MacBook Pro mais poderoso já criado. Com o chip M3 Pro revolucionário, tela Liquid Retina XDR de 14 polegadas e bateria que dura o dia todo.',
  features: [
    'Chip Apple M3 Pro com CPU de 11 núcleos e GPU de 14 núcleos',
    '18GB de memória unificada',
    '512GB de armazenamento SSD super-rápido',
    'Tela Liquid Retina XDR de 14 polegadas',
    'Bateria de até 22 horas',
    'Câmera FaceTime HD 1080p',
    'Três portas Thunderbolt 4',
    'Teclado Magic Keyboard com Touch ID'
  ],
  specifications: {
    'Processador': 'Apple M3 Pro (11 núcleos)',
    'Memória RAM': '18GB',
    'Armazenamento': '512GB SSD',
    'Tela': '14" Liquid Retina XDR',
    'Resolução': '3024 x 1964 pixels',
    'Peso': '1,61 kg',
    'Dimensões': '31,26 x 22,12 x 1,55 cm',
    'Sistema Operacional': 'macOS Sonoma',
    'Garantia': '1 ano'
  },
  category: 'Laptops',
  rating: 4.8,
  reviewsCount: 1247,
  inStock: true,
  stockQuantity: 15,
  affiliate_link: 'https://amazon.com/macbook-pro-m3',
  tags: ['Premium', 'Profissional', 'Criativo', 'Apple']
};

// Product Gallery Component
const ProductGallery: React.FC<{ images: string[]; productName: string }> = ({ images, productName }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
        <motion.img
          key={selectedImage}
          src={images[selectedImage]}
          alt={productName}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Thumbnail Images */}
      <div className="flex gap-2 overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
              index === selectedImage ? 'border-primary' : 'border-transparent hover:border-gray-300'
            }`}
          >
            <img
              src={image}
              alt={`${productName} ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

// Product Info Component
const ProductInfo: React.FC<{ product: Product }> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        affiliate_link: product.affiliate_link,
        brand: product.brand
      });
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Redirect to affiliate link
    window.open(product.affiliate_link, '_blank');
    toast.success('Redirecionando para finalizar compra...');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copiado para a área de transferência!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline">{product.brand}</Badge>
          {product.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {product.name}
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-lg font-semibold">{product.rating}</span>
          <span className="text-gray-600">({product.reviewsCount} avaliações)</span>
        </div>
      </div>

      {/* Price */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center gap-4 mb-2">
          <span className="text-3xl font-bold text-primary">
            R$ {product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <>
              <span className="text-xl text-gray-500 line-through">
                R$ {product.originalPrice.toFixed(2)}
              </span>
              <Badge variant="destructive" className="text-sm">
                {discount}% OFF
              </Badge>
            </>
          )}
        </div>

        {discount > 0 && (
          <p className="text-green-600 font-semibold">
            Você economiza R$ {(product.originalPrice! - product.price).toFixed(2)}
          </p>
        )}

        <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
          <CreditCard className="w-4 h-4" />
          <span>Até 12x sem juros no cartão</span>
        </div>
      </div>

      {/* Stock Status */}
      <div className={`flex items-center gap-2 p-3 rounded-lg ${
        product.inStock ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
      }`}>
        <Check className="w-5 h-5" />
        <span className="font-medium">
          {product.inStock
            ? `Em estoque (${product.stockQuantity} unidades disponíveis)`
            : 'Produto esgotado'
          }
        </span>
      </div>

      {/* Quantity Selector */}
      {product.inStock && (
        <div className="flex items-center gap-4">
          <span className="font-medium">Quantidade:</span>
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 hover:bg-gray-100 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 py-2 font-semibold">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
              className="p-2 hover:bg-gray-100 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <span className="text-sm text-gray-500">
            (máximo: {product.stockQuantity})
          </span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        <div className="flex gap-3">
          <Button
            onClick={handleBuyNow}
            disabled={!product.inStock}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3"
            size="lg"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            Comprar Agora
          </Button>

          <WishlistButton
            product={{
              id: product.id,
              name: product.name,
              price: product.price,
              originalPrice: product.originalPrice,
              affiliate_link: product.affiliate_link,
              brand: product.brand,
              rating: product.rating,
              inStock: product.inStock
            }}
            variant="outline"
            size="lg"
            className="px-4"
          />

          <Button
            variant="outline"
            size="lg"
            onClick={handleShare}
            className="px-4"
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          variant="outline"
          className="w-full py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold"
          size="lg"
        >
          <ShoppingBag className="w-5 h-5 mr-2" />
          Adicionar ao Carrinho
        </Button>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Truck className="w-4 h-4 text-green-600" />
          <span>Frete grátis</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <ShieldCheck className="w-4 h-4 text-green-600" />
          <span>Compra garantida</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <RotateCcw className="w-4 h-4 text-green-600" />
          <span>7 dias para troca</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <CreditCard className="w-4 h-4 text-green-600" />
          <span>Pagamento seguro</span>
        </div>
      </div>
    </div>
  );
};

// Enhanced Product Page Component
export const EnhancedProductPage: React.FC<{
  product?: Product;
  showAds?: boolean;
}> = ({
  product = sampleProduct,
  showAds = true
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Início</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/ecommerce">E-commerce</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/ecommerce/category/${product.category.toLowerCase()}`}>
                {product.category}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Top Ad Banner */}
        {showAds && (
          <div className="mb-8 flex justify-center">
            <AdBanner position="header" />
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column - Product Images */}
          <div className="lg:col-span-6">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Middle Column - Product Info */}
          <div className="lg:col-span-4">
            <Card>
              <CardContent className="p-6">
                <ProductInfo product={product} />
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Ads & Related */}
          {showAds && (
            <div className="lg:col-span-2 space-y-6">
              <ShoppingAd />
              <AdBanner position="sidebar" />
            </div>
          )}
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Descrição</TabsTrigger>
              <TabsTrigger value="specifications">Especificações</TabsTrigger>
              <TabsTrigger value="reviews">Avaliações</TabsTrigger>
              <TabsTrigger value="related">Relacionados</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sobre o produto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Principais características:</h4>
                    <ul className="space-y-1">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications">
              <Card>
                <CardHeader>
                  <CardTitle>Especificações técnicas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-2 gap-4 py-2 border-b border-gray-100 last:border-b-0">
                        <span className="font-medium text-gray-600">{key}</span>
                        <span className="text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews">
              <ProductReviews productId={product.id} />
            </TabsContent>

            <TabsContent value="related">
              <Card>
                <CardHeader>
                  <CardTitle>Produtos relacionados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-gray-500">
                    <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Produtos relacionados serão exibidos aqui</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Content Ad */}
        {showAds && (
          <div className="mt-12 flex justify-center">
            <AdBanner position="content" />
          </div>
        )}
      </div>
    </div>
  );
};