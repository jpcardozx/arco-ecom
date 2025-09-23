#!/usr/bin/env python3
"""
🔥 ARCO REAL CLEANUP EXECUTOR
Limpeza REAL baseada na auditoria verdadeira
"""

import os
import shutil
from pathlib import Path

def eliminate_duplicates():
    """Remove duplicações REAIS identificadas"""
    print("🔥 ELIMINANDO DUPLICAÇÕES REAIS")
    print("-" * 35)
    
    # Duplicates to remove (keep only primitives/)
    duplicates_to_remove = [
        "src/design-system/Avatar.tsx",           # Keep in primitives/
        "src/design-system/Button.tsx", 
        "src/design-system/Typography.tsx",
        "src/design-system/atoms/Avatar.tsx",    # Remove atoms folder
        "src/design-system/atoms/Button.tsx",
        "src/design-system/atoms/Typography.tsx",
        "src/design-system/atoms/Badge.tsx",
        "src/design-system/components/Button.tsx", # Keep different ones in components/
        "src/design-system/components/Typography.tsx",
        "src/design-system/visual/GlassmorphismCard.tsx"  # Duplicate of GlassCard
    ]
    
    removed_count = 0
    for dup_path in duplicates_to_remove:
        path = Path(dup_path)
        if path.exists():
            try:
                os.remove(path)
                print(f"🗑️ Removed duplicate: {dup_path}")
                removed_count += 1
            except Exception as e:
                print(f"❌ Error removing {dup_path}: {e}")
    
    # Remove empty atoms folder
    atoms_path = Path("src/design-system/atoms")
    if atoms_path.exists():
        try:
            shutil.rmtree(atoms_path)
            print(f"🗑️ Removed empty atoms folder")
            removed_count += 1
        except:
            pass
    
    print(f"✅ Removed {removed_count} duplicates")

def eliminate_useless_folders():
    """Remove pastas desnecessárias/quase vazias"""
    print("\n🗑️ REMOVENDO PASTAS DESNECESSÁRIAS")
    print("-" * 35)
    
    # Folders to completely remove
    useless_folders = [
        "src/architecture",  # 6 subfolders experimentais
        "src/business",      # 1 arquivo só
        "src/pages",         # Conflita com app/
    ]
    
    # Single file folders to flatten
    single_file_folders = [
        "src/components/home",
        "src/design-system/containers", 
        "src/design-system/layouts",
        "src/design-system/navigation",
        "src/design-system/visual"
    ]
    
    removed_count = 0
    
    # Remove useless folders
    for folder_path in useless_folders:
        path = Path(folder_path)
        if path.exists():
            try:
                shutil.rmtree(path)
                print(f"🗑️ Removed useless folder: {folder_path}")
                removed_count += 1
            except Exception as e:
                print(f"❌ Error removing {folder_path}: {e}")
    
    # Flatten single file folders
    for folder_path in single_file_folders:
        path = Path(folder_path)
        if path.exists():
            parent = path.parent
            files = list(path.glob("*"))
            
            if len(files) == 1 and files[0].is_file():
                file = files[0]
                target = parent / file.name
                
                # Avoid conflicts
                if target.exists():
                    target = parent / f"{path.name}-{file.name}"
                
                shutil.move(str(file), str(target))
                print(f"📁 Flattened: {folder_path} → {target}")
                
                # Remove empty folder
                try:
                    path.rmdir()
                    removed_count += 1
                except:
                    pass
    
    print(f"✅ Processed {removed_count} folders")

def consolidate_lib():
    """Consolida lib/ que tem arquivos espalhados"""
    print("\n📦 CONSOLIDANDO LIB/")
    print("-" * 20)
    
    lib_path = Path("src/lib")
    if not lib_path.exists():
        return
    
    # Move loose files to appropriate subfolders
    consolidation_map = {
        'core': ['decision-tracker.ts', 'design-tokens.ts', 'mcp-analytics.ts', 'mcp-logger.ts'],
        'ui': ['fonts.ts'],
        'utils': ['performance-optimizer.ts', 'utils.ts']
    }
    
    for folder, files in consolidation_map.items():
        folder_path = lib_path / folder
        folder_path.mkdir(exist_ok=True)
        
        for file in files:
            source = lib_path / file
            if source.exists() and source.is_file():
                target = folder_path / file
                shutil.move(str(source), str(target))
                print(f"📦 Moved: {file} → {folder}/")

def validate_cleanup():
    """Valida se a limpeza foi efetiva"""
    print("\n📊 VALIDAÇÃO PÓS-LIMPEZA")
    print("-" * 25)
    
    src_path = Path("src")
    if not src_path.exists():
        print("❌ src/ folder not found!")
        return False
    
    # Count folders
    total_folders = sum(1 for _ in src_path.rglob('*') if _.is_dir())
    
    # Count component duplicates
    component_files = []
    for root, dirs, files in os.walk(src_path):
        for file in files:
            if file.endswith('.tsx') and any(comp in file for comp in ['Button', 'Typography', 'Card', 'Avatar']):
                component_files.append(os.path.join(root, file))
    
    print(f"📁 Total folders: {total_folders}")
    print(f"🔄 Component files: {len(component_files)}")
    
    if total_folders <= 25:  # Realistic target
        print("✅ Folder count improved!")
    else:
        print(f"⚠️ Still {total_folders - 25} folders over realistic target")
    
    if len(component_files) <= 8:  # Reasonable duplicates
        print("✅ Component duplicates reduced!")
    else:
        print(f"⚠️ Still {len(component_files)} component files (high)")
    
    return total_folders <= 25 and len(component_files) <= 8

if __name__ == "__main__":
    print("🔥 ARCO REAL CLEANUP EXECUTION")
    print("=" * 35)
    print("Based on ACTUAL audit results")
    print()
    
    eliminate_duplicates()
    eliminate_useless_folders() 
    consolidate_lib()
    
    success = validate_cleanup()
    
    print(f"\n🎯 CLEANUP {'SUCCESS' if success else 'PARTIAL'}")
    print("Real structure improvements made")
