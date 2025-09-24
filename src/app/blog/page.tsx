'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import PremiumBlogHero from '@/components/blog/PremiumBlogHero'
import PremiumBlogGrid from '@/components/blog/PremiumBlogGrid'

// Mock data - em produção, viria de uma API ou CMS
const featuredPosts = [
  {
    id: '1',
    title: 'As Principais Tendências de E-commerce para 2025',
    excerpt: 'Descubra as inovações que estão transformando o mercado digital e como se preparar para o futuro.',
    author: {
      name: 'Ana Silva',
      avatar: '/profile.webp'
    },
    category: 'Tendências',
    readTime: '8 min de leitura',
    image: '/hero-case-mosaic-1.png',
    views: 12500,
    publishedAt: '2025-09-20',
    tags: ['tendencias', 'ecommerce', '2025'],
    likes: 285
  },
  {
    id: '2',
    title: 'Guia Completo: Como Escolher o Produto Ideal',
    excerpt: 'Metodologia especializada para tomar decisões de compra inteligentes e evitar arrependimentos.',
    author: {
      name: 'Carlos Santos',
      avatar: '/profile.webp'
    },
    category: 'Guias',
    readTime: '12 min de leitura',
    image: '/hero-case-mosaic-2.png',
    views: 8300,
    publishedAt: '2025-09-18',
    tags: ['guia', 'compras', 'dicas'],
    likes: 196
  },
  {
    id: '3',
    title: 'Review Premium: iPhone 15 Pro Max - Vale a Pena?',
    excerpt: 'Análise completa do flagship da Apple, com testes reais e comparações detalhadas.',
    author: {
      name: 'Tech Expert',
      avatar: '/profile.webp'
    },
    category: 'Reviews',
    readTime: '15 min de leitura',
    image: '/hero-case-mosaic-3.png',
    views: 15600,
    publishedAt: '2025-09-15',
    tags: ['review', 'iphone', 'apple'],
    likes: 342
  }
]

const allPosts = [
  ...featuredPosts,
  {
    id: '4',
    title: 'Black Friday 2025: Estratégias para Encontrar as Melhores Ofertas',
    excerpt: 'Dicas exclusivas de especialistas para aproveitar ao máximo a maior data comercial do ano.',
    author: {
      name: 'Marina Costa',
      avatar: '/profile.webp'
    },
    category: 'Guias',
    readTime: '10 min de leitura',
    image: '/bg1.jpg',
    views: 9200,
    publishedAt: '2025-09-12',
    tags: ['black-friday', 'ofertas', 'desconto'],
    likes: 142,
    featured: true
  },
  {
    id: '5',
    title: 'Sustentabilidade no E-commerce: Tendência ou Necessidade?',
    excerpt: 'Como as empresas estão adaptando suas estratégias para um consumo mais consciente.',
    author: {
      name: 'Pedro Oliveira',
      avatar: '/profile.webp'
    },
    category: 'Sustentabilidade',
    readTime: '7 min de leitura',
    image: '/bg2.png',
    views: 6800,
    publishedAt: '2025-09-10',
    tags: ['sustentabilidade', 'meio-ambiente', 'consumo-consciente'],
    likes: 89
  },
  {
    id: '6',
    title: 'Tutorial: Como Configurar Pagamentos Online Seguros',
    excerpt: 'Passo a passo completo para proteger suas transações e dados pessoais na internet.',
    author: {
      name: 'Security Team',
      avatar: '/profile.webp'
    },
    category: 'Tutoriais',
    readTime: '6 min de leitura',
    image: '/texture1.jpg',
    views: 5400,
    publishedAt: '2025-09-08',
    tags: ['seguranca', 'pagamentos', 'tutorial'],
    likes: 67
  },
  {
    id: '7',
    title: 'Inteligência Artificial no Atendimento ao Cliente',
    excerpt: 'Como os chatbots e assistentes virtuais estão revolucionando a experiência do consumidor.',
    author: {
      name: 'AI Specialist',
      avatar: '/profile.webp'
    },
    category: 'Tecnologia',
    readTime: '9 min de leitura',
    image: '/texture2-bg.png',
    views: 7100,
    publishedAt: '2025-09-05',
    tags: ['ia', 'atendimento', 'tecnologia'],
    likes: 156,
    premium: true
  },
  {
    id: '8',
    title: 'Marketplace vs. Loja Própria: Qual Escolher?',
    excerpt: 'Comparação detalhada entre vender em marketplaces ou ter sua própria loja online.',
    author: {
      name: 'Business Expert',
      avatar: '/profile.webp'
    },
    category: 'Negócios',
    readTime: '11 min de leitura',
    image: '/texture3.png',
    views: 8900,
    publishedAt: '2025-09-02',
    tags: ['marketplace', 'ecommerce', 'estrategia'],
    likes: 203
  },
  {
    id: '9',
    title: 'Mobile Commerce: O Futuro das Compras Online',
    excerpt: 'Por que o mobile está dominando o e-commerce e como se adaptar a essa realidade.',
    author: {
      name: 'Mobile Expert',
      avatar: '/profile.webp'
    },
    category: 'Mobile',
    readTime: '8 min de leitura',
    image: '/blankpaper.jpg',
    views: 6300,
    publishedAt: '2025-08-30',
    tags: ['mobile', 'apps', 'tendencias'],
    likes: 98
  }
]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    // Aqui você implementaria a lógica de busca/filtro
    console.log('Buscando por:', term)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <PremiumBlogHero 
        featuredPosts={featuredPosts}
        onSearch={handleSearch}
      />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-20">
        <PremiumBlogGrid 
          posts={allPosts}
        />
      </div>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-emerald-500 to-blue-600 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Fique por Dentro das Novidades
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Receba nossos artigos exclusivos, tendências do mercado e ofertas especiais 
            diretamente no seu email
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Seu melhor email"
              className="flex-1 px-6 py-4 rounded-full border-0 focus:outline-none focus:ring-4 focus:ring-white/30 text-gray-900"
            />
            <button className="bg-white text-emerald-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
              Assinar Grátis
            </button>
          </div>
          
          <p className="text-white/70 text-sm mt-4">
            Mais de 50.000 leitores confiam em nosso conteúdo
          </p>
        </div>
      </section>
    </div>
  )
}