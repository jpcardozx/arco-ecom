#!/usr/bin/env python3
"""
Design System Quality Analyzer
Analisa qualidade e consistência do sistema de design sem operações manuais
"""

import os
import re
import json
from pathlib import Path
from typing import Dict, List, Any, Optional
from dataclasses import dataclass

@dataclass
class QualityMetric:
    """Métrica de qualidade"""
    name: str
    score: float
    issues: List[str]
    recommendations: List[str]

class DesignSystemQualityAnalyzer:
    """Analisador de qualidade do sistema de design"""
    
    def __init__(self, base_path: str = "src/design-system"):
        self.base_path = Path(base_path)
        self.metrics: Dict[str, QualityMetric] = {}
    
    def analyze_structure_quality(self) -> QualityMetric:
        """Analisa qualidade da estrutura"""
        issues = []
        recommendations = []
        score = 100.0
        
        # Verificar estrutura atômica
        expected_folders = ["foundations", "atoms", "molecules", "organisms", "templates"]
        existing_folders = [d.name for d in self.base_path.iterdir() if d.is_dir()]
        
        missing_folders = set(expected_folders) - set(existing_folders)
        if missing_folders:
            issues.append(f"Pastas ausentes: {', '.join(missing_folders)}")
            score -= len(missing_folders) * 10
            recommendations.append("Criar estrutura atômica completa")
        
        # Verificar arquivos perdidos na raiz
        root_components = [f.name for f in self.base_path.glob("*.tsx")]
        if root_components:
            issues.append(f"Componentes na raiz: {', '.join(root_components)}")
            score -= len(root_components) * 5
            recommendations.append("Mover componentes para categorias apropriadas")
        
        # Verificar índices
        main_index = self.base_path / "index.ts"
        if not main_index.exists():
            issues.append("Index principal ausente")
            score -= 15
            recommendations.append("Criar index.ts principal com exports centralizados")
        
        return QualityMetric("Estrutura", max(0, score), issues, recommendations)
    
    def analyze_import_quality(self) -> QualityMetric:
        """Analisa qualidade dos imports"""
        issues = []
        recommendations = []
        score = 100.0
        problematic_files = []
        
        # Padrões problemáticos de import
        problematic_patterns = [
            (r"from ['\"]\.\/utils['\"]", "Import relativo para utils na raiz"),
            (r"from ['\"]\.\/\.\.\/utils['\"]", "Import relativo para utils pai"),
            (r"from ['\"]@\/lib\/utils['\"]", "Import absoluto para lib utils"),
            (r"from ['\"].*\/\.\.\/.+['\"]", "Import com navegação complexa"),
        ]
        
        for tsx_file in self.base_path.rglob("*.tsx"):
            try:
                content = tsx_file.read_text(encoding='utf-8')
                file_issues = []
                
                for pattern, description in problematic_patterns:
                    matches = re.findall(pattern, content)
                    if matches:
                        file_issues.append(f"{description}: {len(matches)} ocorrências")
                
                if file_issues:
                    problematic_files.append(f"{tsx_file.name}: {'; '.join(file_issues)}")
                    score -= len(file_issues) * 3
                    
            except Exception as e:
                issues.append(f"Erro lendo {tsx_file.name}: {str(e)}")
                score -= 5
        
        if problematic_files:
            issues.extend(problematic_files)
            recommendations.append("Padronizar imports para '../foundations'")
            recommendations.append("Usar script de automação para correção em massa")
        
        return QualityMetric("Imports", max(0, score), issues, recommendations)
    
    def analyze_typescript_quality(self) -> QualityMetric:
        """Analisa qualidade do TypeScript"""
        issues = []
        recommendations = []
        score = 100.0
        
        # Verificar interfaces e tipos
        type_files = []
        component_files = []
        
        for tsx_file in self.base_path.rglob("*.tsx"):
            try:
                content = tsx_file.read_text(encoding='utf-8')
                
                # Verificar se tem interface de props
                if "interface" not in content and "type" not in content:
                    issues.append(f"{tsx_file.name}: Sem interfaces/tipos definidos")
                    score -= 5
                
                # Verificar forwardRef
                if "React.forwardRef" not in content and "forwardRef" not in content:
                    if "export const" in content or "export function" in content:
                        issues.append(f"{tsx_file.name}: Componente sem forwardRef")
                        score -= 3
                
                # Verificar props destructuring
                if "Props" in content and "{ className" not in content:
                    issues.append(f"{tsx_file.name}: Props podem não estar bem estruturadas")
                    score -= 2
                
                component_files.append(tsx_file.name)
                
            except Exception as e:
                issues.append(f"Erro analisando {tsx_file.name}: {str(e)}")
                score -= 5
        
        if score < 90:
            recommendations.append("Adicionar interfaces TypeScript para todos os componentes")
            recommendations.append("Implementar forwardRef em componentes reutilizáveis")
            recommendations.append("Padronizar destructuring de props")
        
        return QualityMetric("TypeScript", max(0, score), issues, recommendations)
    
    def analyze_performance_quality(self) -> QualityMetric:
        """Analisa qualidade de performance"""
        issues = []
        recommendations = []
        score = 100.0
        
        # Verificar imports desnecessários
        large_imports = []
        for tsx_file in self.base_path.rglob("*.tsx"):
            try:
                content = tsx_file.read_text(encoding='utf-8')
                
                # Verificar imports de bibliotecas grandes
                heavy_imports = [
                    ("import.*from ['\"]lodash['\"]", "Lodash completo"),
                    ("import.*from ['\"]@mui/material['\"]", "Material-UI completo"),
                    ("import.*from ['\"]antd['\"]", "Antd completo"),
                ]
                
                for pattern, lib_name in heavy_imports:
                    if re.search(pattern, content):
                        large_imports.append(f"{tsx_file.name}: {lib_name}")
                        score -= 10
                
                # Verificar re-exports desnecessários
                if "export *" in content:
                    lines = content.split('\n')
                    export_star_count = sum(1 for line in lines if 'export *' in line)
                    if export_star_count > 3:
                        issues.append(f"{tsx_file.name}: Muitos re-exports ({export_star_count})")
                        score -= 5
                
            except Exception as e:
                issues.append(f"Erro analisando performance em {tsx_file.name}: {str(e)}")
                score -= 2
        
        if large_imports:
            issues.extend(large_imports)
            recommendations.append("Usar imports específicos ao invés de bibliotecas completas")
        
        if score < 90:
            recommendations.append("Implementar lazy loading para componentes pesados")
            recommendations.append("Otimizar re-exports para tree shaking")
        
        return QualityMetric("Performance", max(0, score), issues, recommendations)
    
    def analyze_design_consistency(self) -> QualityMetric:
        """Analisa consistência de design"""
        issues = []
        recommendations = []
        score = 100.0
        
        # Verificar uso de design tokens
        token_usage = {}
        inconsistent_files = []
        
        for tsx_file in self.base_path.rglob("*.tsx"):
            try:
                content = tsx_file.read_text(encoding='utf-8')
                
                # Verificar hard-coded colors
                hardcoded_colors = re.findall(r'#[0-9a-fA-F]{3,6}', content)
                if hardcoded_colors:
                    inconsistent_files.append(f"{tsx_file.name}: Cores hard-coded {hardcoded_colors}")
                    score -= len(hardcoded_colors) * 2
                
                # Verificar hard-coded spacing
                hardcoded_spacing = re.findall(r'[mp][trblxy]?-\d+', content)
                excessive_spacing = [s for s in hardcoded_spacing if int(s.split('-')[1]) > 96]
                if excessive_spacing:
                    inconsistent_files.append(f"{tsx_file.name}: Spacing excessivo {excessive_spacing}")
                    score -= len(excessive_spacing) * 1
                
                # Verificar uso de cn utility
                if "className=" in content and "cn(" not in content:
                    issues.append(f"{tsx_file.name}: Não usa utility cn() para classes")
                    score -= 3
                
            except Exception as e:
                issues.append(f"Erro analisando design em {tsx_file.name}: {str(e)}")
                score -= 2
        
        if inconsistent_files:
            issues.extend(inconsistent_files)
            recommendations.append("Usar design tokens ao invés de valores hard-coded")
            recommendations.append("Implementar linter para design consistency")
        
        return QualityMetric("Design Consistency", max(0, score), issues, recommendations)
    
    def generate_quality_report(self) -> Dict[str, Any]:
        """Gera relatório completo de qualidade"""
        print("🔍 Analisando qualidade do Design System S-Tier...\n")
        
        # Executar todas as análises
        analyses = [
            ("structure", self.analyze_structure_quality),
            ("imports", self.analyze_import_quality),
            ("typescript", self.analyze_typescript_quality),
            ("performance", self.analyze_performance_quality),
            ("design", self.analyze_design_consistency),
        ]
        
        results = {}
        total_score = 0
        
        for name, analyzer in analyses:
            metric = analyzer()
            results[name] = metric
            total_score += metric.score
            print(f"📊 {metric.name}: {metric.score:.1f}/100")
            
            if metric.issues:
                print(f"   ⚠️  Issues ({len(metric.issues)}):")
                for issue in metric.issues[:3]:  # Mostrar apenas os 3 primeiros
                    print(f"      • {issue}")
                if len(metric.issues) > 3:
                    print(f"      ... e mais {len(metric.issues) - 3} issues")
            
            if metric.recommendations:
                print(f"   💡 Recomendações:")
                for rec in metric.recommendations[:2]:  # Mostrar apenas as 2 primeiras
                    print(f"      • {rec}")
                if len(metric.recommendations) > 2:
                    print(f"      ... e mais {len(metric.recommendations) - 2} recomendações")
            print()
        
        overall_score = total_score / len(analyses)
        
        # Classificação geral
        if overall_score >= 90:
            grade = "S-Tier ⭐"
            status = "Excelente"
        elif overall_score >= 80:
            grade = "A-Tier ✨"
            status = "Muito Bom"
        elif overall_score >= 70:
            grade = "B-Tier 👍"
            status = "Bom"
        elif overall_score >= 60:
            grade = "C-Tier ⚠️"
            status = "Precisa Melhorias"
        else:
            grade = "D-Tier ❌"
            status = "Requer Refatoração"
        
        report = {
            "overall_score": overall_score,
            "grade": grade,
            "status": status,
            "metrics": {name: {
                "score": metric.score,
                "issues_count": len(metric.issues),
                "recommendations_count": len(metric.recommendations)
            } for name, metric in results.items()},
            "detailed_results": results
        }
        
        print("=" * 60)
        print(f"🎯 SCORE GERAL: {overall_score:.1f}/100 - {grade}")
        print(f"📈 STATUS: {status}")
        print("=" * 60)
        
        return report
    
    def save_report(self, report: Dict[str, Any], filename: str = "quality_report.json") -> None:
        """Salva relatório em arquivo JSON"""
        report_path = self.base_path.parent / filename
        
        # Converter dataclasses para dict para JSON serialization
        json_report = {
            "overall_score": report["overall_score"],
            "grade": report["grade"],
            "status": report["status"],
            "metrics": report["metrics"],
            "detailed_issues": {}
        }
        
        for name, metric in report["detailed_results"].items():
            json_report["detailed_issues"][name] = {
                "score": metric.score,
                "issues": metric.issues,
                "recommendations": metric.recommendations
            }
        
        with open(report_path, 'w', encoding='utf-8') as f:
            json.dump(json_report, f, indent=2, ensure_ascii=False)
        
        print(f"💾 Relatório salvo em: {report_path}")

def main():
    """Função principal"""
    analyzer = DesignSystemQualityAnalyzer()
    report = analyzer.generate_quality_report()
    analyzer.save_report(report)
    
    print("\n🚀 PRÓXIMOS PASSOS RECOMENDADOS:")
    print("1. Execute o script de automação para correções em massa")
    print("2. Revise issues de maior prioridade")
    print("3. Implemente linting rules para prevenir regressões")
    print("4. Configure CI/CD para validação automática")

if __name__ == "__main__":
    main()
