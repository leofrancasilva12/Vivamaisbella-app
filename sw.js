// Sempre busca a versão mais nova; usa a cópia guardada só se estiver sem internet
const CACHE = 'vmb-app-v5';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  e.respondWith(
    fetch(e.request).then(r => {
      // vídeo chega em pedaços (206): só guarda respostas completas
      if (r.status === 200) { const c = r.clone(); caches.open(CACHE).then(x => x.put(e.request, c)).catch(() => {}); }
      return r;
    }).catch(() => caches.match(e.request))
  );
});

// Aviso de pedido de horário (Web Push)
self.addEventListener('push', e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (x) { d = { body: e.data ? e.data.text() : '' }; }
  e.waitUntil(self.registration.showNotification(d.title || 'Viva Mais Bella', {
    body: d.body || '', icon: '/icon-512.png', badge: '/icon-512.png', tag: d.tag || 'vmb', renotify: true,
    vibrate: [120, 60, 120], data: { url: d.url || '/#/inicio' },
  }));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = new URL((e.notification.data && e.notification.data.url) || '/#/inicio', self.location.origin).href;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(lista => {
    for (const c of lista) if ('focus' in c) { if (c.navigate) c.navigate(url).catch(() => {}); return c.focus(); }
    return self.clients.openWindow(url);
  }));
});
