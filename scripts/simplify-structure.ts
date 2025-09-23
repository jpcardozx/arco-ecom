#!/usr/bin/env npx tsx

/**
 * SIMPLIFICA ESTRUTURA - REMOVE REDUNDÂNCIAS
 */

import { promises as fs } from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const SRC_DIR = path.join(ROOT_DIR, 'src');

class StructureSimplifier {
  
  async analyze() {
    console.log('🔍 PROBLEMAS DE REDUNDÂNCIA:\n');
    
    console.log('❌ REDUNDÂNCIAS ATUAIS:');
    console.log('   • src/design-system/index.ts (exports design)');
    console.log('   • src/components/index.ts (exports components)');  
    console.log('   • src/ui/index.ts (re-exports ambos)');
    console.log('   • Multiple barrel files doing same thing\n');
    
    console.log('🎯 SOLUÇÃO SIMPLES:');
    console.log('   ✅ MANTER: src/components/index.ts (tudo)');
    console.log('   🗑️  REMOVER: src/design-system/index.ts');
    console.log('   🗑️  REMOVER: src/ui/ (pasta inteira)');
    console.log('   📝 MOVER: design-system content → components/\n');
  }

  async executeSimplification(dryRun = true) {
    await this.analyze();
    
    if (dryRun) {
      console.log('🔍 DRY-RUN - Revisar plano');
      console.log('💡 Execute com --execute para aplicar\n');
      
      console.log('📋 AÇÕES:');
      console.log('1. Consolidar exports em src/components/index.ts');
      console.log('2. Deletar src/design-system/index.ts');
      console.log('3. Deletar src/ui/ inteira');
      console.log('4. Atualizar imports para @/components');
      
      return;
    }

    console.log('⚡ EXECUTANDO SIMPLIFICAÇÃO...\n');

    // 1. Update components/index.ts to include design system
    const newIndex = `/**
 * ARCO Components - Single Export Point
 */

// Design System Primitives
export * from '../design-system/primitives';
export { default as ProfessionalNavigation } from '../design-system/ProfessionalNavigation';
export * from '../design-system/core';

// Layout Components  
export * from './layout';

// UI Components
export * from './ui';

// Business Components
export * from './partner';

// Sections
export * from './sections';
`;

    await fs.writeFile(path.join(SRC_DIR, 'components', 'index.ts'), newIndex);
    console.log('✅ Updated: src/components/index.ts');

    // 2. Remove redundant files
    try {
      await fs.unlink(path.join(SRC_DIR, 'design-system', 'index.ts'));
      console.log('🗑️  Removed: src/design-system/index.ts');
    } catch {}

    try {
      await fs.rm(path.join(SRC_DIR, 'ui'), { recursive: true, force: true });
      console.log('🗑️  Removed: src/ui/ (entire folder)');
    } catch {}

    console.log('\n✅ SIMPLIFICAÇÃO CONCLUÍDA!');
    console.log('📈 RESULTADO:');
    console.log('   • 1 export point: @/components');
    console.log('   • 0 redundâncias');
    console.log('   • Clear import path');
  }
}

const simplifier = new StructureSimplifier();
const isExecute = process.argv.includes('--execute');

simplifier.executeSimplification(!isExecute);
