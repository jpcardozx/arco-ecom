/**
 * Production Optimization Core - Error Handling, Monitoring, Performance
 * 
 * Comprehensive production-ready features for ARCO MCP platform
 */

interface ErrorMetrics {
  total: number;
  byType: Map<string, number>;
  byComponent: Map<string, number>;
  recoverySuccess: number;
  criticalErrors: number;
}

interface PerformanceMetrics {
  responseTime: number[];
  memoryUsage: number[];
  cacheHitRate: number;
  throughput: number;
  concurrentConnections: number;
}

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'critical';
  components: Map<string, ComponentHealth>;
  lastCheck: Date;
  uptime: number;
}

interface ComponentHealth {
  status: 'healthy' | 'degraded' | 'error';
  responseTime: number;
  errorRate: number;
  lastError?: string;
}

export class ProductionOptimizer {
  private errorMetrics: ErrorMetrics = {
    total: 0,
    byType: new Map(),
    byComponent: new Map(),
    recoverySuccess: 0,
    criticalErrors: 0
  };

  private performanceMetrics: PerformanceMetrics = {
    responseTime: [],
    memoryUsage: [],
    cacheHitRate: 0,
    throughput: 0,
    concurrentConnections: 0
  };

  private healthStatus: HealthStatus = {
    status: 'healthy',
    components: new Map(),
    lastCheck: new Date(),
    uptime: 0
  };

  private startTime = Date.now();
  private monitoringInterval?: NodeJS.Timeout;

  constructor() {
    this.startMonitoring();
    this.setupGracefulShutdown();
  }

  // Error Handling and Recovery
  async executeWithFallback<T>(
    operation: () => Promise<T>,
    fallback: () => Promise<T>,
    component: string,
    operationName: string
  ): Promise<T> {
    const startTime = Date.now();
    
    try {
      const result = await this.withTimeout(operation(), 30000); // 30s timeout
      this.recordSuccess(component, operationName, Date.now() - startTime);
      return result;
    } catch (error) {
      this.recordError(error, component, operationName);
      
      // Attempt recovery strategies
      const recoveryResult = await this.attemptRecovery(error, fallback, component);
      if (recoveryResult.success && recoveryResult.data !== undefined) {
        this.errorMetrics.recoverySuccess++;
        return recoveryResult.data;
      }
      
      // If recovery fails, rethrow with context
      throw this.enrichError(error, component, operationName);
    }
  }

