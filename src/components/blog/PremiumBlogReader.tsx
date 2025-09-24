'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Clock, Eye, Heart, Share2, Bookmark, MessageCircle, ArrowUp, ChevronRight, Quote, Feather, Palette, Edit3, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { AdBanner } from '@/components/ads/GoogleAdsense'
import { cn } from '@/lib/utils'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: {
    name: string
    avatar: string
    bio: string
    role: string
  }
  publishedAt: string
  readTime: string
  category: string
  tags: string[]
  image: string
  views: number
  likes: number
  bookmarks: number
  comments: number
}

interface PremiumBlogReaderProps {
  post: BlogPost
  relatedPosts: BlogPost[]
  className?: string
}

// Floating Action Bar - Premium UX
const FloatingActionBar = ({ 
  post, 
  onLike, 
  onBookmark, 
  onShare,
  isLiked,
  isBookmarked 
}: {
  post: BlogPost
  onLike: () => void
  onBookmark: () => void
  onShare: () => void
  isLiked: boolean
  isBookmarked: boolean
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    const updateScrollTop = () => setShowScrollTop(window.scrollY > 500)
    window.addEventListener('scroll', updateScrollTop)
    return () => window.removeEventListener('scroll', updateScrollTop)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3"
    >
      {/* Action Buttons */}
      <motion.div className="bg-white/90 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-2">
        <div className="flex flex-col gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLike}
            className={cn(
              "p-3 rounded-xl transition-all duration-300",
              isLiked 
                ? "bg-red-500 text-white shadow-lg shadow-red-500/25" 
                : "bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-500"
            )}
          >
            <Heart className={cn("w-5 h-5", isLiked && "fill-current")} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBookmark}
            className={cn(
              "p-3 rounded-xl transition-all duration-300",
              isBookmarked 
                ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25" 
                : "bg-gray-100 hover:bg-blue-50 text-gray-600 hover:text-blue-500"
            )}
          >
            <Bookmark className={cn("w-5 h-5", isBookmarked && "fill-current")} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onShare}
            className="p-3 rounded-xl bg-gray-100 hover:bg-emerald-50 text-gray-600 hover:text-emerald-500 transition-all duration-300"
          >
            <Share2 className="w-5 h-5" />
          </motion.button>

          <Separator className="my-1" />

          <div className="text-center p-2">
            <div className="text-xs font-medium text-gray-500">{post.views.toLocaleString()}</div>
            <div className="text-xs text-gray-400">visualizações</div>
          </div>
        </div>
      </motion.div>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="p-3 rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 hover:bg-emerald-600 transition-all duration-300"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Reading Progress Bar
const ReadingProgressBar = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-blue-500 origin-left z-50"
      style={{ scaleX }}
    />
  )
}

// Artistic Author Card
const AuthorCard = ({ author }: { author: BlogPost['author'] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6 }}
    className="relative group"
  >
    {/* Artistic Background */}
    <div className="absolute -inset-2 bg-gradient-to-r from-amber-400/20 via-rose-400/20 to-indigo-400/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl p-8 border border-gray-200 shadow-lg">
      {/* Editorial Header */}
      <div className="flex items-center gap-3 mb-6">
        <Edit3 className="w-5 h-5 text-amber-600" />
        <span className="text-sm font-medium text-gray-700 italic">Nosso Editor</span>
      </div>

      <div className="flex items-start gap-6">
        <motion.div
          whileHover={{ scale: 1.05, rotate: 5 }}
          className="relative"
        >
          {/* Artistic Frame for Avatar */}
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 via-rose-400 to-indigo-400 p-1">
              <div className="w-full h-full rounded-xl overflow-hidden">
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Artistic Corner Accent */}
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full border-2 border-white flex items-center justify-center">
              <Feather className="w-3 h-3 text-white" />
            </div>
          </div>
        </motion.div>

        <div className="flex-1">
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-serif text-gray-900">{author.name}</h3>
              <Badge className="bg-gradient-to-r from-amber-100 to-rose-100 text-gray-800 border-0 px-3 py-1">
                {author.role}
              </Badge>
            </div>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "60px" }}
              transition={{ delay: 0.8, duration: 1 }}
              className="h-px bg-gradient-to-r from-amber-400 via-rose-400 to-transparent mb-3"
            />
          </div>

          <blockquote className="relative mb-6">
            <Quote className="absolute -top-2 -left-2 w-6 h-6 text-gray-300" />
            <p className="text-gray-700 leading-relaxed font-light italic pl-6">
              {author.bio}
            </p>
          </blockquote>

          <Button 
            variant="outline" 
            className="group bg-gradient-to-r from-gray-50 to-white hover:from-amber-50 hover:to-rose-50 border-gray-200 hover:border-amber-300 transition-all duration-300"
          >
            <span className="font-medium">Seguir Editor</span>
            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  </motion.div>
)

