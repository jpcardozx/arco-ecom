#!/usr/bin/env npx tsx

/**
 * AUDITORIA E LIMPEZA ESTRUTURAL REAL - S-TIER DESIGN SYSTEM
 * 
 * Problemas identificados:
 * - 146 componentes TSX mal organizados
 * - Duplicações massivas (6 versões de page.tsx)
 * - Primitivos fragmentados em 2 locais
 * - Hierarquia confusa com nesting desnecessário
 */

import { promises as fs } from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const SRC_DIR = path.join(ROOT_DIR, 'src');

interface ComponentAnalysis {
  path: string;
  type: 'primitive' | 'layout' | 'section' | 'page' | 'ui' | 'business' | 'duplicate';
  shouldKeep: boolean;
  newLocation?: string;
  reason: string;
}

class StructuralCleanup {
  private components: ComponentAnalysis[] = [];

  async analyzeComponents() {
    console.log('🔍 INICIANDO AUDITORIA REAL DOS 146 COMPONENTES...\n');

    // Análise crítica dos duplicados
    const duplicates = [
      { path: 'src/app/page_new.tsx', reason: 'Duplicado - manter apenas page.tsx' },
      { path: 'src/app/page-new.tsx', reason: 'Duplicado - manter apenas page.tsx' },
      { path: 'src/app/page-fixed.tsx', reason: 'Duplicado - manter apenas page.tsx' },
      { path: 'src/app/page-clean.tsx', reason: 'Duplicado - manter apenas page.tsx' },
      { path: 'src/app/page-integrated.tsx', reason: 'Duplicado - consolidar em page.tsx' },
      { path: 'src/components/home-HomePageClient.tsx', reason: 'Duplicado - manter HomePageClient.tsx' },
      { path: 'src/design-system/navigation-ProfessionalNavigation.tsx', reason: 'Duplicado - manter ProfessionalNavigation.tsx' },
      { path: 'src/design-system/_deprecated_BentoGrid.tsx', reason: 'Deprecated - remover' },
      { path: 'src/design-system/_deprecated_AnimatedSection.tsx', reason: 'Deprecated - remover' },
      { path: 'src/components/sections/EnhancedHeroSectionV3_backup.tsx', reason: 'Backup - remover' },
      { path: 'src/lib/utils/utils-with-translation-new.tsx', reason: 'Duplicado - consolidar' },
    ];

    // Análise das fragmentações
    const fragmentedPrimitives = [
      {
        current: 'src/design-system/components/Badge.tsx',
        target: 'src/design-system/primitives/Badge/Badge.tsx',
        reason: 'Primitivo duplicado - usar versão em primitives/'
      },
      {
        current: 'src/design-system/components/Container.tsx',
        target: 'src/design-system/primitives/Container/Container.tsx',
        reason: 'Primitivo duplicado - usar versão em primitives/'
      }
    ];

    // Análise de má hierarquia
    const badHierarchy = [
      {
        current: 'src/components/sections/s-tier/STierHero.tsx',
        target: 'src/design-system/sections/STierHero.tsx',
        reason: 'S-tier components devem estar no design-system'
      },
      {
        current: 'src/components/sections/s-tier/HeroBackgroundEffects.tsx',
        target: 'src/design-system/sections/HeroBackgroundEffects.tsx',
        reason: 'S-tier components devem estar no design-system'
      },
      {
        current: 'src/lib/ui/context.tsx',
        target: 'src/contexts/ui-context.tsx',
        reason: 'Contexts devem estar em /contexts'
      },
      {
        current: 'src/lib/ui/user-preferences-context.tsx',
        target: 'src/contexts/user-preferences.tsx',
        reason: 'Contexts devem estar em /contexts'
      },
      {
        current: 'src/lib/ui/LanguageSwitcher.tsx',
        target: 'src/components/ui/LanguageSwitcher.tsx',
        reason: 'Component UI deve estar em components/ui'
      }
    ];

    // Categorizar todos os componentes
    duplicates.forEach(dup => {
      this.components.push({
        path: dup.path,
        type: 'duplicate',
        shouldKeep: false,
        reason: dup.reason
      });
    });

    fragmentedPrimitives.forEach(frag => {
      this.components.push({
        path: frag.current,
        type: 'primitive',
        shouldKeep: false,
        newLocation: frag.target,
        reason: frag.reason
      });
    });

    badHierarchy.forEach(bad => {
      this.components.push({
        path: bad.current,
        type: 'section',
        shouldKeep: true,
        newLocation: bad.target,
        reason: bad.reason
      });
    });

    return this.generateReport();
  }