  private async withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
    return Promise.race([
      promise,
      new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error(`Operation timeout after ${timeoutMs}ms`)), timeoutMs)
      )
    ]);
  }

  private async attemptRecovery<T>(
    error: any, 
    fallback: () => Promise<T>, 
    component: string
  ): Promise<{ success: boolean; data?: T }> {
    try {
      // Strategy 1: Simple retry with backoff
      if (this.isRetryableError(error)) {
        await this.exponentialBackoff(1);
        const result = await fallback();
        console.log(`✅ Recovery successful for ${component} using fallback`);
        return { success: true, data: result };
      }

      // Strategy 2: Degraded mode
      if (this.isDegradableError(error)) {
        const degradedResult = await this.getDegradedResponse(component);
        console.log(`⚠️ Running in degraded mode for ${component}`);
        return { success: true, data: degradedResult as T };
      }

      return { success: false };
    } catch (recoveryError) {
      console.error(`❌ Recovery failed for ${component}:`, recoveryError);
      return { success: false };
    }
  }

  private isRetryableError(error: any): boolean {
    const retryablePatterns = [
      /timeout/i,
      /network/i,
      /connection/i,
      /ENOTFOUND/i,
      /ECONNRESET/i
    ];
    
    const errorMessage = error.message || error.toString();
    return retryablePatterns.some(pattern => pattern.test(errorMessage));
  }

  private isDegradableError(error: any): boolean {
    const degradablePatterns = [
      /external.*api/i,
      /third.*party/i,
      /analytics/i,
      /intelligence/i
    ];
    
    const errorMessage = error.message || error.toString();
    return degradablePatterns.some(pattern => pattern.test(errorMessage));
  }

  private async getDegradedResponse(component: string): Promise<any> {
    // Return cached or default responses for degraded mode
    const degradedResponses = {
      'business-intelligence': {
        analysis: 'Basic analysis - enhanced intelligence temporarily unavailable',
        confidence: 0.5,
        fallback: true,
        recommendations: ['Contact support for detailed analysis']
      },
      'competitive-analysis': {
        position: 'Market analysis temporarily unavailable',
        fallback: true,
        lastKnownData: new Date().toISOString()
      },
      'performance-optimization': {
        metrics: 'Performance data temporarily unavailable',
        fallback: true,
        basicRecommendations: ['Check server resources', 'Monitor load times']
      }
    };

    const componentKey = Object.keys(degradedResponses).find(key => 
      component.toLowerCase().includes(key)
    ) || 'business-intelligence';

    return degradedResponses[componentKey as keyof typeof degradedResponses];
  }

  private async exponentialBackoff(attempt: number): Promise<void> {
    const delay = Math.min(1000 * Math.pow(2, attempt), 10000); // Max 10s
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  private recordError(error: any, component: string, operation: string): void {
    this.errorMetrics.total++;
    
    const errorType = error.constructor.name;
    this.errorMetrics.byType.set(errorType, (this.errorMetrics.byType.get(errorType) || 0) + 1);
    this.errorMetrics.byComponent.set(component, (this.errorMetrics.byComponent.get(component) || 0) + 1);
    
    if (this.isCriticalError(error)) {
      this.errorMetrics.criticalErrors++;
      this.handleCriticalError(error, component, operation);
    }

    // Update component health
    this.updateComponentHealth(component, 'error', error.message);
    
    console.error(`❌ Error in ${component}.${operation}:`, {
      error: error.message,
      type: errorType,
      stack: error.stack?.split('\n').slice(0, 3),
      timestamp: new Date().toISOString()
    });
  }

  private recordSuccess(component: string, operation: string, responseTime: number): void {
    this.performanceMetrics.responseTime.push(responseTime);
    
    // Keep only last 100 measurements
    if (this.performanceMetrics.responseTime.length > 100) {
      this.performanceMetrics.responseTime.shift();
    }
    
    this.updateComponentHealth(component, 'healthy', undefined, responseTime);
  }

  private isCriticalError(error: any): boolean {
    const criticalPatterns = [
      /database/i,
      /authentication/i,
      /security/i,
      /corruption/i,
      /fatal/i
    ];
    
    const errorMessage = error.message || error.toString();
    return criticalPatterns.some(pattern => pattern.test(errorMessage));
  }

  private handleCriticalError(error: any, component: string, operation: string): void {
    console.error(`🚨 CRITICAL ERROR in ${component}.${operation}:`, error);
    
    // In production, this would alert monitoring systems
    this.alertMonitoringSystems({
      severity: 'critical',
      component,
      operation,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }

  private alertMonitoringSystems(alert: any): void {
    // Mock alert system - in production would integrate with monitoring
    console.log('🔔 ALERT SENT TO MONITORING:', alert);
  }

  private enrichError(error: any, component: string, operation: string): Error {
    const enrichedError = new Error(
      `[${component}.${operation}] ${error.message}`
    );
    enrichedError.stack = error.stack;
    (enrichedError as any).originalError = error;
    (enrichedError as any).component = component;
    (enrichedError as any).operation = operation;
    (enrichedError as any).timestamp = new Date().toISOString();
    
    return enrichedError;
  }

  // Performance Monitoring
  private startMonitoring(): void {
    this.monitoringInterval = setInterval(() => {
      this.collectPerformanceMetrics();
      this.updateHealthStatus();
      this.cleanupOldMetrics();
    }, 60000); // Every minute
  }

  private collectPerformanceMetrics(): void {
    if (typeof process !== 'undefined') {
      const memUsage = process.memoryUsage();
      this.performanceMetrics.memoryUsage.push(memUsage.heapUsed / 1024 / 1024); // MB
      
      // Keep only last 60 measurements (1 hour)
      if (this.performanceMetrics.memoryUsage.length > 60) {
        this.performanceMetrics.memoryUsage.shift();
      }
    }
    
    // Update uptime
    this.healthStatus.uptime = Date.now() - this.startTime;
  }

  private updateHealthStatus(): void {
    const avgResponseTime = this.getAverageResponseTime();
    const errorRate = this.getErrorRate();
    const memoryUsage = this.getCurrentMemoryUsage();
    
    let status: 'healthy' | 'degraded' | 'critical' = 'healthy';
    
    if (avgResponseTime > 5000 || errorRate > 0.1 || memoryUsage > 500) {
      status = 'degraded';
    }
    
    if (avgResponseTime > 15000 || errorRate > 0.3 || memoryUsage > 1000) {
      status = 'critical';
    }
    
    this.healthStatus.status = status;
    this.healthStatus.lastCheck = new Date();
  }

  private updateComponentHealth(
    component: string, 
    status: 'healthy' | 'degraded' | 'error', 
    error?: string, 
    responseTime?: number
  ): void {
    const current = this.healthStatus.components.get(component) || {
      status: 'healthy',
      responseTime: 0,
      errorRate: 0
    };
    
    this.healthStatus.components.set(component, {
      status,
      responseTime: responseTime || current.responseTime,
      errorRate: status === 'error' ? current.errorRate + 0.1 : Math.max(0, current.errorRate - 0.01),
      lastError: error
    });
  }

  // Performance Analytics
  getAverageResponseTime(): number {
    const times = this.performanceMetrics.responseTime;
    return times.length > 0 ? times.reduce((a, b) => a + b, 0) / times.length : 0;
  }

  getErrorRate(): number {
    const total = this.errorMetrics.total + this.errorMetrics.recoverySuccess;
    return total > 0 ? this.errorMetrics.total / total : 0;
  }

  getCurrentMemoryUsage(): number {
    const usage = this.performanceMetrics.memoryUsage;
    return usage.length > 0 ? usage[usage.length - 1] : 0;
  }

  getHealthReport(): HealthStatus & { metrics: any } {
    return {
      ...this.healthStatus,
      metrics: {
        averageResponseTime: this.getAverageResponseTime(),
        errorRate: this.getErrorRate(),
        memoryUsage: this.getCurrentMemoryUsage(),
        cacheHitRate: this.performanceMetrics.cacheHitRate,
        totalErrors: this.errorMetrics.total,
        recoverySuccessRate: this.errorMetrics.total > 0 
          ? this.errorMetrics.recoverySuccess / this.errorMetrics.total 
          : 1,
        uptime: this.healthStatus.uptime,
        componentHealth: Object.fromEntries(this.healthStatus.components)
      }
    };
  }

  // Configuration Management
  getEnvironmentConfig(): any {
    return {
      environment: process.env.NODE_ENV || 'development',
      logLevel: process.env.LOG_LEVEL || 'info',
      enableAnalytics: process.env.ENABLE_ANALYTICS !== 'false',
      enableExternalAPIs: process.env.ENABLE_EXTERNAL_APIS !== 'false',
      maxConcurrentRequests: parseInt(process.env.MAX_CONCURRENT_REQUESTS || '10'),
      requestTimeout: parseInt(process.env.REQUEST_TIMEOUT || '30000'),
      cacheTimeout: parseInt(process.env.CACHE_TIMEOUT || '300000'),
      enableDebugMode: process.env.DEBUG === 'true'
    };
  }

  // Cache Management
  updateCacheMetrics(hits: number, misses: number): void {
    const total = hits + misses;
    this.performanceMetrics.cacheHitRate = total > 0 ? hits / total : 0;
  }

  // Cleanup
  private cleanupOldMetrics(): void {
    // Clean up old performance data
    const oneHourAgo = Date.now() - (60 * 60 * 1000);
    
    // Reset component error rates periodically
    for (const [component, health] of this.healthStatus.components.entries()) {
      if (health.errorRate > 0) {
        health.errorRate = Math.max(0, health.errorRate - 0.01);
      }
    }
  }

  private setupGracefulShutdown(): void {
    const cleanup = () => {
      console.log('🔄 Graceful shutdown initiated...');
      
      if (this.monitoringInterval) {
        clearInterval(this.monitoringInterval);
      }
      
      // Log final metrics
      console.log('📊 Final Performance Report:', this.getHealthReport());
      
      process.exit(0);
    };

    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);
  }

  // Utility Methods
  isProduction(): boolean {
    return process.env.NODE_ENV === 'production';
  }

  shouldEnableFeature(feature: string): boolean {
    const config = this.getEnvironmentConfig();
    
    switch (feature) {
      case 'analytics':
        return config.enableAnalytics;
      case 'external-apis':
        return config.enableExternalAPIs;
      case 'debug':
        return config.enableDebugMode;
      default:
        return true;
    }
  }

  logMetrics(): void {
    const report = this.getHealthReport();
    console.log('📊 ARCO MCP Performance Metrics:', {
      status: report.status,
      uptime: `${Math.round(report.uptime / 1000 / 60)} minutes`,
      avgResponseTime: `${Math.round(report.metrics.averageResponseTime)}ms`,
      errorRate: `${(report.metrics.errorRate * 100).toFixed(2)}%`,
      memoryUsage: `${Math.round(report.metrics.memoryUsage)}MB`,
      cacheHitRate: `${(report.metrics.cacheHitRate * 100).toFixed(1)}%`,
      recoveryRate: `${(report.metrics.recoverySuccessRate * 100).toFixed(1)}%`
    });
  }
}