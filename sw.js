// ShubhCard Pro v2.1 - Service Worker
const VERSION = 'shubhcard-v2.1.0';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
];
const CDN_ASSETS = [
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(VERSION).then(cache => 
      Promise.all([
        cache.addAll(CORE_ASSETS).catch(()=>{}),
        ...CDN_ASSETS.map(url => fetch(url).then(r => cache.put(url, r)).catch(()=>{}))
      ])
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if(e.request.method !== 'GET') return;
  const url = new URL(e.request.url);

  // Network-first for HTML (get latest updates)
  if(e.request.mode === 'navigate' || url.pathname.endsWith('.html')){
    e.respondWith(
      fetch(e.request)
        .then(r => {
          const clone = r.clone();
          caches.open(VERSION).then(c => c.put(e.request, clone));
          return r;
        })
        .catch(() => caches.match(e.request).then(r => r || caches.match('/')))
    );
    return;
  }

  // Cache-first for everything else
  e.respondWith(
    caches.match(e.request).then(cached => {
      if(cached) return cached;
      return fetch(e.request).then(r => {
        if(r && r.status === 200){
          const clone = r.clone();
          caches.open(VERSION).then(c => c.put(e.request, clone));
        }
        return r;
      }).catch(() => {
        if(e.request.destination === 'image'){
          return new Response('', {status: 200, headers: {'Content-Type':'image/svg+xml'}});
        }
      });
    })
  );
});
