/**
 * ARCO MongoDB Debug & Health Check Utilities
 * Professional debugging tools for MongoDB operations
 */

import { mongodbService } from './mongodb';

export interface DatabaseHealth {
  status: 'healthy' | 'warning' | 'critical';
  connection: boolean;
  latency: number;
  collections: {
    products: number;
    users: number;
  };
  indexes: string[];
  lastChecked: Date;
  errors: string[];
}

export interface OperationLog {
  id: string;
  operation: string;
  collection: string;
  timestamp: Date;
  duration: number;
  success: boolean;
  error?: string;
  metadata?: any;
}

class MongoDBDebugger {
  private operationLogs: OperationLog[] = [];
  private maxLogs = 100;

  /**
   * Check MongoDB health and connectivity
   */
  async checkHealth(): Promise<DatabaseHealth> {
    const startTime = Date.now();
    const health: DatabaseHealth = {
      status: 'healthy',
      connection: false,
      latency: 0,
      collections: { products: 0, users: 0 },
      indexes: [],
      lastChecked: new Date(),
      errors: []
    };

    try {
      // Test connection
      const db = await mongodbService.getDb();
      health.connection = true;
      health.latency = Date.now() - startTime;

      // Count documents
      const productsCollection = await mongodbService.getProductsCollection();
      const usersCollection = await mongodbService.getUsersCollection();

      health.collections.products = await productsCollection.countDocuments();
      health.collections.users = await usersCollection.countDocuments();

      // List indexes
      const productIndexes = await productsCollection.listIndexes().toArray();
      const userIndexes = await usersCollection.listIndexes().toArray();

      health.indexes = [
        ...productIndexes.map(idx => `products.${idx.name}`),
        ...userIndexes.map(idx => `users.${idx.name}`)
      ];

      // Determine health status
      if (health.latency > 5000) {
        health.status = 'critical';
        health.errors.push('High latency detected (>5s)');
      } else if (health.latency > 2000) {
        health.status = 'warning';
        health.errors.push('Moderate latency detected (>2s)');
      }

      console.log('✅ MongoDB Health Check:', {
        status: health.status,
        latency: `${health.latency}ms`,
        products: health.collections.products,
        users: health.collections.users
      });

    } catch (error) {
      health.status = 'critical';
      health.connection = false;
      health.latency = Date.now() - startTime;
      health.errors.push(error instanceof Error ? error.message : 'Unknown error');

      console.error('❌ MongoDB Health Check Failed:', error);
    }

    return health;
  }

  /**
   * Log database operations for debugging
   */
  logOperation(
    operation: string,
    collection: string,
    duration: number,
    success: boolean,
    error?: string,
    metadata?: any
  ): void {
    const log: OperationLog = {
      id: Date.now().toString(),
      operation,
      collection,
      timestamp: new Date(),
      duration,
      success,
      error,
      metadata
    };

    this.operationLogs.unshift(log);

    // Keep only the last maxLogs entries
    if (this.operationLogs.length > this.maxLogs) {
      this.operationLogs = this.operationLogs.slice(0, this.maxLogs);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      const status = success ? '✅' : '❌';
      console.log(`${status} MongoDB ${operation} on ${collection} (${duration}ms)`);
      if (error) console.error('Error:', error);
    }
  }

  /**
   * Get operation logs for debugging
   */
  getOperationLogs(limit: number = 50): OperationLog[] {
    return this.operationLogs.slice(0, limit);
  }

  /**
   * Clear operation logs
   */
  clearLogs(): void {
    this.operationLogs = [];
  }

  /**
   * Test CRUD operations
   */
  async testCRUDOperations(): Promise<{
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
    errors: string[];
  }> {
    const result = {
      create: false,
      read: false,
      update: false,
      delete: false,
      errors: [] as string[]
    };

    const testProductId = `test-${Date.now()}`;

    try {
      // Test CREATE
      const startCreate = Date.now();
      const createResult = await mongodbService.addProduct({
        id: testProductId,
        title: 'Test Product',
        description: 'This is a test product for debugging',
        price: 99.99,
        affiliate_link: 'https://test.com',
        source_platform: 'test',
        main_image: 'https://test.com/image.jpg',
        category: 'test',
        in_stock: true,
        slug: `test-product-${Date.now()}`,
        featured: false,
        active: true
      });

      if (createResult) {
        result.create = true;
        this.logOperation('CREATE', 'products', Date.now() - startCreate, true);
      } else {
        result.errors.push('Failed to create test product');
        this.logOperation('CREATE', 'products', Date.now() - startCreate, false, 'Creation failed');
      }

    } catch (error) {
      result.errors.push(`Create error: ${error instanceof Error ? error.message : 'Unknown'}`);
      this.logOperation('CREATE', 'products', 0, false, error instanceof Error ? error.message : 'Unknown');
    }

    try {
      // Test READ
      const startRead = Date.now();
      const readResult = await mongodbService.getProductById(testProductId);

      if (readResult) {
        result.read = true;
        this.logOperation('READ', 'products', Date.now() - startRead, true);
      } else {
        result.errors.push('Failed to read test product');
        this.logOperation('READ', 'products', Date.now() - startRead, false, 'Read failed');
      }

    } catch (error) {
      result.errors.push(`Read error: ${error instanceof Error ? error.message : 'Unknown'}`);
      this.logOperation('READ', 'products', 0, false, error instanceof Error ? error.message : 'Unknown');
    }

    try {
      // Test UPDATE
      const startUpdate = Date.now();
      const updateResult = await mongodbService.updateProduct(testProductId, {
        title: 'Updated Test Product'
      });

      if (updateResult) {
        result.update = true;
        this.logOperation('UPDATE', 'products', Date.now() - startUpdate, true);
      } else {
        result.errors.push('Failed to update test product');
        this.logOperation('UPDATE', 'products', Date.now() - startUpdate, false, 'Update failed');
      }

    } catch (error) {
      result.errors.push(`Update error: ${error instanceof Error ? error.message : 'Unknown'}`);
      this.logOperation('UPDATE', 'products', 0, false, error instanceof Error ? error.message : 'Unknown');
    }

    try {
      // Test DELETE
      const startDelete = Date.now();
      const deleteResult = await mongodbService.deleteProduct(testProductId);

      if (deleteResult) {
        result.delete = true;
        this.logOperation('DELETE', 'products', Date.now() - startDelete, true);
      } else {
        result.errors.push('Failed to delete test product');
        this.logOperation('DELETE', 'products', Date.now() - startDelete, false, 'Delete failed');
      }

    } catch (error) {
      result.errors.push(`Delete error: ${error instanceof Error ? error.message : 'Unknown'}`);
      this.logOperation('DELETE', 'products', 0, false, error instanceof Error ? error.message : 'Unknown');
    }

    return result;
  }

