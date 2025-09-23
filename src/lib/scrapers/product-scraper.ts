/**
 * ARCO Product Scraper Service
 * Extrai dados de produtos automaticamente de links de afiliados
 */

import axios from 'axios';
import * as cheerio from 'cheerio';

export interface ScrapedProduct {
  title: string;
  description: string;
  price: number;
  original_price?: number;
  discount_percentage?: number;
  main_image: string;
  additional_images: string[];
  category: string;
  brand?: string;
  rating?: number;
  reviews_count?: number;
  in_stock: boolean;
  source_platform: string;
  affiliate_link: string;
  slug?: string;
}

interface ScraperStrategy {
  canHandle(url: string): boolean;
  scrape(url: string): Promise<ScrapedProduct>;
}

class AmazonScraper implements ScraperStrategy {
  canHandle(url: string): boolean {
    return url.includes('amazon.') || url.includes('amzn.to');
  }

  async scrape(url: string): Promise<ScrapedProduct> {
    try {
      // Resolver URL encurtada se necessário
      const resolvedUrl = await this.resolveShortUrl(url);
      
      const response = await axios.get(resolvedUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        },
        timeout: 10000
      });

      const $ = cheerio.load(response.data);

      // Extrair dados principais
      const title = this.extractTitle($);
      const price = this.extractPrice($);
      const originalPrice = this.extractOriginalPrice($);
      const images = this.extractImages($);
      const rating = this.extractRating($);
      const reviewsCount = this.extractReviewsCount($);
      const availability = this.extractAvailability($);

      return {
        title,
        description: this.extractDescription($),
        price,
        original_price: originalPrice,
        discount_percentage: originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0,
        main_image: images[0] || '',
        additional_images: images.slice(1),
        category: this.extractCategory($),
        brand: this.extractBrand($),
        rating,
        reviews_count: reviewsCount,
        in_stock: availability,
        source_platform: 'amazon',
        affiliate_link: url
      };
    } catch (error) {
      console.error('Erro ao fazer scraping da Amazon:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      throw new Error(`Falha ao extrair dados da Amazon: ${errorMessage}`);
    }
  }

  private async resolveShortUrl(url: string): Promise<string> {
    if (url.includes('amzn.to')) {
      try {
        const response = await axios.head(url, {
          maxRedirects: 5,
          validateStatus: () => true
        });
        return response.request.res.responseUrl || url;
      } catch {
        return url;
      }
    }
    return url;
  }

  private extractTitle($: cheerio.CheerioAPI): string {
    return (
      $('#productTitle').text().trim() ||
      $('h1.a-size-large').text().trim() ||
      $('[data-automation-id="product-title"]').text().trim() ||
      'Produto sem título'
    );
  }

  private extractPrice($: cheerio.CheerioAPI): number {
    const priceSelectors = [
      '.a-price-current .a-price-whole',
      '.a-price .a-price-whole',
      '#priceblock_ourprice',
      '#priceblock_dealprice',
      '.a-price-range .a-price-whole'
    ];

    for (const selector of priceSelectors) {
      const priceText = $(selector).first().text().trim();
      if (priceText) {
        const price = parseFloat(priceText.replace(/[^\d,]/g, '').replace(',', '.'));
        if (!isNaN(price)) return price;
      }
    }

    return 0;
  }

  private extractOriginalPrice($: cheerio.CheerioAPI): number | undefined {
    const originalPriceSelectors = [
      '.a-price.a-text-price .a-price-whole',
      '#priceblock_ourprice',
      '.a-price-was .a-price-whole'
    ];

    for (const selector of originalPriceSelectors) {
      const priceText = $(selector).text().trim();
      if (priceText) {
        const price = parseFloat(priceText.replace(/[^\d,]/g, '').replace(',', '.'));
        if (!isNaN(price)) return price;
      }
    }

    return undefined;
  }

  private extractImages($: cheerio.CheerioAPI): string[] {
    const images: string[] = [];
    
    // Imagem principal
    const mainImage = $('#landingImage').attr('src') || 
                     $('.a-dynamic-image').first().attr('src') ||
                     $('[data-automation-id="product-image"]').attr('src');
    
    if (mainImage) {
      images.push(this.cleanImageUrl(mainImage));
    }

    // Imagens adicionais
    $('.a-dynamic-image').each((_, el) => {
      const src = $(el).attr('src');
      if (src && !images.includes(this.cleanImageUrl(src))) {
        images.push(this.cleanImageUrl(src));
      }
    });

    return images.filter(img => img.length > 0);
  }

  private cleanImageUrl(url: string): string {
    // Remove parâmetros de redimensionamento da Amazon para pegar imagem em alta qualidade
    return url.replace(/\._[A-Z]{2}\d+_./, '._AC_SX679_.');
  }

  private extractDescription($: cheerio.CheerioAPI): string {
    const description = $('#feature-bullets ul').text().trim() ||
                       $('#productDescription p').text().trim() ||
                       $('.a-expander-content').text().trim();
    
    return description.substring(0, 500) + (description.length > 500 ? '...' : '');
  }

  private extractCategory($: cheerio.CheerioAPI): string {
    return $('#nav-subnav').attr('data-category') ||
           $('.nav-a-content').first().text().trim() ||
           'Geral';
  }

  private extractBrand($: cheerio.CheerioAPI): string | undefined {
    return $('#bylineInfo').text().replace('Marca:', '').trim() ||
           $('[data-automation-id="product-brand"]').text().trim() ||
           undefined;
  }

  private extractRating($: cheerio.CheerioAPI): number | undefined {
    const ratingText = $('.a-icon-alt').first().text();
    const match = ratingText.match(/(\d+,\d+|\d+)/);
    return match ? parseFloat(match[0].replace(',', '.')) : undefined;
  }

  private extractReviewsCount($: cheerio.CheerioAPI): number {
    const reviewsText = $('#acrCustomerReviewText').text() ||
                       $('.a-link-normal').text();
    const match = reviewsText.match(/(\d+\.?\d*)/);
    return match ? parseInt(match[0].replace('.', '')) : 0;
  }

  private extractAvailability($: cheerio.CheerioAPI): boolean {
    const availabilityText = $('#availability span').text().toLowerCase();
    return !availabilityText.includes('indisponível') && 
           !availabilityText.includes('fora de estoque') &&
           !availabilityText.includes('não disponível');
  }
}

