#!/usr/bin/env python3
"""
ARCO Intelligence Runner - Análise Executável de Alta Performance
Comunicação efetiva com leads críticos, sem overengineering
"""

import sys
import json
from pathlib import Path
from datetime import datetime
from typing import Dict, Any, List

# Import intelligence modules (design to work without external deps first)
try:
    from .documentation_analyzer import DocumentationIntelligence
    from .core import ARCOIntelligenceCore
    FULL_ANALYSIS = True
except ImportError:
    FULL_ANALYSIS = False
    print("📊 Running in lightweight mode (install requirements.txt for full analysis)")

class ARCOIntelligenceRunner:
    """Runner principal para análise de inteligência ARCO"""
    
    def __init__(self, project_root: str = None):
        self.project_root = Path(project_root) if project_root else Path.cwd()
        self.results_dir = self.project_root / "intelligence" / "results"
        self.results_dir.mkdir(exist_ok=True)
        
    def run_lightweight_analysis(self) -> Dict[str, Any]:
        """Análise básica sem dependências externas - foco em comunicação com leads"""
        print("🎯 ARCO Intelligence - Lead Communication Analysis")
        print("=" * 60)
        
        # Carrega análise existente de componentes
        existing_analysis_path = self.project_root / "arco_analysis_results.json"
        if not existing_analysis_path.exists():
            return {"error": "arco_analysis_results.json not found. Run component analysis first."}
        
        with open(existing_analysis_path) as f:
            component_data = json.load(f)
        
        # Análise de documentação básica
        docs_analysis = self._analyze_documentation_basic()
        
        # Lead communication score para componentes
        lead_scores = self._calculate_lead_communication_scores(component_data)
        
        # Relatório executivo
        report = {
            'timestamp': datetime.now().isoformat(),
            'analysis_type': 'lightweight_lead_communication',
            'executive_summary': self._generate_executive_summary(component_data, docs_analysis, lead_scores),
            'component_lead_scores': lead_scores,
            'documentation_insights': docs_analysis,
            'strategic_recommendations': self._generate_strategic_recommendations(lead_scores, docs_analysis),
            'implementation_priority': self._calculate_implementation_priority(lead_scores)
        }
        
        return report
    
    def _analyze_documentation_basic(self) -> Dict[str, Any]:
        """Análise básica de documentação focada em comunicação com leads"""
        md_files = list(self.project_root.rglob("*.md"))
        
        # Keywords para comunicação efetiva com leads
        business_keywords = ['ROI', 'revenue', 'conversion', 'sales', 'business', 'value', 'profit']
        executive_keywords = ['strategic', 'competitive', 'optimization', 'efficiency', 'scale']
        action_keywords = ['contact', 'demo', 'start', 'get', 'request', 'schedule']
        
        doc_scores = []
        
        for md_file in md_files:
            if self._should_analyze_doc(md_file):
                try:
                    content = md_file.read_text(encoding='utf-8').lower()
                    
                    business_score = sum(1 for kw in business_keywords if kw.lower() in content)
                    executive_score = sum(1 for kw in executive_keywords if kw.lower() in content)
                    action_score = sum(1 for kw in action_keywords if kw.lower() in content)
                    
                    # Score simplificado
                    total_score = (business_score * 3) + (executive_score * 2) + (action_score * 4)
                    
                    doc_scores.append({
                        'file': str(md_file.relative_to(self.project_root)),
                        'business_appeal': business_score,
                        'executive_appeal': executive_score,
                        'conversion_potential': action_score,
                        'total_score': total_score
                    })
                    
                except Exception:
                    continue
        
        # Ordena por score total
        doc_scores.sort(key=lambda x: x['total_score'], reverse=True)
        
        return {
            'total_docs_analyzed': len(doc_scores),
            'top_performers': doc_scores[:5],
            'average_business_appeal': sum(d['business_appeal'] for d in doc_scores) / max(1, len(doc_scores)),
            'average_executive_appeal': sum(d['executive_appeal'] for d in doc_scores) / max(1, len(doc_scores)),
            'docs_with_conversion_elements': len([d for d in doc_scores if d['conversion_potential'] > 0])
        }
    
    def _should_analyze_doc(self, file_path: Path) -> bool:
        """Filtra documentos relevantes"""
        exclude = ['node_modules', '.git', '.next', 'CHANGELOG', 'LICENSE']
        return not any(ex in str(file_path) for ex in exclude)
    
    def _calculate_lead_communication_scores(self, component_data: Dict) -> Dict[str, Any]:
        """Calcula scores de comunicação com leads para componentes"""
        components = component_data.get('best_components', {})
        
        lead_scores = {}
        
        for category, items in components.items():
            category_scores = []
            
            for item in items:
                # Score baseado em simplicidade e maturity
                maturity = item.get('maturity_score', 0)
                lines = item.get('lines_of_code', 0)
                complexity = item.get('complexity_score', 0)
                
                # Penaliza overengineering (muitas linhas, alta complexidade)
                simplicity_bonus = max(0, 100 - (lines / 5) - (complexity * 10))
                
                # Score final para comunicação com leads
                lead_communication_score = (maturity * 0.6) + (simplicity_bonus * 0.4)
                
                category_scores.append({
                    'component': item['name'],
                    'maturity_score': maturity,
                    'lead_communication_score': round(lead_communication_score, 1),
                    'simplicity_bonus': round(simplicity_bonus, 1),
                    'business_justification': self._get_business_justification(item, lead_communication_score)
                })
            
            lead_scores[category] = category_scores
        
        return lead_scores
    
    def _get_business_justification(self, component: Dict, lead_score: float) -> str:
        """Justificativa de negócio clara sem marketing speak"""
        lines = component.get('lines_of_code', 0)
        complexity = component.get('complexity_score', 0)
        
        if lead_score > 80:
            return f"EXCELENTE: {lines} linhas, complexidade {complexity}. Ideal para demonstração a leads."
        elif lead_score > 60:
            return f"BOM: Balanceado para apresentações técnicas. {lines} linhas mantém simplicidade."
        elif lines > 500:
            return f"ATENÇÃO: {lines} linhas podem intimidar leads não-técnicos. Considere simplificar."
        else:
            return f"FUNCIONAL: Atende requisitos básicos. Score {lead_score:.0f}% para comunicação."
    
    def _generate_executive_summary(self, component_data: Dict, docs_analysis: Dict, lead_scores: Dict) -> str:
        """Summary executivo direto"""
        total_components = sum(len(items) for items in component_data.get('best_components', {}).values())
        
        avg_lead_score = 0
        count = 0
        for category in lead_scores.values():
            for item in category:
                avg_lead_score += item['lead_communication_score']
                count += 1
        
        avg_lead_score = avg_lead_score / max(1, count)
        
        docs_with_conversion = docs_analysis.get('docs_with_conversion_elements', 0)
        total_docs = docs_analysis.get('total_docs_analyzed', 0)
        
        return f"Analisados {total_components} componentes principais e {total_docs} documentos. " \
               f"Score médio de comunicação com leads: {avg_lead_score:.1f}%. " \
               f"{docs_with_conversion}/{total_docs} documentos possuem elementos de conversão. " \
               f"Recomendação: {'IMPLEMENTAR' if avg_lead_score > 70 else 'OTIMIZAR PRIMEIRO'}."
    
    def _generate_strategic_recommendations(self, lead_scores: Dict, docs_analysis: Dict) -> List[str]:
        """Recomendações estratégicas práticas"""
        recommendations = []
        
        # Análise de componentes
        high_scoring = []
        needs_improvement = []
        
        for category, items in lead_scores.items():
            for item in items:
                score = item['lead_communication_score']
                if score > 75:
                    high_scoring.append(f"{item['component']} ({category})")
                elif score < 50:
                    needs_improvement.append(f"{item['component']} ({category})")
        
        if high_scoring:
            recommendations.append(f"PRIORITIZE: {', '.join(high_scoring[:3])} para demonstrações a leads")
        
        if needs_improvement:
            recommendations.append(f"OTIMIZE: {', '.join(needs_improvement[:2])} antes de apresentar a clientes")
        
        # Análise de documentação
        avg_executive_appeal = docs_analysis.get('average_executive_appeal', 0)
        if avg_executive_appeal < 2:
            recommendations.append("CRÍTICO: Documentação precisa de mais linguagem estratégica para executives")
        
        conversion_docs = docs_analysis.get('docs_with_conversion_elements', 0)
        total_docs = docs_analysis.get('total_docs_analyzed', 1)
        if conversion_docs / total_docs < 0.3:
            recommendations.append("ALTA: Implementar mais call-to-actions na documentação")
        
        return recommendations
    
    def _calculate_implementation_priority(self, lead_scores: Dict) -> List[Dict]:
        """Calcula prioridade de implementação baseada em impacto com leads"""
        priorities = []
        
        for category, items in lead_scores.items():
            if items:
                best_item = max(items, key=lambda x: x['lead_communication_score'])
                
                priority_level = 'HIGH' if best_item['lead_communication_score'] > 70 else \
                               'MEDIUM' if best_item['lead_communication_score'] > 50 else 'LOW'
                
                priorities.append({
                    'category': category,
                    'component': best_item['component'],
                    'priority': priority_level,
                    'lead_score': best_item['lead_communication_score'],
                    'business_impact': 'Immediate' if priority_level == 'HIGH' else 'Optimize first'
                })
        
        return sorted(priorities, key=lambda x: x['lead_score'], reverse=True)
    
    def save_results(self, results: Dict) -> Path:
        """Salva resultados da análise"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        output_file = self.results_dir / f"arco_intelligence_report_{timestamp}.json"
        
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=2, ensure_ascii=False)
        
        return output_file
    
    def run(self) -> Dict[str, Any]:
        """Execução principal da análise"""
        if FULL_ANALYSIS:
            print("🚀 Running full ARCO Intelligence analysis...")
            # TODO: Implement full analysis when deps are available
            return self.run_lightweight_analysis()
        else:
            return self.run_lightweight_analysis()

def main():
    """Ponto de entrada CLI"""
    project_root = sys.argv[1] if len(sys.argv) > 1 else None
    
    runner = ARCOIntelligenceRunner(project_root)
    results = runner.run()
    
    if 'error' in results:
        print(f"❌ Erro: {results['error']}")
        return 1
    
    # Salva e exibe resultados
    output_file = runner.save_results(results)
    
    print("\n" + "="*60)
    print("📊 RESULTADOS DA ANÁLISE")
    print("="*60)
    print(f"Executive Summary: {results['executive_summary']}")
    print(f"\n📄 Relatório completo salvo em: {output_file}")
    
    # Mostra recomendações principais
    print(f"\n🎯 RECOMENDAÇÕES ESTRATÉGICAS:")
    for i, rec in enumerate(results.get('strategic_recommendations', []), 1):
        print(f"{i}. {rec}")
    
    return 0

if __name__ == "__main__":
    exit(main())
