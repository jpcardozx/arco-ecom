'use client';

import { SessionProvider } from 'next-auth/react';
import { CartProvider } from '@/components/ecommerce/Cart';
import { WishlistProvider } from '@/components/ecommerce/Wishlist';
import { Toaster } from 'sonner';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <CartProvider>
        <WishlistProvider>
          {children}
          <Toaster position="top-right" />
        </WishlistProvider>
      </CartProvider>
    </SessionProvider>
  );
}