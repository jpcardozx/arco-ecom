#!/usr/bin/env python3
"""
🎨 ARCO UI/UX OPTIMIZATION ANALYZER
Preserva bom trabalho, otimiza workflow UI/UX
"""

import os
from pathlib import Path
import re

def analyze_ui_components():
    """Analisa componentes UI para identificar qualidade e otimização"""
    print("🎨 ANÁLISE DE COMPONENTES UI/UX")
    print("=" * 40)
    
    src = Path("src")
    ui_locations = {
        'design-system': [],
        'components/ui': [],
        'components/layout': [],
        'components/sections': [],
        'app': []
    }
    
    # Find all UI components
    for root, dirs, files in os.walk(src):
        for file in files:
            if file.endswith('.tsx') and file[0].isupper():
                rel_path = os.path.relpath(root, src)
                component_path = os.path.join(root, file)
                
                # Categorize by location
                if 'design-system' in rel_path:
                    ui_locations['design-system'].append((file, component_path))
                elif 'components/ui' in rel_path:
                    ui_locations['components/ui'].append((file, component_path))
                elif 'components/layout' in rel_path:
                    ui_locations['components/layout'].append((file, component_path))
                elif 'components/sections' in rel_path:
                    ui_locations['components/sections'].append((file, component_path))
                elif 'app' in rel_path:
                    ui_locations['app'].append((file, component_path))
    
    print(f"📊 DISTRIBUIÇÃO DE COMPONENTES UI:")
    for location, components in ui_locations.items():
        if components:
            print(f"  📁 {location}: {len(components)} componentes")
            for comp_name, _ in components[:3]:
                print(f"    📄 {comp_name}")
            if len(components) > 3:
                print(f"    ... +{len(components)-3} mais")
    
    return ui_locations

