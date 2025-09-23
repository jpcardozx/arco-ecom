"""
ARCO Documentation Intelligence - Análise de Comunicação com Leads
Foco em high standards sem overengineering
"""

import json
import re
from pathlib import Path
from typing import Dict, List, Tuple
from dataclasses import dataclass, asdict
import markdown
from bs4 import BeautifulSoup

@dataclass
class DocumentationMetrics:
    """Métricas focadas em comunicação efetiva com leads críticos"""
    file_path: str
    business_value_score: float  # 0-100: clareza de proposta de valor
    executive_appeal: float      # 0-100: atrativo para tomadores de decisão
    technical_credibility: float # 0-100: credibilidade técnica balanceada
    conversion_potential: float  # 0-100: potencial de geração de leads
    readability_score: float     # 0-100: facilidade de leitura
    overall_score: float        # Score geral ponderado

class DocumentationIntelligence:
    """Análise madura de documentação ARCO para comunicação com leads"""
    
    def __init__(self, project_root: Path):
        self.project_root = project_root
        
        # Padrões de alta qualidade para comunicação com leads
        self.business_keywords = {
            'value_proposition': ['ROI', 'revenue', 'conversion', 'sales', 'profit', 'growth', 'efficiency'],
            'credibility': ['proven', 'validated', 'tested', 'success', 'results', 'measurable'],
            'executive_appeal': ['strategic', 'competitive', 'advantage', 'optimization', 'scale', 'transform'],
            'action_oriented': ['implement', 'start', 'contact', 'demo', 'get', 'request', 'schedule']
        }
        
        # Penalizações por overengineering
        self.overengineering_penalties = [
            'abstract', 'generic', 'complex', 'sophisticated', 'advanced', 'cutting-edge'
        ]
    
    def analyze_markdown_content(self, content: str) -> Dict[str, float]:
        """Análise focada em comunicação clara com tomadores de decisão"""
        
        # Converte markdown para texto limpo
        html = markdown.markdown(content)
        soup = BeautifulSoup(html, 'html.parser')
        clean_text = soup.get_text().lower()
        
        # Business Value Score
        value_keywords = sum(1 for keyword in self.business_keywords['value_proposition'] 
                           if keyword.lower() in clean_text)
        business_value_score = min(100, value_keywords * 15)
        
        # Executive Appeal
        executive_keywords = sum(1 for keyword in self.business_keywords['executive_appeal'] 
                               if keyword.lower() in clean_text)
        executive_appeal = min(100, executive_keywords * 12)
        
        # Technical Credibility (balanceado)
        credibility_keywords = sum(1 for keyword in self.business_keywords['credibility'] 
                                 if keyword.lower() in clean_text)
        technical_credibility = min(100, credibility_keywords * 18)
        
        # Conversion Potential
        action_keywords = sum(1 for keyword in self.business_keywords['action_oriented'] 
                            if keyword.lower() in clean_text)
        conversion_potential = min(100, action_keywords * 20)
        
        # Readability (penaliza texto muito longo sem estrutura)
        sentences = clean_text.split('.')
        avg_sentence_length = sum(len(s.split()) for s in sentences) / max(1, len(sentences))
        readability_score = max(0, 100 - (avg_sentence_length - 15) * 3)  # Ideal: 15 palavras/frase
        
        # Penalização por overengineering
        overengineering_count = sum(1 for word in self.overengineering_penalties 
                                  if word in clean_text)
        overengineering_penalty = min(30, overengineering_count * 10)
        
        return {
            'business_value_score': max(0, business_value_score - overengineering_penalty),
            'executive_appeal': max(0, executive_appeal - overengineering_penalty),
            'technical_credibility': technical_credibility,
            'conversion_potential': conversion_potential,
            'readability_score': readability_score
        }
    
    def analyze_documentation_file(self, file_path: Path) -> DocumentationMetrics:
        """Análise individual de arquivo de documentação"""
        try:
            content = file_path.read_text(encoding='utf-8')
            metrics = self.analyze_markdown_content(content)
            
            # Score geral ponderado para comunicação com leads
            overall_score = (
                metrics['business_value_score'] * 0.30 +      # 30% valor de negócio
                metrics['executive_appeal'] * 0.25 +          # 25% apelo executivo
                metrics['technical_credibility'] * 0.20 +     # 20% credibilidade técnica
                metrics['conversion_potential'] * 0.15 +      # 15% potencial de conversão
                metrics['readability_score'] * 0.10           # 10% legibilidade
            )
            
            return DocumentationMetrics(
                file_path=str(file_path.relative_to(self.project_root)),
                business_value_score=metrics['business_value_score'],
                executive_appeal=metrics['executive_appeal'],
                technical_credibility=metrics['technical_credibility'],
                conversion_potential=metrics['conversion_potential'],
                readability_score=metrics['readability_score'],
                overall_score=overall_score
            )
            
        except Exception as e:
            # Return zero scores for problematic files
            return DocumentationMetrics(
                file_path=str(file_path.relative_to(self.project_root)),
                business_value_score=0,
                executive_appeal=0,
                technical_credibility=0,
                conversion_potential=0,
                readability_score=0,
                overall_score=0
            )
    
    def analyze_all_documentation(self) -> List[DocumentationMetrics]:
        """Análise completa da documentação ARCO"""
        results = []
        
        # Busca arquivos .md em toda a estrutura
        md_files = list(self.project_root.rglob("*.md"))
        
        for md_file in md_files:
            if self._should_analyze_file(md_file):
                result = self.analyze_documentation_file(md_file)
                results.append(result)
        
        return sorted(results, key=lambda x: x.overall_score, reverse=True)
    
    def _should_analyze_file(self, file_path: Path) -> bool:
        """Filtra arquivos relevantes para análise"""
        exclude_patterns = [
            'node_modules', '.git', '.next', 'dist', 'build',
            'CHANGELOG', 'LICENSE', '.github'
        ]
        
        file_str = str(file_path).lower()
        return not any(pattern.lower() in file_str for pattern in exclude_patterns)
    
    def generate_strategic_report(self, metrics: List[DocumentationMetrics]) -> Dict:
        """Relatório estratégico focado em comunicação com leads"""
        
        if not metrics:
            return {'error': 'No documentation files found for analysis'}
        
        # Top performers
        top_docs = metrics[:5]
        avg_scores = {
            'business_value': sum(m.business_value_score for m in metrics) / len(metrics),
            'executive_appeal': sum(m.executive_appeal for m in metrics) / len(metrics),
            'technical_credibility': sum(m.technical_credibility for m in metrics) / len(metrics),
            'conversion_potential': sum(m.conversion_potential for m in metrics) / len(metrics),
            'overall': sum(m.overall_score for m in metrics) / len(metrics)
        }
        
        # Recomendações estratégicas
        recommendations = self._generate_recommendations(metrics, avg_scores)
        
        return {
            'executive_summary': {
                'total_documents_analyzed': len(metrics),
                'average_lead_communication_score': round(avg_scores['overall'], 1),
                'top_performing_documents': len([m for m in metrics if m.overall_score > 70]),
                'improvement_needed': len([m for m in metrics if m.overall_score < 50])
            },
            'top_performers': [asdict(doc) for doc in top_docs],
            'average_scores': avg_scores,
            'strategic_recommendations': recommendations,
            'detailed_metrics': [asdict(m) for m in metrics]
        }
    
    def _generate_recommendations(self, metrics: List[DocumentationMetrics], avg_scores: Dict) -> List[str]:
        """Recomendações práticas baseadas na análise"""
        recommendations = []
        
        if avg_scores['business_value'] < 50:
            recommendations.append("CRÍTICO: Adicionar mais propostas de valor claras e ROI mensurável")
        
        if avg_scores['executive_appeal'] < 60:
            recommendations.append("ALTA: Incluir mais linguagem estratégica para tomadores de decisão")
        
        if avg_scores['conversion_potential'] < 40:
            recommendations.append("ALTA: Implementar mais call-to-actions e elementos de conversão")
        
        if avg_scores['technical_credibility'] > 80 and avg_scores['executive_appeal'] < 50:
            recommendations.append("BALANCEAMENTO: Reduzir jargão técnico, aumentar apelo executivo")
        
        high_performers = [m for m in metrics if m.overall_score > 75]
        if high_performers:
            best_file = high_performers[0].file_path
            recommendations.append(f"PADRÃO: Use {best_file} como template para outros documentos")
        
        return recommendations
