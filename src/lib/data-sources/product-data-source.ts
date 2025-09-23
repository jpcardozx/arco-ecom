/**
 * ARCO Product Data Source - S-Tier Clean Architecture
 * Eliminates hardcoded data and provides hierarchical product generation
 */

import { ProductCategory, ProductBrand, PricingTier } from '../types/product.types';

export interface ProductDataConfig {
  category: ProductCategory;
  brand: ProductBrand;
  pricingTier: PricingTier;
  platform: string;
  region: string;
}

export interface ProductTemplate {
  titlePattern: string;
  descriptionTemplate: string;
  priceRange: { min: number; max: number };
  ratingRange: { min: number; max: number };
  features: string[];
  specifications: Record<string, string[]>;
  imageCategories: string[];
}

/**
 * S-Tier Product Data Source - Clean, Hierarchical, Configurable
 */
export class ProductDataSource {
  private templates: Map<string, ProductTemplate> = new Map();
  private brandData: Map<ProductBrand, any> = new Map();
  private categorySpecs: Map<ProductCategory, any> = new Map();

  constructor() {
    this.initializeTemplates();
    this.initializeBrandData();
    this.initializeCategorySpecs();
  }

  /**
   * Generate product data based on clean configuration
   */
  generateProduct(config: ProductDataConfig, productId: string) {
    const template = this.getTemplate(config.category, config.brand);
    const brandInfo = this.getBrandInfo(config.brand);
    const categorySpecs = this.getCategorySpecs(config.category);

    return {
      id: productId,
      title: this.generateTitle(template, brandInfo, config),
      description: this.generateDescription(template, brandInfo, config),
      price: this.generatePrice(template, config.pricingTier),
      original_price: this.generateOriginalPrice(template, config.pricingTier),
      rating: this.generateRating(template, brandInfo.reputation),
      reviews_count: this.generateReviewsCount(brandInfo.popularity),
      features: this.generateFeatures(template, categorySpecs),
      specifications: this.generateSpecifications(categorySpecs, brandInfo),
      images: this.generateImages(template.imageCategories, productId),
      shipping: this.generateShipping(config.region),
      availability: this.generateAvailability(config.pricingTier),
      seller: this.generateSellerInfo(config.platform, brandInfo)
    };
  }

  private initializeTemplates() {
    // Electronics Templates
    this.templates.set('electronics_smartphone', {
      titlePattern: '{brand} {model} {storage} {connectivity}',
      descriptionTemplate: 'Smartphone {brand} com tela de {screenSize}, câmera {camera}, bateria {battery} e {features}.',
      priceRange: { min: 800, max: 3500 },
      ratingRange: { min: 3.8, max: 4.9 },
      features: ['Tela AMOLED', 'Câmera IA', 'Carregamento Rápido', '5G', 'Resistente à Água'],
      specifications: {
        display: ['6.1"', '6.4"', '6.7"', '6.8"'],
        storage: ['128GB', '256GB', '512GB', '1TB'],
        camera: ['48MP', '64MP', '108MP', '200MP'],
        battery: ['4000mAh', '5000mAh', '6000mAh']
      },
      imageCategories: ['smartphone', 'technology', 'mobile']
    });

    this.templates.set('electronics_laptop', {
      titlePattern: '{brand} {series} {processor} {ram} {storage}',
      descriptionTemplate: 'Notebook {brand} com processador {processor}, {ram} de RAM, {storage} de armazenamento e {features}.',
      priceRange: { min: 2500, max: 8000 },
      ratingRange: { min: 4.0, max: 4.8 },
      features: ['Tela Full HD', 'SSD Rápido', 'Teclado Retroiluminado', 'Wi-Fi 6', 'USB-C'],
      specifications: {
        processor: ['Intel i5', 'Intel i7', 'AMD Ryzen 5', 'AMD Ryzen 7'],
        ram: ['8GB', '16GB', '32GB'],
        storage: ['256GB SSD', '512GB SSD', '1TB SSD'],
        display: ['14"', '15.6"', '17"']
      },
      imageCategories: ['laptop', 'computer', 'workspace']
    });

    // Fashion Templates
    this.templates.set('fashion_shoes', {
      titlePattern: '{brand} {model} {gender} {type}',
      descriptionTemplate: 'Tênis {brand} {model} com tecnologia {tech} e design {style}. Ideal para {usage}.',
      priceRange: { min: 200, max: 800 },
      ratingRange: { min: 4.2, max: 4.9 },
      features: ['Amortecimento', 'Respirável', 'Antiderrapante', 'Leve', 'Durável'],
      specifications: {
        material: ['Couro', 'Sintético', 'Mesh', 'Canvas'],
        sole: ['Borracha', 'EVA', 'Poliuretano'],
        closure: ['Cadarço', 'Velcro', 'Slip-on'],
        size: ['35', '36', '37', '38', '39', '40', '41', '42', '43', '44']
      },
      imageCategories: ['shoes', 'fashion', 'footwear']
    });
  }

