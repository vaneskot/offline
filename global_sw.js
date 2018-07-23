let cacheName = 'cache-sw';

self.addEventListener('install', function(event) {
});

self.addEventListener('activate', function(event) {
  console.log("SW: activate.");
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).then(
      function(result) {
        return caches.open(cacheName).then(function(cache) {
          cache.put(event.request, result.clone());
          return result;
        });
      },
      function(err) {
        return caches.match(event.request);
      })
  );
});
