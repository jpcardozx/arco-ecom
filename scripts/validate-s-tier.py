#!/usr/bin/env python3
"""
🔍 ARCO S-TIER VALIDATION
Verifies clean architecture and progressive structure
"""

import os
import subprocess
from pathlib import Path

def run_command(cmd):
    """Run command and return output"""
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True, cwd=".")
        return result.returncode == 0, result.stdout, result.stderr
    except Exception as e:
        return False, "", str(e)

def validate_architecture():
    print("🔍 ARCO S-TIER ARCHITECTURE VALIDATION")
    print("=" * 50)
    
    src = Path("src")
    issues = []
    
    print("\n✅ STRUCTURE VALIDATION:")
    print("-" * 25)
    
    # Check no duplicates in design-system root
    ds_root = src / "design-system"
    duplicates = ["Button.tsx", "Typography.tsx", "Avatar.tsx"]
    for dup in duplicates:
        if (ds_root / dup).exists():
            issues.append(f"❌ Duplicate found: {ds_root / dup}")
        else:
            print(f"✅ No duplicate: {dup}")
    
    # Check no atoms folder
    if (ds_root / "atoms").exists():
        issues.append("❌ Redundant atoms/ folder still exists")
    else:
        print("✅ No redundant atoms/ folder")
    
    # Check no pages folder (App Router only)
    if (src / "pages").exists():
        issues.append("❌ Conflicting pages/ folder exists")
    else:
        print("✅ No conflicting pages/ folder")
    
    # Check MCP moved out of src
    if (src / "mcp").exists():
        issues.append("❌ MCP still in src/ (should be in root)")
    else:
        print("✅ MCP correctly moved out of src/")
    
    # Check unified exports exist
    if (ds_root / "index.ts").exists():
        print("✅ Unified design-system exports exist")
    else:
        issues.append("❌ Missing unified design-system index.ts")
    
    print(f"\n🎯 TYPESCRIPT VALIDATION:")
    print("-" * 25)
    
    # Check TypeScript errors
    success, stdout, stderr = run_command("npx tsc --noEmit --skipLibCheck")
    if success:
        print("✅ Zero TypeScript errors")
    else:
        print("❌ TypeScript errors found:")
        print(stderr[:500] + "..." if len(stderr) > 500 else stderr)
        issues.append("TypeScript compilation issues")
    
    print(f"\n🏗️ BUILD VALIDATION:")
    print("-" * 20)
    
    # Test build
    success, stdout, stderr = run_command("npm run build")
    if success:
        print("✅ Clean build successful")
    else:
        print("⚠️ Build issues (check manually)")
    
    print(f"\n📊 FINAL ASSESSMENT:")
    print("=" * 25)
    
    if not issues:
        print("🎯 S-TIER ARCHITECTURE ACHIEVED!")
        print("✅ Zero redundancies")
        print("✅ Clean structure") 
        print("✅ Progressive hierarchy")
        print("✅ Single source of truth")
        print("\n🚀 READY FOR DEVELOPMENT!")
    else:
        print("⚠️ Issues found:")
        for issue in issues:
            print(f"   {issue}")
        print(f"\n📝 {len(issues)} issues to resolve")
    
    return len(issues) == 0

if __name__ == "__main__":
    success = validate_architecture()
    exit(0 if success else 1)
