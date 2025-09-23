#!/usr/bin/env node

/**
 * ARCO Tailwind Diagnostic Tool
 * Diagnóstica conflitos e problemas de configuração do Tailwind CSS
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

console.log('🔍 ARCO - Tailwind CSS Diagnostic Report');
console.log('==========================================\n');

// 1. Configuration Files Check
console.log('📄 Configuration Files:');
const configs = [
  'tailwind.config.js',
  'postcss.config.cjs', 
  'next.config.mjs',
  'config/tailwind.config.js',
  'config/postcss.config.cjs'
];

configs.forEach(config => {
  const exists = existsSync(config);
  console.log(`  ${config}: ${exists ? '✅ Found' : '❌ Missing'}`);
});
console.log();

// 2. Package Dependencies Check
console.log('📦 Package Dependencies:');
try {
  const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
  const tailwindDeps = [
    'tailwindcss',
    'postcss',
    'postcss-nested',
    'tailwind-merge',
    'tailwindcss-animate'
  ];
  
  tailwindDeps.forEach(dep => {
    const version = pkg.dependencies?.[dep] || pkg.devDependencies?.[dep];
    console.log(`  ${dep}: ${version || '❌ Missing'}`);
  });
} catch (e) {
  console.log('  ❌ Could not read package.json');
}
console.log();

// 3. PostCSS Configuration Analysis
console.log('⚙️  PostCSS Configuration Analysis:');
try {
  // Main config
  if (existsSync('postcss.config.cjs')) {
    const postcssConfig = require('./postcss.config.cjs');
    console.log('  Main postcss.config.cjs:');
    console.log(`    Plugins: ${Object.keys(postcssConfig.plugins || {}).join(', ')}`);
  }
  
  // Config folder
  if (existsSync('config/postcss.config.cjs')) {
    const postcssConfigAlt = require('./config/postcss.config.cjs');
    console.log('  Config folder postcss.config.cjs:');
    console.log(`    Plugins: ${Object.keys(postcssConfigAlt.plugins || {}).join(', ')}`);
    console.log('    ⚠️  Potential conflict detected!');
  }
} catch (e) {
  console.log('  ❌ Error reading PostCSS config:', e.message);
}
console.log();

// 4. Tailwind Config Validation
console.log('🎨 Tailwind Configuration Validation:');
try {
  const tailwindConfig = require('./tailwind.config.js');
  
  console.log(`  Content paths: ${tailwindConfig.content?.length || 0} configured`);
  console.log(`  Plugins: ${tailwindConfig.plugins?.length || 0} configured`);
  console.log(`  Dark mode: ${tailwindConfig.darkMode || 'default'}`);
  
  // Check for common issues
  const issues = [];
  
  if (!tailwindConfig.content || tailwindConfig.content.length === 0) {
    issues.push('No content paths configured');
  }
  
  if (tailwindConfig.plugins) {
    const hasCustomPlugin = tailwindConfig.plugins.some(p => typeof p === 'function');
    if (hasCustomPlugin) {
      console.log('  ✅ Custom plugin detected');
    }
  }
  
  if (issues.length > 0) {
    console.log('  ⚠️  Issues found:');
    issues.forEach(issue => console.log(`    - ${issue}`));
  } else {
    console.log('  ✅ Configuration looks good');
  }
  
} catch (e) {
  console.log('  ❌ Error reading Tailwind config:', e.message);
}
console.log();

// 5. CSS Import Analysis
console.log('🎯 CSS Import Analysis:');
const cssFiles = [
  'src/app/globals.css',
  'styles/globals.css',
  'src/styles/globals.css'
];

cssFiles.forEach(cssFile => {
  if (existsSync(cssFile)) {
    try {
      const content = readFileSync(cssFile, 'utf8');
      const hasTailwindImports = content.includes('@tailwind');
      console.log(`  ${cssFile}: ${hasTailwindImports ? '✅ Tailwind imports found' : '⚠️  No Tailwind imports'}`);
      
      if (hasTailwindImports) {
        const imports = content.match(/@tailwind [^;]+/g) || [];
        console.log(`    Imports: ${imports.join(', ')}`);
      }
    } catch (e) {
      console.log(`  ${cssFile}: ❌ Could not read file`);
    }
  }
});
console.log();

// 6. Build System Check
console.log('🔧 Build System Integration:');
try {
  const nextConfig = existsSync('next.config.mjs') ? 
    await import('./next.config.mjs') : null;
    
  if (nextConfig) {
    console.log('  ✅ Next.js config found');
    console.log(`  React Strict Mode: ${nextConfig.default?.reactStrictMode ? 'enabled' : 'disabled'}`);
    
    // Check for conflicting CSS configurations
    if (nextConfig.default?.experimental?.optimizePackageImports) {
      console.log('  ✅ Package imports optimization enabled');
    }
  }
} catch (e) {
  console.log('  ⚠️  Could not analyze Next.js config');
}
console.log();

// 7. Recommendations
console.log('💡 Recommendations:');
console.log('  1. Ensure only one PostCSS config is active');
console.log('  2. Keep Tailwind and PostCSS versions compatible');
console.log('  3. Use modifiers: true in custom plugins');
console.log('  4. Monitor for duplicate CSS imports');
console.log('  5. Consider using Tailwind CSS IntelliSense extension');
console.log('\n✨ Diagnostic complete!');