def analyze_component_quality(file_path):
    """Analisa qualidade de um componente"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        quality_score = 0
        features = []
        
        # Check for modern React patterns
        if 'forwardRef' in content:
            quality_score += 10
            features.append("forwardRef")
        
        if 'useMemo' in content or 'useCallback' in content:
            quality_score += 15
            features.append("performance hooks")
        
        # Check for TypeScript
        if ': React.' in content or 'interface ' in content or 'type ' in content:
            quality_score += 20
            features.append("TypeScript")
        
        # Check for accessibility
        if 'aria-' in content or 'role=' in content:
            quality_score += 15
            features.append("accessibility")
        
        # Check for styling approach
        if 'className' in content:
            quality_score += 10
            features.append("Tailwind/CSS")
        
        # Check for animations
        if 'framer-motion' in content or 'motion.' in content:
            quality_score += 10
            features.append("animations")
        
        # Check for reusability
        if 'Props' in content and 'export' in content:
            quality_score += 15
            features.append("reusable")
        
        # Check for complexity (negative for overly complex)
        lines = content.split('\n')
        if len(lines) > 200:
            quality_score -= 10
            features.append("complex")
        elif len(lines) < 50:
            quality_score += 5
            features.append("clean")
        
        return quality_score, features
        
    except Exception:
        return 0, []

def identify_high_quality_components():
    """Identifica componentes de alta qualidade para preservar"""
    print("\n🏆 COMPONENTES DE ALTA QUALIDADE")
    print("-" * 35)
    
    ui_locations = analyze_ui_components()
    high_quality = []
    medium_quality = []
    low_quality = []
    
    for location, components in ui_locations.items():
        for comp_name, comp_path in components:
            score, features = analyze_component_quality(comp_path)
            
            component_info = {
                'name': comp_name,
                'location': location,
                'path': comp_path,
                'score': score,
                'features': features
            }
            
            if score >= 60:
                high_quality.append(component_info)
            elif score >= 30:
                medium_quality.append(component_info)
            else:
                low_quality.append(component_info)
    
    print(f"🏆 ALTA QUALIDADE ({len(high_quality)}):")
    for comp in sorted(high_quality, key=lambda x: x['score'], reverse=True)[:5]:
        print(f"  ✅ {comp['name']} (score: {comp['score']})")
        print(f"     📁 {comp['location']}")
        print(f"     🎯 Features: {', '.join(comp['features'])}")
    
    print(f"\n⚡ MÉDIA QUALIDADE ({len(medium_quality)}):")
    for comp in sorted(medium_quality, key=lambda x: x['score'], reverse=True)[:3]:
        print(f"  🔧 {comp['name']} (score: {comp['score']})")
        print(f"     📁 {comp['location']}")
    
    print(f"\n⚠️ BAIXA QUALIDADE ({len(low_quality)}):")
    for comp in low_quality[:3]:
        print(f"  🗑️ {comp['name']} (score: {comp['score']})")
        print(f"     📁 {comp['location']}")
    
    return high_quality, medium_quality, low_quality

def create_ui_optimization_plan():
    """Cria plano de otimização UI/UX preservando bom trabalho"""
    print("\n🎯 PLANO DE OTIMIZAÇÃO UI/UX")
    print("=" * 35)
    
    high_quality, medium_quality, low_quality = identify_high_quality_components()
    
    print("FASE 1: PRESERVAR COMPONENTES VALIOSOS")
    print("  ✅ Manter componentes alta qualidade (score ≥60)")
    print("  🔧 Melhorar componentes média qualidade (score 30-59)")
    print("  🗑️ Remover/refatorar baixa qualidade (score <30)")
    
    print("\nFASE 2: CONSOLIDAR ESTRUTURA UI")
    print("  📦 design-system/ → primitivos reutilizáveis")
    print("  🎨 components/ui/ → componentes compostos") 
    print("  📐 components/layout/ → estruturas de página")
    print("  🚀 components/sections/ → seções específicas")
    
    print("\nFASE 3: OTIMIZAR WORKFLOW")
    print("  📋 Criar index.ts unificados")
    print("  🎯 Padronizar props interfaces")
    print("  ⚡ Otimizar performance (lazy loading)")
    print("  📚 Documentar componentes principais")
    
    print("\nFOCO UI/UX:")
    print("  🎨 Manter componentes visuais de qualidade")
    print("  ♿ Preservar acessibilidade implementada")
    print("  📱 Manter responsividade")
    print("  ✨ Preservar animações bem feitas")
    
    return {
        'preserve': [comp['path'] for comp in high_quality],
        'improve': [comp['path'] for comp in medium_quality],
        'remove': [comp['path'] for comp in low_quality]
    }

def create_index_exports():
    """Cria exports organizados para melhor workflow"""
    print("\n📋 CRIANDO EXPORTS ORGANIZADOS")
    print("-" * 30)
    
    # Design System index
    ds_index_content = '''/**
 * 🎨 ARCO Design System
 * Componentes primitivos reutilizáveis
 */

// Primitivos base
export * from './primitives';

// Core design tokens
export * from './core';

// Hooks utilitários
export * from './hooks';

// Fundações (tokens, themes)
export * from './foundations';
'''
    
    ds_index_path = Path("src/design-system/index.ts")
    with open(ds_index_path, 'w', encoding='utf-8') as f:
        f.write(ds_index_content)
    
    print("✅ Criado design-system/index.ts")
    
    # Components UI index
    ui_index_content = '''/**
 * 🎨 ARCO UI Components
 * Componentes compostos da aplicação
 */

// Layout components
export * from './layout';

// UI components (shadcn style)
export * from './ui';

// Business components
export * from './partner';
'''
    
    ui_index_path = Path("src/components/index.ts")
    with open(ui_index_path, 'w', encoding='utf-8') as f:
        f.write(ui_index_content)
    
    print("✅ Criado components/index.ts")

if __name__ == "__main__":
    print("🎨 ARCO UI/UX OPTIMIZATION")
    print("=" * 30)
    print("Preservando bom trabalho, otimizando workflow")
    print()
    
    optimization_plan = create_ui_optimization_plan()
    create_index_exports()
    
    print(f"\n📊 RESUMO DA ANÁLISE:")
    print(f"🏆 Componentes a preservar: {len(optimization_plan['preserve'])}")
    print(f"🔧 Componentes a melhorar: {len(optimization_plan['improve'])}")
    print(f"🗑️ Componentes a remover: {len(optimization_plan['remove'])}")
    
    print(f"\n🎯 PRÓXIMOS PASSOS:")
    print("1. Executar otimização preservando componentes valiosos")
    print("2. Melhorar workflow com exports organizados")
    print("3. Focar em UX sem perder funcionalidades")
