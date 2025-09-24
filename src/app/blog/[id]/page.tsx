'use client'

import React from 'react'
import { notFound } from 'next/navigation'
import PremiumBlogReader from '@/components/blog/PremiumBlogReader'

// Mock data - em produção, viria de uma API ou CMS
const mockPosts = [
  {
    id: '1',
    title: 'As Principais Tendências de E-commerce para 2025',
    excerpt: 'Descubra as inovações que estão transformando o mercado digital e como se preparar para o futuro das compras online.',
    content: `
      <h2>Introdução</h2>
      <p>O mercado de e-commerce está em constante evolução, e 2025 promete ser um ano revolucionário para o setor. Novas tecnologias, mudanças no comportamento do consumidor e inovações em logística estão redefinindo completamente a experiência de compra online.</p>
      
      <h2>Principais Tendências</h2>
      <h3>1. Inteligência Artificial Personalizada</h3>
      <p>A IA está se tornando cada vez mais sofisticada, oferecendo experiências hiperpersonalizadas que se adaptam em tempo real ao comportamento do usuário. Desde recomendações de produtos até assistentes virtuais avançados, a tecnologia está criando uma nova era de atendimento ao cliente.</p>
      
      <h3>2. Realidade Aumentada nas Compras</h3>
      <p>A AR permite que os consumidores "experimentem" produtos antes da compra, reduzindo significativamente as taxas de devolução e aumentando a confiança do consumidor.</p>
      
      <h3>3. Sustentabilidade como Prioridade</h3>
      <p>Consumidores estão cada vez mais conscientes sobre o impacto ambiental de suas compras, forçando empresas a adotarem práticas mais sustentáveis em toda a cadeia de valor.</p>
      
      <h2>Como Se Preparar</h2>
      <p>Para empresários e consumidores, é essencial estar preparado para essas mudanças. Investir em tecnologia, entender as novas expectativas do mercado e adaptar estratégias será fundamental para o sucesso em 2025.</p>
      
      <h2>Conclusão</h2>
      <p>O futuro do e-commerce é promissor e cheio de oportunidades. Aqueles que se anteciparem às tendências e investirem nas tecnologias certas estarão melhor posicionados para prosperar no novo cenário digital.</p>
    `,
    author: {
      name: 'Ana Silva',
      avatar: '/profile.webp',
      bio: 'Especialista em E-commerce com mais de 10 anos de experiência, consultora de empresas Fortune 500 e palestrante internacional.',
      role: 'E-commerce Specialist'
    },
    publishedAt: '2025-09-20',
    readTime: '8 min de leitura',
    category: 'Tendências',
    tags: ['tendencias', 'ecommerce', '2025', 'ia', 'sustentabilidade'],
    image: '/hero-case-mosaic-1.png',
    views: 12500,
    likes: 285,
    bookmarks: 143,
    comments: 47
  },
  {
    id: '2',
    title: 'Guia Completo: Como Escolher o Produto Ideal',
    excerpt: 'Metodologia especializada para tomar decisões de compra inteligentes e evitar arrependimentos.',
    content: `
      <h2>A Arte de Escolher Bem</h2>
      <p>Fazer a escolha certa na hora da compra é uma habilidade que pode ser desenvolvida. Este guia apresenta uma metodologia testada para tomar decisões mais inteligentes e evitar arrependimentos futuros.</p>
      
      <h2>Metodologia dos 5 Pilares</h2>
      
      <h3>1. Necessidade vs. Desejo</h3>
      <p>Antes de qualquer compra, é fundamental distinguir entre o que você realmente precisa e o que simplesmente deseja. Esta reflexão inicial pode economizar muito dinheiro e evitar compras impulsivas.</p>
      
      <h3>2. Pesquisa Comparativa</h3>
      <p>Dedique tempo para comparar diferentes opções, marcas e preços. Use ferramentas de comparação online e leia reviews de outros consumidores para ter uma visão completa do mercado.</p>
      
      <h3>3. Análise Custo-Benefício</h3>
      <p>Considere não apenas o preço inicial, mas também os custos de manutenção, durabilidade e valor de revenda. Às vezes, pagar mais inicialmente pode ser mais econômico a longo prazo.</p>
      
      <h3>4. Timing da Compra</h3>
      <p>Aprenda sobre sazonalidade de preços, promoções regulares e ciclos de lançamento de produtos. O timing certo pode resultar em economias significativas.</p>
      
      <h3>5. Pós-Compra</h3>
      <p>Considere garantias, suporte ao cliente e políticas de devolução. Um bom suporte pós-venda pode fazer toda a diferença na sua experiência.</p>
      
      <h2>Ferramentas Práticas</h2>
      <p>Utilize aplicativos de comparação de preços, alertas de promoção e extensões de navegador que automatizam parte da pesquisa, economizando seu tempo e garantindo melhores deals.</p>
      
      <h2>Conclusão</h2>
      <p>Comprar com inteligência é uma habilidade que se desenvolve com prática. Seguindo esta metodologia, você estará equipado para fazer escolhas mais conscientes e satisfatórias.</p>
    `,
    author: {
      name: 'Carlos Santos',
      avatar: '/profile.webp',
      bio: 'Consultor financeiro e especialista em economia doméstica, autor de 3 livros sobre consumo inteligente.',
      role: 'Consultor Financeiro'
    },
    publishedAt: '2025-09-18',
    readTime: '12 min de leitura',
    category: 'Guias',
    tags: ['guia', 'compras', 'dicas', 'economia', 'metodologia'],
    image: '/hero-case-mosaic-2.png',
    views: 8300,
    likes: 196,
    bookmarks: 89,
    comments: 32
  },
  {
    id: '3',
    title: 'Review Premium: iPhone 15 Pro Max - Vale a Pena?',
    excerpt: 'Análise completa do flagship da Apple, com testes reais e comparações detalhadas com a concorrência.',
    content: `
      <h2>O Flagship da Apple em Análise</h2>
      <p>Após duas semanas de uso intensivo, apresentamos nossa análise completa do iPhone 15 Pro Max, explorando cada aspecto que importa para o consumidor brasileiro.</p>
      
      <h2>Design e Construção</h2>
      <h3>Materiais Premium</h3>
      <p>A Apple manteve o padrão de excelência com titânio grau 5, resultando em um dispositivo 19% mais leve que o modelo anterior, sem comprometer a durabilidade. O acabamento é impecável.</p>
      
      <h3>Ergonomia</h3>
      <p>Apesar da tela de 6.7", o iPhone 15 Pro Max surpreende pela ergonomia. As bordas arredondadas e o equilíbrio do peso tornam o uso prolongado confortável.</p>
      
      <h2>Performance</h2>
      <h3>Chip A17 Pro</h3>
      <p>O novo processador de 3nm oferece performance 20% superior ao A16, com eficiência energética impressionante. Nos nossos testes, executou jogos AAA sem aquecimento excessivo.</p>
      
      <h3>Benchmark Results</h3>
      <p>Nos testes sintéticos, o dispositivo alcançou scores que o posicionam entre os smartphones mais poderosos do mercado, superando facilmente qualquer concorrente Android atual.</p>
      
      <h2>Sistema de Câmeras</h2>
      <h3>Câmera Principal (48MP)</h3>
      <p>A qualidade fotográfica é excepcional, especialmente em condições de pouca luz. O novo sensor captura detalhes impressionantes e mantém cores naturais.</p>
      
      <h3>Modo Retrato Aprimorado</h3>
      <p>O bokeh natural e a detecção de borda melhorada fazem do modo retrato uma das melhores implementações do mercado.</p>
      
      <h2>Bateria e Carregamento</h2>
      <p>Com uso moderado, facilmente dura o dia todo. O carregamento via USB-C (finalmente!) é conveniente, embora não seja o mais rápido do mercado.</p>
      
      <h2>Custo vs. Benefício</h2>
      <p>Com preço inicial de R$ 10.499, o iPhone 15 Pro Max é definitivamente um investimento. Para usuários que valorizam premium build quality, performance de ponta e ecossistema Apple, o valor se justifica.</p>
      
      <h2>Prós e Contras</h2>
      <h3>Prós:</h3>
      <ul>
        <li>Performance excepcional</li>
        <li>Qualidade de construção premium</li>
        <li>Sistema de câmeras versátil</li>
        <li>Finalmente USB-C</li>
        <li>Suporte de software de longo prazo</li>
      </ul>
      
      <h3>Contras:</h3>
      <ul>
        <li>Preço elevado</li>
        <li>Carregamento poderia ser mais rápido</li>
        <li>Sem carregador na caixa</li>
        <li>Armazenamento base de 128GB é limitado</li>
      </ul>
      
      <h2>Veredicto Final</h2>
      <p>O iPhone 15 Pro Max é indiscutivelmente um dos melhores smartphones disponíveis. Se você tem orçamento e valoriza a experiência premium da Apple, é uma excelente escolha. Para usuários mais conscientes do preço, há ótimas alternativas Android que oferecem boa relação custo-benefício.</p>
      
      <p><strong>Nota: 4.5/5 estrelas</strong></p>
    `,
    author: {
      name: 'Tech Expert',
      avatar: '/profile.webp',
      bio: 'Jornalista especializado em tecnologia há 15 anos, revisor oficial de produtos para grandes veículos de mídia.',
      role: 'Tech Reviewer'
    },
    publishedAt: '2025-09-15',
    readTime: '15 min de leitura',
    category: 'Reviews',
    tags: ['review', 'iphone', 'apple', 'smartphone', 'tecnologia'],
    image: '/hero-case-mosaic-3.png',
    views: 15600,
    likes: 342,
    bookmarks: 198,
    comments: 73
  }
]