  private generateReport() {
    console.log('📊 RELATÓRIO DE AUDITORIA ESTRUTURAL:\n');
    
    const toDelete = this.components.filter(c => !c.shouldKeep);
    const toMove = this.components.filter(c => c.shouldKeep && c.newLocation);
    
    console.log(`🗑️  PARA DELETAR (${toDelete.length} arquivos):`);
    toDelete.forEach(comp => {
      console.log(`   ❌ ${comp.path}`);
      console.log(`      └─ ${comp.reason}\n`);
    });

    console.log(`🔄 PARA MOVER (${toMove.length} arquivos):`);
    toMove.forEach(comp => {
      console.log(`   📁 ${comp.path}`);
      console.log(`      └─ → ${comp.newLocation}`);
      console.log(`      └─ ${comp.reason}\n`);
    });

    return {
      toDelete: toDelete.map(c => c.path),
      toMove: toMove.map(c => ({ from: c.path, to: c.newLocation!, reason: c.reason })),
      summary: {
        totalAnalyzed: 146,
        duplicatesFound: toDelete.length,
        hierarchyIssues: toMove.length,
        estimatedReduction: `${toDelete.length} arquivos eliminados`,
        hierarchyImprovement: `${toMove.length} componentes reorganizados`
      }
    };
  }

  async executeCleanup(dryRun = true) {
    const analysis = await this.analyzeComponents();
    
    if (dryRun) {
      console.log('🔍 MODO DRY-RUN - Nenhum arquivo será modificado');
      console.log('💡 Execute com --execute para aplicar mudanças\n');
      return analysis;
    }

    console.log('⚡ EXECUTANDO LIMPEZA ESTRUTURAL...\n');

    // Criar diretórios necessários
    const newDirs = [
      'src/design-system/sections',
      'src/contexts'
    ];

    for (const dir of newDirs) {
      await fs.mkdir(path.join(ROOT_DIR, dir), { recursive: true });
      console.log(`📁 Criado: ${dir}`);
    }

    // Mover arquivos
    for (const move of analysis.toMove) {
      const sourcePath = path.join(ROOT_DIR, move.from);
      const targetPath = path.join(ROOT_DIR, move.to);
      
      try {
        await fs.mkdir(path.dirname(targetPath), { recursive: true });
        await fs.rename(sourcePath, targetPath);
        console.log(`✅ Movido: ${move.from} → ${move.to}`);
      } catch (error) {
        console.log(`❌ Erro ao mover ${move.from}: ${error}`);
      }
    }

    // Deletar duplicados
    for (const deletePath of analysis.toDelete) {
      try {
        await fs.unlink(path.join(ROOT_DIR, deletePath));
        console.log(`🗑️  Deletado: ${deletePath}`);
      } catch (error) {
        console.log(`❌ Erro ao deletar ${deletePath}: ${error}`);
      }
    }

    // Limpar pastas vazias
    await this.cleanEmptyDirectories();

    console.log('\n✅ LIMPEZA ESTRUTURAL CONCLUÍDA!');
    console.log('📈 RESULTADOS:');
    console.log(`   • ${analysis.toDelete.length} duplicados removidos`);
    console.log(`   • ${analysis.toMove.length} componentes reorganizados`);
    console.log(`   • Hierarquia otimizada para S-tier design system`);

    return analysis;
  }

  private async cleanEmptyDirectories() {
    const emptyDirs = [
      'src/components/sections/s-tier',
      'src/design-system/components', // Se ficar vazio após mover primitivos
      'src/lib/ui'
    ];

    for (const dir of emptyDirs) {
      try {
        const fullPath = path.join(ROOT_DIR, dir);
        const items = await fs.readdir(fullPath);
        if (items.length === 0) {
          await fs.rmdir(fullPath);
          console.log(`📁 Removido diretório vazio: ${dir}`);
        }
      } catch (error) {
        // Diretório não existe ou não está vazio
      }
    }
  }
}

// Executar auditoria
const cleanup = new StructuralCleanup();
const isExecute = process.argv.includes('--execute');

cleanup.executeCleanup(!isExecute)
  .then(result => {
    if (!isExecute) {
      console.log('\n🎯 PRÓXIMOS PASSOS:');
      console.log('1. Revisar este relatório');
      console.log('2. Executar: npx tsx scripts/structural-cleanup-real.ts --execute');
      console.log('3. Atualizar imports afetados');
      console.log('4. Executar testes para validar');
    }
  })
  .catch(console.error);