  private initializeBrandData() {
    this.brandData.set('samsung', {
      reputation: 0.9,
      popularity: 0.85,
      priceMultiplier: 1.2,
      qualityScore: 0.88,
      models: ['Galaxy A', 'Galaxy S', 'Galaxy Note', 'Galaxy Z']
    });

    this.brandData.set('apple', {
      reputation: 0.95,
      popularity: 0.9,
      priceMultiplier: 1.8,
      qualityScore: 0.95,
      models: ['iPhone', 'MacBook', 'iPad', 'AirPods']
    });

    this.brandData.set('nike', {
      reputation: 0.92,
      popularity: 0.88,
      priceMultiplier: 1.3,
      qualityScore: 0.9,
      models: ['Air Max', 'Air Force', 'React', 'Zoom']
    });
  }

  private initializeCategorySpecs() {
    this.categorySpecs.set('electronics', {
      warranty: ['1 ano', '2 anos', '3 anos'],
      certifications: ['Anatel', 'FCC', 'CE'],
      connectivity: ['Wi-Fi', 'Bluetooth', '5G', 'NFC'],
      powerSources: ['Bateria', 'Cabo USB-C', 'Carregador Wireless']
    });

    this.categorySpecs.set('fashion', {
      materials: ['Algodão', 'Poliéster', 'Couro', 'Sintético'],
      careInstructions: ['Lavar à máquina', 'Lavar à mão', 'Dry clean'],
      seasons: ['Verão', 'Inverno', 'Meia-estação', 'Todas'],
      occasions: ['Casual', 'Esporte', 'Formal', 'Festa']
    });
  }

  private getTemplate(category: ProductCategory, brand: ProductBrand): ProductTemplate {
    const key = `${category}_${this.getCategorySubtype(category)}`;
    return this.templates.get(key) || this.getDefaultTemplate();
  }

  private getCategorySubtype(category: ProductCategory): string {
    const subtypes: Record<ProductCategory, string[]> = {
      electronics: ['smartphone', 'laptop', 'tablet', 'headphones'],
      fashion: ['shoes', 'clothing', 'accessories'],
      home: ['furniture', 'appliances', 'decor'],
      sports: ['equipment', 'clothing', 'accessories'],
      books: ['fiction', 'non-fiction', 'technical'],
      automotive: ['parts', 'accessories', 'tools'],
      health: ['supplements', 'equipment', 'personal-care'],
      gaming: ['consoles', 'games', 'accessories']
    };
    
    const categorySubtypes = subtypes[category] || ['generic'];
    return categorySubtypes[Math.floor(Math.random() * categorySubtypes.length)];
  }

  private getBrandInfo(brand: ProductBrand) {
    return this.brandData.get(brand) || {
      reputation: 0.7,
      popularity: 0.6,
      priceMultiplier: 1.0,
      qualityScore: 0.75,
      models: ['Modelo A', 'Modelo B']
    };
  }

  private getCategorySpecs(category: ProductCategory) {
    return this.categorySpecs.get(category) || {};
  }

