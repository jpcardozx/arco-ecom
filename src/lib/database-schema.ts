/**
 * ARCO Complete Database Schema
 * Schema completo otimizado para MongoDB
 */

// ===========================================
// 1. USERS COLLECTION (já temos - melhorar)
// ===========================================
export interface User {
  _id?: string;
  id: string;
  email: string;
  password: string; // hash bcrypt
  name: string;
  avatar?: string;
  
  // Sistema de Roles Expandido
  role: 'customer' | 'affiliate' | 'moderator' | 'admin' | 'super_admin' | 'developer';
  permissions: string[]; // ['read:products', 'write:orders', etc]
  
  // Status e Metadata
  active: boolean;
  email_verified: boolean;
  two_factor_enabled: boolean;
  last_login_at?: Date;
  login_count: number;
  
  // Localização e Preferências
  timezone: string;
  locale: string; // 'pt-BR', 'en-US'
  theme: 'light' | 'dark' | 'auto';
  
  // Timestamps
  created_at: Date;
  updated_at: Date;
}

// ===========================================
// 2. PRODUCTS COLLECTION (já temos - OK)
// ===========================================
export interface Product {
  _id?: string;
  id: string;
  title: string;
  description: string;
  price: number;
  original_price?: number;
  discount_percentage?: number;
  affiliate_link: string;
  source_platform: string;
  main_image: string;
  additional_images: string[];
  category: string;
  brand?: string;
  rating?: number;
  reviews_count?: number;
  in_stock: boolean;
  stock_quantity?: number;
  slug: string;
  tags: string[];
  featured: boolean;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

// ===========================================
// 3. AFFILIATE_LINKS COLLECTION (NOVA)
// ===========================================
export interface AffiliateLink {
  _id?: string;
  id: string;
  user_id: string; // Quem criou o link
  product_id?: string; // Produto vinculado
  
  // Link Data
  original_url: string;
  short_code: string; // Para URLs curtas
  tracking_url: string; // URL final com tracking
  
  // Metadata
  title?: string;
  description?: string;
  platform: 'amazon' | 'mercadolivre' | 'shopee' | 'magazineluiza' | 'custom';
  
  // Analytics
  clicks: number;
  conversions: number;
  revenue: number;
  
  // Status
  active: boolean;
  expires_at?: Date;
  created_at: Date;
  updated_at: Date;
}

// ===========================================
// 4. ORDERS COLLECTION (NOVA)
// ===========================================
export interface Order {
  _id?: string;
  id: string;
  user_id: string;
  affiliate_link_id?: string;
  
  // Order Details
  items: OrderItem[];
  total_amount: number;
  currency: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  
  // Payment
  payment_method: string;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  
  // Shipping
  shipping_address: Address;
  tracking_number?: string;
  
  // Timestamps
  created_at: Date;
  updated_at: Date;
  shipped_at?: Date;
  delivered_at?: Date;
}

export interface OrderItem {
  product_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
}

// ===========================================
// 5. ANALYTICS COLLECTION (NOVA)
// ===========================================
export interface Analytics {
  _id?: string;
  id: string;
  
  // Event Data
  event_type: 'click' | 'view' | 'conversion' | 'signup' | 'purchase';
  user_id?: string;
  session_id: string;
  affiliate_link_id?: string;
  product_id?: string;
  
  // Metadata
  user_agent: string;
  ip_address: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  
  // Geographic
  country?: string;
  region?: string;
  city?: string;
  
  // Revenue (for conversions)
  revenue?: number;
  commission?: number;
  
  // Timestamp
  created_at: Date;
}

// ===========================================
// 6. COMMISSIONS COLLECTION (NOVA)
// ===========================================
export interface Commission {
  _id?: string;
  id: string;
  user_id: string; // Afiliado
  order_id: string;
  affiliate_link_id: string;
  
  // Commission Details
  gross_sale: number;
  commission_rate: number; // %
  commission_amount: number;
  currency: string;
  
  // Status
  status: 'pending' | 'approved' | 'paid' | 'cancelled';
  
  // Payment
  paid_at?: Date;
  payment_method?: string;
  payment_reference?: string;
  
  // Timestamps
  created_at: Date;
  updated_at: Date;
}

// ===========================================
// 7. CATEGORIES COLLECTION (NOVA)
// ===========================================
export interface Category {
  _id?: string;
  id: string;
  name: string;
  slug: string;
  description?: string;
  parent_id?: string; // Para subcategorias
  icon?: string;
  image?: string;
  sort_order: number;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

// ===========================================
// 8. NOTIFICATIONS COLLECTION (NOVA)
// ===========================================
export interface Notification {
  _id?: string;
  id: string;
  user_id: string;
  
  // Notification Data
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  
  // Action (optional)
  action_url?: string;
  action_text?: string;
  
  // Status
  read: boolean;
  read_at?: Date;
  
  // Timestamps
  created_at: Date;
  expires_at?: Date;
}

// ===========================================
// 9. AUDIT_LOGS COLLECTION (NOVA)
// ===========================================
export interface AuditLog {
  _id?: string;
  id: string;
  user_id?: string;
  
  // Action Details
  action: string; // 'create', 'update', 'delete'
  resource: string; // 'product', 'user', 'order'
  resource_id: string;
  
  // Changes
  old_values?: Record<string, any>;
  new_values?: Record<string, any>;
  
  // Context
  ip_address: string;
  user_agent: string;
  
  // Timestamp
  created_at: Date;
}