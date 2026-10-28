// Replaced with a unique build id by the `service-worker-version` integration
// in astro.config.mjs, so every deploy gets fresh caches.
const CACHE_VERSION = '__BUILD_ID__';
const PAGE_CACHE = `pages-${CACHE_VERSION}`;
const ASSET_CACHE = `assets-${CACHE_VERSION}`;
const OFFLINE_URL = '/offline/';
const PRECACHE_URLS = ['/', OFFLINE_URL, '/favicon.svg', '/favicon.ico'];

self.addEventListener('install', event => {
    event.waitUntil(
        caches
            .open(PAGE_CACHE)
            .then(cache => cache.addAll(PRECACHE_URLS))
            .then(() => self.skipWaiting())
    );
});

// Remove caches from previous builds (including the legacy v1 cache).
self.addEventListener('activate', event => {
    event.waitUntil(
        caches
            .keys()
            .then(cacheNames =>
                Promise.all(
                    cacheNames
                        .filter(cacheName => cacheName !== PAGE_CACHE && cacheName !== ASSET_CACHE)
                        .map(cacheName => caches.delete(cacheName))
                )
            )
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    const { request } = event;
    if (request.method !== 'GET') return;

    const url = new URL(request.url);
    if (url.origin !== self.location.origin) return;

    if (request.mode === 'navigate') {
        event.respondWith(networkFirst(request));
    } else if (url.pathname.startsWith('/_assets/')) {
        // Build assets have content-hashed file names, so they never go stale.
        event.respondWith(cacheFirst(request));
    }
    // Everything else falls through to the network and the browser's HTTP cache.
});

/** Pages: always try the network so visitors see the latest deploy. */
async function networkFirst(request) {
    try {
        const response = await fetch(request);
        if (response.ok && !response.redirected) {
            const cache = await caches.open(PAGE_CACHE);
            await cache.put(request, response.clone());
        }
        return response;
    } catch {
        const cached = await caches.match(request, { ignoreSearch: true });
        return cached ?? (await caches.match(OFFLINE_URL)) ?? Response.error();
    }
}

async function cacheFirst(request) {
    const cached = await caches.match(request);
    if (cached) return cached;

    const response = await fetch(request);
    if (response.ok) {
        const cache = await caches.open(ASSET_CACHE);
        await cache.put(request, response.clone());
    }
    return response;
}
