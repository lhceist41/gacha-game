/* Mini Gacha Service Worker (v2)
   - Offline-first for core assets
   - Stale-while-revalidate for most requests
   - Cleans up old caches
*/

const CACHE_NAME = "mini-gacha-v3";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-192-maskable.png",
  "./icons/icon-512.png",
  "./icons/icon-512-maskable.png",
];


self.addEventListener("install", (event) => {
  self.skipWaiting();

  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);

    // Cache each asset individually so missing optional files do not break install
    await Promise.allSettled(
      CORE_ASSETS.map(async (url) => {
        try {
          const req = new Request(url, { cache: "reload" });
          const resp = await fetch(req);
          if (resp && resp.ok) await cache.put(req, resp.clone());
        } catch {
          // ignore
        }
      })
    );
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : Promise.resolve())));
    await self.clients.claim();
  })());
});

function isStaticAsset(request) {
  const url = new URL(request.url);
  // Same-origin only for caching
  if (url.origin !== self.location.origin) return false;

  // Common static extensions
  return (
    url.pathname.endsWith(".html") ||
    url.pathname.endsWith(".css") ||
    url.pathname.endsWith(".js") ||
    url.pathname.endsWith(".json") ||
    url.pathname.endsWith(".webmanifest") ||
    url.pathname.endsWith(".png") ||
    url.pathname.endsWith(".jpg") ||
    url.pathname.endsWith(".jpeg") ||
    url.pathname.endsWith(".webp") ||
    url.pathname.endsWith(".svg") ||
    url.pathname.endsWith(".ico") ||
    url.pathname.endsWith(".woff") ||
    url.pathname.endsWith(".woff2")
  );
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  const resp = await fetch(request);
  if (resp && resp.ok) {
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, resp.clone()).catch(() => {});
  }
  return resp;
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  const networkPromise = fetch(request)
    .then((resp) => {
      if (resp && resp.ok) cache.put(request, resp.clone()).catch(() => {});
      return resp;
    })
    .catch(() => null);

  return cached || (await networkPromise) || new Response("Offline", { status: 503 });
}

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Only handle GET
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Navigation: serve cached index.html as fallback (good for phone standalone mode)
  if (request.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const resp = await fetch(request);
        // Optionally cache fresh navigations
        const cache = await caches.open(CACHE_NAME);
        cache.put("./index.html", resp.clone()).catch(() => {});
        return resp;
      } catch {
        return (await caches.match("./index.html")) || (await caches.match("./")) || new Response("Offline", { status: 503 });
      }
    })());
    return;
  }

  // Same-origin static assets:
  // - JS/CSS/Images: cache-first for snappy UI when offline
  // - Everything else: stale-while-revalidate
  if (url.origin === self.location.origin && isStaticAsset(request)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  event.respondWith(staleWhileRevalidate(request));
});
