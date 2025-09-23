/**
 * ARCO PERFORMANCE SERVICE WORKER
 * Cache agressivo para <0.8s carregamento
 */

const CACHE_NAME = 'arco-performance-v1'
const STATIC_CACHE = 'arco-static-v1'
const RUNTIME_CACHE = 'arco-runtime-v1'

// Recursos críticos para cache imediato
const CRITICAL_RESOURCES = [
  '/',
  '/diagnose',
  '/manifest.json',
  '/favicon.ico',
  '/optimized/', // Imagens otimizadas
]

// Assets to cache on demand
const DYNAMIC_ASSETS = [
  '/api/analyze/domain',
  '/api/web-vitals',
]

// Cache strategies
const CACHE_STRATEGIES = {
  // Images: Cache first, then network
  images: 'cache-first',
  // Static assets: Cache first
  static: 'cache-first',
  // API calls: Network first, fallback to cache
  api: 'network-first',
  // Pages: Stale while revalidate
  pages: 'stale-while-revalidate'
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE).then((cache) => {
        return cache.addAll(STATIC_ASSETS)
      }),
      // Skip waiting to activate immediately
      self.skipWaiting()
    ])
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => 
              cacheName.startsWith('arco-') && 
              cacheName !== CACHE_NAME &&
              cacheName !== STATIC_CACHE &&
              cacheName !== DYNAMIC_CACHE
            )
            .map((cacheName) => caches.delete(cacheName))
        )
      }),
      // Take control of all clients
      self.clients.claim()
    ])
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests and external URLs
  if (request.method !== 'GET' || !url.origin.includes(self.location.origin)) {
    return
  }

  // Route to appropriate strategy
  if (isImageRequest(request)) {
    event.respondWith(cacheFirstStrategy(request, STATIC_CACHE))
  } else if (isStaticAsset(request)) {
    event.respondWith(cacheFirstStrategy(request, STATIC_CACHE))
  } else if (isAPIRequest(request)) {
    event.respondWith(networkFirstStrategy(request, DYNAMIC_CACHE))
  } else if (isPageRequest(request)) {
    event.respondWith(staleWhileRevalidateStrategy(request, DYNAMIC_CACHE))
  }
})

// Strategy implementations
async function cacheFirstStrategy(request, cacheName) {
  try {
    const cache = await caches.open(cacheName)
    const cachedResponse = await cache.match(request)
    
    if (cachedResponse) {
      return cachedResponse
    }
    
    const networkResponse = await fetch(request)
    
    if (networkResponse.status === 200) {
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.error('Cache first strategy failed:', error)
    return new Response('Network error', { status: 408 })
  }
}

async function networkFirstStrategy(request, cacheName) {
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.status === 200) {
      const cache = await caches.open(cacheName)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    const cache = await caches.open(cacheName)
    const cachedResponse = await cache.match(request)
    
    if (cachedResponse) {
      return cachedResponse
    }
    
    // Return offline page for navigation requests
    if (request.destination === 'document') {
      return caches.match('/offline')
    }
    
    return new Response('Offline', { status: 408 })
  }
}

async function staleWhileRevalidateStrategy(request, cacheName) {
  const cache = await caches.open(cacheName)
  const cachedResponse = await cache.match(request)
  
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.status === 200) {
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  })
  
  return cachedResponse || fetchPromise
}

// Request type detection
function isImageRequest(request) {
  return request.destination === 'image' ||
         /\.(jpg|jpeg|png|gif|webp|avif|svg|ico)$/i.test(request.url)
}

function isStaticAsset(request) {
  return /\.(css|js|woff|woff2|ttf|eot)$/i.test(request.url) ||
         request.url.includes('/_next/static/')
}

function isAPIRequest(request) {
  return request.url.includes('/api/')
}

function isPageRequest(request) {
  return request.destination === 'document'
}

// Background sync for analytics
self.addEventListener('sync', (event) => {
  if (event.tag === 'web-vitals-sync') {
    event.waitUntil(syncWebVitals())
  }
})

async function syncWebVitals() {
  try {
    const webVitalsData = await getStoredWebVitals()
    
    if (webVitalsData.length > 0) {
      await fetch('/api/web-vitals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(webVitalsData)
      })
      
      // Clear stored data after successful sync
      await clearStoredWebVitals()
    }
  } catch (error) {
    console.error('Web Vitals sync failed:', error)
  }
}

async function getStoredWebVitals() {
  // Implementation depends on IndexedDB or other storage
  return []
}

async function clearStoredWebVitals() {
  // Implementation depends on storage method
}
