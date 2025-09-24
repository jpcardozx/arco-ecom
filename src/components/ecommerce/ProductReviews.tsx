/**
 * Product Reviews System
 * Sistema completo de avaliações e reviews
 */

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Star, ThumbsUp, ThumbsDown, MessageCircle, Flag, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

// Types
interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  helpful: number;
  notHelpful: number;
  verified: boolean;
  createdAt: Date;
  images?: string[];
}

interface ReviewStats {
  average: number;
  total: number;
  distribution: { [key: number]: number };
}

// Sample data (em produção, viria da API)
const sampleReviews: Review[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'Maria Silva',
    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b79fc2de?w=150',
    rating: 5,
    title: 'Produto excelente, super recomendo!',
    comment: 'Chegou rápido, exatamente como descrito. A qualidade é excepcional e o preço justo. Já é a segunda compra que faço e sempre fico satisfeita.',
    helpful: 24,
    notHelpful: 1,
    verified: true,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'João Santos',
    rating: 4,
    title: 'Bom produto, algumas observações',
    comment: 'O produto é bom, mas demorou mais que o esperado para chegar. Qualidade ok, mas poderia vir melhor embalado.',
    helpful: 12,
    notHelpful: 3,
    verified: true,
    createdAt: new Date('2024-01-10'),
  },
  {
    id: '3',
    userId: 'user3',
    userName: 'Ana Costa',
    rating: 5,
    title: 'Superou minhas expectativas!',
    comment: 'Produto de qualidade superior, muito bem embalado e chegou antes do prazo. Atendimento nota 10!',
    helpful: 18,
    notHelpful: 0,
    verified: false,
    createdAt: new Date('2024-01-08'),
  },
];

const sampleStats: ReviewStats = {
  average: 4.6,
  total: 847,
  distribution: {
    5: 620,
    4: 145,
    3: 52,
    2: 20,
    1: 10,
  },
};

