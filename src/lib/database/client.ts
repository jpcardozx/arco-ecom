/**
 * ARCO Database Service
 * Product management with SQLite backend
 */

import { sqliteService, type Product as SQLiteProduct } from '@/lib/sqlite';

// Re-export Product type for compatibility
export type Product = SQLiteProduct;

// Real products service with SQLite
export const productService = {
  async getProducts(filters?: {
    active?: boolean;
    featured?: boolean;
    category?: string;
    limit?: number;
  }): Promise<Product[]> {
    return sqliteService.getProducts(filters);
  },

  async getProductById(id: string): Promise<Product | null> {
    return sqliteService.getProductById(id);
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    return sqliteService.getProductBySlug(slug);
  },

  async addProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<string> {
    const newProduct = sqliteService.addProduct(product);
    if (!newProduct) {
      throw new Error('Failed to create product');
    }
    return newProduct.id;
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<boolean> {
    return sqliteService.updateProduct(id, updates);
  },

  async deleteProduct(id: string): Promise<boolean> {
    return sqliteService.deleteProduct(id);
  },

  async getCategories(): Promise<string[]> {
    return sqliteService.getCategories();
  },

  async getBrands(): Promise<string[]> {
    return sqliteService.getBrands();
  }
};

// Link parser service for extracting product data from URLs
export const linkParserService = {
  async parseProductLink(url: string): Promise<Partial<Product> | null> {
    try {
      // Extract platform from URL
      let platform = 'unknown';
      if (url.includes('mercadolivre.com') || url.includes('mercadolibre.com')) {
        platform = 'mercadolivre';
      } else if (url.includes('amazon.com') || url.includes('amazon.com.br')) {
        platform = 'amazon';
      } else if (url.includes('shopee.com.br')) {
        platform = 'shopee';
      }

      // For now, return a basic structure
      // In production, this would scrape the actual product page
      return {
        affiliate_link: url,
        source_platform: platform,
        title: 'Produto extraído do link',
        description: 'Descrição será extraída automaticamente',
        price: 0,
        main_image: '',
        category: 'Geral',
        in_stock: true,
        featured: false,
        active: true,
        slug: '',
        tags: [],
        additional_images: []
      };
    } catch (error) {
      console.error('Error parsing product link:', error);
      return null;
    }
  }
};