const cache_version = 'v1';

const cache_items = [
    '/app/js/main.js',
    '/app/index.html'
];

// Call install event
self.addEventListener('install', event => {
    console.log(new Date(Date.now()).toLocaleString('it-IT'), "Service Worker: Installed.")

    event.waitUntil(
        caches.open(cache_version)
        .then(function(cache) {
            console.log(new Date(Date.now()).toLocaleString('it-IT'), "Service Worker: Opened cache..");
            return cache.addAll(cache_items);
        })
    );
});


// Call activate event
self.addEventListener('activate', e => {
    console.log(new Date(Date.now()).toLocaleString('it-IT'), "Service Worker: Activated!")

    e.waitUntil(
        caches.keys().then( cache_version => {
            return Promise.all(
                cache_version.map( cache => {
                    if( cache !== cache_version)
                    {
                        console.log(new Date(Date.now()).toLocaleString('it-IT'), "Service Worker: Clearing old cache...");
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Call fetch event
self.addEventListener('fetch', e => {
    console.log(new Date(Date.now()).toLocaleString('it-IT'), "Service Worker: Fetching...");

    e.respondWith(
        fetch(e.request)
        .then(res => {

            // Make a copy
            const resClone = res.clone();

            // Open cache
            caches.open(cache_version)
            .then(cache => {
                cache.put(e.request, resClone);
            });

            return res;

        }).catch( err => caches.match(e.request).then(res => res))
    );
});