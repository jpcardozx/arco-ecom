#!/usr/bin/env npx tsx

/**
 * LIMPEZA ORGANIZACIONAL DA RAIZ - ARCO PROJECT
 * 
 * Problema: 78 arquivos/pastas na raiz (deveria ter ~15)
 * Solução: Organizar documentação, configs e estrutura
 */

import { promises as fs } from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();

interface RootCleanupPlan {
  docs: string[];
  configs: string[];
  technical: string[];
  keep: string[];
}

class RootOrganizer {
  private plan: RootCleanupPlan = {
    docs: [],
    configs: [],
    technical: [],
    keep: []
  };

  async analyzeRoot() {
    console.log('🔍 ANALISANDO RAIZ POLUÍDA (78 ITENS)...\n');

    // Documentação para mover para /docs
    this.plan.docs = [
      'agents.md',
      'ARCO_AI_AGENTS_MATRIX.md', 
      'ARCO_AI_AGENT_STRATEGIC_CONTEXT.md',
      'ARCO_COMMAND_CENTER.md',
      'ARCO_DIAGNOSTIC_ANALYSIS.md',
      'ARCO_EXECUTIVE_SUMMARY.md',
      'ARCO_S_TIER_ROADMAP.md',
      'CHANGELOG.md',
      'CORRECOES_APLICADAS.md',
      'DESIGN_SYSTEM_CRITICAL_STATUS.md',
      'DESIGN_SYSTEM_EXECUTION_PLAN.md',
      'DESIGN_SYSTEM_STRATEGIC_DOCUMENTATION.md',
      'DESIGN_SYSTEM_S_TIER_SUCCESS.md',
      'DOCUMENTACAO_TECNICA_AVANCADA.md',
      'FINAL_SUCCESS_REPORT.md',
      'IMPLEMENTATION_STATUS.md',
      'PHASE_1_2_COMPLETE.md',
      'PHASE_1_3_COMPLETE.md',
      'PLANO_IMPLEMENTACAO_EXECUTAVEL.md',
      'PRODUCTION_DEPLOYMENT_REPORT.md',
      'QA_PROGRESSIVE_STATUS.md',
      'STATUS.md',
      'STRATEGIC_RESTRUCTURE.md',
      'STRATEGIC_WORKFLOW_MASTER.md',
      'SYSTEMATIC_ARCHITECTURE_EXECUTION.md',
      'WORKFLOW_INTEGRADO.md',
      'WORKFLOW_OPTIMIZATION.md'
    ];

    // Configs para organizar em /config
    this.plan.configs = [
      'cleanup_safety_plan.json',
      'DESIGN_SYSTEM_MIGRATION_REPORT.json',
      'components.json',
      '.env.example',
      '.eslintrc.json',
      '.prettierrc.json',
      '.npmrc',
      'eslint.config.js',
      'postcss.config.cjs',
      'tailwind.config.js'
    ];

    // Pastas técnicas para avaliar
    this.plan.technical = [
      '.venv/',
      'intelligence/',
      'mcp/',
      'patches/'
    ];

    // Manter na raiz (essenciais)
    this.plan.keep = [
      'package.json',
      'package-lock.json',
      'next.config.mjs',
      'tsconfig.json',
      'tsconfig.tsbuildinfo',
      'README.md',
      '.env',
      '.env.local',
      '.env.turbo',
      '.gitignore',
      '.git/',
      '.github/',
      '.next/',
      '.swc/',
      '.vscode/',
      'node_modules/',
      'src/',
      'public/',
      'scripts/',
      'docs/'
    ];

    return this.generatePlan();
  }

  private generatePlan() {
    console.log('📊 PLANO DE ORGANIZAÇÃO DA RAIZ:\n');
    
    console.log(`📚 DOCUMENTAÇÃO → /docs/archive/ (${this.plan.docs.length} arquivos):`);
    this.plan.docs.forEach(doc => console.log(`   📄 ${doc}`));
    
    console.log(`\n⚙️  CONFIGURAÇÕES → /config/ (${this.plan.configs.length} arquivos):`);
    this.plan.configs.forEach(config => console.log(`   🔧 ${config}`));
    
    console.log(`\n🔧 PASTAS TÉCNICAS A AVALIAR (${this.plan.technical.length}):`);
    this.plan.technical.forEach(tech => console.log(`   📁 ${tech}`));
    
    console.log(`\n✅ MANTER NA RAIZ (${this.plan.keep.length} essenciais):`);
    this.plan.keep.slice(0, 10).forEach(keep => console.log(`   📌 ${keep}`));
    console.log(`   ... e mais ${this.plan.keep.length - 10} arquivos essenciais`);

    const currentCount = 78;
    const afterCount = this.plan.keep.length;
    const reduction = ((currentCount - afterCount) / currentCount * 100).toFixed(1);

    console.log(`\n📈 IMPACTO:`);
    console.log(`   • Antes: ${currentCount} itens na raiz`);
    console.log(`   • Depois: ${afterCount} itens na raiz`);
    console.log(`   • Redução: ${reduction}% (${currentCount - afterCount} itens organizados)`);

    return this.plan;
  }