class MercadoLivreScraper implements ScraperStrategy {
  canHandle(url: string): boolean {
    return url.includes('mercadolivre.com') || url.includes('mercadolibre.com') || url.includes('mlb.');
  }

  async scrape(url: string): Promise<ScrapedProduct> {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });

      const $ = cheerio.load(response.data);

      const title = $('.ui-pdp-title').text().trim();
      const priceText = $('.andes-money-amount__fraction').first().text().trim();
      const price = parseFloat(priceText.replace(/\./g, '').replace(',', '.'));

      const images: string[] = [];
      $('.ui-pdp-gallery__figure img').each((_, el) => {
        const src = $(el).attr('src');
        if (src) images.push(src);
      });

      return {
        title,
        description: $('.ui-pdp-description__content').text().trim().substring(0, 500),
        price: price || 0,
        main_image: images[0] || '',
        additional_images: images.slice(1),
        category: $('.andes-breadcrumb__link').last().text().trim() || 'Geral',
        rating: parseFloat($('.ui-review-capability__rating__average').text()) || undefined,
        reviews_count: parseInt($('.ui-review-capability__reviews__label').text().match(/\d+/)?.[0] || '0'),
        in_stock: !$('.ui-pdp-buybox__quantity__unavailable').length,
        source_platform: 'mercado_livre',
        affiliate_link: url
      };
    } catch (error) {
      console.error('Erro ao fazer scraping do Mercado Livre:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      throw new Error(`Falha ao extrair dados do Mercado Livre: ${errorMessage}`);
    }
  }
}

export class ProductScraperService {
  private scrapers: ScraperStrategy[] = [
    new AmazonScraper(),
    new MercadoLivreScraper()
  ];

  async scrapeProduct(affiliateLink: string): Promise<ScrapedProduct> {
    const scraper = this.scrapers.find(s => s.canHandle(affiliateLink));
    
    if (!scraper) {
      throw new Error(`Plataforma não suportada para URL: ${affiliateLink}`);
    }

    const scrapedData = await scraper.scrape(affiliateLink);
    
    // Gerar slug único
    const slug = this.generateSlug(scrapedData.title);
    
    return {
      ...scrapedData,
      slug
    };
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .substring(0, 100) + '-' + Date.now();
  }

  getSupportedPlatforms(): string[] {
    return ['amazon', 'mercado_livre'];
  }
}

export const productScraperService = new ProductScraperService();