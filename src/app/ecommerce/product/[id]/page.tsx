/**
 * ARCO Artistic Product Detail Page
 * Página de detalhes do produto com design editorial e artístico
 */

'use client';

import { useState, useEffect } from 'react';
import { ArtisticProductViewer } from '@/components/ecommerce/product/ArtisticProductViewer';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const [productId, setProductId] = useState<string>('')
  
  useEffect(() => {
    params.then(({ id }) => {
      setProductId(id)
    })
  }, [params])

  // Mock product data com dados mais artísticos - Em produção, isso viria de uma API/banco de dados  
  const product = {
    id: productId || '1',
    name: 'Coleção Artesanal Premium - Vaso Cerâmica Minimalista',
    brand: 'Atelier Contemporâneo',
    price: 299.99,
    originalPrice: 449.99,
    images: [
      '/bg1.jpg',
      '/bg2.png',
      '/texture1.jpg',
      '/texture2-bg.png',
      '/texture3.png'
    ],
    description: 'Uma peça única que transcende a funcionalidade para se tornar uma obra de arte. Criado por artesãos especializados, este vaso representa a harmonia perfeita entre tradição e modernidade. Cada curva foi pensada para complementar ambientes contemporâneos, enquanto sua textura singular conta uma história de dedicação artesanal.',
    features: [
      'Feito à mão por artistas certificados',
      'Material cerâmico premium de alta durabilidade', 
      'Design exclusivo com assinatura do criador',
      'Acabamento em esmalte artístico único',
      'Certificado de autenticidade incluso',
      'Embalagem de luxo para presente'
    ],
    category: 'Decoração Artística',
    rating: 4.9,
    reviewCount: 127,
    inStock: true,
    specifications: {
      'Dimensões': '25cm x 18cm x 35cm',
      'Peso': '1.2kg',
      'Material': 'Cerâmica Premium',
      'Origem': 'Brasil - Atelier Contemporâneo',
      'Estilo': 'Minimalista Contemporâneo'
    }
  }

  const handleAddToCart = () => {
    console.log('Produto adicionado ao carrinho:', product.name)
  }

  const handleWishlist = () => {
    console.log('Produto adicionado aos favoritos:', product.name)
  }

  const handleShare = () => {
    console.log('Compartilhando produto:', product.name)
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Produto não encontrado</h1>
          <p className="text-gray-600">O produto que você está procurando não existe.</p>
        </div>
      </div>
    )
  }

  return (
    <ArtisticProductViewer
      product={product}
      onAddToCart={handleAddToCart}
      onWishlist={handleWishlist}
      onShare={handleShare}
    />
  )
}