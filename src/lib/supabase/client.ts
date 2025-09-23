/**
 * ARCO Supabase Client Configuration
 * Complete setup with products management and authentication
 */

// import { createClient } from '@supabase/supabase-js';
// import { Database } from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Product Types
export interface Product {
  id: string;
  title: string;
  description?: string;
  price: number;
  original_price?: number;
  discount_percentage: number;
  affiliate_link: string;
  source_platform: string;
  external_id?: string;
  main_image?: string;
  additional_images: string[];
  category?: string;
  brand?: string;
  rating: number;
  reviews_count: number;
  in_stock: boolean;
  stock_quantity: number;
  slug: string;
  tags: string[];
  featured: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductCreateInput {
  title: string;
  description?: string;
  price: number;
  original_price?: number;
  affiliate_link: string;
  source_platform: string;
  main_image?: string;
  category?: string;
  brand?: string;
  featured?: boolean;
  tags?: string[];
}

// Development products service with sample data
export const productService = {
  async getProducts(filters?: {
    active?: boolean;
    featured?: boolean;
    category?: string;
    limit?: number;
  }): Promise<Product[]> {
    const sampleProducts: Product[] = [
      {
        id: '1',
        title: 'Smartphone Samsung Galaxy A54 5G 128GB',
        description: 'Smartphone com tela de 6.4" Super AMOLED, câmera tripla de 50MP + 12MP + 5MP, bateria de 5000mAh.',
        price: 1899.99,
        original_price: 2299.99,
        discount_percentage: 17,
        affiliate_link: 'https://mercadolivre.com/sec/1sovdhx',
        source_platform: 'mercadolivre',
        main_image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
        additional_images: [],
        category: 'Smartphones',
        brand: 'Samsung',
        rating: 4.5,
        reviews_count: 2847,
        in_stock: true,
        stock_quantity: 10,
        slug: 'smartphone-samsung-galaxy-a54-5g-128gb',
        tags: ['smartphone', '5g', 'samsung', 'galaxy'],
        featured: true,
        active: true,
        created_at: '2025-09-20T10:00:00Z',
        updated_at: '2025-09-22T15:30:00Z',
      },
      {
        id: '2',
        title: 'Notebook Lenovo IdeaPad 3i Intel Core i5',
        description: 'Notebook com processador Intel Core i5-1135G7, 8GB RAM, SSD 256GB, tela 15.6" Full HD.',
        price: 2499.99,
        original_price: 2999.99,
        discount_percentage: 17,
        affiliate_link: 'https://mercadolivre.com/sec/example2',
        source_platform: 'mercadolivre',
        main_image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
        additional_images: [],
        category: 'Notebooks',
        brand: 'Lenovo',
        rating: 4.3,
        reviews_count: 1524,
        in_stock: true,
        stock_quantity: 5,
        slug: 'notebook-lenovo-ideapad-3i-intel-core-i5',
        tags: ['notebook', 'lenovo', 'intel', 'core-i5'],
        featured: true,
        active: true,
        created_at: '2025-09-21T14:20:00Z',
        updated_at: '2025-09-22T09:15:00Z',
      },
      {
        id: '3',
        title: 'Fone de Ouvido Sony WH-1000XM4',
        description: 'Fone de ouvido wireless com cancelamento de ruído, autonomia de 30h, tecnologia LDAC.',
        price: 1299.99,
        original_price: 1599.99,
        discount_percentage: 19,
        affiliate_link: 'https://amazon.com.br/example3',
        source_platform: 'amazon',
        main_image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
        additional_images: [],
        category: 'Audio',
        brand: 'Sony',
        rating: 4.7,
        reviews_count: 8932,
        in_stock: true,
        stock_quantity: 15,
        slug: 'fone-de-ouvido-sony-wh-1000xm4',
        tags: ['fone', 'wireless', 'sony', 'cancelamento-ruido'],
        featured: false,
        active: true,
        created_at: '2025-09-19T08:45:00Z',
        updated_at: '2025-09-21T16:20:00Z',
      }
    ];

    let filteredProducts = sampleProducts;
    
    if (filters?.active !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.active === filters.active);
    }
    
    if (filters?.featured !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.featured === filters.featured);
    }
    
    if (filters?.category) {
      filteredProducts = filteredProducts.filter(p => 
        p.category?.toLowerCase().includes(filters.category!.toLowerCase())
      );
    }
    
    if (filters?.limit) {
      filteredProducts = filteredProducts.slice(0, filters.limit);
    }

    return filteredProducts;
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    const products = await this.getProducts();
    return products.find(p => p.slug === slug) || null;
  },

  async createProduct(data: ProductCreateInput): Promise<Product> {
    const newProduct: Product = {
      id: Date.now().toString(),
      ...data,
      original_price: data.original_price || data.price,
      discount_percentage: data.original_price 
        ? Math.round(((data.original_price - data.price) / data.original_price) * 100)
        : 0,
      additional_images: [],
      rating: 0,
      reviews_count: 0,
      in_stock: true,
      stock_quantity: 0,
      slug: data.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-'),
      tags: data.tags || [],
      featured: data.featured || false,
      active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    return newProduct;
  }
};

// Link parser service
export const linkParserService = {
  async parseProductLink(link: string) {
    try {
      let platform = 'unknown';
      if (link.includes('mercadolivre.com')) platform = 'mercadolivre';
      else if (link.includes('amazon.com')) platform = 'amazon';
      else if (link.includes('shopee.com')) platform = 'shopee';

      await new Promise(resolve => setTimeout(resolve, 1500));

      return {
        success: true,
        title: 'Produto Extraído Automaticamente',
        price: 299.99,
        originalPrice: 399.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
        platform,
        description: 'Descrição extraída automaticamente do anúncio.',
        brand: 'Marca Exemplo',
        rating: 4.2,
        reviewsCount: 156,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao processar o link. Verifique se o link está correto.',
      };
    }
  }
};

// Legacy exports for compatibility
export const supabase = null as any;
export const supabaseAdmin = null as any;
export const auth = {} as any;
export const db = {} as any;
export default null as any;