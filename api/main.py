"""
ARCO Intelligence API
Advanced analytics and technical intelligence for real business value
Real-time domain analysis, security auditing, performance optimization
"""

from fastapi import FastAPI, HTTPException, Depends, Security, BackgroundTasks
from fastapi.security.api_key import APIKeyHeader
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl
from typing import Optional, List, Dict, Any
import asyncio
import aiohttp
import ssl
import socket
from urllib.parse import urlparse
import time
import json
from datetime import datetime
import subprocess
import hashlib
import os

# Core dependencies that should always be available
import requests
from bs4 import BeautifulSoup

# Optional dependencies - import with error handling
try:
    import dns.resolver
    DNS_AVAILABLE = True
except ImportError:
    DNS_AVAILABLE = False

try:
    import psutil
    PSUTIL_AVAILABLE = True
except ImportError:
    PSUTIL_AVAILABLE = False

try:
    import whois
    WHOIS_AVAILABLE = True
except ImportError:
    WHOIS_AVAILABLE = False

try:
    from textstat import flesch_reading_ease, flesch_kincaid_grade
    TEXTSTAT_AVAILABLE = True
except ImportError:
    TEXTSTAT_AVAILABLE = False

try:
    import nmap
    NMAP_AVAILABLE = True
except ImportError:
    NMAP_AVAILABLE = False

try:
    import sslyze
    SSLYZE_AVAILABLE = True
except ImportError:
    SSLYZE_AVAILABLE = False

try:
    from selenium import webdriver
    from selenium.webdriver.chrome.options import Options
    SELENIUM_AVAILABLE = True
except ImportError:
    SELENIUM_AVAILABLE = False

try:
    import numpy as np
    import pandas as pd
    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.metrics.pairwise import cosine_similarity
    ML_AVAILABLE = True
except ImportError:
    ML_AVAILABLE = False

