#!/usr/bin/env python3
"""
🔍 ARCO SAFE CLEANUP ANALYZER
Verifica impacto ANTES de deletar - trabalho inteligente
"""

import os
from pathlib import Path
import re
import json

def analyze_file_usage(file_path):
    """Analisa se um arquivo é importado/usado em outros lugares"""
    base = Path(".")
    src = base / "src"
    
    # Get filename without extension for searching
    file_stem = Path(file_path).stem
    relative_path = str(file_path).replace(str(src), "src")
    
    usage_count = 0
    importing_files = []
    
    # Search for imports/usage
    for root, dirs, files in os.walk(src):
        for file in files:
            if file.endswith(('.tsx', '.ts', '.js', '.jsx')):
                file_full_path = os.path.join(root, file)
                try:
                    with open(file_full_path, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read()
                        
                        # Check for imports
                        import_patterns = [
                            f"from ['\"].*{file_stem}['\"]",
                            f"import.*from ['\"].*{file_stem}['\"]",
                            f"import ['\"].*{file_stem}['\"]",
                            f"require\\(['\"].*{file_stem}['\"]\\)"
                        ]
                        
                        for pattern in import_patterns:
                            if re.search(pattern, content, re.IGNORECASE):
                                usage_count += 1
                                importing_files.append(file_full_path.replace(str(src), "src"))
                                break
                except:
                    continue
    
    return usage_count, importing_files

def analyze_folder_safety(folder_path):
    """Analisa se uma pasta pode ser deletada com segurança"""
    safety_score = 0
    issues = []
    contents = []
    
    try:
        # Count contents
        files = []
        subfolders = []
        
        for item in os.listdir(folder_path):
            item_path = os.path.join(folder_path, item)
            if os.path.isfile(item_path):
                files.append(item)
            else:
                subfolders.append(item)
        
        contents = {'files': files, 'subfolders': subfolders}
        
        # Safety checks
        if len(files) == 0 and len(subfolders) == 0:
            safety_score = 100  # Completely empty
            issues.append("✅ Empty folder - SAFE to delete")
        
        elif len(files) == 1 and len(subfolders) == 0:
            # Check if single file is used
            single_file = os.path.join(folder_path, files[0])
            usage_count, importing_files = analyze_file_usage(single_file)
            
            if usage_count == 0:
                safety_score = 90  # Unused single file
                issues.append("✅ Single unused file - SAFE to delete")
            else:
                safety_score = 10  # Used file
                issues.append(f"⚠️ Single file used by {usage_count} files - UNSAFE")
                
        elif len(files) <= 3 and len(subfolders) == 0:
            # Check few files usage
            total_usage = 0
            for file in files:
                file_path = os.path.join(folder_path, file)
                usage_count, _ = analyze_file_usage(file_path)
                total_usage += usage_count
            
            if total_usage == 0:
                safety_score = 80  # Few unused files
                issues.append("✅ Few unused files - PROBABLY SAFE")
            else:
                safety_score = 30  # Some usage
                issues.append(f"⚠️ Files have {total_usage} total usages - CHECK FIRST")
        
        else:
            safety_score = 0  # Complex folder
            issues.append("❌ Complex folder - MANUAL REVIEW NEEDED")
    
    except Exception as e:
        safety_score = 0
        issues.append(f"❌ Error analyzing: {e}")
    
    return safety_score, issues, contents

def create_safe_cleanup_plan():
    print("🔍 ARCO SAFE CLEANUP ANALYSIS")
    print("=" * 50)
    
    base = Path(".")
    src = base / "src"
    
    cleanup_plan = {
        'safe_deletions': [],
        'unsafe_deletions': [],
        'needs_review': []
    }
    
    print("\n🛡️ SAFETY ANALYSIS:")
    print("-" * 20)
    
    # Analyze all folders for safety
    folder_count = 0
    for root, dirs, files in os.walk(src):
        folder_count += 1
        
        # Skip if too deep in analysis (performance)
        if folder_count > 100:
            break
            
        level = root.replace(str(src), '').count(os.sep)
        
        # Focus on potentially deletable folders
        if level > 0:  # Skip src root
            safety_score, issues, contents = analyze_folder_safety(root)
            folder_rel = root.replace(str(src), "src")
            
            if safety_score >= 80:
                cleanup_plan['safe_deletions'].append({
                    'path': folder_rel,
                    'score': safety_score,
                    'issues': issues,
                    'contents': contents
                })
                print(f"✅ SAFE: {folder_rel} (score: {safety_score})")
                
            elif safety_score >= 50:
                cleanup_plan['needs_review'].append({
                    'path': folder_rel, 
                    'score': safety_score,
                    'issues': issues,
                    'contents': contents
                })
                print(f"⚠️ REVIEW: {folder_rel} (score: {safety_score})")
                
            else:
                cleanup_plan['unsafe_deletions'].append({
                    'path': folder_rel,
                    'score': safety_score,
                    'issues': issues,
                    'contents': contents
                })
                print(f"❌ UNSAFE: {folder_rel} (score: {safety_score})")
    
    print(f"\n📊 SAFETY SUMMARY:")
    print("-" * 20)
    print(f"✅ Safe to delete: {len(cleanup_plan['safe_deletions'])} folders")
    print(f"⚠️ Needs review: {len(cleanup_plan['needs_review'])} folders") 
    print(f"❌ Unsafe to delete: {len(cleanup_plan['unsafe_deletions'])} folders")
    
    # Show details for safe deletions
    if cleanup_plan['safe_deletions']:
        print(f"\n🗑️ SAFE DELETIONS (Top 10):")
        print("-" * 25)
        for i, item in enumerate(cleanup_plan['safe_deletions'][:10]):
            print(f"{i+1}. {item['path']}")
            for issue in item['issues']:
                print(f"   {issue}")
    
    # Save detailed plan
    with open('cleanup_safety_plan.json', 'w') as f:
        json.dump(cleanup_plan, f, indent=2)
    
    print(f"\n💾 Detailed plan saved to: cleanup_safety_plan.json")
    
    return cleanup_plan

def execute_safe_cleanup(cleanup_plan, dry_run=True):
    """Executa cleanup APENAS das pastas seguras"""
    print(f"\n🚀 {'DRY RUN' if dry_run else 'EXECUTING'} SAFE CLEANUP:")
    print("=" * 40)
    
    if not cleanup_plan['safe_deletions']:
        print("❌ No safe deletions identified")
        return
    
    for item in cleanup_plan['safe_deletions']:
        folder_path = item['path'].replace('src', 'src')
        full_path = Path(folder_path)
        
        if dry_run:
            print(f"🔍 WOULD DELETE: {folder_path}")
            print(f"   Reason: {item['issues'][0]}")
        else:
            try:
                if full_path.exists():
                    import shutil
                    shutil.rmtree(full_path)
                    print(f"✅ DELETED: {folder_path}")
                else:
                    print(f"⚠️ NOT FOUND: {folder_path}")
            except Exception as e:
                print(f"❌ ERROR deleting {folder_path}: {e}")

if __name__ == "__main__":
    cleanup_plan = create_safe_cleanup_plan()
    
    print(f"\n🤔 EXECUTE SAFE CLEANUP? (y/n)")
    # For now, just dry run
    execute_safe_cleanup(cleanup_plan, dry_run=True)
    
    print(f"\n🎯 NEXT STEPS:")
    print("1. Review cleanup_safety_plan.json")
    print("2. Manual review of 'needs_review' folders") 
    print("3. Execute safe deletions")
    print("4. Consolidate remaining structure")
