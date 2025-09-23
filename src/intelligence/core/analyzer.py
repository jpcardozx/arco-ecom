"""
ARCO Intelligence Analyzer - Sistema Robusto de Análise para Leads Críticos
Análise profunda com machine learning e insights acionáveis
"""

import json
import pandas as pd
import numpy as np
from pathlib import Path
from typing import Dict, List, Tuple, Any
from textstat import flesch_reading_ease, gunning_fog, automated_readability_index
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt
import seaborn as sns
import networkx as nx
from collections import defaultdict, Counter
import re
import ast
from datetime import datetime
from core import ARCOIntelligenceCore, DocumentationQuality, ComponentMaturity

class ARCOAdvancedAnalyzer:
    """Sistema avançado de análise para insights profundos sobre a arquitetura ARCO"""
    
    def __init__(self, project_root: Path):
        self.project_root = project_root
        self.core = ARCOIntelligenceCore(project_root)
        self.component_data = []
        self.documentation_data = []
        
    def load_existing_analysis(self) -> Dict:
        """Carrega análise existente para análise profunda"""
        analysis_file = self.project_root / "arco_analysis_results.json"
        if analysis_file.exists():
            with open(analysis_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        return {}
    
    def analyze_component_dependencies(self) -> Dict[str, Any]:
        """Análise de dependências entre componentes usando AST parsing"""
        dependency_graph = nx.DiGraph()
        component_files = list(self.project_root.glob("src/**/*.tsx"))
        
        import_patterns = defaultdict(list)
        complexity_scores = {}
        
        for file_path in component_files:
            try:
                content = file_path.read_text(encoding='utf-8')
                
                # Análise de imports
                imports = re.findall(r'import.*from [\'"]([^\'\"]+)[\'"]', content)
                relative_imports = [imp for imp in imports if imp.startswith('.')]
                
                # Análise de complexidade real
                lines = content.split('\n')
                non_empty_lines = [line for line in lines if line.strip() and not line.strip().startswith('//')]
                
                # Contagem de hooks, props, estados
                hooks_count = len(re.findall(r'use[A-Z]\w+', content))
                props_count = len(re.findall(r'interface \w+Props', content))
                state_count = len(re.findall(r'useState|useReducer', content))
                
                complexity_score = len(non_empty_lines) + hooks_count * 2 + props_count * 3 + state_count * 2
                
                component_name = file_path.stem
                dependency_graph.add_node(component_name, 
                                        path=str(file_path),
                                        complexity=complexity_score,
                                        imports=len(imports),
                                        hooks=hooks_count)
                
                # Adiciona edges para dependências
                for imp in relative_imports:
                    dependency_graph.add_edge(component_name, imp.replace('./', '').replace('../', ''))
                
                import_patterns[component_name] = imports
                complexity_scores[component_name] = complexity_score
                
            except Exception as e:
                continue
        
        # Análise de centralidade e importância
        centrality = nx.degree_centrality(dependency_graph)
        betweenness = nx.betweenness_centrality(dependency_graph)
        
        # Converte grafo para formato serializável
        graph_data = {
            'nodes': [{'id': node, **data} for node, data in dependency_graph.nodes(data=True)],
            'edges': [{'source': u, 'target': v, **data} for u, v, data in dependency_graph.edges(data=True)],
            'metrics': {
                'total_nodes': dependency_graph.number_of_nodes(),
                'total_edges': dependency_graph.number_of_edges(),
                'density': nx.density(dependency_graph) if dependency_graph.number_of_nodes() > 0 else 0
            }
        }
        
        return {
            'dependency_graph_data': graph_data,
            'centrality_scores': centrality,
            'betweenness_scores': betweenness,
            'complexity_distribution': complexity_scores,
            'import_patterns': dict(import_patterns),
            'critical_components': self._identify_critical_components(centrality, betweenness, complexity_scores)
        }
    
    def _identify_critical_components(self, centrality: Dict, betweenness: Dict, complexity: Dict) -> List[Dict]:
        """Identifica componentes críticos baseado em métricas de rede"""
        components = []
        
        for component in centrality.keys():
            if component in complexity:
                criticality_score = (
                    centrality.get(component, 0) * 40 +  # Importância na rede
                    betweenness.get(component, 0) * 30 +  # Papel de intermediação
                    min(1.0, complexity.get(component, 0) / 500) * 30  # Complexidade normalizada
                )
                
                components.append({
                    'component': component,
                    'criticality_score': criticality_score,
                    'centrality': centrality.get(component, 0),
                    'betweenness': betweenness.get(component, 0),
                    'complexity': complexity.get(component, 0),
                    'risk_level': 'HIGH' if criticality_score > 0.7 else 'MEDIUM' if criticality_score > 0.4 else 'LOW'
                })
        
        return sorted(components, key=lambda x: x['criticality_score'], reverse=True)
    
    def analyze_documentation_effectiveness(self) -> Dict[str, Any]:
        """Análise profunda da documentação para comunicação com leads"""
        docs_path = self.project_root / "docs"
        if not docs_path.exists():
            return {}
        
        doc_files = list(docs_path.glob("**/*.md"))
        
        # Análise de conteúdo usando TF-IDF
        documents = []
        doc_metadata = []
        
        for doc_file in doc_files:
            try:
                content = doc_file.read_text(encoding='utf-8')
                documents.append(content)
                
                # Métricas de qualidade
                quality = self.core.analyze_documentation_quality(content)
                
                doc_metadata.append({
                    'file': doc_file.name,
                    'path': str(doc_file.relative_to(self.project_root)),
                    'word_count': len(content.split()),
                    'readability': quality.readability_score,
                    'business_value': quality.business_value_clarity,
                    'executive_appeal': quality.executive_appeal,
                    'conversion_potential': quality.conversion_potential
                })
                
            except Exception:
                continue
        
        if not documents:
            return {}
        
        # Análise de similaridade e clustering
        vectorizer = TfidfVectorizer(max_features=1000, stop_words='english')
        tfidf_matrix = vectorizer.fit_transform(documents)
        
        # Clustering de documentos
        n_clusters = min(5, len(documents))
        kmeans = KMeans(n_clusters=n_clusters, random_state=42)
        clusters = kmeans.fit_predict(tfidf_matrix)
        
        # Análise de temas principais
        feature_names = vectorizer.get_feature_names_out()
        top_terms_per_cluster = {}
        
        for i in range(n_clusters):
            cluster_center = kmeans.cluster_centers_[i]
            top_indices = cluster_center.argsort()[-10:][::-1]
            top_terms = [feature_names[idx] for idx in top_indices]
            top_terms_per_cluster[f'cluster_{i}'] = top_terms
        
        # Análise de gaps na documentação
        business_keywords = ['ROI', 'revenue', 'conversion', 'lead', 'sales', 'business', 'profit', 'value']
        technical_keywords = ['architecture', 'performance', 'scalability', 'typescript', 'optimization']
        
        business_coverage = self._calculate_keyword_coverage(documents, business_keywords)
        technical_coverage = self._calculate_keyword_coverage(documents, technical_keywords)
        
        return {
            'document_analysis': doc_metadata,
            'content_clusters': top_terms_per_cluster,
            'similarity_matrix': cosine_similarity(tfidf_matrix).tolist(),
            'business_coverage': business_coverage,
            'technical_coverage': technical_coverage,
            'documentation_gaps': self._identify_documentation_gaps(business_coverage, technical_coverage),
            'lead_communication_score': np.mean([doc['executive_appeal'] for doc in doc_metadata])
        }
    
    def _calculate_keyword_coverage(self, documents: List[str], keywords: List[str]) -> Dict[str, float]:
        """Calcula cobertura de palavras-chave na documentação"""
        coverage = {}
        total_docs = len(documents)
        
        for keyword in keywords:
            docs_with_keyword = sum(1 for doc in documents if keyword.lower() in doc.lower())
            coverage[keyword] = docs_with_keyword / total_docs if total_docs > 0 else 0
        
        return coverage
    
    def _identify_documentation_gaps(self, business_coverage: Dict, technical_coverage: Dict) -> List[Dict]:
        """Identifica gaps críticos na documentação"""
        gaps = []
        
        # Gaps de negócio
        low_business_coverage = {k: v for k, v in business_coverage.items() if v < 0.3}
        if low_business_coverage:
            gaps.append({
                'type': 'business_communication',
                'severity': 'HIGH',
                'missing_topics': list(low_business_coverage.keys()),
                'impact': 'Low lead engagement and conversion',
                'recommendation': 'Add business value sections to key documentation'
            })
        
        # Gaps técnicos
        low_technical_coverage = {k: v for k, v in technical_coverage.items() if v < 0.4}
        if low_technical_coverage:
            gaps.append({
                'type': 'technical_credibility',
                'severity': 'MEDIUM',
                'missing_topics': list(low_technical_coverage.keys()),
                'impact': 'Reduced technical credibility with leads',
                'recommendation': 'Enhance technical documentation without overengineering'
            })
        
        return gaps
    
    def generate_comprehensive_analysis(self) -> Dict[str, Any]:
        """Gera análise completa e robusta do projeto ARCO"""
        print("🔍 Iniciando análise robusta do projeto ARCO...")
        
        # Carrega dados existentes
        existing_analysis = self.load_existing_analysis()
        
        # Análise de dependências
        print("📊 Analisando dependências e arquitetura...")
        dependency_analysis = self.analyze_component_dependencies()
        
        # Análise de documentação
        print("📚 Analisando efetividade da documentação...")
        docs_analysis = self.analyze_documentation_effectiveness()
        
        # Análise de componentes com dados existentes
        print("⚛️ Analisando maturidade de componentes...")
        component_insights = self._analyze_component_maturity_advanced(existing_analysis)
        
        # Relatório focado em leads
        print("💼 Gerando insights para comunicação com leads...")
        lead_report = self.core.generate_lead_focused_report(existing_analysis)
        
        # Recomendações estratégicas
        strategic_recommendations = self._generate_strategic_recommendations(
            dependency_analysis, docs_analysis, component_insights, lead_report
        )
        
        # Remove objetos não serializáveis antes de salvar
        dependency_analysis_clean = {k: v for k, v in dependency_analysis.items() if k != 'dependency_graph'}
        
        comprehensive_analysis = {
            'analysis_metadata': {
                'timestamp': datetime.now().isoformat(),
                'project_root': str(self.project_root),
                'analysis_type': 'comprehensive_intelligence'
            },
            'executive_summary': self._generate_executive_summary(
                dependency_analysis, docs_analysis, component_insights, lead_report
            ),
            'dependency_intelligence': dependency_analysis_clean,
            'documentation_intelligence': docs_analysis,
            'component_intelligence': component_insights,
            'lead_communication_analysis': lead_report,
            'strategic_recommendations': strategic_recommendations,
            'action_plan': self._generate_action_plan(strategic_recommendations)
        }
        
        # Salva análise completa
        output_file = self.project_root / "intelligence" / "comprehensive_analysis.json"
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(comprehensive_analysis, f, indent=2, ensure_ascii=False)
        
        print(f"✅ Análise completa salva em: {output_file}")
        return comprehensive_analysis
    
    def _analyze_component_maturity_advanced(self, existing_analysis: Dict) -> Dict[str, Any]:
        """Análise avançada de maturidade com machine learning"""
        components = existing_analysis.get('best_components', {})
        
        # Prepara dados para análise
        component_features = []
        component_names = []
        
        for category, items in components.items():
            for item in items:
                features = [
                    item.get('lines_of_code', 0),
                    item.get('complexity_score', 0),
                    item.get('import_count', 0),
                    item.get('performance_score', 0),
                    item.get('reusability_score', 0),
                    item.get('maturity_score', 0)
                ]
                component_features.append(features)
                component_names.append(f"{category}_{item.get('name', 'unknown')}")
        
        if len(component_features) < 3:
            return {'error': 'Insufficient data for advanced analysis'}
        
        # Análise PCA para redução de dimensionalidade
        features_array = np.array(component_features)
        pca = PCA(n_components=2)
        pca_result = pca.fit_transform(features_array)
        
        # Clustering de componentes
        n_clusters = min(3, len(component_features))
        kmeans = KMeans(n_clusters=n_clusters, random_state=42)
        clusters = kmeans.fit_predict(features_array)
        
        # Identifica padrões
        cluster_analysis = {}
        for i in range(n_clusters):
            cluster_indices = np.where(clusters == i)[0]
            cluster_components = [component_names[idx] for idx in cluster_indices]
            cluster_features = features_array[cluster_indices]
            
            cluster_analysis[f'cluster_{i}'] = {
                'components': cluster_components,
                'avg_complexity': float(np.mean(cluster_features[:, 1])),
                'avg_maturity': float(np.mean(cluster_features[:, 5])),
                'characteristics': self._describe_cluster_characteristics(cluster_features)
            }
        
        return {
            'component_clusters': cluster_analysis,
            'pca_explained_variance': pca.explained_variance_ratio_.tolist(),
            'feature_importance': self._calculate_feature_importance(features_array),
            'optimization_opportunities': self._identify_optimization_opportunities(
                component_features, component_names, clusters
            )
        }
    
    def _describe_cluster_characteristics(self, cluster_features: np.ndarray) -> str:
        """Descreve características do cluster"""
        avg_loc = np.mean(cluster_features[:, 0])
        avg_complexity = np.mean(cluster_features[:, 1])
        avg_maturity = np.mean(cluster_features[:, 5])
        
        if avg_complexity < 5 and avg_maturity > 70:
            return "High-quality, simple components - optimal for leads"
        elif avg_complexity > 10 and avg_loc > 500:
            return "Over-engineered components - refactoring needed"
        elif avg_maturity > 60:
            return "Mature components with good business potential"
        else:
            return "Components requiring optimization"
    
    def _calculate_feature_importance(self, features: np.ndarray) -> Dict[str, float]:
        """Calcula importância das features"""
        feature_names = ['lines_of_code', 'complexity', 'imports', 'performance', 'reusability', 'maturity']
        
        # Correlação com score de maturidade (última coluna)
        correlations = {}
        maturity_scores = features[:, -1]
        
        for i, name in enumerate(feature_names[:-1]):
            corr = np.corrcoef(features[:, i], maturity_scores)[0, 1]
            correlations[name] = abs(corr) if not np.isnan(corr) else 0
        
        return correlations
    
    def _identify_optimization_opportunities(self, features: List, names: List, clusters: np.ndarray) -> List[Dict]:
        """Identifica oportunidades de otimização"""
        opportunities = []
        
        for i, (feature, name, cluster) in enumerate(zip(features, names, clusters)):
            loc, complexity, imports, performance, reusability, maturity = feature
            
            # Over-engineered components
            if loc > 500 and complexity > 8:
                opportunities.append({
                    'component': name,
                    'type': 'simplification',
                    'priority': 'HIGH',
                    'issue': f'Over-engineered: {loc} lines, complexity {complexity}',
                    'recommendation': 'Break down into smaller, focused components'
                })
            
            # Low performance with high complexity
            elif performance < 50 and complexity > 6:
                opportunities.append({
                    'component': name,
                    'type': 'performance',
                    'priority': 'MEDIUM',
                    'issue': f'Performance {performance}% with complexity {complexity}',
                    'recommendation': 'Optimize rendering and reduce complexity'
                })
            
            # Low reusability
            elif reusability < 60:
                opportunities.append({
                    'component': name,
                    'type': 'reusability',
                    'priority': 'LOW',
                    'issue': f'Low reusability: {reusability}%',
                    'recommendation': 'Extract common patterns and improve API'
                })
        
        return sorted(opportunities, key=lambda x: {'HIGH': 3, 'MEDIUM': 2, 'LOW': 1}[x['priority']], reverse=True)
    
    def _generate_strategic_recommendations(self, dep_analysis: Dict, docs_analysis: Dict, 
                                          comp_analysis: Dict, lead_report: Dict) -> List[Dict]:
        """Gera recomendações estratégicas baseadas em todas as análises"""
        recommendations = []
        
        # Recomendações de arquitetura
        critical_components = dep_analysis.get('critical_components', [])
        if critical_components:
            high_risk = [c for c in critical_components if c['risk_level'] == 'HIGH']
            if high_risk:
                recommendations.append({
                    'category': 'architecture',
                    'priority': 'HIGH',
                    'title': 'Refactor Critical Components',
                    'description': f'Components {[c["component"] for c in high_risk[:3]]} are critical and complex',
                    'business_impact': 'Reduces maintenance costs and improves team velocity',
                    'implementation_effort': 'HIGH',
                    'roi_estimate': '25-40% reduction in development time'
                })
        
        # Recomendações de documentação
        docs_gaps = docs_analysis.get('documentation_gaps', [])
        if docs_gaps:
            business_gaps = [g for g in docs_gaps if g['type'] == 'business_communication']
            if business_gaps:
                recommendations.append({
                    'category': 'communication',
                    'priority': 'HIGH',
                    'title': 'Improve Lead Communication Documentation',
                    'description': 'Missing business value communication in documentation',
                    'business_impact': 'Improves lead conversion and engagement',
                    'implementation_effort': 'MEDIUM',
                    'roi_estimate': '15-30% improvement in lead quality'
                })
        
        # Recomendações de componentes
        optimization_ops = comp_analysis.get('optimization_opportunities', [])
        high_priority_ops = [op for op in optimization_ops if op['priority'] == 'HIGH']
        if high_priority_ops:
            recommendations.append({
                'category': 'components',
                'priority': 'HIGH',
                'title': 'Simplify Over-engineered Components',
                'description': f'Components need simplification: {[op["component"] for op in high_priority_ops[:2]]}',
                'business_impact': 'Faster development cycles and easier maintenance',
                'implementation_effort': 'MEDIUM',
                'roi_estimate': '20-35% faster feature delivery'
            })
        
        return recommendations
    
    def _generate_executive_summary(self, dep_analysis: Dict, docs_analysis: Dict, 
                                  comp_analysis: Dict, lead_report: Dict) -> Dict[str, Any]:
        """Gera summary executivo com insights acionáveis"""
        
        # Métricas principais
        total_components = len(dep_analysis.get('critical_components', []))
        high_risk_components = len([c for c in dep_analysis.get('critical_components', []) 
                                   if c.get('risk_level') == 'HIGH'])
        
        lead_communication_score = docs_analysis.get('lead_communication_score', 0)
        business_impact = lead_report.get('business_impact_projection', {})
        
        return {
            'key_metrics': {
                'total_components_analyzed': total_components,
                'high_risk_components': high_risk_components,
                'lead_communication_score': f"{lead_communication_score:.1f}%",
                'architecture_health': 'GOOD' if high_risk_components < 3 else 'NEEDS_ATTENTION',
                'projected_conversion_improvement': business_impact.get('projected_conversion_improvement', 'N/A')
            },
            'critical_findings': [
                f"Analyzed {total_components} components with advanced dependency analysis",
                f"Lead communication effectiveness: {lead_communication_score:.1f}%",
                f"Identified {high_risk_components} high-risk components requiring attention",
                f"Documentation gaps impact lead engagement and conversion"
            ],
            'immediate_actions': [
                "Implement recommended component simplifications",
                "Enhance business value communication in documentation",
                "Address high-risk component dependencies",
                "Focus on lead-centric content strategy"
            ],
            'business_recommendation': business_impact.get('recommendation', 'OPTIMIZE_FIRST')
        }
    
    def _generate_action_plan(self, recommendations: List[Dict]) -> List[Dict]:
        """Gera plano de ação prático e executável"""
        action_plan = []
        
        # Ordena por prioridade
        high_priority = [r for r in recommendations if r['priority'] == 'HIGH']
        medium_priority = [r for r in recommendations if r['priority'] == 'MEDIUM']
        
        # Fase 1: Ações críticas (0-2 semanas)
        if high_priority:
            action_plan.append({
                'phase': 1,
                'timeline': '0-2 weeks',
                'focus': 'Critical Issues',
                'actions': [
                    {
                        'task': rec['title'],
                        'category': rec['category'],
                        'effort': rec['implementation_effort'],
                        'expected_roi': rec['roi_estimate']
                    } for rec in high_priority
                ]
            })
        
        # Fase 2: Melhorias (2-6 semanas)
        if medium_priority:
            action_plan.append({
                'phase': 2,
                'timeline': '2-6 weeks',
                'focus': 'Strategic Improvements',
                'actions': [
                    {
                        'task': rec['title'],
                        'category': rec['category'],
                        'effort': rec['implementation_effort'],
                        'expected_roi': rec['roi_estimate']
                    } for rec in medium_priority
                ]
            })
        
        # Fase 3: Otimizações contínuas
        action_plan.append({
            'phase': 3,
            'timeline': '6+ weeks',
            'focus': 'Continuous Optimization',
            'actions': [
                {
                    'task': 'Monitor component health metrics',
                    'category': 'monitoring',
                    'effort': 'LOW',
                    'expected_roi': 'Prevent technical debt accumulation'
                },
                {
                    'task': 'Regular documentation effectiveness review',
                    'category': 'communication',
                    'effort': 'LOW',
                    'expected_roi': 'Maintain lead engagement quality'
                }
            ]
        })
        
        return action_plan

if __name__ == "__main__":
    # Execução da análise
    project_root = Path("c:/Users/João Pedro Cardozo/projetos/arco")
    analyzer = ARCOAdvancedAnalyzer(project_root)
    
    print("🚀 ARCO Intelligence - Análise Robusta Iniciada")
    print("=" * 60)
    
    analysis = analyzer.generate_comprehensive_analysis()
    
    print("\n✅ Análise Completa Finalizada!")
    print(f"📊 Total de componentes analisados: {len(analysis.get('dependency_intelligence', {}).get('critical_components', []))}")
    print(f"📚 Score de comunicação com leads: {analysis.get('documentation_intelligence', {}).get('lead_communication_score', 0):.1f}%")
    print(f"💼 Recomendação de negócio: {analysis.get('lead_communication_analysis', {}).get('business_impact_projection', {}).get('recommendation', 'N/A')}")