app = FastAPI(
    title="ARCO Intelligence API",
    description="Advanced technical analysis and competitive intelligence",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://arco.dev"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Key security
API_KEY_HEADER = APIKeyHeader(name="X-API-Key")

async def verify_api_key(api_key: str = Security(API_KEY_HEADER)):
    # In production, validate against database
    valid_keys = ["arco_dev_key_2024", "arco_premium_analytics"]
    if api_key not in valid_keys:
        raise HTTPException(status_code=403, detail="Invalid API key")
    return api_key

# Pydantic models
class DomainAnalysisRequest(BaseModel):
    domain: str
    include_competitors: bool = True
    deep_analysis: bool = False

class TechnicalAuditRequest(BaseModel):
    url: HttpUrl
    check_performance: bool = True
    check_seo: bool = True
    check_security: bool = True

class CompetitorIntelligenceRequest(BaseModel):
    primary_domain: str
    competitor_domains: List[str]
    analysis_depth: str = "standard"  # standard, deep, comprehensive

class ConversionAnalysisRequest(BaseModel):
    url: HttpUrl
    funnel_steps: List[str]
    target_actions: List[str]

# Health check endpoint
@app.get("/api/health")
async def health_check():
    """Check API health and available features"""
    return {
        "status": "healthy",
        "features": {
            "dns_analysis": DNS_AVAILABLE,
            "system_monitoring": PSUTIL_AVAILABLE,
            "whois_lookup": WHOIS_AVAILABLE,
            "text_analysis": TEXTSTAT_AVAILABLE,
            "network_scanning": NMAP_AVAILABLE,
            "ssl_analysis": SSLYZE_AVAILABLE,
            "browser_automation": SELENIUM_AVAILABLE,
            "machine_learning": ML_AVAILABLE
        },
        "core_features": ["basic_http_analysis", "content_parsing", "security_headers"]
    }

# Advanced Domain Intelligence
@app.post("/api/domain-intelligence")
async def analyze_domain(
    request: DomainAnalysisRequest,
    api_key: str = Depends(verify_api_key)
):
    """
    Advanced domain analysis with technical depth
    Returns infrastructure, security, performance, and competitive positioning
    """
    try:
        domain = request.domain.replace('https://', '').replace('http://', '').replace('www.', '')
        
        # Parallel analysis tasks
        tasks = [
            _analyze_dns_infrastructure(domain),
            _analyze_ssl_security(domain),
            _analyze_hosting_intelligence(domain),
            _analyze_content_structure(f"https://{domain}"),
        ]
        
        if request.include_competitors:
            tasks.append(_discover_competitors(domain))
            
        if request.deep_analysis:
            tasks.extend([
                _analyze_technical_stack(domain),
                _analyze_performance_metrics(f"https://{domain}"),
                _analyze_content_strategy(f"https://{domain}")
            ])
        
        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        # Compile comprehensive intelligence report
        intelligence_report = {
            "domain": domain,
            "analysis_timestamp": datetime.utcnow().isoformat(),
            "infrastructure": results[0] if not isinstance(results[0], Exception) else {},
            "security": results[1] if not isinstance(results[1], Exception) else {},
            "hosting": results[2] if not isinstance(results[2], Exception) else {},
            "content": results[3] if not isinstance(results[3], Exception) else {},
            "intelligence_score": _calculate_intelligence_score(results),
            "strategic_recommendations": _generate_strategic_recommendations(results)
        }
        
        if request.include_competitors and len(results) > 4:
            intelligence_report["competitive_landscape"] = results[4] if not isinstance(results[4], Exception) else {}
            
        if request.deep_analysis and len(results) > 5:
            intelligence_report["technical_stack"] = results[5] if not isinstance(results[5], Exception) else {}
            intelligence_report["performance_analysis"] = results[6] if not isinstance(results[6], Exception) else {}
            intelligence_report["content_strategy"] = results[7] if not isinstance(results[7], Exception) else {}
        
        return intelligence_report
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

async def _analyze_dns_infrastructure(domain: str):
    """Advanced DNS infrastructure analysis"""
    if not DNS_AVAILABLE:
        return {
            "nameservers": [],
            "mx_records": [],
            "txt_records": [],
            "cdn_detection": {},
            "dns_security": {},
            "error": "DNS analysis not available - dnspython not installed"
        }
    
    try:
        dns_analysis = {
            "nameservers": [],
            "mx_records": [],
            "txt_records": [],
            "cdn_detection": {},
            "dns_security": {}
        }
        
        # Nameservers analysis
        try:
            ns_records = dns.resolver.resolve(domain, 'NS')
            dns_analysis["nameservers"] = [str(ns) for ns in ns_records]
            
            # Detect major DNS providers
            major_providers = {
                'cloudflare': ['cloudflare.com'],
                'aws': ['awsdns'],
                'google': ['google.com'],
                'azure': ['azure.com']
            }
            
            for provider, patterns in major_providers.items():
                if any(pattern in ns for ns in dns_analysis["nameservers"] for pattern in patterns):
                    dns_analysis["cdn_detection"][provider] = True
                    
        except Exception:
            pass
            
        # MX Records
        try:
            mx_records = dns.resolver.resolve(domain, 'MX')
            dns_analysis["mx_records"] = [{"priority": mx.preference, "exchange": str(mx.exchange)} for mx in mx_records]
        except Exception:
            pass
            
        # TXT Records (SPF, DKIM, DMARC)
        try:
            txt_records = dns.resolver.resolve(domain, 'TXT')
            for txt in txt_records:
                txt_str = str(txt)
                if txt_str.startswith('v=spf1'):
                    dns_analysis["dns_security"]["spf"] = txt_str
                elif 'dmarc' in txt_str.lower():
                    dns_analysis["dns_security"]["dmarc"] = txt_str
                dns_analysis["txt_records"].append(txt_str)
        except Exception:
            pass
            
        return dns_analysis
        
    except Exception as e:
        return {"error": str(e)}

async def _analyze_ssl_security(domain: str):
    """Advanced SSL/TLS security analysis"""
    try:
        ssl_analysis = {
            "certificate_valid": False,
            "certificate_authority": "",
            "expiry_date": "",
            "cipher_suites": [],
            "protocol_versions": [],
            "security_score": 0
        }
        
        context = ssl.create_default_context()
        
        with socket.create_connection((domain, 443), timeout=10) as sock:
            with context.wrap_socket(sock, server_hostname=domain) as ssock:
                cert = ssock.getpeercert()
                
                ssl_analysis["certificate_valid"] = True
                ssl_analysis["certificate_authority"] = cert.get('issuer', [{}])[0].get('organizationName', 'Unknown')
                ssl_analysis["expiry_date"] = cert.get('notAfter', '')
                ssl_analysis["protocol_version"] = ssock.version()
                ssl_analysis["cipher"] = ssock.cipher()
                
                # Calculate security score based on certificate and protocol
                score = 0
                if ssl_analysis["protocol_version"] in ['TLSv1.3', 'TLSv1.2']:
                    score += 40
                if 'Let\'s Encrypt' not in ssl_analysis["certificate_authority"]:
                    score += 30  # Commercial cert
                if ssl_analysis["cipher"] and ssl_analysis["cipher"][1] >= 256:
                    score += 30  # Strong encryption
                    
                ssl_analysis["security_score"] = score
                
        return ssl_analysis
        
    except Exception as e:
        return {"error": str(e), "certificate_valid": False}

async def _analyze_hosting_intelligence(domain: str):
    """Advanced hosting and infrastructure intelligence"""
    try:
        hosting_analysis = {
            "ip_addresses": [],
            "hosting_provider": "",
            "server_location": {},
            "whois_data": {},
            "cdn_analysis": {}
        }
        
        # IP resolution
        try:
            ip_addresses = socket.gethostbyname_ex(domain)[2]
            hosting_analysis["ip_addresses"] = ip_addresses
        except Exception:
            pass
            
        # WHOIS analysis
        try:
            w = whois.whois(domain)
            hosting_analysis["whois_data"] = {
                "registrar": w.registrar,
                "creation_date": str(w.creation_date) if w.creation_date else None,
                "expiration_date": str(w.expiration_date) if w.expiration_date else None,
                "name_servers": w.name_servers if w.name_servers else []
            }
        except Exception:
            pass
            
        return hosting_analysis
        
    except Exception as e:
        return {"error": str(e)}

async def _analyze_content_structure(url: str):
    """Advanced content and SEO structure analysis"""
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url, timeout=15) as response:
                if response.status != 200:
                    return {"error": f"HTTP {response.status}"}
                    
                html = await response.text()
                soup = BeautifulSoup(html, 'html.parser')
                
                content_analysis = {
                    "meta_analysis": {},
                    "heading_structure": {},
                    "content_metrics": {},
                    "technical_seo": {},
                    "readability": {}
                }
                
                # Meta analysis
                title = soup.find('title')
                description = soup.find('meta', attrs={'name': 'description'})
                content_analysis["meta_analysis"] = {
                    "title": title.text if title else "",
                    "description": description.get('content') if description else "",
                    "title_length": len(title.text) if title else 0,
                    "description_length": len(description.get('content')) if description else 0
                }
                
                # Heading structure
                headings = {}
                for i in range(1, 7):
                    h_tags = soup.find_all(f'h{i}')
                    headings[f'h{i}'] = len(h_tags)
                content_analysis["heading_structure"] = headings
                
                # Content metrics
                text_content = soup.get_text()
                content_analysis["content_metrics"] = {
                    "word_count": len(text_content.split()),
                    "character_count": len(text_content),
                    "paragraph_count": len(soup.find_all('p')),
                    "image_count": len(soup.find_all('img')),
                    "link_count": len(soup.find_all('a'))
                }
                
                # Readability analysis
                if len(text_content.split()) > 100:
                    content_analysis["readability"] = {
                        "flesch_reading_ease": flesch_reading_ease(text_content),
                        "flesch_kincaid_grade": flesch_kincaid_grade(text_content)
                    }
                
                return content_analysis
                
    except Exception as e:
        return {"error": str(e)}

