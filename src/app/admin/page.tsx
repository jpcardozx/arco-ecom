/**
 * ARCO Admin Panel - Product Management
 * Interface para gerenciar produtos e links de anúncios
 */

import { Metadata } from 'next';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

export const metadata: Metadata = {
  title: 'Admin - Product Management | ARCO',
  description: 'Painel administrativo para gerenciar produtos e links de anúncios',
  robots: 'noindex, nofollow', // Prevent search engine indexing
};

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-background">
      <AdminDashboard />
    </main>
  );
}