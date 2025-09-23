/**
 * ARCO Admin Affiliate Links Manager
 * Professional interface for adding and managing affiliate links
 */

'use client';

import React, { useState } from 'react';
import {
  Link2,
  Plus,
  Upload,
  Download,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
  ExternalLink
} from 'lucide-react';

interface ParsedLink {
  id: string;
  url: string;
  platform: string;
  status: 'parsing' | 'success' | 'error';
  title?: string;
  price?: number;
  image?: string;
  error?: string;
  timestamp: Date;
}

export default function AffiliateLinksPage() {
  const [linkInput, setLinkInput] = useState('');
  const [parsedLinks, setParsedLinks] = useState<ParsedLink[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const sampleLinks = [
    'https://produto.mercadolivre.com.br/MLB-1234567890-smartphone-samsung-galaxy-a54',
    'https://www.amazon.com.br/dp/B08N5WRWNW',
    'https://shopee.com.br/product/123456789/987654321',
    'https://www.magazineluiza.com.br/notebook-gamer-asus/p/12345678',
  ];

  const detectPlatform = (url: string): string => {
    const hostname = new URL(url).hostname.toLowerCase();
    if (hostname.includes('mercadolivre')) return 'Mercado Livre';
    if (hostname.includes('amazon')) return 'Amazon';
    if (hostname.includes('shopee')) return 'Shopee';
    if (hostname.includes('magazineluiza')) return 'Magazine Luiza';
    if (hostname.includes('casasbahia')) return 'Casas Bahia';
    return 'Genérico';
  };

  const parseLink = async (url: string): Promise<void> => {
    const linkId = Date.now().toString();
    const newLink: ParsedLink = {
      id: linkId,
      url,
      platform: detectPlatform(url),
      status: 'parsing',
      timestamp: new Date()
    };

    setParsedLinks(prev => [newLink, ...prev]);

    try {
      // Simulate API call to affiliate link parser
      const response = await fetch('/api/parse-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      if (response.ok) {
        const data = await response.json();

        if (data.success) {
          setParsedLinks(prev =>
            prev.map(link =>
              link.id === linkId
                ? {
                    ...link,
                    status: 'success',
                    title: data.result.title,
                    price: data.result.price,
                    image: data.result.main_image
                  }
                : link
            )
          );
        } else {
          throw new Error(data.error || 'Erro ao processar link');
        }
      } else {
        throw new Error('Erro na requisição');
      }
    } catch (error) {
      setParsedLinks(prev =>
        prev.map(link =>
          link.id === linkId
            ? {
                ...link,
                status: 'error',
                error: error instanceof Error ? error.message : 'Erro desconhecido'
              }
            : link
        )
      );
    }
  };

  const handleSingleLink = async () => {
    if (!linkInput.trim()) return;

    setIsProcessing(true);
    await parseLink(linkInput.trim());
    setLinkInput('');
    setIsProcessing(false);
  };

  const handleBulkLinks = async () => {
    const links = linkInput
      .split('\n')
      .map(link => link.trim())
      .filter(link => link.length > 0);

    if (links.length === 0) return;

    setIsProcessing(true);

    for (const link of links) {
      await parseLink(link);
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setLinkInput('');
    setIsProcessing(false);
  };

  const renderStatus = (link: ParsedLink) => {
    switch (link.status) {
      case 'parsing':
        return (
          <div className="flex items-center gap-2 text-blue-600">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span className="text-sm">Processando...</span>
          </div>
        );
      case 'success':
        return (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm">Sucesso</span>
          </div>
        );
      case 'error':
        return (
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">Erro</span>
          </div>
        );
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <Link2 className="w-8 h-8 text-blue-600" />
          Links de Afiliados
        </h1>
        <p className="text-slate-600 mt-1">
          Adicione links de produtos para extrair informações automaticamente
        </p>
      </div>

      {/* Add Links Section */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Adicionar Links</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                URLs dos Produtos
              </label>
              <textarea
                value={linkInput}
                onChange={(e) => setLinkInput(e.target.value)}
                placeholder="Cole os links aqui, um por linha..."
                className="w-full h-32 p-3 border border-slate-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={linkInput.includes('\n') ? handleBulkLinks : handleSingleLink}
                disabled={!linkInput.trim() || isProcessing}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    {linkInput.includes('\n') ? 'Processar Múltiplos' : 'Processar Link'}
                  </>
                )}
              </button>

              <button
                onClick={() => setLinkInput(sampleLinks.join('\n'))}
                className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Usar Exemplos
              </button>
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Como usar:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Cole links completos de produtos (Mercado Livre, Amazon, etc.)</li>
              <li>• Para múltiplos links, cole um por linha</li>
              <li>• O sistema extrairá título, preço, imagem automaticamente</li>
              <li>• Links de afiliado são preservados</li>
              <li>• Produtos serão salvos no banco de dados</li>
            </ul>

            <div className="mt-4">
              <h4 className="font-medium text-blue-900 mb-2">Plataformas suportadas:</h4>
              <div className="flex flex-wrap gap-2">
                {['Mercado Livre', 'Amazon', 'Shopee', 'Magazine Luiza', 'Casas Bahia'].map(platform => (
                  <span
                    key={platform}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Processing Results */}
      {parsedLinks.length > 0 && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Resultados do Processamento
          </h2>

          <div className="space-y-3">
            {parsedLinks.map((link) => (
              <div
                key={link.id}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border"
              >
                <div className="flex items-center gap-4 flex-1">
                  {/* Status Icon */}
                  <div className="flex-shrink-0">
                    {renderStatus(link)}
                  </div>

                  {/* Link Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-slate-200 text-slate-700 px-2 py-1 rounded text-xs">
                        {link.platform}
                      </span>
                      <span className="text-xs text-slate-500">
                        {link.timestamp.toLocaleTimeString()}
                      </span>
                    </div>

                    {link.status === 'success' && link.title ? (
                      <div>
                        <p className="font-medium text-slate-900 truncate">{link.title}</p>
                        {link.price && (
                          <p className="text-sm text-slate-600">
                            R$ {link.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </p>
                        )}
                      </div>
                    ) : link.status === 'error' ? (
                      <div>
                        <p className="text-sm text-red-600">{link.error}</p>
                        <p className="text-xs text-slate-500 truncate">{link.url}</p>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-600 truncate">{link.url}</p>
                    )}
                  </div>

                  {/* Product Image */}
                  {link.image && (
                    <div className="w-12 h-12 bg-slate-200 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={link.image}
                        alt={link.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 ml-4">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-600 hover:text-slate-900"
                    title="Abrir link original"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {parsedLinks.length === 0 && (
        <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
          <Link2 className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">
            Pronto para começar
          </h3>
          <p className="text-slate-600">
            Cole alguns links de produtos acima para começar a extrair informações automaticamente.
          </p>
        </div>
      )}
    </div>
  );
}