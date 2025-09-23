/**
 * ARCO Configuration System - S-Tier Central Configuration
 * Eliminates hardcoded values with hierarchical configuration management
 */

export interface AppConfig {
  app: {
    name: string;
    version: string;
    description: string;
    environment: 'development' | 'staging' | 'production';
  };
  
  api: {
    baseUrl: string;
    timeout: number;
    retries: number;
    rateLimit: {
      requests: number;
      window: number; // in seconds
    };
  };

  ui: {
    theme: {
      primaryColor: string;
      accentColor: string;
      borderRadius: string;
      spacing: Record<string, string>;
      breakpoints: Record<string, string>;
    };
    animations: {
      duration: Record<string, string>;
      easing: Record<string, string>;
    };
    components: {
      productCard: {
        imageAspectRatio: string;
        maxTitleLength: number;
        maxDescriptionLength: number;
      };
      navigation: {
        maxItems: number;
        mobileBreakpoint: string;
      };
    };
  };

  ecommerce: {
    platforms: Record<string, {
      name: string;
      baseUrl: string;
      affiliateIdPattern: string;
      productUrlPattern: string;
      commission: {
        default: number;
        categories: Record<string, number>;
      };
    }>;
    
    pricing: {
      currency: string;
      locale: string;
      formatting: {
        showCents: boolean;
        compactNotation: boolean;
      };
    };

    shipping: {
      defaultRegion: string;
      freeShippingThreshold: number;
      regions: Record<string, {
        name: string;
        defaultDays: number;
        expressAvailable: boolean;
      }>;
    };
  };

  analytics: {
    enabled: boolean;
    providers: Record<string, {
      id: string;
      enabled: boolean;
      config: Record<string, any>;
    }>;
  };

  features: {
    productParsing: {
      enabled: boolean;
      mockMode: boolean;
      detailedParsingEnabled: boolean;
      cacheEnabled: boolean;
      cacheDuration: number; // in seconds
    };
    
    userAccounts: {
      enabled: boolean;
      registrationEnabled: boolean;
      socialLogin: {
        google: boolean;
        facebook: boolean;
        apple: boolean;
      };
    };

    affiliate: {
      enabled: boolean;
      autoLinkGeneration: boolean;
      commissionTracking: boolean;
    };
  };

  content: {
    placeholders: {
      productSearch: string;
      userEmail: string;
      userName: string;
      companyName: string;
      phoneNumber: string;
      productLink: string;
    };
    
    defaultMessages: {
      loading: string;
      error: string;
      noResults: string;
      success: string;
    };

    seo: {
      defaultTitle: string;
      titleTemplate: string;
      defaultDescription: string;
      keywords: string[];
    };
  };

  external: {
    images: {
      unsplash: {
        accessKey: string;
        fallbackImages: Record<string, string[]>;
        quality: 'low' | 'medium' | 'high';
      };
    };
    
    apis: {
      mercadoLivre: {
        enabled: boolean;
        baseUrl: string;
        rateLimit: number;
      };
      amazon: {
        enabled: boolean;
        baseUrl: string;
        rateLimit: number;
      };
    };
  };
}

/**
 * Production Configuration
 */
