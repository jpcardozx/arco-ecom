/**
 * ARCO Admin Layout - Professional Dashboard Layout
 * Secure, modular admin interface with authentication
 */

import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard - ARCO',
  description: 'Painel administrativo profissional para gerenciamento completo',
  robots: 'noindex, nofollow',
};

import { getCurrentUser, isAdmin } from '@/lib/auth';

// Check if user is authenticated and has admin role
async function checkAuth() {
  const user = await getCurrentUser();
  return user && isAdmin(user);
}

import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = await checkAuth();

  if (!isAuthenticated) {
    redirect('/auth/login');
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        {/* Professional Admin Sidebar */}
        <aside className="w-64 bg-white shadow-lg">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900">Admin ARCO</h2>
          </div>
          <nav className="mt-8">
            <div className="px-4 space-y-2">
              <a href="/admin" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                Dashboard
              </a>
              <a href="/admin/products" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                Produtos
              </a>
              <a href="/admin/users" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                Usuários
              </a>
            </div>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden">
          <div className="h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}