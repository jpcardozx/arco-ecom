import type { Metadata } from 'next';
import { Inter, Lora } from 'next/font/google';
import { ProfessionalNavigation } from '@/design-system/components/navigation/ProfessionalNavigation';
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
  title: 'ARCO - Marketing Optimization Experts',
  description: 'Convert clicks into real appointments today. Maximize your marketing budget with ARCO\'s proven, data-driven strategies.',
  keywords: ['marketing optimization', 'lead generation', 'appointment conversion', 'revenue growth'],
  authors: [{ name: 'ARCO' }],
  openGraph: {
    title: 'ARCO - Marketing Optimization Experts',
    description: 'Convert clicks into real appointments today',
    type: 'website',
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
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17457190449"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17457190449');
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
          <ProfessionalNavigation />
          <main className="pt-8">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
