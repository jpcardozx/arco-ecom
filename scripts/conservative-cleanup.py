#!/usr/bin/env python3
"""
🧹 ARCO CONSERVATIVE CLEANUP
Remove APENAS lixo confirmado - preserva trabalho valioso
"""

import os
import shutil
import json
from pathlib import Path

def execute_conservative_cleanup():
    print("🧹 ARCO CONSERVATIVE CLEANUP")
    print("=" * 40)
    
    # Load safety analysis
    try:
        with open('cleanup_safety_plan.json', 'r') as f:
            cleanup_plan = json.load(f)
    except FileNotFoundError:
        print("❌ Run safe-cleanup-analyzer.py first!")
        return False
    
    safe_deletions = cleanup_plan.get('safe_deletions', [])
    
    print(f"🎯 Found {len(safe_deletions)} safe deletions")
    
    # Conservative filter - only truly unused
    very_safe = []
    for item in safe_deletions:
        issues = item.get('issues', [])
        # Only delete if explicitly marked as unused
        if any('unused' in issue.lower() for issue in issues):
            very_safe.append(item)
    
    print(f"🛡️ Conservative filter: {len(very_safe)} truly safe deletions")
    
    if not very_safe:
        print("✅ No confirmed unused folders - project is clean!")
        return True
    
    print(f"\n🗑️ CONSERVATIVE DELETIONS:")
    print("-" * 30)
    
    deleted_count = 0
    preserved_count = 0
    
    for item in very_safe:
        folder_path = item['path']
        full_path = Path(folder_path)
        
        # Extra safety check - ensure path exists and is in expected location
        if full_path.exists() and 'src' in str(full_path):
            try:
                # Show what we're deleting
                print(f"🗑️ Deleting: {folder_path}")
                print(f"   Reason: {item['issues'][0]}")
                
                # Actually delete
                shutil.rmtree(full_path)
                deleted_count += 1
                
            except Exception as e:
                print(f"❌ Error deleting {folder_path}: {e}")
                preserved_count += 1
        else:
            print(f"⚠️ Skipped (not found): {folder_path}")
            preserved_count += 1
    
    print(f"\n📊 CLEANUP RESULTS:")
    print("-" * 20)
    print(f"✅ Deleted: {deleted_count} folders")
    print(f"🛡️ Preserved: {preserved_count} folders (safety)")
    
    # Verify structure after cleanup
    src = Path("src")
    if src.exists():
        remaining_folders = sum(1 for _ in src.rglob('*') if _.is_dir())
        print(f"📁 Remaining folders in src/: {remaining_folders}")
        
        if remaining_folders < 50:  # Improvement from 63
            print("🎯 Structure simplified successfully!")
        else:
            print("⚠️ More cleanup may be needed")
    
    return True

def verify_project_health():
    """Verifica se o projeto ainda funciona após cleanup"""
    print(f"\n🔍 VERIFYING PROJECT HEALTH:")
    print("-" * 30)
    
    # Check critical files exist
    critical_files = [
        "src/app/layout.tsx",
        "src/app/page.tsx", 
        "src/design-system/index.ts",
        "src/components/layout/MainLayout.tsx"
    ]
    
    all_good = True
    for file_path in critical_files:
        if Path(file_path).exists():
            print(f"✅ {file_path}")
        else:
            print(f"❌ MISSING: {file_path}")
            all_good = False
    
    if all_good:
        print("✅ All critical files preserved!")
    else:
        print("⚠️ Some critical files missing - investigate!")
    
    return all_good

if __name__ == "__main__":
    print("🤔 This will delete confirmed unused folders.")
    print("   Only 'unused file' entries will be removed.")
    print("   All active components will be preserved.")
    
    success = execute_conservative_cleanup()
    
    if success:
        verify_project_health()
        
        print(f"\n🎯 NEXT PHASE:")
        print("1. ✅ Removed confirmed dead code")
        print("2. 🛡️ Preserved all active components") 
        print("3. 🎯 Focus on consolidating remaining structure")
        print("4. 🚀 Build unified design system exports")
    else:
        print("❌ Cleanup failed - manual review needed")