const relatedPosts = [
  {
    id: '4',
    title: 'Samsung Galaxy S24 Ultra vs iPhone 15 Pro Max',
    excerpt: 'Comparação detalhada entre os dois flagships mais esperados do ano.',
    content: '<p>Análise comparativa completa...</p>',
    author: {
      name: 'Mobile Expert',
      avatar: '/profile.webp',
      bio: 'Especialista em dispositivos móveis',
      role: 'Mobile Reviewer'
    },
    category: 'Comparações',
    readTime: '10 min de leitura',
    image: '/bg1.jpg',
    views: 9800,
    likes: 234,
    publishedAt: '2025-09-10',
    tags: ['comparacao', 'samsung', 'apple'],
    bookmarks: 156,
    comments: 45
  },
  {
    id: '5',
    title: 'Melhores Acessórios para iPhone 15',
    excerpt: 'Seleção premium de cases, carregadores e acessórios que valem o investimento.',
    content: '<p>Guia completo de acessórios...</p>',
    author: {
      name: 'Accessories Pro',
      avatar: '/profile.webp',
      bio: 'Especialista em acessórios tech',
      role: 'Tech Accessories Expert'
    },
    category: 'Acessórios',
    readTime: '6 min de leitura',
    image: '/bg2.png',
    views: 6200,
    likes: 145,
    publishedAt: '2025-09-08',
    tags: ['acessorios', 'iphone', 'cases'],
    bookmarks: 89,
    comments: 23
  },
  {
    id: '6',
    title: 'Photography Tips: Dominando a Câmera do iPhone',
    excerpt: 'Técnicas profissionais para extrair o máximo da câmera do seu iPhone.',
    content: '<p>Dicas avançadas de fotografia móvel...</p>',
    author: {
      name: 'Photo Expert',
      avatar: '/profile.webp',
      bio: 'Fotógrafo profissional e instrutor',
      role: 'Photography Expert'
    },
    category: 'Fotografia',
    readTime: '8 min de leitura',
    image: '/texture1.jpg',
    views: 7100,
    likes: 189,
    publishedAt: '2025-09-05',
    tags: ['fotografia', 'dicas', 'iphone'],
    bookmarks: 123,
    comments: 34
  }
]

interface PageProps {
  params: Promise<{ id: string }>
}

export default function BlogPostPage({ params }: PageProps) {
  const [id, setId] = React.useState<string>('')
  
  React.useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params
      setId(resolvedParams.id)
    }
    resolveParams()
  }, [params])
  
  if (!id) return <div>Loading...</div>
  
  const post = mockPosts.find(p => p.id === id)
  
  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-20">
        <PremiumBlogReader
          post={post}
          relatedPosts={relatedPosts}
        />
      </div>
    </div>
  )
}