const productionConfig: AppConfig = {
  app: {
    name: 'ARCO',
    version: '1.0.0',
    description: 'Plataforma de afiliados e inteligência comercial',
    environment: 'production'
  },

  api: {
    baseUrl: '/api',
    timeout: 10000,
    retries: 3,
    rateLimit: {
      requests: 100,
      window: 60
    }
  },

  ui: {
    theme: {
      primaryColor: '#6366f1',
      accentColor: '#8b5cf6',
      borderRadius: '0.5rem',
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem'
      },
      breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px'
      }
    },
    animations: {
      duration: {
        fast: '150ms',
        normal: '300ms',
        slow: '500ms'
      },
      easing: {
        default: 'cubic-bezier(0.4, 0, 0.2, 1)',
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
      }
    },
    components: {
      productCard: {
        imageAspectRatio: '1:1',
        maxTitleLength: 80,
        maxDescriptionLength: 150
      },
      navigation: {
        maxItems: 6,
        mobileBreakpoint: '768px'
      }
    }
  },

  ecommerce: {
    platforms: {
      mercadolivre: {
        name: 'Mercado Livre',
        baseUrl: 'https://mercadolivre.com.br',
        affiliateIdPattern: 'ML-{userId}',
        productUrlPattern: '/p/{productId}',
        commission: {
          default: 4,
          categories: {
            electronics: 3,
            fashion: 6,
            home: 5
          }
        }
      },
      amazon: {
        name: 'Amazon',
        baseUrl: 'https://amazon.com.br',
        affiliateIdPattern: 'amzn-{userId}',
        productUrlPattern: '/dp/{productId}',
        commission: {
          default: 5,
          categories: {
            electronics: 4,
            books: 8,
            home: 6
          }
        }
      }
    },
    
    pricing: {
      currency: 'BRL',
      locale: 'pt-BR',
      formatting: {
        showCents: true,
        compactNotation: false
      }
    },

    shipping: {
      defaultRegion: 'BR',
      freeShippingThreshold: 199,
      regions: {
        'BR-SP': {
          name: 'São Paulo',
          defaultDays: 2,
          expressAvailable: true
        },
        'BR-RJ': {
          name: 'Rio de Janeiro',
          defaultDays: 3,
          expressAvailable: true
        },
        'BR': {
          name: 'Brasil',
          defaultDays: 7,
          expressAvailable: false
        }
      }
    }
  },

  analytics: {
    enabled: true,
    providers: {
      googleAnalytics: {
        id: process.env.NEXT_PUBLIC_GA_ID || '',
        enabled: !!process.env.NEXT_PUBLIC_GA_ID,
        config: {
          anonymizeIp: true,
          allowAdFeatures: false
        }
      }
    }
  },

  features: {
    productParsing: {
      enabled: true,
      mockMode: process.env.NODE_ENV === 'development',
      detailedParsingEnabled: true,
      cacheEnabled: true,
      cacheDuration: 3600
    },
    
    userAccounts: {
      enabled: false, // Phase 2
      registrationEnabled: false,
      socialLogin: {
        google: false,
        facebook: false,
        apple: false
      }
    },

    affiliate: {
      enabled: true,
      autoLinkGeneration: true,
      commissionTracking: false // Phase 2
    }
  },

  content: {
    placeholders: {
      productSearch: 'Buscar produtos...',
      userEmail: 'seu@email.com',
      userName: 'Seu nome',
      companyName: 'Sua empresa',
      phoneNumber: '+55 (11) 99999-9999',
      productLink: 'Cole aqui o link do Mercado Livre, Amazon, Shopee...'
    },
    
    defaultMessages: {
      loading: 'Carregando...',
      error: 'Ops! Algo deu errado',
      noResults: 'Nenhum resultado encontrado',
      success: 'Operação realizada com sucesso'
    },

    seo: {
      defaultTitle: 'ARCO - Plataforma de Afiliados Inteligente',
      titleTemplate: '%s | ARCO',
      defaultDescription: 'Descubra os melhores produtos com nossa plataforma de afiliados inteligente. Ofertas exclusivas, comparação de preços e análise detalhada.',
      keywords: ['afiliados', 'e-commerce', 'ofertas', 'produtos', 'comparação', 'preços']
    }
  },

  external: {
    images: {
      unsplash: {
        accessKey: process.env.UNSPLASH_ACCESS_KEY || '',
        fallbackImages: {
          product: [
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff'
          ],
          hero: [
            'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d',
            'https://images.unsplash.com/photo-1565849904461-04a58ad377e0'
          ]
        },
        quality: 'high'
      }
    },
    
    apis: {
      mercadoLivre: {
        enabled: true,
        baseUrl: 'https://api.mercadolibre.com',
        rateLimit: 1000
      },
      amazon: {
        enabled: false, // Requires API keys
        baseUrl: 'https://webservices.amazon.com',
        rateLimit: 100
      }
    }
  }
};

/**
 * Development Configuration
 */
const developmentConfig: AppConfig = {
  ...productionConfig,
  app: {
    ...productionConfig.app,
    environment: 'development'
  },
  
  features: {
    ...productionConfig.features,
    productParsing: {
      ...productionConfig.features.productParsing,
      mockMode: true,
      cacheEnabled: false
    }
  },

  api: {
    ...productionConfig.api,
    timeout: 5000
  }
};

/**
 * Get configuration based on environment
 */
function getConfig(): AppConfig {
  const env = process.env.NODE_ENV || 'development';
  
  switch (env) {
    case 'production':
      return productionConfig;
    case 'development':
    default:
      return developmentConfig;
  }
}

// Export singleton configuration
export const config = getConfig();

// Helper functions for accessing nested config values
export const getUIConfig = () => config.ui;
export const getEcommerceConfig = () => config.ecommerce;
export const getFeatureConfig = () => config.features;
export const getContentConfig = () => config.content;

// Type-safe config accessors
export function getPlaceholder(key: keyof AppConfig['content']['placeholders']): string {
  return config.content.placeholders[key];
}

export function getMessage(key: keyof AppConfig['content']['defaultMessages']): string {
  return config.content.defaultMessages[key];
}

export function isFeatureEnabled(feature: keyof AppConfig['features']): boolean {
  return config.features[feature].enabled;
}