/**
 * ARCO SQLite Database Service
 * Local database for fast development with real data
 */

import Database from 'better-sqlite3';
import path from 'path';
import { mkdirSync } from 'fs';

let db: Database.Database | null = null;

function getDb() {
  if (db) return db;
  
  const dbPath = path.join(process.cwd(), 'data', 'arco.db');
  
  // Ensure data directory exists
  try {
    mkdirSync(path.dirname(dbPath), { recursive: true });
  } catch (err) {
    // Directory already exists
  }
  
  db = new Database(dbPath);
  initializeDatabase();
  return db;
}

// Product interface matching our schema
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

// Initialize database tables
function initializeDatabase() {
  const database = getDb();
  
  // Products table
  database.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      original_price REAL,
      discount_percentage INTEGER,
      affiliate_link TEXT NOT NULL,
      source_platform TEXT NOT NULL,
      main_image TEXT,
      additional_images TEXT, -- JSON array
      category TEXT,
      brand TEXT,
      rating REAL,
      reviews_count INTEGER,
      in_stock BOOLEAN DEFAULT TRUE,
      stock_quantity INTEGER,
      slug TEXT UNIQUE,
      tags TEXT, -- JSON array
      featured BOOLEAN DEFAULT FALSE,
      active BOOLEAN DEFAULT TRUE,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Insert sample products if empty
  const count = database.prepare('SELECT COUNT(*) as count FROM products').get() as { count: number };
  
  if (count.count === 0) {
    const sampleProducts = [
      {
        id: '1',
        title: 'Notebook Gamer Dell G15',
        description: 'Notebook Dell G15 com placa de vídeo RTX 3060, processador Intel Core i7, 16GB RAM e SSD 512GB',
        price: 4299.99,
        original_price: 5499.99,
        discount_percentage: 22,
        affiliate_link: 'https://mercadolivre.com/sec/1sovdhx',
        source_platform: 'Mercado Livre',
        main_image: '/images/dell-g15.jpg',
        additional_images: JSON.stringify(['/images/dell-g15-1.jpg', '/images/dell-g15-2.jpg']),
        category: 'Eletrônicos',
        brand: 'Dell',
        rating: 4.5,
        reviews_count: 128,
        in_stock: true,
        stock_quantity: 15,
        slug: 'notebook-gamer-dell-g15',
        tags: JSON.stringify(['notebook', 'gamer', 'dell', 'rtx3060']),
        featured: true,
        active: true,
      },
      {
        id: '2',
        title: 'iPhone 15 Pro Max 256GB',
        description: 'iPhone 15 Pro Max com 256GB de armazenamento, câmera profissional e chip A17 Pro',
        price: 8999.99,
        original_price: 9999.99,
        discount_percentage: 10,
        affiliate_link: 'https://amazon.com.br/iphone-15-pro-max',
        source_platform: 'Amazon',
        main_image: '/images/iphone-15-pro.jpg',
        additional_images: JSON.stringify(['/images/iphone-15-1.jpg', '/images/iphone-15-2.jpg']),
        category: 'Smartphones',
        brand: 'Apple',
        rating: 4.8,
        reviews_count: 89,
        in_stock: true,
        stock_quantity: 8,
        slug: 'iphone-15-pro-max-256gb',
        tags: JSON.stringify(['iphone', 'apple', 'smartphone', 'premium']),
        featured: true,
        active: true,
      },
      {
        id: '3',
        title: 'PlayStation 5 Console',
        description: 'Console PlayStation 5 com SSD ultra-rápido, controle DualSense e jogos em 4K',
        price: 3899.99,
        original_price: 4299.99,
        discount_percentage: 9,
        affiliate_link: 'https://shopee.com.br/playstation-5',
        source_platform: 'Shopee',
        main_image: '/images/ps5.jpg',
        additional_images: JSON.stringify(['/images/ps5-1.jpg', '/images/ps5-2.jpg']),
        category: 'Games',
        brand: 'Sony',
        rating: 4.7,
        reviews_count: 203,
        in_stock: true,
        stock_quantity: 12,
        slug: 'playstation-5-console',
        tags: JSON.stringify(['playstation', 'ps5', 'console', 'games']),
        featured: true,
        active: true,
      }
    ];

    const insertProduct = database.prepare(`
      INSERT INTO products (
        id, title, description, price, original_price, discount_percentage,
        affiliate_link, source_platform, main_image, additional_images,
        category, brand, rating, reviews_count, in_stock, stock_quantity,
        slug, tags, featured, active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const product of sampleProducts) {
      insertProduct.run(
        product.id, product.title, product.description, product.price,
        product.original_price, product.discount_percentage, product.affiliate_link,
        product.source_platform, product.main_image, product.additional_images,
        product.category, product.brand, product.rating, product.reviews_count,
        product.in_stock, product.stock_quantity, product.slug, product.tags,
        product.featured, product.active
      );
    }
  }
}

// Transform database row to Product
function transformProduct(row: any): Product {
  return {
    ...row,
    additional_images: row.additional_images ? JSON.parse(row.additional_images) : [],
    tags: row.tags ? JSON.parse(row.tags) : [],
    in_stock: Boolean(row.in_stock),
    featured: Boolean(row.featured),
    active: Boolean(row.active),
  };
}

// Database operations
class SQLiteService {
  // Get all products with filtering
  getProducts(filters: {
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    featured?: boolean;
    search?: string;
    limit?: number;
    offset?: number;
  } = {}) {
    try {
      const database = getDb();
      
      let query = 'SELECT * FROM products WHERE active = 1';
      const params: any[] = [];

      if (filters.category) {
        query += ' AND category = ?';
        params.push(filters.category);
      }

      if (filters.brand) {
        query += ' AND brand = ?';
        params.push(filters.brand);
      }

      if (filters.minPrice) {
        query += ' AND price >= ?';
        params.push(filters.minPrice);
      }

      if (filters.maxPrice) {
        query += ' AND price <= ?';
        params.push(filters.maxPrice);
      }

      if (filters.featured !== undefined) {
        query += ' AND featured = ?';
        params.push(filters.featured ? 1 : 0);
      }

      if (filters.search) {
        query += ' AND (title LIKE ? OR description LIKE ?)';
        const searchTerm = `%${filters.search}%`;
        params.push(searchTerm, searchTerm);
      }

      query += ' ORDER BY created_at DESC';

      if (filters.limit) {
        query += ' LIMIT ?';
        params.push(filters.limit);
      }

      if (filters.offset) {
        query += ' OFFSET ?';
        params.push(filters.offset);
      }

      const rows = database.prepare(query).all(...params) as any[];
      return rows.map(transformProduct);
    } catch (error) {
      console.error('Error getting products:', error);
      return [];
    }
  }

  // Get product by ID
  getProductById(id: string): Product | null {
    try {
      const database = getDb();
      const row = database.prepare('SELECT * FROM products WHERE id = ?').get(id) as any;
      return row ? transformProduct(row) : null;
    } catch (error) {
      console.error('Error getting product by ID:', error);
      return null;
    }
  }

  // Get product by slug
  getProductBySlug(slug: string): Product | null {
    try {
      const database = getDb();
      const row = database.prepare('SELECT * FROM products WHERE slug = ?').get(slug) as any;
      return row ? transformProduct(row) : null;
    } catch (error) {
      console.error('Error getting product by slug:', error);
      return null;
    }
  }

  // Add new product
  addProduct(productData: Partial<Product>) {
    try {
      const database = getDb();
      
      const id = productData.id || Date.now().toString();
      const slug = productData.slug || productData.title?.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      database.prepare(`
        INSERT INTO products (
          id, title, description, price, original_price, discount_percentage,
          affiliate_link, source_platform, main_image, additional_images,
          category, brand, rating, reviews_count, in_stock, stock_quantity,
          slug, tags, featured, active
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        id,
        productData.title,
        productData.description,
        productData.price,
        productData.original_price,
        productData.discount_percentage,
        productData.affiliate_link,
        productData.source_platform,
        productData.main_image,
        JSON.stringify(productData.additional_images || []),
        productData.category,
        productData.brand,
        productData.rating,
        productData.reviews_count,
        productData.in_stock ? 1 : 0,
        productData.stock_quantity,
        slug,
        JSON.stringify(productData.tags || []),
        productData.featured ? 1 : 0,
        productData.active !== false ? 1 : 0
      );

      return this.getProductById(id);
    } catch (error) {
      console.error('Error adding product:', error);
      return null;
    }
  }

  // Update product
  updateProduct(id: string, updates: Partial<Product>) {
    try {
      const database = getDb();
      
      const setClause = Object.keys(updates)
        .filter(key => key !== 'id')
        .map(key => `${key} = ?`)
        .join(', ');

      const values = Object.keys(updates)
        .filter(key => key !== 'id')
        .map(key => {
          const value = (updates as any)[key];
          if (key === 'additional_images' || key === 'tags') {
            return JSON.stringify(value);
          }
          if (typeof value === 'boolean') {
            return value ? 1 : 0;
          }
          return value;
        });

      const result = database.prepare(`
        UPDATE products 
        SET ${setClause}, updated_at = CURRENT_TIMESTAMP 
        WHERE id = ?
      `).run(...values, id);

      return result.changes > 0;
    } catch (error) {
      console.error('Error updating product:', error);
      return false;
    }
  }

  // Delete product
  deleteProduct(id: string) {
    try {
      const database = getDb();
      const result = database.prepare('DELETE FROM products WHERE id = ?').run(id);
      return result.changes > 0;
    } catch (error) {
      console.error('Error deleting product:', error);
      return false;
    }
  }

  // Get categories
  getCategories(): string[] {
    const database = getDb();
    const rows = database.prepare('SELECT DISTINCT category FROM products WHERE active = 1 ORDER BY category').all() as { category: string }[];
    return rows.map(row => row.category);
  }

  // Get brands
  getBrands(): string[] {
    const database = getDb();
    const rows = database.prepare('SELECT DISTINCT brand FROM products WHERE active = 1 AND brand IS NOT NULL ORDER BY brand').all() as { brand: string }[];
    return rows.map(row => row.brand);
  }
}

export const sqliteService = new SQLiteService();