  /**
   * Monitor database performance
   */
  async monitorPerformance(): Promise<{
    averageLatency: number;
    slowQueries: OperationLog[];
    errorRate: number;
    totalOperations: number;
  }> {
    const logs = this.getOperationLogs();

    if (logs.length === 0) {
      return {
        averageLatency: 0,
        slowQueries: [],
        errorRate: 0,
        totalOperations: 0
      };
    }

    const totalLatency = logs.reduce((sum, log) => sum + log.duration, 0);
    const averageLatency = totalLatency / logs.length;

    const slowQueries = logs.filter(log => log.duration > 1000); // Queries > 1s
    const errors = logs.filter(log => !log.success);
    const errorRate = (errors.length / logs.length) * 100;

    return {
      averageLatency,
      slowQueries,
      errorRate,
      totalOperations: logs.length
    };
  }

  /**
   * Generate debug report
   */
  async generateDebugReport(): Promise<{
    health: DatabaseHealth;
    performance: any;
    crudTest: any;
    recommendations: string[];
  }> {
    console.log('🔍 Generating MongoDB Debug Report...');

    const health = await this.checkHealth();
    const performance = await this.monitorPerformance();
    const crudTest = await this.testCRUDOperations();

    const recommendations: string[] = [];

    // Generate recommendations based on results
    if (health.latency > 2000) {
      recommendations.push('Consider optimizing database queries or upgrading connection');
    }

    if (performance.errorRate > 10) {
      recommendations.push('High error rate detected - review error logs');
    }

    if (performance.slowQueries.length > 0) {
      recommendations.push('Slow queries detected - consider adding indexes');
    }

    if (!crudTest.create || !crudTest.read || !crudTest.update || !crudTest.delete) {
      recommendations.push('CRUD operations failing - check database permissions');
    }

    if (health.indexes.length < 5) {
      recommendations.push('Consider adding more indexes for better performance');
    }

    console.log('📊 Debug Report Generated:', {
      healthStatus: health.status,
      avgLatency: performance.averageLatency,
      errorRate: performance.errorRate,
      crudSuccess: Object.values(crudTest).filter(v => v === true).length
    });

    return {
      health,
      performance,
      crudTest,
      recommendations
    };
  }
}

// Export singleton instance
export const mongodbDebugger = new MongoDBDebugger();

// Enhanced MongoDB service with debugging
export class EnhancedMongoDBService {
  async getProducts(filters: any = {}) {
    const startTime = Date.now();
    try {
      const result = await mongodbService.getProducts(filters);
      mongodbDebugger.logOperation(
        'getProducts',
        'products',
        Date.now() - startTime,
        true,
        undefined,
        { filters, count: result.length }
      );
      return result;
    } catch (error) {
      mongodbDebugger.logOperation(
        'getProducts',
        'products',
        Date.now() - startTime,
        false,
        error instanceof Error ? error.message : 'Unknown error'
      );
      throw error;
    }
  }

  async addProduct(productData: any) {
    const startTime = Date.now();
    try {
      const result = await mongodbService.addProduct(productData);
      mongodbDebugger.logOperation(
        'addProduct',
        'products',
        Date.now() - startTime,
        !!result,
        result ? undefined : 'Product creation failed',
        { productId: result?.id }
      );
      return result;
    } catch (error) {
      mongodbDebugger.logOperation(
        'addProduct',
        'products',
        Date.now() - startTime,
        false,
        error instanceof Error ? error.message : 'Unknown error'
      );
      throw error;
    }
  }
}

export const enhancedMongodbService = new EnhancedMongoDBService();