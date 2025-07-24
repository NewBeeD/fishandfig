/// <reference lib="webworker" />

self.addEventListener('install', (event: ExtendableEvent) => {
  console.log('[ServiceWorker] Install');
  self.skipWaiting(); // no TS error now
});

self.addEventListener('activate', (event: ExtendableEvent) => {
  console.log('[ServiceWorker] Activate');
});

self.addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(fetch(event.request));
});
