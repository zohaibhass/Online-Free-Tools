const CACHE_NAME = 'online-free-tools-cache-v1'
const URLS_TO_CACHE = [
  '/',
  '/about',
  '/contact',
  '/tools',
  '/site.webmanifest',
  '/icon.svg',
  '/apple-icon.png'
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  )
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

self.addEventListener('fetch', event => {
  const request = event.request
  if (request.method !== 'GET' || !request.url.startsWith(self.location.origin)) {
    return
  }

  event.respondWith(
    caches.match(request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse
      }
      return fetch(request)
        .then(networkResponse => {
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse
          }
          const responseClone = networkResponse.clone()
          caches.open(CACHE_NAME).then(cache => cache.put(request, responseClone))
          return networkResponse
        })
        .catch(() => caches.match('/'))
    })
  )
})
