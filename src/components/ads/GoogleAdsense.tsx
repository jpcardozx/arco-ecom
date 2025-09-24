/**
 * Google AdSense Integration Component
 * Componente para integração com Google AdSense para monetização
 */

'use client';

import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';

interface GoogleAdsenseProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// Declare AdSense global
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const GoogleAdsense: React.FC<GoogleAdsenseProps> = ({
  slot,
  format = 'auto',
  responsive = true,
  className,
  style
}) => {
  useEffect(() => {
    try {
      // Push ad to AdSense queue
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <div className={cn('ads-container', className)} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client="ca-pub-4988039912127225" // ID validado do layout
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  );
};

// Banner específicos por posição
export const AdBanner = ({
  position,
  className
}: {
  position: 'header' | 'sidebar' | 'content' | 'footer';
  className?: string;
}) => {
  const adConfig = {
    header: {
      slot: '1234567890', // Slot para header
      format: 'horizontal' as const,
      style: { width: '100%', maxWidth: '728px', height: '90px' }
    },
    sidebar: {
      slot: '1234567891', // Slot para sidebar
      format: 'vertical' as const,
      style: { width: '300px', height: '250px' }
    },
    content: {
      slot: '1234567892', // Slot para conteúdo
      format: 'rectangle' as const,
      style: { width: '100%', maxWidth: '336px', height: '280px' }
    },
    footer: {
      slot: '1234567893', // Slot para footer
      format: 'horizontal' as const,
      style: { width: '100%', maxWidth: '728px', height: '90px' }
    }
  };

  const config = adConfig[position];

  return (
    <div className={cn('ad-banner', `ad-banner-${position}`, className)}>
      <div className="text-xs text-gray-500 mb-2 text-center">Publicidade</div>
      <GoogleAdsense
        slot={config.slot}
        format={config.format}
        style={config.style}
        className="mx-auto"
      />
    </div>
  );
};

// Native Ads (Anúncios nativos)
export const NativeAd = ({
  className,
  title = "Produtos Recomendados"
}: {
  className?: string;
  title?: string;
}) => (
  <div className={cn('native-ad-container p-4 border border-gray-200 rounded-lg bg-gray-50', className)}>
    <h3 className="text-sm font-semibold text-gray-700 mb-3">{title}</h3>
    <GoogleAdsense
      slot="1234567894" // Slot para native ads
      format="auto"
      style={{ minHeight: '200px' }}
    />
  </div>
);

// Shopping Ads (Para produtos)
export const ShoppingAd = ({
  className
}: {
  className?: string;
}) => (
  <div className={cn('shopping-ad-container', className)}>
    <div className="text-xs text-gray-500 mb-2">Ofertas Relacionadas</div>
    <GoogleAdsense
      slot="1234567895" // Slot para shopping ads
      format="rectangle"
      style={{ width: '100%', maxWidth: '300px', height: '250px' }}
    />
  </div>
);