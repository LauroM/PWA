var CACHE_NAME = 'to-learning-v1';
var urlsToCache = [
  '/',
  '/styles.css',
  '/fontawesome-free-5.15.0-web/css/fontawesome.css',
  '/fontawesome-free-5.15.0-web/css/regular.css',
  '/fontawesome-free-5.15.0-web/css/brands.css',
  '/fontawesome-free-5.15.0-web/css/solid.css',
  '/models/task.js',
  '/controllers/tolearning.js',
  '/images/logo.png'
];


self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
          .then(function(cache) {
            console.log('Opened cache');
            //cache.pull('/index.html');
            return cache.addAll(urlsToCache);
          })
      );
});

self.addEventListener('fetch', function(event) {
event.respondWith(
    caches.match(event.request)
    .then(function(response) {
        // Cache hit - return response
        if (response) {
        return response;
        }

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
        function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
            return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
            .then(function(cache) {
                cache.put(event.request, responseToCache);
            });

            return response;
        }
        );
    })
    );
});

self.addEventListener('activate', function(event) {

    var cacheAllowlist = ['pages-cache-v1', 'blog-posts-cache-v1'];

    event.waitUntil(
        caches.keys().then(function(cacheNames) {
        return Promise.all(
            cacheNames.map(function(cacheName) {
            if (cacheAllowlist.indexOf(cacheName) === -1) {
                return caches.delete(cacheName);
            }
            })
        );
        })
    );
});