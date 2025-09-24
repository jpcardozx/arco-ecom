import type { Metadata } from 'next';
import { Inter, Lora } from 'next/font/google';
import Script from 'next/script';
import { PremiumNavigation } from '@/components/design-system/composed/PremiumNavigation';
import ModernFooter from '@/components/common/footer/ModernFooter';
import { Providers } from './providers';
import '../styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ARCO - E-commerce Premium e Marketplace Inteligente',
  description: 'Descubra produtos premium selecionados com qualidade excepcional. E-commerce completo com ofertas exclusivas, entrega rápida e compra garantida.',
  keywords: [
    'e-commerce premium',
    'marketplace online',
    'produtos exclusivos',
    'compra online segura',
    'ofertas especiais',
    'entrega rápida',
    'produtos Apple',
    'eletrônicos premium',
    'blog',
    'cashback'
  ],
  authors: [{ name: 'ARCO E-commerce' }],
  openGraph: {
    title: 'ARCO - E-commerce Premium e Marketplace Inteligente',
    description: 'Descubra produtos premium com qualidade excepcional. Ofertas exclusivas e entrega garantida.',
    type: 'website',
    siteName: 'ARCO E-commerce',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ARCO - E-commerce Premium',
    description: 'Produtos premium com qualidade excepcional',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <head>
        {/* Impact Site Verification */}
        <meta name="impact-site-verification" content="0a23c89f-a538-4c19-9ad6-44dc7e560871" />

        {/* Google AdSense Meta Tag */}
        <meta name="google-adsense-account" content="ca-pub-4988039912127225" />

        {/* Google AdSense Script */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4988039912127225" crossOrigin="anonymous"></script>

        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17457190449"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17457190449');

              // Google Ads conversion tracking
              gtag('config', 'AW-17457190449/conversion_label_here');
            `,
          }}
        />

        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "ARCO E-commerce",
              "url": "https://arco-ecommerce.com",
              "logo": "https://arco-ecommerce.com/logo.png",
              "description": "E-commerce premium com produtos selecionados e qualidade excepcional",
              "sameAs": [
                "https://facebook.com/arco",
                "https://instagram.com/arco",
                "https://twitter.com/arco"
              ]
            })
          }}
        />

        {/* Structured Data - Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "ARCO E-commerce",
              "url": "https://arco-ecommerce.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://arco-ecommerce.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
          <PremiumNavigation />
          <main className="pt-8">
            {children}
          </main>
          <ModernFooter showNewsletter={true} className="mt-auto" />
        </Providers>
      </body>
    </html>
  );
}
