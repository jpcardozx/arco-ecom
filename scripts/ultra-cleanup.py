#!/usr/bin/env python3
"""
ARCO ULTRA CLEANUP - Limpeza BRUTAL da raiz e SRC
Remove TUDO desnecessário e cria arquitetura PERFEITA
"""

import os
import shutil
from pathlib import Path
import json

class ARCOUltraCleanup:
    """Limpeza ULTRA agressiva - raiz e src"""
    
    def __init__(self, project_root: str):
        self.project_root = Path(project_root)
        self.src_path = self.project_root / "src"
        
        # ARQUIVOS LIXO NA RAIZ (para deletar)
        self.root_junk_files = [
            'agents.md', 'ARCHITECTURE_CONSOLIDATION_REPORT.json', 'arco_analysis_results.json',
            'build-output.txt', 'CORRECOES_APLICADAS.md', 'delete_jest_config.js',
            'DOCUMENTACAO_TECNICA_AVANCADA.md', 'IMPLEMENTATION_STATUS.md', 'jest.config.cjs',
            'jest.config.js', 'jest.setup.js', 'lighthouse-report.json',
            'PLANO_IMPLEMENTACAO_EXECUTAVEL.md', 'PRODUCTION_DEPLOYMENT_REPORT.md',
            'progress_tracking.md', 'PROJECT_STRUCTURE.md', 'QA_PROGRESSIVE_STATUS.md',
            'RADICAL_CLEANUP_REPORT.json', 'STRATEGIC_WORKFLOW_MASTER.md',
            'SYSTEMATIC_ARCHITECTURE_EXECUTION.md', 'tailwind.config.professional.js',
            'turbo.json', 'WORKFLOW_INTEGRADO.md', '.eslintrc.js'
        ]
        
        # DIRETÓRIOS LIXO NA RAIZ
        self.root_junk_dirs = [
            'backups', 'docs', 'maintenance', 'packages', '.storybook', '.venv'
        ]
        
        # SRC - DIRETÓRIOS DESNECESSÁRIOS
        self.src_junk_dirs = [
            'examples', 'stories', 'modules', 'pages', 'tokens', 'business'
        ]
        
        # SRC - ESTRUTURA FINAL LIMPA
        self.final_src_structure = {
            'app': 'Next.js app directory',
            'components': 'All components (4 dirs only)',
            'design-system': 'Unified design system',
            'lib': 'Utilities and helpers',
            'types': 'TypeScript types',
            'styles': 'Global styles'
        }
    
    def execute_ultra_cleanup(self):
        """Execução da limpeza ULTRA"""
        print("🔥 ARCO ULTRA CLEANUP - LIMPEZA BRUTAL")
        print("=" * 60)
        
        results = {
            'root_files_deleted': 0,
            'root_dirs_deleted': 0,
            'src_dirs_deleted': 0,
            'total_cleanup': 0
        }
        
        # 1. LIMPA RAIZ - ARQUIVOS
        print("🗑️ Deletando arquivos lixo da raiz...")
        results['root_files_deleted'] = self._clean_root_files()
        
        # 2. LIMPA RAIZ - DIRETÓRIOS
        print("🗑️ Deletando diretórios lixo da raiz...")
        results['root_dirs_deleted'] = self._clean_root_directories()
        
        # 3. LIMPA SRC
        print("🧹 Limpando estrutura SRC...")
        results['src_dirs_deleted'] = self._clean_src_structure()
        
        # 4. REORGANIZA SRC FINAL
        print("🏗️ Criando estrutura SRC perfeita...")
        self._create_perfect_src_structure()
        
        # 5. CALCULA TOTAL
        results['total_cleanup'] = (
            results['root_files_deleted'] + 
            results['root_dirs_deleted'] + 
            results['src_dirs_deleted']
        )
        
        # 6. RELATÓRIO
        self._save_ultra_report(results)
        
        print(f"\n🎉 ULTRA CLEANUP COMPLETO!")
        print(f"🗑️ Total removido: {results['total_cleanup']} itens")
        print(f"📁 Raiz: -{results['root_files_deleted']} arquivos, -{results['root_dirs_deleted']} dirs")
        print(f"📂 SRC: -{results['src_dirs_deleted']} diretórios desnecessários")
        
        return results
    
    def _clean_root_files(self):
        """Remove arquivos lixo da raiz"""
        deleted = 0
        
        for file_name in self.root_junk_files:
            file_path = self.project_root / file_name
            if file_path.exists() and file_path.is_file():
                try:
                    file_path.unlink()
                    print(f"   ✅ Deletado: {file_name}")
                    deleted += 1
                except Exception as e:
                    print(f"   ❌ Erro: {file_name} - {e}")
        
        return deleted
    
    def _clean_root_directories(self):
        """Remove diretórios lixo da raiz"""
        deleted = 0
        
        for dir_name in self.root_junk_dirs:
            dir_path = self.project_root / dir_name
            if dir_path.exists() and dir_path.is_dir():
                try:
                    shutil.rmtree(dir_path)
                    print(f"   ✅ Deletado: {dir_name}/")
                    deleted += 1
                except Exception as e:
                    print(f"   ❌ Erro: {dir_name}/ - {e}")
        
        return deleted
    
    def _clean_src_structure(self):
        """Limpa estrutura SRC"""
        deleted = 0
        
        for dir_name in self.src_junk_dirs:
            dir_path = self.src_path / dir_name
            if dir_path.exists() and dir_path.is_dir():
                try:
                    shutil.rmtree(dir_path)
                    print(f"   ✅ SRC: Deletado {dir_name}/")
                    deleted += 1
                except Exception as e:
                    print(f"   ❌ SRC: Erro {dir_name}/ - {e}")
        
        # Remove arquivos soltos no SRC
        for item in self.src_path.iterdir():
            if item.is_file() and item.name not in ['middleware.ts']:
                try:
                    item.unlink()
                    print(f"   ✅ SRC: Deletado arquivo {item.name}")
                    deleted += 1
                except Exception as e:
                    print(f"   ❌ SRC: Erro arquivo {item.name} - {e}")
        
        return deleted
    
    def _create_perfect_src_structure(self):
        """Cria estrutura SRC perfeita"""
        
        # Garante que diretórios essenciais existem
        essential_dirs = ['app', 'components', 'design-system', 'lib', 'types', 'styles']
        
        for dir_name in essential_dirs:
            dir_path = self.src_path / dir_name
            dir_path.mkdir(exist_ok=True)
        
        # Limpa components se ainda tiver mais que 4 dirs
        components_path = self.src_path / "components"
        if components_path.exists():
            current_dirs = [d for d in components_path.iterdir() if d.is_dir()]
            allowed_dirs = {'ui', 'business', 'layout', 'forms'}
            
            for dir_item in current_dirs:
                if dir_item.name not in allowed_dirs:
                    try:
                        shutil.rmtree(dir_item)
                        print(f"   ✅ COMPONENTS: Deletado {dir_item.name}/")
                    except Exception as e:
                        print(f"   ❌ COMPONENTS: Erro {dir_item.name}/ - {e}")
        
        # Cria README.md limpo na raiz
        clean_readme = '''# ARCO

Modern React application with clean architecture.

## Structure

```
src/
├── app/            # Next.js app directory
├── components/     # UI components (4 categories)
├── design-system/  # Design system
├── lib/           # Utilities
├── types/         # TypeScript types
└── styles/        # Global styles
```

## Development

```bash
npm run dev
npm run build
npm run test
```
'''
        
        readme_path = self.project_root / "README.md"
        readme_path.write_text(clean_readme, encoding='utf-8')
        
        # Cria SRC index limpo
        src_index = '''/**
 * ARCO - Clean Architecture
 * Main exports from src
 */

// Components
export * from './components';

// Design System
export * from './design-system';

// Types
export * from './types';

// Utilities
export * from './lib';
'''
        
        src_index_path = self.src_path / "index.ts"
        src_index_path.write_text(src_index, encoding='utf-8')
    
    def _save_ultra_report(self, results):
        """Salva relatório da limpeza ultra"""
        report = {
            'timestamp': '2025-07-18',
            'operation': 'ULTRA_CLEANUP',
            'status': 'COMPLETED',
            'cleanup_stats': {
                'root_files_deleted': results['root_files_deleted'],
                'root_dirs_deleted': results['root_dirs_deleted'],
                'src_dirs_deleted': results['src_dirs_deleted'],
                'total_items_removed': results['total_cleanup']
            },
            'final_structure': {
                'root': 'Clean (essential files only)',
                'src': list(self.final_src_structure.keys()),
                'components': ['ui', 'business', 'layout', 'forms']
            },
            'improvements': [
                f"Removeu {results['root_files_deleted']} arquivos lixo da raiz",
                f"Deletou {results['root_dirs_deleted']} diretórios desnecessários",
                f"Limpou {results['src_dirs_deleted']} diretórios no SRC",
                "Criou estrutura limpa e profissional",
                "README.md atualizado",
                "Exports organizados"
            ]
        }
        
        report_file = self.project_root / "ULTRA_CLEANUP_REPORT.json"
        with open(report_file, 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    # EXECUÇÃO DA LIMPEZA ULTRA
    project_root = "c:/Users/João Pedro Cardozo/projetos/arco"
    cleaner = ARCOUltraCleanup(project_root)
    
    cleaner.execute_ultra_cleanup()
    
    print(f"\n🔥 ARCO AGORA É PROFISSIONAL!")
    print(f"📐 Raiz limpa, SRC organizado, zero lixo")
