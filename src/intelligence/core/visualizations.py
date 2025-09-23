"""
ARCO Intelligence Visualizations - Dashboards para Leads Críticos
Visualizações profissionais focadas em comunicação de valor
"""

import matplotlib.pyplot as plt
import seaborn as sns
import plotly.graph_objects as go
import plotly.express as px
from plotly.subplots import make_subplots
import pandas as pd
import numpy as np
from pathlib import Path
import json
from typing import Dict, List, Any
from datetime import datetime

# Configuração de estilo profissional
plt.style.use('seaborn-v0_8')
sns.set_palette("husl")

class ARCOVisualizationEngine:
    """Engine de visualizações para análises ARCO"""
    
    def __init__(self, analysis_data: Dict):
        self.data = analysis_data
        self.output_dir = Path("intelligence/visualizations")
        self.output_dir.mkdir(exist_ok=True)
        
        # Cores corporativas
        self.color_palette = {
            'primary': '#2E86AB',
            'secondary': '#A23B72', 
            'success': '#F18F01',
            'warning': '#C73E1D',
            'neutral': '#6C757D'
        }
    
    def create_executive_dashboard(self) -> str:
        """Cria dashboard executivo para apresentação a leads"""
        
        # Dados principais
        exec_summary = self.data.get('executive_summary', {})
        key_metrics = exec_summary.get('key_metrics', {})
        
        # Subplot com múltiplas visualizações
        fig = make_subplots(
            rows=2, cols=2,
            subplot_titles=(
                'Component Health Overview',
                'Lead Communication Effectiveness', 
                'Risk Distribution',
                'ROI Projection'
            ),
            specs=[[{"type": "indicator"}, {"type": "bar"}],
                   [{"type": "pie"}, {"type": "scatter"}]]
        )
        
        # 1. Component Health Indicator
        total_components = key_metrics.get('total_components_analyzed', 0)
        health_score = 85 if key_metrics.get('architecture_health') == 'GOOD' else 45
        
        fig.add_trace(
            go.Indicator(
                mode="gauge+number+delta",
                value=health_score,
                title={'text': "Architecture Health"},
                gauge={'axis': {'range': [None, 100]},
                       'bar': {'color': self.color_palette['primary']},
                       'steps': [
                           {'range': [0, 50], 'color': self.color_palette['warning']},
                           {'range': [50, 80], 'color': self.color_palette['neutral']},
                           {'range': [80, 100], 'color': self.color_palette['success']}
                       ]},
                domain={'x': [0, 1], 'y': [0, 1]}
            ),
            row=1, col=1
        )
        
        # 2. Lead Communication Score
        comm_score = float(key_metrics.get('lead_communication_score', '0').replace('%', ''))
        
        fig.add_trace(
            go.Bar(
                x=['Current Score', 'Target Score'],
                y=[comm_score, 85],
                marker_color=[self.color_palette['secondary'], self.color_palette['success']],
                text=[f'{comm_score:.1f}%', '85%'],
                textposition='auto',
            ),
            row=1, col=2
        )
        
        # 3. Risk Distribution
        high_risk = key_metrics.get('high_risk_components', 0)
        medium_risk = max(0, total_components - high_risk - 2)  # Estimate
        low_risk = max(2, total_components - high_risk - medium_risk)
        
        fig.add_trace(
            go.Pie(
                labels=['Low Risk', 'Medium Risk', 'High Risk'],
                values=[low_risk, medium_risk, high_risk],
                marker_colors=[self.color_palette['success'], 
                              self.color_palette['neutral'], 
                              self.color_palette['warning']]
            ),
            row=2, col=1
        )
        
        # 4. ROI Projection
        recommendations = self.data.get('strategic_recommendations', [])
        if recommendations:
            roi_data = []
            effort_data = []
            names = []
            
            for rec in recommendations[:5]:  # Top 5
                roi_text = rec.get('roi_estimate', '0%')
                roi_value = float(re.findall(r'(\d+)', roi_text)[0]) if re.findall(r'(\d+)', roi_text) else 0
                effort_map = {'LOW': 1, 'MEDIUM': 2, 'HIGH': 3}
                effort_value = effort_map.get(rec.get('implementation_effort', 'MEDIUM'), 2)
                
                roi_data.append(roi_value)
                effort_data.append(effort_value)
                names.append(rec.get('title', 'Unknown')[:20] + '...')
            
            fig.add_trace(
                go.Scatter(
                    x=effort_data,
                    y=roi_data,
                    mode='markers+text',
                    text=names,
                    textposition='top center',
                    marker=dict(
                        size=[r*2 for r in roi_data],
                        color=roi_data,
                        colorscale='Viridis',
                        showscale=True
                    )
                ),
                row=2, col=2
            )
        
        # Layout executivo
        fig.update_layout(
            title={
                'text': 'ARCO Project - Executive Intelligence Dashboard',
                'x': 0.5,
                'font': {'size': 20, 'color': self.color_palette['primary']}
            },
            height=800,
            showlegend=False,
            template='plotly_white'
        )
        
        # Salva dashboard
        output_file = self.output_dir / "executive_dashboard.html"
        fig.write_html(str(output_file))
        
        return str(output_file)
    
    def create_component_analysis_charts(self) -> List[str]:
        """Cria gráficos detalhados de análise de componentes"""
        charts = []
        
        # 1. Component Maturity vs Complexity
        comp_intelligence = self.data.get('component_intelligence', {})
        clusters = comp_intelligence.get('component_clusters', {})
        
        if clusters:
            # Prepara dados para scatter plot
            components_data = []
            for cluster_name, cluster_data in clusters.items():
                for comp in cluster_data.get('components', []):
                    components_data.append({
                        'component': comp,
                        'complexity': cluster_data.get('avg_complexity', 0),
                        'maturity': cluster_data.get('avg_maturity', 0),
                        'cluster': cluster_name,
                        'characteristics': cluster_data.get('characteristics', '')
                    })
            
            df = pd.DataFrame(components_data)
            
            fig = px.scatter(
                df, 
                x='complexity', 
                y='maturity',
                color='cluster',
                size=[20] * len(df),  # Tamanho uniforme
                hover_data=['component', 'characteristics'],
                title='Component Maturity vs Complexity Analysis',
                labels={
                    'complexity': 'Complexity Score',
                    'maturity': 'Maturity Score (%)',
                    'cluster': 'Component Cluster'
                }
            )
            
            # Adiciona linhas de referência
            fig.add_hline(y=70, line_dash="dash", line_color="green", 
                         annotation_text="Target Maturity (70%)")
            fig.add_vline(x=8, line_dash="dash", line_color="red", 
                         annotation_text="Complexity Threshold")
            
            fig.update_layout(
                template='plotly_white',
                height=600,
                font={'size': 12}
            )
            
            output_file = self.output_dir / "component_maturity_analysis.html"
            fig.write_html(str(output_file))
            charts.append(str(output_file))
        
        # 2. Dependency Network Visualization
        dep_intelligence = self.data.get('dependency_intelligence', {})
        critical_components = dep_intelligence.get('critical_components', [])
        
        if critical_components:
            # Top 10 componentes críticos
            top_critical = critical_components[:10]
            
            df_critical = pd.DataFrame(top_critical)
            
            fig = go.Figure()
            
            # Scatter plot com tamanhos baseados em criticidade
            fig.add_trace(go.Scatter(
                x=df_critical['centrality'],
                y=df_critical['betweenness'], 
                mode='markers+text',
                marker=dict(
                    size=df_critical['criticality_score'] * 50,
                    color=df_critical['complexity'],
                    colorscale='RdYlBu_r',
                    showscale=True,
                    colorbar=dict(title="Complexity")
                ),
                text=df_critical['component'],
                textposition='top center',
                hovertemplate='<b>%{text}</b><br>' +
                             'Centrality: %{x:.3f}<br>' +
                             'Betweenness: %{y:.3f}<br>' +
                             'Risk: %{marker.color}<br>' +
                             '<extra></extra>'
            ))
            
            fig.update_layout(
                title='Critical Components - Network Analysis',
                xaxis_title='Centrality Score',
                yaxis_title='Betweenness Score',
                template='plotly_white',
                height=600
            )
            
            output_file = self.output_dir / "dependency_network.html"
            fig.write_html(str(output_file))
            charts.append(str(output_file))
        
        return charts
    
    def create_documentation_effectiveness_report(self) -> str:
        """Cria relatório visual de efetividade da documentação"""
        
        docs_intelligence = self.data.get('documentation_intelligence', {})
        doc_analysis = docs_intelligence.get('document_analysis', [])
        
        if not doc_analysis:
            return ""
        
        df_docs = pd.DataFrame(doc_analysis)
        
        # Subplot com múltiplas métricas
        fig = make_subplots(
            rows=2, cols=2,
            subplot_titles=(
                'Readability Distribution',
                'Business Value vs Executive Appeal',
                'Documentation Quality by File',
                'Conversion Potential Analysis'
            )
        )
        
        # 1. Readability Distribution
        fig.add_trace(
            go.Histogram(
                x=df_docs['readability'],
                nbinsx=10,
                marker_color=self.color_palette['primary'],
                name='Readability'
            ),
            row=1, col=1
        )
        
        # 2. Business Value vs Executive Appeal
        fig.add_trace(
            go.Scatter(
                x=df_docs['business_value'],
                y=df_docs['executive_appeal'],
                mode='markers+text',
                text=df_docs['file'],
                textposition='top center',
                marker=dict(
                    size=df_docs['word_count']/50,
                    color=df_docs['conversion_potential'],
                    colorscale='Viridis',
                    showscale=True
                ),
                name='Documents'
            ),
            row=1, col=2
        )
        
        # 3. Quality by File (Top 10)
        top_docs = df_docs.nlargest(10, 'executive_appeal')
        
        fig.add_trace(
            go.Bar(
                x=top_docs['executive_appeal'],
                y=[f[:20] + '...' for f in top_docs['file']],
                orientation='h',
                marker_color=self.color_palette['success'],
                name='Quality Score'
            ),
            row=2, col=1
        )
        
        # 4. Conversion Potential
        fig.add_trace(
            go.Box(
                y=df_docs['conversion_potential'],
                marker_color=self.color_palette['secondary'],
                name='Conversion Potential'
            ),
            row=2, col=2
        )
        
        fig.update_layout(
            title='Documentation Effectiveness Analysis',
            height=800,
            template='plotly_white',
            showlegend=False
        )
        
        output_file = self.output_dir / "documentation_effectiveness.html"
        fig.write_html(str(output_file))
        
        return str(output_file)
    
    def create_strategic_roadmap_visual(self) -> str:
        """Cria visualização do roadmap estratégico"""
        
        action_plan = self.data.get('action_plan', [])
        
        if not action_plan:
            return ""
        
        # Prepara dados para Gantt chart
        gantt_data = []
        
        for phase in action_plan:
            phase_num = phase.get('phase', 1)
            timeline = phase.get('timeline', '')
            actions = phase.get('actions', [])
            
            for i, action in enumerate(actions):
                gantt_data.append({
                    'Task': action.get('task', 'Unknown'),
                    'Start': f'2025-01-{phase_num:02d}',
                    'Finish': f'2025-{phase_num + 1:02d}-15',
                    'Phase': f"Phase {phase_num}",
                    'Category': action.get('category', 'general'),
                    'Effort': action.get('effort', 'MEDIUM'),
                    'ROI': action.get('expected_roi', 'TBD')
                })
        
        df_gantt = pd.DataFrame(gantt_data)
        
        # Cria Gantt chart
        fig = px.timeline(
            df_gantt,
            x_start='Start',
            x_end='Finish', 
            y='Task',
            color='Category',
            title='ARCO Strategic Implementation Roadmap',
            hover_data=['Effort', 'ROI']
        )
        
        fig.update_layout(
            height=600,
            template='plotly_white',
            xaxis_title='Timeline',
            yaxis_title='Strategic Actions'
        )
        
        output_file = self.output_dir / "strategic_roadmap.html"
        fig.write_html(str(output_file))
        
        return str(output_file)
    
    def generate_complete_visual_report(self) -> Dict[str, str]:
        """Gera relatório visual completo"""
        
        print("📊 Gerando visualizações executivas...")
        
        report_files = {}
        
        # Dashboard executivo
        exec_dashboard = self.create_executive_dashboard()
        if exec_dashboard:
            report_files['executive_dashboard'] = exec_dashboard
            print(f"✅ Dashboard executivo: {exec_dashboard}")
        
        # Análise de componentes
        component_charts = self.create_component_analysis_charts()
        if component_charts:
            report_files['component_analysis'] = component_charts
            print(f"✅ Análise de componentes: {len(component_charts)} gráficos")
        
        # Efetividade da documentação
        docs_report = self.create_documentation_effectiveness_report()
        if docs_report:
            report_files['documentation_analysis'] = docs_report
            print(f"✅ Análise de documentação: {docs_report}")
        
        # Roadmap estratégico
        roadmap_visual = self.create_strategic_roadmap_visual()
        if roadmap_visual:
            report_files['strategic_roadmap'] = roadmap_visual
            print(f"✅ Roadmap estratégico: {roadmap_visual}")
        
        # Cria índice HTML
        index_file = self._create_visual_index(report_files)
        report_files['index'] = index_file
        
        print(f"📋 Relatório visual completo: {index_file}")
        
        return report_files
    
    def _create_visual_index(self, report_files: Dict[str, str]) -> str:
        """Cria página índice para navegação"""
        
        html_content = f"""
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>ARCO Intelligence - Visual Report</title>
            <style>
                body {{
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                    margin: 0;
                    padding: 20px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: #333;
                }}
                .container {{
                    max-width: 1200px;
                    margin: 0 auto;
                    background: white;
                    border-radius: 10px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                    overflow: hidden;
                }}
                .header {{
                    background: {self.color_palette['primary']};
                    color: white;
                    padding: 40px;
                    text-align: center;
                }}
                .header h1 {{
                    margin: 0;
                    font-size: 2.5em;
                    font-weight: 300;
                }}
                .subtitle {{
                    margin: 10px 0 0 0;
                    opacity: 0.9;
                    font-size: 1.2em;
                }}
                .grid {{
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 20px;
                    padding: 40px;
                }}
                .card {{
                    background: white;
                    border-radius: 8px;
                    padding: 30px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    border-left: 4px solid {self.color_palette['secondary']};
                    transition: transform 0.2s, box-shadow 0.2s;
                }}
                .card:hover {{
                    transform: translateY(-5px);
                    box-shadow: 0 8px 15px rgba(0,0,0,0.2);
                }}
                .card h3 {{
                    margin: 0 0 15px 0;
                    color: {self.color_palette['primary']};
                    font-size: 1.4em;
                }}
                .card p {{
                    color: #666;
                    line-height: 1.6;
                    margin-bottom: 20px;
                }}
                .btn {{
                    display: inline-block;
                    background: {self.color_palette['success']};
                    color: white;
                    padding: 12px 24px;
                    text-decoration: none;
                    border-radius: 5px;
                    font-weight: 500;
                    transition: background 0.2s;
                }}
                .btn:hover {{
                    background: #d67e00;
                }}
                .footer {{
                    background: #f8f9fa;
                    padding: 20px;
                    text-align: center;
                    color: #666;
                    border-top: 1px solid #eee;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>ARCO Intelligence Report</h1>
                    <p class="subtitle">Advanced Analytics for Strategic Decision Making</p>
                    <p style="margin-top: 20px; opacity: 0.8;">Generated: {datetime.now().strftime('%B %d, %Y at %H:%M')}</p>
                </div>
                
                <div class="grid">
        """
        
        # Cards para cada relatório
        cards_data = [
            {
                'title': 'Executive Dashboard',
                'description': 'High-level overview with key metrics, health indicators, and ROI projections for executive decision making.',
                'file': 'executive_dashboard'
            },
            {
                'title': 'Component Analysis',
                'description': 'Detailed technical analysis of component maturity, complexity, and dependency relationships.',
                'file': 'component_analysis'
            },
            {
                'title': 'Documentation Effectiveness',
                'description': 'Analysis of documentation quality, readability, and effectiveness for lead communication.',
                'file': 'documentation_analysis'
            },
            {
                'title': 'Strategic Roadmap',
                'description': 'Visual implementation timeline with prioritized actions and expected business impact.',
                'file': 'strategic_roadmap'
            }
        ]
        
        for card in cards_data:
            file_key = card['file']
            if file_key in report_files:
                file_ref = report_files[file_key]
                
                # Handle both single files and lists of files
                if isinstance(file_ref, list) and file_ref:
                    file_path = Path(file_ref[0]).name
                elif isinstance(file_ref, str):
                    file_path = Path(file_ref).name
                else:
                    continue
                    
                html_content += f"""
                    <div class="card">
                        <h3>{card['title']}</h3>
                        <p>{card['description']}</p>
                        <a href="{file_path}" class="btn" target="_blank">View Report →</a>
                    </div>
                """
        
        html_content += """
                </div>
                
                <div class="footer">
                    <p><strong>ARCO Intelligence System</strong> - Advanced analytics for strategic project optimization</p>
                    <p>This report provides data-driven insights to improve lead communication and business outcomes.</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        index_file = self.output_dir / "index.html"
        index_file.write_text(html_content, encoding='utf-8')
        
        return str(index_file)

# Importação condicional para evitar erros
try:
    import re
except ImportError:
    pass
