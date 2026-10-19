// Service worker mínimo para que la web se pueda instalar como app.
// No guarda nada en caché: cada petición a la propia web se revalida con GitHub (cache: 'no-cache'), así una
// versión nueva se ve al momento en lugar de tras los 10 minutos de caché que pone GitHub Pages.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const propia = new URL(e.request.url).origin === self.location.origin;
  e.respondWith(propia ? fetch(e.request.url, {cache: 'no-cache', credentials: 'same-origin'}) : fetch(e.request));
});
