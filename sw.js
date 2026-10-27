// Service worker: red primero y, sin conexión, la última copia guardada.
// Con conexión cada petición a la propia web se revalida con GitHub (cache: 'no-cache'), así una versión nueva se ve
// al momento en lugar de tras los 10 minutos de caché que pone GitHub Pages. Lo que llega se guarda, para poder abrir
// la app en el campo aunque no haya cobertura.
const CACHE = 'futbol-v1';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;   // la previsión del tiempo solo con conexión
  const clave = url.origin + url.pathname;           // sin «?…»: la copia sirve para cualquier variante
  e.respondWith(fetch(e.request.url, {cache: 'no-cache', credentials: 'same-origin'})
    .then(r => {
      if (r.ok) { const copia = r.clone(); e.waitUntil(caches.open(CACHE).then(c => c.put(clave, copia))); }
      return r;
    })
    .catch(() => caches.match(clave).then(r => r || Response.error())));
});
