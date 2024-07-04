console.log('Service Worker Loading');

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  clients.claim();
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Only modify JavaScript files
  if (url.pathname.endsWith('.js')) {
    event.respondWith(
      (async () => {
        const response = await fetch(event.request);
        const text = await response.text();
        const modifiedText = text + '\nconsole.log("Injected by Service Worker");';
        return new Response(modifiedText, {
          headers: response.headers
        });
      })()
    );
  } else {
    event.respondWith(fetch(event.request));
  }
});