// Star Rating Component
const StarRating: React.FC<{
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}> = ({ rating, size = 'md', interactive = false, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const sizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const starValue = i + 1;
        const isActive = hoverRating ? starValue <= hoverRating : starValue <= rating;

        return (
          <Star
            key={i}
            className={`${sizes[size]} ${
              isActive ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
            onClick={interactive ? () => onRatingChange?.(starValue) : undefined}
            onMouseEnter={interactive ? () => setHoverRating(starValue) : undefined}
            onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
          />
        );
      })}
    </div>
  );
};

// Reviews Stats Component
const ReviewsStats: React.FC<{ stats: ReviewStats }> = ({ stats }) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Average Rating */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
              <div className="text-4xl font-bold text-primary">
                {stats.average.toFixed(1)}
              </div>
              <div>
                <StarRating rating={stats.average} size="lg" />
                <p className="text-sm text-gray-600 mt-1">
                  {stats.total} avaliações
                </p>
              </div>
            </div>
            <p className="text-lg font-semibold text-gray-800">Muito bem avaliado</p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map(stars => {
              const count = stats.distribution[stars];
              const percentage = (count / stats.total) * 100;

              return (
                <div key={stars} className="flex items-center gap-2 text-sm">
                  <span className="w-8 text-right">{stars}</span>
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <Progress value={percentage} className="flex-1 h-2" />
                  <span className="w-12 text-left text-gray-600">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Review Component
const ReviewComponent: React.FC<{ review: Review }> = ({ review }) => {
  const [helpful, setHelpful] = useState(review.helpful);
  const [notHelpful, setNotHelpful] = useState(review.notHelpful);
  const [userVote, setUserVote] = useState<'helpful' | 'not-helpful' | null>(null);

  const handleVote = (type: 'helpful' | 'not-helpful') => {
    if (userVote === type) return;

    if (type === 'helpful') {
      setHelpful(helpful + 1);
      if (userVote === 'not-helpful') {
        setNotHelpful(notHelpful - 1);
      }
    } else {
      setNotHelpful(notHelpful + 1);
      if (userVote === 'helpful') {
        setHelpful(helpful - 1);
      }
    }

    setUserVote(type);
    toast.success('Obrigado pelo seu feedback!');
  };

  const timeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Hoje';
    if (days === 1) return 'Ontem';
    if (days < 30) return `${days} dias atrás`;
    if (days < 365) return `${Math.floor(days / 30)} meses atrás`;
    return `${Math.floor(days / 365)} anos atrás`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="mb-4">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={review.userAvatar} />
                <AvatarFallback>
                  {review.userName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">{review.userName}</span>
                  {review.verified && (
                    <Badge variant="secondary" className="text-xs px-2 py-0">
                      <CheckCircle className="w-3 h-3 mr-1 text-green-600" />
                      Compra Verificada
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <StarRating rating={review.rating} size="sm" />
                  <span className="text-xs text-gray-500">
                    {timeAgo(review.createdAt)}
                  </span>
                </div>
              </div>
            </div>

            <Button variant="ghost" size="sm" className="text-gray-400">
              <Flag className="w-4 h-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="mb-4">
            <h4 className="font-semibold mb-2 text-gray-900">
              {review.title}
            </h4>
            <p className="text-gray-700 leading-relaxed">
              {review.comment}
            </p>
          </div>

          {/* Images */}
          {review.images && review.images.length > 0 && (
            <div className="flex gap-2 mb-4">
              {review.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="Review image"
                  className="w-16 h-16 rounded-lg object-cover cursor-pointer hover:scale-105 transition-transform"
                />
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4 pt-2 border-t">
            <span className="text-sm text-gray-600">Esta avaliação foi útil?</span>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVote('helpful')}
              className={`flex items-center gap-1 ${
                userVote === 'helpful' ? 'text-green-600 bg-green-50' : 'text-gray-500'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span>{helpful}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVote('not-helpful')}
              className={`flex items-center gap-1 ${
                userVote === 'not-helpful' ? 'text-red-600 bg-red-50' : 'text-gray-500'
              }`}
            >
              <ThumbsDown className="w-4 h-4" />
              <span>{notHelpful}</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Write Review Component
const WriteReview: React.FC<{ onSubmit: (review: Partial<Review>) => void }> = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error('Por favor, selecione uma classificação');
      return;
    }

    if (!title.trim() || !comment.trim()) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }

    onSubmit({
      rating,
      title: title.trim(),
      comment: comment.trim(),
    });

    // Reset form
    setRating(0);
    setTitle('');
    setComment('');

    toast.success('Avaliação enviada com sucesso!');
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Escrever Avaliação
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Classificação *
          </label>
          <StarRating
            rating={rating}
            size="lg"
            interactive
            onRatingChange={setRating}
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Título da avaliação *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Resuma sua experiência..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Sua avaliação *
          </label>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Conte-nos sobre sua experiência com este produto..."
            rows={4}
            className="w-full"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <Button onClick={handleSubmit} className="px-6">
            Enviar Avaliação
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Main Product Reviews Component
export const ProductReviews: React.FC<{
  productId: string;
  reviews?: Review[];
  stats?: ReviewStats;
}> = ({
  productId,
  reviews = sampleReviews,
  stats = sampleStats
}) => {
  const [filteredReviews, setFilteredReviews] = useState(reviews);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest' | 'lowest' | 'helpful'>('newest');
  const [filterBy, setFilterBy] = useState<number | 'all'>('all');

  const handleNewReview = (newReview: Partial<Review>) => {
    console.log('New review for product:', productId, newReview);
    // Em produção, enviaria para a API
  };

  const sortReviews = (reviewsToSort: Review[], sortType: typeof sortBy) => {
    return [...reviewsToSort].sort((a, b) => {
      switch (sortType) {
        case 'newest':
          return b.createdAt.getTime() - a.createdAt.getTime();
        case 'oldest':
          return a.createdAt.getTime() - b.createdAt.getTime();
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        case 'helpful':
          return b.helpful - a.helpful;
        default:
          return 0;
      }
    });
  };

  const filterReviews = (reviewsToFilter: Review[], filter: typeof filterBy) => {
    if (filter === 'all') return reviewsToFilter;
    return reviewsToFilter.filter(review => review.rating === filter);
  };

  React.useEffect(() => {
    let filtered = filterReviews(reviews, filterBy);
    let sorted = sortReviews(filtered, sortBy);
    setFilteredReviews(sorted);
  }, [reviews, sortBy, filterBy]);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <ReviewsStats stats={stats} />

      {/* Write Review */}
      <WriteReview onSubmit={handleNewReview} />

      {/* Filters and Sort */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Filtrar por:</span>
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
                className="px-3 py-1 border border-gray-300 rounded text-sm"
              >
                <option value="all">Todas</option>
                <option value="5">5 estrelas</option>
                <option value="4">4 estrelas</option>
                <option value="3">3 estrelas</option>
                <option value="2">2 estrelas</option>
                <option value="1">1 estrela</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Ordenar por:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-3 py-1 border border-gray-300 rounded text-sm"
              >
                <option value="newest">Mais recentes</option>
                <option value="oldest">Mais antigas</option>
                <option value="highest">Maior nota</option>
                <option value="lowest">Menor nota</option>
                <option value="helpful">Mais úteis</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Avaliações ({filteredReviews.length})
        </h3>

        {filteredReviews.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              {filterBy !== 'all' ? 'Nenhuma avaliação encontrada com este filtro.' : 'Seja o primeiro a avaliar este produto!'}
            </p>
          </div>
        ) : (
          filteredReviews.map(review => (
            <ReviewComponent key={review.id} review={review} />
          ))
        )}
      </div>
    </div>
  );
};