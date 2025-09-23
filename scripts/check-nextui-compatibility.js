/**
 * Script para verificar compatibilidade entre NextUI e Tailwind CSS
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Caminhos importantes
const projectRoot = path.resolve(__dirname, '..');
const packageJsonPath = path.join(projectRoot, 'package.json');

// Ler package.json
console.log('📊 Analisando dependências...');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Extrair versões
const tailwindVersion = packageJson.dependencies?.tailwindcss || packageJson.devDependencies?.tailwindcss;
console.log(`🔍 Versão do Tailwind no projeto: ${tailwindVersion || 'não encontrada'}`);

// Verificar dependências do NextUI
const nextUIVersion = packageJson.dependencies?.['@nextui-org/react'];
console.log(`🔍 Versão do NextUI no projeto: ${nextUIVersion || 'não encontrada'}`);

// Verificar se NextUI está instalado
if (!nextUIVersion) {
  console.log('ℹ️ NextUI não está instalado como dependência direta.');
  process.exit(0);
}

// Verificar as dependências do NextUI
try {
  console.log('🔍 Verificando dependências internas do NextUI...');
  const nodeModulesPath = path.join(projectRoot, 'node_modules');
  
  const nextUIPackagePath = path.join(nodeModulesPath, '@nextui-org', 'react', 'package.json');
  const nextUIPeerDepsPath = path.join(nodeModulesPath, '@nextui-org', 'theme', 'package.json');
  
  let nextUITailwindVersion = '';
  
  if (fs.existsSync(nextUIPeerDepsPath)) {
    const nextUITheme = JSON.parse(fs.readFileSync(nextUIPeerDepsPath, 'utf8'));
    nextUITailwindVersion = nextUITheme.dependencies?.tailwindcss;
    console.log(`🔍 NextUI theme está usando Tailwind: ${nextUITailwindVersion || 'versão não encontrada'}`);
  }
  
  // Verificar compatibilidade
  if (tailwindVersion && nextUITailwindVersion) {
    const mainTailwindMajor = parseInt(tailwindVersion.match(/\\d+/)[0]);
    const nextUITailwindMajor = parseInt(nextUITailwindVersion.match(/\\d+/)[0]);
    
    if (mainTailwindMajor !== nextUITailwindMajor) {
      console.log('⚠️ AVISO: Incompatibilidade detectada entre versões do Tailwind!');
      console.log(`   - Projeto: v${mainTailwindMajor}.x`);
      console.log(`   - NextUI: v${nextUITailwindMajor}.x`);
      console.log('');
      console.log('🔧 Recomendações:');
      
      if (nextUITailwindMajor > mainTailwindMajor) {
        console.log('   1. Atualize o Tailwind CSS do projeto:');
        console.log(`      npm install -D tailwindcss@^${nextUITailwindMajor}.0.0`);
      } else {
        console.log('   1. Use uma versão compatível do NextUI:');
        console.log('      npm install @nextui-org/react@latest-compatible');
      }
      
      console.log('   2. Ou mantenha as diferentes versões, mas esteja ciente');
      console.log('      de possíveis conflitos e problemas de estilo.');
    } else {
      console.log('✅ As versões do Tailwind são compatíveis!');
    }
  }
  
} catch (error) {
  console.error('❌ Erro ao verificar compatibilidades:', error.message);
}
