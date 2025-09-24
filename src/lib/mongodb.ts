/**
 * ARCO MongoDB Database Service
 * Production-ready database with MongoDB Atlas
 */

import { MongoClient, Db, Collection } from 'mongodb';

// Security: Never hardcode credentials - always use environment variables
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || 'arco-production';

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

interface MongoGlobal {
  client?: MongoClient;
  db?: Db;
}

declare global {
  var mongo: MongoGlobal | undefined;
}

let cached = global.mongo;

if (!cached) {
  cached = global.mongo = {};
}

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (cached?.client && cached?.db) {
    return { client: cached.client, db: cached.db };
  }

  const client = new MongoClient(MONGODB_URI!);

  try {
    await client.connect();
    const db = client.db(MONGODB_DB);

    cached!.client = client;
    cached!.db = db;

    console.log('✅ Connected to MongoDB Atlas');
    return { client, db };
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

// Product interface for MongoDB
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

// User interface for MongoDB
export interface User {
  _id?: string;
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'customer' | 'moderator' | 'admin' | 'super_admin';
  active: boolean;
  created_at: Date;
  updated_at: Date;
  last_login_at?: Date;
}

// MongoDB service class
export class MongoDBService {
  private db: Db | null = null;

  async getDb(): Promise<Db> {
    if (!this.db) {
      const { db } = await connectToDatabase();
      this.db = db;
    }
    return this.db;
  }

  // Products collection
  async getProductsCollection(): Promise<Collection<Product>> {
    const db = await this.getDb();
    return db.collection<Product>('products');
  }

  // Users collection
  async getUsersCollection(): Promise<Collection<User>> {
    const db = await this.getDb();
    return db.collection<User>('users');
  }

  // Audit logs collection
  async getAuditLogsCollection(): Promise<Collection<any>> {
    const db = await this.getDb();
    return db.collection('audit_logs');
  }

  // Get user by email
  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const collection = await this.getUsersCollection();
      // Ensure we are searching by email
      return await collection.findOne({ email });
    } catch (error) {
      console.error('Error getting user by email:', error);
      return null;
    }
  }

  // Get all products with filtering
  async getProducts(filters: {
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    featured?: boolean;
    search?: string;
    limit?: number;
    offset?: number;
  } = {}): Promise<Product[]> {
    try {
      const collection = await this.getProductsCollection();

      const query: any = { active: true };

      if (filters.category) {
        query.category = filters.category;
      }

      if (filters.brand) {
        query.brand = filters.brand;
      }

      if (filters.minPrice || filters.maxPrice) {
        query.price = {};
        if (filters.minPrice) query.price.$gte = filters.minPrice;
        if (filters.maxPrice) query.price.$lte = filters.maxPrice;
      }

      if (filters.featured !== undefined) {
        query.featured = filters.featured;
      }

      if (filters.search) {
        query.$or = [
          { title: { $regex: filters.search, $options: 'i' } },
          { description: { $regex: filters.search, $options: 'i' } }
        ];
      }

      let cursor = collection.find(query).sort({ created_at: -1 });

      if (filters.limit) {
        cursor = cursor.limit(filters.limit);
      }

      if (filters.offset) {
        cursor = cursor.skip(filters.offset);
      }

      return await cursor.toArray();
    } catch (error) {
      console.error('Error getting products:', error);
      return [];
    }
  }

  // Get product by ID
  async getProductById(id: string): Promise<Product | null> {
    try {
      const collection = await this.getProductsCollection();
      return await collection.findOne({ id });
    } catch (error) {
      console.error('Error getting product by ID:', error);
      return null;
    }
  }

  // Get product by slug
  async getProductBySlug(slug: string): Promise<Product | null> {
    try {
      const collection = await this.getProductsCollection();
      return await collection.findOne({ slug });
    } catch (error) {
      console.error('Error getting product by slug:', error);
      return null;
    }
  }

  // Add new product
  async addProduct(productData: Partial<Product>): Promise<Product | null> {
    try {
      const collection = await this.getProductsCollection();

      const id = productData.id || Date.now().toString();
      const slug = productData.slug || productData.title?.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const product: Product = {
        id,
        title: productData.title || '',
        description: productData.description || '',
        price: productData.price || 0,
        original_price: productData.original_price,
        discount_percentage: productData.discount_percentage,
        affiliate_link: productData.affiliate_link || '',
        source_platform: productData.source_platform || '',
        main_image: productData.main_image || '',
        additional_images: productData.additional_images || [],
        category: productData.category || '',
        brand: productData.brand,
        rating: productData.rating,
        reviews_count: productData.reviews_count,
        in_stock: productData.in_stock !== false,
        stock_quantity: productData.stock_quantity,
        slug: slug || '',
        tags: productData.tags || [],
        featured: productData.featured || false,
        active: productData.active !== false,
        created_at: new Date(),
        updated_at: new Date()
      };

      const result = await collection.insertOne(product);

      if (result.insertedId) {
        return await this.getProductById(id);
      }

      return null;
    } catch (error) {
      console.error('Error adding product:', error);
      return null;
    }
  }

  // Update product
  async updateProduct(id: string, updates: Partial<Product>): Promise<boolean> {
    try {
      const collection = await this.getProductsCollection();

      const updateData = {
        ...updates,
        updated_at: new Date()
      };

      delete updateData._id;

      const result = await collection.updateOne(
        { id },
        { $set: updateData }
      );

      return result.modifiedCount > 0;
    } catch (error) {
      console.error('Error updating product:', error);
      return false;
    }
  }

  // Delete product
  async deleteProduct(id: string): Promise<boolean> {
    try {
      const collection = await this.getProductsCollection();
      const result = await collection.deleteOne({ id });
      return result.deletedCount > 0;
    } catch (error) {
      console.error('Error deleting product:', error);
      return false;
    }
  }

  // Get categories
  async getCategories(): Promise<string[]> {
    try {
      const collection = await this.getProductsCollection();
      const categories = await collection.distinct('category', { active: true });
      return categories.filter(Boolean).sort();
    } catch (error) {
      console.error('Error getting categories:', error);
      return [];
    }
  }

  // Get brands
  async getBrands(): Promise<string[]> {
    try {
      const collection = await this.getProductsCollection();
      const brands = await collection.distinct('brand', { active: true, brand: { $ne: null as any } });
      return (brands.filter(Boolean) as string[]).sort();
    } catch (error) {
      console.error('Error getting brands:', error);
      return [];
    }
  }

  // User management methods

  async getUserById(id: string): Promise<User | null> {
    try {
      const collection = await this.getUsersCollection();
      return await collection.findOne({ id });
    } catch (error) {
      console.error('Error getting user by ID:', error);
      return null;
    }
  }

  async createUser(userData: {
    email: string;
    password: string;
    name: string;
    role: string;
    active: boolean;
  }): Promise<string> {
    try {
      const collection = await this.getUsersCollection();

      const id = Date.now().toString();

      const user: User = {
        id,
        email: userData.email,
        password: userData.password,
        name: userData.name,
        role: userData.role as any,
        active: userData.active,
        created_at: new Date(),
        updated_at: new Date()
      };

      await collection.insertOne(user);
      return id;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async updateUserLastLogin(userId: string): Promise<void> {
    try {
      const collection = await this.getUsersCollection();
      await collection.updateOne(
        { id: userId },
        {
          $set: {
            last_login_at: new Date(),
            updated_at: new Date()
          }
        }
      );
    } catch (error) {
      console.error('Error updating last login:', error);
    }
  }

  // Initialize indexes for performance
  async createIndexes(): Promise<void> {
    try {
      const productsCollection = await this.getProductsCollection();
      const usersCollection = await this.getUsersCollection();

      // Product indexes
      await productsCollection.createIndex({ id: 1 }, { unique: true });
      await productsCollection.createIndex({ slug: 1 }, { unique: true });
      await productsCollection.createIndex({ category: 1 });
      await productsCollection.createIndex({ brand: 1 });
      await productsCollection.createIndex({ source_platform: 1 });
      await productsCollection.createIndex({ featured: 1 });
      await productsCollection.createIndex({ active: 1 });
      await productsCollection.createIndex({ created_at: -1 });
      await productsCollection.createIndex({ title: 'text', description: 'text' });

      // User indexes
      await usersCollection.createIndex({ id: 1 }, { unique: true });
      await usersCollection.createIndex({ email: 1 }, { unique: true });

      console.log('✅ MongoDB indexes created successfully');
    } catch (error) {
      console.error('Error creating indexes:', error);
    }
  }
}

// Export singleton instance
export const mongodbService = new MongoDBService();