/**
 * ARCO E-commerce Components
 * Isolated affiliate marketing components - Organized structure
 */

// Main Components
export { EcommerceHome } from './EcommerceHome';
export { AffiliateMarketplace } from './AffiliateMarketplace';
export { ProductShowcase } from './ProductShowcase';

// Product Components
export { ProductCard } from './product/ProductCard';
export { ProductDetail } from './product/ProductDetail';
export type { Product } from './product/ProductCard';

// Dashboard Components
export { AffiliateDashboard } from './dashboard/AffiliateDashboard';

// Shared Components
export { 
  PlatformBadge, 
  StatusBadge, 
  Rating, 
  Price, 
  ProductCardSkeleton 
} from './shared';