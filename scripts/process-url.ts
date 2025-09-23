#!/usr/bin/env tsx
/**
 * Script para processar URL específica e inserir no banco
 */

import { NextRequest } from 'next/server';

async function processUrl() {
  const url = 'https://mercadolivre.com/sec/1MFEQjn';
  const apiUrl = `http://localhost:3001/api/parse-link?url=${encodeURIComponent(url)}&detailed=true`;
  
  console.log('🔄 Processando URL específica:', url);
  
  try {
    const response = await fetch(apiUrl);
    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Produto processado com sucesso!');
      console.log('📦 Detalhes:', JSON.stringify(result, null, 2));
    } else {
      console.log('❌ Erro ao processar:', result);
    }
  } catch (error) {
    console.error('💥 Erro na requisição:', error);
  }
}

processUrl();