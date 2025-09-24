'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, TrendingUp, Clock, Eye, Heart, BookOpen, Zap, Target, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { AdBanner } from '@/components/ads/GoogleAdsense';
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  author: {
    name: string
    avatar: string
  }
  publishedAt: string
  readTime: string
  category: string
  tags: string[]
  image: string
  views: number
  likes: number
  featured?: boolean
  premium?: boolean
}

interface Category {
  id: string
  name: string
  description: string
  icon: React.ElementType
  color: string
  count: number
  featured?: boolean
}

const categories: Category[] = [
  {
    id: 'tendencias',
    name: 'Tendências',
    description: 'O que está em alta no mercado',
    icon: TrendingUp,
    color: 'from-rose-500 to-pink-500',
    count: 24,
    featured: true
  },
  {
    id: 'guias',
    name: 'Guias de Compra',
    description: 'Dicas especializadas para suas decisões',
    icon: Target,
    color: 'from-amber-500 to-orange-500',
    count: 18,
    featured: true
  },
  {
    id: 'reviews',
    name: 'Reviews',
    description: 'Análises detalhadas de produtos',
    icon: Award,
    color: 'from-emerald-500 to-teal-500',
    count: 32
  },
  {
    id: 'tutoriais',
    name: 'Tutoriais',
    description: 'Aprenda passo a passo',
    icon: BookOpen,
    color: 'from-blue-500 to-indigo-500',
    count: 15
  },
  {
    id: 'noticias',
    name: 'Notícias',
    description: 'Últimas novidades do setor',
    icon: Zap,
    color: 'from-purple-500 to-violet-500',
    count: 28
  }
]

interface PremiumBlogGridProps {
  posts: BlogPost[]
  className?: string
}

// Enhanced Category Filter
const CategoryFilter = ({ 
  selectedCategory, 
  onCategoryChange 
}: { 
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Explore por Categoria</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onCategoryChange(null)}
          className={selectedCategory === null ? "bg-emerald-50 border-emerald-200" : ""}
        >
          Todas
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {categories.map((category, index) => {
          const Icon = category.icon
          const isSelected = selectedCategory === category.id
          
          return (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                "relative p-6 rounded-2xl border-2 text-left transition-all duration-300 group",
                isSelected 
                  ? "border-emerald-300 bg-emerald-50 shadow-lg shadow-emerald-500/20"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg"
              )}
            >
              <div className={cn(
                "inline-flex p-3 rounded-xl mb-4 bg-gradient-to-r",
                category.color
              )}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{category.description}</p>
              
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">
                  {category.count} artigos
                </Badge>
                {category.featured && (
                  <Badge className="text-xs bg-gradient-to-r from-amber-400 to-orange-500 border-0">
                    Popular
                  </Badge>
                )}
              </div>
              
              {isSelected && (
                <motion.div
                  layoutId="categorySelection"
                  className="absolute inset-0 rounded-2xl bg-emerald-500/5 border-2 border-emerald-400"
                />
              )}
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}

// Enhanced Search and Filters
const SearchFilters = ({ 
  searchTerm, 
  onSearchChange,
  sortBy,
  onSortChange 
}: {
  searchTerm: string
  onSearchChange: (term: string) => void
  sortBy: string
  onSortChange: (sort: string) => void
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col lg:flex-row gap-4 items-center justify-between"
    >
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Buscar artigos..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-12 border-gray-200 focus:border-emerald-300 focus:ring-emerald-200"
        />
      </div>
      
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onSortChange('recent')}
          className={sortBy === 'recent' ? "bg-emerald-50 border-emerald-200" : ""}
        >
          <Clock className="w-4 h-4 mr-2" />
          Recentes
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onSortChange('popular')}
          className={sortBy === 'popular' ? "bg-emerald-50 border-emerald-200" : ""}
        >
          <Eye className="w-4 h-4 mr-2" />
          Populares
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onSortChange('trending')}
          className={sortBy === 'trending' ? "bg-emerald-50 border-emerald-200" : ""}
        >
          <TrendingUp className="w-4 h-4 mr-2" />
          Trending
        </Button>
      </div>
    </motion.div>
  )
}

// Enhanced Post Card
const PostCard = ({ post, index }: { post: BlogPost; index: number }) => {
  const [isLiked, setIsLiked] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group cursor-pointer"
    >
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white">
        <div className="relative">
          <div className="aspect-[16/10] overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className={cn(
              "bg-white/90 backdrop-blur-sm text-gray-800 border-0",
              post.featured && "bg-gradient-to-r from-amber-400 to-orange-500 text-white"
            )}>
              {post.category}
            </Badge>
            {post.premium && (
              <Badge className="bg-gradient-to-r from-purple-500 to-violet-500 text-white border-0">
                Premium
              </Badge>
            )}
          </div>
          
          {/* Like Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation()
              setIsLiked(!isLiked)
            }}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-200"
          >
            <Heart className={cn(
              "w-5 h-5 transition-colors",
              isLiked ? "text-red-500 fill-current" : "text-gray-600"
            )} />
          </motion.button>
        </div>
        
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="text-sm text-gray-600">
              <span className="font-medium">{post.author.name}</span>
              <span className="mx-2">•</span>
              <span>{post.readTime}</span>
            </div>
          </div>
          
          <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors">
            {post.title}
          </h3>
          
          <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {post.views.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                {post.likes}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {post.tags.slice(0, 2).map(tag => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Main Component
export const PremiumBlogGrid: React.FC<PremiumBlogGridProps> = ({ 
  posts, 
  className 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('recent')

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesCategory = !selectedCategory || post.category.toLowerCase() === selectedCategory
    const matchesSearch = !searchTerm || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    return matchesCategory && matchesSearch
  })

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.views - a.views
      case 'trending':
        return b.likes - a.likes
      default:
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    }
  })

  return (
    <div className={cn("space-y-12", className)}>
      {/* Category Filter */}
      <CategoryFilter 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      <Separator />
      
      {/* Search and Filters */}
      <SearchFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      
      {/* Results */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {selectedCategory 
              ? `${categories.find(c => c.id === selectedCategory)?.name} (${sortedPosts.length})`
              : `Todos os Artigos (${sortedPosts.length})`
            }
          </h2>
        </div>
        
        <AnimatePresence mode="wait">
          {sortedPosts.length > 0 ? (
            <motion.div
              key="posts-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {sortedPosts.flatMap((post, index) => {
                const postCard = <PostCard key={post.id} post={post} index={index} />;
                if (index === 2) { // Inserir anúncio após o 3º post
                  return [postCard, <AdBanner key="ad-content-1" position="content" />];
                }
                return [postCard];
              })}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-12"
            >
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Nenhum artigo encontrado
              </h3>
              <p className="text-gray-600 mb-4">
                Tente ajustar seus filtros ou termos de busca
              </p>
              <Button onClick={() => {
                setSelectedCategory(null)
                setSearchTerm('')
              }}>
                Limpar Filtros
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default PremiumBlogGrid