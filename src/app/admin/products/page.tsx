/**
 * ARCO Admin Products Management
 * Professional product management interface
 */

'use client';

import React, { useState, useEffect } from 'react';
import {
  Package,
  Search,
  Filter,
  Eye,
  Edit3,
  Trash2,
  Star,
  ExternalLink,
  Plus
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: string;
  title: string;
  price: number;
  original_price?: number;
  source_platform: string;
  main_image: string;
  in_stock: boolean;
  featured: boolean;
  active: boolean;
  rating?: number;
  reviews_count?: number;
  affiliate_link: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      // TODO: Replace with real API call
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || []);
      }
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleProductStatus = async (productId: string, field: 'active' | 'featured') => {
    setProducts(products.map(p =>
      p.id === productId
        ? { ...p, [field]: !p[field] }
        : p
    ));
    // TODO: Update in database
  };

  const deleteProduct = async (productId: string) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      setProducts(products.filter(p => p.id !== productId));
      // TODO: Delete from database
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = selectedPlatform === 'all' || product.source_platform === selectedPlatform;
    return matchesSearch && matchesPlatform;
  });

  const platforms = [...new Set(products.map(p => p.source_platform))];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Produtos</h1>
          <p className="text-slate-600 mt-1">Gerencie todos os seus produtos de afiliados</p>
        </div>
        <Link
          href="/admin/links"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Adicionar Produto
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-900"
          >
            <option value="all">Todas as plataformas</option>
            {platforms.map(platform => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products List */}
      <div className="bg-white rounded-lg border border-slate-200">
        {loading ? (
          <div className="p-8 text-center">
            <Package className="h-8 w-8 text-slate-400 mx-auto mb-2" />
            <p className="text-slate-600">Carregando produtos...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-8 text-center">
            <Package className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-slate-600 mb-4">
              {products.length === 0
                ? 'Comece adicionando alguns produtos através de links de afiliados.'
                : 'Tente ajustar os filtros de busca.'
              }
            </p>
            <Link
              href="/admin/links"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Adicionar Primeiro Produto
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {filteredProducts.map((product) => (
              <div key={product.id} className="p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Product Image */}
                    <div className="relative w-16 h-16 bg-slate-100 rounded-lg overflow-hidden">
                      {product.main_image && (
                        <Image
                          src={product.main_image}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-1">
                      <h3 className="font-semibold text-slate-900 line-clamp-1">
                        {product.title}
                      </h3>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs">
                          {product.source_platform}
                        </span>
                        <span className="text-slate-900 font-medium">
                          R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                        {product.original_price && (
                          <span className="text-slate-500 line-through">
                            R$ {product.original_price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        )}
                        {product.rating && (
                          <span className="text-slate-600">
                            {product.rating}★ ({product.reviews_count || 0})
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {product.featured && (
                          <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">
                            Destaque
                          </span>
                        )}
                        {!product.active && (
                          <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
                            Inativo
                          </span>
                        )}
                        {!product.in_stock && (
                          <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">
                            Sem estoque
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleProductStatus(product.id, 'featured')}
                      className={`p-2 rounded-lg ${
                        product.featured
                          ? 'bg-purple-100 text-purple-600'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                      title={product.featured ? 'Remover destaque' : 'Destacar produto'}
                    >
                      <Star className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => toggleProductStatus(product.id, 'active')}
                      className={`p-2 rounded-lg ${
                        product.active
                          ? 'bg-green-100 text-green-600'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                      title={product.active ? 'Desativar produto' : 'Ativar produto'}
                    >
                      <Eye className="h-4 w-4" />
                    </button>

                    <a
                      href={product.affiliate_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
                      title="Abrir link do produto"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>

                    <button
                      onClick={() => {/* TODO: Implement edit */}}
                      className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
                      title="Editar produto"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
                      title="Excluir produto"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Stats */}
      {filteredProducts.length > 0 && (
        <div className="text-center text-sm text-slate-600">
          Mostrando {filteredProducts.length} de {products.length} produtos
        </div>
      )}
    </div>
  );
}