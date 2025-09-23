/**
 * ARCO Shopping Center
 * Premium shopping experience with curated products
 * Best deals, quality products, trusted brands
 */

import { Metadata } from 'next';
import { EcommerceHome } from '@/components/ecommerce/EcommerceHome';

export const metadata: Metadata = {
  title: 'Shopping Center - ARCO',
  description: 'Discover premium products with exclusive deals from trusted brands. Quality guaranteed.',
  keywords: 'shopping, premium products, exclusive deals, trusted brands, quality products',
};

export default function EcommercePage() {
  return (
    <main>
      <EcommerceHome />
    </main>
  );
}