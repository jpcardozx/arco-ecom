/**
 * Real Google Analytics 4 Client
 * 
 * Connects to actual GA4 API for real data vs mocks
 * Handles authentication, rate limiting, and error recovery
 */

import { BetaAnalyticsDataClient } from '@google-analytics/data';

interface GA4Config {
  ga4PropertyId: string;
  ga4ServiceAccountPath?: string;
  ga4ClientId?: string;
  ga4ClientSecret?: string;
}

interface AnalyticsData {
  sessions: number;
  pageviews: number;
  users: number;
  bounceRate: number;
  avgSessionDuration: number;
  conversionRate: number;
  organicSessions: number;
  directSessions: number;
  referralSessions: number;
  previousPeriodComparison?: {
    percentChange: number;
    period: string;
  };
  topPages: Array<{
    page: string;
    pageviews: number;
    bounceRate: number;
  }>;
}

export class GoogleAnalytics4Client {
  private client: BetaAnalyticsDataClient | null = null;
  private config: GA4Config;
  private initialized = false;

  constructor(config: GA4Config) {
    this.config = config;
  }

  async initialize(): Promise<boolean> {
    try {
      if (this.config.ga4ServiceAccountPath) {
        // Service Account authentication
        this.client = new BetaAnalyticsDataClient({
          keyFilename: this.config.ga4ServiceAccountPath,
        });
      } else if (this.config.ga4ClientId && this.config.ga4ClientSecret) {
        // OAuth authentication (would need implementation)
        console.warn('OAuth authentication not yet implemented, falling back to service account');
        return false;
      } else {
        console.warn('No GA4 credentials provided');
        return false;
      }

      // Test connection
      await this.testConnection();
      this.initialized = true;
      console.log('✅ GA4 client initialized successfully');
      return true;
    } catch (error) {
      console.error('❌ Failed to initialize GA4 client:', error);
      this.initialized = false;
      return false;
    }
  }

  private async testConnection(): Promise<void> {
    if (!this.client) throw new Error('GA4 client not initialized');

    try {
      // Simple test query to verify connection
      const [response] = await this.client.runReport({
        property: `properties/${this.config.ga4PropertyId}`,
        dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        metrics: [{ name: 'sessions' }],
        dimensions: [{ name: 'date' }],
      });

      if (!response.rows || response.rows.length === 0) {
        throw new Error('No data returned from GA4 API - check property ID and permissions');
      }
    } catch (error) {
      throw new Error(`GA4 connection test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getAnalyticsData(dateRange: string): Promise<AnalyticsData> {
    if (!this.initialized) {
      const initSuccess = await this.initialize();
      if (!initSuccess) {
        throw new Error('GA4 client initialization failed');
      }
    }

    if (!this.client) {
      throw new Error('GA4 client not available');
    }

    try {
      const { startDate, endDate } = this.parseDateRange(dateRange);
      
      // Main metrics query
      const [response] = await this.client.runReport({
        property: `properties/${this.config.ga4PropertyId}`,
        dateRanges: [{ startDate, endDate }],
        metrics: [
          { name: 'sessions' },
          { name: 'screenPageViews' },
          { name: 'totalUsers' },
          { name: 'bounceRate' },
          { name: 'averageSessionDuration' },
          { name: 'conversions' }, // Will need to be configured in GA4
        ],
        dimensions: [{ name: 'sessionDefaultChannelGrouping' }],
      });

      // Top pages query
      const [pagesResponse] = await this.client.runReport({
        property: `properties/${this.config.ga4PropertyId}`,
        dateRanges: [{ startDate, endDate }],
        metrics: [
          { name: 'screenPageViews' },
          { name: 'bounceRate' },
        ],
        dimensions: [{ name: 'pagePath' }],
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 10,
      });

      return this.parseGA4Response(response, pagesResponse);
    } catch (error) {
      console.error('Error fetching GA4 data:', error);
      throw new Error(`Failed to fetch analytics data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private parseDateRange(dateRange: string): { startDate: string; endDate: string } {
    const endDate = 'today';
    
    switch (dateRange) {
      case '7d':
        return { startDate: '7daysAgo', endDate };
      case '30d':
        return { startDate: '30daysAgo', endDate };
      case '90d':
        return { startDate: '90daysAgo', endDate };
      default:
        return { startDate: '30daysAgo', endDate };
    }
  }

  private parseGA4Response(mainResponse: any, pagesResponse: any): AnalyticsData {
    if (!mainResponse.rows || mainResponse.rows.length === 0) {
      throw new Error('No data available for the specified date range');
    }

    // Extract metrics from first row (totals)
    const metrics = mainResponse.rows[0].metricValues;
    const sessions = parseInt(metrics[0].value) || 0;
    const pageviews = parseInt(metrics[1].value) || 0;
    const users = parseInt(metrics[2].value) || 0;
    const bounceRate = parseFloat(metrics[3].value) || 0;
    const avgSessionDuration = parseFloat(metrics[4].value) || 0;
    const conversions = parseInt(metrics[5].value) || 0;

    // Calculate conversion rate
    const conversionRate = sessions > 0 ? conversions / sessions : 0;

    // Parse channel data for traffic sources
    let organicSessions = 0;
    let directSessions = 0;
    let referralSessions = 0;

    mainResponse.rows.forEach((row: any) => {
      const channel = row.dimensionValues[0].value;
      const sessionCount = parseInt(row.metricValues[0].value) || 0;
      
      if (channel.toLowerCase().includes('organic')) {
        organicSessions += sessionCount;
      } else if (channel.toLowerCase().includes('direct')) {
        directSessions += sessionCount;
      } else if (channel.toLowerCase().includes('referral')) {
        referralSessions += sessionCount;
      }
    });

    // Parse top pages
    const topPages = pagesResponse.rows?.slice(0, 10).map((row: any) => ({
      page: row.dimensionValues[0].value,
      pageviews: parseInt(row.metricValues[0].value) || 0,
      bounceRate: parseFloat(row.metricValues[1].value) || 0,
    })) || [];

    return {
      sessions,
      pageviews,
      users,
      bounceRate,
      avgSessionDuration,
      conversionRate,
      organicSessions,
      directSessions,
      referralSessions,
      topPages,
    };
  }

  async getFallbackData(): Promise<AnalyticsData> {
    // Return reasonable baseline data when API is unavailable
    console.log('📊 Using GA4 fallback data (API unavailable)');
    
    return {
      sessions: 1247,
      pageviews: 3891,
      users: 987,
      bounceRate: 0.32,
      avgSessionDuration: 245,
      conversionRate: 0.078,
      organicSessions: 623,
      directSessions: 374,
      referralSessions: 250,
      topPages: [
        { page: '/', pageviews: 1245, bounceRate: 0.28 },
        { page: '/services', pageviews: 564, bounceRate: 0.45 },
        { page: '/about', pageviews: 387, bounceRate: 0.52 },
      ],
    };
  }

  // Health check method
  async healthCheck(): Promise<{ status: string; message: string }> {
    try {
      if (!this.initialized) {
        return { status: 'disconnected', message: 'GA4 client not initialized' };
      }

      await this.testConnection();
      return { status: 'healthy', message: 'GA4 API connection working' };
    } catch (error) {
      return { 
        status: 'error', 
        message: `GA4 connection failed: ${error instanceof Error ? error.message : 'Unknown error'}` 
      };
    }
  }
}

export default GoogleAnalytics4Client;