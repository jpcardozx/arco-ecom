#!/usr/bin/env node

/**
 * DIAGNÓSTICO TAILWIND SIMPLIFICADO
 * Baseado no fluxo otimizado: Ação > Diagnóstico > Correção
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 DIAGNÓSTICO TAILWIND SIMPLES');
console.log('==============================\n');

// Passo 1: Verificar configuração básica
console.log('📋 Passo 1: Verificação de Configuração');
console.log('----------------------------------------');

const configPath = './tailwind.config.js';
if (fs.existsSync(configPath)) {
  console.log('✅ tailwind.config.js encontrado');
  const config = fs.readFileSync(configPath, 'utf8');
  
  // Verificar se tem content configurado
  if (config.includes('content:')) {
    console.log('✅ Propriedade "content" configurada');
  } else {
    console.log('❌ Propriedade "content" ausente ou mal configurada');
  }
  
  // Verificar caminhos básicos
  if (config.includes('./src/**/*.{js,ts,jsx,tsx}')) {
    console.log('✅ Caminho ./src/**/*.{js,ts,jsx,tsx} configurado');
  } else {
    console.log('⚠️  Verifique se os caminhos em "content" batem com sua estrutura');
  }
} else {
  console.log('❌ tailwind.config.js não encontrado');
}

console.log('\n📄 Passo 2: Verificação do CSS Gerado');
console.log('-------------------------------------');

const outputPath = './dist/output.css';
if (fs.existsSync(outputPath)) {
  console.log('✅ CSS gerado encontrado em ./dist/output.css');
  
  const css = fs.readFileSync(outputPath, 'utf8');
  const fileSize = (css.length / 1024 / 1024).toFixed(2);
  console.log(`📊 Tamanho: ${fileSize} MB`);
  
  // Teste das classes mais comuns
  const testClasses = [
    'bg-red-500',
    'text-white', 
    'p-4',
    'executive-container',
    'executive-section'
  ];
  
  let foundCount = 0;
  testClasses.forEach(className => {
    if (css.includes(`.${className}`)) {
      console.log(`✅ .${className} - ENCONTRADA`);
      foundCount++;
    } else {
      console.log(`❌ .${className} - AUSENTE`);
    }
  });
  
  console.log(`\n📈 Taxa de Sucesso: ${foundCount}/${testClasses.length} (${((foundCount/testClasses.length)*100).toFixed(0)}%)`);
  
} else {
  console.log('❌ CSS não gerado. Execute:');
  console.log('   npx tailwindcss -i ./src/styles/globals.css -o ./dist/output.css');
}

console.log('\n🧪 Passo 3: Teste de Isolamento');
console.log('------------------------------');

const testPath = './test.html';
if (fs.existsSync(testPath)) {
  console.log('✅ Arquivo test.html criado');
  console.log('👀 Abra file:///c:/Users/João Pedro Cardozo/projetos/arco/test.html no navegador');
  console.log('📋 Verifique se as classes estão sendo aplicadas visualmente');
} else {
  console.log('⚠️  Arquivo test.html não encontrado');
}

console.log('\n💡 PRÓXIMOS PASSOS:');
console.log('──────────────────');
console.log('1. Abra o test.html no navegador');
console.log('2. Inspecione elementos para ver classes aplicadas');
console.log('3. Se algo não funcionar, o problema está no CSS, não na configuração');
console.log('\n🎯 REGRA DE OURO: 80% dos problemas vêm de caminhos incorretos em "content"');
