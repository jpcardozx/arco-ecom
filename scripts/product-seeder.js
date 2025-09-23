#!/usr/bin/env node

/**
 * ARCO Dynamic Product Importer
 * Script para importar produtos automaticamente via links de afiliados
 */

import axios from 'axios';

const API_BASE = 'http://localhost:3000';

// Função para importar produto via API
async function importProductFromLink(affiliateLink, options = {}) {
  try {
    console.log(`🔄 Importando produto de: ${affiliateLink}`);
    
    const response = await axios.post(`${API_BASE}/api/products/import`, {
      affiliate_link: affiliateLink,
      featured: options.featured || false,
      active: options.active !== false, // default true
      override_category: options.category,
      override_brand: options.brand
    });

    if (response.data.success) {
      const product = response.data.data;
      console.log(`✅ Produto importado com sucesso!`);
      console.log(`   🏷️  ${product.title}`);
      console.log(`   💰 R$ ${product.price.toFixed(2)}`);
      console.log(`   🏪 ${product.source_platform}`);
      console.log(`   🆔 ID: ${product.id}`);
      console.log(`   🔗 Slug: /ecommerce/product/${product.slug}`);
      return product;
    } else {
      console.error('❌ Falha na importação:', response.data.error);
      return null;
    }
  } catch (error) {
    if (error.response) {
      console.error('❌ Erro na API:', error.response.data.error);
      if (error.response.data.details) {
        console.error('   Detalhes:', error.response.data.details);
      }
    } else {
      console.error('❌ Erro de conexão:', error.message);
    }
    return null;
  }
}

// Função para listar produtos via API
async function listProducts() {
  try {
    const response = await axios.get(`${API_BASE}/api/products`);
    const products = response.data.data;

    console.log('\n📱 Produtos no banco de dados:');
    console.log('='.repeat(50));

    if (products.length === 0) {
      console.log('Nenhum produto encontrado.');
      return;
    }

    products.forEach(product => {
      console.log(`\n🏷️  ${product.title}`);
      console.log(`   💰 R$ ${product.price.toFixed(2)} ${product.original_price ? `(de R$ ${product.original_price.toFixed(2)})` : ''}`);
      console.log(`   🏪 ${product.source_platform} | ⭐ ${product.rating || 'N/A'} | 📦 ${product.in_stock ? 'Em estoque' : 'Fora de estoque'}`);
      console.log(`   🆔 ID: ${product.id}`);
      console.log(`   🔗 Slug: /ecommerce/product/${product.slug}`);
    });
  } catch (error) {
    console.error('❌ Erro ao listar produtos:', error.response?.data?.error || error.message);
  }
}

// Função para mostrar plataformas suportadas
async function showSupported() {
  try {
    const response = await axios.get(`${API_BASE}/api/products/import/status`);
    const info = response.data;

    console.log('\n🔧 Sistema de Importação ARCO');
    console.log('='.repeat(50));
    console.log(`Plataformas suportadas: ${info.supported_platforms.join(', ')}`);
    console.log('\n📋 Exemplo de uso:');
    console.log('node scripts/product-seeder.js import "https://amzn.to/4nE3ZAC"');
    console.log('node scripts/product-seeder.js import "https://amzn.to/4nE3ZAC" --featured --category "Smartphones"');
    
    console.log('\n📝 Instruções:');
    Object.entries(info.instructions).forEach(([num, instruction]) => {
      console.log(`${num}. ${instruction}`);
    });
  } catch (error) {
    console.error('❌ Erro ao obter informações:', error.message);
  }
}

// Interface de linha de comando
const command = process.argv[2];
const affiliateLink = process.argv[3];

// Parse das opções
const options = {};
process.argv.slice(4).forEach(arg => {
  if (arg === '--featured') options.featured = true;
  if (arg === '--inactive') options.active = false;
  if (arg.startsWith('--category=')) options.category = arg.split('=')[1];
  if (arg.startsWith('--brand=')) options.brand = arg.split('=')[1];
});

switch (command) {
  case 'import':
    if (!affiliateLink) {
      console.error('❌ Link de afiliado é obrigatório');
      console.log('Exemplo: node scripts/product-seeder.js import "https://amzn.to/4nE3ZAC"');
      process.exit(1);
    }
    await importProductFromLink(affiliateLink, options);
    break;

  case 'list':
    await listProducts();
    break;

  case 'info':
  case 'status':
    await showSupported();
    break;

  default:
    console.log(`
🛒 ARCO Dynamic Product Importer

Comandos disponíveis:
  import <link>     - Importa produto do link de afiliado
  list             - Lista produtos existentes
  info             - Mostra plataformas suportadas

Exemplos:
  node scripts/product-seeder.js import "https://amzn.to/4nE3ZAC"
  node scripts/product-seeder.js import "https://amzn.to/4nE3ZAC" --featured --category="Smartphones"
  node scripts/product-seeder.js list
  node scripts/product-seeder.js info

Opções para import:
  --featured              - Marca como produto em destaque
  --inactive              - Marca como inativo
  --category="Categoria"  - Define categoria personalizada
  --brand="Marca"         - Define marca personalizada
    `);
}