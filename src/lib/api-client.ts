/**
 * ARCO API Client - Clean HTTP Client for Frontend
 * Professional API calls without server-side dependencies
 */

export interface Product {
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
  tags?: string[];
  featured: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  details?: any;
}

interface ProductFilters {
  active?: boolean;
  featured?: boolean;
  category?: string;
  limit?: number;
}

class ApiClient {
  private baseUrl = '/api';

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Products API
  async getProducts(filters?: ProductFilters): Promise<Product[]> {
    const params = new URLSearchParams();
    
    if (filters?.active !== undefined) {
      params.append('active', filters.active.toString());
    }
    if (filters?.featured !== undefined) {
      params.append('featured', filters.featured.toString());
    }
    if (filters?.category) {
      params.append('category', filters.category);
    }
    if (filters?.limit) {
      params.append('limit', filters.limit.toString());
    }

    const query = params.toString();
    const endpoint = `/products${query ? `?${query}` : ''}`;
    
    const response = await this.request<ApiResponse<Product[]>>(endpoint);
    return response.data || [];
  }

  async getProductById(id: string): Promise<Product | null> {
    try {
      const response = await this.request<ApiResponse<Product>>(`/products/${id}`);
      return response.data || null;
    } catch (error) {
      return null;
    }
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    // For now, get all products and filter (can be optimized with dedicated endpoint)
    const products = await this.getProducts();
    return products.find(p => p.slug === slug) || null;
  }

  async addProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<string> {
    const response = await this.request<ApiResponse<Product>>('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    });
    
    return response.data?.id || '';
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<boolean> {
    try {
      await this.request<ApiResponse<Product>>(`/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async deleteProduct(id: string): Promise<boolean> {
    try {
      await this.request<ApiResponse<void>>(`/products/${id}`, {
        method: 'DELETE',
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async getCategories(): Promise<string[]> {
    // Extract categories from all products
    const products = await this.getProducts();
    const categories = [...new Set(products.map(p => p.category))];
    return categories.filter(Boolean);
  }

  async getBrands(): Promise<string[]> {
    // Extract brands from all products
    const products = await this.getProducts();
    const brands = [...new Set(products.map(p => p.brand).filter(Boolean))] as string[];
    return brands;
  }

  // Link Parser API
  async parseProductLink(url: string): Promise<Partial<Product> | null> {
    try {
      const response = await this.request<ApiResponse<Partial<Product>>>('/parse-link', {
        method: 'POST',
        body: JSON.stringify({ url }),
      });
      
      return response.data || null;
    } catch (error) {
      console.error('Failed to parse product link:', error);
      return null;
    }
  }
}

// Create singleton instance
const apiClient = new ApiClient();

// Export product service interface for compatibility
export const productService = {
  async getProducts(filters?: ProductFilters): Promise<Product[]> {
    return apiClient.getProducts(filters);
  },

  async getProductById(id: string): Promise<Product | null> {
    return apiClient.getProductById(id);
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    return apiClient.getProductBySlug(slug);
  },

  async addProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<string> {
    return apiClient.addProduct(product);
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<boolean> {
    return apiClient.updateProduct(id, updates);
  },

  async deleteProduct(id: string): Promise<boolean> {
    return apiClient.deleteProduct(id);
  },

  async getCategories(): Promise<string[]> {
    return apiClient.getCategories();
  },

  async getBrands(): Promise<string[]> {
    return apiClient.getBrands();
  }
};

// Export link parser service
export const linkParserService = {
  async parseProductLink(url: string): Promise<Partial<Product> | null> {
    return apiClient.parseProductLink(url);
  }
};

export default apiClient;