// Artistic Action Buttons
const ArtisticActionButtons = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.7 }}
    className="relative group"
  >
    {/* Editorial Background */}
    <div className="absolute -inset-2 bg-gradient-to-r from-violet-400/10 via-purple-400/10 to-pink-400/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border border-gray-200 shadow-lg">
      {/* Editorial Header */}
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="w-5 h-5 text-violet-600" />
        <span className="text-sm font-serif text-gray-700 italic">Interação Editorial</span>
      </div>

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex flex-wrap gap-3">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button 
              variant="outline" 
              className="group bg-gradient-to-r from-rose-50 to-pink-50 hover:from-rose-100 hover:to-pink-100 border-rose-200 hover:border-rose-300 text-rose-700 hover:text-rose-800 transition-all duration-300"
            >
              <Heart className="w-4 h-4 mr-2 group-hover:text-rose-500" />
              <span className="font-medium">Apreciar</span>
              <Badge className="ml-3 bg-rose-100 text-rose-700 border-0">47</Badge>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button 
              variant="outline"
              className="group bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border-blue-200 hover:border-blue-300 text-blue-700 hover:text-blue-800 transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4 mr-2 group-hover:text-blue-500" />
              <span className="font-medium">Comentar</span>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button 
              variant="outline"
              className="group bg-gradient-to-r from-emerald-50 to-green-50 hover:from-emerald-100 hover:to-green-100 border-emerald-200 hover:border-emerald-300 text-emerald-700 hover:text-emerald-800 transition-all duration-300"
            >
              <Share2 className="w-4 h-4 mr-2 group-hover:text-emerald-500" />
              <span className="font-medium">Compartilhar</span>
            </Button>
          </motion.div>
        </div>

        <div className="flex gap-3">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button 
              variant="outline"
              className="group bg-gradient-to-r from-amber-50 to-yellow-50 hover:from-amber-100 hover:to-yellow-100 border-amber-200 hover:border-amber-300 text-amber-700 hover:text-amber-800 transition-all duration-300"
            >
              <Bookmark className="w-4 h-4 mr-2 group-hover:text-amber-500" />
              <span className="font-medium">Arquivar</span>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button 
              className="group bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Eye className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Newsletter Premium</span>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  </motion.div>
)

// Related Articles Section
const RelatedArticles = ({ posts }: { posts: BlogPost[] }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8 }}
    className="space-y-6"
  >
    <h2 className="text-2xl font-bold text-gray-900">Artigos Relacionados</h2>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.slice(0, 3).map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + index * 0.1 }}
          whileHover={{ y: -5 }}
        >
          <Card className="overflow-hidden group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="relative aspect-video overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
              <Badge className="absolute top-3 left-3 bg-white/90 text-gray-800">
                {post.category}
              </Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{post.readTime}</span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {post.views.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {post.likes}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  </motion.section>
)