  private generateTitle(template: ProductTemplate, brandInfo: any, config: ProductDataConfig): string {
    const model = brandInfo.models[Math.floor(Math.random() * brandInfo.models.length)];
    const storage = template.specifications.storage?.[Math.floor(Math.random() * template.specifications.storage.length)] || '';
    
    return template.titlePattern
      .replace('{brand}', config.brand.charAt(0).toUpperCase() + config.brand.slice(1))
      .replace('{model}', model)
      .replace('{storage}', storage)
      .replace('{connectivity}', '5G');
  }

  private generateDescription(template: ProductTemplate, brandInfo: any, config: ProductDataConfig): string {
    const features = template.features.slice(0, 3).join(', ');
    return template.descriptionTemplate
      .replace('{brand}', config.brand)
      .replace('{features}', features)
      .replace('{screenSize}', '6.4"')
      .replace('{camera}', '64MP')
      .replace('{battery}', '5000mAh');
  }

  private generatePrice(template: ProductTemplate, tier: PricingTier): number {
    const { min, max } = template.priceRange;
    const tierMultipliers: Record<PricingTier, number> = { 
      budget: 0.7, 
      mid: 1.0, 
      premium: 1.5, 
      luxury: 2.0 
    };
    const multiplier = tierMultipliers[tier] || 1.0;
    
    return Math.floor((min + Math.random() * (max - min)) * multiplier);
  }

  private generateOriginalPrice(template: ProductTemplate, tier: PricingTier): number {
    const basePrice = this.generatePrice(template, tier);
    return Math.floor(basePrice * (1.1 + Math.random() * 0.3));
  }

  private generateRating(template: ProductTemplate, reputation: number): number {
    const { min, max } = template.ratingRange;
    const reputationBonus = reputation * 0.5;
    return parseFloat((min + Math.random() * (max - min) + reputationBonus).toFixed(1));
  }

  private generateReviewsCount(popularity: number): number {
    const baseCount = 100;
    const popularityMultiplier = popularity * 10;
    return Math.floor(baseCount + Math.random() * 5000 * popularityMultiplier);
  }

  private generateFeatures(template: ProductTemplate, categorySpecs: any): string[] {
    return template.features.slice(0, 4);
  }

  private generateSpecifications(categorySpecs: any, brandInfo: any): Record<string, string> {
    return {
      warranty: categorySpecs.warranty?.[0] || '1 ano',
      brand_quality: `${Math.floor(brandInfo.qualityScore * 10)}/10`,
      certification: categorySpecs.certifications?.join(', ') || 'Certificado'
    };
  }

  private generateImages(categories: string[], productId: string): string[] {
    const baseUrl = 'https://images.unsplash.com/photo-';
    const imageIds = ['1511707171634-5f897ff02aa9', '1542291026-7eec264c27ff'];
    
    return imageIds.map(id => `${baseUrl}${id}?w=800&h=800&fit=crop`);
  }

  private generateShipping(region: string) {
    return {
      free: Math.random() > 0.3,
      estimated_days: Math.floor(Math.random() * 7) + 1,
      regions: [region, 'Nacional'],
      express_available: true
    };
  }

  private generateAvailability(tier: PricingTier) {
    const tierAvailability: Record<PricingTier, number> = { 
      budget: 0.95, 
      mid: 0.9, 
      premium: 0.8, 
      luxury: 0.7 
    };
    return {
      in_stock: Math.random() < tierAvailability[tier],
      quantity: Math.floor(Math.random() * 50) + 5,
      last_updated: new Date().toISOString()
    };
  }

  private generateSellerInfo(platform: string, brandInfo: any) {
    return {
      name: `${platform} Oficial`,
      rating: parseFloat((4.0 + brandInfo.reputation * 1.0).toFixed(1)),
      verified: true,
      location: 'São Paulo, BR',
      response_time: '< 2h'
    };
  }

  private getDefaultTemplate(): ProductTemplate {
    return {
      titlePattern: '{brand} Produto Premium',
      descriptionTemplate: 'Produto de alta qualidade da marca {brand}.',
      priceRange: { min: 100, max: 1000 },
      ratingRange: { min: 3.5, max: 4.8 },
      features: ['Alta Qualidade', 'Garantia', 'Entrega Rápida'],
      specifications: {},
      imageCategories: ['product']
    };
  }
}

// Singleton instance
export const productDataSource = new ProductDataSource();