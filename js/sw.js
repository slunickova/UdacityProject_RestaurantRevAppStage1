let staticCacheName = 'restaurant-cache-1';

var urls = [
  '/',
  '/restaurant.html',
  '/css/styles.css',
  '/data/restaurant.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/js/dbhelper.js',
];

//updating the static cache
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      console.log('caching files');
      return cache.addAll(urls);
    })
  );
});

//fetch the data
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if(response) {
        console.log('it response');
        return response;
      }
      return fetch(event.request);
    })
  );
});

//updating the cache name
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(staticCacheNames) {
      return Promise.all(
        cacheNames.map(function(thisCacheName) {
          if(cacheList.indexOf(cacheName)=== -1) {
            return caches.delete(thisCacheName);
          }
        })
      );
    })
  );
});
