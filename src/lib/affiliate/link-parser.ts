/**
 * ARCO Affiliate Link Parser
 * Parses affiliate links and extracts product information
 */

export interface ParsedProduct {
  id: string;
  title: string;
  price?: number;
  imageUrl?: string;
  platform: string;
  originalUrl: string;
}

export interface LinkParserResult {
  success: boolean; // Changed from isValid to match API expectations
  isValid?: boolean; // Keep for backward compatibility
  product?: ParsedProduct;
  error?: string;
}

// Main parser implementation
async function parseAffiliateLink(url: string, options?: any): Promise<LinkParserResult> {
  try {
    // Basic URL validation
    const urlObj = new URL(url);
    
    // Check if it's a supported platform
    const supportedPlatforms = [
      'mercadolivre.com.br',
      'mercadolibre.com',
      'amazon.com.br',
      'amazon.com',
      'shopee.com.br'
    ];
    
    const platform = supportedPlatforms.find(p => urlObj.hostname.includes(p));
    
    if (!platform) {
      return {
        success: false,
        isValid: false,
        error: 'Platform not supported'
      };
    }
    
    // Mock product data for now
    const product: ParsedProduct = {
      id: Date.now().toString(),
      title: 'Product from ' + platform,
      platform: platform,
      originalUrl: url,
      price: 99.99
    };
    
    return {
      success: true,
      isValid: true,
      product
    };
    
  } catch (error) {
    return {
      success: false,
      isValid: false,
      error: 'Invalid URL format'
    };
  }
}

// Export the parser with backward compatibility
export const affiliateLinkParser = {
  parseLink: parseAffiliateLink,
  parse: parseAffiliateLink
};

// Class export for new usage patterns
export class AffiliateeLinkParser {
  static async parse(url: string): Promise<LinkParserResult> {
    return parseAffiliateLink(url);
  }

  static async parseLink(url: string, options?: any): Promise<LinkParserResult> {
    return parseAffiliateLink(url, options);
  }
}