async def _discover_competitors(domain: str):
    """AI-powered competitor discovery"""
    # Simplified competitor discovery - in production, use more sophisticated methods
    return {
        "discovered_competitors": [],
        "analysis_method": "keyword_overlap",
        "confidence_scores": {}
    }

async def _analyze_technical_stack(domain: str):
    """Technical stack detection and analysis"""
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(f"https://{domain}", timeout=15) as response:
                headers = dict(response.headers)
                html = await response.text()
                
                stack_analysis = {
                    "server_headers": {},
                    "frameworks_detected": [],
                    "javascript_libraries": [],
                    "css_frameworks": [],
                    "analytics_tools": []
                }
                
                # Analyze server headers
                interesting_headers = ['server', 'x-powered-by', 'x-frame-options', 'x-content-type-options']
                for header in interesting_headers:
                    if header in headers:
                        stack_analysis["server_headers"][header] = headers[header]
                
                # Detect common frameworks and libraries
                html_lower = html.lower()
                
                # JavaScript frameworks
                js_frameworks = {
                    'react': ['react', '_react'],
                    'vue': ['vue.js', '__vue__'],
                    'angular': ['angular', 'ng-'],
                    'jquery': ['jquery', '$'],
                    'next.js': ['__next', '_next']
                }
                
                for framework, patterns in js_frameworks.items():
                    if any(pattern in html_lower for pattern in patterns):
                        stack_analysis["frameworks_detected"].append(framework)
                
                return stack_analysis
                
    except Exception as e:
        return {"error": str(e)}

async def _analyze_performance_metrics(url: str):
    """Performance analysis using Python-based metrics"""
    try:
        start_time = time.time()
        
        async with aiohttp.ClientSession() as session:
            async with session.get(url, timeout=15) as response:
                load_time = time.time() - start_time
                
                performance_analysis = {
                    "response_time": load_time,
                    "status_code": response.status,
                    "content_size": len(await response.read()),
                    "response_headers": dict(response.headers),
                    "performance_score": _calculate_performance_score(load_time, response.status)
                }
                
                return performance_analysis
                
    except Exception as e:
        return {"error": str(e)}

