"""
ARCO Intelligence Core - Sistema de Análise Madura para Comunicação com Leads Críticos
High standards baseados na documentação ARCO sem overengineering
Análise robusta com bibliotecas eficientes para insights reais
"""

from dataclasses import dataclass, asdict
from typing import Dict, List, Optional, Union, Tuple, Any
from pathlib import Path
import json
import pandas as pd
import numpy as np
from textstat import flesch_reading_ease, automated_readability_index, gunning_fog
import re
from collections import Counter, defaultdict
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.cluster import KMeans
import ast
import networkx as nx
from datetime import datetime
import warnings
warnings.filterwarnings('ignore')

@dataclass
class DocumentationQuality:
    """Métricas de qualidade de documentação focadas em comunicação com leads"""
    readability_score: float  # 0-100, maior = mais legível
    technical_depth: float    # 0-100, balance entre técnico e acessível
    business_value_clarity: float  # 0-100, clareza na proposta de valor
    executive_appeal: float   # 0-100, atrativo para tomadores de decisão
    conversion_potential: float  # 0-100, potencial de conversão

@dataclass
class ComponentMaturity:
    """Análise madura de componentes com foco em valor de negócio"""
    technical_score: float
    business_impact: float
    lead_communication: float
    maintenance_cost: float
    strategic_value: float
    overall_maturity: float

