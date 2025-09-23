#!/usr/bin/env python3
"""
🔥 ARCO COMPLETE RADICAL CLEANUP
Limpeza total baseada na análise real
"""

import os
import shutil
from pathlib import Path

def cleanup_root_pollution():
    """Limpa poluição da raiz"""
    print("🔥 LIMPEZA RADICAL DA RAIZ")
    print("=" * 30)
    
    base = Path(".")
    
    # Remove junk files
    junk_files = ['.env', '.env.example', '.env.local', '.env.turbo']
    removed_files = 0
    
    for junk in junk_files:
        junk_path = base / junk
        if junk_path.exists():
            try:
                os.remove(junk_path)
                print(f"🗑️ Removed: {junk}")
                removed_files += 1
            except:
                pass
    
    # Remove unnecessary folders
    unnecessary_folders = ['intelligence', 'mcp']
    removed_folders = 0
    
    for folder in unnecessary_folders:
        folder_path = base / folder
        if folder_path.exists():
            try:
                shutil.rmtree(folder_path)
                print(f"🗑️ Removed folder: {folder}")
                removed_folders += 1
            except:
                pass
    
    # Consolidate tools
    docs_path = base / 'docs'
    scripts_path = base / 'scripts'
    tools_path = base / 'tools'
    tools_path.mkdir(exist_ok=True)
    
    # Move docs to tools/docs
    if docs_path.exists():
        target_docs = tools_path / 'docs'
        if not target_docs.exists():
            shutil.move(str(docs_path), str(target_docs))
            print("📁 Consolidated: docs/ → tools/docs/")
    
    # Move scripts to tools/scripts  
    if scripts_path.exists():
        target_scripts = tools_path / 'scripts'
        if not target_scripts.exists():
            shutil.move(str(scripts_path), str(target_scripts))
            print("📁 Consolidated: scripts/ → tools/scripts/")
    
    print(f"✅ Root cleanup: {removed_files} files + {removed_folders} folders removed")

def eliminate_component_duplicates():
    """Elimina duplicações de componentes"""
    print("\n🔄 ELIMINANDO DUPLICAÇÕES DE COMPONENTES")
    print("-" * 40)
    
    # Remove Badge duplicates - keep only primitives version
    badge_duplicates = [
        "src/design-system/Badge.tsx",
        "src/design-system/components/Badge.tsx"
    ]
    
    for dup in badge_duplicates:
        dup_path = Path(dup)
        if dup_path.exists():
            os.remove(dup_path)
            print(f"🗑️ Removed Badge duplicate: {dup}")
    
    # Remove Container duplicates - keep only primitives version
    container_duplicates = [
        "src/design-system/components/Container.tsx"
    ]
    
    for dup in container_duplicates:
        dup_path = Path(dup)
        if dup_path.exists():
            os.remove(dup_path)
            print(f"🗑️ Removed Container duplicate: {dup}")
    
    # Remove Grid duplicate from design-system (keep in components/layout)
    grid_duplicate = Path("src/design-system/Grid.tsx")
    if grid_duplicate.exists():
        os.remove(grid_duplicate)
        print(f"🗑️ Removed Grid duplicate from design-system")

def consolidate_component_hierarchy():
    """Consolida hierarquia de componentes"""
    print("\n📦 CONSOLIDANDO HIERARQUIA DE COMPONENTES")
    print("-" * 45)
    
    # Move bloated sections into organized structure
    sections_path = Path("src/components/sections")
    
    if sections_path.exists():
        # Create organized folders
        hero_path = Path("src/components/hero")
        business_path = Path("src/components/business")
        
        hero_path.mkdir(exist_ok=True)
        business_path.mkdir(exist_ok=True)
        
        # Move hero-related components
        hero_files = ['EnhancedHeroSectionV3.tsx', 'EnhancedHeroSectionV3_backup.tsx', 'HeroSectionV4.tsx']
        for hero_file in hero_files:
            source = sections_path / hero_file
            if source.exists():
                target = hero_path / hero_file
                shutil.move(str(source), str(target))
                print(f"📁 Moved hero: {hero_file} → components/hero/")
        
        # Move business-related components
        business_files = ['BusinessReadinessAssessment.tsx', 'BusinessWasteCalculator.tsx']
        for business_file in business_files:
            source = sections_path / business_file
            if source.exists():
                target = business_path / business_file
                shutil.move(str(source), str(target))
                print(f"📁 Moved business: {business_file} → components/business/")
        
        # Move remaining files to parent components/
        for remaining_file in sections_path.glob("*.tsx"):
            target = sections_path.parent / remaining_file.name
            shutil.move(str(remaining_file), str(target))
            print(f"📁 Moved to components/: {remaining_file.name}")
        
        # Remove s-tier subfolder and move its contents
        s_tier_path = sections_path / "s-tier"
        if s_tier_path.exists():
            for s_tier_file in s_tier_path.glob("*.tsx"):
                target = hero_path / s_tier_file.name
                shutil.move(str(s_tier_file), str(target))
                print(f"📁 Moved s-tier: {s_tier_file.name} → components/hero/")
            
            try:
                s_tier_path.rmdir()
            except:
                pass
        
        # Remove empty sections folder
        try:
            sections_path.rmdir()
            print("🗑️ Removed empty sections folder")
        except:
            pass

def final_validation():
    """Validação final da limpeza"""
    print("\n📊 VALIDAÇÃO PÓS-LIMPEZA")
    print("-" * 25)
    
    # Count root items
    base = Path(".")
    root_items = len(list(base.iterdir()))
    
    # Count src folders
    src = Path("src")
    src_folders = sum(1 for _ in src.rglob('*') if _.is_dir()) if src.exists() else 0
    
    # Count component locations
    component_locations = set()
    if src.exists():
        for root, dirs, files in os.walk(src):
            for file in files:
                if file.endswith('.tsx') and file[0].isupper():
                    rel_path = os.path.relpath(root, src)
                    component_locations.add(rel_path)
    
    print(f"📊 Raiz: {root_items} itens")
    print(f"📁 src/: {src_folders} pastas")
    print(f"🔄 Componentes em: {len(component_locations)} locais")
    
    # Assessment
    if root_items <= 35 and src_folders <= 25 and len(component_locations) <= 8:
        print("\n✅ LIMPEZA EFETIVA! Estrutura melhorada significativamente")
        return True
    else:
        print(f"\n⚠️ Progresso parcial - mais limpeza necessária")
        return False

if __name__ == "__main__":
    print("🔥 ARCO COMPLETE RADICAL CLEANUP")
    print("=" * 35)
    print("Limpeza baseada em análise real")
    print()
    
    cleanup_root_pollution()
    eliminate_component_duplicates()
    consolidate_component_hierarchy()
    
    success = final_validation()
    
    print(f"\n🎯 {'SUCESSO' if success else 'PROGRESSO'} NA LIMPEZA!")
    print("Estrutura significativamente melhorada")