// Main Component
export const PremiumBlogReader: React.FC<PremiumBlogReaderProps> = ({ 
  post, 
  relatedPosts,
  className 
}) => {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [likesCount, setLikesCount] = useState(post.likes)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1)
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className={cn("relative", className)}>
      <ReadingProgressBar />
      
      {/* Editorial Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mb-16"
      >
        {/* Artistic Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ 
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ 
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-20 -right-20 text-9xl font-serif text-amber-300/20"
          >
            "
          </motion.div>
          
          <motion.div
            animate={{ 
              y: [-10, 10, -10],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 right-1/6"
          >
            <Feather className="w-16 h-16 text-rose-300/20 rotate-45" />
          </motion.div>
        </div>

        <div className="relative">
          {/* Editorial Header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-400/20 to-rose-400/20 backdrop-blur-sm border border-amber-300/30 flex items-center justify-center">
              <Edit3 className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <Badge className="bg-gradient-to-r from-amber-100 to-rose-100 text-gray-800 border-0 mb-2">
                <Palette className="w-4 h-4 mr-2" />
                {post.category}
              </Badge>
              <p className="text-sm text-gray-600 italic">Uma curadoria editorial exclusiva</p>
            </div>
          </motion.div>

          {/* Artistic Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <h1 className="text-5xl lg:text-6xl font-serif text-gray-900 leading-tight mb-6">
              {post.title}
            </h1>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "150px" }}
              transition={{ delay: 0.8, duration: 1.5 }}
              className="h-1 bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-400 rounded-full mb-6"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="relative p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200"
            >
              <Quote className="absolute top-4 left-4 w-6 h-6 text-gray-400" />
              <p className="text-xl text-gray-700 leading-relaxed font-light italic pl-8">
                {post.excerpt}
              </p>
            </motion.div>
          </motion.div>

          {/* Hero Image with Artistic Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative group mb-8"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-400/20 via-rose-400/20 to-indigo-400/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Artistic Corner Decorations */}
              <div className="absolute top-4 left-4 w-8 h-8">
                <div className="w-full h-px bg-gradient-to-r from-white/80 to-transparent" />
                <div className="w-px h-full bg-gradient-to-b from-white/80 to-transparent" />
              </div>
              <div className="absolute bottom-4 right-4 w-8 h-8">
                <div className="w-full h-px bg-gradient-to-l from-white/80 to-transparent mb-auto mt-auto" />
                <div className="w-px h-full bg-gradient-to-t from-white/80 to-transparent ml-auto" />
              </div>
            </div>
          </motion.div>

          {/* Editorial Meta Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-200"
          >
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600" />
                <span className="font-medium">{post.readTime} de leitura</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-indigo-600" />
                <span className="font-medium">{post.views.toLocaleString()} leitores</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-rose-600" />
                <span className="font-medium">{post.comments} reflexões</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700 italic">Artigo Premium</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Content */}
      <div className="grid lg:grid-cols-12 gap-12">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-8"
        >
          <div className="prose prose-lg prose-slate max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Ad Banner Insertion */}
          <div className="my-12 flex justify-center">
            <AdBanner position="content" />
          </div>
          
          {/* Article Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map(tag => (
                <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-gray-100">
                  #{tag}
                </Badge>
              ))}
            </div>
            
            <AuthorCard author={post.author} />
            
            <ArtisticActionButtons />
          </div>
        </motion.article>

        {/* Sidebar */}
        <aside className="lg:col-span-4">
          <div className="sticky top-8 space-y-8">
            {/* Table of Contents placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-50 rounded-2xl p-6"
            >
              <h3 className="font-semibold text-gray-900 mb-4">Neste Artigo</h3>
              <div className="space-y-2 text-sm">
                <div className="text-gray-600 hover:text-emerald-600 cursor-pointer transition-colors">
                  Introdução
                </div>
                <div className="text-gray-600 hover:text-emerald-600 cursor-pointer transition-colors">
                  Principais Benefícios
                </div>
                <div className="text-gray-600 hover:text-emerald-600 cursor-pointer transition-colors">
                  Como Implementar
                </div>
                <div className="text-gray-600 hover:text-emerald-600 cursor-pointer transition-colors">
                  Conclusão
                </div>
              </div>
            </motion.div>

            {/* Newsletter Signup */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl p-6 text-white"
            >
              <h3 className="font-semibold mb-2">Receba Novos Artigos</h3>
              <p className="text-sm text-white/90 mb-4">
                Seja o primeiro a ler nossos conteúdos exclusivos
              </p>
              <Button className="w-full bg-white text-gray-900 hover:bg-gray-100">
                Assinar Newsletter
              </Button>
            </motion.div>
          </div>
        </aside>
      </div>

      {/* Related Articles */}
      <div className="mt-20">
        <RelatedArticles posts={relatedPosts} />
      </div>

      {/* Floating Actions */}
      <FloatingActionBar
        post={post}
        onLike={handleLike}
        onBookmark={handleBookmark}
        onShare={handleShare}
        isLiked={isLiked}
        isBookmarked={isBookmarked}
      />
    </div>
  )
}

export default PremiumBlogReader