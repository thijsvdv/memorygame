importScripts('/cache-polyfill.js');

self.addEventListener('install', function(e) {
  console.log('IERSE DOARSE');
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
        '/img/logo_icon.svg',
        '/img/logo_text.svg',
        '/img/logo_large.png',
        '/img/logo_hero.png',
        '/img/facebook.svg',
        '/img/youtube.svg',
        '/img/google.svg',
        '/img/logo_icon_white.svg',
        '/img/favicon.png',
        '/img/bg_footer_small_mini.jpg',
        '/img/tiles/img1.jpg',
        '/img/tiles/img2.jpg',
        '/img/tiles/img3.jpg',
        '/img/tiles/img4.jpg',
        '/img/tiles/img5.jpg',
        '/img/tiles/img6.jpg',
        '/img/tiles/img7.jpg',
        '/img/tiles/img8.jpg',
        '/img/tiles/tile6.jpg'
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
