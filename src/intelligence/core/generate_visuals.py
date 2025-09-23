"""
Script principal para gerar visualizações completas do ARCO Intelligence
"""

import json
from pathlib import Path
from visualizations import ARCOVisualizationEngine

def main():
    # Carrega dados da análise
    analysis_file = Path("intelligence/comprehensive_analysis.json")
    
    if not analysis_file.exists():
        print("❌ Arquivo de análise não encontrado. Execute analyzer.py primeiro.")
        return
    
    print("📊 Carregando dados da análise...")
    with open(analysis_file, 'r', encoding='utf-8') as f:
        analysis_data = json.load(f)
    
    # Cria engine de visualizações
    viz_engine = ARCOVisualizationEngine(analysis_data)
    
    print("🎨 Gerando visualizações executivas...")
    
    # Gera relatório visual completo
    report_files = viz_engine.generate_complete_visual_report()
    
    print("\n" + "="*60)
    print("✅ RELATÓRIO VISUAL COMPLETO GERADO!")
    print("="*60)
    
    for report_type, file_path in report_files.items():
        if isinstance(file_path, str):
            print(f"📋 {report_type.replace('_', ' ').title()}: {file_path}")
        elif isinstance(file_path, list):
            print(f"📊 {report_type.replace('_', ' ').title()}: {len(file_path)} visualizações")
    
    # Summary dos insights principais
    exec_summary = analysis_data.get('executive_summary', {})
    key_metrics = exec_summary.get('key_metrics', {})
    
    print("\n" + "="*60)
    print("🎯 INSIGHTS PRINCIPAIS PARA LEADS")
    print("="*60)
    print(f"🏗️  Componentes analisados: {key_metrics.get('total_components_analyzed', 'N/A')}")
    print(f"📈 Score comunicação: {key_metrics.get('lead_communication_score', 'N/A')}")
    print(f"🏥 Saúde arquitetura: {key_metrics.get('architecture_health', 'N/A')}")
    print(f"📊 Melhoria conversão: {key_metrics.get('projected_conversion_improvement', 'N/A')}")
    
    recommendations = analysis_data.get('strategic_recommendations', [])
    if recommendations:
        print(f"\n🎯 RECOMENDAÇÕES ESTRATÉGICAS ({len(recommendations)} itens):")
        for i, rec in enumerate(recommendations[:3], 1):
            priority = rec.get('priority', 'MEDIUM')
            title = rec.get('title', 'Unknown')
            roi = rec.get('roi_estimate', 'TBD')
            print(f"   {i}. [{priority}] {title} - ROI: {roi}")
    
    print(f"\n🌐 Acesse o relatório completo: {report_files.get('index', 'N/A')}")

if __name__ == "__main__":
    main()
