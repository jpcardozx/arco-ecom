/**
 * ARCO Product Detail Page Route
 * Dynamic product visualization page
 */

import { Metadata } from 'next';
import { ProductDetail } from '@/components/ecommerce/product/ProductDetail';
import { BUSINESS_IMAGES } from '@/lib/unsplash';

// Mock product data (in a real app, this would come from a database)
const getProductById = (id: string) => {
  const mockProducts = {
    'smartphone-samsung': {
      id: 'smartphone-samsung',
      title: 'Samsung Galaxy S24 Ultra 256GB',
      price: 'R$ 6.999,99',
      originalPrice: 'R$ 8.499,99',
      discount: '18%',
      rating: 4.8,
      reviews: 2847,
      category: 'Eletrônicos',
      platform: 'amazon' as const,
      affiliateLink: '#amazon-galaxy-s24',
      image: BUSINESS_IMAGES.ecommerce.electronics.premium,
      commission: '8.5%',
      features: ['S Pen Included', '200MP Camera', '5000mAh Battery', 'Dynamic AMOLED 2X Display'],
      inStock: true,
      badge: {
        text: 'Bestseller',
        variant: 'bestseller' as const
      }
    },
    'notebook-gamer': {
      id: 'notebook-gamer',
      title: 'Notebook Gamer ASUS ROG Strix G15',
      price: 'R$ 4.299,99',
      originalPrice: 'R$ 5.199,99',
      discount: '17%',
      rating: 4.7,
      reviews: 1532,
      category: 'Informática',
      platform: 'magalu' as const,
      affiliateLink: '#magalu-asus-rog',
      image: BUSINESS_IMAGES.ecommerce.electronics.computing,
      commission: '6.2%',
      features: ['RTX 4060', '16GB RAM', '512GB SSD', '144Hz Display'],
      inStock: true,
      badge: {
        text: 'Featured',
        variant: 'featured' as const
      }
    },
    'smart-tv': {
      id: 'smart-tv',
      title: 'Smart TV LG 65" OLED 4K',
      price: 'R$ 3.899,99',
      originalPrice: 'R$ 4.999,99',
      discount: '22%',
      rating: 4.9,
      reviews: 987,
      category: 'TV & Home Theater',
      platform: 'shopee' as const,
      affiliateLink: '#shopee-lg-oled',
      image: BUSINESS_IMAGES.ecommerce.electronics.entertainment,
      commission: '5.8%',
      features: ['OLED Display', 'webOS Smart TV', 'Dolby Vision', 'AI ThinQ'],
      inStock: false,
      badge: {
        text: 'Limited',
        variant: 'limited' as const
      }
    },
    'airpods-pro': {
      id: 'airpods-pro',
      title: 'Apple AirPods Pro (3ª Geração)',
      price: 'R$ 1.799,99',
      originalPrice: 'R$ 2.199,99',
      discount: '18%',
      rating: 4.6,
      reviews: 3421,
      category: 'Áudio & Som',
      platform: 'amazon' as const,
      affiliateLink: '#amazon-airpods-pro',
      image: BUSINESS_IMAGES.ecommerce.accessories.audio,
      commission: '4.5%',
      features: ['Noise Cancelling', 'Spatial Audio', 'MagSafe Case', 'Transparency Mode'],
      inStock: true,
      badge: {
        text: 'New',
        variant: 'new' as const
      }
    }
  };

  return mockProducts[id as keyof typeof mockProducts];
};

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = getProductById(resolvedParams.id);
  
  if (!product) {
    return {
      title: 'Produto não encontrado - ARCO',
      description: 'O produto solicitado não foi encontrado.'
    };
  }

  return {
    title: `${product.title} - ARCO E-commerce`,
    description: `${product.title} por ${product.price}. ${product.features.join(', ')}. Comissão de ${product.commission} na ${product.platform}.`,
    keywords: `${product.title}, ${product.category}, ${product.platform}, affiliate, ecommerce`,
    openGraph: {
      title: product.title,
      description: `${product.title} por ${product.price}`,
      images: [product.image],
      type: 'website'
    }
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = getProductById(resolvedParams.id);

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/30">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Produto não encontrado</h1>
          <p className="text-gray-600">O produto que você está procurando não existe ou foi removido.</p>
          <a 
            href="/ecommerce" 
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Voltar aos Produtos
          </a>
        </div>
      </main>
    );
  }

  return (
    <main>
      <ProductDetail product={product} />
    </main>
  );
}

// Generate static params for known products (optional - for better performance)
export async function generateStaticParams() {
  return [
    { id: 'smartphone-samsung' },
    { id: 'notebook-gamer' },
    { id: 'smart-tv' },
    { id: 'airpods-pro' }
  ];
}