  async executeCleanup(dryRun = true) {
    const plan = await this.analyzeRoot();
    
    if (dryRun) {
      console.log('\n🔍 MODO DRY-RUN - Nenhum arquivo será movido');
      console.log('💡 Execute com --execute para aplicar mudanças\n');
      return plan;
    }

    console.log('\n⚡ EXECUTANDO ORGANIZAÇÃO DA RAIZ...\n');

    // Criar diretórios de destino
    const targetDirs = [
      'docs/archive',
      'config'
    ];

    for (const dir of targetDirs) {
      await fs.mkdir(path.join(ROOT_DIR, dir), { recursive: true });
      console.log(`📁 Criado: ${dir}/`);
    }

    // Mover documentação
    console.log('\n📚 Movendo documentação...');
    for (const doc of plan.docs) {
      const source = path.join(ROOT_DIR, doc);
      const target = path.join(ROOT_DIR, 'docs/archive', doc);
      
      try {
        await fs.rename(source, target);
        console.log(`✅ ${doc} → docs/archive/`);
      } catch (error) {
        console.log(`❌ Erro ao mover ${doc}: ${error}`);
      }
    }

    // Mover configurações
    console.log('\n⚙️  Movendo configurações...');
    for (const config of plan.configs) {
      const source = path.join(ROOT_DIR, config);
      const target = path.join(ROOT_DIR, 'config', config);
      
      try {
        await fs.rename(source, target);
        console.log(`✅ ${config} → config/`);
      } catch (error) {
        console.log(`❌ Erro ao mover ${config}: ${error}`);
      }
    }

    // Avaliar pastas técnicas
    console.log('\n🔧 Avaliando pastas técnicas...');
    for (const tech of plan.technical) {
      console.log(`⚠️  ${tech} - REQUER ANÁLISE MANUAL`);
    }

    // Criar arquivo de índice na raiz
    const indexContent = `# ARCO Project - Estrutura Organizada

## 📁 Estrutura da Raiz (Após Limpeza)

### Essenciais de Projeto:
- \`package.json\` - Dependências e scripts
- \`next.config.mjs\` - Configuração Next.js
- \`tsconfig.json\` - Configuração TypeScript
- \`README.md\` - Documentação principal

### Código e Assets:
- \`src/\` - Código fonte
- \`public/\` - Assets públicos
- \`scripts/\` - Scripts de automação

### Documentação:
- \`docs/\` - Documentação técnica
- \`docs/archive/\` - Documentos migrados da raiz

### Configurações:
- \`config/\` - Arquivos de configuração
- \`.env*\` - Variáveis de ambiente

### Build e Tools:
- \`node_modules/\` - Dependências
- \`.next/\` - Build Next.js
- \`.git/\` - Controle de versão

## 🎯 Resultado: Raiz limpa e organizada!
`;

    await fs.writeFile(path.join(ROOT_DIR, 'ESTRUTURA_ORGANIZADA.md'), indexContent);
    console.log('📋 Criado: ESTRUTURA_ORGANIZADA.md');

    console.log('\n✅ ORGANIZAÇÃO DA RAIZ CONCLUÍDA!');
    console.log(`📈 Raiz reduzida de 78 para ~${plan.keep.length} itens essenciais`);

    return plan;
  }
}

// Executar organização
const organizer = new RootOrganizer();
const isExecute = process.argv.includes('--execute');

organizer.executeCleanup(!isExecute)
  .then(result => {
    if (!isExecute) {
      console.log('🎯 PRÓXIMOS PASSOS:');
      console.log('1. Revisar plano de organização');
      console.log('2. Executar: npx tsx scripts/root-organizer.ts --execute');
      console.log('3. Verificar se builds ainda funcionam');
      console.log('4. Atualizar paths em scripts se necessário');
    }
  })
  .catch(console.error);
