/**
 * ARCO Database Client
 * Unified interface for database operations using MongoDB
 */

import { mongodbService, type Product } from '@/lib/mongodb';

// Re-export Product type from MongoDB
export type { Product };

/**
 * Unified Database Interface
 * Wraps MongoDB service calls with consistent interface
 */
export const databaseClient = {
  // Product operations
  async getProducts(filters?: any) {
    return await mongodbService.getProducts(filters);
  },

  async getProductById(id: string) {
    return await mongodbService.getProductById(id);
  },

  async getProductBySlug(slug: string) {
    return await mongodbService.getProductBySlug(slug);
  },

  async addProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
    const newProduct = await mongodbService.addProduct(product);
    
    if (newProduct) {
      // Log new product creation
      console.log(`✅ New product added: ${newProduct.title}`);
    }
    
    return newProduct;
  },

  async updateProduct(id: string, updates: Partial<Product>) {
    return await mongodbService.updateProduct(id, updates);
  },

  async deleteProduct(id: string) {
    return await mongodbService.deleteProduct(id);
  },

  async getCategories() {
    return await mongodbService.getCategories();
  },

  async getBrands() {
    return await mongodbService.getBrands();
  }
};

// Legacy export for backward compatibility
export const productService = databaseClient;