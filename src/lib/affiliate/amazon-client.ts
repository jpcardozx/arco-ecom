/**
 * Amazon Associates API Client
 * Implementation for Amazon affiliate integration
 */

import { BaseAffiliateClient, AMAZON_CONFIG } from './base-client';

export interface AmazonProduct {
  asin: string;
  title: string;
  price: {
    amount: number;
    currency: string;
    displayAmount: string;
  };
  images: {
    primary: {
      small: string;
      medium: string;
      large: string;
    };
  };
  url: string;
  commission: {
    rate: number;
    amount: number;
  };
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
}

export interface AmazonSearchParams {
  keywords?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'relevance' | 'price_low_to_high' | 'price_high_to_low' | 'rating';
  page?: number;
  itemCount?: number;
}

export class AmazonAffiliateClient extends BaseAffiliateClient {
  private partnerTag: string;

  constructor(partnerTag: string) {
    super(AMAZON_CONFIG);
    this.partnerTag = partnerTag;
  }

  /**
   * Search for products using Amazon Product Advertising API
   */
  async getProducts(params: AmazonSearchParams = {}): Promise<AmazonProduct[]> {
    const searchParams = {
      Operation: 'SearchItems',
      PartnerTag: this.partnerTag,
      PartnerType: 'Associates',
      Keywords: params.keywords || 'electronics',
      SearchIndex: params.category || 'All',
      ItemCount: Math.min(params.itemCount || 10, 50),
      Resources: [
        'Images.Primary.Small',
        'Images.Primary.Medium', 
        'Images.Primary.Large',
        'ItemInfo.Title',
        'ItemInfo.Features',
        'Offers.Listings.Price',
        'CustomerReviews.StarRating',
        'CustomerReviews.Count'
      ].join(',')
    };

    try {
      const response = await this.apiRequest('/paapi5/searchitems', {
        method: 'POST',
        body: JSON.stringify(searchParams)
      });

      if (!response.ok) {
        throw new Error(`Amazon API error: ${response.statusText}`);
      }

      const data = await response.json();
      
      return this.transformAmazonProducts(data.SearchResult?.Items || []);
    } catch (error) {
      console.error('Amazon API error:', error);
      
      // Return mock data for development
      return this.getMockProducts(params);
    }
  }

  /**
   * Get commission information for products
   */
  async getCommissions(asins: string[]): Promise<any> {
    // Amazon commission rates vary by category
    const commissionRates = {
      'Electronics': 4,
      'Fashion': 8,
      'Home & Kitchen': 6,
      'Books': 4.5,
      'Sports': 6,
      'Beauty': 8,
      'Default': 5
    };

    return asins.map(asin => ({
      asin,
      commission: {
        rate: commissionRates.Default,
        currency: 'BRL'
      }
    }));
  }

  /**
   * Generate affiliate link for a product
   */
  async generateAffiliateLink(asin: string): Promise<string> {
    const baseUrl = 'https://www.amazon.com.br/dp/';
    const affiliateParams = new URLSearchParams({
      tag: this.partnerTag,
      linkCode: 'as2',
      creative: '9325',
      creativeASIN: asin
    });

    return `${baseUrl}${asin}?${affiliateParams.toString()}`;
  }

  /**
   * Transform Amazon API response to our format
   */
  private transformAmazonProducts(items: any[]): AmazonProduct[] {
    return items.map(item => ({
      asin: item.ASIN,
      title: item.ItemInfo?.Title?.DisplayValue || 'Product Title',
      price: {
        amount: item.Offers?.Listings?.[0]?.Price?.Amount || 0,
        currency: item.Offers?.Listings?.[0]?.Price?.Currency || 'BRL',
        displayAmount: item.Offers?.Listings?.[0]?.Price?.DisplayAmount || 'R$ 0,00'
      },
      images: {
        primary: {
          small: item.Images?.Primary?.Small?.URL || '',
          medium: item.Images?.Primary?.Medium?.URL || '',
          large: item.Images?.Primary?.Large?.URL || ''
        }
      },
      url: item.DetailPageURL || '',
      commission: {
        rate: 5, // Default 5% commission
        amount: (item.Offers?.Listings?.[0]?.Price?.Amount || 0) * 0.05
      },
      category: item.BrowseNodeInfo?.BrowseNodes?.[0]?.DisplayName || 'General',
      brand: item.ItemInfo?.ByLineInfo?.Brand?.DisplayValue || 'Unknown',
      rating: item.CustomerReviews?.StarRating?.Value || 0,
      reviewCount: item.CustomerReviews?.Count || 0
    }));
  }

  /**
   * Mock products for development
   */
  private getMockProducts(params: AmazonSearchParams): AmazonProduct[] {
    const mockProducts: AmazonProduct[] = [
      {
        asin: 'B08N5WRWNW',
        title: 'Echo Dot (4ª Geração) - Smart Speaker com Alexa',
        price: {
          amount: 299.99,
          currency: 'BRL',
          displayAmount: 'R$ 299,99'
        },
        images: {
          primary: {
            small: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=200&h=200&fit=crop&auto=format&q=80',
            medium: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=400&h=400&fit=crop&auto=format&q=80',
            large: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=800&h=800&fit=crop&auto=format&q=80'
          }
        },
        url: 'https://amazon.com.br/dp/B08N5WRWNW',
        commission: {
          rate: 4,
          amount: 12.00
        },
        category: 'Electronics',
        brand: 'Amazon',
        rating: 4.6,
        reviewCount: 12543
      },
      {
        asin: 'B087C4HH29',
        title: 'Smartphone Samsung Galaxy A54 5G 256GB',
        price: {
          amount: 1899.99,
          currency: 'BRL',
          displayAmount: 'R$ 1.899,99'
        },
        images: {
          primary: {
            small: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop&auto=format&q=80',
            medium: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&auto=format&q=80',
            large: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop&auto=format&q=80'
          }
        },
        url: 'https://amazon.com.br/dp/B087C4HH29',
        commission: {
          rate: 4,
          amount: 76.00
        },
        category: 'Electronics',
        brand: 'Samsung',
        rating: 4.3,
        reviewCount: 8924
      },
      {
        asin: 'B08K4NRBY1',
        title: 'Tênis Nike Air Max 270 Masculino',
        price: {
          amount: 549.99,
          currency: 'BRL',
          displayAmount: 'R$ 549,99'
        },
        images: {
          primary: {
            small: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop&auto=format&q=80',
            medium: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&auto=format&q=80',
            large: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop&auto=format&q=80'
          }
        },
        url: 'https://amazon.com.br/dp/B08K4NRBY1',
        commission: {
          rate: 6,
          amount: 33.00
        },
        category: 'Sports',
        brand: 'Nike',
        rating: 4.7,
        reviewCount: 3421
      }
    ];

    // Filter by search term if provided
    if (params.keywords) {
      const searchTerm = params.keywords.toLowerCase();
      return mockProducts.filter(product => 
        product.title.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      );
    }

    return mockProducts;
  }
}