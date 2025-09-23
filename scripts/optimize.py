#!/usr/bin/env python3
"""
ARCO Workflow Optimizer
Critical performance monitoring and optimization
"""

import subprocess
import json
import os
import time
from pathlib import Path

class ARCOOptimizer:
    def __init__(self):
        self.root = Path.cwd()
        self.errors = []
        
    def check_typescript_errors(self):
        """Quick TypeScript error check"""
        try:
            result = subprocess.run(['npm', 'run', 'check-types'], 
                                  capture_output=True, text=True, timeout=30)
            return result.returncode == 0, result.stderr
        except subprocess.TimeoutExpired:
            return False, "TypeScript check timeout"
            
    def check_build_performance(self):
        """Check build times and bundle size"""
        try:
            start = time.time()
            result = subprocess.run(['npm', 'run', 'build'], 
                                  capture_output=True, text=True, timeout=120)
            build_time = time.time() - start
            
            # Check bundle size
            dist_size = self.get_folder_size(self.root / '.next')
            
            return {
                'build_success': result.returncode == 0,
                'build_time': build_time,
                'bundle_size_mb': dist_size / (1024 * 1024),
                'errors': result.stderr if result.returncode != 0 else None
            }
        except subprocess.TimeoutExpired:
            return {'build_success': False, 'error': 'Build timeout'}
            
    def get_folder_size(self, folder):
        """Get folder size in bytes"""
        total = 0
        try:
            for path in folder.rglob('*'):
                if path.is_file():
                    total += path.stat().st_size
        except:
            pass
        return total
        
    def quick_health_check(self):
        """Fast health check"""
        print("🔍 ARCO Health Check...")
        
        # 1. TypeScript errors
        ts_ok, ts_errors = self.check_typescript_errors()
        status = "✅" if ts_ok else "❌"
        print(f"{status} TypeScript: {'OK' if ts_ok else 'ERRORS'}")
        
        if not ts_ok:
            print(f"   Errors: {ts_errors[:200]}...")
            
        # 2. Dev server status
        try:
            import requests
            resp = requests.get('http://localhost:3000', timeout=5)
            server_ok = resp.status_code == 200
        except:
            server_ok = False
            
        status = "✅" if server_ok else "❌"
        print(f"{status} Dev Server: {'RUNNING' if server_ok else 'DOWN'}")
        
        # 3. Critical files check
        critical_files = [
            'src/app/page.tsx',
            'src/design-system/core/theme.ts',
            'package.json'
        ]
        
        missing_files = []
        for file in critical_files:
            if not (self.root / file).exists():
                missing_files.append(file)
                
        if missing_files:
            print(f"❌ Missing files: {missing_files}")
        else:
            print("✅ Critical files: OK")
            
        return ts_ok and server_ok and not missing_files
        
    def fix_common_issues(self):
        """Auto-fix common issues"""
        print("🔧 Auto-fixing common issues...")
        
        # 1. Clear Next.js cache
        next_cache = self.root / '.next'
        if next_cache.exists():
            import shutil
            shutil.rmtree(next_cache)
            print("✅ Cleared .next cache")
            
        # 2. Check for client/server issues
        self.fix_client_server_issues()
        
    def fix_client_server_issues(self):
        """Fix common client/server component issues"""
        issues_found = []
        
        # Check theme.ts
        theme_file = self.root / 'src/design-system/core/theme.ts'
        if theme_file.exists():
            content = theme_file.read_text()
            if 'createContext' in content and not content.startswith('"use client"'):
                issues_found.append("theme.ts missing 'use client'")
                
        if issues_found:
            print(f"⚠️  Client/Server issues found: {issues_found}")
        else:
            print("✅ Client/Server: OK")
            
    def performance_report(self):
        """Generate performance report"""
        print("\n📊 Performance Report")
        print("=" * 50)
        
        # Bundle analysis
        build_info = self.check_build_performance()
        
        if build_info['build_success']:
            print(f"✅ Build Time: {build_info['build_time']:.1f}s")
            print(f"📦 Bundle Size: {build_info['bundle_size_mb']:.1f}MB")
            
            # Performance targets
            if build_info['build_time'] > 60:
                print("⚠️  Build time > 60s (target: <30s)")
            if build_info['bundle_size_mb'] > 1:
                print("⚠️  Bundle size > 1MB (target: <250KB)")
        else:
            print(f"❌ Build failed: {build_info.get('errors', 'Unknown error')}")

if __name__ == "__main__":
    optimizer = ARCOOptimizer()
    
    if len(os.sys.argv) > 1:
        command = os.sys.argv[1]
        
        if command == "health":
            health_ok = optimizer.quick_health_check()
            exit(0 if health_ok else 1)
            
        elif command == "fix":
            optimizer.fix_common_issues()
            
        elif command == "perf":
            optimizer.performance_report()
            
        elif command == "all":
            health_ok = optimizer.quick_health_check()
            if not health_ok:
                optimizer.fix_common_issues()
            optimizer.performance_report()
    else:
        print("Usage: python optimize.py [health|fix|perf|all]")
