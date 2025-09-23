#!/usr/bin/env python3
"""
🔥 ARCO AGGRESSIVE CONSOLIDATOR
Consolida estrutura de forma agressiva - meta: 20 pastas max
"""

import os
import shutil
from pathlib import Path

def consolidate_lib_folder():
    """Consolida src/lib/ que tem 28 arquivos na raiz"""
    print("🔥 CONSOLIDATING LIB FOLDER")
    print("-" * 30)
    
    lib_path = Path("src/lib")
    if not lib_path.exists():
        return
    
    # Group files by purpose
    consolidation_plan = {
        'core/': ['config.ts', 'constants.ts', 'types.ts'],
        'animation/': ['animations.ts', 'ANIMATION-SYSTEM.md', 'ANIMATION-SYSTEM-UPDATE.md', 'motion-config.ts'],
        'analytics/': ['analytics.ts', 'enhanced-analytics.ts', 'lead-analytics.ts', 'conversion-tracking.ts'],
        'performance/': ['api-performance.ts', 'optimization.ts', 'performance-insights.ts'],
        'content/': ['content-strategy.ts', 'seo-optimizer.ts', 'context-manager.ts'],
        'api/': ['api-config.ts', 'api-response-handler.ts']
    }
    
    # Execute consolidation
    for folder, files in consolidation_plan.items():
        target_folder = lib_path / folder.rstrip('/')
        target_folder.mkdir(exist_ok=True)
        
        for file in files:
            source = lib_path / file
            if source.exists() and source.is_file():
                target = target_folder / file
                shutil.move(str(source), str(target))
                print(f"📁 Moved: {file} → {folder}")

def consolidate_design_system():
    """Consolida design-system eliminando duplicatas"""
    print("\n🎯 CONSOLIDATING DESIGN SYSTEM")
    print("-" * 30)
    
    ds_path = Path("src/design-system")
    if not ds_path.exists():
        return
    
    # Remove duplicate glass components
    duplicates = [
        "src/design-system/components/GlassCard.tsx",  # Keep in visual/
        "src/design-system/glass-components.tsx"       # Merge into core
    ]
    
    for dup in duplicates:
        dup_path = Path(dup)
        if dup_path.exists():
            os.remove(dup_path)
            print(f"🗑️ Removed duplicate: {dup}")
    
    # Consolidate index files
    index_files = ["index.ts", "index-new.ts"]
    main_index = ds_path / "index.ts"
    
    # Keep only main index
    for idx in index_files[1:]:
        idx_path = ds_path / idx
        if idx_path.exists():
            os.remove(idx_path)
            print(f"🗑️ Removed redundant index: {idx}")

def consolidate_api_folders():
    """Consolida pastas API quase vazias"""
    print("\n🔄 CONSOLIDATING API FOLDERS")
    print("-" * 30)
    
    api_path = Path("src/app/api")
    if not api_path.exists():
        return
    
    # Remove empty API folders
    empty_apis = ["analyze", "leads"]
    for api_folder in empty_apis:
        folder_path = api_path / api_folder
        if folder_path.exists():
            try:
                shutil.rmtree(folder_path)
                print(f"🗑️ Removed empty API: {api_folder}")
            except:
                pass
    
    # Consolidate single-file APIs into shared folder
    single_file_apis = ["analytics", "auth"]
    shared_folder = api_path / "shared"
    shared_folder.mkdir(exist_ok=True)
    
    for api_folder in single_file_apis:
        source_folder = api_path / api_folder
        if source_folder.exists():
            # Move files to shared
            for item in source_folder.iterdir():
                if item.is_file():
                    target = shared_folder / f"{api_folder}-{item.name}"
                    shutil.move(str(item), str(target))
                    print(f"📁 Consolidated API: {api_folder}/{item.name} → shared/")
            
            # Remove empty folder
            try:
                shutil.rmtree(source_folder)
            except:
                pass

def consolidate_single_file_folders():
    """Remove pastas com apenas 1 arquivo movendo para parent"""
    print("\n📁 FLATTENING SINGLE-FILE FOLDERS")
    print("-" * 30)
    
    single_file_folders = [
        "src/components/home",
        "src/design-system/components", 
        "src/design-system/navigation",
        "src/lib/config",
        "src/lib/context"
    ]
    
    for folder_str in single_file_folders:
        folder_path = Path(folder_str)
        if not folder_path.exists():
            continue
            
        parent = folder_path.parent
        files = list(folder_path.glob("*"))
        
        if len(files) == 1 and files[0].is_file():
            file = files[0]
            target = parent / file.name
            
            # Avoid name conflicts
            if target.exists():
                target = parent / f"{folder_path.name}-{file.name}"
            
            shutil.move(str(file), str(target))
            print(f"📁 Flattened: {folder_str} → {target}")
            
            # Remove empty folder
            try:
                folder_path.rmdir()
            except:
                pass

def create_clean_structure():
    """Cria estrutura final limpa"""
    print("\n🎯 FINAL STRUCTURE VALIDATION")
    print("-" * 30)
    
    # Count final structure
    src = Path("src")
    total_folders = sum(1 for _ in src.rglob('*') if _.is_dir())
    
    print(f"📊 Final folder count: {total_folders}")
    
    if total_folders <= 20:
        print("✅ TARGET ACHIEVED: ≤20 folders!")
    else:
        print(f"⚠️ Still {total_folders - 20} folders over target")
    
    # Show clean structure
    print("\n📁 CLEAN STRUCTURE:")
    for root, dirs, files in os.walk(src):
        level = root.replace(str(src), '').count(os.sep)
        if level <= 2:  # Show 2 levels
            indent = '  ' * level
            folder_name = os.path.basename(root)
            print(f"{indent}📁 {folder_name}/ ({len(files)} files, {len(dirs)} folders)")

if __name__ == "__main__":
    print("🔥 ARCO AGGRESSIVE CONSOLIDATION")
    print("=" * 40)
    print("Target: 35 → 20 folders")
    print()
    
    consolidate_lib_folder()
    consolidate_design_system() 
    consolidate_api_folders()
    consolidate_single_file_folders()
    create_clean_structure()
    
    print("\n🎯 CONSOLIDATION COMPLETE!")
    print("Structure simplified for S-tier development")
