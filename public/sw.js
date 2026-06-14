const CACHE_NAME = 'online-free-tools-cache-v2'

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  )
  self.clients.claim()
})

const isStaticAsset = url => url.includes('/_next/static/') || url.includes('/fonts/')

self.addEventListener('fetch', event => {
  const { request } = event
  if (request.method !== 'GET' || !request.url.startsWith(self.location.origin)) {
    return
  }

  if (isStaticAsset(request.url)) {
    // Cache-first for content-hashed static assets (immutable)
    event.respondWith(
      caches.match(request).then(cached =>
        cached || fetch(request).then(res => {
          const clone = res.clone()
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone))
          return res
        })
      )
    )
  } else {
    // Network-first for HTML/navigation — always try the network first
    event.respondWith(
      fetch(request).then(res => {
        const clone = res.clone()
        caches.open(CACHE_NAME).then(cache => cache.put(request, clone))
        return res
      }).catch(() => caches.match(request).then(cached => cached || caches.match('/')))
    )
  }
})
