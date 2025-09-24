'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Star, 
  ShoppingBag,
  Palette,
  Camera,
  Maximize2,
  Eye,
  Quote,
  Sparkles,
  BookOpen,
  Award,
  Crown
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'

interface ArtisticProductViewerProps {
  product: {
    id: string
    name: string
    description: string
    price: number
    originalPrice?: number
    images: string[]
    category: string
    brand: string
    rating: number
    reviewCount: number
    inStock: boolean
    features: string[]
    specifications?: Record<string, string>
  }
  onAddToCart?: () => void
  onWishlist?: () => void
  onShare?: () => void
}

// Artistic Background Elements
const ArtisticBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Editorial Typography */}
      <motion.div
        animate={{ 
          rotate: [0, 360],
          opacity: [0.05, 0.15, 0.05]
        }}
        transition={{ 
          duration: 40,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/4 right-1/6 text-[12rem] font-serif text-slate-200/10 select-none"
      >
        ✦
      </motion.div>

      {/* Floating Palette */}
      <motion.div
        animate={{ 
          y: [-20, 20, -20],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-1/4 left-1/6"
      >
        <Palette className="w-24 h-24 text-amber-300/10 rotate-12" />
      </motion.div>

      {/* Gradient Orbs with Editorial Colors */}
      <motion.div
        animate={{ 
          x: [0, 200, 0],
          scale: [1, 1.5, 1]
        }}
        transition={{ 
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-radial from-rose-400/20 via-amber-400/10 to-transparent rounded-full blur-xl"
      />

      {/* Crown Symbol for Premium Feel */}
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/6 left-1/4"
      >
        <Crown className="w-20 h-20 text-indigo-400/15" />
      </motion.div>
    </div>
  )
}

// Enhanced Image Gallery
const ArtisticImageGallery = ({ images, productName }: { images: string[], productName: string }) => {
  const [currentImage, setCurrentImage] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  return (
    <div className="space-y-6">
      {/* Main Image with Artistic Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative group"
      >
        <div className="absolute -inset-4 bg-gradient-to-r from-amber-400/20 via-rose-400/20 to-indigo-400/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative bg-white rounded-2xl p-8 shadow-2xl overflow-hidden">
          {/* Artistic Corner Decorations */}
          <div className="absolute top-4 left-4 w-8 h-8">
            <div className="w-full h-px bg-gradient-to-r from-amber-400 to-transparent" />
            <div className="w-px h-full bg-gradient-to-b from-amber-400 to-transparent" />
          </div>
          <div className="absolute top-4 right-4 w-8 h-8">
            <div className="w-full h-px bg-gradient-to-l from-rose-400 to-transparent" />
            <div className="w-px h-full bg-gradient-to-b from-rose-400 to-transparent ml-auto" />
          </div>

          <motion.div
            key={currentImage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="aspect-square relative overflow-hidden rounded-xl"
          >
            <Image
              src={images[currentImage] || '/placeholder-product.jpg'}
              alt={productName}
              fill
              className="object-cover"
            />
            
            {/* Overlay Actions */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 right-4 flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/90 backdrop-blur-sm hover:bg-white"
                  onClick={() => setIsFullscreen(true)}
                >
                  <Maximize2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Editorial Caption */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-4 flex items-center justify-between text-sm text-gray-600"
          >
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4" />
              <span className="italic">Vista {currentImage + 1} de {images.length}</span>
            </div>
            <div className="flex items-center gap-1 text-amber-600">
              <Eye className="w-4 h-4" />
              <span className="font-medium">Galeria Premium</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Thumbnail Gallery */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentImage(index)}
            className={cn(
              "relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 flex-shrink-0",
              currentImage === index
                ? "border-amber-400 shadow-lg shadow-amber-400/25"
                : "border-gray-200 hover:border-gray-300"
            )}
          >
            <Image
              src={image}
              alt={`${productName} view ${index + 1}`}
              fill
              className="object-cover"
            />
            {currentImage === index && (
              <div className="absolute inset-0 bg-amber-400/20" />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

// Enhanced Product Info
const ArtisticProductInfo = ({ product }: { product: ArtisticProductViewerProps['product'] }) => {
  const discount = product.originalPrice ? 
    Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-6"
      >
        {/* Brand & Category */}
        <div className="flex items-center gap-4">
          <Badge className="bg-gradient-to-r from-amber-100 to-rose-100 text-gray-800 border-0 px-4 py-2">
            <BookOpen className="w-4 h-4 mr-2" />
            {product.brand}
          </Badge>
          <span className="text-gray-500 italic">{product.category}</span>
        </div>

        {/* Product Name - Editorial Style */}
        <div>
          <h1 className="text-4xl lg:text-5xl font-serif text-gray-900 leading-tight">
            {product.name}
          </h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "120px" }}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-px bg-gradient-to-r from-amber-400 via-rose-400 to-transparent mt-4"
          />
        </div>

        {/* Rating & Reviews - Artistic */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-5 h-5",
                    i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"
                  )}
                />
              ))}
            </div>
            <span className="font-medium text-gray-900">{product.rating}</span>
          </div>
          <div className="text-gray-600 italic">
            {product.reviewCount} avaliações editoriais
          </div>
        </div>
      </motion.div>

      {/* Price Section - Editorial Style */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200"
      >
        <div className="flex items-center gap-4 mb-4">
          <Award className="w-6 h-6 text-amber-600" />
          <span className="text-lg font-medium text-gray-900">Preço Especial</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-gray-900">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
            {product.originalPrice && (
              <span className="text-xl text-gray-500 line-through">
                R$ {product.originalPrice.toFixed(2).replace('.', ',')}
              </span>
            )}
          </div>
          
          {discount > 0 && (
            <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0">
              {discount}% de desconto exclusivo
            </Badge>
          )}
        </div>
      </motion.div>

      {/* Description - Editorial */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-3">
          <Quote className="w-6 h-6 text-gray-600" />
          <h3 className="text-xl font-serif text-gray-900">Nossa Curadoria</h3>
        </div>
        
        <p className="text-gray-700 leading-relaxed font-light text-lg">
          {product.description}
        </p>
      </motion.div>

      {/* Features - Artistic List */}
      {product.features && product.features.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-indigo-600" />
            <h3 className="text-xl font-serif text-gray-900">Destaques Especiais</h3>
          </div>
          
          <div className="grid gap-3">
            {product.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100"
              >
                <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full" />
                <span className="text-gray-800 font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Action Buttons - Premium Style */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="space-y-4"
      >
        <Button 
          size="lg"
          className="w-full h-14 bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-500 hover:from-amber-600 hover:via-rose-600 hover:to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
        >
          <motion.div
            className="absolute inset-0 bg-white/20"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.5 }}
          />
          <ShoppingBag className="w-5 h-5 mr-3" />
          <span className="relative z-10">Adicionar à Coleção</span>
        </Button>

        <div className="flex gap-4">
          <Button 
            variant="outline" 
            size="lg"
            className="flex-1 h-12 border-gray-300 hover:bg-gray-50 rounded-xl"
          >
            <Heart className="w-5 h-5 mr-2" />
            Favoritar
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="flex-1 h-12 border-gray-300 hover:bg-gray-50 rounded-xl"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Compartilhar
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

export const ArtisticProductViewer: React.FC<ArtisticProductViewerProps> = ({
  product,
  onAddToCart,
  onWishlist,
  onShare
}) => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      <ArtisticBackground />
      
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/ecommerce">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Voltar à Galeria
              </Button>
            </Link>
            
            <Badge className="bg-gradient-to-r from-amber-100 to-rose-100 text-gray-800 border-0 px-4 py-2">
              <Palette className="w-4 h-4 mr-2" />
              Visualização Premium
            </Badge>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ArtisticImageGallery 
              images={product.images} 
              productName={product.name} 
            />
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ArtisticProductInfo product={product} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ArtisticProductViewer