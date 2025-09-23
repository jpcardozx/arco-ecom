#!/usr/bin/env python3
"""
🔍 ARCO COMPLETE PROJECT ANALYZER
Analisa RAIZ + SRC + hierarquia completa
"""

import os
from pathlib import Path

def analyze_root_pollution():
    """Analisa poluição na raiz do projeto"""
    print("🚨 ANÁLISE DA RAIZ DO PROJETO")
    print("=" * 40)
    
    base = Path(".")
    items = list(base.iterdir())
    
    files = [item for item in items if item.is_file()]
    folders = [item for item in items if item.is_dir()]
    
    print(f"📊 RAIZ: {len(files)} arquivos + {len(folders)} pastas = {len(items)} itens")
    
    # Categorize files
    config_files = []
    docs_files = []
    junk_files = []
    essential_files = []
    
    for file in files:
        name = file.name.lower()
        if any(x in name for x in ['config', '.json', '.js', '.ts', '.mjs']):
            config_files.append(file.name)
        elif any(x in name for x in ['readme', '.md', 'changelog']):
            docs_files.append(file.name)
        elif any(x in name for x in ['.env', '.log', '.tmp', 'desktop.ini']):
            junk_files.append(file.name)
        else:
            essential_files.append(file.name)
    
    print(f"\n📄 ARQUIVOS NA RAIZ:")
    print(f"  ⚙️ Configs: {len(config_files)}")
    print(f"  📚 Docs: {len(docs_files)}")
    print(f"  🗑️ Lixo: {len(junk_files)}")
    print(f"  📋 Outros: {len(essential_files)}")
    
    if len(junk_files) > 0:
        print(f"\n🗑️ LIXO IDENTIFICADO:")
        for junk in junk_files[:5]:
            print(f"    🗑️ {junk}")
    
    # Categorize folders
    essential_folders = ['src', 'public', 'node_modules', '.git']
    junk_folders = []
    questionable_folders = []
    
    for folder in folders:
        name = folder.name
        if name in essential_folders:
            continue
        elif name.startswith('.') or name in ['docs', 'scripts', 'patches', 'maintenance']:
            questionable_folders.append(name)
        else:
            junk_folders.append(name)
    
    print(f"\n📁 PASTAS NA RAIZ:")
    print(f"  ✅ Essenciais: {len([f for f in folders if f.name in essential_folders])}")
    print(f"  ⚠️ Questionáveis: {len(questionable_folders)}")
    print(f"  🗑️ Desnecessárias: {len(junk_folders)}")
    
    if questionable_folders:
        print(f"\n⚠️ PASTAS QUESTIONÁVEIS:")
        for folder in questionable_folders:
            print(f"    📁 {folder}")
    
    if junk_folders:
        print(f"\n🗑️ PASTAS DESNECESSÁRIAS:")
        for folder in junk_folders:
            print(f"    📁 {folder}")
    
    return {
        'total_items': len(items),
        'junk_files': len(junk_files),
        'junk_folders': len(junk_folders),
        'questionable_folders': len(questionable_folders)
    }

def analyze_component_hierarchy():
    """Analisa hierarquia de componentes mal organizados"""
    print("\n🔍 ANÁLISE DE HIERARQUIA DE COMPONENTES")
    print("=" * 45)
    
    src = Path("src")
    component_locations = {}
    
    # Find all component files
    for root, dirs, files in os.walk(src):
        for file in files:
            if file.endswith('.tsx') and file[0].isupper():  # Component files
                rel_path = os.path.relpath(root, src)
                if rel_path not in component_locations:
                    component_locations[rel_path] = []
                component_locations[rel_path].append(file)
    
    print(f"📊 COMPONENTES ESPALHADOS EM {len(component_locations)} LOCAIS:")
    
    hierarchy_issues = []
    
    for location, components in component_locations.items():
        if location == '.':
            location = 'src/'
        else:
            location = f'src/{location}'
            
        print(f"\n📁 {location}: {len(components)} componentes")
        
        # Show first few components
        for comp in sorted(components)[:3]:
            print(f"    📄 {comp}")
        if len(components) > 3:
            print(f"    ... +{len(components)-3} mais")
        
        # Flag hierarchy issues
        if len(components) > 10:
            hierarchy_issues.append(f"MUITOS COMPONENTES: {location} ({len(components)})")
        
        if 'sections' in location and len(components) > 5:
            hierarchy_issues.append(f"SECTIONS INCHADO: {location}")
    
    # Check for duplicates across locations
    all_components = {}
    for location, components in component_locations.items():
        for comp in components:
            base_name = comp.replace('.tsx', '')
            if base_name not in all_components:
                all_components[base_name] = []
            all_components[base_name].append(location)
    
    duplicates = {name: locations for name, locations in all_components.items() if len(locations) > 1}
    
    if duplicates:
        print(f"\n🔄 COMPONENTES DUPLICADOS:")
        for comp_name, locations in duplicates.items():
            print(f"  📄 {comp_name}: {len(locations)} locais")
            for loc in locations:
                print(f"    📁 src/{loc}")
    
    if hierarchy_issues:
        print(f"\n⚠️ PROBLEMAS DE HIERARQUIA:")
        for issue in hierarchy_issues:
            print(f"  ⚠️ {issue}")
    
    return {
        'component_locations': len(component_locations),
        'duplicates': len(duplicates),
        'hierarchy_issues': len(hierarchy_issues)
    }

