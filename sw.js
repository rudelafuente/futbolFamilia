// Service worker mínimo para que la web se pueda instalar como app.
// No guarda nada en caché: cada petición va a la red, así los datos siempre están al día.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.method === 'GET') e.respondWith(fetch(e.request));
});
