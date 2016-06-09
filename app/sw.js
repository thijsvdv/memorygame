importScripts('/cache-polyfill.js');

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('memorygame').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/index.html?homescreen=1',
        '/?homescreen=1',
        '/css/style.css',
        '/js/jquery.min.js',
        '/js/moment.min.js',
        '/js/hashids.js',
        '/js/pwa.js',
        '/favicon.png',
        '/img/tiles/img1.jpg',
        '/img/tiles/img2.jpg',
        '/img/tiles/img3.jpg',
        '/img/tiles/img4.jpg',
        '/img/tiles/img5.jpg',
        '/img/tiles/img6.jpg',
        '/img/tiles/img7.jpg',
        '/img/tiles/img8.jpg',
        '/img/tiles/tile.jpg',
        '/img/logo-the-aim.png',
        'https://fonts.googleapis.com/css?family=Arvo:400,700'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
//  console.log(event.request.url);

 event.respondWith(
   caches.match(event.request).then(function(response) {
     return response || fetch(event.request);
   })
 );
});
