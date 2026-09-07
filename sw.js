const CACHE_NAME = 'danang-trip-shell-v1';
const SHELL_URLS = [
  '/index.html',
  'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap',
  'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.all(SHELL_URLS.map(url =>
        fetch(url, { mode: 'no-cors' }).then(res => cache.put(url, res)).catch(() => {})
      ))
    )
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const isDoc = req.mode === 'navigate' || req.destination === 'document';
  const isShellAsset = SHELL_URLS.includes(req.url);
  if (!isDoc && !isShellAsset) return; // Firestore 등 나머지 요청은 그대로 통과시킴

  const cacheKey = isDoc ? '/index.html' : req;

  event.respondWith(
    caches.match(cacheKey).then(cached => {
      const network = fetch(req).then(res => {
        if (res && (res.ok || res.type === 'opaque')) {
          caches.open(CACHE_NAME).then(c => c.put(cacheKey, res.clone()));
        }
        return res;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
