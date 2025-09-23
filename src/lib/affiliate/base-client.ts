/**
 * ARCO Affiliate Integration Library
 * OAuth2 and API integrations for affiliate platforms
 */

export interface AffiliateConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: string[];
  authUrl: string;
  tokenUrl: string;
  apiBaseUrl: string;
}

export interface AffiliateCredentials {
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
  userId: string;
  platform: string;
}

/**
 * Amazon Associates API Configuration
 */
export const AMAZON_CONFIG: AffiliateConfig = {
  clientId: process.env.AMAZON_CLIENT_ID || '',
  clientSecret: process.env.AMAZON_CLIENT_SECRET || '',
  redirectUri: process.env.AMAZON_REDIRECT_URI || 'http://localhost:3000/auth/amazon/callback',
  scopes: ['advertising::campaign_management', 'advertising::display'],
  authUrl: 'https://www.amazon.com/ap/oa',
  tokenUrl: 'https://api.amazon.com/auth/o2/token',
  apiBaseUrl: 'https://advertising-api.amazon.com/v2'
};

/**
 * Magazine Luiza Partner Configuration
 */
export const MAGALU_CONFIG: AffiliateConfig = {
  clientId: process.env.MAGALU_CLIENT_ID || '',
  clientSecret: process.env.MAGALU_CLIENT_SECRET || '',
  redirectUri: process.env.MAGALU_REDIRECT_URI || 'http://localhost:3000/auth/magalu/callback',
  scopes: ['read_products', 'read_orders', 'affiliate_access'],
  authUrl: 'https://parceiro.magazineluiza.com.br/oauth/authorize',
  tokenUrl: 'https://parceiro.magazineluiza.com.br/oauth/token',
  apiBaseUrl: 'https://api.parceiro.magazineluiza.com.br/v1'
};

/**
 * Shopee Affiliate Configuration
 */
export const SHOPEE_CONFIG: AffiliateConfig = {
  clientId: process.env.SHOPEE_CLIENT_ID || '',
  clientSecret: process.env.SHOPEE_CLIENT_SECRET || '',
  redirectUri: process.env.SHOPEE_REDIRECT_URI || 'http://localhost:3000/auth/shopee/callback',
  scopes: ['affiliate', 'product_read'],
  authUrl: 'https://partner.shopee.com.br/api/v1/oauth/authorize',
  tokenUrl: 'https://partner.shopee.com.br/api/v1/oauth/token',
  apiBaseUrl: 'https://partner.shopee.com.br/api/v1'
};

/**
 * Base Affiliate Client
 */
export abstract class BaseAffiliateClient {
  protected config: AffiliateConfig;
  protected credentials?: AffiliateCredentials;

  constructor(config: AffiliateConfig) {
    this.config = config;
  }

  /**
   * Generate OAuth authorization URL
   */
  getAuthUrl(state?: string): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      scope: this.config.scopes.join(' '),
      response_type: 'code',
      ...(state && { state })
    });

    return `${this.config.authUrl}?${params.toString()}`;
  }

  /**
   * Exchange authorization code for access token
   */
  async exchangeCodeForToken(code: string): Promise<AffiliateCredentials> {
    const response = await fetch(this.config.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        code,
        redirect_uri: this.config.redirectUri
      })
    });

    if (!response.ok) {
      throw new Error(`Token exchange failed: ${response.statusText}`);
    }

    const data = await response.json();
    
    this.credentials = {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: Date.now() + (data.expires_in * 1000),
      userId: data.user_id || 'unknown',
      platform: this.constructor.name.toLowerCase()
    };

    return this.credentials;
  }

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<AffiliateCredentials> {
    if (!this.credentials?.refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await fetch(this.config.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: this.credentials.refreshToken,
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret
      })
    });

    if (!response.ok) {
      throw new Error(`Token refresh failed: ${response.statusText}`);
    }

    const data = await response.json();
    
    this.credentials = {
      ...this.credentials,
      accessToken: data.access_token,
      expiresAt: Date.now() + (data.expires_in * 1000)
    };

    return this.credentials;
  }

  /**
   * Make authenticated API request
   */
  protected async apiRequest(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<Response> {
    if (!this.credentials) {
      throw new Error('No credentials available. Please authenticate first.');
    }

    // Check if token needs refresh
    if (Date.now() >= this.credentials.expiresAt) {
      await this.refreshToken();
    }

    const url = `${this.config.apiBaseUrl}${endpoint}`;
    
    return fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.credentials.accessToken}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    });
  }

  /**
   * Set credentials (e.g., from stored session)
   */
  setCredentials(credentials: AffiliateCredentials): void {
    this.credentials = credentials;
  }

  /**
   * Get current credentials
   */
  getCredentials(): AffiliateCredentials | undefined {
    return this.credentials;
  }

  // Abstract methods to be implemented by specific platform clients
  abstract getProducts(params?: any): Promise<any>;
  abstract getCommissions(params?: any): Promise<any>;
  abstract generateAffiliateLink(productId: string): Promise<string>;
}