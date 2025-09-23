#!/usr/bin/env python3
"""
ARCO Component Usage Analyzer & Legacy Value Extractor
Identifica componentes utilizados vs não utilizados e seleciona 10-25% para refatoração crítica
"""

import os
import re
import json
import ast
from pathlib import Path
from typing import Dict, List, Set, Tuple
from dataclasses import dataclass, asdict
from collections import defaultdict

@dataclass
class ComponentInfo:
    """Informações de um componente"""
    path: str
    name: str
    size_lines: int
    complexity_score: int
    business_value: str  # 'critical', 'valuable', 'redundant'
    usage_count: int
    imported_by: List[str]
    imports: List[str]
    last_modified: str
    refactor_potential: float  # 0-1 score

class ARCOComponentAnalyzer:
    """Analisador de uso e valor de componentes ARCO"""
    
    def __init__(self, project_root: str):
        self.project_root = Path(project_root)
        self.src_path = self.project_root / "src"
        self.components_path = self.src_path / "components"
        self.app_path = self.src_path / "app"
        
        # Padrões de análise
        self.import_patterns = [
            r"import\s+.*\s+from\s+['\"]([^'\"]+)['\"]",
            r"import\s+['\"]([^'\"]+)['\"]",
        ]
        
        # Componentes críticos (sempre manter)
        self.critical_components = {
            'hero', 'cta', 'button', 'navigation', 'header', 'footer',
            'homepage', 'layout', 'form', 'input', 'card'
        }
        
        # Dados de análise
        self.all_components: Dict[str, ComponentInfo] = {}
        self.usage_map: Dict[str, Set[str]] = defaultdict(set)
        self.dependency_graph: Dict[str, Set[str]] = defaultdict(set)
        
    def analyze_component_usage(self) -> Dict:
        """Executa análise completa de uso de componentes"""
        print("🔍 Iniciando análise de uso de componentes...")
        
        # 1. Descobrir todos os componentes
        self._discover_all_components()
        
        # 2. Analisar imports e dependências
        self._analyze_imports_and_dependencies()
        
        # 3. Categorizar por valor de negócio
        self._categorize_by_business_value()
        
        # 4. Calcular scores de refatoração
        self._calculate_refactor_scores()
        
        # 5. Gerar relatório
        return self._generate_usage_report()
    
    def _discover_all_components(self):
        """Descobre todos os componentes TSX no projeto"""
        print("📁 Descobrindo componentes TSX...")
        
        tsx_files = list(self.src_path.rglob("*.tsx"))
        
        for file_path in tsx_files:
            if self._is_component_file(file_path):
                component_info = self._extract_component_info(file_path)
                self.all_components[component_info.name] = component_info
        
        print(f"✅ Descobertos {len(self.all_components)} componentes")
    
    def _is_component_file(self, file_path: Path) -> bool:
        """Verifica se arquivo é um componente React"""
        # Ignora arquivos de teste, páginas, e utilitários
        ignore_patterns = [
            'test', 'spec', '__tests__', 'page.tsx', 'layout.tsx',
            'loading.tsx', 'error.tsx', 'not-found.tsx'
        ]
        
        file_name = file_path.name.lower()
        
        # Ignora se contém padrões de exclusão
        if any(pattern in file_name for pattern in ignore_patterns):
            return False
        
        # Deve começar com maiúscula (convenção React)
        component_name = file_path.stem
        return component_name[0].isupper() if component_name else False
    
    def _extract_component_info(self, file_path: Path) -> ComponentInfo:
        """Extrai informações de um componente"""
        content = file_path.read_text(encoding='utf-8', errors='ignore')
        
        # Calcula métricas básicas
        lines = content.split('\n')
        size_lines = len([line for line in lines if line.strip()])
        
        # Score de complexidade básico
        complexity_score = self._calculate_complexity(content)
        
        # Extrai imports
        imports = self._extract_imports(content)
        
        # Stats do arquivo
        stat = file_path.stat()
        last_modified = stat.st_mtime
        
        return ComponentInfo(
            path=str(file_path.relative_to(self.project_root)),
            name=file_path.stem,
            size_lines=size_lines,
            complexity_score=complexity_score,
            business_value='unknown',
            usage_count=0,
            imported_by=[],
            imports=imports,
            last_modified=str(last_modified),
            refactor_potential=0.0
        )
    
    def _calculate_complexity(self, content: str) -> int:
        """Calcula score de complexidade do componente"""
        complexity = 0
        
        # Contadores de complexidade
        patterns = {
            r'useState|useEffect|useCallback|useMemo': 2,  # Hooks
            r'interface|type': 1,  # TypeScript
            r'className=': 1,  # Styling
            r'onClick|onChange|onSubmit': 1,  # Eventos
            r'motion\.|AnimatePresence': 3,  # Animações complexas
            r'import.*framer-motion': 3,  # Biblioteca de animação
            r'useQuery|useMutation': 2,  # Data fetching
        }
        
        for pattern, weight in patterns.items():
            matches = len(re.findall(pattern, content, re.IGNORECASE))
            complexity += matches * weight
        
        return complexity
    
    def _extract_imports(self, content: str) -> List[str]:
        """Extrai imports de componentes do arquivo"""
        imports = []
        
        for pattern in self.import_patterns:
            matches = re.findall(pattern, content, re.MULTILINE)
            for match in matches:
                # Filtra apenas imports locais de componentes
                if (match.startswith('./') or match.startswith('../') or 
                    match.startswith('@/components')):
                    imports.append(match)
        
        return imports
    
    def _analyze_imports_and_dependencies(self):
        """Analisa imports e constrói grafo de dependências"""
        print("🔗 Analisando dependências...")
        
        # Analisa todos os arquivos TSX para encontrar imports
        all_tsx_files = list(self.src_path.rglob("*.tsx"))
        
        for file_path in all_tsx_files:
            try:
                content = file_path.read_text(encoding='utf-8', errors='ignore')
                imports = self._extract_imports(content)
                
                for import_path in imports:
                    imported_component = self._resolve_import_to_component(import_path, file_path)
                    if imported_component and imported_component in self.all_components:
                        # Incrementa contador de uso
                        self.all_components[imported_component].usage_count += 1
                        
                        # Adiciona ao mapa de uso
                        self.usage_map[imported_component].add(str(file_path.relative_to(self.project_root)))
                        
                        # Constrói grafo de dependências
                        if file_path.stem in self.all_components:
                            self.dependency_graph[file_path.stem].add(imported_component)
            
            except Exception as e:
                print(f"⚠️ Erro ao analisar {file_path}: {e}")
                continue
        
        # Atualiza lista de "imported_by"
        for component_name, component_info in self.all_components.items():
            component_info.imported_by = list(self.usage_map[component_name])
    
    def _resolve_import_to_component(self, import_path: str, from_file: Path) -> str:
        """Resolve caminho de import para nome do componente"""
        try:
            # Remove prefixos e resolve caminho
            if import_path.startswith('@/components'):
                import_path = import_path.replace('@/components', 'src/components')
            
            # Resolve caminhos relativos
            if import_path.startswith('./') or import_path.startswith('../'):
                resolved_path = (from_file.parent / import_path).resolve()
            else:
                resolved_path = self.project_root / import_path
            
            # Adiciona extensão se necessário
            if not resolved_path.suffix:
                if (resolved_path.with_suffix('.tsx')).exists():
                    resolved_path = resolved_path.with_suffix('.tsx')
                elif (resolved_path.with_suffix('.ts')).exists():
                    resolved_path = resolved_path.with_suffix('.ts')
            
            if resolved_path.exists():
                return resolved_path.stem
            
            return None
        
        except Exception:
            return None
    
    def _categorize_by_business_value(self):
        """Categoriza componentes por valor de negócio"""
        print("💼 Categorizando por valor de negócio...")
        
        for component_name, component_info in self.all_components.items():
            # Componentes críticos
            if any(critical in component_name.lower() for critical in self.critical_components):
                component_info.business_value = 'critical'
            
            # Componentes com alto uso
            elif component_info.usage_count >= 3:
                component_info.business_value = 'critical'
            
            # Componentes com algum uso
            elif component_info.usage_count > 0:
                component_info.business_value = 'valuable'
            
            # Componentes sem uso
            else:
                component_info.business_value = 'redundant'
    
    def _calculate_refactor_scores(self):
        """Calcula scores de potencial de refatoração"""
        print("📊 Calculando scores de refatoração...")
        
        for component_name, component_info in self.all_components.items():
            if component_info.business_value == 'redundant':
                score = 0.0
                
                # Componentes complexos têm maior potencial
                if component_info.complexity_score > 10:
                    score += 0.4
                elif component_info.complexity_score > 5:
                    score += 0.2
                
                # Componentes grandes têm maior potencial
                if component_info.size_lines > 100:
                    score += 0.3
                elif component_info.size_lines > 50:
                    score += 0.1
                
                # Componentes com dependências únicas
                if len(component_info.imports) > 3:
                    score += 0.2
                
                # Componentes de UI sofisticados
                if any(pattern in component_info.path.lower() for pattern in 
                      ['design-system', 'ui', 'visual', 'animation']):
                    score += 0.3
                
                component_info.refactor_potential = min(1.0, score)
    
    def _generate_usage_report(self) -> Dict:
        """Gera relatório completo de uso"""
        print("📋 Gerando relatório de uso...")
        
        # Estatísticas gerais
        total_components = len(self.all_components)
        used_components = len([c for c in self.all_components.values() if c.usage_count > 0])
        unused_components = total_components - used_components
        
        # Componentes por categoria
        critical = [c for c in self.all_components.values() if c.business_value == 'critical']
        valuable = [c for c in self.all_components.values() if c.business_value == 'valuable']
        redundant = [c for c in self.all_components.values() if c.business_value == 'redundant']
        
        # Candidatos para refatoração (10-25%)
        refactor_candidates = sorted(
            [c for c in redundant if c.refactor_potential > 0.3],
            key=lambda x: x.refactor_potential,
            reverse=True
        )
        
        # Limita a 25% dos não utilizados
        max_candidates = min(len(refactor_candidates), int(unused_components * 0.25))
        top_candidates = refactor_candidates[:max_candidates]
        
        report = {
            'timestamp': '2025-01-18',
            'project_name': 'ARCO',
            'analysis_summary': {
                'total_components': total_components,
                'used_components': used_components,
                'unused_components': unused_components,
                'usage_percentage': round((used_components / total_components) * 100, 1),
                'refactor_candidates_count': len(top_candidates),
                'refactor_percentage': round((len(top_candidates) / unused_components) * 100, 1) if unused_components > 0 else 0
            },
            'categories': {
                'critical': {
                    'count': len(critical),
                    'components': [asdict(c) for c in critical[:10]]  # Top 10
                },
                'valuable': {
                    'count': len(valuable),
                    'components': [asdict(c) for c in valuable[:10]]  # Top 10
                },
                'redundant': {
                    'count': len(redundant),
                    'components': [asdict(c) for c in redundant[:10]]  # Top 10
                }
            },
            'refactor_candidates': {
                'strategy': '10-25% dos componentes não utilizados com maior potencial',
                'selection_criteria': [
                    'Alta complexidade técnica (>10 score)',
                    'Tamanho significativo (>50 linhas)',
                    'Dependências únicas interessantes',
                    'Padrões de UI/UX sofisticados'
                ],
                'top_candidates': [asdict(c) for c in top_candidates]
            },
            'dependency_insights': {
                'most_imported': self._get_most_imported_components(),
                'orphaned_components': self._get_orphaned_components(),
                'circular_dependencies': self._detect_circular_dependencies()
            }
        }
        
        return report
    
    def _get_most_imported_components(self) -> List[Dict]:
        """Componentes mais importados"""
        sorted_components = sorted(
            self.all_components.values(),
            key=lambda x: x.usage_count,
            reverse=True
        )
        
        return [
            {
                'name': c.name,
                'usage_count': c.usage_count,
                'path': c.path
            }
            for c in sorted_components[:10]
        ]
    
    def _get_orphaned_components(self) -> List[str]:
        """Componentes órfãos (sem uso)"""
        return [
            c.name for c in self.all_components.values() 
            if c.usage_count == 0
        ]
    
    def _detect_circular_dependencies(self) -> List[str]:
        """Detecta dependências circulares"""
        # Implementação básica de detecção
        # TODO: Implementar algoritmo mais sofisticado se necessário
        return []
    
    def select_for_refactoring(self, percentage: int = 20) -> Dict:
        """Seleciona componentes para refatoração baseado na %"""
        print(f"🎯 Selecionando {percentage}% dos componentes não utilizados para refatoração...")
        
        # Executa análise se ainda não foi feita
        if not self.all_components:
            self.analyze_component_usage()
        
        # Filtra componentes não utilizados
        unused_components = [
            c for c in self.all_components.values() 
            if c.usage_count == 0 and c.business_value == 'redundant'
        ]
        
        # Ordena por potencial de refatoração
        candidates = sorted(
            unused_components,
            key=lambda x: x.refactor_potential,
            reverse=True
        )
        
        # Seleciona % especificada
        target_count = max(1, int(len(unused_components) * (percentage / 100)))
        selected = candidates[:target_count]
        
        selection_report = {
            'selection_criteria': {
                'target_percentage': percentage,
                'unused_components_total': len(unused_components),
                'selected_count': len(selected),
                'actual_percentage': round((len(selected) / len(unused_components)) * 100, 1) if unused_components else 0
            },
            'selected_components': [asdict(c) for c in selected],
            'refactoring_strategy': {
                'high_priority': [c.name for c in selected if c.refactor_potential > 0.7],
                'medium_priority': [c.name for c in selected if 0.4 <= c.refactor_potential <= 0.7],
                'low_priority': [c.name for c in selected if c.refactor_potential < 0.4]
            },
            'estimated_effort': {
                'total_lines': sum(c.size_lines for c in selected),
                'avg_complexity': sum(c.complexity_score for c in selected) / len(selected) if selected else 0,
                'estimated_days': round(sum(c.size_lines for c in selected) / 200, 1)  # ~200 linhas/dia
            }
        }
        
        return selection_report
    
    def generate_refactor_plan(self) -> str:
        """Gera plano detalhado de refatoração"""
        print("📝 Gerando plano de refatoração...")
        
        selection = self.select_for_refactoring(20)
        
        plan = f"""# ARCO Component Refactoring Plan
## Executive Summary
- **Total Unused Components**: {selection['selection_criteria']['unused_components_total']}
- **Selected for Refactoring**: {selection['selection_criteria']['selected_count']} ({selection['selection_criteria']['actual_percentage']}%)
- **Estimated Effort**: {selection['estimated_effort']['estimated_days']} days
- **Focus**: Maximize reuse of valuable legacy work

## Refactoring Priorities

### High Priority (Refactor First)
"""
        
        high_priority = selection['refactoring_strategy']['high_priority']
        for component_name in high_priority:
            component = self.all_components[component_name]
            plan += f"""
#### {component_name}
- **Path**: `{component.path}`
- **Complexity**: {component.complexity_score}/100
- **Size**: {component.size_lines} lines
- **Refactor Potential**: {component.refactor_potential:.1%}
- **Strategy**: Extract reusable patterns, create library components
"""
        
        plan += """
### Medium Priority (Refactor Second)
"""
        
        medium_priority = selection['refactoring_strategy']['medium_priority']
        for component_name in medium_priority:
            component = self.all_components[component_name]
            plan += f"""
#### {component_name}
- **Path**: `{component.path}`
- **Size**: {component.size_lines} lines
- **Strategy**: Simplify and extract common patterns
"""
        
        plan += """
## Value Extraction Strategy
1. **Pattern Libraries**: Convert complex UI components to reusable patterns
2. **Design Tokens**: Extract color schemes, typography, spacing
3. **Business Logic**: Preserve unique business logic in utility functions
4. **Animation Patterns**: Create animation library from motion components

## Success Metrics
- Preserve 80%+ of valuable patterns
- Reduce component count by 15-20%
- Improve maintainability score
- Create 5-10 new reusable library components
"""
        
        return plan
    
    def save_results(self, output_dir: str = None):
        """Salva todos os resultados da análise"""
        if output_dir is None:
            output_dir = self.project_root / "scripts" / "analysis-results"
        
        output_path = Path(output_dir)
        output_path.mkdir(exist_ok=True)
        
        # Salva relatório de uso
        usage_report = self.analyze_component_usage()
        with open(output_path / "usage-report.json", 'w', encoding='utf-8') as f:
            json.dump(usage_report, f, indent=2, ensure_ascii=False)
        
        # Salva seleção para refatoração
        refactor_selection = self.select_for_refactoring(20)
        with open(output_path / "refactor-candidates.json", 'w', encoding='utf-8') as f:
            json.dump(refactor_selection, f, indent=2, ensure_ascii=False)
        
        # Salva plano de refatoração
        refactor_plan = self.generate_refactor_plan()
        with open(output_path / "refactor-plan.md", 'w', encoding='utf-8') as f:
            f.write(refactor_plan)
        
        print(f"✅ Resultados salvos em: {output_path}")
        return output_path

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description='ARCO Component Usage Analyzer')
    parser.add_argument('--analyze-usage', action='store_true', help='Analisa uso de componentes')
    parser.add_argument('--select-for-refactor', action='store_true', help='Seleciona componentes para refatoração')
    parser.add_argument('--generate-refactor-plan', action='store_true', help='Gera plano de refatoração')
    parser.add_argument('--percentage', type=int, default=20, help='Percentual para refatoração (10-25)')
    parser.add_argument('--save-all', action='store_true', help='Salva todos os resultados')
    
    args = parser.parse_args()
    
    project_root = "c:/Users/João Pedro Cardozo/projetos/arco"
    analyzer = ARCOComponentAnalyzer(project_root)
    
    if args.analyze_usage or args.save_all:
        report = analyzer.analyze_component_usage()
        print(f"\n📊 ANÁLISE COMPLETA:")
        print(f"   Total: {report['analysis_summary']['total_components']} componentes")
        print(f"   Utilizados: {report['analysis_summary']['used_components']} ({report['analysis_summary']['usage_percentage']}%)")
        print(f"   Não utilizados: {report['analysis_summary']['unused_components']}")
        print(f"   Candidatos à refatoração: {report['analysis_summary']['refactor_candidates_count']}")
    
    if args.select_for_refactor or args.save_all:
        selection = analyzer.select_for_refactoring(args.percentage)
        print(f"\n🎯 SELEÇÃO PARA REFATORAÇÃO:")
        print(f"   Selecionados: {selection['selection_criteria']['selected_count']} componentes")
        print(f"   Percentual: {selection['selection_criteria']['actual_percentage']}%")
        print(f"   Esforço estimado: {selection['estimated_effort']['estimated_days']} dias")
    
    if args.generate_refactor_plan or args.save_all:
        plan = analyzer.generate_refactor_plan()
        print(f"\n📝 PLANO DE REFATORAÇÃO GERADO")
    
    if args.save_all:
        output_path = analyzer.save_results()
        print(f"\n💾 Todos os resultados salvos em: {output_path}")
