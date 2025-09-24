/**
 * Wishlist System
 * Sistema de lista de desejos/favoritos
 */

'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Heart, ShoppingCart, Trash2, Star } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from './Cart';

// Types
interface WishlistItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  affiliate_link: string;
  brand?: string;
  rating?: number;
  inStock?: boolean;
}

interface WishlistState {
  items: WishlistItem[];
  count: number;
}

type WishlistAction =
  | { type: 'ADD_ITEM'; payload: WishlistItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'LOAD_WISHLIST'; payload: WishlistItem[] };

// Wishlist Reducer
const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const exists = state.items.some(item => item.id === action.payload.id);
      if (exists) return state;

      const newItems = [...state.items, action.payload];
      return { items: newItems, count: newItems.length };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      return { items: newItems, count: newItems.length };
    }

    case 'CLEAR_WISHLIST':
      return { items: [], count: 0 };

    case 'LOAD_WISHLIST': {
      return { items: action.payload, count: action.payload.length };
    }

    default:
      return state;
  }
};

// Context
const WishlistContext = createContext<{
  state: WishlistState;
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  clearWishlist: () => void;
  isInWishlist: (id: string) => boolean;
} | null>(null);

// Wishlist Provider
export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, {
    items: [],
    count: 0
  });

  // Load wishlist from localStorage
  useEffect(() => {
    const savedWishlist = localStorage.getItem('arco-wishlist');
    if (savedWishlist) {
      try {
        const wishlistItems = JSON.parse(savedWishlist);
        dispatch({ type: 'LOAD_WISHLIST', payload: wishlistItems });
      } catch (error) {
        console.error('Error loading wishlist:', error);
      }
    }
  }, []);

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('arco-wishlist', JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (item: WishlistItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
    toast.success(`${item.name} adicionado aos favoritos!`);
  };

  const removeItem = (id: string) => {
    const item = state.items.find(item => item.id === id);
    dispatch({ type: 'REMOVE_ITEM', payload: id });
    toast.success(`${item?.name} removido dos favoritos!`);
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
    toast.success('Lista de favoritos limpa!');
  };

  const isInWishlist = (id: string) => {
    return state.items.some(item => item.id === id);
  };

  return (
    <WishlistContext.Provider value={{ state, addItem, removeItem, clearWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

// Hook
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};

// Wishlist Item Component
const WishlistItemComponent: React.FC<{ item: WishlistItem }> = ({ item }) => {
  const { removeItem } = useWishlist();
  const { addItem } = useCart();
  const discount = item.originalPrice ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100) : 0;

  const handleAddToCart = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
      affiliate_link: item.affiliate_link,
      brand: item.brand
    });
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
            {item.image ? (
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            ) : (
              <ShoppingCart className="w-8 h-8 text-gray-400" />
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-sm line-clamp-2 flex-1">{item.name}</h4>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => removeItem(item.id)}
                className="ml-2 text-red-500 hover:text-red-700 p-1"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            {item.brand && (
              <p className="text-xs text-gray-500 mb-2">{item.brand}</p>
            )}

            {item.rating && (
              <div className="flex items-center gap-1 mb-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(item.rating!)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">({item.rating})</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-primary text-lg">
                  R$ {item.price.toFixed(2)}
                </span>
                {item.originalPrice && (
                  <>
                    <span className="text-sm text-gray-500 line-through">
                      R$ {item.originalPrice.toFixed(2)}
                    </span>
                    <Badge variant="destructive" className="text-xs px-1">
                      {discount}% OFF
                    </Badge>
                  </>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleAddToCart}
                  disabled={item.inStock === false}
                  className="text-xs px-3"
                >
                  <ShoppingCart className="w-3 h-3 mr-1" />
                  {item.inStock === false ? 'Esgotado' : 'Carrinho'}
                </Button>
              </div>
            </div>

            {item.inStock === false && (
              <div className="mt-2">
                <Badge variant="secondary" className="text-xs">
                  Produto Esgotado
                </Badge>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Main Wishlist Component
export const Wishlist: React.FC = () => {
  const { state, clearWishlist } = useWishlist();
  const { addItem: addToCart } = useCart();

  const handleAddAllToCart = () => {
    const inStockItems = state.items.filter(item => item.inStock !== false);

    if (inStockItems.length === 0) {
      toast.error('Nenhum produto disponível na sua lista!');
      return;
    }

    inStockItems.forEach(item => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        originalPrice: item.originalPrice,
        image: item.image,
        affiliate_link: item.affiliate_link,
        brand: item.brand
      });
    });

    toast.success(`${inStockItems.length} produtos adicionados ao carrinho!`);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <Heart className="w-4 h-4 mr-2" />
          Favoritos
          {state.count > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs"
            >
              {state.count > 99 ? '99+' : state.count}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>Meus Favoritos</span>
            {state.items.length > 0 && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddAllToCart}
                  className="text-xs"
                >
                  + Carrinho
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearWishlist}
                  className="text-red-500 hover:text-red-700 text-xs"
                >
                  Limpar
                </Button>
              </div>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto space-y-4">
            {state.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <Heart className="w-12 h-12 text-gray-300 mb-4" />
                <p className="text-gray-500 mb-2">Sua lista de favoritos está vazia</p>
                <p className="text-sm text-gray-400">Adicione produtos que você gosta</p>
              </div>
            ) : (
              state.items.map(item => (
                <WishlistItemComponent key={item.id} item={item} />
              ))
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

// Heart Button for Adding/Removing from Wishlist
export const WishlistButton: React.FC<{
  product: WishlistItem;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}> = ({ product, variant = 'ghost', size = 'sm', className }) => {
  const { addItem, removeItem, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleToggle = () => {
    if (inWishlist) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggle}
      className={`${className} ${inWishlist ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-red-500'}`}
    >
      <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
    </Button>
  );
};