def analyze_deep_nesting():
    """Analisa aninhamento excessivo"""
    print("\n📊 ANÁLISE DE ANINHAMENTO PROFUNDO")
    print("=" * 35)
    
    src = Path("src")
    deep_paths = []
    max_depth = 0
    
    for root, dirs, files in os.walk(src):
        depth = root.replace(str(src), '').count(os.sep)
        max_depth = max(max_depth, depth)
        
        if depth > 3:  # More than 3 levels deep
            deep_paths.append((root, depth))
    
    print(f"📏 Profundidade máxima: {max_depth} níveis")
    print(f"⚠️ Caminhos muito profundos (>3): {len(deep_paths)}")
    
    if deep_paths:
        print(f"\n🔍 CAMINHOS PROFUNDOS:")
        for path, depth in sorted(deep_paths, key=lambda x: x[1], reverse=True)[:5]:
            rel_path = path.replace(str(src), 'src')
            print(f"  📁 {rel_path} (nível {depth})")
    
    return {'deep_paths': len(deep_paths), 'max_depth': max_depth}

def create_cleanup_plan():
    """Cria plano de limpeza baseado na análise"""
    print("\n🎯 PLANO DE LIMPEZA ESTRATÉGICO")
    print("=" * 35)
    
    print("FASE 1: RAIZ")
    print("  🗑️ Remover arquivos .env, .log, temporários")
    print("  📁 Consolidar docs/, scripts/ em pasta única")
    print("  ⚙️ Manter apenas configs essenciais")
    
    print("\nFASE 2: HIERARQUIA DE COMPONENTES")
    print("  🔄 Eliminar duplicações entre locations")
    print("  📦 Consolidar sections/ em components/")
    print("  🎯 Criar estrutura: primitives/ → composites/ → pages/")
    
    print("\nFASE 3: ESTRUTURA SRC/")
    print("  📁 Achatar aninhamento >3 níveis")
    print("  🗑️ Remover pastas com 1-2 arquivos")
    print("  🎯 Meta final: 15-20 pastas em src/")
    
    print("\nMETA FINAL:")
    print("  📊 Raiz: ≤25 itens (configs + essenciais)")
    print("  📁 src/: ≤20 pastas organizadas")
    print("  🔄 Zero duplicações de componentes")

if __name__ == "__main__":
    print("🔍 ARCO COMPLETE PROJECT ANALYSIS")
    print("=" * 45)
    
    root_metrics = analyze_root_pollution()
    component_metrics = analyze_component_hierarchy()
    nesting_metrics = analyze_deep_nesting()
    create_cleanup_plan()
    
    # Overall assessment
    total_issues = (root_metrics['junk_files'] + 
                   root_metrics['junk_folders'] + 
                   component_metrics['duplicates'] + 
                   component_metrics['hierarchy_issues'] + 
                   nesting_metrics['deep_paths'])
    
    print(f"\n📊 RESUMO GERAL:")
    print(f"🚨 Total de problemas identificados: {total_issues}")
    print(f"📁 Raiz poluída: {root_metrics['total_items']} itens")
    print(f"🔄 Componentes em {component_metrics['component_locations']} locais")
    print(f"📏 Aninhamento máximo: {nesting_metrics['max_depth']} níveis")
    
    if total_issues > 20:
        print(f"\n❌ PROJETO EM ESTADO CRÍTICO - LIMPEZA URGENTE NECESSÁRIA")
    elif total_issues > 10:
        print(f"\n⚠️ PROJETO PRECISA DE ORGANIZAÇÃO")
    else:
        print(f"\n✅ PROJETO EM ESTADO ACEITÁVEL")