async def _analyze_content_strategy(url: str):
    """Advanced content strategy analysis"""
    # Placeholder for advanced content analysis
    return {
        "content_themes": [],
        "keyword_density": {},
        "content_structure_score": 0,
        "engagement_indicators": {}
    }

def _calculate_intelligence_score(results: List) -> int:
    """Calculate overall intelligence score based on analysis results"""
    score = 0
    valid_results = [r for r in results if not isinstance(r, Exception)]
    
    # Score based on completeness and quality of analysis
    score += len(valid_results) * 10
    
    # Bonus for security indicators
    if len(valid_results) > 1 and 'certificate_valid' in str(valid_results[1]):
        score += 20
        
    return min(score, 100)

def _generate_strategic_recommendations(results: List) -> List[str]:
    """Generate strategic recommendations based on analysis"""
    recommendations = []
    
    # Analyze results and generate contextual recommendations
    for result in results:
        if isinstance(result, dict) and 'error' not in result:
            if 'security_score' in result and result.get('security_score', 0) < 70:
                recommendations.append("Upgrade SSL/TLS configuration for better security")
            if 'performance_score' in result and result.get('performance_score', 0) < 70:
                recommendations.append("Optimize loading performance and response times")
    
    if not recommendations:
        recommendations.append("Technical infrastructure appears optimized")
        
    return recommendations

def _calculate_performance_score(load_time: float, status_code: int) -> int:
    """Calculate performance score based on metrics"""
    score = 100
    
    if status_code != 200:
        score -= 50
    if load_time > 2.0:
        score -= 30
    elif load_time > 1.0:
        score -= 15
        
    return max(score, 0)

# Competitive Intelligence Endpoint
@app.post("/api/competitive-intelligence")
async def competitive_intelligence(
    request: CompetitorIntelligenceRequest,
    api_key: str = Depends(verify_api_key)
):
    """
    Advanced competitive intelligence analysis
    """
    try:
        primary_analysis = await analyze_domain(
            DomainAnalysisRequest(domain=request.primary_domain, deep_analysis=True),
            api_key
        )
        
        competitor_analyses = []
        for competitor in request.competitor_domains:
            comp_analysis = await analyze_domain(
                DomainAnalysisRequest(domain=competitor, deep_analysis=False),
                api_key
            )
            competitor_analyses.append({
                "domain": competitor,
                "analysis": comp_analysis
            })
        
        # Comparative analysis
        intelligence_report = {
            "primary_domain": request.primary_domain,
            "primary_analysis": primary_analysis,
            "competitors": competitor_analyses,
            "comparative_insights": _generate_comparative_insights(primary_analysis, competitor_analyses),
            "strategic_positioning": _analyze_strategic_positioning(primary_analysis, competitor_analyses)
        }
        
        return intelligence_report
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Competitive intelligence failed: {str(e)}")

def _generate_comparative_insights(primary: Dict, competitors: List[Dict]) -> Dict:
    """Generate comparative intelligence insights"""
    return {
        "technical_advantages": [],
        "competitive_gaps": [],
        "differentiation_opportunities": [],
        "risk_factors": []
    }

def _analyze_strategic_positioning(primary: Dict, competitors: List[Dict]) -> Dict:
    """Analyze strategic market positioning"""
    return {
        "market_position": "analysis_needed",
        "competitive_strength": 0,
        "differentiation_score": 0,
        "strategic_recommendations": []
    }

# Real-time Performance Monitoring
@app.get("/api/performance-monitor/{domain}")
async def performance_monitor(
    domain: str,
    api_key: str = Depends(verify_api_key)
):
    """
    Real-time performance monitoring endpoint
    """
    try:
        performance_data = await _analyze_performance_metrics(f"https://{domain}")
        
        # Add real-time system metrics if analyzing localhost
        if 'localhost' in domain:
            performance_data["system_metrics"] = {
                "cpu_usage": psutil.cpu_percent(),
                "memory_usage": psutil.virtual_memory().percent,
                "disk_usage": psutil.disk_usage('/').percent
            }
        
        return {
            "domain": domain,
            "timestamp": datetime.utcnow().isoformat(),
            "performance": performance_data,
            "alerts": _generate_performance_alerts(performance_data)
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Performance monitoring failed: {str(e)}")

def _generate_performance_alerts(performance_data: Dict) -> List[str]:
    """Generate performance alerts based on thresholds"""
    alerts = []
    
    if performance_data.get('response_time', 0) > 3.0:
        alerts.append("High response time detected")
    if performance_data.get('status_code') != 200:
        alerts.append("Non-200 status code detected")
        
    return alerts

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
