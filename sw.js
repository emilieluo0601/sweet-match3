const CACHE_NAME = 'sweet-match3-v1';
const ASSETS = [
  './match3.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './Match-3/Asu Vacano.jpg',
  './Match-3/By the sea.jpg',
  './Match-3/High school.jpg',
  './Match-3/Japan .jpg',
  './Match-3/Mount Fuji.jpg',
  './Match-3/Night Sakura.jpg',
  './Match-3/Piccaque.jpg',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