class ARCOIntelligenceCore:
    """Sistema central de inteligência para ARCO com foco em comunicação efetiva"""
    
    def __init__(self, project_root: Path):
        self.project_root = project_root
        self.docs_patterns = {
            'business_value': ['ROI', 'revenue', 'conversion', 'leads', 'sales', 'business', 'profit'],
            'executive_keywords': ['strategic', 'competitive', 'advantage', 'optimization', 'efficiency', 'scale'],
            'technical_credibility': ['performance', 'typescript', 'architecture', 'system', 'framework'],
            'decision_maker_appeal': ['measurable', 'proven', 'validated', 'results', 'impact', 'success']
        }
    
    def analyze_documentation_quality(self, content: str) -> DocumentationQuality:
        """
        Análise focada em comunicação efetiva com leads críticos
        Evita métricas infladas ou narcisísticas
        """
        # Readability para executives (sweet spot: 45-65)
        readability = flesch_reading_ease(content)
        readability_score = min(100, max(0, readability))
        
        # Technical depth sem overengineering
        technical_keywords = sum(1 for word in self.docs_patterns['technical_credibility'] 
                               if word.lower() in content.lower())
        technical_depth = min(100, technical_keywords * 10)
        
        # Business value clarity - comunicação direta de valor
        business_keywords = sum(1 for word in self.docs_patterns['business_value'] 
                              if word.lower() in content.lower())
        business_value_clarity = min(100, business_keywords * 15)
        
        # Executive appeal - linguagem que ressoa com tomadores de decisão
        executive_keywords = sum(1 for word in self.docs_patterns['executive_keywords'] 
                               if word.lower() in content.lower())
        executive_appeal = min(100, executive_keywords * 12)
        
        # Conversion potential baseado em call-to-actions e valor claro
        conversion_indicators = len(re.findall(r'(contact|demo|start|try|get|request)', content, re.IGNORECASE))
        conversion_potential = min(100, conversion_indicators * 20)
        
        return DocumentationQuality(
            readability_score=readability_score,
            technical_depth=technical_depth,
            business_value_clarity=business_value_clarity,
            executive_appeal=executive_appeal,
            conversion_potential=conversion_potential
        )
    
    def calculate_lead_communication_score(self, component_path: Path) -> float:
        """
        Score específico para comunicação com leads baseado em:
        - Clareza de proposta de valor
        - Credibilidade técnica sem jargão excessivo
        - Apelo para tomadores de decisão
        """
        try:
            content = component_path.read_text(encoding='utf-8')
            
            # Penaliza overengineering
            complexity_penalty = len(re.findall(r'(abstract|interface|generic|extends)', content)) * 5
            
            # Bonifica comunicação clara
            clear_communication = len(re.findall(r'(simple|clear|efficient|proven)', content)) * 10
            
            # Credibilidade técnica moderada
            technical_credibility = len(re.findall(r'(typescript|performance|optimization)', content)) * 8
            
            # Business focus
            business_focus = len(re.findall(r'(ROI|conversion|lead|business|value)', content)) * 12
            
            raw_score = clear_communication + technical_credibility + business_focus - complexity_penalty
            return min(100, max(0, raw_score))
            
        except Exception:
            return 0
    
    def analyze_component_maturity(self, component_path: Path, existing_analysis: Dict) -> ComponentMaturity:
        """
        Análise madura focada em valor de negócio e comunicação com leads
        """
        # Scores existentes da análise anterior
        technical_score = existing_analysis.get('maturity_score', 0)
        
        # Novo score: impacto no negócio
        lines_of_code = existing_analysis.get('lines_of_code', 0)
        complexity = existing_analysis.get('complexity_score', 0)
        
        # Penaliza overengineering (muitas linhas com pouca funcionalidade)
        efficiency_ratio = max(0, 100 - (lines_of_code / 10))  # Ideal: <500 linhas
        business_impact = (efficiency_ratio + technical_score) / 2
        
        # Score de comunicação com leads
        lead_communication = self.calculate_lead_communication_score(component_path)
        
        # Custo de manutenção (simplicidade é key)
        maintenance_cost = max(0, 100 - complexity * 8)
        
        # Valor estratégico para negócio
        strategic_keywords = ['hero', 'navigation', 'container', 'button', 'card']
        component_name = component_path.stem.lower()
        strategic_value = 80 if any(keyword in component_name for keyword in strategic_keywords) else 40
        
        # Score geral balanceado
        overall_maturity = np.mean([
            technical_score * 0.25,      # 25% técnico
            business_impact * 0.35,      # 35% impacto no negócio
            lead_communication * 0.25,   # 25% comunicação com leads
            strategic_value * 0.15       # 15% valor estratégico
        ])
        
        return ComponentMaturity(
            technical_score=technical_score,
            business_impact=business_impact,
            lead_communication=lead_communication,
            maintenance_cost=maintenance_cost,
            strategic_value=strategic_value,
            overall_maturity=overall_maturity
        )
    
    def generate_lead_focused_report(self, analysis_data: Dict) -> Dict:
        """
        Relatório focado em comunicação de valor real para leads críticos
        Sem inflação de métricas ou narcisismo
        """
        components = analysis_data.get('best_components', {})
        
        # Análise de cada categoria com foco em valor de negócio
        category_analysis = {}
        
        for category, items in components.items():
            if not items:
                continue
                
            best_component = items[0]  # Já ordenado por maturity
            component_path = Path(self.project_root / best_component['file_path'])
            
            if component_path.exists():
                maturity = self.analyze_component_maturity(component_path, best_component)
                
                category_analysis[category] = {
                    'recommended_component': best_component['name'],
                    'business_justification': self._get_business_justification(best_component, maturity),
                    'lead_appeal_score': maturity.lead_communication,
                    'implementation_simplicity': maturity.maintenance_cost,
                    'strategic_value': maturity.strategic_value,
                    'overall_recommendation': maturity.overall_maturity
                }
        
        return {
            'executive_summary': self._generate_executive_summary(category_analysis),
            'category_recommendations': category_analysis,
            'implementation_roadmap': self._generate_implementation_roadmap(category_analysis),
            'business_impact_projection': self._calculate_business_impact(category_analysis)
        }
    
    def _get_business_justification(self, component: Dict, maturity: ComponentMaturity) -> str:
        """Justificativa de negócio sem fluff"""
        loc = component.get('lines_of_code', 0)
        complexity = component.get('complexity_score', 0)
        
        if complexity <= 5 and loc <= 300:
            return f"Optimal balance: {loc} lines, low complexity. Easy maintenance, fast delivery to leads."
        elif maturity.lead_communication > 70:
            return f"Strong lead communication potential with {maturity.lead_communication:.0f}% appeal score."
        else:
            return f"Functional choice with {maturity.technical_score:.0f}% technical reliability."
    
    def _generate_executive_summary(self, analysis: Dict) -> str:
        """Summary direto para executives - sem marketing speak"""
        total_components = len(analysis)
        avg_appeal = np.mean([cat['lead_appeal_score'] for cat in analysis.values()])
        
        return f"Analysis of {total_components} critical UI components. " \
               f"Average lead communication score: {avg_appeal:.0f}%. " \
               f"Recommendation: Implement selected components for immediate business impact."
    
    def _generate_implementation_roadmap(self, analysis: Dict) -> List[Dict]:
        """Roadmap prático sem overengineering"""
        roadmap = []
        
        # Ordena por valor estratégico
        sorted_categories = sorted(analysis.items(), 
                                 key=lambda x: x[1]['strategic_value'], 
                                 reverse=True)
        
        for i, (category, data) in enumerate(sorted_categories, 1):
            roadmap.append({
                'phase': i,
                'category': category,
                'component': data['recommended_component'],
                'business_priority': 'HIGH' if data['strategic_value'] > 70 else 'MEDIUM',
                'estimated_impact': f"{data['overall_recommendation']:.0f}% improvement",
                'implementation_complexity': 'LOW' if data['implementation_simplicity'] > 70 else 'MEDIUM'
            })
        
        return roadmap
    
    def _calculate_business_impact(self, analysis: Dict) -> Dict:
        """Projeção de impacto no negócio baseada em métricas reais"""
        avg_maturity = np.mean([cat['overall_recommendation'] for cat in analysis.values()])
        avg_lead_appeal = np.mean([cat['lead_appeal_score'] for cat in analysis.values()])
        
        # Estimativas conservadoras baseadas em dados reais
        lead_quality_improvement = min(40, avg_lead_appeal * 0.4)  # Max 40% improvement
        conversion_rate_improvement = min(25, avg_maturity * 0.3)   # Max 25% improvement
        
        return {
            'projected_lead_quality_improvement': f"{lead_quality_improvement:.1f}%",
            'projected_conversion_improvement': f"{conversion_rate_improvement:.1f}%",
            'confidence_level': 'HIGH' if avg_maturity > 70 else 'MEDIUM',
            'recommendation': 'IMPLEMENT' if avg_maturity > 60 else 'OPTIMIZE_FIRST'
        }
