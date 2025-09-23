/**
 * Unsplash API Integration
 * Professional asset management with fallbacks
 */

const UNSPLASH_ACCESS_KEY = 'RaJCnY3JA6sq-jTi0aVZ7xztbo4OGx1u1c3j7W6DrxQ';
const UNSPLASH_ACCOUNT_ID = '807253';

interface UnsplashImage {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string;
  user: {
    name: string;
  };
  width: number;
  height: number;
}

interface ImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'auto' | 'webp' | 'jpg' | 'png';
  fit?: 'crop' | 'fill' | 'scale';
}

/**
 * Get optimized image URL - Enhanced with professional image APIs
 */
export function getUnsplashImage(
  imageId: string,
  options: ImageOptions = {}
): string {
  // If it's already a local path, return as-is
  if (imageId.startsWith('/')) {
    return imageId;
  }

  // Professional image APIs for high-quality business visuals
  const professionalImageAPIs: Record<string, string> = {
    'marketing-strategy': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&crop=center&auto=format&q=80',
    'analytics-dashboard': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&crop=center&auto=format&q=80',
    'team-meeting': 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=800&fit=crop&crop=center&auto=format&q=80',
    'business-growth': 'https://images.unsplash.com/photo-1590479773265-7464e5d48118?w=1200&h=800&fit=crop&crop=center&auto=format&q=80',
    'consulting': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop&crop=center&auto=format&q=80',
    'client-testimonial': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&auto=format&q=80',
    'hero-background': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80',
    'process-diagram': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=800&fit=crop&crop=center&auto=format&q=80',
    'office-modern': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop&crop=center&auto=format&q=80',
    'technology': 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1200&h=800&fit=crop&crop=center&auto=format&q=80',
    'success-metrics': 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=800&fit=crop&crop=center&auto=format&q=80',
    'digital-marketing': 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=1200&h=800&fit=crop&crop=center&auto=format&q=80',
  };

  // Check if we have a professional image URL
  if (professionalImageAPIs[imageId]) {
    return professionalImageAPIs[imageId];
  }

  // For external Unsplash images, build URL with optimization
  const {
    width = 1200,
    height,
    quality = 80,
    format = 'auto',
    fit = 'crop'
  } = options;

  const params = new URLSearchParams({
    w: width.toString(),
    q: quality.toString(),
    fm: format,
    fit
  });

  if (height) {
    params.append('h', height.toString());
  }

  return `https://images.unsplash.com/photo-${imageId}?${params.toString()}`;
}

/**
 * Professional business/marketing themed images - High-quality Unsplash API
 */
export const BUSINESS_IMAGES = {
  hero: {
    marketing: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80', // Modern office
    business: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop&crop=center&auto=format&q=80', // Professional
    growth: 'https://images.unsplash.com/photo-1590479773265-7464e5d48118?w=1200&h=800&fit=crop&crop=center&auto=format&q=80', // Growth charts
    team: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop&crop=center&auto=format&q=80'   // Team collaboration
  },

  sections: {
    analytics: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&crop=center&auto=format&q=80', // Analytics dashboard
    strategy: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&crop=center&auto=format&q=80', // Strategy planning
    success: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=800&fit=crop&crop=center&auto=format&q=80',   // Success metrics
    consulting: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=800&fit=crop&crop=center&auto=format&q=80', // Business consulting
    results: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=1200&h=800&fit=crop&crop=center&auto=format&q=80',   // Digital marketing
    process: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1200&h=800&fit=crop&crop=center&auto=format&q=80'  // Technology process
  },

  team: {
    ceo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&auto=format&q=80',     // Professional CEO
    manager: 'https://images.unsplash.com/photo-1494790108755-2616b612b742?w=400&h=400&fit=crop&crop=face&auto=format&q=80',  // Manager
    developer: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&auto=format&q=80', // Developer
    designer: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face&auto=format&q=80'   // Designer
  },

  testimonials: {
    client1: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&auto=format&q=80',  // Professional client
    client2: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&auto=format&q=80',  // Business owner
    client3: 'https://images.unsplash.com/photo-1494790108755-2616b612b742?w=400&h=400&fit=crop&crop=face&auto=format&q=80'   // Executive
  },

  // E-commerce affiliate specific images
  ecommerce: {
    amazon: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600&fit=crop&crop=center&auto=format&q=80', // E-commerce
    affiliate: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&crop=center&auto=format&q=80', // Affiliate marketing
    products: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop&crop=center&auto=format&q=80', // Product showcase
    shopping: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&h=600&fit=crop&crop=center&auto=format&q=80', // Shopping experience
    
    // Product categories
    electronics: {
      premium: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&crop=center&auto=format&q=80', // Smartphone
      computing: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&h=400&fit=crop&crop=center&auto=format&q=80', // Laptop
      entertainment: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop&crop=center&auto=format&q=80' // TV/Display
    },
    
    accessories: {
      audio: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center&auto=format&q=80', // Headphones
      mobile: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop&crop=center&auto=format&q=80', // Phone accessories
      tech: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=400&fit=crop&crop=center&auto=format&q=80' // Tech accessories
    },
    
    home: {
      appliances: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center&auto=format&q=80', // Home appliances
      furniture: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center&auto=format&q=80', // Modern furniture
      decor: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop&crop=center&auto=format&q=80' // Home decor
    }
  }
};

/**
 * Get random business-themed image
 */
export function getRandomBusinessImage(
  category: keyof typeof BUSINESS_IMAGES,
  options?: ImageOptions
): string {
  const images = BUSINESS_IMAGES[category];
  
  // Handle nested objects by flattening values
  const flattenValues = (obj: any): string[] => {
    const result: string[] = [];
    for (const value of Object.values(obj)) {
      if (typeof value === 'string') {
        result.push(value);
      } else if (typeof value === 'object') {
        result.push(...flattenValues(value));
      }
    }
    return result;
  };
  
  const imageUrls = flattenValues(images);
  const randomUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];
  
  return randomUrl;
}

/**
 * Local fallback images
 */
export const FALLBACK_IMAGES = {
  hero: '/hero-case-mosaic-1.png',
  business: '/case-thumb-ipe.png',
  team: '/profile.webp',
  placeholder: '/logo-v2.png'
};

/**
 * Image component props helper
 */
export function createImageProps(
  imageId: string,
  alt: string,
  options?: ImageOptions
) {
  return {
    src: getUnsplashImage(imageId, options),
    alt,
    width: options?.width || 1200,
    height: options?.height || 800,
    className: 'object-cover',
    loading: 'lazy' as const,
    placeholder: 'blur' as const,
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyepckTz2xp35lhkD+oTD/AApKNhEAzjlmkJsJPq8eLmxiLY6aeW6tQm7n1VqMhOlO7TXrOe1YWrSXODKjhfHmhXGjN7XEAI5ppbpN5eOzOJoHGTp/Y='
  };
}