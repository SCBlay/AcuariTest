const CACHE_NAME = 'acuaritest-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icono.png',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

// Instalación: Guarda los archivos en la memoria del móvil
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Activación: Limpia versiones antiguas
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }));
    })
  );
});

// Intercepta peticiones: Si no hay internet, sirve la copia guardada
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );

                      });