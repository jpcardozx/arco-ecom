'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, BookOpen, TrendingUp, Users, Clock, Search, Sparkles, Edit3, Feather, Palette, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface FeaturedPost {
  id: string
  title: string
  excerpt: string
  author: {
    name: string
    avatar: string
  }
  category: string
  readTime: string
  image: string
  views: number
  publishedAt: string
}

interface PremiumBlogHeroProps {
  featuredPosts: FeaturedPost[]
  onSearch?: (term: string) => void
  className?: string
}

// Artistic Editorial Background
const EditorialElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Editorial Typography Elements */}
      <motion.div
        animate={{ 
          rotate: [0, 5, -5, 0],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ 
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 right-1/6 text-9xl font-serif text-slate-200/20 select-none"
      >
        "
      </motion.div>

      {/* Artistic Ink Splashes */}
      <motion.div
        animate={{ 
          x: [0, 50, -30, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.1, 0.9, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/3 left-1/4 w-24 h-24 opacity-10"
      >
        <div className="w-full h-full bg-gradient-radial from-indigo-600/40 via-purple-500/30 to-transparent rounded-full blur-md" />
      </motion.div>

      {/* Feather Icon for Editorial Feel */}
      <motion.div
        animate={{ 
          y: [-20, 20, -20],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-1/4 right-1/3"
      >
        <Feather className="w-16 h-16 text-amber-400/20 rotate-45" />
      </motion.div>

      {/* Palette Icon for Artistic Touch */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ 
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/6 left-1/3"
      >
        <Palette className="w-20 h-20 text-rose-400/20" />
      </motion.div>

      {/* Gradient Orbs with Editorial Colors */}
      <motion.div
        animate={{ 
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-amber-400/20 via-rose-400/20 to-indigo-400/20 rounded-full blur-xl"
      />
      
      <motion.div
        animate={{ 
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 0.8, 1]
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl"
      />

      {/* Geometric Shapes */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/3 left-1/4 w-16 h-16 border border-white/10 rounded-lg"
      />
      
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/3 right-1/3 w-12 h-12 border border-emerald-200/20 rounded-full"
      />
    </div>
  )
}

// Stats Counter Animation
const StatsCounter = ({ value, label }: { value: string; label: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", bounce: 0.5 }}
        className="text-3xl lg:text-4xl font-bold text-white mb-2"
      >
        {value}
      </motion.div>
      <div className="text-white/80 text-sm">{label}</div>
    </motion.div>
  )
}

// Featured Post Card
const FeaturedCard = ({ post, index, isActive }: { 
  post: FeaturedPost; 
  index: number;
  isActive: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ 
        opacity: isActive ? 1 : 0.7,
        x: 0,
        scale: isActive ? 1 : 0.95
      }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.1
      }}
      className={cn(
        "relative cursor-pointer group transition-all duration-500",
        isActive ? "z-10" : "z-0"
      )}
    >
      <Card className={cn(
        "overflow-hidden border-0 shadow-2xl transition-all duration-500",
        isActive ? "shadow-emerald-500/20" : "shadow-black/10"
      )}>
        <div className="relative aspect-[16/10]">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <Badge className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800">
            {post.category}
          </Badge>
          
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="font-bold text-lg mb-2 line-clamp-2">
              {post.title}
            </h3>
            <p className="text-sm text-white/90 mb-3 line-clamp-2">
              {post.excerpt}
            </p>
            
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-6 h-6 rounded-full"
                />
                <span>{post.author.name}</span>
              </div>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export const PremiumBlogHero: React.FC<PremiumBlogHeroProps> = ({
  featuredPosts,
  onSearch,
  className
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activePostIndex, setActivePostIndex] = useState(0)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])

  // Auto-rotate featured posts
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePostIndex(prev => (prev + 1) % featuredPosts.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [featuredPosts.length])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(searchTerm)
  }

  return (
    <motion.section
      className={cn(
        "relative min-h-[90vh] bg-gradient-to-br from-slate-900 via-emerald-900 to-blue-900 overflow-hidden",
        className
      )}
    >
      <EditorialElements />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/symbolic-overlay.png')] opacity-5" />
      
      <motion.div 
        style={{ y }}
        className="relative z-10 container mx-auto px-6 py-20"
      >
        <div className="grid lg:grid-cols-12 gap-12 items-center min-h-[70vh]">
          {/* Left Content */}
          <div className="lg:col-span-6 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-400/20 to-rose-400/20 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <Edit3 className="w-6 h-6 text-amber-300" />
                </div>
                <Badge className="bg-white/10 backdrop-blur-sm text-white border-white/20 px-4 py-2">
                  <Quote className="w-4 h-4 mr-2" />
                  Editorial Curada
                </Badge>
              </motion.div>
              
              <h1 className="text-5xl lg:text-7xl font-serif text-white leading-tight mb-6">
                <span className="italic font-light text-white/90">Arte &</span>
                <span className="block font-bold bg-gradient-to-r from-amber-300 via-rose-400 to-indigo-400 bg-clip-text text-transparent">
                  Conteúdo
                </span>
                <span className="block text-4xl lg:text-5xl font-light italic text-white/80 mt-2">
                  que transcende
                </span>
              </h1>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="max-w-2xl mb-8"
              >
                <p className="text-xl text-white/90 leading-relaxed font-light">
                  <span className="italic">Uma curadoria editorial</span> que vai além do comum. 
                  Descobrimos <span className="font-medium text-amber-300">narrativas únicas</span>, 
                  revelamos <span className="font-medium text-rose-300">tendências emergentes</span> 
                  e criamos <span className="font-medium text-indigo-300">experiências imersivas</span> 
                  que redefinem o que significa consumir conteúdo premium.
                </p>
                
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100px" }}
                  transition={{ delay: 1, duration: 1 }}
                  className="h-px bg-gradient-to-r from-amber-400 via-rose-400 to-transparent mt-6"
                />
              </motion.div>

              {/* Editorial Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="relative max-w-2xl"
              >
                <form onSubmit={handleSearch} className="relative">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400/30 via-rose-400/30 to-indigo-400/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative">
                      <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                      <Input
                        placeholder="Explore nossa curadoria editorial..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-16 pr-16 h-16 bg-white/5 backdrop-blur-md border border-white/20 text-white placeholder-white/50 focus:bg-white/10 focus:border-amber-300 transition-all duration-500 rounded-2xl font-light text-lg"
                      />
                      <Button
                        type="submit"
                        className="absolute right-3 top-3 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white border-0 h-10 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <Feather className="w-4 h-4 mr-2" />
                        Descobrir
                      </Button>
                    </div>
                  </div>
                </form>
              </motion.div>

              {/* Editorial Categories */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="mt-8"
              >
                <p className="text-white/60 text-sm font-light italic mb-4">
                  Explore nossas coleções editoriais
                </p>
                <div className="flex flex-wrap gap-4">
                  {[
                    { name: 'Manifesto', color: 'from-amber-400 to-orange-500' },
                    { name: 'Vanguarda', color: 'from-rose-400 to-pink-500' },
                    { name: 'Essencial', color: 'from-indigo-400 to-purple-500' },
                    { name: 'Revista', color: 'from-emerald-400 to-teal-500' }
                  ].map((tag, index) => (
                    <motion.button
                      key={tag.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-3 rounded-full bg-gradient-to-r ${tag.color} text-white font-medium hover:shadow-lg border border-white/20 backdrop-blur-sm transition-all duration-300 relative overflow-hidden group`}
                    >
                      <span className="relative z-10">{tag.name}</span>
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ scale: 0, rotate: 45 }}
                        whileHover={{ scale: 1.5, rotate: 45 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20"
            >
              <StatsCounter value="500+" label="Artigos Premium" />
              <StatsCounter value="50k+" label="Leitores Mensais" />
              <StatsCounter value="15+" label="Especialistas" />
            </motion.div>
          </div>

          {/* Right Content - Featured Posts */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-6 h-6" />
                  Artigos em Destaque
                </h2>
                
                {/* Post Indicators */}
                <div className="flex gap-2">
                  {featuredPosts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActivePostIndex(index)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300",
                        index === activePostIndex 
                          ? "bg-emerald-400 w-8" 
                          : "bg-white/30 hover:bg-white/50"
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Featured Posts Stack */}
              <div className="relative">
                {featuredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    className={cn(
                      "absolute inset-0",
                      index === activePostIndex ? "z-10" : "z-0"
                    )}
                    animate={{
                      opacity: index === activePostIndex ? 1 : 0,
                      scale: index === activePostIndex ? 1 : 0.9,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <FeaturedCard 
                      post={post} 
                      index={index}
                      isActive={index === activePostIndex}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center mt-20"
        >
          <Button
            size="lg"
            className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            Explorar Todos os Artigos
            <TrendingUp className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-1 h-8 bg-gradient-to-b from-transparent to-white/50 rounded-full"
        />
      </motion.div>
    </motion.section>
  )
}

export default PremiumBlogHero