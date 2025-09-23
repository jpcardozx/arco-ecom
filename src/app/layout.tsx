import type { Metadata } from 'next';
import { Inter, Lora } from 'next/font/google';
import { UnifiedNavigation } from '@/components/common/navigation/UnifiedNavigationStier';
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
      <body className="min-h-screen bg-background font-sans antialiased">
        <UnifiedNavigation />
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
