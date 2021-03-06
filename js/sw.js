var staticCacheName = 'cache-1';

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
    //ignoreSearch to ignore the query in html
    caches.match(event.request, {ignoreSearch: true}).then(function(response) {
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
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if(cacheName !== staticCacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
