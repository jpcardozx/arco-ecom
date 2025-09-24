/**
 * Shopping Cart System
 * Sistema completo de carrinho de compras
 */

'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Plus, Minus, Trash2, Heart, Tag } from 'lucide-react';
import { toast } from 'sonner';

// Types
interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  quantity: number;
  affiliate_link: string;
  brand?: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

// Cart Reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      let newItems: CartItem[];

      if (existingItem) {
        newItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return { items: newItems, total, itemCount };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return { items: newItems, total, itemCount };
    }

    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: action.payload.id });
      }

      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return { items: newItems, total, itemCount };
    }

    case 'CLEAR_CART':
      return { items: [], total: 0, itemCount: 0 };

    case 'LOAD_CART': {
      const total = action.payload.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = action.payload.reduce((sum, item) => sum + item.quantity, 0);
      return { items: action.payload, total, itemCount };
    }

    default:
      return state;
  }
};

// Context
const CartContext = createContext<{
  state: CartState;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
} | null>(null);

// Cart Provider
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0
  });

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('arco-cart');
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: cartItems });
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('arco-cart', JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
    toast.success(`${item.name} adicionado ao carrinho!`);
  };

  const removeItem = (id: string) => {
    const item = state.items.find(item => item.id === id);
    dispatch({ type: 'REMOVE_ITEM', payload: id });
    toast.success(`${item?.name} removido do carrinho!`);
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast.success('Carrinho limpo!');
  };

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

// Cart Item Component
const CartItemComponent: React.FC<{ item: CartItem }> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();
  const discount = item.originalPrice ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100) : 0;

  return (
    <div className="flex items-center gap-4 py-4">
      {/* Product Image */}
      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
        {item.image ? (
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <ShoppingCart className="w-6 h-6 text-gray-400" />
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm line-clamp-2">{item.name}</h4>
        {item.brand && (
          <p className="text-xs text-gray-500">{item.brand}</p>
        )}

        <div className="flex items-center gap-2 mt-1">
          <span className="font-bold text-primary">
            R$ {item.price.toFixed(2)}
          </span>
          {item.originalPrice && (
            <>
              <span className="text-xs text-gray-500 line-through">
                R$ {item.originalPrice.toFixed(2)}
              </span>
              <Badge variant="destructive" className="text-xs px-1">
                {discount}% OFF
              </Badge>
            </>
          )}
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="w-8 h-8 p-0"
        >
          <Minus className="w-3 h-3" />
        </Button>

        <span className="w-8 text-center text-sm font-semibold">
          {item.quantity}
        </span>

        <Button
          size="sm"
          variant="outline"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="w-8 h-8 p-0"
        >
          <Plus className="w-3 h-3" />
        </Button>

        <Button
          size="sm"
          variant="ghost"
          onClick={() => removeItem(item.id)}
          className="w-8 h-8 p-0 text-red-500 hover:text-red-700"
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
};

// Cart Summary Component
const CartSummary: React.FC = () => {
  const { state } = useCart();

  const totalSavings = state.items.reduce((sum, item) => {
    const savings = item.originalPrice ? (item.originalPrice - item.price) * item.quantity : 0;
    return sum + savings;
  }, 0);

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm">
        <span>Subtotal ({state.itemCount} {state.itemCount === 1 ? 'item' : 'itens'})</span>
        <span>R$ {state.total.toFixed(2)}</span>
      </div>

      {totalSavings > 0 && (
        <div className="flex justify-between text-sm text-green-600">
          <span>Você está economizando:</span>
          <span>-R$ {totalSavings.toFixed(2)}</span>
        </div>
      )}

      <Separator />

      <div className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span className="text-primary">R$ {state.total.toFixed(2)}</span>
      </div>

      {totalSavings > 0 && (
        <div className="text-xs text-center text-green-600 font-medium">
          🎉 Economia total de R$ {totalSavings.toFixed(2)}
        </div>
      )}
    </div>
  );
};

// Main Cart Component
export const Cart: React.FC = () => {
  const { state, clearCart } = useCart();

  const handleCheckout = () => {
    if (state.items.length === 0) {
      toast.error('Seu carrinho está vazio!');
      return;
    }

    // Redirect to checkout or open affiliate links
    state.items.forEach(item => {
      window.open(item.affiliate_link, '_blank');
    });

    toast.success('Redirecionando para finalizar compra...');
    clearCart();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Carrinho
          {state.itemCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs"
            >
              {state.itemCount > 99 ? '99+' : state.itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>Carrinho de Compras</span>
            {state.items.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCart}
                className="text-red-500 hover:text-red-700"
              >
                Limpar
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            {state.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <ShoppingCart className="w-12 h-12 text-gray-300 mb-4" />
                <p className="text-gray-500 mb-2">Seu carrinho está vazio</p>
                <p className="text-sm text-gray-400">Adicione produtos para começar</p>
              </div>
            ) : (
              <div className="divide-y">
                {state.items.map(item => (
                  <CartItemComponent key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>

          {/* Cart Summary & Checkout */}
          {state.items.length > 0 && (
            <div className="border-t pt-4 space-y-4">
              <CartSummary />

              <div className="space-y-2">
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
                  size="lg"
                >
                  Finalizar Compra
                  <Tag className="w-4 h-4 ml-2" />
                </Button>

                <p className="text-xs text-center text-gray-500">
                  Você será redirecionado para finalizar a compra
                </p>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

// Quick Add to Cart Button
export const AddToCartButton: React.FC<{
  product: Omit<CartItem, 'quantity'>;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}> = ({ product, variant = 'default', size = 'default', className }) => {
  const { addItem } = useCart();

  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => addItem(product)}
      className={className}
    >
      <ShoppingCart className="w-4 h-4 mr-2" />
      Adicionar
    </Button>
  );
};