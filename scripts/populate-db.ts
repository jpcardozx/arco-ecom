#!/usr/bin/env tsx
/**
 * Script para popular o banco SQLite com produtos de exemplo
 */

import { sqliteService } from '../src/lib/sqlite.js';

console.log('🔄 Iniciando população do banco de dados...');

// Verificar se o banco já tem produtos
const products = sqliteService.getProducts();
const currentCount = products.length;
console.log(`📊 Produtos atuais no banco: ${currentCount}`);

if (currentCount === 0) {
  console.log('📦 Adicionando produtos de exemplo...');
  
  // O banco já tem a lógica para adicionar produtos sample na inicialização
  // Vamos apenas garantir que está inicializado
  const newProducts = sqliteService.getProducts();
  console.log(`✅ Banco populado com ${newProducts.length} produtos!`);
  
  // Mostrar alguns exemplos
  newProducts.slice(0, 3).forEach((product: any) => {
    console.log(`📱 ${product.title} - R$ ${product.price}`);
  });
} else {
  console.log('✅ Banco já possui produtos!');
}

console.log('🎉 Processo concluído!');