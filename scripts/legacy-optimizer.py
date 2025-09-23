#!/usr/bin/env python3
"""
ARCO Legacy Value Extraction & Component Optimization Engine
Sistema maduro de análise e refatoração de componentes TSX com foco em máximo ROI
"""

import os
import re
import json
import shutil
from pathlib import Path
from typing import Dict, List, Set, Tuple, Optional
from dataclasses import dataclass, asdict
from collections import defaultdict
import ast

@dataclass
class ComponentAnalysis:
    """Análise detalhada de componente com valor de negócio"""
    name: str
    path: str
    size_lines: int
    complexity_score: int
    business_value: str  # 'mission_critical', 'high_value', 'legacy_valuable', 'redundant'
    usage_count: int
    refactor_priority: float  # 0-1 score
    extraction_value: float  # 0-1 valor de extração de padrões
    legacy_patterns: List[str]  # Padrões únicos detectados
    business_logic_score: float  # Score de lógica de negócio única
    ui_complexity_score: float  # Score de complexidade de UI
    reusability_potential: float  # Potencial de reutilização

class ARCOLegacyOptimizer:
    """Otimizador maduro de componentes ARCO com foco em preservação de valor"""
    
    def __init__(self, project_root: str):
        self.project_root = Path(project_root)
        self.src_path = self.project_root / "src"
        self.components_path = self.src_path / "components"
        
        # Configurações de análise madura
        self.analysis_config = {
            'min_refactor_percentage': 10,
            'max_refactor_percentage': 25,
            'min_legacy_value_threshold': 0.6,
            'complexity_weight': 0.3,
            'business_logic_weight': 0.4,
            'ui_pattern_weight': 0.3
        }
        
        # Padrões valiosos para preservar
        self.valuable_patterns = {
            'animations': [
                r'framer-motion', r'animate-', r'motion\.', r'AnimatePresence',
                r'transition', r'variants', r'whileHover', r'whileTap'
            ],
            'business_logic': [
                r'calculate', r'validate', r'process', r'transform',
                r'analytics', r'tracking', r'conversion', r'optimization'
            ],
            'advanced_ui': [
                r'gradient', r'glassmorphism', r'backdrop-blur', r'shadow-',
                r'three\.js', r'threejs', r'3d', r'canvas', r'webgl'
            ],
            'integrations': [
                r'api', r'webhook', r'integration', r'mcp', r'external',
                r'third-party', r'service', r'client'
            ],
            'accessibility': [
                r'aria-', r'role=', r'tabindex', r'screen-reader',
                r'keyboard', r'focus', r'semantic'
            ]
        }
        
        # Base de conhecimento ARCO
        self.arco_knowledge = self._load_arco_patterns()
        
        # Resultados da análise
        self.components: Dict[str, ComponentAnalysis] = {}
        self.usage_graph: Dict[str, Set[str]] = defaultdict(set)
        self.pattern_library: Dict[str, List[str]] = defaultdict(list)
    
    def _load_arco_patterns(self) -> Dict:
        """Carrega padrões específicos do ARCO baseados na documentação"""
        return {
            'hero_patterns': [
                'EnterpriseHero', 'TechnicalHero', 'ConversionHero',
                'IntelligentHero', 'ArchitectureHero'
            ],
            'business_components': [
                'AssessmentWorkflow', 'IMPACTFramework', 'TechnicalAnalysis',
                'ValueProposition', 'CompetitiveAnalysis'
            ],
            'intelligence_systems': [
                'MCPIntegrator', 'RealTimeMetrics', 'BusinessIntelligence',
                'PerformanceMonitor', 'ConversionTracker'
            ],
            'design_system_core': [
                'ExecutiveButton', 'StrategicBadge', 'ARCOCard',
                'ARCOSection', 'ARCODivider'
            ]
        }
    
    def analyze_comprehensive(self) -> Dict:
        """Executa análise comprehensiva com foco em valor de negócio"""
        print("🚀 ARCO Legacy Value Extraction - Iniciando análise madura...")
        
        # 1. Descoberta e análise de componentes
        self._discover_and_analyze_components()
        
        # 2. Análise de uso e dependências
        self._analyze_usage_patterns()
        
        # 3. Categorização por valor de negócio
        self._categorize_by_business_impact()
        
        # 4. Cálculo de scores de refatoração
        self._calculate_optimization_scores()
        
        # 5. Geração de estratégia
        return self._generate_optimization_strategy()
    
    def _discover_and_analyze_components(self):
        """Descobre e analisa todos os componentes com métricas avançadas"""
        print("🔍 Analisando componentes com métricas avançadas...")
        
        tsx_files = list(self.src_path.rglob("*.tsx"))
        component_files = [f for f in tsx_files if self._is_valid_component(f)]
        
        for file_path in component_files:
            analysis = self._deep_analyze_component(file_path)
            if analysis:
                self.components[analysis.name] = analysis
        
        print(f"✅ Analisados {len(self.components)} componentes com métricas avançadas")
    
    def _is_valid_component(self, file_path: Path) -> bool:
        """Valida se arquivo é um componente React válido"""
        exclude_patterns = [
            'test', 'spec', '__tests__', 'page.tsx', 'layout.tsx',
            'loading.tsx', 'error.tsx', 'not-found.tsx', 'global.tsx'
        ]
        
        file_name = file_path.name.lower()
        if any(pattern in file_name for pattern in exclude_patterns):
            return False
        
        # Componente React deve começar com maiúscula
        return file_path.stem[0].isupper() if file_path.stem else False
    
    def _deep_analyze_component(self, file_path: Path) -> Optional[ComponentAnalysis]:
        """Análise profunda de componente com múltiplas métricas"""
        try:
            content = file_path.read_text(encoding='utf-8', errors='ignore')
            
            # Métricas básicas
            lines = [line for line in content.split('\n') if line.strip()]
            size_lines = len(lines)
            
            # Análise de complexidade
            complexity_score = self._calculate_advanced_complexity(content)
            
            # Análise de padrões valiosos
            legacy_patterns = self._extract_component_patterns(content)
            
            # Scores especializados
            business_logic_score = self._analyze_business_logic(content)
            ui_complexity_score = self._analyze_ui_complexity(content)
            reusability_potential = self._calculate_reusability(content, file_path)
            
            # Valor de extração
            extraction_value = self._calculate_extraction_value(
                complexity_score, legacy_patterns, business_logic_score, ui_complexity_score
            )
            
            return ComponentAnalysis(
                name=file_path.stem,
                path=str(file_path.relative_to(self.project_root)),
                size_lines=size_lines,
                complexity_score=complexity_score,
                business_value='unknown',
                usage_count=0,
                refactor_priority=0.0,
                extraction_value=extraction_value,
                legacy_patterns=legacy_patterns,
                business_logic_score=business_logic_score,
                ui_complexity_score=ui_complexity_score,
                reusability_potential=reusability_potential
            )
            
        except Exception as e:
            print(f"⚠️ Erro ao analisar {file_path}: {e}")
            return None
    
    def _calculate_advanced_complexity(self, content: str) -> int:
        """Calcula complexidade avançada com múltiplos fatores"""
        complexity = 0
        
        # Padrões com pesos específicos
        complexity_patterns = {
            # React/Next.js
            r'useState|useEffect|useCallback|useMemo|useReducer': 3,
            r'useQuery|useMutation|useInfiniteQuery': 4,
            r'useContext|createContext': 2,
            
            # TypeScript
            r'interface\s+\w+|type\s+\w+': 2,
            r'generic<.*>|extends\s+\w+': 3,
            
            # Styling avançado
            r'className=.*\{': 2,
            r'styled\.|emotion|@emotion': 3,
            r'tailwind.*merge|clsx|cn\(': 2,
            
            # Animações
            r'motion\.|framer-motion|AnimatePresence': 4,
            r'@keyframes|animate-|transition': 2,
            
            # Business Logic
            r'calculate|validate|process|transform': 3,
            r'analytics|tracking|conversion': 4,
            
            # Integrations
            r'fetch\(|axios|api\.': 3,
            r'webhook|integration|mcp': 4,
            
            # Advanced UI
            r'three\.js|threejs|canvas|webgl': 5,
            r'intersection.*observer|resize.*observer': 3,
            r'portal|createPortal': 3
        }
        
        for pattern, weight in complexity_patterns.items():
            matches = len(re.findall(pattern, content, re.IGNORECASE))
            complexity += matches * weight
        
        return min(complexity, 200)  # Cap no score
    
    def _extract_component_patterns(self, content: str) -> List[str]:
        """Extrai padrões valiosos do componente"""
        patterns_found = []
        
        for category, pattern_list in self.valuable_patterns.items():
            for pattern in pattern_list:
                if re.search(pattern, content, re.IGNORECASE):
                    patterns_found.append(f"{category}:{pattern}")
        
        # Padrões ARCO específicos
        for category, arco_patterns in self.arco_knowledge.items():
            for pattern in arco_patterns:
                if pattern.lower() in content.lower():
                    patterns_found.append(f"arco_{category}:{pattern}")
        
        return list(set(patterns_found))
    
    def _analyze_business_logic(self, content: str) -> float:
        """Analisa complexidade de lógica de negócio"""
        business_indicators = [
            r'calculate.*(?:cost|price|revenue|profit|savings)',
            r'validate.*(?:input|form|data|business)',
            r'process.*(?:payment|order|lead|conversion)',
            r'optimize.*(?:performance|conversion|cost)',
            r'track.*(?:event|analytics|metrics|funnel)',
            r'assessment|evaluation|analysis|intelligence',
            r'automation|workflow|pipeline|orchestrator'
        ]
        
        score = 0
        for pattern in business_indicators:
            matches = len(re.findall(pattern, content, re.IGNORECASE))
            score += matches * 0.2
        
        return min(score, 1.0)
    
    def _analyze_ui_complexity(self, content: str) -> float:
        """Analisa complexidade de UI e padrões visuais"""
        ui_indicators = [
            r'gradient|glassmorphism|backdrop-blur',
            r'shadow-.*|drop-shadow|filter',
            r'transform|translate|rotate|scale',
            r'animate-|transition-|duration-',
            r'grid-.*|flex-.*|space-',
            r'responsive|breakpoint|md:|lg:|xl:',
            r'hover:|focus:|active:|group-',
            r'three\.js|canvas|svg|path'
        ]
        
        score = 0
        for pattern in ui_indicators:
            matches = len(re.findall(pattern, content, re.IGNORECASE))
            score += matches * 0.1
        
        return min(score, 1.0)
    
    def _calculate_reusability(self, content: str, file_path: Path) -> float:
        """Calcula potencial de reutilização"""
        reusability = 0.0
        
        # Componentes genéricos
        if any(generic in file_path.name.lower() for generic in 
               ['button', 'card', 'input', 'modal', 'dropdown', 'tooltip']):
            reusability += 0.4
        
        # Props interface bem definida
        if re.search(r'interface.*Props.*\{[^}]{50,}\}', content, re.DOTALL):
            reusability += 0.3
        
        # Componentes compostos
        if re.search(r'children|React\.ReactNode|ReactElement', content):
            reusability += 0.2
        
        # Configurabilidade
        config_patterns = [
            r'variant|size|color|theme',
            r'className.*prop|style.*prop',
            r'disabled|loading|error'
        ]
        
        for pattern in config_patterns:
            if re.search(pattern, content, re.IGNORECASE):
                reusability += 0.1
        
        return min(reusability, 1.0)
    
    def _calculate_extraction_value(self, complexity: int, patterns: List[str], 
                                  business_logic: float, ui_complexity: float) -> float:
        """Calcula valor de extração de padrões"""
        config = self.analysis_config
        
        # Normaliza complexidade
        normalized_complexity = min(complexity / 100, 1.0)
        
        # Score de padrões únicos
        pattern_score = min(len(patterns) / 10, 1.0)
        
        # Valor composto
        extraction_value = (
            normalized_complexity * config['complexity_weight'] +
            business_logic * config['business_logic_weight'] +
            ui_complexity * config['ui_pattern_weight'] +
            pattern_score * 0.3
        )
        
        return min(extraction_value, 1.0)
    
    def _analyze_usage_patterns(self):
        """Analisa padrões de uso com análise de imports"""
        print("🔗 Mapeando dependências e uso real...")
        
        # Analisa todos os arquivos para imports
        all_files = list(self.src_path.rglob("*.tsx")) + list(self.src_path.rglob("*.ts"))
        
        for file_path in all_files:
            try:
                content = file_path.read_text(encoding='utf-8', errors='ignore')
                imports = self._extract_all_imports(content)
                
                for import_path in imports:
                    component_name = self._resolve_import_to_component(import_path, file_path)
                    if component_name and component_name in self.components:
                        self.components[component_name].usage_count += 1
                        self.usage_graph[component_name].add(str(file_path.relative_to(self.project_root)))
                        
            except Exception as e:
                continue
        
        print(f"✅ Mapeamento de dependências concluído")
    
    def _extract_all_imports(self, content: str) -> List[str]:
        """Extrai todos os imports do arquivo"""
        import_patterns = [
            r"import\s+.*\s+from\s+['\"]([^'\"]+)['\"]",
            r"import\s+['\"]([^'\"]+)['\"]",
            r"require\(['\"]([^'\"]+)['\"]\)"
        ]
        
        imports = []
        for pattern in import_patterns:
            matches = re.findall(pattern, content, re.MULTILINE)
            for match in matches:
                if (match.startswith('./') or match.startswith('../') or 
                    match.startswith('@/components') or match.startswith('src/')):
                    imports.append(match)
        
        return imports
    
    def _resolve_import_to_component(self, import_path: str, from_file: Path) -> Optional[str]:
        """Resolve import para nome do componente"""
        try:
            # Normaliza path
            if import_path.startswith('@/'):
                import_path = import_path.replace('@/', 'src/')
            
            # Resolve paths relativos
            if import_path.startswith('./') or import_path.startswith('../'):
                resolved_path = (from_file.parent / import_path).resolve()
            else:
                resolved_path = self.project_root / import_path
            
            # Tenta diferentes extensões
            for ext in ['.tsx', '.ts', '/index.tsx', '/index.ts']:
                test_path = resolved_path.with_suffix('') if not ext.startswith('/') else resolved_path
                if ext.startswith('/'):
                    test_path = test_path / ext[1:]
                else:
                    test_path = test_path.with_suffix(ext)
                
                if test_path.exists():
                    return test_path.stem if not test_path.name.startswith('index') else test_path.parent.name
            
            return None
            
        except Exception:
            return None
    
    def _categorize_by_business_impact(self):
        """Categoriza componentes por impacto no negócio"""
        print("💼 Categorizando por impacto no negócio...")
        
        for component_name, component in self.components.items():
            # Mission Critical (em uso crítico)
            if component.usage_count >= 3 or self._is_critical_component(component_name):
                component.business_value = 'mission_critical'
            
            # High Value (em uso moderado)
            elif component.usage_count > 0:
                component.business_value = 'high_value'
            
            # Legacy Valuable (não usado mas valioso)
            elif component.extraction_value >= self.analysis_config['min_legacy_value_threshold']:
                component.business_value = 'legacy_valuable'
            
            # Redundant
            else:
                component.business_value = 'redundant'
    
    def _is_critical_component(self, component_name: str) -> bool:
        """Verifica se componente é crítico para o negócio"""
        critical_patterns = [
            'hero', 'header', 'footer', 'navigation', 'cta', 'button',
            'layout', 'homepage', 'assessment', 'intelligence', 'framework'
        ]
        
        return any(pattern in component_name.lower() for pattern in critical_patterns)
    
    def _calculate_optimization_scores(self):
        """Calcula scores de priorização para otimização"""
        print("📊 Calculando scores de otimização...")
        
        for component in self.components.values():
            if component.business_value == 'legacy_valuable':
                # Alta prioridade para componentes com alto valor de extração
                priority = (
                    component.extraction_value * 0.5 +
                    component.reusability_potential * 0.3 +
                    (component.size_lines / 1000) * 0.2
                )
                component.refactor_priority = min(priority, 1.0)
            else:
                component.refactor_priority = 0.0
    
    def _generate_optimization_strategy(self) -> Dict:
        """Gera estratégia de otimização com foco em ROI"""
        print("🎯 Gerando estratégia de otimização...")
        
        # Filtra componentes por categoria
        mission_critical = [c for c in self.components.values() if c.business_value == 'mission_critical']
        high_value = [c for c in self.components.values() if c.business_value == 'high_value']
        legacy_valuable = [c for c in self.components.values() if c.business_value == 'legacy_valuable']
        redundant = [c for c in self.components.values() if c.business_value == 'redundant']
        
        # Seleciona candidatos para refatoração (10-25% dos legacy_valuable)
        sorted_legacy = sorted(legacy_valuable, key=lambda x: x.refactor_priority, reverse=True)
        min_count = max(1, int(len(legacy_valuable) * 0.1))
        max_count = max(min_count, int(len(legacy_valuable) * 0.25))
        refactor_candidates = sorted_legacy[:max_count]
        
        # Extrai padrões mais valiosos
        top_patterns = self._extract_top_patterns(refactor_candidates)
        
        # Calcula ROI estimado
        roi_analysis = self._calculate_refactor_roi(refactor_candidates)
        
        strategy = {
            'timestamp': '2025-01-18',
            'analysis_type': 'comprehensive_legacy_optimization',
            'executive_summary': {
                'total_components': len(self.components),
                'mission_critical': len(mission_critical),
                'high_value': len(high_value),
                'legacy_valuable': len(legacy_valuable),
                'redundant': len(redundant),
                'refactor_candidates': len(refactor_candidates),
                'estimated_value_preservation': f"{roi_analysis['value_preservation']:.1%}",
                'estimated_effort_days': roi_analysis['effort_days'],
                'roi_score': roi_analysis['roi_score']
            },
            'optimization_strategy': {
                'approach': 'selective_legacy_value_extraction',
                'focus_areas': [
                    'Preserve valuable animation and UI patterns',
                    'Extract reusable business logic',
                    'Create pattern library from complex components',
                    'Maintain design system coherence'
                ],
                'refactor_methodology': [
                    'Pattern extraction before deletion',
                    'Business logic preservation',
                    'Design token extraction',
                    'Component library creation'
                ]
            },
            'top_refactor_candidates': [asdict(c) for c in refactor_candidates],
            'valuable_patterns_library': top_patterns,
            'roi_analysis': roi_analysis,
            'implementation_phases': self._generate_implementation_phases(refactor_candidates)
        }
        
        return strategy
    
    def _extract_top_patterns(self, candidates: List[ComponentAnalysis]) -> Dict:
        """Extrai os padrões mais valiosos dos candidatos"""
        pattern_frequency = defaultdict(int)
        pattern_examples = defaultdict(list)
        
        for component in candidates:
            for pattern in component.legacy_patterns:
                pattern_frequency[pattern] += 1
                pattern_examples[pattern].append(component.name)
        
        # Ordena por frequência e valor
        top_patterns = {}
        for pattern, freq in sorted(pattern_frequency.items(), key=lambda x: x[1], reverse=True)[:10]:
            category = pattern.split(':')[0]
            if category not in top_patterns:
                top_patterns[category] = []
            
            top_patterns[category].append({
                'pattern': pattern,
                'frequency': freq,
                'examples': pattern_examples[pattern][:3],
                'extraction_priority': 'high' if freq > 3 else 'medium'
            })
        
        return top_patterns
    
    def _calculate_refactor_roi(self, candidates: List[ComponentAnalysis]) -> Dict:
        """Calcula ROI da refatoração"""
        total_lines = sum(c.size_lines for c in candidates)
        avg_complexity = sum(c.complexity_score for c in candidates) / len(candidates) if candidates else 0
        avg_extraction_value = sum(c.extraction_value for c in candidates) / len(candidates) if candidates else 0
        
        # Estimativas
        effort_days = total_lines / 300  # ~300 linhas por dia de refatoração
        value_preservation = avg_extraction_value * 0.8  # 80% do valor preservado
        roi_score = (value_preservation / (effort_days / 10)) if effort_days > 0 else 0  # ROI simplificado
        
        return {
            'total_lines_to_refactor': total_lines,
            'avg_complexity': round(avg_complexity, 1),
            'avg_extraction_value': round(avg_extraction_value, 2),
            'effort_days': round(effort_days, 1),
            'value_preservation': value_preservation,
            'roi_score': round(roi_score, 2)
        }
    
    def _generate_implementation_phases(self, candidates: List[ComponentAnalysis]) -> List[Dict]:
        """Gera fases de implementação"""
        # Agrupa por prioridade
        high_priority = [c for c in candidates if c.refactor_priority > 0.7]
        medium_priority = [c for c in candidates if 0.4 <= c.refactor_priority <= 0.7]
        low_priority = [c for c in candidates if c.refactor_priority < 0.4]
        
        phases = []
        
        if high_priority:
            phases.append({
                'phase': 1,
                'name': 'High-Value Pattern Extraction',
                'duration_days': round(sum(c.size_lines for c in high_priority) / 300, 1),
                'components': [c.name for c in high_priority],
                'objectives': [
                    'Extract most valuable UI patterns',
                    'Preserve complex business logic',
                    'Create reusable animation patterns'
                ]
            })
        
        if medium_priority:
            phases.append({
                'phase': 2,
                'name': 'Design System Consolidation',
                'duration_days': round(sum(c.size_lines for c in medium_priority) / 300, 1),
                'components': [c.name for c in medium_priority],
                'objectives': [
                    'Consolidate design system components',
                    'Extract styling patterns',
                    'Create utility libraries'
                ]
            })
        
        if low_priority:
            phases.append({
                'phase': 3,
                'name': 'Final Cleanup & Optimization',
                'duration_days': round(sum(c.size_lines for c in low_priority) / 300, 1),
                'components': [c.name for c in low_priority],
                'objectives': [
                    'Final component cleanup',
                    'Documentation updates',
                    'Performance optimization'
                ]
            })
        
        return phases
    
    def save_comprehensive_results(self, output_dir: str = None) -> Path:
        """Salva resultados comprehensivos"""
        if output_dir is None:
            output_dir = self.project_root / "scripts" / "optimization-results"
        
        output_path = Path(output_dir)
        output_path.mkdir(exist_ok=True)
        
        # Executa análise completa
        strategy = self.analyze_comprehensive()
        
        # Salva estratégia principal
        with open(output_path / "optimization-strategy.json", 'w', encoding='utf-8') as f:
            json.dump(strategy, f, indent=2, ensure_ascii=False)
        
        # Salva análise detalhada de componentes
        detailed_analysis = {c.name: asdict(c) for c in self.components.values()}
        with open(output_path / "detailed-component-analysis.json", 'w', encoding='utf-8') as f:
            json.dump(detailed_analysis, f, indent=2, ensure_ascii=False)
        
        # Gera relatório executivo em markdown
        executive_report = self._generate_executive_report(strategy)
        with open(output_path / "executive-optimization-report.md", 'w', encoding='utf-8') as f:
            f.write(executive_report)
        
        print(f"✅ Resultados comprehensivos salvos em: {output_path}")
        return output_path
    
    def _generate_executive_report(self, strategy: Dict) -> str:
        """Gera relatório executivo em markdown"""
        summary = strategy['executive_summary']
        roi = strategy['roi_analysis']
        phases = strategy['implementation_phases']
        
        report = f"""# ARCO Legacy Value Extraction - Executive Report

## 🎯 Executive Summary
- **Total Components Analyzed**: {summary['total_components']}
- **Business Impact Classification**:
  - Mission Critical: {summary['mission_critical']} components
  - High Value: {summary['high_value']} components  
  - Legacy Valuable: {summary['legacy_valuable']} components
  - Redundant: {summary['redundant']} components

## 📊 Optimization Opportunity
- **Components Selected for Refactoring**: {summary['refactor_candidates']}
- **Value Preservation Rate**: {summary['estimated_value_preservation']}
- **Estimated Effort**: {summary['estimated_effort_days']} days
- **ROI Score**: {summary['roi_score']}/10

## 🚀 Strategic Approach
"""
        
        for approach in strategy['optimization_strategy']['focus_areas']:
            report += f"- {approach}\n"
        
        report += f"""
## 📋 Implementation Phases
"""
        
        for phase in phases:
            report += f"""
### Phase {phase['phase']}: {phase['name']}
- **Duration**: {phase['duration_days']} days
- **Components**: {len(phase['components'])} components
- **Key Objectives**:
"""
            for objective in phase['objectives']:
                report += f"  - {objective}\n"
        
        report += f"""
## 💰 Business Impact
- **Lines of Code to Optimize**: {roi['total_lines_to_refactor']:,}
- **Average Component Complexity**: {roi['avg_complexity']}/100
- **Value Extraction Rate**: {roi['avg_extraction_value']:.1%}
- **Estimated Value Preservation**: {roi['value_preservation']:.1%}

## ✅ Success Metrics
- Preserve 80%+ of valuable patterns and business logic
- Reduce total component count by 15-25%
- Create 5-10 new reusable library components
- Improve codebase maintainability score by 30%+
- Establish pattern library for future development
"""
        
        return report

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description='ARCO Legacy Value Extraction Engine')
    parser.add_argument('--analyze', action='store_true', help='Executa análise comprehensiva')
    parser.add_argument('--optimize', action='store_true', help='Gera estratégia de otimização')
    parser.add_argument('--save-results', action='store_true', help='Salva todos os resultados')
    
    args = parser.parse_args()
    
    project_root = "c:/Users/João Pedro Cardozo/projetos/arco"
    optimizer = ARCOLegacyOptimizer(project_root)
    
    if args.analyze or args.save_results:
        strategy = optimizer.analyze_comprehensive()
        
        print(f"\n🎯 ANÁLISE COMPREHENSIVA CONCLUÍDA:")
        print(f"   Total: {strategy['executive_summary']['total_components']} componentes")
        print(f"   Críticos: {strategy['executive_summary']['mission_critical']}")
        print(f"   Alto Valor: {strategy['executive_summary']['high_value']}")
        print(f"   Legado Valioso: {strategy['executive_summary']['legacy_valuable']}")
        print(f"   Redundantes: {strategy['executive_summary']['redundant']}")
        print(f"   Candidatos à Refatoração: {strategy['executive_summary']['refactor_candidates']}")
        print(f"   ROI Score: {strategy['executive_summary']['roi_score']}/10")
    
    if args.save_results:
        output_path = optimizer.save_comprehensive_results()
        print(f"\n💾 Resultados salvos em: {output_path}")
        print(f"📋 Relatório executivo: executive-optimization-report.md")
        print(f"📊 Estratégia completa: optimization-strategy.json")
