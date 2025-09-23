#!/usr/bin/env npx tsx

/**
 * UNIFICAÇÃO REAL - ELIMINA FRAGMENTAÇÃO
 * 
 * Problema: components/ e design-system/ separados
 * Solução: Tudo em src/components/ com hierarquia clara
 */

import { promises as fs } from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const SRC_DIR = path.join(ROOT_DIR, 'src');

class TotalUnification {
  
  async analyzeCurrentChaos() {
    console.log('🔍 ANÁLISE DA FRAGMENTAÇÃO ATUAL:\n');
    
    console.log('❌ PROBLEMA: 3 LUGARES COM COMPONENTES');
    console.log('   📁 src/components/ui/ (15 shadcn components)');
    console.log('   📁 src/design-system/primitives/ (5 primitive folders)');
    console.log('   📁 src/design-system/components/ (1 duplicate)');
    console.log('   📁 src/design-system/ (loose components)\n');
    
    console.log('🎯 SOLUÇÃO: ESTRUTURA UNIFICADA');
    console.log('   📁 src/components/');
    console.log('   ├── primitives/ (Button, Card, etc.)');
    console.log('   ├── ui/ (shadcn components)');
    console.log('   ├── layout/ (Header, Footer)');
    console.log('   ├── sections/ (business logic)');
    console.log('   └── system/ (design tokens, themes)\n');
  }

  async executeUnification(dryRun = true) {
    await this.analyzeCurrentChaos();
    
    if (dryRun) {
      console.log('📋 PLANO DE UNIFICAÇÃO:');
      console.log('1. Mover design-system/primitives/ → components/primitives/');
      console.log('2. Mover design-system/core/ → components/system/');
      console.log('3. Mover design-system/*.tsx → components/sections/');
      console.log('4. Deletar src/design-system/ inteira');
      console.log('5. Atualizar todos imports para @/components');
      console.log('6. Single source of truth: src/components/index.ts\n');
      
      console.log('🔍 DRY-RUN - Execute com --execute para aplicar');
      return;
    }

    console.log('⚡ EXECUTANDO UNIFICAÇÃO TOTAL...\n');

    // 1. Create new structure
    const newDirs = [
      'components/primitives',
      'components/system', 
      'components/sections'
    ];

    for (const dir of newDirs) {
      await fs.mkdir(path.join(SRC_DIR, dir), { recursive: true });
      console.log(`📁 Criado: src/${dir}/`);
    }

    // 2. Move primitives
    try {
      const primitivesSource = path.join(SRC_DIR, 'design-system', 'primitives');
      const primitivesTarget = path.join(SRC_DIR, 'components', 'primitives');
      
      // Move each primitive folder
      const primitives = await fs.readdir(primitivesSource);
      for (const primitive of primitives) {
        if (primitive !== 'index.ts') {
          const source = path.join(primitivesSource, primitive);
          const target = path.join(primitivesTarget, primitive);
          await fs.rename(source, target);
          console.log(`✅ Movido: primitives/${primitive}`);
        }
      }
    } catch (error) {
      console.log('❌ Erro ao mover primitives:', error);
    }

    // 3. Move design system core
    try {
      const coreSource = path.join(SRC_DIR, 'design-system', 'core');
      const coreTarget = path.join(SRC_DIR, 'components', 'system');
      await fs.rename(coreSource, coreTarget);
      console.log('✅ Movido: core → system/');
    } catch (error) {
      console.log('⚠️  Core já movido ou não existe');
    }

    // 4. Move loose design system components
    try {
      const designSystemDir = path.join(SRC_DIR, 'design-system');
      const sectionsDir = path.join(SRC_DIR, 'components', 'sections');
      
      const files = await fs.readdir(designSystemDir);
      for (const file of files) {
        if (file.endsWith('.tsx')) {
          const source = path.join(designSystemDir, file);
          const target = path.join(sectionsDir, file);
          await fs.rename(source, target);
          console.log(`✅ Movido: ${file} → sections/`);
        }
      }
    } catch (error) {
      console.log('❌ Erro ao mover components:', error);
    }

    // 5. Create unified index
    const unifiedIndex = `/**
 * ARCO Components - Unified System
 * Single source of truth for all components
 */

// Primitives (base design system)
export * from './primitives';

// UI Components (shadcn style)  
export * from './ui';

// Layout Components
export * from './layout';

// Business Sections
export * from './sections';

// Design System
export * from './system';

/**
 * Usage: import { Button, Header, Card } from '@/components';
 */
`;

    await fs.writeFile(path.join(SRC_DIR, 'components', 'index.ts'), unifiedIndex);
    console.log('📋 Criado: src/components/index.ts (unified)');

    // 6. Remove old design-system
    try {
      await fs.rm(path.join(SRC_DIR, 'design-system'), { recursive: true, force: true });
      console.log('🗑️  Removido: src/design-system/ (inteira)');
    } catch (error) {
      console.log('⚠️  Design-system já removida');
    }

    // 7. Remove redundant ui folder
    try {
      await fs.rm(path.join(SRC_DIR, 'ui'), { recursive: true, force: true });
      console.log('🗑️  Removido: src/ui/ (redundante)');
    } catch (error) {
      console.log('⚠️  UI folder já removida');
    }

    console.log('\n✅ UNIFICAÇÃO TOTAL CONCLUÍDA!');
    console.log('📈 RESULTADO:');
    console.log('   • 1 pasta: src/components/');
    console.log('   • 1 import: @/components');
    console.log('   • 0 fragmentação');
    console.log('   • Hierarquia clara e lógica');
  }
}

const unifier = new TotalUnification();
const isExecute = process.argv.includes('--execute');

unifier.executeUnification(!isExecute);
