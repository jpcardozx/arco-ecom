/**
 * ARCO MongoDB Index Creation Script
 * Cria índices otimizados para performance máxima
 */

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config({ path: '.env.local' });

import { MongoClient } from 'mongodb';

async function createOptimizedIndexes() {
  console.log('🚀 Criando índices otimizados no MongoDB...');
  
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_DB || 'arco-development');
    const productsCollection = db.collection('products');
    
    // 1. Índice composto principal (active + featured + created_at)
    await productsCollection.createIndex(
      { active: 1, featured: -1, created_at: -1 },
      { name: 'active_featured_created_idx', background: true }
    );
    console.log('✅ Índice principal criado');
    
    // 2. Índice de busca por texto (title + description)
    await productsCollection.createIndex(
      { title: 'text', description: 'text' },
      { name: 'text_search_idx', background: true }
    );
    console.log('✅ Índice de busca por texto criado');
    
    // 3. Índice único para slug
    await productsCollection.createIndex(
      { slug: 1 },
      { name: 'slug_unique_idx', unique: true, background: true }
    );
    console.log('✅ Índice único de slug criado');
    
    // 4. Índice para filtros (category + price)
    await productsCollection.createIndex(
      { category: 1, price: 1 },
      { name: 'category_price_idx', background: true }
    );
    console.log('✅ Índice de categoria e preço criado');
    
    // 5. Listar todos os índices
    const indexes = await productsCollection.listIndexes().toArray();
    console.log('\n📋 Índices criados:');
    indexes.forEach(index => {
      console.log(`   - ${index.name}: ${JSON.stringify(index.key)}`);
    });
    
    console.log('\n🎉 Todos os índices foram criados com sucesso!');
    console.log('💡 Performance do banco otimizada para consultas rápidas.');
    
  } catch (error) {
    console.error('❌ Erro ao criar índices:', error.message);
  } finally {
    await client.close();
  }
}

createOptimizedIndexes();