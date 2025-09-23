/**
 * LAYOUT ISOLADO PARA PÁGINA S-TIER MERCADO LIVRE
 * Layout sem navegação externa, focado apenas no produto
 */

import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './styles.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Samsung Galaxy A54 5G - Oferta Especial | Mercado Livre',
  description: 'Smartphone Samsung Galaxy A54 5G 128GB com 32% de desconto. Frete grátis, garantia oficial e parcelamento sem juros em 12x.',
  keywords: [
    'Samsung Galaxy A54',
    'smartphone',
    '5G',
    'oferta',
    'desconto',
    'mercado livre',
    'celular',
    'android'
  ],
  authors: [{ name: 'Mercado Livre' }],
  openGraph: {
    title: 'Samsung Galaxy A54 5G - 32% OFF | R$ 1.299,99',
    description: 'Aproveite nossa oferta especial do Samsung Galaxy A54 5G. Frete grátis e parcelamento sem juros!',
    type: 'website',
    locale: 'pt_BR',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Samsung Galaxy A54 5G',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Samsung Galaxy A54 5G - 32% OFF',
    description: 'Oferta especial com frete grátis e garantia oficial Samsung',
  },
  robots: {
    index: false, // Página isolada não deve ser indexada
    follow: false,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function ProductMLLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="pt-BR" 
      className={`${inter.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Preload critical resources */}
        <link 
          rel="preload" 
          href="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80" 
          as="image"
        />
        
        {/* Performance optimizations */}
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
        
        {/* Mobile optimizations */}
        <meta name="theme-color" content="#3b82f6" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* Touch icons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        
        {/* Analytics and tracking - apenas para esta página */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Performance tracking
              window.addEventListener('load', function() {
                if ('performance' in window) {
                  const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                  console.log('Page load time:', loadTime + 'ms');
                }
              });
              
              // Conversion tracking
              function trackConversion(action, value = null) {
                console.log('Conversion tracked:', action, value);
                // Aqui você integraria com seu sistema de analytics
              }
              
              // Make trackConversion available globally
              window.trackConversion = trackConversion;
            `,
          }}
        />
      </head>
      
      <body 
        className={`
          ${inter.className} 
          font-sans 
          bg-gradient-to-br 
          from-slate-50 
          via-white 
          to-blue-50 
          min-h-screen 
          overflow-x-hidden
          touch-manipulation
        `}
        suppressHydrationWarning
      >
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50"
        >
          Pular para o conteúdo principal
        </a>

        {/* Main content */}
        <main 
          id="main-content" 
          className="relative z-10"
          role="main"
        >
          {children}
        </main>

        {/* Performance monitoring script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Monitor Core Web Vitals
              function measureCWV() {
                if ('web-vital' in window) return;
                
                // Largest Contentful Paint
                new PerformanceObserver((entryList) => {
                  const entries = entryList.getEntries();
                  const lastEntry = entries[entries.length - 1];
                  console.log('LCP:', lastEntry.startTime);
                }).observe({ entryTypes: ['largest-contentful-paint'] });
                
                // First Input Delay
                new PerformanceObserver((entryList) => {
                  for (const entry of entryList.getEntries()) {
                    console.log('FID:', entry.processingStart - entry.startTime);
                  }
                }).observe({ entryTypes: ['first-input'] });
                
                // Cumulative Layout Shift
                let clsValue = 0;
                new PerformanceObserver((entryList) => {
                  for (const entry of entryList.getEntries()) {
                    if (!entry.hadRecentInput) {
                      clsValue += entry.value;
                      console.log('CLS:', clsValue);
                    }
                  }
                }).observe({ entryTypes: ['layout-shift'] });
              }
              
              // Initialize after DOM is ready
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', measureCWV);
              } else {
                measureCWV();
              }
            `,
          }}
        />

        {/* Error boundary fallback */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('error', function(e) {
                console.error('JavaScript error:', e.error);
                // Graceful fallback - hide non-essential elements on error
                const nonEssential = document.querySelectorAll('[data-non-essential]');
                nonEssential.forEach(el => el.style.display = 'none');
              });
              
              window.addEventListener('unhandledrejection', function(e) {
                console.error('Unhandled promise rejection:', e.reason);
              });
            `,
          }}
        />
      </body>
    </html>
  );
}